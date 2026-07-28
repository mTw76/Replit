import { Link } from "wouter";
import { ArrowRight, Users, Layers, Brain, Target, Zap, TrendingUp } from "lucide-react";

const audienceFeatures = [
  {
    icon: Brain,
    title: "Values & Motivations Alignment",
    description:
      "RMT analyzes the motivational content of your ad — its language, imagery, and emotional hooks — then identifies the 300M+ Americans whose personal values align most closely with those signals.",
  },
  {
    icon: Target,
    title: "Beyond Behavioral Targeting",
    description:
      "Traditional lookalike targeting is based on past buying behavior. RMT's approach is psychological: it finds people predisposed to respond to this specific ad — a fundamentally different and more powerful signal.",
  },
  {
    icon: Zap,
    title: "Semasio Partnership",
    description:
      "Through our partnership with Semasio, RMT Motivational Targets are available for programmatic digital campaigns across the US and 20+ global markets — reaching the right people wherever they are.",
  },
];

const contextFeatures = [
  {
    icon: Layers,
    title: "Value Signals™ Scoring",
    description:
      "Every ad and every program is scored on a consistent set of human values and motivations — creating a shared vocabulary that allows for precise matching between ad message and program environment.",
  },
  {
    icon: TrendingUp,
    title: "Ad-Context Resonance",
    description:
      "Context quality is not universal — it is different for each ad. RMT quantifies the degree of resonance between a specific ad and a specific context, enabling buyers to prioritize placements scientifically.",
  },
  {
    icon: Brain,
    title: "Interaction Effect",
    description:
      "NCS data confirms: the interaction between ad and context accounts for a larger share of sales effect than the context itself alone. This is the insight that RMT was built to capture.",
  },
];

const audienceStats = [
  { value: "+95%", label: "increase in ROAS", source: "Neustar, random control trial" },
  { value: "+83%", label: "better than lookalikes", source: "Simmons comparison study" },
];

const contextStats = [
  { value: "+36%", label: "average ROI lift", source: "ARF/NCS across 15 ads" },
  { value: "48%", label: "of sales effect", source: "ARF Cognition Council" },
];

export default function HowItWorks() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            The RMT Method
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-foreground tracking-tight leading-none mb-6">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Most targeting strategies treat all contexts and audiences as equivalent. RMT is built on the
            opposite principle: every ad has a unique set of audiences and contexts that will respond to it
            most powerfully.
          </p>
        </div>
      </section>

      {/* The principle */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-snug mb-5">
                "Because the creative is the largest single influencer of sales outcomes..."
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ad-specific persuadables represent a higher-power effect compared to persuadables defined
                solely on past buying behavior. Sending an ad to people based on the psychological alignment
                between that specific ad and those specific people is a different — and more powerful — idea
                than behavioral targeting alone.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The key word is <strong className="text-foreground">specific</strong>. Both audience targeting
                and context selection must be calibrated to each individual creative execution. Both
                approaches can — and should — be used together.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...audienceStats, ...contextStats].map((s) => (
                <div
                  key={s.value}
                  className="rounded-lg border border-border bg-background p-6 flex flex-col gap-1"
                  data-testid={`stat-how-${s.value}`}
                >
                  <span className="text-3xl font-black text-primary">{s.value}</span>
                  <span className="text-sm font-semibold text-foreground">{s.label}</span>
                  <span className="text-xs text-muted-foreground">{s.source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 1 — Audiences */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Pillar One
                  </p>
                  <h2 className="text-2xl font-black text-foreground">High-Response Audiences</h2>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                The idea of persuadable audiences has been studied for decades. At TRA (now TiVo Research),
                RMT pioneered the idea of targeting Heavy Swing Purchasers — heavy category buyers who bought
                your brand occasionally. But those approaches have nothing to do with the ad itself.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                RMT's innovation is to match the{" "}
                <strong className="text-foreground">psychological content of the ad</strong> to the{" "}
                <strong className="text-foreground">values and motivations of specific people</strong>. The
                result is a targeting signal that changes with each creative — because different ads move
                different people.
              </p>

              <div className="flex gap-4 flex-wrap">
                {audienceStats.map((s) => (
                  <div
                    key={s.value}
                    className="rounded-lg border border-primary/20 bg-primary/5 px-5 py-4"
                    data-testid={`audience-stat-${s.value}`}
                  >
                    <p className="text-2xl font-black text-primary">{s.value}</p>
                    <p className="text-xs font-semibold text-foreground mt-0.5">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.source}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {audienceFeatures.map((f) => (
                <div key={f.title} className="rounded-lg border border-border bg-card p-6 flex gap-4">
                  <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1.5">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2 — Contexts */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div className="order-2 lg:order-1 flex flex-col gap-3">
              {contextFeatures.map((f) => (
                <div key={f.title} className="rounded-lg border border-border bg-card p-6 flex gap-4">
                  <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1.5">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Pillar Two
                  </p>
                  <h2 className="text-2xl font-black text-foreground">High-Response Contexts</h2>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                The advertising industry has long recognized that context matters. But the standard
                assumption — that a particular program environment is either good or bad for advertising in
                general — misses the crucial interaction: the same context can amplify one ad and do nothing
                for another.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                RMT's Value Signals™ system creates a{" "}
                <strong className="text-foreground">shared motivational vocabulary</strong> for ads and
                programs alike. By scoring each ad and each program on the same underlying human values, we
                can predict — with precision — which program environments will resonate most with any given
                ad's message.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                NCS research confirms: the ROI lift from context resonance is double-digit, larger than the
                generic context effect alone.
              </p>

              <div className="flex gap-4 flex-wrap">
                {contextStats.map((s) => (
                  <div
                    key={s.value}
                    className="rounded-lg border border-primary/20 bg-primary/5 px-5 py-4"
                    data-testid={`context-stat-${s.value}`}
                  >
                    <p className="text-2xl font-black text-primary">{s.value}</p>
                    <p className="text-xs font-semibold text-foreground mt-0.5">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.source}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
            Used Together, the Effect Compounds
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            Audience targeting and context optimization are complementary levers that amplify each other
            when applied to the same campaign.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { n: "01", step: "Analyze the ad's psychological content and motivational signals." },
              { n: "02", step: "Identify audiences whose values align with this specific creative." },
              { n: "03", step: "Score program environments for resonance with the ad's message." },
              { n: "04", step: "Deploy, measure, refine, and scale with data-backed confidence." },
            ].map(({ n, step }) => (
              <div key={n} className="rounded-lg border border-border bg-background p-6 flex flex-col gap-3" data-testid={`step-${n}`}>
                <span className="text-xs font-black text-primary">{n}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/results">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                data-testid="button-how-see-proof"
              >
                See the Proof <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/contact">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-how-talk"
              >
                Talk to Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
