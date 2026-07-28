import { Activity, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isLoading: boolean;
}

export function Header({ isLoading }: HeaderProps) {
  const handleDownloadScript = () => {
    window.open('/vts_strategy.py', '_blank');
  };

  return (
    <header className="border-b border-border bg-background/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg shadow-lg shadow-primary/20">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight text-foreground">
                VTS Replication Dashboard
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Volatility Trading Strategies - Live Simulation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownloadScript}
              data-testid="button-download-python"
            >
              <Download className="w-4 h-4 mr-2" />
              Python Script
            </Button>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-white/5 shadow-sm">
              <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {isLoading ? "SYNCING..." : "SYSTEM ONLINE"}
              </span>
            </div>
            
            <a 
              href="https://www.volatilitytradingstrategies.com/" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Methodology Source
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
