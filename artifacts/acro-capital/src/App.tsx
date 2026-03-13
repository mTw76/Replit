import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";

function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/strategy", label: "Strategy" },
    { href: "/research", label: "Research" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div style={{ fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "13px", color: "#1a1a1a", backgroundColor: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px" }}>
        <header style={{ paddingTop: "28px", paddingBottom: "12px", borderBottom: "1px solid #ccc" }}>
          <div style={{ marginBottom: "10px" }}>
            <Link href="/" style={{ fontSize: "15px", fontWeight: "bold", letterSpacing: "0.01em", color: "#1a1a1a", textDecoration: "none" }}>
              Acro Capital Group
            </Link>
          </div>
          <nav>
            {navLinks.map((link, i) => {
              const isActive = location === link.href;
              return (
                <span key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: isActive ? "#000" : "#333",
                      textDecoration: isActive ? "underline" : "none",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.textDecoration = "underline"; }}
                    onMouseLeave={(e) => { if (!isActive) (e.target as HTMLAnchorElement).style.textDecoration = "none"; }}
                  >
                    {link.label}
                  </Link>
                  {i < navLinks.length - 1 && <span style={{ margin: "0 8px", color: "#999" }}>|</span>}
                </span>
              );
            })}
          </nav>
        </header>

        <main style={{ paddingTop: "32px", paddingBottom: "60px" }}>
          {children}
        </main>

        <footer style={{ borderTop: "1px solid #ccc", paddingTop: "14px", paddingBottom: "24px", fontSize: "11px", color: "#666" }}>
          <p>© {new Date().getFullYear()} Acro Capital Group LLC. All rights reserved.</p>
          <p style={{ marginTop: "4px" }}>
            The information on this website is intended solely for informational purposes and does not constitute an offer to sell or a solicitation of an offer to buy any security.
          </p>
        </footer>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <p style={{ fontSize: "13px", lineHeight: "1.7", marginBottom: "32px", maxWidth: "640px" }}>
        Acro Capital Group is an investment management firm that integrates empirical research
        with real-time market intelligence to guide its alternative investment strategies.
      </p>

      <div style={{ borderTop: "1px solid #ddd", paddingTop: "28px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "16px" }}>New York</h3>
        <p style={{ lineHeight: "1.9", color: "#333" }}>
          Acro Capital Group LLC<br />
          299 Park Avenue<br />
          New York, New York 10171<br />
          <a href="tel:+12125550100" style={{ color: "#333" }}>212 555 0100</a>
        </p>
      </div>
    </div>
  );
}

function About() {
  return (
    <div style={{ maxWidth: "640px" }}>
      <h2 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "20px" }}>About Acro Capital Group</h2>

      <p style={{ lineHeight: "1.8", marginBottom: "18px", color: "#333" }}>
        Acro Capital Group is a precision-driven investment management firm that integrates
        empirical research with real-time market intelligence to guide its strategies.
      </p>

      <p style={{ lineHeight: "1.8", marginBottom: "18px", color: "#333" }}>
        We believe that outperformance begins with precision. Every investment decision is
        anchored in a disciplined, repeatable process driven by empirical research, real-time
        market intelligence, and strategic clarity.
      </p>

      <p style={{ lineHeight: "1.8", marginBottom: "18px", color: "#333" }}>
        This rigor extends beyond analysis — it defines how we engage volatility, evaluate
        opportunity, and execute with conviction in uncertain markets. Our process is dynamic
        yet grounded, adapting to shifting conditions without compromising structural integrity.
      </p>

      <p style={{ lineHeight: "1.8", color: "#333" }}>
        It is this approach that allows us to transform complexity into competitive advantage
        and deliver consistent, profitable performance for our investors.
      </p>

      <div style={{ borderTop: "1px solid #ddd", marginTop: "32px", paddingTop: "24px" }}>
        <p style={{ fontSize: "12px", fontStyle: "italic", color: "#555", lineHeight: "1.7" }}>
          Precision. Process. Performance.
        </p>
      </div>
    </div>
  );
}

