/**
 * Market Data Service - Fetches real VIX and market data
 * Uses Yahoo Finance for VIX term structure (real-time)
 * Uses VIX Central for VIX futures contango data
 * 
 * VTS Methodology:
 * - Volatility Barometer: 0-100% where LOWER = more bullish (favorable for short vol)
 * - Thresholds: 0-55% bullish (SSO/SVXY), 55-80% neutral/defensive, 80%+ bearish (long vol)
 */

export interface MarketDataPoint {
  date: string;
  value: number;
}

export interface VIXTermStructure {
  vix9d: number | null;
  vix: number;
  vix3m: number;
  vix6m: number | null;
}

// VIX Central data for futures contango
export interface VIXFuturesData {
  m1: number | null;  // Front month VIX futures
  m2: number | null;  // Second month VIX futures
  contango: number | null;  // M1:M2 contango percentage
  hv20: number | null;  // 20-day historical volatility
}

export interface CalculatedMetrics {
  // Core VIX levels
  vix9d: number | null;
  vixLevel: number;
  vix3m: number;
  vix6m: number | null;
  
  // VIX Futures (from VIX Central)
  m1Futures: number | null;
  m2Futures: number | null;
  m1m2Contango: number | null;
  hv20: number | null;
  
  // Ratios/Term Structure
  termStructureVix3mVix: number;   // VIX3M / VIX
  termStructureVix6mVix: number | null;  // VIX6M / VIX
  
  // Crossovers (ratios indicating momentum)
  crossoverVix9dVix: number | null;  // VIX9D / VIX (fast)
  crossoverVixVix3m: number;          // VIX / VIX3M (medium)
  crossoverVixVix6m: number | null;   // VIX / VIX6M (slow)
  
  // VTS-style derived metrics
  cashVIXOscillator: number;
  cashVIXOscillatorPercentile: number;  // Percentile rank 0-100
  volatilityRiskPremium: number;  // VIX - HV20
  rollYield: number;
  crushLevel: number;
  
  // Combined Volatility Barometer (0-100%)
  // LOWER = more bullish (VTS standard)
  volatilityBarometer: number;
  
  // Market regime
  regime: 'stable_contango' | 'vol_spike' | 'high_volatility';
}

// Fetch VIX9D and VIX6M from Yahoo Finance
async function fetchYahooVIX(symbol: string): Promise<number | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=5d`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      console.error(`[Yahoo] Error fetching ${symbol}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    const result = data?.chart?.result?.[0];
    
    if (result?.meta?.regularMarketPrice) {
      return result.meta.regularMarketPrice;
    }
    
    const closes = result?.indicators?.quote?.[0]?.close;
    if (closes && closes.length > 0) {
      for (let i = closes.length - 1; i >= 0; i--) {
        if (closes[i] !== null) return closes[i];
      }
    }
    
    return null;
  } catch (error) {
    console.error(`[Yahoo] Error fetching ${symbol}:`, error);
    return null;
  }
}

// Fetch VIX Futures data from VIX Central (M1, M2, contango, HV20)
export async function fetchVIXCentralData(): Promise<VIXFuturesData> {
  try {
    console.log('[VIXCentral] Fetching futures and HV data...');
    
    const response = await fetch('http://vixcentral.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      console.error(`[VIXCentral] Error: ${response.status}`);
      return { m1: null, m2: null, contango: null, hv20: null };
    }
    
    const html = await response.text();
    
    // Parse M1 and M2 futures prices from the page
    // VIX Central shows futures as "17.160" etc in the chart data
    let m1: number | null = null;
    let m2: number | null = null;
    let contango: number | null = null;
    let hv20: number | null = null;
    
    // Extract contango percentage (first value after "% Contango")
    const contangoMatch = html.match(/% Contango[^0-9]*1[^0-9]*([\d.-]+)%/);
    if (contangoMatch) {
      contango = parseFloat(contangoMatch[1]);
    }
    
    // Extract HV20 from the data (look for HV20 value)
    const hv20Match = html.match(/HV20[^0-9]*([\d.]+)/i);
    if (hv20Match) {
      hv20 = parseFloat(hv20Match[1]);
    }
    
    // Try to extract futures prices from chart data
    // The page shows values like "17.160" for each month
    const futuresMatches = html.match(/(\d{2}\.\d{2,3})​/g);
    if (futuresMatches && futuresMatches.length >= 2) {
      m1 = parseFloat(futuresMatches[0].replace('​', ''));
      m2 = parseFloat(futuresMatches[1].replace('​', ''));
    }
    
    console.log(`[VIXCentral] M1: ${m1}, M2: ${m2}, Contango: ${contango}%, HV20: ${hv20}`);
    
    return { m1, m2, contango, hv20 };
  } catch (error) {
    console.error('[VIXCentral] Error:', error);
    return { m1: null, m2: null, contango: null, hv20: null };
  }
}

