# VTS Replication Dashboard

## Overview

A volatility trading strategies (VTS) replication dashboard that displays real-time volatility metrics and trading signals. The application fetches VIX and market data from external APIs (FRED, Alpha Vantage), calculates proprietary volatility indicators, and presents strategy positions based on market regime detection. Users can simulate different market conditions or refresh live data to see how strategies respond.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state, with automatic refetching every 5 seconds for live data feel
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming (dark mode financial dashboard aesthetic)
- **Fonts**: Space Grotesk (display), Manrope (body), JetBrains Mono (monospace)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL (Neon serverless)
- **Build Process**: esbuild for server bundling, Vite for client bundling

### Data Flow
1. Backend fetches VIX term structure data from Yahoo Finance (real-time)
2. Optionally fetches VIX futures data from VIX Central (M1/M2, contango, HV20)
3. Calculates derived metrics (term structure ratio, volatility risk premium, roll yield)
4. Computes Volatility Barometer (0-100%, where LOWER = more bullish)
5. Updates strategy positions based on barometer thresholds
6. Frontend polls `/api/metrics` and `/api/strategies` endpoints

### VTS Strategy Rules (Confirmed from VTS Emails)

**Volatility Barometer Thresholds:**
- 0-55%: Bullish (favorable for short vol)
- 55-80%: Neutral (defensive positioning)
- 80%+: Bearish (risk-off, long vol)

**Strategy Positions by Barometer:**

| Barometer | Tactical Volatility | Defensive Rotation | Strategic Tail Risk |
|-----------|---------------------|--------------------|--------------------|
| 0-55%     | SVXY (short vol)    | QLD (2x NASDAQ)    | SPY (S&P 500)      |
| 55-80%    | IAU (Gold)          | CASH               | IYR (Real Estate)  |
| 80%+      | VXX (long vol)      | CASH               | VIXM (long vol)    |

**Portfolio Allocation:**
- 1/3 Tactical Volatility Strategy
- 1/3 Defensive Rotation Strategy
- 1/3 Strategic Tail Risk Strategy
- Optional: Bitcoin Breakpoint Strategy (0% official allocation)

### Key Design Patterns
- **Shared Schema**: Database schema and types defined in `shared/schema.ts`, used by both frontend and backend
- **Route Contracts**: API routes defined with Zod schemas in `shared/routes.ts` for type-safe API calls
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` allows swapping database implementations

### Database Schema
Three main tables:
- `volatility_metrics`: Stores indicator values (VIX level, term structure, VRP, etc.) with signals
- `strategies`: Trading strategy positions and YTD performance
- `signals`: Historical signal log for audit trail

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless Postgres via `@neondatabase/serverless`
- **Connection**: Requires `DATABASE_URL` environment variable

### External APIs
- **FRED API**: Federal Reserve Economic Data for VIX historical data (requires `FRED_API_KEY`)
- **Alpha Vantage**: Broader market data (SPY prices, etc.)

### Key NPM Packages
- `drizzle-orm` / `drizzle-kit`: Database ORM and migrations
- `@tanstack/react-query`: Async state management
- `zod`: Schema validation for API contracts
- `express`: HTTP server framework
- Radix UI primitives: Accessible UI component foundations

### Development Tools
- Replit-specific Vite plugins for error overlay and dev tools
- `tsx` for running TypeScript directly in development