function Strategy() {
  return (
    <div style={{ maxWidth: "640px" }}>
      <h2 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "20px" }}>Investment Strategy</h2>

      <p style={{ lineHeight: "1.8", marginBottom: "24px", color: "#333" }}>
        Acro Capital Group employs quantitative and fundamental methodologies across multiple
        alternative investment strategies. Our approach is rooted in rigorous, data-driven
        analysis and systematic risk management.
      </p>

      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "12px" }}>Core Principles</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <tbody>
            {[
              ["Empirical Research", "All decisions are grounded in rigorous quantitative and qualitative analysis derived from first-principles research."],
              ["Market Intelligence", "Real-time monitoring of market microstructure, capital flows, and macro developments informs each position."],
              ["Risk Management", "Systematic risk controls are embedded throughout the investment process, from idea generation to portfolio construction."],
              ["Process Discipline", "A repeatable, structured methodology eliminates behavioral bias and ensures consistency across market cycles."],
            ].map(([title, desc], i) => (
              <tr key={i} style={{ borderTop: "1px solid #e8e8e8" }}>
                <td style={{ padding: "10px 16px 10px 0", verticalAlign: "top", whiteSpace: "nowrap", fontWeight: "bold", color: "#1a1a1a", width: "160px" }}>{title}</td>
                <td style={{ padding: "10px 0", color: "#444", lineHeight: "1.7" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ borderTop: "1px solid #ddd", paddingTop: "24px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "12px" }}>Investment Focus Areas</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {[
            "Global equities and equity derivatives",
            "Fixed income and credit",
            "Macro and currency strategies",
            "Volatility and structured products",
            "Event-driven and special situations",
          ].map((item, i) => (
            <li key={i} style={{ padding: "5px 0", color: "#333", borderTop: i === 0 ? "1px solid #e8e8e8" : "none", borderBottom: "1px solid #e8e8e8" }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Research() {
  return (
    <div style={{ maxWidth: "640px" }}>
      <h2 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "20px" }}>Research</h2>

      <p style={{ lineHeight: "1.8", marginBottom: "24px", color: "#333" }}>
        Our research function is the foundation of every investment we make. We maintain a
        proprietary research infrastructure built around alternative data, quantitative modeling,
        and fundamental sector expertise.
      </p>

      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "12px" }}>Research Infrastructure</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <tbody>
            {[
              ["Alternative Data", "Proprietary datasets spanning transaction data, satellite imagery, web traffic, and sentiment analytics."],
              ["Quantitative Modeling", "Systematic factor models, statistical arbitrage frameworks, and machine learning signal generation."],
              ["Macro Analysis", "Top-down global macro research covering monetary policy, geopolitical dynamics, and cross-asset correlations."],
              ["Fundamental Research", "Deep-dive company and sector analysis conducted by dedicated analysts with specialized domain expertise."],
            ].map(([title, desc], i) => (
              <tr key={i} style={{ borderTop: "1px solid #e8e8e8" }}>
                <td style={{ padding: "10px 16px 10px 0", verticalAlign: "top", whiteSpace: "nowrap", fontWeight: "bold", color: "#1a1a1a", width: "160px" }}>{title}</td>
                <td style={{ padding: "10px 0", color: "#444", lineHeight: "1.7" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ lineHeight: "1.8", color: "#555", fontSize: "12px", fontStyle: "italic" }}>
        Acro Capital Group does not publish external research. Access to research outputs
        is limited to fund investors and authorized personnel.
      </p>
    </div>
  );
}

function Careers() {
  return (
    <div style={{ maxWidth: "640px" }}>
      <h2 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "20px" }}>Careers</h2>

      <p style={{ lineHeight: "1.8", marginBottom: "18px", color: "#333" }}>
        Acro Capital Group seeks exceptional individuals with deep expertise in quantitative
        research, portfolio management, technology, and operations. We maintain a culture
        defined by intellectual rigor, collaborative inquiry, and a commitment to excellence.
      </p>

      <p style={{ lineHeight: "1.8", marginBottom: "28px", color: "#333" }}>
        We value diverse perspectives and backgrounds. Our team includes professionals with
        experience spanning finance, mathematics, computer science, physics, and engineering.
      </p>

      <div style={{ borderTop: "1px solid #ddd", paddingTop: "24px", marginBottom: "28px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "12px" }}>Open Roles</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <tbody>
            {[
              ["Quantitative Researcher", "New York", "Full-time"],
              ["Portfolio Analyst", "New York", "Full-time"],
              ["Senior Software Engineer — Infrastructure", "New York", "Full-time"],
              ["Risk Manager", "New York", "Full-time"],
              ["Data Scientist — Alternative Data", "New York", "Full-time"],
            ].map(([role, location, type], i) => (
              <tr key={i} style={{ borderTop: "1px solid #e8e8e8" }}>
                <td style={{ padding: "9px 16px 9px 0", color: "#1a1a1a", width: "60%" }}>{role}</td>
                <td style={{ padding: "9px 8px 9px 0", color: "#555", width: "25%" }}>{location}</td>
                <td style={{ padding: "9px 0", color: "#555" }}>{type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ lineHeight: "1.8", color: "#333" }}>
        Qualified candidates may submit a curriculum vitae and cover letter to{" "}
        <a href="mailto:careers@acrocapitalgroup.com" style={{ color: "#000033" }}>
          careers@acrocapitalgroup.com
        </a>
        . We review all applications but respond only to candidates selected for further consideration.
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ maxWidth: "640px" }}>
      <h2 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "24px" }}>Contact</h2>

      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "14px" }}>New York</h3>
        <p style={{ lineHeight: "2.0", color: "#333" }}>
          Acro Capital Group LLC<br />
          299 Park Avenue<br />
          New York, New York 10171<br />
          <a href="tel:+12125550100" style={{ color: "#333" }}>212 555 0100</a><br />
          <a href="mailto:info@acrocapitalgroup.com" style={{ color: "#333" }}>info@acrocapitalgroup.com</a>
        </p>
      </div>

      <div style={{ borderTop: "1px solid #ddd", paddingTop: "28px", marginBottom: "32px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "14px" }}>Investor Relations</h3>
        <p style={{ lineHeight: "2.0", color: "#333" }}>
          For inquiries related to existing investor accounts or fund information:<br />
          <a href="mailto:ir@acrocapitalgroup.com" style={{ color: "#333" }}>ir@acrocapitalgroup.com</a>
        </p>
      </div>

      <div style={{ borderTop: "1px solid #ddd", paddingTop: "28px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "14px" }}>Media</h3>
        <p style={{ lineHeight: "1.8", color: "#333" }}>
          Acro Capital Group does not accept unsolicited media inquiries. Authorized press
          contacts may direct correspondence to{" "}
          <a href="mailto:media@acrocapitalgroup.com" style={{ color: "#333" }}>
            media@acrocapitalgroup.com
          </a>
          .
        </p>
      </div>

      <div style={{ borderTop: "1px solid #ddd", marginTop: "32px", paddingTop: "20px" }}>
        <p style={{ fontSize: "12px", color: "#666", lineHeight: "1.7" }}>
          Acro Capital Group LLC is registered as an investment adviser with the
          Securities and Exchange Commission. Registration does not imply a certain level
          of skill or training. Please note that{" "}
          <strong>acrocapitalgroup.com</strong> is the only official website of
          Acro Capital Group LLC.
        </p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <p style={{ color: "#333" }}>Page not found.</p>
      <p style={{ marginTop: "8px" }}>
        <Link href="/" style={{ color: "#000033" }}>Return to home</Link>
      </p>
    </div>
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
      <Layout>
        <Router />
      </Layout>
    </WouterRouter>
  );
}
