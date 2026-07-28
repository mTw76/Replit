# VTS Replication Dashboard

A full-stack volatility trading strategies (VTS) replication dashboard built on Replit. Displays real-time volatility metrics and trading signals by fetching VIX and market data, computing proprietary indicators, and presenting strategy positions based on market regime detection.

## What It Does

- Fetches live VIX term structure data (Yahoo Finance) and optional futures data (VIX Central)
- Calculates the **Volatility Barometer** (0–100%, lower = more bullish)
- Maps barometer readings to positions across three strategy sleeves:
  - **Tactical Volatility** — SVXY / IAU / VXX
  - **Defensive Rotation** — QLD / CASH / CASH
  - **Strategic Tail Risk** — SPY / IYR / VIXM
- Saves barometer history to Postgres and renders it as a chart
- Includes a downloadable Python script (`public/vts_strategy.py`) replicating the strategy logic with `yfinance`

## Barometer Thresholds

| Range | Regime | Posture |
|-------|--------|---------|
| 0–55% | Bullish | Short volatility |
| 55–80% | Neutral | Defensive / cash |
| 80%+ | Bearish | Long volatility |

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React + TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend | Express.js + TypeScript |
| Database | Neon PostgreSQL via Drizzle ORM |
| State | TanStack React Query (5-second polling) |
| Validation | Zod (shared route contracts) |

## Getting Started

### Prerequisites

- Node.js 20+
- A [Neon](https://neon.tech) PostgreSQL database (`DATABASE_URL`)
- Optional: `FRED_API_KEY` for Federal Reserve VIX historical data

### Install & Run

```bash
npm install
npm run dev        # starts Express + Vite dev server on port 5000
```

### Database Migrations

```bash
npm run db:push    # applies Drizzle schema to your Postgres instance
```

## Python Script

`public/vts_strategy.py` — standalone script that replicates the VTS methodology using public data.

```bash
pip install yfinance pandas numpy
python public/vts_strategy.py
```

## Project Structure

```
client/          React frontend (pages, components, hooks)
server/          Express backend (routes, storage, data fetching)
shared/          Zod schemas + DB schema shared by both sides
public/          Static assets + Python strategy script
script/          DB migration helpers
```

## Source Methodology

Strategy rules derived from [VTS (Volatility Trading Strategies)](https://www.volatilitytradingstrategies.com) by Brent Osachoff.
