import { Link } from "wouter";
import { Mail, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-background/10 border border-background/20 flex items-center justify-center flex-shrink-0">
              <span className="text-background font-extrabold text-xs tracking-tight">RMT</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm text-background/90">Research Measurement</span>
              <span className="font-bold text-sm text-background/90">Technologies</span>
            </div>
          </div>
          <p className="text-sm text-background/60 leading-relaxed max-w-xs">
            The only way left to get more positive response from advertising is to exalt the ad.
          </p>
          <div className="flex items-center gap-2 text-sm text-background/60">
            <Award className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <span>2022 Emmy® Award Winner</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-background/40">Navigation</p>
          <nav className="flex flex-col gap-2">
            {[
              { label: "Home", href: "/" },
              { label: "How It Works", href: "/how-it-works" },
              { label: "Results", href: "/results" },
              { label: "Leadership", href: "/leadership" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-sm text-background/60 hover:text-background cursor-pointer transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-background/40">Get in Touch</p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:bharvey@rmt.solutions"
              className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
              data-testid="link-footer-email"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              bharvey@rmt.solutions
            </a>
          </div>
          <div className="mt-2">
            <p className="text-xs text-background/40 leading-relaxed">
              Guaranteed high response results — or the equivalent of your money back.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Research Measurement Technologies. All rights reserved.
          </p>
          <p className="text-xs text-background/40">
            Emmy® is a trademark of the Television Academy.
          </p>
        </div>
      </div>
    </footer>
  );
}
