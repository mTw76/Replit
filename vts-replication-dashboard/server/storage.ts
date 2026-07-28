import { db } from "./db";
import {
  volatilityMetrics,
  strategies,
  signals,
  barometerHistory,
  type VolatilityMetric,
  type Strategy,
  type Signal,
  type BarometerHistory,
  type MarketRegime,
  type InsertMetric,
  type InsertStrategy,
  type InsertBarometerHistory
} from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";
import { 
  fetchFullVIXTermStructure, 
  fetchVIXCentralData,
  calculateFullVTSMetrics, 
  getStrategyPositions, 
  getSignalFromMetric,
  type CalculatedMetrics 
} from "./marketData";

export interface IStorage {
  getMetrics(): Promise<VolatilityMetric[]>;
  updateMetric(name: string, value: number, signal: string): Promise<void>;
  updateMetricWithDescription(name: string, value: number, signal: string, description: string): Promise<void>;
  getStrategies(): Promise<Strategy[]>;
  getStrategy(id: number): Promise<Strategy | undefined>;
  updateStrategyPosition(id: number, position: string, description?: string): Promise<void>;
  
  // Barometer History
  getBarometerHistory(days: number): Promise<BarometerHistory[]>;
  saveBarometerReading(data: InsertBarometerHistory): Promise<void>;
  
  // Seeding/Resetting
  resetMetrics(regime: MarketRegime): Promise<void>;
  seedInitialData(): Promise<void>;
  
  // Live data
  refreshFromLiveData(fredApiKey: string): Promise<{ success: boolean; regime: string; message: string }>;
}

export class DatabaseStorage implements IStorage {
  async getMetrics(): Promise<VolatilityMetric[]> {
    return await db.select().from(volatilityMetrics).orderBy(volatilityMetrics.id);
  }

  async updateMetric(name: string, value: number, signal: string): Promise<void> {
    await db.update(volatilityMetrics)
      .set({ value: value.toString(), signal, updatedAt: new Date() })
      .where(eq(volatilityMetrics.name, name));
  }

  async updateMetricWithDescription(name: string, value: number, signal: string, description: string): Promise<void> {
    await db.update(volatilityMetrics)
      .set({ value: value.toString(), signal, description, updatedAt: new Date() })
      .where(eq(volatilityMetrics.name, name));
  }

  async getStrategies(): Promise<Strategy[]> {
    return await db.select().from(strategies).orderBy(strategies.id);
  }

  async getStrategy(id: number): Promise<Strategy | undefined> {
    const [strategy] = await db.select().from(strategies).where(eq(strategies.id, id));
    return strategy;
  }

  async updateStrategyPosition(id: number, position: string, description?: string): Promise<void> {
    const updateData: any = { currentPosition: position, lastSignalDate: new Date() };
    if (description) {
      updateData.description = description;
    }
    await db.update(strategies)
      .set(updateData)
      .where(eq(strategies.id, id));
  }

  async getBarometerHistory(days: number): Promise<BarometerHistory[]> {
    return await db.select()
      .from(barometerHistory)
      .orderBy(desc(barometerHistory.date))
      .limit(days);
  }

  async saveBarometerReading(data: InsertBarometerHistory): Promise<void> {
    try {
      console.log('[BarometerHistory] Saving reading:', JSON.stringify(data));
      
      // Check if we already have a reading for today (to avoid duplicates)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const existing = await db.select()
        .from(barometerHistory)
        .where(sql`${barometerHistory.date} >= ${today} AND ${barometerHistory.date} < ${tomorrow}`)
        .limit(1);
      
      if (existing.length > 0) {
        // Update existing record for today
        console.log('[BarometerHistory] Updating existing record:', existing[0].id);
        await db.update(barometerHistory)
          .set(data)
          .where(eq(barometerHistory.id, existing[0].id));
      } else {
        // Insert new record
        console.log('[BarometerHistory] Inserting new record');
        await db.insert(barometerHistory).values(data);
      }
      console.log('[BarometerHistory] Save successful');
    } catch (error) {
      console.error('[BarometerHistory] Error saving:', error);
      throw error;
    }
  }

