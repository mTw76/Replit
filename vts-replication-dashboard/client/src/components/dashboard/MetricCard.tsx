import { VolatilityMetric } from "@shared/schema";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  metric: VolatilityMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const isBullish = metric.signal === "Bullish";
  const isBearish = metric.signal === "Bearish";
  
  // Determine colors based on signal
  const statusColor = isBullish 
    ? "text-emerald-500" 
    : isBearish 
      ? "text-red-500" 
      : "text-amber-500";
      
  const bgGradient = isBullish
    ? "from-emerald-500/5 to-transparent"
    : isBearish
      ? "from-red-500/5 to-transparent"
      : "from-amber-500/5 to-transparent";

  const borderColor = isBullish
    ? "border-emerald-500/20 hover:border-emerald-500/40"
    : isBearish
      ? "border-red-500/20 hover:border-red-500/40"
      : "border-amber-500/20 hover:border-amber-500/40";

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-lg group",
      borderColor
    )}>
      {/* Background Gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", bgGradient)} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {metric.category || "Indicator"}
            </p>
            <h3 className="text-sm font-bold text-foreground font-display leading-tight pr-2">
              {metric.name}
            </h3>
          </div>
          <div className={cn("p-1.5 rounded-full bg-background/50 backdrop-blur-sm border", borderColor)}>
            {isBullish && <ArrowUp className="w-4 h-4 text-emerald-500" />}
            {isBearish && <ArrowDown className="w-4 h-4 text-red-500" />}
            {!isBullish && !isBearish && <Minus className="w-4 h-4 text-amber-500" />}
          </div>
        </div>

        <div className="flex items-end justify-between mt-2">
          <div className="flex flex-col">
            <span className={cn("text-2xl font-bold font-mono tabular-nums tracking-tight", statusColor)}>
              {Number(metric.value).toFixed(2)}
            </span>
            <span className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", statusColor)}>
              {metric.signal}
            </span>
          </div>
          
          {/* Mini chart visualization bar */}
          <div className="flex flex-col items-end gap-1 w-16">
            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className={cn("h-full rounded-full transition-all duration-500", 
                  isBullish ? "bg-emerald-500" : isBearish ? "bg-red-500" : "bg-amber-500"
                )}
                style={{ width: `${Math.min(Math.abs(Number(metric.value)) * 10, 100)}%` }}
              />
            </div>
          </div>
        </div>
        
        {metric.description && (
          <p className="mt-3 text-xs text-muted-foreground line-clamp-2 border-t border-border/50 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {metric.description}
          </p>
        )}
      </div>
    </div>
  );
}
