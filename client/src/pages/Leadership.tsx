import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Award, ArrowRight, Heart } from "lucide-react";

const leaders = [
  {
    name: "Bill Harvey",
    title: "Chairman, CEO & Chief Research Officer",
    email: "bharvey@rmt.solutions",
    status: "active" as const,
    bio: [
      "A world-renowned Emmy® Award-winning media researcher and pioneer in media optimization systems, Bill Harvey has served as a strategic consultant and innovator for Interpublic Group (IPG), Omnicom, and major television networks throughout a career spanning five decades.",
      "He is the co-founder of TiVo Research & Analytics (TRA, Inc.) — the company that began the era of big data ROI measurement in advertising — and served as CEO of Next Century Media, whose technology won the 2022 Emmy® Award for Engineering, Science & Technology.",
      "A consultant to over 100 of the Fortune 500, Bill is the inventor of TV Big Data ROI measurement and the first recipient of the Advertising Research Foundation's prestigious Erwin Ephron Award (2014).",
      "Bill's foundational 1960s report, 'The Influence of Television Program Environment on Commercial Communication,' anticipated the science that RMT now brings to the modern advertising ecosystem with unprecedented precision.",
    ],
    awards: [
      "2022 Emmy® Award — Engineering, Science & Technology",
      "ARF Erwin Ephron Award — First Recipient, 2014",
      "Cynopsis MeasureUp Hall of Fame — 2022",
    ],
    credentials: [
      "Co-founder, TiVo Research & Analytics (TRA)",
      "CEO, Next Century Media",
      "Consultant to 100+ Fortune 500 companies",
      "Inventor of TV Big Data ROI measurement",
    ],
  },
  {
    name: "Bill McKenna",
    title: "Co-Founder",
    email: "b.mckenna@rmt.solutions",
    status: "memorial" as const,
    bio: [
      "Bill McKenna was a C-suite executive with over 40 years of experience developing, managing, and consulting in television, online, and mobile media and market research. His career was a tour de force of industry leadership across the measurement and media landscape.",
      "He served as CEO of Kantar Media Research North America (WPP), CEO of IMMI, CEO and founder of Mediafax Inc., and as a Partner at Booz Allen & Hamilton. He held a Senior VP role at Nielsen Audio / Arbitron leading New Media Ventures, and served as Director at TRA, where he worked alongside Bill Harvey.",
      "Bill McKenna brought a rare combination of operational rigor and strategic vision to RMT. His fingerprints are on the company's foundational thinking about measurement, commercialization, and industry trust.",
    ],
    awards: [],
    credentials: [
      "CEO, Kantar Media Research North America (WPP)",
      "CEO, IMMI",
      "CEO, Mediafax Inc.",
      "Senior VP, Nielsen Audio / Arbitron",
      "Partner, Booz Allen & Hamilton",
      "MBA, Northwestern University",
    ],
  },
  {
    name: "Audrey Steele",
    title: "President",
    email: null,
    status: "active" as const,
    bio: [
      "An insights and data executive with over 20 years of leadership experience in the advertising industry, Audrey Steele brings a marketplace-savvy approach to determining optimal uses of data to drive sales and address critical questions regarding ad, media, and content effectiveness.",
      "As EVP of Sales Research at Fox Networks Group, she championed the use of advanced measurement and attribution to demonstrate the value of advertising in premium video environments — precisely the type of work that RMT's methodology is designed to complement and enhance.",
      "At RMT, Audrey leads the company's commercial strategy and client relationships, translating complex research into actionable insights for brands, agencies, and media companies.",
    ],
    awards: [],
    credentials: [
      "EVP of Sales Research, Fox Networks Group",
      "20+ years advertising industry leadership",
      "Expertise in ad, media, and content effectiveness",
    ],
  },
];

const AvatarPlaceholder = ({ name, size = "lg" }: { name: string; size?: "lg" | "sm" }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      className={`rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center flex-shrink-0 ${
        size === "lg" ? "w-20 h-20" : "w-12 h-12"
      }`}
    >
      <span
        className={`font-bold text-primary ${size === "lg" ? "text-2xl" : "text-sm"}`}
      >
        {initials}
      </span>
    </div>
  );
};

export default function Leadership() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <Badge variant="outline" className="mb-4 text-xs px-3 py-1">The Team</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Leadership
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Bill Harvey and Bill McKenna need no introduction in the media and marketing industries, having won
            numerous awards for the improvements they have made along the way.
          </p>
        </div>
      </section>

      {/* Leader cards */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full flex flex-col gap-8">
        {leaders.map((leader) => (
          <Card
            key={leader.name}
            className={`p-8 border-card-border ${leader.status === "memorial" ? "border-l-4 border-l-muted-foreground/30" : ""}`}
            data-testid={`leader-card-${leader.name.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {leader.status === "memorial" && (
              <div className="flex items-center gap-2 mb-6 text-muted-foreground">
                <Heart className="w-4 h-4 fill-muted-foreground/40" />
                <span className="text-sm italic">In Loving Memory</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left column */}
              <div className="flex flex-col gap-5 lg:col-span-1">
                <AvatarPlaceholder name={leader.name} size="lg" />
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">{leader.name}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">{leader.title}</p>
                  {leader.email && (
                    <a
                      href={`mailto:${leader.email}`}
                      className="flex items-center gap-1.5 text-sm text-primary mt-2 hover:underline"
                      data-testid={`link-email-${leader.name.split(" ")[0].toLowerCase()}`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {leader.email}
                    </a>
                  )}
                </div>

                {leader.awards.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Awards
                    </p>
                    {leader.awards.map((award) => (
                      <div key={award} className="flex items-start gap-1.5">
                        <Award className="w-3.5 h-3.5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground leading-snug">{award}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Background
                  </p>
                  {leader.credentials.map((cred) => (
                    <div key={cred} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground leading-snug">{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column — bio */}
              <div className="lg:col-span-3 flex flex-col gap-4 justify-center">
                {leader.bio.map((para, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed text-[15px]">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-extrabold text-foreground mb-3">
            Decades of experience. Guaranteed results.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Start a conversation with the team that invented TV Big Data ROI measurement and won an Emmy® Award for their technology.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-leadership-contact">
              Talk to Us <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
