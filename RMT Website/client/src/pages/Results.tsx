import { Link } from "wouter";
import { ArrowRight, FlaskConical, BarChart3 } from "lucide-react";

const studies = [
  {
    number: "01",
    source: "Neustar",
    type: "Random Control Trial",
    stat: "+95%",
    statLabel: "increase in ROAS",
    headline: "Near-doubling of incremental return on ad spend",
    description:
      "A major retail chain used RMT Semasio Motivational Targets in programmatic digital. The Neustar study — the gold standard of random control trial methodology — conclusively proved a near-doubling of incremental return on ad spend compared to targets that had been used successfully before.",
    method: "Random control trial — the highest validity measurement method",
    tags: ["Programmatic Digital", "Retail", "ROAS"],
  },
  {
    number: "02",
    source: "605 / NCS",
    type: "Case Study",
    stat: "2× digit",
    statLabel: "sales lift",
    headline: "Double-digit sales lift from context resonance",
    description:
      "NCS and 605 measured the degree of RMT resonance (alignment) between ads and their contexts. The result: double-digit sales lift impact for campaigns that optimized ad-context alignment using RMT Value Signals™ vs. those that did not.",
    method: "Big data singlesource measurement via NCS and 605",
    tags: ["Television", "CPG", "Sales Lift"],
  },
  {
    number: "03",
    source: "ARF / NCS — Turner",
    type: "Multi-Study Analysis",
    stat: "+36%",
    statLabel: "average ROI lift",
    headline: "+36% average ROI lift across 15 ads tested",
    description:
      "As part of the ARF 'How Advertising Works' program, RMT scored the Value Signals resonance between 15 ads and their program placements. Turner's Howard Shimmel sponsored the work. If all GRPs were equally allocated across the top four deciles of Value Signals Resonance, ROI would be lifted an average of +36%.",
    method: "NCS multi-study analysis; ARF-sponsored research",
    tags: ["Television", "Multi-category", "ROI"],
  },
  {
    number: "04",
    source: "Google Analytics",
    type: "Digital Validation",
    stat: "✓",
    statLabel: "validated",
    headline: "Digital validation of the RMT methodology",
    description:
      "A Google Analytics study provided digital validation of the RMT methodology, confirming that ad-specific audience targeting using motivational alignment produces consistently superior outcomes relative to standard demographic and behavioral targeting.",
    method: "Google Analytics platform measurement",
    tags: ["Digital", "Cross-platform", "Audience Targeting"],
  },
  {
    number: "05",
    source: "ARF Cognition Council",
    type: "Foundation Study",
    stat: "48%",
    statLabel: "of total sales effect",
    headline: "48% of sales effect attributed to the RMT method",
    description:
      "The nonprofit ARF Cognition Council, which oversees rigorous advertising measurement standards, found that the RMT methodology accounts for 48% of sales effect — representing a dominant contribution relative to other factors such as media weight, recency, and reach.",
    method: "ARF Cognition Council; nonprofit research body",
    tags: ["Sales Effect", "Industry Research", "Attribution"],
  },
  {
    number: "06",
    source: "Simmons",
    type: "Comparative Study",
    stat: "+83%",
    statLabel: "vs. lookalike models",
    headline: "+83% improvement over industry-standard lookalike models",
    description:
      "Simmons compared RMT Motivational Targets directly against the lookalike models used in over 90% of the $60+ billion invested annually in programmatic digital advertising. RMT targets showed an 83% improvement, challenging the validity of current industry standard targeting practices.",
    method: "Head-to-head comparison by Simmons Research",
    tags: ["Programmatic", "Lookalike Modeling", "Targeting"],
  },
];

const keyStats = [
  { value: "+95%", label: "ROAS increase", note: "Neustar" },
  { value: "+83%", label: "vs. lookalikes", note: "Simmons" },
  { value: "+36%", label: "avg ROI lift", note: "ARF / NCS" },
  { value: "48%", label: "of sales effect", note: "ARF Cognition Council" },
];

export default function Results() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Third-Party Research
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-foreground leading-none tracking-tight mb-6">
            Independent Proof
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Every claim RMT makes is backed by studies from trusted, objective third-party research
            organizations. No internal marketing numbers. No self-reported data.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {keyStats.map((s, i) => (
              <div
                key={s.value}
                className={`py-10 px-6 flex flex-col gap-1 ${i < keyStats.length - 1 ? "border-r border-border" : ""}`}
                data-testid={`results-stat-${s.value}`}
              >
                <span className="text-4xl font-black text-primary">{s.value}</span>
                <span className="text-sm font-semibold text-foreground">{s.label}</span>
                <span className="text-xs text-muted-foreground">{s.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology note */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="rounded-lg border border-border bg-card p-6 flex gap-4">
            <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
              <FlaskConical className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1.5">On Methodology & Trust</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                RMT recommends giving more credence to (1) third-party studies from well-known and trusted
                research companies, and (2) random control trials, which actually measure causal differences
                rather than correlations. All six studies below were conducted by independent organizations:
                Neustar, NCS, 605, ARF, Google Analytics, and Simmons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studies */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="flex flex-col gap-5">
          {studies.map((study) => (
            <div
              key={study.number}
              className="rounded-lg border border-border bg-card p-7 grid grid-cols-1 lg:grid-cols-4 gap-6"
              data-testid={`study-card-${study.number}`}
            >
              <div className="flex flex-col gap-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-black text-primary/60">{study.number}</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {study.source}
                  </span>
                </div>
                <span className="text-4xl font-black text-primary">{study.stat}</span>
                <span className="text-sm font-medium text-foreground">{study.statLabel}</span>
                <span className="mt-2 text-xs px-2 py-1 rounded-full border border-border text-muted-foreground w-fit">
                  {study.type}
                </span>
              </div>

              <div className="lg:col-span-3 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-foreground">{study.headline}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{study.description}</p>

                <div className="flex items-center gap-2 pt-2 border-t border-border mt-1">
                  <BarChart3 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{study.method}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl font-black text-foreground mb-2">
                Ready to add your results to this list?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Every engagement comes with a guarantee: high response results or the equivalent of your
                money back.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/contact">
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  data-testid="button-results-contact"
                >
                  Start a Conversation <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/how-it-works">
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-results-how"
                >
                  How It Works
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
