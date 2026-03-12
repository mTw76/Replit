import { Link } from "wouter";

const navLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Results", href: "/results" },
  { label: "Leadership", href: "/leadership" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="text-lg font-black tracking-tight text-foreground">RMT</span>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Research Measurement Technologies — Emmy® Award-winning advertising research that
              guarantees higher response from your ads.
            </p>
            <a
              href="mailto:bharvey@rmt.solutions"
              className="text-sm text-primary hover:underline transition-colors w-fit"
              data-testid="link-footer-email"
            >
              bharvey@rmt.solutions
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Pages
            </p>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Awards
            </p>
            <p className="text-sm text-muted-foreground">2022 Emmy® Award</p>
            <p className="text-xs text-muted-foreground/60 -mt-1">Engineering, Science & Technology</p>
            <p className="text-sm text-muted-foreground mt-1">ARF Erwin Ephron Award</p>
            <p className="text-xs text-muted-foreground/60 -mt-1">First Recipient, 2014</p>
            <p className="text-sm text-muted-foreground mt-1">Cynopsis MeasureUp</p>
            <p className="text-xs text-muted-foreground/60 -mt-1">Hall of Fame, 2022</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Research Measurement Technologies. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Emmy® is a registered trademark of NATAS / ATAS.
          </p>
        </div>
      </div>
    </footer>
  );
}