// Fetch all VIX term structure data from Yahoo Finance (real-time)
export async function fetchFullVIXTermStructure(fredApiKey: string): Promise<VIXTermStructure | null> {
  try {
    console.log(`[Yahoo] Fetching all VIX term structure data...`);
    
    // Fetch all VIX data from Yahoo Finance in parallel
    const [vix9d, vix, vix3m, vix6m] = await Promise.all([
      fetchYahooVIX('^VIX9D'),
      fetchYahooVIX('^VIX'),
      fetchYahooVIX('^VIX3M'),
      fetchYahooVIX('^VIX6M')
    ]);
    
    console.log(`[Yahoo] VIX9D: ${vix9d}, VIX: ${vix}, VIX3M: ${vix3m}, VIX6M: ${vix6m}`);
    
    if (vix && vix3m) {
      return { 
        vix9d, 
        vix, 
        vix3m, 
        vix6m 
      };
    }
    
    console.error('[Yahoo] Failed to fetch VIX or VIX3M values');
    return null;
  } catch (error) {
    console.error('Error fetching VIX term structure:', error);
    return null;
  }
}

// Legacy function for backward compatibility
export async function fetchVIXTermStructure(fredApiKey: string): Promise<{vix: number; vix3m: number} | null> {
  const result = await fetchFullVIXTermStructure(fredApiKey);
  if (result) {
    return { vix: result.vix, vix3m: result.vix3m };
  }
  return null;
}

// Calculate a percentile score for a metric (0-100)
// For VTS Barometer: LOWER score = more bullish
function calculatePercentile(value: number, bullishThreshold: number, bearishThreshold: number, invert: boolean = false): number {
  const range = bearishThreshold - bullishThreshold;
  let percentile = ((value - bullishThreshold) / range) * 100;
  percentile = Math.max(0, Math.min(100, percentile));
  return invert ? 100 - percentile : percentile;
}

// Historical ranges for Cash VIX Oscillator percentile calculation
// Based on VTS data: highest 15.28 (Mar 2012), lowest -43.98 (Feb 2018), median ~6.66
const CASH_VIX_OSC_RANGES = {
  p5: -3.58,   // 5th percentile (extreme fear)
  p30: 3.5,    // 30th percentile (elevated risk)
  p50: 6.66,   // Median
  p70: 8.0,    // 70th percentile (favorable)
  p95: 12.0    // 95th percentile (very calm)
};

function getCashVIXOscillatorPercentile(value: number): number {
  // Convert raw oscillator value to percentile rank (0-100)
  // Lower oscillator = higher percentile (more bearish in VTS terms)
  if (value <= CASH_VIX_OSC_RANGES.p5) return 95;
  if (value >= CASH_VIX_OSC_RANGES.p95) return 5;
  
  // Linear interpolation between known points
  if (value < CASH_VIX_OSC_RANGES.p30) {
    return 70 + ((CASH_VIX_OSC_RANGES.p30 - value) / (CASH_VIX_OSC_RANGES.p30 - CASH_VIX_OSC_RANGES.p5)) * 25;
  }
  if (value < CASH_VIX_OSC_RANGES.p50) {
    return 50 + ((CASH_VIX_OSC_RANGES.p50 - value) / (CASH_VIX_OSC_RANGES.p50 - CASH_VIX_OSC_RANGES.p30)) * 20;
  }
  if (value < CASH_VIX_OSC_RANGES.p70) {
    return 30 + ((CASH_VIX_OSC_RANGES.p70 - value) / (CASH_VIX_OSC_RANGES.p70 - CASH_VIX_OSC_RANGES.p50)) * 20;
  }
  return 5 + ((CASH_VIX_OSC_RANGES.p95 - value) / (CASH_VIX_OSC_RANGES.p95 - CASH_VIX_OSC_RANGES.p70)) * 25;
}

