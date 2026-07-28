#!/usr/bin/env python3
"""
VTS Replication Dashboard - Daily Signal Client
Fetch volatility metrics and trading signals from your Replit dashboard
Usage: python vts_client.py <api_url>
Example: python vts_client.py https://your-replit-app.replit.dev
"""

import requests
import json
import sys
from datetime import datetime
from typing import Optional

class VTSClient:
    def __init__(self, base_url: str):
        """Initialize VTS client with API base URL"""
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
    
    def get_metrics(self) -> list:
        """Fetch current volatility metrics"""
        try:
            response = self.session.get(f"{self.base_url}/api/metrics")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching metrics: {e}")
            return []
    
    def get_strategies(self) -> list:
        """Fetch current strategy positions"""
        try:
            response = self.session.get(f"{self.base_url}/api/strategies")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching strategies: {e}")
            return []
    
    def simulate_regime(self, regime: str) -> bool:
        """
        Simulate market regime change
        regime: 'stable_contango', 'vol_spike', or 'high_volatility'
        """
        try:
            response = self.session.post(
                f"{self.base_url}/api/metrics/simulate",
                json={"regime": regime}
            )
            response.raise_for_status()
            return True
        except requests.exceptions.RequestException as e:
            print(f"Error simulating regime: {e}")
            return False
    
    def print_metrics_report(self):
        """Print formatted volatility metrics report"""
        metrics = self.get_metrics()
        if not metrics:
            print("No metrics available")
            return
        
        print("\n" + "=" * 70)
        print("VTS VOLATILITY BAROMETER REPORT")
        print(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 70)
        
        # Group by category
        categories = {}
        for metric in metrics:
            cat = metric.get('category', 'Other')
            if cat not in categories:
                categories[cat] = []
            categories[cat].append(metric)
        
        for category, items in sorted(categories.items()):
            print(f"\n{category.upper()}")
            print("-" * 70)
            for item in items:
                name = item['name']
                value = item['value']
                signal = item['signal']
                
                # Color coding for signals
                signal_color = {
                    'Bullish': '✓',
                    'Bearish': '✗',
                    'Neutral': '−'
                }.get(signal, '?')
                
                print(f"  {signal_color} {name:<40} {value:>10} ({signal})")
    
    def print_strategies_report(self):
        """Print formatted strategy positions report"""
        strategies = self.get_strategies()
        if not strategies:
            print("No strategies available")
            return
        
        print("\n" + "=" * 70)
        print("ACTIVE TRADING STRATEGIES")
        print(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 70 + "\n")
        
        for strat in strategies:
            name = strat['name']
            position = strat['currentPosition']
            performance = strat.get('performanceYTD', 'N/A')
            
            print(f"{name}")
            print(f"  Position: {position}")
            print(f"  YTD Performance: {performance}%")
            print()

def main():
    if len(sys.argv) < 2:
        print("Usage: python vts_client.py <api_url>")
        print("Example: python vts_client.py https://your-replit-app.replit.dev")
        sys.exit(1)
    
    api_url = sys.argv[1]
    client = VTSClient(api_url)
    
    # Print both reports
    client.print_metrics_report()
    client.print_strategies_report()
    
    print("=" * 70)
    print("To simulate market regime changes, use:")
    print("  python vts_client.py <url> --simulate stable_contango|vol_spike|high_volatility")
    print("=" * 70 + "\n")

if __name__ == "__main__":
    main()
