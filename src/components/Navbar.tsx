import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Features', href: '#features' },
  { label: 'Technology', href: '#technology' },
  { label: 'Reviews', href: '#reviews' },
];

export function Navbar({ onCartClick, onWishlistClick }: { onCartClick: () => void; onWishlistClick: () => void }) {
  const { cartCount, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-cream-100/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(43,40,38,0.08)]' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="font-display text-2xl font-semibold tracking-tightish text-charcoal-900"
          >
            NEXUS
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-sm font-medium text-charcoal-800/80 transition-colors hover:text-charcoal-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onWishlistClick}
              className="relative rounded-full p-2 text-charcoal-800 transition-colors hover:bg-charcoal-900/5"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-semibold text-cream-100">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={onCartClick}
              className="relative rounded-full p-2 text-charcoal-800 transition-colors hover:bg-charcoal-900/5"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-charcoal-900 px-1 text-[10px] font-semibold text-cream-100">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => scrollTo('#shop')}
              className="hidden rounded-full bg-charcoal-900 px-5 py-2.5 text-sm font-medium text-cream-100 transition-all hover:bg-charcoal-800 hover:shadow-lg sm:inline-block"
            >
              Shop Now
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2 text-charcoal-800 transition-colors hover:bg-charcoal-900/5 lg:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? 'visible' : 'invisible'}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-charcoal-900/40 transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-cream-100 shadow-2xl transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-charcoal-900/10 px-5 py-4">
            <span className="font-display text-xl font-semibold text-charcoal-900">NEXUS</span>
            <button onClick={() => setMenuOpen(false)} className="rounded-full p-2 text-charcoal-800 hover:bg-charcoal-900/5">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="rounded-lg px-3 py-3 text-base font-medium text-charcoal-800 transition-colors hover:bg-charcoal-900/5"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => scrollTo('#shop')}
              className="mt-4 rounded-full bg-charcoal-900 px-5 py-3 text-center text-sm font-medium text-cream-100"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