  async refreshFromLiveData(fredApiKey: string): Promise<{ success: boolean; regime: string; message: string; barometer?: number }> {
    try {
      // Fetch full VIX term structure data from Yahoo Finance
      const termData = await fetchFullVIXTermStructure(fredApiKey);
      
      if (!termData) {
        return { success: false, regime: 'unknown', message: 'Failed to fetch VIX data. Check your API key.' };
      }
      
      const { vix9d, vix, vix3m, vix6m } = termData;
      
      // Fetch VIX Central data for futures contango and HV20
      const vixCentralData = await fetchVIXCentralData();
      
      // Calculate full VTS-style metrics including barometer (with VIX Central data)
      const metrics = calculateFullVTSMetrics(termData, vixCentralData);
      
      // Update or insert metrics - use upsert pattern
      const metricsToUpsert: { name: string; value: string; signal: string; description: string; category: string }[] = [
        // Volatility Barometer (main gauge) - includes regime in description for UI extraction
        {
          name: 'Volatility Barometer',
          value: metrics.volatilityBarometer.toString(),
          signal: getSignalFromMetric('Volatility Barometer', metrics.volatilityBarometer),
          description: `regime:${metrics.regime}|Combined gauge: ${metrics.volatilityBarometer.toFixed(0)}%`,
          category: 'Barometer'
        },
        // VIX Levels
        {
          name: 'VIX Level',
          value: metrics.vixLevel.toString(),
          signal: getSignalFromMetric('VIX Level', metrics.vixLevel),
          description: `Current spot VIX: ${metrics.vixLevel.toFixed(2)}`,
          category: 'VIX Levels'
        },
        {
          name: 'VIX9D',
          value: (metrics.vix9d || 0).toString(),
          signal: metrics.vix9d ? getSignalFromMetric('VIX Level', metrics.vix9d) : 'Neutral',
          description: metrics.vix9d ? `9-day VIX: ${metrics.vix9d.toFixed(2)}` : 'Data unavailable',
          category: 'VIX Levels'
        },
        {
          name: 'VIX3M',
          value: metrics.vix3m.toString(),
          signal: getSignalFromMetric('VIX Level', metrics.vix3m),
          description: `3-month VIX: ${metrics.vix3m.toFixed(2)}`,
          category: 'VIX Levels'
        },
        {
          name: 'VIX6M',
          value: (metrics.vix6m || 0).toString(),
          signal: metrics.vix6m ? getSignalFromMetric('VIX Level', metrics.vix6m) : 'Neutral',
          description: metrics.vix6m ? `6-month VIX: ${metrics.vix6m.toFixed(2)}` : 'Data unavailable',
          category: 'VIX Levels'
        },
        // Term Structure Ratios
        {
          name: 'VIX3M/VIX Ratio',
          value: metrics.termStructureVix3mVix.toString(),
          signal: getSignalFromMetric('VIX3M/VIX Ratio', metrics.termStructureVix3mVix),
          description: `${metrics.termStructureVix3mVix > 1 ? 'Contango' : 'Backwardation'}: ${metrics.termStructureVix3mVix.toFixed(3)}`,
          category: 'Term Structure'
        },
        {
          name: 'VIX6M/VIX Ratio',
          value: (metrics.termStructureVix6mVix || 0).toString(),
          signal: metrics.termStructureVix6mVix ? getSignalFromMetric('VIX3M/VIX Ratio', metrics.termStructureVix6mVix) : 'Neutral',
          description: metrics.termStructureVix6mVix ? `Long-term structure: ${metrics.termStructureVix6mVix.toFixed(3)}` : 'Data unavailable',
          category: 'Term Structure'
        },
        // Crossovers
        {
          name: 'VIX9D/VIX Crossover',
          value: (metrics.crossoverVix9dVix || 0).toString(),
          signal: metrics.crossoverVix9dVix ? getSignalFromMetric('VIX9D/VIX', metrics.crossoverVix9dVix) : 'Neutral',
          description: metrics.crossoverVix9dVix ? `Fast signal: ${metrics.crossoverVix9dVix.toFixed(3)}` : 'Data unavailable',
          category: 'Crossovers'
        },
        {
          name: 'VIX/VIX3M Crossover',
          value: metrics.crossoverVixVix3m.toString(),
          signal: getSignalFromMetric('VIX/VIX3M', metrics.crossoverVixVix3m),
          description: `Medium signal: ${metrics.crossoverVixVix3m.toFixed(3)}`,
          category: 'Crossovers'
        },
        {
          name: 'VIX/VIX6M Crossover',
          value: (metrics.crossoverVixVix6m || 0).toString(),
          signal: metrics.crossoverVixVix6m ? getSignalFromMetric('VIX/VIX6M', metrics.crossoverVixVix6m) : 'Neutral',
          description: metrics.crossoverVixVix6m ? `Slow signal: ${metrics.crossoverVixVix6m.toFixed(3)}` : 'Data unavailable',
          category: 'Crossovers'
        },
        // VIX Central Futures Data
        {
          name: 'M1 Futures',
          value: (metrics.m1Futures || 0).toString(),
          signal: metrics.m1Futures ? getSignalFromMetric('VIX Level', metrics.m1Futures) : 'Neutral',
          description: metrics.m1Futures ? `Front month: ${metrics.m1Futures.toFixed(2)}` : 'Data unavailable',
          category: 'Futures'
        },
        {
          name: 'M2 Futures',
          value: (metrics.m2Futures || 0).toString(),
          signal: metrics.m2Futures ? getSignalFromMetric('VIX Level', metrics.m2Futures) : 'Neutral',
          description: metrics.m2Futures ? `Second month: ${metrics.m2Futures.toFixed(2)}` : 'Data unavailable',
          category: 'Futures'
        },
        {
          name: 'M1:M2 Contango',
          value: (metrics.m1m2Contango || 0).toString(),
          signal: metrics.m1m2Contango !== null ? getSignalFromMetric('M1:M2 Contango', metrics.m1m2Contango) : 'Neutral',
          description: metrics.m1m2Contango !== null ? `Futures contango: ${metrics.m1m2Contango.toFixed(2)}%` : 'Data unavailable',
          category: 'Futures'
        },
        {
          name: 'HV20',
          value: (metrics.hv20 || 0).toString(),
          signal: metrics.hv20 ? getSignalFromMetric('HV20', metrics.hv20) : 'Neutral',
          description: metrics.hv20 ? `20-day realized vol: ${metrics.hv20.toFixed(2)}` : 'Data unavailable',
          category: 'Volatility'
        },
        // Derived Metrics
        {
          name: 'VTS Cash VIX Oscillator',
          value: metrics.cashVIXOscillator.toString(),
          signal: getSignalFromMetric('VTS Cash VIX Oscillator', metrics.cashVIXOscillator),
          description: `Oscillator: ${metrics.cashVIXOscillator.toFixed(2)} (higher=bullish)`,
          category: 'Oscillators'
        },
        {
          name: 'Cash VIX Oscillator Percentile',
          value: metrics.cashVIXOscillatorPercentile.toString(),
          signal: getSignalFromMetric('Cash VIX Oscillator Percentile', metrics.cashVIXOscillatorPercentile),
          description: `Percentile: ${metrics.cashVIXOscillatorPercentile.toFixed(0)}th (lower=bullish)`,
          category: 'Oscillators'
        },
        {
          name: 'Roll Yield',
          value: metrics.rollYield.toString(),
          signal: getSignalFromMetric('Roll Yield', metrics.rollYield),
          description: `Annualized: ${metrics.rollYield.toFixed(1)}%`,
          category: 'Yield'
        },
        {
          name: 'Volatility Risk Premium',
          value: metrics.volatilityRiskPremium.toString(),
          signal: getSignalFromMetric('Volatility Risk Premium (VRP)', metrics.volatilityRiskPremium),
          description: `VIX - HV20: ${metrics.volatilityRiskPremium.toFixed(2)}`,
          category: 'Premium'
        },
        {
          name: 'VTS Crush Level',
          value: metrics.crushLevel.toString(),
          signal: getSignalFromMetric('VTS Crush Level', metrics.crushLevel),
          description: `Daily VXX decay: ${metrics.crushLevel.toFixed(2)}%`,
          category: 'Decay'
        }
      ];
      
      // Clear and reinsert for simplicity (metrics are ephemeral/calculated data)
      await db.delete(volatilityMetrics);
      await db.insert(volatilityMetrics).values(metricsToUpsert);
      
      // Get strategy positions based on calculated metrics
      const strategyPositions = getStrategyPositions(metrics);
      
      // Update strategies
      const allStrategies = await this.getStrategies();
      for (const strat of allStrategies) {
        const positionData = strategyPositions[strat.name];
        if (positionData) {
          await this.updateStrategyPosition(strat.id, positionData.position, positionData.reason);
        }
      }
      
      // Save barometer reading to history
      await this.saveBarometerReading({
        date: new Date(),
        value: metrics.volatilityBarometer.toString(),
        regime: metrics.regime,
        vixLevel: metrics.vixLevel.toString(),
        tacticalPosition: strategyPositions['Tactical Volatility']?.position || 'UNKNOWN',
        defensivePosition: strategyPositions['Defensive Rotation']?.position || 'UNKNOWN',
        strategicPosition: strategyPositions['Strategic Tail Risk']?.position || 'UNKNOWN',
      });
      
      const vix9dStr = vix9d ? vix9d.toFixed(1) : 'N/A';
      const vix6mStr = vix6m ? vix6m.toFixed(1) : 'N/A';
      
      return { 
        success: true, 
        regime: metrics.regime,
        barometer: metrics.volatilityBarometer,
        message: `Barometer: ${metrics.volatilityBarometer.toFixed(0)}% | VIX9D: ${vix9dStr} | VIX: ${vix.toFixed(1)} | VIX3M: ${vix3m.toFixed(1)} | VIX6M: ${vix6mStr}`
      };
    } catch (error) {
      console.error('Error refreshing live data:', error);
      return { success: false, regime: 'unknown', message: `Error: ${error}` };
    }
  }

