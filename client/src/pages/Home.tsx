import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Award, Users, Layers, TrendingUp, CheckCircle2, Star } from "lucide-react";

const stats = [
  { value: "+95%", label: "increase in ROAS", source: "Neustar" },
  { value: "+36%", label: "average ROI lift", source: "ARF / NCS" },
  { value: "+83%", label: "better than lookalikes", source: "Simmons" },
  { value: "48%", label: "of sales effect", source: "ARF Cognition Council" },
];

const awards = [
  { icon: "🏆", title: "2022 Emmy® Award", subtitle: "Engineering, Science & Technology" },
  { icon: "★", title: "ARF Erwin Ephron Award", subtitle: "First Recipient, 2014" },
  { icon: "★", title: "Cynopsis MeasureUp", subtitle: "Hall of Fame, 2022" },
  { icon: "★", title: "Stars of Attribution", subtitle: "Sequent Partners" },
];

const proofStudies = [
  {
    source: "Neustar",
    finding: "+95% increase in incremental ROAS",
    detail: "Random control trial for major retail chain using RMT Semasio Motivational Targets in programmatic digital.",
    type: "Random Control Trial",
  },
  {
    source: "ARF / NCS",
    finding: "+36% average ROI lift",
    detail: "Across 15 ads tested when GRPs were allocated to top four deciles of Value Signals Resonance between ad and program.",
    type: "Case Study",
  },
  {
    source: "Simmons",
    finding: "+83% improvement over lookalikes",
    detail: "RMT Motivational Targets significantly outperformed the lookalike modeling used in over $60B of annual programmatic spending.",
    type: "Comparative Study",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(215 80% 28% / 0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at top right, hsl(215 80% 28% / 0.08) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs font-medium gap-1.5 py-1 px-3">
                <Award className="w-3 h-3" />
                2022 Emmy® Award Winner
              </Badge>
              <Badge variant="outline" className="text-xs font-medium py-1 px-3">
                ARF Erwin Ephron Award
              </Badge>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.08] tracking-tight">
                Exalt the Ad.
                <br />
                <span className="text-primary">Transform</span>
                <br />
                Your Results.
              </h1>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              RMT's proven methodology matches your ads with the exact audiences and contexts most likely to respond powerfully — guaranteed, or your money back.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/results">
                <Button size="lg" data-testid="button-hero-see-proof">
                  See the Proof
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" data-testid="button-hero-talk">
                  Talk to Us
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Guarantee: high response results or the equivalent of your money back</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <Card
                key={stat.value}
                className="p-6 border-card-border bg-card hover-elevate flex flex-col gap-2"
                data-testid={`stat-card-${stat.value}`}
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-foreground leading-tight">{stat.label}</span>
                <span className="text-xs text-muted-foreground">{stat.source}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards bar */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-2">
              Recognition
            </p>
            {awards.map((award) => (
              <div
                key={award.title}
                className="flex items-center gap-2"
                data-testid={`award-${award.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{award.title}</p>
                  <p className="text-xs text-muted-foreground">{award.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core insight */}
      <section className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-background/40 mb-6">
            The Core Insight
          </p>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-background leading-snug max-w-4xl mx-auto mb-6">
            "The little-known fact that makes all the difference: context quality is{" "}
            <span className="text-yellow-400">different for each ad</span>."
          </blockquote>
          <p className="text-base text-background/60 max-w-2xl mx-auto leading-relaxed">
            The size of the interaction effect between ads and contexts is larger than what the context itself
            brings to every ad. This is why RMT scores each ad individually — and why it works.
          </p>
        </div>
      </section>

      {/* Two Pillars */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            The RMT Approach
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Two Ways to Find Your Best Response
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Most targeting approaches ignore the ad itself. RMT is built around a simple truth: different people and different contexts respond differently to each specific ad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-8 border-card-border bg-card hover-elevate flex flex-col gap-5" data-testid="card-audiences">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">High-Response Audiences</h3>
              <p className="text-muted-foreground leading-relaxed">
                We identify the people whose motivations and values are most aligned with <em>this specific ad</em> — not just category buyers, but individuals psychologically predisposed to respond to it. This goes far beyond traditional lookalike modeling.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Motivational alignment scoring per ad</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Semasio partnership — 300M+ US profiles</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Available in programmatic digital</span>
              </div>
            </div>
            <Link href="/how-it-works">
              <Button variant="outline" size="sm" className="w-fit" data-testid="button-learn-audiences">
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </Card>

          <Card className="p-8 border-card-border bg-card hover-elevate flex flex-col gap-5" data-testid="card-contexts">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">High-Response Contexts</h3>
              <p className="text-muted-foreground leading-relaxed">
                We find the program environments that most amplify <em>this specific ad</em>, using Value Signals™ to match ad and context for maximum resonance. The right context isn't the same for every ad — it changes with the ad's message.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Value Signals™ scoring system</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Ad-context resonance beyond genre</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Validated by NCS, 605, Nielsen</span>
              </div>
            </div>
            <Link href="/how-it-works">
              <Button variant="outline" size="sm" className="w-fit" data-testid="button-learn-contexts">
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Proof Studies teaser */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Third-Party Validation
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Proven by Independent Research
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Every claim is backed by studies from trusted, objective third-party organizations — not internal marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {proofStudies.map((study) => (
              <Card
                key={study.source}
                className="p-6 border-card-border hover-elevate flex flex-col gap-4"
                data-testid={`proof-card-${study.source.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {study.source}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {study.type}
                  </Badge>
                </div>
                <p className="text-xl font-extrabold text-primary leading-tight">{study.finding}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{study.detail}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/results">
              <Button variant="outline" data-testid="button-view-all-results">
                View All 6 Studies <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Guarantee + CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="rounded-xl bg-primary p-10 md:p-16 text-center flex flex-col items-center gap-6">
          <Award className="w-10 h-10 text-primary-foreground/60" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground tracking-tight max-w-2xl leading-snug">
            We Guarantee High Response Results
          </h2>
          <p className="text-primary-foreground/75 text-lg max-w-xl leading-relaxed">
            We've worked with many companies and consistently delivered high response results. So confident are we in our method that we back every engagement with a makegood guarantee.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold"
                data-testid="button-cta-bottom-talk"
              >
                Start the Conversation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/results">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="button-cta-bottom-proof"
              >
                See the Evidence
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
