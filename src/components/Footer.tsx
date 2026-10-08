import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Twitter, Youtube, Check } from 'lucide-react';

export function Footer() {
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
    <footer className="bg-espresso-900 text-cream-50">
      {/* Newsletter */}
      <div className="border-b border-cream-100/10 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="font-display text-3xl font-semibold tracking-tightish sm:text-4xl">
            Get early access to new colors and cozy drops.
          </h3>
          <form onSubmit={handleSubmit} className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-4.5 top-1/2 h-5 w-5 -translate-y-1/2 text-cream-100/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full rounded-full border border-cream-100/15 bg-espresso-800 py-3.5 pl-12 pr-4 text-sm text-cream-50 placeholder:text-cream-100/40 focus:border-terracotta-400 focus:outline-none shadow-cozy"
              />
            </div>
            <button
              type="submit"
              className={`rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-400 ${
                subscribed ? 'bg-sage-500 text-cream-50' : 'bg-cream-50 text-espresso-900 hover:bg-oat-50 hover:shadow-cozy-hover'
              }`}
            >
              {subscribed ? (
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Subscribed</span>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          <p className="mt-3.5 text-xs text-cream-100/40">No spam. Just gentle launch updates and quiet news.</p>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="font-display text-2xl font-semibold hover:text-terracotta-400 transition-colors">
              NEXUS
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-cream-100/65">
              Smart backpacks designed for the way you study, work, commute and create.
            </p>
            <p className="mt-3 text-sm font-medium text-terracotta-400">Carry Smarter. Everyday.</p>
          </div>

          <FooterCol
            title="Shop"
            links={[
              { label: 'All Backpacks', path: '/shop' },
              { label: 'New Collection', path: '/shop' },
              { label: 'Popular this Week', path: '/shop' },
              { label: 'Color Collection', path: '/shop' }
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: 'About NEXUS', path: '/' },
              { label: 'Technology', path: '/technology' },
              { label: 'Reviews', path: '/reviews' },
              { label: 'Sustainability', path: '/features' }
            ]}
          />
          <FooterCol
            title="Support"
            links={[
              { label: 'My Orders & Tracking', path: '/orders' },
              { label: 'Help Center & FAQ', path: '/help' },
              { label: 'Shipping & Delivery', path: '/help' },
              { label: '30-Day Returns', path: '/help' },
              { label: 'Warranty & Registration', path: '/warranty', isWarranty: true },
              { label: 'Contact Us', path: '/help' }
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-cream-100/10 pt-8 sm:flex-row">
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
  links
}: {
  title: string;
  links: { label: string; path: string; isWarranty?: boolean }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-cream-50">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.path}
              className={`text-sm transition-colors ${
                link.isWarranty
                  ? 'font-semibold text-terracotta-400 hover:text-cream-50'
                  : 'text-cream-100/60 hover:text-cream-50'
              }`}
            >
              {link.label}
            </Link>
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/15 text-cream-100/70 transition-all hover:border-terracotta-400 hover:text-terracotta-400 shadow-sm"
    >
      <Icon className="h-4.5 w-4.5" />
    </a>
  );
}
