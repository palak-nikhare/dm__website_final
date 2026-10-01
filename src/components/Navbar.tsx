import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Features', href: '#features' },
  { label: 'Technology', href: '#technology' },
  { label: 'Warranty', href: '/warranty', isWarranty: true },
  { label: 'Reviews', href: '#reviews' },
];

export function Navbar({
  onCartClick,
  onWishlistClick,
  onNavigate
}: {
  onCartClick: () => void;
  onWishlistClick: () => void;
  onNavigate?: (path: string) => void;
}) {
  const { cartCount, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (link: { label: string; href: string; isWarranty?: boolean }) => {
    setMenuOpen(false);
    if (link.isWarranty) {
      onNavigate?.('/warranty');
    } else {
      onNavigate?.('/');
      setTimeout(() => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-cream-100/90 backdrop-blur-md border-b border-cream-300/60 shadow-cozy' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4.5 sm:px-10">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-2xl font-semibold tracking-tightish text-espresso-900"
          >
            NEXUS
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
                className="text-sm font-medium text-espresso-700/80 transition-all duration-300 hover:text-terracotta-500 hover:scale-105"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              onClick={onWishlistClick}
              className="relative rounded-full p-2.5 text-espresso-800 transition-colors hover:bg-espresso-900/5 hover:text-terracotta-500"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta-500 px-1 text-[10px] font-semibold text-cream-50 shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={onCartClick}
              className="relative rounded-full p-2.5 text-espresso-800 transition-colors hover:bg-espresso-900/5 hover:text-terracotta-500"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-espresso-900 px-1 text-[10px] font-semibold text-cream-50 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick({ label: 'Shop', href: '#shop' })}
              className="hidden rounded-full bg-espresso-900 px-6 py-2.5 text-sm font-semibold text-cream-50 shadow-cozy transition-all duration-400 hover:bg-espresso-800 hover:shadow-cozy-hover hover:-translate-y-0.5 sm:inline-block"
            >
              Shop Collection
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2 text-espresso-800 transition-colors hover:bg-espresso-900/5 lg:hidden"
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
          className={`absolute inset-0 bg-espresso-900/40 backdrop-blur-xs transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-oat-50 p-6 shadow-cozy-lg transition-transform duration-400 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-cream-300/60 pb-4">
            <span className="font-display text-xl font-semibold text-espresso-900">NEXUS</span>
            <button onClick={() => setMenuOpen(false)} className="rounded-full p-2 text-espresso-800 hover:bg-espresso-900/5">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-2 pt-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
                className="rounded-2xl px-4 py-3 text-base font-medium text-espresso-800 transition-colors hover:bg-cream-200/60"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => handleNavClick({ label: 'Shop', href: '#shop' })}
              className="mt-6 rounded-full bg-espresso-900 px-6 py-3.5 text-center text-sm font-semibold text-cream-50 shadow-cozy"
            >
              Shop Collection
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