// Calculate full VTS-style metrics from term structure data
// Optional VIX Central data for enhanced calculations
export function calculateFullVTSMetrics(
  termStructure: VIXTermStructure, 
  vixCentralData?: VIXFuturesData
): CalculatedMetrics {
  const { vix9d, vix, vix3m, vix6m } = termStructure;
  
  // VIX Central data (if available)
  const m1 = vixCentralData?.m1 ?? null;
  const m2 = vixCentralData?.m2 ?? null;
  const m1m2Contango = vixCentralData?.contango ?? null;
  const hv20 = vixCentralData?.hv20 ?? null;
  
  // Term Structure Ratios (>1 = contango)
  const termStructureVix3mVix = vix3m / vix;
  const termStructureVix6mVix = vix6m ? vix6m / vix : null;
  
  // Crossover Ratios (short-term / long-term)
  // Values < 1 indicate short-term vol below long-term (bullish for short vol)
  const crossoverVix9dVix = vix9d ? vix9d / vix : null;
  const crossoverVixVix3m = vix / vix3m;
  const crossoverVixVix6m = vix6m ? vix / vix6m : null;
  
  // Roll Yield: annualized gain from contango (using M1:M2 if available, else VIX:VIX3M)
  let rollYield: number;
  if (m1 && m2 && m1m2Contango !== null) {
    // Use actual futures contango from VIX Central (annualized)
    rollYield = m1m2Contango * 12; // Monthly to annual
  } else {
    rollYield = ((vix3m - vix) / vix) * (365 / 90) * 100;
  }
  
  // Cash VIX Oscillator: combines all cash VIX term structure ratios
  // Higher value = more bullish for short vol
  let cashVIXOscillator = 5; // Base value
  
  // Add contributions from each crossover
  if (crossoverVix9dVix !== null) {
    cashVIXOscillator += (1 - crossoverVix9dVix) * 5; // VIX9D < VIX adds positively
  }
  cashVIXOscillator += (1 - crossoverVixVix3m) * 3; // VIX < VIX3M adds positively
  if (crossoverVixVix6m !== null) {
    cashVIXOscillator += (1 - crossoverVixVix6m) * 2; // VIX < VIX6M adds positively
  }
  
  // Adjust for absolute VIX level
  const vixMidpoint = 18;
  cashVIXOscillator += ((vixMidpoint - vix) / vixMidpoint) * 3;
  
  // Get percentile rank for Cash VIX Oscillator
  const cashVIXOscillatorPercentile = getCashVIXOscillatorPercentile(cashVIXOscillator);
  
  // Volatility Risk Premium: VIX - HV20 (implied vs realized)
  // Use HV20 from VIX Central if available, otherwise estimate
  let volatilityRiskPremium: number;
  if (hv20 !== null) {
    volatilityRiskPremium = vix - hv20;
  } else {
    // Estimate: typical VRP is 2-4 points when VIX is around 15-20
    volatilityRiskPremium = vix * 0.15;
  }
  
  // Crush Level: estimated daily VXX decay from contango
  const crushLevel = termStructureVix3mVix > 1 
    ? (termStructureVix3mVix - 1) * 3 
    : -(1 - termStructureVix3mVix) * 3;
  
  // === VOLATILITY BAROMETER CALCULATION ===
  // VTS Standard: 0-100% where LOWER = more bullish
  // Thresholds: 0-55% bullish, 55-80% neutral, 80%+ bearish
  
  const barometerComponents: number[] = [];
  
  // 1. VIX Level - Lower VIX = lower barometer score (bullish)
  // Range: 12-30, where 12 = 0% (bullish), 30 = 100% (bearish)
  barometerComponents.push(calculatePercentile(vix, 12, 30, false));
  
  // 2. VIX3M/VIX Term Structure - Higher ratio = lower score (bullish)
  // Range: 0.9-1.15, where 1.15 = 0% (bullish), 0.9 = 100% (bearish)
  barometerComponents.push(calculatePercentile(termStructureVix3mVix, 1.15, 0.9, false));
  
  // 3. Cash VIX Oscillator Percentile - already in correct orientation
  barometerComponents.push(cashVIXOscillatorPercentile);
  
  // 4. Roll Yield - Positive = lower score (bullish)
  // Range: -10 to 20, where 20 = 0% (bullish), -10 = 100% (bearish)
  barometerComponents.push(calculatePercentile(rollYield, 20, -10, false));
  
  // 5. VRP - Positive = lower score (bullish)
  // Range: -2 to 6, where 6 = 0% (bullish), -2 = 100% (bearish)
  barometerComponents.push(calculatePercentile(volatilityRiskPremium, 6, -2, false));
  
  // 6. VIX/VIX3M Crossover - Lower ratio = lower score (bullish)
  // Range: 0.85-1.1, where 0.85 = 0% (bullish), 1.1 = 100% (bearish)
  barometerComponents.push(calculatePercentile(crossoverVixVix3m, 0.85, 1.1, false));
  
  // 7. VIX9D/VIX Crossover (if available)
  if (crossoverVix9dVix !== null) {
    barometerComponents.push(calculatePercentile(crossoverVix9dVix, 0.85, 1.15, false));
  }
  
  // 8. VIX/VIX6M Crossover (if available)
  if (crossoverVixVix6m !== null) {
    barometerComponents.push(calculatePercentile(crossoverVixVix6m, 0.8, 1.05, false));
  }
  
  // 9. M1:M2 Contango (if available from VIX Central)
  if (m1m2Contango !== null) {
    // Range: -10% to 15%, where 15% = 0% (bullish), -10% = 100% (bearish)
    barometerComponents.push(calculatePercentile(m1m2Contango, 15, -10, false));
  }
  
  // Average all components for final barometer
  const volatilityBarometer = barometerComponents.reduce((a, b) => a + b, 0) / barometerComponents.length;
  
  // Determine market regime based on VTS barometer (LOWER = bullish)
  let regime: 'stable_contango' | 'vol_spike' | 'high_volatility';
  
  if (volatilityBarometer < 55 && termStructureVix3mVix > 1.0) {
    regime = 'stable_contango';
  } else if (volatilityBarometer > 80 || termStructureVix3mVix < 0.95 || vix > 30) {
    regime = 'vol_spike';
  } else {
    regime = 'high_volatility';
  }
  
  return {
    vix9d: vix9d ? Math.round(vix9d * 100) / 100 : null,
    vixLevel: Math.round(vix * 100) / 100,
    vix3m: Math.round(vix3m * 100) / 100,
    vix6m: vix6m ? Math.round(vix6m * 100) / 100 : null,
    
    m1Futures: m1 ? Math.round(m1 * 100) / 100 : null,
    m2Futures: m2 ? Math.round(m2 * 100) / 100 : null,
    m1m2Contango: m1m2Contango ? Math.round(m1m2Contango * 100) / 100 : null,
    hv20: hv20 ? Math.round(hv20 * 100) / 100 : null,
    
    termStructureVix3mVix: Math.round(termStructureVix3mVix * 1000) / 1000,
    termStructureVix6mVix: termStructureVix6mVix ? Math.round(termStructureVix6mVix * 1000) / 1000 : null,
    
    crossoverVix9dVix: crossoverVix9dVix ? Math.round(crossoverVix9dVix * 1000) / 1000 : null,
    crossoverVixVix3m: Math.round(crossoverVixVix3m * 1000) / 1000,
    crossoverVixVix6m: crossoverVixVix6m ? Math.round(crossoverVixVix6m * 1000) / 1000 : null,
    
    cashVIXOscillator: Math.round(cashVIXOscillator * 100) / 100,
    cashVIXOscillatorPercentile: Math.round(cashVIXOscillatorPercentile * 10) / 10,
    volatilityRiskPremium: Math.round(volatilityRiskPremium * 100) / 100,
    rollYield: Math.round(rollYield * 100) / 100,
    crushLevel: Math.round(crushLevel * 100) / 100,
    
    volatilityBarometer: Math.round(volatilityBarometer * 10) / 10,
    regime
  };
}