  async resetMetrics(regime: MarketRegime): Promise<void> {
    // Simulate metrics based on regime
    const updates = this.getRegimeMetrics(regime);
    
    // Update metrics
    for (const update of updates.metrics) {
        await this.updateMetric(update.name, update.value, update.signal);
    }
    
    // Update strategies based on new metrics logic (simplified replication)
    const strategyUpdates = this.getRegimeStrategies(regime);
    for (const strat of strategyUpdates) {
        // Find ID by name (inefficient but fine for demo size)
        const allStrats = await this.getStrategies();
        const target = allStrats.find(s => s.name === strat.name);
        if (target) {
            await this.updateStrategyPosition(target.id, strat.position);
        }
    }
  }

  async seedInitialData(): Promise<void> {
    const existingMetrics = await this.getMetrics();
    if (existingMetrics.length === 0) {
        const defaults = this.getRegimeMetrics("stable_contango");
        await db.insert(volatilityMetrics).values(defaults.metrics.map(m => ({
            name: m.name,
            value: m.value.toString(),
            signal: m.signal,
            description: m.description,
            category: m.category
        })));
    }

    const existingStrategies = await this.getStrategies();
    if (existingStrategies.length === 0) {
        await db.insert(strategies).values([
            { name: "Strategic Tail Risk", currentPosition: "SPY", description: "Uses VTS Barometer directly. SPY 0-55%, IYR 55-80%, VIXM 80%+." },
            { name: "Tactical Volatility", currentPosition: "SVXY", description: "Uses Cash VIX Oscillator percentile. SVXY/GLD/VXX based on risk." },
            { name: "Defensive Rotation", currentPosition: "QLD", description: "Uses M1:M2 futures and roll yield. QLD/XLU/CASH rotation." },
            { name: "Iron Condor", currentPosition: "OPEN", description: "Opens when VIX 14-22 in stable contango for premium collection." },
        ]);
    }
  }

