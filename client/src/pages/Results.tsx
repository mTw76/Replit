import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, CheckCircle2, FlaskConical, BarChart3 } from "lucide-react";

const studies = [
  {
    number: 1,
    source: "Neustar",
    type: "Random Control Trial",
    headline: "+95% increase in incremental ROAS",
    description:
      "A major retail chain used RMT Semasio Motivational Targets in programmatic digital. The Neustar study — the gold standard of random control trial methodology — conclusively proved a near-doubling of incremental return on ad spend compared to the targets that had been used successfully before.",
    method: "Random control trial — the highest validity measurement method",
    tags: ["Programmatic Digital", "Retail", "ROAS"],
  },
  {
    number: 2,
    source: "605 / NCS",
    type: "Case Study",
    headline: "Double-digit sales lift from context resonance",
    description:
      "NCS and 605 measured the degree of RMT resonance (alignment) between ads and their contexts. The result: double-digit sales lift impact for campaigns that optimized ad-context alignment using RMT Value Signals™ vs. those that did not.",
    method: "Big data singlesource measurement via NCS and 605",
    tags: ["Television", "CPG", "Sales Lift"],
  },
  {
    number: 3,
    source: "ARF / NCS — Turner",
    type: "Sales Lift Study",
    headline: "+36% average ROI lift across 15 ads",
    description:
      "As part of the ARF 'How Advertising Works' program, RMT scored the Value Signals resonance between 15 ads and their program placements. Turner's Howard Shimmel sponsored the work. The result: if all GRPs were equally allocated across the top four deciles of Value Signals Resonance, ROI would be lifted an average of +36%. LEAP could lift ROI +10%; QUAD was not uniformly predictive.",
    method: "NCS multi-study analysis; ARF-sponsored research",
    tags: ["Television", "Multi-category", "ROI"],
  },
  {
    number: 4,
    source: "Google Analytics",
    type: "Digital Validation",
    headline: "Validated RMT method for digital campaign outcomes",
    description:
      "A Google Analytics study provided digital validation of the RMT methodology, confirming that ad-specific audience targeting using motivational alignment produces consistently superior outcomes relative to standard demographic and behavioral targeting.",
    method: "Google Analytics platform measurement",
    tags: ["Digital", "Cross-platform", "Audience Targeting"],
  },
  {
    number: 5,
    source: "ARF Cognition Council",
    type: "Foundation Study",
    headline: "48% of sales effect attributed to RMT method",
    description:
      "The nonprofit ARF Cognition Council, which oversees rigorous advertising measurement standards, found that the RMT methodology accounts for 48% of sales effect — representing a dominant contribution relative to other factors such as media weight, recency, and reach.",
    method: "ARF Cognition Council; nonprofit research body",
    tags: ["Sales Effect", "Industry Research", "Attribution"],
  },
  {
    number: 6,
    source: "Simmons",
    type: "Comparative Study",
    headline: "+83% improvement over lookalike models",
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
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <Badge variant="outline" className="mb-4 text-xs px-3 py-1">Third-Party Research</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Independent Proof
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every claim RMT makes is backed by studies from trusted, objective third-party research organizations. No internal marketing numbers. No self-reported data.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {keyStats.map((s) => (
            <div key={s.value} className="text-center" data-testid={`results-stat-${s.value}`}>
              <p className="text-3xl sm:text-4xl font-extrabold text-yellow-400">{s.value}</p>
              <p className="text-sm font-semibold text-background/90 mt-1">{s.label}</p>
              <p className="text-xs text-background/45 mt-0.5">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology note */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-4 w-full">
        <Card className="p-6 border-card-border bg-card flex flex-col sm:flex-row gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FlaskConical className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-1">On Methodology & Trust</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              RMT recommends giving more credence to (1) third-party studies from well-known and trusted research
              companies, and (2) random control trials, which actually measure causal differences rather than
              correlations. All six studies below were conducted by independent organizations: Neustar, NCS, 605,
              ARF, Google Analytics, and Simmons.
            </p>
          </div>
        </Card>
      </section>

      {/* Studies grid */}
      <section className="max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {studies.map((study) => (
            <Card
              key={study.number}
              className="p-6 border-card-border hover-elevate flex flex-col gap-4"
              data-testid={`study-card-${study.number}`}
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {study.number}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {study.source}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  {study.type}
                </Badge>
              </div>

              <div>
                <p className="text-xl font-extrabold text-primary leading-tight mb-3">{study.headline}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{study.description}</p>
              </div>

              <div className="flex items-start gap-2 text-xs text-muted-foreground border-t border-border pt-3 mt-auto">
                <BarChart3 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>{study.method}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
            Ready to Add Your Results to This List?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            Every engagement comes with a guarantee: high response results or the equivalent of your money back.
            Join the companies already benefiting from the RMT method.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-results-contact">
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" data-testid="button-results-how">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