// Legacy function for backward compatibility
export function calculateVTSMetrics(vix: number, vix3m: number, spyChange: number): CalculatedMetrics {
  return calculateFullVTSMetrics({
    vix9d: null,
    vix,
    vix3m,
    vix6m: null
  });
}

// Determine strategy positions based on calculated metrics
// VTS Methodology: Barometer LOWER = more bullish
// Thresholds: 0-55% bullish, 55-80% neutral, 80%+ bearish
export function getStrategyPositions(metrics: CalculatedMetrics) {
  const { 
    regime, vixLevel, termStructureVix3mVix, 
    cashVIXOscillator, cashVIXOscillatorPercentile,
    volatilityBarometer, rollYield, m1m2Contango
  } = metrics;
  
  const positions: Record<string, { position: string; reason: string }> = {};
  
  // === STRATEGIC TAIL RISK STRATEGY ===
  // Uses Volatility Barometer DIRECTLY
  // 0-55%: SPY (S&P 500), 55-80%: IYR (Real Estate), 80%+: VIXM (Long Vol)
  if (volatilityBarometer < 55) {
    positions['Strategic Tail Risk'] = { 
      position: 'SPY', 
      reason: `Barometer ${volatilityBarometer.toFixed(0)}% < 55% → S&P 500`
    };
  } else if (volatilityBarometer < 80) {
    positions['Strategic Tail Risk'] = { 
      position: 'IYR', 
      reason: `Barometer ${volatilityBarometer.toFixed(0)}% in 55-80% → Real Estate`
    };
  } else {
    positions['Strategic Tail Risk'] = { 
      position: 'VIXM', 
      reason: `Barometer ${volatilityBarometer.toFixed(0)}% > 80% → Long Volatility`
    };
  }
  
  // === TACTICAL VOLATILITY STRATEGY ===
  // VTS: Uses Volatility Barometer thresholds
  // 0-55%: SVXY (short volatility), 55-80%: IAU (Gold), 80%+: VXX (long vol)
  const oscPercentile = cashVIXOscillatorPercentile;
  
  if (volatilityBarometer < 55 && regime === 'stable_contango') {
    // Bullish zone = short volatility
    positions['Tactical Volatility'] = { 
      position: 'SVXY', 
      reason: `Barometer ${volatilityBarometer.toFixed(0)}% < 55%, stable contango → Short Vol`
    };
  } else if (volatilityBarometer >= 80) {
    // Extreme risk = long volatility
    positions['Tactical Volatility'] = { 
      position: 'VXX', 
      reason: `Barometer ${volatilityBarometer.toFixed(0)}% >= 80% → Long Vol`
    };
  } else if (volatilityBarometer >= 55) {
    // Neutral zone = safety in Gold (IAU per VTS)
    positions['Tactical Volatility'] = { 
      position: 'IAU', 
      reason: `Barometer ${volatilityBarometer.toFixed(0)}% in 55-80% → Gold`
    };
  } else {
    positions['Tactical Volatility'] = { 
      position: 'SVXY', 
      reason: `Barometer ${volatilityBarometer.toFixed(0)}% → Short Vol`
    };
  }
  
  // === DEFENSIVE ROTATION STRATEGY ===
  // VTS: Uses Volatility Barometer thresholds
  // 0-55%: QLD (2x Nasdaq), 55-80%: CASH, 80%+: CASH (maximum safety)
  const effectiveContango = m1m2Contango ?? (termStructureVix3mVix - 1) * 100;
  
  if (volatilityBarometer < 55) {
    positions['Defensive Rotation'] = { 
      position: 'QLD', 
      reason: `Barometer ${volatilityBarometer.toFixed(0)}% < 55% → 2x Nasdaq`
    };
  } else {
    // 55%+ = defensive/Cash position per VTS Nov 21 email
    positions['Defensive Rotation'] = { 
      position: 'CASH', 
      reason: `Barometer ${volatilityBarometer.toFixed(0)}% >= 55% → Cash`
    };
  }
  
  // === IRON CONDOR STRATEGY ===
  // Opens when VIX in optimal premium range and stable contango
  if (regime === 'stable_contango' && vixLevel > 14 && vixLevel < 22) {
    positions['Iron Condor'] = { 
      position: 'OPEN', 
      reason: `VIX ${vixLevel.toFixed(1)} in optimal range (14-22)`
    };
  } else {
    positions['Iron Condor'] = { 
      position: 'CLOSED', 
      reason: `VIX ${vixLevel.toFixed(1)} outside optimal range or elevated risk`
    };
  }
  
  return positions;
}