  // Helper to generate mock data for regimes
  // VTS Barometer: LOWER = more bullish (0-55% bullish, 55-80% neutral, 80%+ bearish)
  private getRegimeMetrics(regime: MarketRegime) {
    if (regime === "stable_contango") {
        return {
            metrics: [
                // Barometer low (bullish) for stable contango
                { name: "Volatility Barometer", value: 32, signal: "Bullish", description: "regime:stable_contango|Combined gauge: 32%", category: "Barometer" },
                { name: "VIX Level", value: 14.5, signal: "Bullish", description: "Current spot VIX: 14.50", category: "VIX Levels" },
                { name: "VIX3M/VIX Ratio", value: 1.12, signal: "Bullish", description: "Contango: 1.120", category: "Term Structure" },
                { name: "VTS Cash VIX Oscillator", value: 8.5, signal: "Bullish", description: "Oscillator: 8.50 (higher=bullish)", category: "Oscillators" },
                { name: "Cash VIX Oscillator Percentile", value: 22, signal: "Bullish", description: "Percentile: 22th (lower=bullish)", category: "Oscillators" },
                { name: "Roll Yield", value: 35, signal: "Bullish", description: "Annualized: 35.0%", category: "Yield" },
                { name: "Volatility Risk Premium", value: 3.2, signal: "Bullish", description: "VIX - HV20: 3.20", category: "Premium" },
                { name: "VTS Crush Level", value: 0.46, signal: "Bullish", description: "Daily VXX decay: 0.46%", category: "Decay" },
            ]
        };
    } else if (regime === "vol_spike") {
        return {
            metrics: [
                // Barometer high (bearish) for vol spike
                { name: "Volatility Barometer", value: 85, signal: "Bearish", description: "regime:vol_spike|Combined gauge: 85%", category: "Barometer" },
                { name: "VIX Level", value: 32, signal: "Bearish", description: "Current spot VIX: 32.00", category: "VIX Levels" },
                { name: "VIX3M/VIX Ratio", value: 0.92, signal: "Bearish", description: "Backwardation: 0.920", category: "Term Structure" },
                { name: "VTS Cash VIX Oscillator", value: -2.1, signal: "Bearish", description: "Oscillator: -2.10 (higher=bullish)", category: "Oscillators" },
                { name: "Cash VIX Oscillator Percentile", value: 88, signal: "Bearish", description: "Percentile: 88th (lower=bullish)", category: "Oscillators" },
                { name: "Roll Yield", value: -15, signal: "Bearish", description: "Annualized: -15.0%", category: "Yield" },
                { name: "Volatility Risk Premium", value: -1.5, signal: "Bearish", description: "VIX - HV20: -1.50", category: "Premium" },
                { name: "VTS Crush Level", value: -0.2, signal: "Bearish", description: "Daily VXX decay: -0.20%", category: "Decay" },
            ]
        };
    } else { // high_volatility (55-80%)
        return {
            metrics: [
                // Barometer moderate (neutral zone) for elevated volatility
                { name: "Volatility Barometer", value: 68, signal: "Neutral", description: "regime:high_volatility|Combined gauge: 68%", category: "Barometer" },
                { name: "VIX Level", value: 22, signal: "Neutral", description: "Current spot VIX: 22.00", category: "VIX Levels" },
                { name: "VIX3M/VIX Ratio", value: 1.02, signal: "Neutral", description: "Flat structure: 1.020", category: "Term Structure" },
                { name: "VTS Cash VIX Oscillator", value: 4.5, signal: "Neutral", description: "Oscillator: 4.50 (higher=bullish)", category: "Oscillators" },
                { name: "Cash VIX Oscillator Percentile", value: 55, signal: "Neutral", description: "Percentile: 55th (lower=bullish)", category: "Oscillators" },
                { name: "Roll Yield", value: 5, signal: "Neutral", description: "Annualized: 5.0%", category: "Yield" },
                { name: "Volatility Risk Premium", value: 1.0, signal: "Neutral", description: "VIX - HV20: 1.00", category: "Premium" },
                { name: "VTS Crush Level", value: 0.1, signal: "Neutral", description: "Daily VXX decay: 0.10%", category: "Decay" },
            ]
        };
    }
  }

  private getRegimeStrategies(regime: MarketRegime) {
      if (regime === "stable_contango") {
          return [
              { name: "Strategic Tail Risk", position: "SPY" }, // S&P 500 (barometer < 55%)
              { name: "Tactical Volatility", position: "SVXY" }, // Short Vol
              { name: "Defensive Rotation", position: "QLD" }, // 2x Nasdaq
              { name: "Iron Condor", position: "OPEN" },
          ];
      } else if (regime === "vol_spike") {
          return [
              { name: "Strategic Tail Risk", position: "VIXM" }, // Long Vol (barometer > 80%)
              { name: "Tactical Volatility", position: "VXX" }, // Long Vol
              { name: "Defensive Rotation", position: "CASH" }, // Safety
              { name: "Iron Condor", position: "CLOSED" },
          ];
      } else { // high_volatility (55-80%)
          return [
              { name: "Strategic Tail Risk", position: "IYR" }, // Real Estate (neutral zone)
              { name: "Tactical Volatility", position: "GLD" }, // Gold (defensive)
              { name: "Defensive Rotation", position: "XLU" }, // Utilities
              { name: "Iron Condor", position: "CLOSED" },
          ];
      }
  }
}

export const storage = new DatabaseStorage();
