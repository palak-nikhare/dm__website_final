import { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, Search, Sparkles } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { PRODUCTS, COLORS, type Product } from '@/data/products';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Features', path: '/features' },
  { label: 'Technology', path: '/technology' },
  { label: 'Warranty', path: '/warranty' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Help', path: '/help' },
];

interface NavbarProps {
  onCartClick: () => void;
  onWishlistClick: () => void;
  onViewProduct: (product: Product) => void;
}

export function Navbar({ onCartClick, onWishlistClick, onViewProduct }: NavbarProps) {
  const { cartCount, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close search dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filter products based on search query (name, description, features, material, and colors)
  const searchResults = searchQuery.trim() === '' ? [] : PRODUCTS.filter((product) => {
    const query = searchQuery.trim().toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(query);
    const descMatch = product.description.toLowerCase().includes(query) || product.longDescription.toLowerCase().includes(query);
    const featureMatch = product.features.some((f) => f.toLowerCase().includes(query));
    const materialMatch = product.material.toLowerCase().includes(query);
    const colorMatch = product.colors.some((colorKey) => {
      const colorName = COLORS[colorKey]?.name.toLowerCase() || '';
      return colorKey.toLowerCase().includes(query) || colorName.includes(query);
    });
    return nameMatch || descMatch || featureMatch || materialMatch || colorMatch;
  });

  const handleSelectProduct = (product: Product) => {
    onViewProduct(product);
    setSearchQuery('');
    setIsSearchOpen(false);
    setMenuOpen(false);
  };

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
            className="font-display text-2xl font-semibold tracking-tightish text-espresso-900 transition-opacity hover:opacity-80 shrink-0"
          >
            NEXUS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 lg:flex">
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

          {/* Search Bar & Actions */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Minimalist Search Bar Container */}
            <div className="relative" ref={searchRef}>
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso-700/50 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  placeholder="Search backpacks..."
                  className="w-36 rounded-full border border-cream-300/80 bg-oat-50/90 py-2 pl-9 pr-8 text-xs font-medium text-espresso-900 placeholder:text-espresso-700/40 focus:border-espresso-900/50 focus:bg-oat-50 focus:outline-none shadow-cozy transition-all duration-300 sm:w-48 sm:focus:w-60 lg:w-52 lg:focus:w-64"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-espresso-700/50 hover:bg-cream-200/60 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Live Search Results Dropdown Overlay */}
              {isSearchOpen && searchQuery.trim() !== '' && (
                <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 overflow-hidden rounded-3xl border border-cream-300/80 bg-oat-50/98 p-3.5 shadow-cozy-lg backdrop-blur-md z-50 nova-scale-in">
                  <div className="flex items-center justify-between border-b border-cream-300/60 px-3 pb-2.5 pt-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-espresso-700/60">
                      Search Results ({searchResults.length})
                    </span>
                    <span className="text-[10px] text-espresso-700/40 font-medium">Press ESC to close</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="mt-2.5 max-h-80 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product)}
                          className="group flex items-center justify-between gap-3 rounded-2xl p-2.5 transition-colors duration-200 hover:bg-cream-200/70 cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-12 w-12 shrink-0 rounded-xl border border-cream-300/50 bg-cream-100/90 object-contain p-1 shadow-sm transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="min-w-0">
                              <p className="font-display text-xs font-semibold text-espresso-900 group-hover:text-terracotta-500 transition-colors truncate">
                                {product.name}
                              </p>
                              <p className="text-[10px] text-espresso-700/60 truncate mt-0.5">
                                {product.tagline}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end shrink-0">
                            <span className="text-xs font-semibold text-espresso-900">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.badge && (
                              <span className="mt-1 rounded-full bg-sage-100/80 px-2 py-0.5 text-[9px] font-semibold text-sage-600 border border-sage-200/50">
                                {product.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center px-4">
                      <Sparkles className="mx-auto h-6 w-6 text-espresso-700/30" />
                      <p className="mt-2 text-xs font-semibold text-espresso-900">No products found</p>
                      <p className="mt-1 text-[11px] text-espresso-700/60">
                        Try searching for "laptop", "TSA lock", "corduroy", or "water repellent".
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

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

          {/* Mobile Search input inside drawer */}
          <div className="mt-5">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso-700/50 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search backpacks..."
                className="w-full rounded-2xl border border-cream-300 bg-cream-100/60 py-2.5 pl-9 pr-8 text-xs text-espresso-900 placeholder:text-espresso-700/40 focus:border-espresso-900 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-espresso-700/50"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {searchQuery.trim() !== '' && (
              <div className="mt-3 max-h-60 overflow-y-auto space-y-1 rounded-2xl border border-cream-300/60 bg-cream-100/50 p-2">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center gap-3 rounded-xl p-2 hover:bg-cream-200/80 cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-10 w-10 shrink-0 rounded-lg bg-white object-contain p-1 border border-cream-300/40"
                      />
                      <div className="min-w-0">
                        <p className="font-display text-xs font-semibold text-espresso-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-espresso-700/60 font-semibold">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-3 text-center text-xs text-espresso-700/60">No products found</p>
                )}
              </div>
            )}
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
