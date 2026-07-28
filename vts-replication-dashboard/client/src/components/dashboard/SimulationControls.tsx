import { useSimulateRegime, useRefreshLiveData } from "@/hooks/use-dashboard";
import { Button } from "@/components/ui/button";
import { Zap, ShieldAlert, TrendingUp, Loader2, RefreshCw, Radio } from "lucide-react";
import { type MarketRegime } from "@shared/schema";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function SimulationControls() {
  const { mutate: simulate, isPending } = useSimulateRegime();
  const { mutate: refreshLive, isPending: isRefreshing, data: refreshResult } = useRefreshLiveData();
  const { toast } = useToast();

  const handleSimulate = (regime: MarketRegime) => {
    simulate(regime);
  };

  const handleRefreshLive = () => {
    refreshLive(undefined, {
      onSuccess: (data) => {
        if (data.success) {
          toast({
            title: "Live Data Refreshed",
            description: data.message,
          });
        } else {
          toast({
            title: "Refresh Failed",
            description: data.message,
            variant: "destructive",
          });
        }
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const isAnyPending = isPending || isRefreshing;

  return (
    <div className="space-y-6">
      {/* LIVE DATA REFRESH */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-500">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground font-display">Live Market Data</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Fetch real VIX and term structure data from FRED API to calculate live signals.
              </p>
            </div>
          </div>
          
          <Button
            onClick={handleRefreshLive}
            disabled={isAnyPending}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
            data-testid="button-refresh-live"
          >
            {isRefreshing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Fetching Live Data...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Live Data
              </>
            )}
          </Button>
        </div>
        
        {refreshResult && !refreshResult.success && (
          <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
            {refreshResult.message}
          </div>
        )}
      </div>

      {/* SIMULATION CONTROLS */}
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-xl font-bold text-foreground font-display">Market Regime Simulator</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Manually trigger market conditions to test strategy response logic.
            </p>
          </div>
          
          {isPending && (
            <div className="flex items-center gap-2 text-primary text-sm animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Recalculating Signals...</span>
            </div>
          )}
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => handleSimulate("stable_contango")}
          disabled={isPending}
          className={cn(
            "relative group overflow-hidden rounded-xl border p-5 text-left transition-all duration-300",
            "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="font-bold text-emerald-500">Stable Contango</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Low volatility, VIX futures in contango. Strategies should favor Short Volatility (SVXY) and Equities.
          </p>
        </button>

        <button
          onClick={() => handleSimulate("vol_spike")}
          disabled={isPending}
          className={cn(
            "relative group overflow-hidden rounded-xl border p-5 text-left transition-all duration-300",
            "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="font-bold text-amber-500">Volatility Spike</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Sudden VIX increase. Strategies rotate to Safety (Cash, Gold, Utilities) or partial hedges.
          </p>
        </button>

        <button
          onClick={() => handleSimulate("high_volatility")}
          disabled={isPending}
          className={cn(
            "relative group overflow-hidden rounded-xl border p-5 text-left transition-all duration-300",
            "border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-red-500/20 text-red-500">
              <Zap className="w-5 h-5" />
            </div>
            <span className="font-bold text-red-500">High Vol / Crash</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Sustained fear. Strategies deploy Long Volatility (UVXY) or heavy cash positions.
          </p>
        </button>
        </div>
      </div>
    </div>
  );
}
