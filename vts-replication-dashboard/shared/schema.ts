import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Volatility Metrics (The "Barometer")
export const volatilityMetrics = pgTable("volatility_metrics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., "Cash VIX Oscillator", "VRP"
  value: decimal("value").notNull(),
  description: text("description"),
  category: text("category"), // "Term Structure", "Mean Reversion", etc.
  signal: text("signal"), // "Bullish", "Bearish", "Neutral"
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Strategies
export const strategies = pgTable("strategies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., "Tactical Volatility", "Defensive Rotation"
  currentPosition: text("current_position").notNull(), // e.g., "SVXY", "CASH", "UVXY"
  lastSignalDate: timestamp("last_signal_date").defaultNow(),
  performanceYTD: decimal("performance_ytd").default("0"),
  description: text("description"),
});

// Signals/History
export const signals = pgTable("signals", {
  id: serial("id").primaryKey(),
  strategyId: integer("strategy_id").notNull(),
  position: text("position").notNull(),
  date: timestamp("date").defaultNow(),
  reason: text("reason"), // e.g., "VIX < 15 and Contango > 5%"
});

// Barometer History (daily readings)
export const barometerHistory = pgTable("barometer_history", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  value: decimal("value").notNull(),
  regime: text("regime"), // "stable_contango", "vol_spike", "high_volatility"
  vixLevel: decimal("vix_level"),
  tacticalPosition: text("tactical_position"),
  defensivePosition: text("defensive_position"),
  strategicPosition: text("strategic_position"),
});

// === SCHEMA GENERATION ===
export const insertMetricSchema = createInsertSchema(volatilityMetrics).omit({ id: true, updatedAt: true });
export const insertStrategySchema = createInsertSchema(strategies).omit({ id: true });
export const insertSignalSchema = createInsertSchema(signals).omit({ id: true, date: true });
export const insertBarometerHistorySchema = createInsertSchema(barometerHistory).omit({ id: true });

// === TYPES ===
export type VolatilityMetric = typeof volatilityMetrics.$inferSelect;
export type Strategy = typeof strategies.$inferSelect;
export type Signal = typeof signals.$inferSelect;
export type BarometerHistory = typeof barometerHistory.$inferSelect;

export type InsertMetric = z.infer<typeof insertMetricSchema>;
export type InsertStrategy = z.infer<typeof insertStrategySchema>;
export type InsertSignal = z.infer<typeof insertSignalSchema>;
export type InsertBarometerHistory = z.infer<typeof insertBarometerHistorySchema>;

export type MarketRegime = "stable_contango" | "vol_spike" | "high_volatility";
