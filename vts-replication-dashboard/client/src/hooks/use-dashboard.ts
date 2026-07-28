import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type MarketRegime } from "@shared/schema";

// Fetch Metrics
export function useMetrics() {
  return useQuery({
    queryKey: [api.metrics.list.path],
    queryFn: async () => {
      const res = await fetch(api.metrics.list.path);
      if (!res.ok) throw new Error("Failed to fetch metrics");
      return api.metrics.list.responses[200].parse(await res.json());
    },
    // Refresh frequently to simulate live data
    refetchInterval: 5000,
  });
}

// Fetch Strategies
export function useStrategies() {
  return useQuery({
    queryKey: [api.strategies.list.path],
    queryFn: async () => {
      const res = await fetch(api.strategies.list.path);
      if (!res.ok) throw new Error("Failed to fetch strategies");
      return api.strategies.list.responses[200].parse(await res.json());
    },
  });
}

// Simulate Regime Change
export function useSimulateRegime() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (regime: MarketRegime) => {
      const res = await fetch(api.metrics.updateAll.path, {
        method: api.metrics.updateAll.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regime }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to update simulation");
      }
      
      return api.metrics.updateAll.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      // Invalidate everything to refresh UI immediately
      queryClient.invalidateQueries({ queryKey: [api.metrics.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.strategies.list.path] });
    },
  });
}

// Refresh Live Data from FRED API
export function useRefreshLiveData() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.metrics.refreshLive.path, {
        method: api.metrics.refreshLive.method,
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) {
        throw new Error("Failed to refresh live data");
      }
      
      return api.metrics.refreshLive.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      // Invalidate everything to refresh UI immediately
      queryClient.invalidateQueries({ queryKey: [api.metrics.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.strategies.list.path] });
    },
  });
}
