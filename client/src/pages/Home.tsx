import { Link } from "wouter";
import { ArrowRight, Award } from "lucide-react";

const stats = [
  { value: "+95%", label: "increase in ROAS", source: "Neustar" },
  { value: "+36%", label: "average ROI lift", source: "ARF / NCS" },
  { value: "+83%", label: "vs. lookalike models", source: "Simmons" },
  { value: "48%", label: "of total sales effect", source: "ARF Cognition Council" },
];

const awards = [
  { title: "2022 Emmy® Award", sub: "Engineering, Science & Technology" },
  { title: "ARF Erwin Ephron Award", sub: "First Recipient, 2014" },
  { title: "Cynopsis MeasureUp", sub: "Hall of Fame, 2022" },
  { title: "Stars of Attribution", sub: "Sequent Partners" },
];

const proofStudies = [
  {
    source: "Neustar",
    stat: "+95%",
    label: "increase in ROAS",
    detail: "Random control trial for major retail chain using RMT Semasio Motivational Targets in programmatic digital — the gold standard measurement methodology.",
    type: "Random Control Trial",
  },
  {
    source: "ARF / NCS",
    stat: "+36%",
    label: "average ROI lift",
    detail: "Across 15 ads tested when GRPs were allocated to top four deciles of Value Signals Resonance between ad and program.",
    type: "Multi-Study Analysis",
  },
  {
    source: "Simmons",
    stat: "+83%",
    label: "vs. lookalike models",
    detail: "RMT Motivational Targets significantly outperformed lookalike modeling used in over $60B of annual programmatic spending.",
    type: "Comparative Study",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 70% 30%, hsl(163 65% 48% / 0.06) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to bottom right, transparent 60%, hsl(163 65% 48% / 0.03) 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-8">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                2022 Emmy® Award — Engineering, Science & Technology
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[0.95] tracking-tight mb-8">
              Exalt the Ad.
              <br />
              <span className="text-primary">Transform</span>
              <br />
              Your Results.
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              RMT matches your ads with the exact audiences and contexts most likely to respond powerfully.
              Guaranteed by Emmy® Award-winning technology — or your money back.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/results">
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  data-testid="button-hero-see-proof"
                >
                  See the Proof <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/how-it-works">
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
                  data-testid="button-hero-how"
                >
                  How It Works
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="border-t border-border w-full">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.value}
                  className={`py-8 px-6 flex flex-col gap-1 ${i < stats.length - 1 ? "border-r border-border" : ""}`}
                  data-testid={`stat-card-${stat.value}`}
                >
                  <span className="text-3xl lg:text-4xl font-black text-primary tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-foreground">{stat.label}</span>
                  <span className="text-xs text-muted-foreground">{stat.source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core insight — full bleed dark */}
      <section className="bg-foreground/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                The Core Insight
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight mb-6">
                Context quality is different for each ad.
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                The size of the interaction effect between ads and contexts is larger than what the
                context itself brings to every ad. Most of the industry misses this.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Bill Harvey's foundational 1960s research anticipated this. RMT now proves it — at
                scale, with third-party validation, and with a money-back guarantee.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm font-semibold text-primary mb-2">High-Response Audiences</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  People whose motivations and values align with <em>this specific ad</em> — not just
                  category buyers. +83% better than lookalikes (Simmons).
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm font-semibold text-foreground mb-2">High-Response Contexts</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Program environments that amplify <em>this specific ad</em> using Value Signals™ —
                  double-digit ROI lift confirmed by NCS.
                </p>
              </div>
              <Link href="/how-it-works">
                <div className="rounded-lg border border-border bg-card px-5 py-4 flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-colors">
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    Explore the full methodology
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-wrap items-center gap-x-12 gap-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Recognition
            </p>
            {awards.map((award) => (
              <div key={award.title} className="flex flex-col" data-testid={`award-${award.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <span className="text-sm font-semibold text-foreground">{award.title}</span>
                <span className="text-xs text-muted-foreground">{award.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof studies */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Third-Party Validation
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground">
                Proven by Independent Research
              </h2>
            </div>
            <Link href="/results">
              <button
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                data-testid="button-view-all-results"
              >
                View all 6 studies <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {proofStudies.map((study) => (
              <div
                key={study.source}
                className="rounded-lg border border-border bg-card p-7 flex flex-col gap-4 hover:border-border/60 transition-colors"
                data-testid={`proof-card-${study.source.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {study.source}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                    {study.type}
                  </span>
                </div>
                <div>
                  <span className="text-4xl font-black text-primary">{study.stat}</span>
                  <p className="text-sm font-medium text-foreground mt-1">{study.label}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{study.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-xl">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Guaranteed
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">
              High response results — or the equivalent of your money back.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We've consistently delivered. So confident are we that we back every engagement with a makegood guarantee.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link href="/contact">
              <button
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
                data-testid="button-cta-bottom-talk"
              >
                Start the Conversation <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/leadership">
              <button
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors w-full sm:w-auto"
                data-testid="button-cta-bottom-proof"
              >
                Meet the Team
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