// Signal interpretation helpers
// VTS Standard: LOWER barometer = more bullish
export function getSignalFromMetric(name: string, value: number): 'Bullish' | 'Bearish' | 'Neutral' {
  switch (name) {
    case 'VTS Cash VIX Oscillator':
      // Higher oscillator = more bullish
      if (value > 7) return 'Bullish';
      if (value < 4) return 'Bearish';
      return 'Neutral';
    
    case 'Cash VIX Oscillator Percentile':
      // Lower percentile = more bullish (inverted from raw value)
      if (value < 30) return 'Bullish';
      if (value > 70) return 'Bearish';
      return 'Neutral';
    
    case 'VIX Futures Term Structure':
    case 'VIX3M/VIX Ratio':
    case 'VIX6M/VIX Ratio':
      // Higher ratio (contango) = bullish
      if (value > 1.05) return 'Bullish';
      if (value < 0.95) return 'Bearish';
      return 'Neutral';
    
    case 'M1:M2 Contango':
      // Positive contango = bullish
      if (value > 5) return 'Bullish';
      if (value < 0) return 'Bearish';
      return 'Neutral';
    
    case 'Volatility Risk Premium (VRP)':
    case 'Volatility Risk Premium':
      // Positive VRP (VIX > HV20) = bullish
      if (value > 2) return 'Bullish';
      if (value < 0) return 'Bearish';
      return 'Neutral';
    
    case 'VTS Crush Level':
      if (value > 0.3) return 'Bullish';
      if (value < 0) return 'Bearish';
      return 'Neutral';
    
    case 'VX30:VIX Roll Yield':
    case 'Roll Yield':
      // Positive roll yield = bullish
      if (value > 10) return 'Bullish';
      if (value < 0) return 'Bearish';
      return 'Neutral';
      
    case 'VIX Index':
    case 'VIX Level':
    case 'VIX9D':
      // Lower VIX = bullish
      if (value < 16) return 'Bullish';
      if (value > 25) return 'Bearish';
      return 'Neutral';
    
    case 'VIX3M':
    case 'VIX6M':
      if (value < 18) return 'Bullish';
      if (value > 25) return 'Bearish';
      return 'Neutral';
    
    case 'HV20':
      // Lower realized vol = bullish for short vol
      if (value < 12) return 'Bullish';
      if (value > 20) return 'Bearish';
      return 'Neutral';
    
    case 'VIX9D/VIX':
    case 'VIX9D/VIX Crossover':
    case 'VIX/VIX3M':
    case 'VIX/VIX3M Crossover':
    case 'VIX/VIX6M':
    case 'VIX/VIX6M Crossover':
      // Lower ratio = bullish (short-term below long-term)
      if (value < 0.92) return 'Bullish';
      if (value > 1.05) return 'Bearish';
      return 'Neutral';
    
    case 'Volatility Barometer':
      // VTS: LOWER = more bullish
      // 0-55% bullish, 55-80% neutral, 80%+ bearish
      if (value < 55) return 'Bullish';
      if (value > 80) return 'Bearish';
      return 'Neutral';
    
    default:
      return 'Neutral';
  }
}
