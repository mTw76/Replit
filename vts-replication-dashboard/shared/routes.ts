import { z } from 'zod';
import { insertMetricSchema, insertStrategySchema, insertSignalSchema, volatilityMetrics, strategies, signals } from './schema';

export const api = {
  metrics: {
    list: {
      method: 'GET' as const,
      path: '/api/metrics',
      responses: {
        200: z.array(z.custom<typeof volatilityMetrics.$inferSelect>()),
      },
    },
    updateAll: {
      method: 'POST' as const,
      path: '/api/metrics/simulate',
      input: z.object({
        regime: z.enum(["stable_contango", "vol_spike", "high_volatility"]),
      }),
      responses: {
        200: z.object({ message: z.string() }),
      },
    },
    refreshLive: {
      method: 'POST' as const,
      path: '/api/metrics/refresh',
      responses: {
        200: z.object({ 
          success: z.boolean(),
          regime: z.string(),
          message: z.string() 
        }),
      },
    },
  },
  strategies: {
    list: {
      method: 'GET' as const,
      path: '/api/strategies',
      responses: {
        200: z.array(z.custom<typeof strategies.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/strategies/:id',
      responses: {
        200: z.custom<typeof strategies.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
