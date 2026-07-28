import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface BarometerGaugeProps {
  value: number;
  regime: string;
}

export function BarometerGauge({ value, regime }: BarometerGaugeProps) {
  // VTS Standard: LOWER = more bullish (0-55% bullish, 55-80% neutral, 80%+ bearish)
  const isBullish = value < 55;
  const isBearish = value > 80;
  
  const getRegimeLabel = (regime: string) => {
    switch (regime) {
      case 'stable_contango': return 'Stable Contango';
      case 'vol_spike': return 'Volatility Spike';
      case 'high_volatility': return 'Elevated Volatility';
      default: return 'Unknown';
    }
  };
  
  const getSignalText = () => {
    // VTS: Lower value = more bullish
    if (value < 35) return 'Strong Short Vol';
    if (value < 55) return 'Short Vol Favorable';
    if (value < 70) return 'Neutral Zone';
    if (value < 80) return 'Caution Zone';
    return 'Risk Off / Long Vol';
  };
  
  const getGradientColors = () => {
    if (isBullish) return 'from-emerald-500 to-emerald-600';
    if (isBearish) return 'from-red-500 to-red-600';
    return 'from-amber-500 to-amber-600';
  };
  
  const getBackgroundGlow = () => {
    if (isBullish) return 'shadow-emerald-500/20';
    if (isBearish) return 'shadow-red-500/20';
    return 'shadow-amber-500/20';
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-500",
        "border-white/10 shadow-2xl",
        getBackgroundGlow()
      )}
      data-testid="barometer-gauge"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className={cn(
              "p-2 rounded-lg",
              isBullish ? "bg-emerald-500/20" : isBearish ? "bg-red-500/20" : "bg-amber-500/20"
            )}>
              {isBullish && <TrendingUp className="w-6 h-6 text-emerald-500" />}
              {isBearish && <TrendingDown className="w-6 h-6 text-red-500" />}
              {!isBullish && !isBearish && <Minus className="w-6 h-6 text-amber-500" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground font-display">
                VTS Volatility Barometer
              </h3>
              <p className="text-xs text-muted-foreground">
                Combined 13-metric gauge
              </p>
            </div>
          </div>
          
          <div className="flex items-end gap-4">
            <span className={cn(
              "text-5xl font-bold font-mono tabular-nums tracking-tight",
              isBullish ? "text-emerald-500" : isBearish ? "text-red-500" : "text-amber-500"
            )}>
              {value.toFixed(0)}%
            </span>
            <div className="pb-2">
              <span className={cn(
                "text-sm font-bold uppercase tracking-wider",
                isBullish ? "text-emerald-500" : isBearish ? "text-red-500" : "text-amber-500"
              )}>
                {getSignalText()}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                Regime: {getRegimeLabel(regime)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 max-w-md">
          <div className="relative h-8 bg-secondary/50 rounded-full overflow-hidden border border-white/10">
            <div 
              className={cn(
                "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r transition-all duration-700",
                getGradientColors()
              )}
              style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
            
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <span className="text-[10px] font-bold text-white/70 z-10">0%</span>
              <div className="flex-1 relative">
                <div className="absolute h-4 w-px bg-white/30" style={{ left: '55%' }} />
                <div className="absolute h-4 w-px bg-white/30" style={{ left: '80%' }} />
              </div>
              <span className="text-[10px] font-bold text-white/70 z-10">100%</span>
            </div>
          </div>
          
          <div className="flex justify-between mt-2 text-[10px] font-medium text-muted-foreground">
            <span className="text-emerald-400">Bullish (Short Vol)</span>
            <span className="text-amber-400">Neutral</span>
            <span className="text-red-400">Bearish (Risk Off)</span>
          </div>
          
          <div className="flex justify-between mt-3 text-[9px] text-muted-foreground/70">
            <span>0-55%: SSO/SVXY</span>
            <span>55-80%: IYR/GLD</span>
            <span>80%+: VIXM/VXX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
