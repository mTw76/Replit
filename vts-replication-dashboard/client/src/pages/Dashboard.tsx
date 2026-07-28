import { useMetrics, useStrategies } from "@/hooks/use-dashboard";
import { Header } from "@/components/dashboard/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StrategyCard } from "@/components/dashboard/StrategyCard";
import { SimulationControls } from "@/components/dashboard/SimulationControls";
import { BarometerGauge } from "@/components/dashboard/BarometerGauge";
import { BarometerHistory } from "@/components/dashboard/BarometerHistory";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useMetrics();
  const { data: strategies, isLoading: strategiesLoading, error: strategiesError } = useStrategies();

  const isLoading = metricsLoading || strategiesLoading;
  const error = metricsError || strategiesError;
  
  const barometerMetric = metrics?.find(m => m.name === 'Volatility Barometer');
  const barometerValue = barometerMetric ? parseFloat(barometerMetric.value) : null;
  
  // Extract regime from barometer description (format: "regime:stable_contango|...")
  const extractRegime = (description: string | null): string => {
    if (!description) return 'unknown';
    const match = description.match(/^regime:([^|]+)/);
    return match ? match[1] : 'unknown';
  };
  const regime = barometerMetric ? extractRegime(barometerMetric.description) : 'unknown';
  
  const otherMetrics = metrics?.filter(m => m.name !== 'Volatility Barometer') || [];
  
  const groupedMetrics = otherMetrics.reduce((acc, metric) => {
    const category = metric.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(metric);
    return acc;
  }, {} as Record<string, typeof otherMetrics>);
  
  const categoryOrder = ['VIX Levels', 'Term Structure', 'Crossovers', 'Oscillators', 'Yield', 'Premium', 'Decay'];
  const sortedCategories = Object.keys(groupedMetrics).sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-destructive p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">System Error</h2>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-background to-background">
      <Header isLoading={isLoading} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Main Volatility Barometer Gauge */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground font-display">Volatility Dashboard</h2>
              <p className="text-muted-foreground text-sm">Real-time VTS metrics combining 13 volatility indicators.</p>
            </div>
            <div className="hidden md:block text-xs text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-white/5">
              Updates Live
            </div>
          </div>
          
          {metricsLoading ? (
            <Skeleton className="h-40 w-full rounded-2xl bg-card border border-border" />
          ) : barometerValue !== null ? (
            <BarometerGauge 
              value={barometerValue} 
              regime={regime} 
            />
          ) : (
            <div className="rounded-2xl border bg-card p-6 text-center text-muted-foreground">
              <p>Click "Refresh Live Data" to load the Volatility Barometer</p>
            </div>
          )}
        </section>
        
        {/* Detailed Metrics by Category */}
        {sortedCategories.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground font-display">Detailed Metrics</h2>
                <p className="text-muted-foreground text-sm">Individual indicators comprising the barometer.</p>
              </div>
            </div>
            
            <div className="space-y-8">
              {sortedCategories.map(category => (
                <div key={category}>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {groupedMetrics[category].map((metric) => (
                      <MetricCard key={metric.name} metric={metric} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Legacy metrics display when no categories */}
        {sortedCategories.length === 0 && !metricsLoading && metrics && metrics.length > 0 && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric) => (
                <MetricCard key={metric.name} metric={metric} />
              ))}
            </div>
          </section>
        )}

        {/* Active Strategies */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground font-display">Active Strategies</h2>
              <p className="text-muted-foreground text-sm">Systematic allocations based on barometer signals.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {strategiesLoading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-2xl bg-card border border-border" />
                ))
              : strategies?.map((strategy) => (
                  <StrategyCard key={strategy.name} strategy={strategy} />
                ))
            }
          </div>
        </section>

        {/* Barometer History */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground font-display">Barometer History</h2>
              <p className="text-muted-foreground text-sm">Track barometer readings and positions over time.</p>
            </div>
          </div>
          <BarometerHistory />
        </section>

        {/* Simulation Controls */}
        <section className="pb-12">
           <SimulationControls />
        </section>
      </main>
    </div>
  );
}
