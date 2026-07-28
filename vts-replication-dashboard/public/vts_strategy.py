sk Premium (15%)
    5. Roll Yield Signal (15%)
    
    Returns:
        Tuple of (barometer_value, market_regime)
    """
    scores = []
    
    # 1. VIX Level Score (25% weight)
    # Lower VIX = more bullish = lower barometer
    if vix < 12:
        vix_score = 10
    elif vix < 15:
        vix_score = 20
    elif vix < 18:
        vix_score = 35
    elif vix < 22:
        vix_score = 50
    elif vix < 28:
        vix_score = 70
    elif vix < 35:
        vix_score = 85
    else:
        vix_score = 95
    scores.append(('VIX Level', vix_score, 0.25))
    
    # 2. Term Structure Score (25% weight)
    # VIX3M/VIX ratio > 1 = contango = bullish = lower barometer
    term_ratio = vix3m / vix if vix > 0 else 1.0
    if term_ratio > 1.15:
        term_score = 15  # Strong contango = very bullish
    elif term_ratio > 1.05:
        term_score = 30  # Moderate contango = bullish
    elif term_ratio > 0.95:
        term_score = 50  # Flat = neutral
    elif term_ratio > 0.85:
        term_score = 75  # Moderate backwardation = bearish
    else:
        term_score = 90  # Strong backwardation = very bearish
    scores.append(('Term Structure', term_score, 0.25))
    
    # 3. VIX9D/VIX Crossover (20% weight)
    # VIX9D < VIX = short-term calm = bullish
    short_ratio = vix9d / vix if vix > 0 else 1.0
    if short_ratio < 0.85:
        short_score = 15  # Short-term very calm
    elif short_ratio < 0.95:
        short_score = 30
    elif short_ratio < 1.05:
        short_score = 50  # Neutral
    elif short_ratio < 1.15:
        short_score = 70
    else:
        short_score = 90  # Short-term fear spike
    scores.append(('VIX9D Crossover', short_score, 0.20))
    
    # 4. Volatility Risk Premium (15% weight)
    vrp = calculate_vrp(vix, hv20)
    if vrp > 5:
        vrp_score = 20  # High VRP = bullish for short vol
    elif vrp > 2:
        vrp_score = 35
    elif vrp > -2:
        vrp_score = 50  # Neutral
    elif vrp > -5:
        vrp_score = 70
    else:
        vrp_score = 85  # Negative VRP = bearish
    scores.append(('VRP', vrp_score, 0.15))
    
    # 5. Roll Yield Signal (15% weight)
    roll_yield = calculate_roll_yield(vix, vix3m)
    if roll_yield > 100:
        roll_score = 15  # High positive roll yield = bullish
    elif roll_yield > 50:
        roll_score = 30
    elif roll_yield > 0:
        roll_score = 45
    elif roll_yield > -30:
        roll_score = 65
    else:
        roll_score = 85  # Negative roll yield = bearish
    scores.append(('Roll Yield', roll_score, 0.15))
    
    # Calculate weighted barometer
    barometer = sum(score * weight for _, score, weight in scores)
    
    # Determine market regime
    if barometer < 55:
        if term_ratio > 1.05:
            regime = 'stable_contango'
        else:
            regime = 'low_vol'
    elif barometer < 80:
        regime = 'elevated'
    else:
        if term_ratio < 0.95:
            regime = 'backwardation'
        else:
            regime = 'high_vol'
    
    return round(barometer, 1), regime


# =============================================================================
# STRATEGY POSITION LOGIC
# =============================================================================

def get_strategy_positions(barometer: float, regime: str) -> Dict[str, Dict[str, str]]:
    """
    Determine strategy positions based on barometer value.
    
    VTS uses three core strategies with equal 1/3 allocation:
    1. Tactical Volatility - aggressive vol trading
    2. Defensive Rotation - risk-on/risk-off rotation
    3. Strategic Tail Risk - tail hedge positioning
    
    Returns:
        Dict with position and reasoning for each strategy
    """
    positions = {}
    
    # Tactical Volatility Strategy
    if barometer < 55:
        if regime == 'stable_contango':
            positions['Tactical Volatility'] = {
                'position': 'SVXY',
                'reason': f'Barometer {barometer}% < 55%, stable contango -> Short Vol'
            }
        else:
            positions['Tactical Volatility'] = {
                'position': 'SVXY',
                'reason': f'Barometer {barometer}% < 55% -> Short Vol'
            }
    elif barometer < 80:
        positions['Tactical Volatility'] = {
            'position': 'IAU',
            'reason': f'Barometer {barometer}% in 55-80% range -> Gold (defensive)'
        }
    else:
        positions['Tactical Volatility'] = {
            'position': 'VXX',
            'reason': f'Barometer {barometer}% >= 80% -> Long Vol protection'
        }
    
    # Defensive Rotation Strategy
    if barometer < 55:
        positions['Defensive Rotation'] = {
            'position': 'QLD',
            'reason': f'Barometer {barometer}% < 55% -> 2x Nasdaq (risk-on)'
        }
    else:
        positions['Defensive Rotation'] = {
            'position': 'CASH',
            'reason': f'Barometer {barometer}% >= 55% -> Cash (defensive)'
        }
    
    # Strategic Tail Risk Strategy
    if barometer < 55:
        positions['Strategic Tail Risk'] = {
            'position': 'SPY',
            'reason': f'Barometer {barometer}% < 55% -> S&P 500 (low tail risk)'
        }
    elif barometer < 80:
        positions['Strategic Tail Risk'] = {
            'position': 'IYR',
            'reason': f'Barometer {barometer}% in 55-80% -> Real Estate (moderate risk)'
        }
    else:
        positions['Strategic Tail Risk'] = {
            'position': 'VIXM',
            'reason': f'Barometer {barometer}% >= 80% -> Long Vol (tail hedge)'
        }
    
    return positions


# =============================================================================
# MAIN EXECUTION
# =============================================================================

def run_vts_strategy():
    """Main function to run the VTS strategy analysis."""
    
    print("=" * 70)
    print("VTS VOLATILITY TRADING STRATEGIES REPLICATION")
    print("=" * 70)
    print(f"Analysis Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Fetch VIX term structure
    print("Fetching VIX term structure data...")
    term_data = fetch_vix_term_structure()
    
    vix9d = term_data.get('vix9d')
    vix = term_data.get('vix')
    vix3m = term_data.get('vix3m')
    vix6m = term_data.get('vix6m')
    
    if not all([vix9d, vix, vix3m, vix6m]):
        print("ERROR: Could not fetch all VIX data. Check your internet connection.")
        return
    
    # Fetch SPY for HV20 calculation
    print("Fetching SPY data for realized volatility...")
    spy_data = fetch_spy_data(30)
    if not spy_data.empty:
        hv20 = calculate_historical_volatility(spy_data['Close'], window=20)
    else:
        hv20 = 30.0  # Fallback default
    
    # Calculate derived metrics
    term_ratio = vix3m / vix
    vix9d_ratio = vix9d / vix
    vrp = calculate_vrp(vix, hv20)
    roll_yield = calculate_roll_yield(vix, vix3m)
    
    # Calculate barometer
    barometer, regime = calculate_volatility_barometer(vix9d, vix, vix3m, vix6m, hv20)
    
    # Get strategy positions
    positions = get_strategy_positions(barometer, regime)
    
    # Display results
    print()
    print("-" * 70)
    print("VIX TERM STRUCTURE")
    print("-" * 70)
    print(f"  VIX9D (9-day):      {vix9d:>8.2f}")
    print(f"  VIX (Spot):         {vix:>8.2f}")
    print(f"  VIX3M (3-month):    {vix3m:>8.2f}")
    print(f"  VIX6M (6-month):    {vix6m:>8.2f}")
    
    print()
    print("-" * 70)
    print("DERIVED METRICS")
    print("-" * 70)
    print(f"  VIX3M/VIX Ratio:    {term_ratio:>8.3f}  {'(Contango)' if term_ratio > 1 else '(Backwardation)'}")
    print(f"  VIX9D/VIX Ratio:    {vix9d_ratio:>8.3f}  {'(Calm)' if vix9d_ratio < 1 else '(Elevated)'}")
    print(f"  HV20 (Realized):    {hv20:>8.2f}%")
    print(f"  VRP (VIX - HV20):   {vrp:>+8.2f}%")
    print(f"  Roll Yield (Ann.):  {roll_yield:>+8.2f}%")
    
    print()
    print("-" * 70)
    print("VOLATILITY BAROMETER")
    print("-" * 70)
    
    # Visual barometer
    bar_filled = int(barometer / 100 * 40)
    bar_empty = 40 - bar_filled
    bar_visual = "[" + "#" * bar_filled + "-" * bar_empty + "]"
    
    if barometer < 55:
        signal = "BULLISH"
        signal_color = "favorable for short volatility"
    elif barometer < 80:
        signal = "NEUTRAL"
        signal_color = "defensive positioning recommended"
    else:
        signal = "BEARISH"
        signal_color = "risk-off, long volatility"
    
    print(f"  Barometer:          {barometer:>8.1f}%")
    print(f"  Signal:             {signal:>8s}  ({signal_color})")
    print(f"  Market Regime:      {regime:>8s}")
    print(f"  {bar_visual} {barometer:.1f}%")
    
    print()
    print("-" * 70)
    print("STRATEGY POSITIONS (Equal 1/3 Allocation Each)")
    print("-" * 70)
    
    for strategy_name, data in positions.items():
        print(f"\n  {strategy_name}:")
        print(f"    Position: {data['position']}")
        print(f"    Reason:   {data['reason']}")
    
    print()
    print("=" * 70)
    print("PORTFOLIO SUMMARY")
    print("=" * 70)
    print(f"  33.3% - {positions['Tactical Volatility']['position']:5s} (Tactical Volatility)")
    print(f"  33.3% - {positions['Defensive Rotation']['position']:5s} (Defensive Rotation)")
    print(f"  33.3% - {positions['Strategic Tail Risk']['position']:5s} (Strategic Tail Risk)")
    print()
    print("Note: This is a replication for educational purposes.")
    print("Always consult a financial advisor before trading.")
    print("=" * 70)
    
    return {
        'barometer': barometer,
        'regime': regime,
        'signal': signal,
        'positions': positions,
        'metrics': {
            'vix9d': vix9d,
            'vix': vix,
            'vix3m': vix3m,
            'vix6m': vix6m,
            'hv20': hv20,
            'vrp': vrp,
            'roll_yield': roll_yield,
            'term_ratio': term_ratio
        }
    }


if __name__ == '__main__':
    run_vts_strategy()
