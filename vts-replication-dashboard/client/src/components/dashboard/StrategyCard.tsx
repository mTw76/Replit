import { Strategy } from "@shared/schema";
import { TrendingUp, TrendingDown, DollarSign, Shield, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface StrategyCardProps {
  strategy: Strategy;
}

export function StrategyCard({ strategy }: StrategyCardProps) {
  const perf = Number(strategy.performanceYTD);
  const isPositive = perf >= 0;
  
  // Strategy Icons based on name logic
  const getIcon = () => {
    if (strategy.name.includes("Tactical")) return <Zap className="w-5 h-5" />;
    if (strategy.name.includes("Defensive")) return <Shield className="w-5 h-5" />;
    return <DollarSign className="w-5 h-5" />;
  };

  // Position color logic
  const getPositionVariant = (pos: string) => {
    if (["CASH", "GLD", "IEF", "TLT", "SHV"].some(s => pos.includes(s))) return "warning";
    if (["UVXY", "VXX"].some(s => pos.includes(s))) return "danger"; // Short vol logic usually implies inverse, but UVXY is long vol instrument (bearish market)
    if (["SVXY", "SPY", "QQQ", "MDY"].some(s => pos.includes(s))) return "success";
    return "secondary";
  };

  return (
    <div className="group relative bg-card rounded-2xl border border-border/50 p-6 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-bold text-lg font-display tracking-tight text-foreground">{strategy.name}</h3>
            <p className="text-xs text-muted-foreground">{strategy.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-1.5 uppercase tracking-wider">Current Position</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-mono">{strategy.currentPosition}</span>
            <Badge variant={getPositionVariant(strategy.currentPosition)} className="h-5">
              Active
            </Badge>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground font-medium mb-1.5 uppercase tracking-wider">YTD Performance</p>
          <div className={cn(
            "flex items-center justify-end gap-1.5 text-2xl font-bold font-mono tabular-nums",
            isPositive ? "text-emerald-500" : "text-red-500"
          )}>
            {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            {perf > 0 ? "+" : ""}{perf.toFixed(2)}%
          </div>
        </div>
      </div>
      
      {/* Progress bar visual for YTD */}
      <div className="mt-4 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-1000 ease-out", isPositive ? "bg-emerald-500" : "bg-red-500")}
          style={{ width: `${Math.min(Math.abs(perf) * 2, 100)}%` }} // Simple scaling
        />
      </div>
    </div>
  );
}
