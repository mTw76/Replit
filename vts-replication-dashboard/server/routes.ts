import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { type MarketRegime } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Seed data on startup
  await storage.seedInitialData();

  app.get(api.metrics.list.path, async (req, res) => {
    const metrics = await storage.getMetrics();
    res.json(metrics);
  });

  app.get(api.strategies.list.path, async (req, res) => {
    const strategies = await storage.getStrategies();
    res.json(strategies);
  });

  app.get(api.strategies.get.path, async (req, res) => {
    const strategy = await storage.getStrategy(Number(req.params.id));
    if (!strategy) {
      return res.status(404).json({ message: "Strategy not found" });
    }
    res.json(strategy);
  });

  app.post(api.metrics.updateAll.path, async (req, res) => {
    try {
      const { regime } = api.metrics.updateAll.input.parse(req.body);
      await storage.resetMetrics(regime as MarketRegime);
      res.json({ message: `Market regime updated to ${regime}` });
    } catch (err) {
       if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Live data refresh endpoint - uses FRED API key from environment
  app.post(api.metrics.refreshLive.path, async (req, res) => {
    try {
      const fredApiKey = process.env.FRED_API_KEY?.trim();
      
      if (!fredApiKey) {
        return res.json({ 
          success: false, 
          regime: 'unknown', 
          message: 'FRED_API_KEY not configured. Please add your FRED API key in the Secrets tab.' 
        });
      }
      
      // FRED API keys must be exactly 32 characters
      if (fredApiKey.length !== 32) {
        console.log(`[FRED] API key length: ${fredApiKey.length} (expected 32)`);
        return res.json({ 
          success: false, 
          regime: 'unknown', 
          message: `FRED API key format issue: expected 32 characters, got ${fredApiKey.length}. Please check your API key in Secrets.` 
        });
      }
      
      const result = await storage.refreshFromLiveData(fredApiKey);
      res.json(result);
    } catch (err) {
      console.error('Error refreshing live data:', err);
      res.status(500).json({ 
        success: false, 
        regime: 'unknown', 
        message: 'Internal server error while fetching live data' 
      });
    }
  });

  // Get barometer history (past N days)
  app.get('/api/barometer-history', async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 10;
      const history = await storage.getBarometerHistory(days);
      res.json(history);
    } catch (err) {
      console.error('Error fetching barometer history:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  return httpServer;
}
