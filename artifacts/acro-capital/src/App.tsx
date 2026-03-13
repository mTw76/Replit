import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";

function Nav() {
  const [location] = useLocation();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/strategy", label: "Strategy" },
    { href: "/research", label: "Research" },
    { href: "/careers", label: "Careers" },
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

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">Acro Capital Group</div>
        <div className="footer-sub">Investment Management</div>
        <div className="footer-rule" />
        <p className="footer-legal">
          Acro Capital Group LLC is registered as an investment adviser with the Securities and Exchange
          Commission. Registration does not imply a certain level of skill or training. This website is
          for informational purposes only and does not constitute an offer to sell or a solicitation of
          an offer to buy any security or investment product. Past performance is not indicative of future
          results. Please note that <strong style={{ color: "#6B6560" }}>acrocapitalgroup.com</strong> is
          the only official website of Acro Capital Group LLC.
          <br /><br />
          © {new Date().getFullYear()} Acro Capital Group LLC. All rights reserved.
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
            <h2 className="section-heading">Where <em>empirical rigor</em> meets conviction</h2>
          </div>
          <div>
            <p className="body-text">
              Acro Capital Group is a precision-driven investment management firm that integrates
              empirical research with real-time market intelligence to guide its alternative
              investment strategies.
            </p>
            <p className="body-text">
              Every investment decision is anchored in a disciplined, repeatable process —
              driven by data, shaped by experience, and executed with conviction. We transform
              complexity into competitive advantage for our investors.
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
    </>
  );
}

