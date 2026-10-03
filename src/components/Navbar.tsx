import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Features', path: '/features' },
  { label: 'Technology', path: '/technology' },
  { label: 'Warranty', path: '/warranty' },
  { label: 'Reviews', path: '/reviews' },
];

interface NavbarProps {
  onCartClick: () => void;
  onWishlistClick: () => void;
}

export function Navbar({ onCartClick, onWishlistClick }: NavbarProps) {
  const { cartCount, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream-100/95 backdrop-blur-md border-b border-cream-300/60 shadow-cozy'
            : 'bg-cream-100/80 backdrop-blur-xs border-b border-cream-300/40'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4.5 sm:px-10">
          <Link
            to="/"
            className="font-display text-2xl font-semibold tracking-tightish text-espresso-900 transition-opacity hover:opacity-80"
          >
            NEXUS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-300 hover:text-terracotta-500 hover:scale-105 ${
                    isActive
                      ? 'text-terracotta-500 font-semibold border-b-2 border-terracotta-500 pb-0.5'
                      : 'text-espresso-700/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
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
            <Link
              to="/shop"
              className="hidden rounded-full bg-espresso-900 px-6 py-2.5 text-sm font-semibold text-cream-50 shadow-cozy transition-all duration-400 hover:bg-espresso-800 hover:shadow-cozy-hover hover:-translate-y-0.5 sm:inline-block"
            >
              Shop Collection
            </Link>
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

      {/* Mobile drawer menu */}
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
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-display text-xl font-semibold text-espresso-900"
            >
              NEXUS
            </Link>
            <button onClick={() => setMenuOpen(false)} className="rounded-full p-2 text-espresso-800 hover:bg-espresso-900/5">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-2 pt-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-cream-200 text-terracotta-500 font-semibold'
                      : 'text-espresso-800 hover:bg-cream-200/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className="mt-6 rounded-full bg-espresso-900 px-6 py-3.5 text-center text-sm font-semibold text-cream-50 shadow-cozy"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
