import { useState } from 'react';
import { Mail, Instagram, Twitter, Youtube, Check } from 'lucide-react';

export function Footer({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-charcoal-900 text-cream-100">
      {/* Newsletter */}
      <div className="border-b border-cream-100/10 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="font-display text-3xl font-medium tracking-tightish sm:text-4xl">
            Get early access to new colors and exclusive offers.
          </h3>
          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cream-100/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full rounded-full border border-cream-100/15 bg-charcoal-800 py-3.5 pl-12 pr-4 text-sm text-cream-100 placeholder:text-cream-100/40 focus:border-olive-300/50 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className={`rounded-full px-6 py-3.5 text-sm font-medium transition-all ${
                subscribed ? 'bg-olive-500 text-cream-100' : 'bg-cream-100 text-charcoal-900 hover:bg-cream-50'
              }`}
            >
              {subscribed ? (
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Subscribed</span>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          <p className="mt-3 text-xs text-cream-100/40">No spam. Just new drops and launch offers.</p>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('/');
              }}
              className="font-display text-2xl font-semibold"
            >
              NEXUS
            </a>
            <p className="mt-3 text-sm leading-relaxed text-cream-100/60">
              Smart backpacks designed for the way you study, work, commute and create.
            </p>
            <p className="mt-3 text-sm text-olive-300">Carry Smarter. Go Further.</p>
          </div>

          <FooterCol
            title="Shop"
            links={[
              { label: 'All Backpacks', href: '#shop' },
              { label: 'New Collection', href: '#shop' },
              { label: 'Popular this Week', href: '#shop' },
              { label: 'Color Collection', href: '#color-collection' }
            ]}
            onNavigate={onNavigate}
          />
          <FooterCol
            title="Company"
            links={[
              { label: 'About NEXUS', href: '#home' },
              { label: 'Technology', href: '#technology' },
              { label: 'Reviews', href: '#reviews' },
              { label: 'Sustainability', href: '#features' }
            ]}
            onNavigate={onNavigate}
          />
          <FooterCol
            title="Support"
            links={[
              { label: 'Shipping & Delivery', href: '#features' },
              { label: '30-Day Returns', href: '#features' },
              { label: 'Warranty & Registration', href: '/warranty', isWarranty: true },
              { label: 'Contact Us', href: '#home' }
            ]}
            onNavigate={onNavigate}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-cream-100/10 pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <SocialIcon icon={Instagram} label="Instagram" />
            <SocialIcon icon={Twitter} label="Twitter" />
            <SocialIcon icon={Youtube} label="YouTube" />
          </div>
          <p className="text-xs text-cream-100/40">
            © 2026 NEXUS. Premium Smart Carry & Accessories. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  onNavigate
}: {
  title: string;
  links: { label: string; href: string; isWarranty?: boolean }[];
  onNavigate?: (path: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-cream-100">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={(e) => {
                if (link.isWarranty) {
                  e.preventDefault();
                  onNavigate?.('/warranty');
                } else if (link.href.startsWith('#')) {
                  e.preventDefault();
                  onNavigate?.('/');
                  setTimeout(() => {
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`text-sm transition-colors ${
                link.isWarranty
                  ? 'font-medium text-olive-300 hover:text-cream-100'
                  : 'text-cream-100/55 hover:text-cream-100'
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ icon: Icon, label }: { icon: typeof Mail; label: string }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/15 text-cream-100/70 transition-all hover:border-olive-300/40 hover:text-olive-300"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