function About() {
  return (
    <>
      <section className="hero" style={{ minHeight: "40vh" }}>
        <p className="hero-eyebrow">Our Story</p>
        <h1 className="hero-title" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>About Acro Capital Group</h1>
        <div className="gold-rule" />
      </section>

      <section className="section">
        <div className="two-col">
          <div>
            <p className="section-label">Who We Are</p>
            <h2 className="section-heading">A culture of <em>intellectual rigor</em></h2>
          </div>
          <div>
            <p className="body-text">
              Founded on the conviction that disciplined, process-driven investing can consistently
              generate superior risk-adjusted returns, Acro Capital Group brings together professionals
              with deep expertise across quantitative research, portfolio management, and financial
              engineering.
            </p>
            <p className="body-text">
              We believe that outperformance begins with precision. This rigor extends beyond
              analysis — it defines how we engage volatility, evaluate opportunity, and execute
              with conviction in uncertain markets.
            </p>
            <p className="body-text">
              Our process is dynamic yet grounded, adapting to shifting conditions without
              compromising structural integrity. It is this approach that allows us to transform
              complexity into competitive advantage.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="section-label">Our Values</p>
        <h2 className="section-heading">What guides us</h2>
        <div className="principles-grid">
          {[
            ["Transparency", "We operate with full transparency to our investors. Clear communication and honest reporting are non-negotiable."],
            ["Independence", "Our research and portfolio decisions are made free from external bias, guided solely by data and disciplined analysis."],
            ["Long-term Thinking", "We invest with a multi-cycle perspective. Short-term volatility is an opportunity, not a threat, to those with patience."],
            ["Accountability", "Every decision is documented, reviewed, and owned. We hold ourselves to the highest standards of professional conduct."],
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
            <h2 className="section-heading">Systematic <em>conviction</em> at every level</h2>
          </div>
          <div>
            <p className="body-text">
              Acro Capital Group employs quantitative and fundamental methodologies across multiple
              alternative investment strategies. Our approach is rooted in rigorous, data-driven
              analysis and systematic risk management at every layer of the portfolio.
            </p>
            <p className="body-text">
              We do not rely on a single strategy or market regime. Instead, we maintain a
              diversified set of uncorrelated return streams — each independently validated,
              collectively resilient.
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
                "Fixed income and credit",
                "Macro and currency strategies",
                "Volatility and structured products",
                "Event-driven and special situations",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-label">Risk Framework</p>
            <h2 className="section-heading">Protecting capital <em>first</em></h2>
            <p className="body-text">
              Risk management is not a separate function at Acro Capital Group — it is embedded
              in every stage of our investment process. We employ a multi-layered risk framework
              encompassing position-level, strategy-level, and portfolio-level controls.
            </p>
            <p className="body-text">
              Drawdown limits, correlation monitoring, liquidity constraints, and stress testing
              are applied continuously and updated in response to changing market dynamics.
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
        <p className="hero-eyebrow">Research & Intelligence</p>
        <h1 className="hero-title" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>Research</h1>
        <div className="gold-rule" />
      </section>

      <section className="section">
        <div className="two-col">
          <div>
            <p className="section-label">Our Edge</p>
            <h2 className="section-heading">Insight derived from <em>data others overlook</em></h2>
          </div>
          <div>
            <p className="body-text">
              Our research function is the foundation of every investment we make. We maintain a
              proprietary research infrastructure built around alternative data, quantitative
              modeling, and fundamental sector expertise.
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
            ["Fundamental Research", "Deep-dive company and sector analysis conducted by analysts with specialized domain expertise."],
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

function Careers() {
  return (
    <>
      <section className="hero" style={{ minHeight: "40vh" }}>
        <p className="hero-eyebrow">Join Our Team</p>
        <h1 className="hero-title" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>Careers</h1>
        <div className="gold-rule" />
      </section>

      <section className="section">
        <div className="two-col">
          <div>
            <p className="section-label">Our Culture</p>
            <h2 className="section-heading">Built for those who demand <em>excellence</em></h2>
          </div>
          <div>
            <p className="body-text">
              Acro Capital Group seeks exceptional individuals with deep expertise in quantitative
              research, portfolio management, technology, and operations. We maintain a culture
              defined by intellectual rigor, collaborative inquiry, and a commitment to excellence.
            </p>
            <p className="body-text">
              We value diverse perspectives and unconventional backgrounds. Our team includes
              professionals with experience spanning finance, mathematics, computer science,
              physics, and engineering.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="section-label">Open Roles</p>
        <h2 className="section-heading">Current opportunities</h2>
        <table className="careers-table">
          <tbody>
            {[
              ["Quantitative Researcher", "New York", "Full-time"],
              ["Portfolio Analyst", "New York", "Full-time"],
              ["Senior Software Engineer — Infrastructure", "New York", "Full-time"],
              ["Risk Manager", "New York", "Full-time"],
              ["Data Scientist — Alternative Data", "New York", "Full-time"],
            ].map(([role, loc, type], i) => (
              <tr key={i}>
                <td>{role}</td>
                <td style={{ color: "#9B9590", fontSize: "13px" }}>{loc}</td>
                <td>{type}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="notice" style={{ marginTop: "48px" }}>
          <p>
            Qualified candidates may submit a curriculum vitae and cover letter to{" "}
            <a href="mailto:careers@acrocapitalgroup.com" style={{ color: "#B8960C" }}>
              careers@acrocapitalgroup.com
            </a>
            . We review all applications but respond only to candidates selected for further
            consideration. Acro Capital Group does not accept unsolicited agency submissions.
          </p>
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
              Acro Capital Group LLC<br />
              299 Park Avenue<br />
              New York, New York 10171<br />
              <a href="tel:+12125550100">212 555 0100</a>
            </div>
          </div>
          <div>
            <div className="contact-label">Investor Relations</div>
            <div className="contact-details">
              For inquiries related to existing investor accounts or fund information:<br />
              <a href="mailto:ir@acrocapitalgroup.com">ir@acrocapitalgroup.com</a>
            </div>
          </div>
          <div>
            <div className="contact-label">General Inquiries</div>
            <div className="contact-details">
              <a href="mailto:info@acrocapitalgroup.com">info@acrocapitalgroup.com</a>
              <br /><br />
              <span style={{ color: "#9B9590", fontSize: "13px" }}>
                Media inquiries are only accepted from authorized press contacts.
              </span>
            </div>
          </div>
        </div>

        <div className="notice" style={{ marginTop: "64px" }}>
          <p>
            Acro Capital Group LLC is registered as an investment adviser with the Securities and
            Exchange Commission. Please note that <strong>acrocapitalgroup.com</strong> is the
            only official website of Acro Capital Group LLC. We do not solicit investments via
            email, social media, or third-party platforms.
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
        <Link href="/" style={{ color: "#B8960C" }}>Return to home →</Link>
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
      <Route path="/careers" component={Careers} />
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
