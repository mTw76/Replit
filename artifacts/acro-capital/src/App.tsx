import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { useState } from "react";

function Nav() {
  const [location] = useLocation();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/strategy", label: "Strategy" },
    { href: "/research", label: "Research" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="site-nav">
      <Link href="/" className="nav-brand">Acro Capital Group</Link>
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={location === l.href ? "active" : ""}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function NewsletterForm({ variant = "section" }: { variant?: "section" | "footer" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      if (res.status === 201) setStatus("success");
      else if (res.status === 409) setStatus("duplicate");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p style={{ fontSize: "13px", color: "#B8960C", letterSpacing: "0.06em" }}>
        Thank you. You will receive our next quarterly perspectives.
      </p>
    );
  }

  if (status === "duplicate") {
    return (
      <p style={{ fontSize: "13px", color: "#9B9590", letterSpacing: "0.04em" }}>
        That address is already on our list.
      </p>
    );
  }

  const isFooter = variant === "footer";

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: isFooter ? "360px" : "420px" }}>
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{
          background: isFooter ? "#2D2926" : "#F0EBE1",
          border: "1px solid",
          borderColor: isFooter ? "#3D3833" : "#E2DDD5",
          color: isFooter ? "#E2DDD5" : "#1C1917",
          padding: "11px 14px",
          fontSize: "13px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 300,
          outline: "none",
          width: "100%",
        }}
      />
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          background: isFooter ? "#2D2926" : "#F0EBE1",
          border: "1px solid",
          borderColor: isFooter ? "#3D3833" : "#E2DDD5",
          color: isFooter ? "#E2DDD5" : "#1C1917",
          padding: "11px 14px",
          fontSize: "13px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 300,
          outline: "none",
          width: "100%",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          background: "transparent",
          border: "1px solid #B8960C",
          color: "#B8960C",
          padding: "11px 24px",
          fontSize: "11px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background 0.2s, color 0.2s",
          alignSelf: "flex-start",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#B8960C";
          (e.currentTarget as HTMLButtonElement).style.color = "#F9F6F0";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "#B8960C";
        }}
      >
        {status === "loading" ? "Submitting..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p style={{ fontSize: "12px", color: "#9B9590" }}>Something went wrong. Please try again.</p>
      )}
      <p style={{ fontSize: "11px", color: isFooter ? "#4D4844" : "#9B9590", letterSpacing: "0.04em" }}>
        No spam. Unsubscribe at any time.
      </p>
    </form>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", marginBottom: "48px" }}>
          <div>
            <div className="footer-brand">Acro Capital Group</div>
            <div className="footer-sub">Investment Management</div>
            <div style={{ fontSize: "13px", fontWeight: 300, color: "#6B6560", lineHeight: "2.0", marginTop: "16px" }}>
              Acro Capital, LLC<br />
              Wilmington, Delaware<br />
              <a href="tel:+13024164474" style={{ color: "#6B6560", textDecoration: "none" }}>302 416 4474 (USA)</a><br />
              <a href="mailto:info@acrocapitalgroup.com" style={{ color: "#6B6560", textDecoration: "none" }}>info@acrocapitalgroup.com</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8960C", marginBottom: "16px" }}>
              Quarterly Perspectives
            </div>
            <p style={{ fontSize: "13px", fontWeight: 300, color: "#6B6560", lineHeight: "1.7", marginBottom: "20px" }}>
              Market insights and investment commentary, delivered selectively.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>
        <div className="footer-rule" />
        <p className="footer-legal">
          This website is for informational purposes only and does not constitute an offer to sell or
          a solicitation of an offer to buy any security or investment product. Past performance is not
          indicative of future results. <strong style={{ color: "#4D4844" }}>acrocapitalgroup.com</strong> is
          the only official website of Acro Capital Group LLC.
          <br /><br />
          &copy; {new Date().getFullYear()} Acro Capital Group LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <p className="hero-eyebrow">Alternative Investment Management</p>
        <h1 className="hero-title">Precision-Driven<br />Investment Management</h1>
        <div className="gold-rule" />
        <p className="hero-tagline">Precision &nbsp;·&nbsp; Process &nbsp;·&nbsp; Performance</p>
      </section>

      <section className="section">
        <div className="two-col">
          <div>
            <p className="section-label">Our Firm</p>
            <h2 className="section-heading">Empirical rigor.<br />Consistent results.</h2>
          </div>
          <div>
            <p className="body-text">
              Acro Capital Group is a precision-driven investment management firm. Empirical
              research and real-time market intelligence guide every strategy.
            </p>
            <p className="body-text">
              Every investment decision is anchored in a disciplined, repeatable process.
              Data-driven. Experience-shaped. Executed with conviction.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="section-label">Core Principles</p>
        <h2 className="section-heading">The foundation of every decision</h2>
        <div className="principles-grid">
          {[
            ["01", "Empirical Research", "All decisions are grounded in rigorous quantitative and qualitative analysis derived from first-principles research."],
            ["02", "Market Intelligence", "Real-time monitoring of market microstructure, capital flows, and macro developments informs each position."],
            ["03", "Risk Management", "Systematic controls are embedded throughout the investment process, from idea generation to portfolio construction."],
            ["04", "Process Discipline", "A repeatable, structured methodology eliminates behavioral bias and ensures consistency across market cycles."],
          ].map(([num, title, desc]) => (
            <div className="principle-card" key={num}>
              <div className="principle-number">{num}</div>
              <div className="principle-title">{title}</div>
              <p className="principle-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ borderBottom: "none" }}>
        <div className="two-col">
          <div>
            <p className="section-label">Quarterly Perspectives</p>
            <h2 className="section-heading">Market insights, delivered selectively.</h2>
            <p className="body-text" style={{ marginTop: "16px" }}>
              Subscribe to receive quarterly investment commentary and market analysis
              from the Acro Capital Group research team.
            </p>
          </div>
          <div style={{ paddingTop: "8px" }}>
            <NewsletterForm variant="section" />
          </div>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <section className="hero" style={{ minHeight: "40vh" }}>
        <p className="hero-eyebrow">Our Firm</p>
        <h1 className="hero-title" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>About Acro Capital Group</h1>
        <div className="gold-rule" />
      </section>

      <section className="section">
        <div className="two-col">
          <div>
            <p className="section-label">Who We Are</p>
            <h2 className="section-heading">Disciplined.<br />Systematic.<br />Results-oriented.</h2>
          </div>
          <div>
            <p className="body-text">
              Acro Capital Group is an alternative investment management firm. Founded on the conviction
              that disciplined, process-driven investing can consistently generate superior
              risk-adjusted returns.
            </p>
            <p className="body-text">
              Our professionals bring deep expertise across quantitative research, portfolio management,
              and financial engineering. Every strategy is independently validated and collectively
              resilient.
            </p>
            <p className="body-text">
              We adapt to shifting market conditions without compromising structural integrity. Complexity
              becomes competitive advantage.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="section-label">Our Values</p>
        <h2 className="section-heading">What guides us</h2>
        <div className="principles-grid">
          {[
            ["Transparency", "Clear communication and honest reporting to our investors. Non-negotiable."],
            ["Independence", "Research and portfolio decisions made free from external bias. Data and disciplined analysis only."],
            ["Long-term Thinking", "A multi-cycle investment perspective. Volatility is an opportunity for those with patience."],
            ["Accountability", "Every decision is documented, reviewed, and owned. Held to the highest standards of professional conduct."],
          ].map(([title, desc], i) => (
            <div className="principle-card" key={i}>
              <div className="principle-number">0{i + 1}</div>
              <div className="principle-title">{title}</div>
              <p className="principle-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Strategy() {
  return (
    <>
      <section className="hero" style={{ minHeight: "40vh" }}>
        <p className="hero-eyebrow">Investment Approach</p>
        <h1 className="hero-title" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>Strategy</h1>
        <div className="gold-rule" />
      </section>

      <section className="section">
        <div className="two-col">
          <div>
            <p className="section-label">Our Approach</p>
            <h2 className="section-heading">Systematic conviction at every level.</h2>
          </div>
          <div>
            <p className="body-text">
              Acro Capital Group applies a quantitatively driven methodology across multiple
              alternative investment strategies. Rigorous, data-driven analysis and systematic
              risk management at every layer of the portfolio.
            </p>
            <p className="body-text">
              We do not rely on a single strategy or market regime. A diversified set of uncorrelated
              return streams, each independently validated.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="two-col">
          <div>
            <p className="section-label">Focus Areas</p>
            <h2 className="section-heading">Where we deploy capital</h2>
            <ul className="focus-list">
              {[
                "Global equities and equity derivatives",
                "Macro and currency strategies",
                "Commodities and futures markets",
                "Precious metals, including physical gold delivery",
                "Volatility and structured products",
                "Event-driven and special situations",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-label">Risk Framework</p>
            <h2 className="section-heading">Protecting capital first.</h2>
            <p className="body-text">
              Risk management is embedded in every stage of the investment process. A multi-layered
              framework encompassing position-level, strategy-level, and portfolio-level controls.
            </p>
            <p className="body-text">
              Drawdown limits, correlation monitoring, liquidity constraints, and stress testing are
              applied continuously and updated in response to changing market conditions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Research() {
  return (
    <>
      <section className="hero" style={{ minHeight: "40vh" }}>
        <p className="hero-eyebrow">Research and Intelligence</p>
        <h1 className="hero-title" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>Research</h1>
        <div className="gold-rule" />
      </section>

      <section className="section">
        <div className="two-col">
          <div>
            <p className="section-label">Our Edge</p>
            <h2 className="section-heading">Insight from data others overlook.</h2>
          </div>
          <div>
            <p className="body-text">
              The research function is the foundation of every investment. Proprietary infrastructure
              built around alternative data, quantitative modeling, and fundamental sector expertise.
            </p>
            <p className="body-text">
              Access to research outputs is limited to fund investors and authorized personnel.
              Acro Capital Group does not publish external research reports or market commentary.
            </p>
          </div>
        </div>

        <div className="principles-grid" style={{ marginTop: "64px" }}>
          {[
            ["Alternative Data", "Proprietary datasets spanning transaction data, satellite imagery, web traffic metrics, and sentiment analytics processed daily."],
            ["Quantitative Modeling", "Systematic factor models, statistical arbitrage frameworks, and machine learning signal generation at scale."],
            ["Macro Analysis", "Top-down global macro research covering monetary policy, geopolitical dynamics, and cross-asset flow analysis."],
            ["Sector Intelligence", "Deep-dive quantitative analysis of sector dynamics, supply-demand structures, and price behavior across asset classes."],
          ].map(([title, desc], i) => (
            <div className="principle-card" key={i}>
              <div className="principle-number">0{i + 1}</div>
              <div className="principle-title">{title}</div>
              <p className="principle-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Contact() {
  return (
    <>
      <section className="hero" style={{ minHeight: "40vh" }}>
        <p className="hero-eyebrow">Get in Touch</p>
        <h1 className="hero-title" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>Contact</h1>
        <div className="gold-rule" />
      </section>

      <section className="section">
        <div className="contact-grid">
          <div>
            <div className="contact-label">Headquarters</div>
            <div className="contact-details">
              Acro Capital, LLC<br />
              Wilmington, Delaware<br />
              <a href="tel:+13024164474">302 416 4474 (USA)</a>
            </div>
          </div>
          <div>
            <div className="contact-label">General Inquiries</div>
            <div className="contact-details">
              <a href="mailto:info@acrocapitalgroup.com">info@acrocapitalgroup.com</a>
            </div>
          </div>
          <div>
            <div className="contact-label">Investor Relations</div>
            <div className="contact-details">
              For inquiries related to existing investor accounts or fund information, contact us
              at the address above.
            </div>
          </div>
        </div>

        <div className="notice" style={{ marginTop: "64px" }}>
          <p>
            <strong>acrocapitalgroup.com</strong> is the only official website of Acro Capital
            Group LLC. We do not solicit investments via email, social media, or third-party
            platforms.
          </p>
        </div>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <section className="section">
      <p className="section-label">404</p>
      <h2 className="section-heading">Page not found</h2>
      <p className="body-text">
        <Link href="/" style={{ color: "#B8960C" }}>Return to home</Link>
      </p>
    </section>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/strategy" component={Strategy} />
      <Route path="/research" component={Research} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <div className="page-wrapper">
        <Nav />
        <Router />
        <Footer />
      </div>
    </WouterRouter>
  );
}
