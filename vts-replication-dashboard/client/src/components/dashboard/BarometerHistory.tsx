import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";
import type { BarometerHistory } from "@shared/schema";

function getSignalColor(value: number): string {
  if (value <= 55) return "text-green-500";
  if (value <= 80) return "text-amber-500";
  return "text-red-500";
}

function getSignalBadge(value: number): { label: string; variant: "default" | "secondary" | "danger" | "outline" } {
  if (value <= 55) return { label: "Bullish", variant: "default" };
  if (value <= 80) return { label: "Neutral", variant: "secondary" };
  return { label: "Bearish", variant: "danger" };
}

function getTrendIcon(current: number, previous: number | null) {
  if (previous === null) return null;
  const diff = current - previous;
  if (Math.abs(diff) < 1) return <Minus className="w-3 h-3 text-muted-foreground" />;
  if (diff > 0) return <TrendingUp className="w-3 h-3 text-red-500" />;
  return <TrendingDown className="w-3 h-3 text-green-500" />;
}

export function BarometerHistory() {
  const { data: history, isLoading, error } = useQuery<BarometerHistory[]>({
    queryKey: ['/api/barometer-history'],
  });

  if (isLoading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5" />
            Barometer History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !history) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5" />
            Barometer History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm text-center py-4">
            No historical data available yet. Refresh live data to start tracking.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5" />
            Barometer History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm text-center py-4">
            No historical data available yet. Refresh live data to start tracking.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="w-5 h-5" />
          Barometer History (Past {history.length} Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 px-2 font-medium text-muted-foreground">Date</th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">Barometer</th>
                <th className="text-center py-2 px-2 font-medium text-muted-foreground">Signal</th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">VIX</th>
                <th className="text-center py-2 px-2 font-medium text-muted-foreground">Tactical</th>
                <th className="text-center py-2 px-2 font-medium text-muted-foreground">Defensive</th>
                <th className="text-center py-2 px-2 font-medium text-muted-foreground">Strategic</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row, index) => {
                const value = parseFloat(row.value);
                const previousValue = index < history.length - 1 
                  ? parseFloat(history[index + 1].value) 
                  : null;
                const signal = getSignalBadge(value);
                const vix = row.vixLevel ? parseFloat(row.vixLevel).toFixed(1) : '-';
                
                return (
                  <tr 
                    key={row.id} 
                    className="border-b border-border/30 hover-elevate"
                    data-testid={`row-history-${row.id}`}
                  >
                    <td className="py-3 px-2 text-muted-foreground">
                      {format(new Date(row.date), 'MMM d, yyyy')}
                    </td>
                    <td className={`py-3 px-2 text-right font-mono font-bold ${getSignalColor(value)}`}>
                      <span className="flex items-center justify-end gap-1">
                        {getTrendIcon(value, previousValue)}
                        {value.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant={signal.variant} className="text-xs">
                        {signal.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-muted-foreground">
                      {vix}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant="outline" className="text-xs font-mono">
                        {row.tacticalPosition || '-'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant="outline" className="text-xs font-mono">
                        {row.defensivePosition || '-'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant="outline" className="text-xs font-mono">
                        {row.strategicPosition || '-'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
