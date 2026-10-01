import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Filter,
  X,
  Search,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { Product, ColorKey } from '@/data/products';
import { PRODUCTS, COLORS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

type CategoryKey = 'all' | 'popular' | 'business' | 'commuter' | 'creator';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'all', label: 'All Backpacks' },
  { key: 'popular', label: 'Popular' },
  { key: 'business', label: 'Business' },
  { key: 'commuter', label: 'Commuter' },
  { key: 'creator', label: 'Studio' },
];

const PRICE_RANGES = [
  { id: 'under-4000', label: 'Under ₹4,000', min: 0, max: 4000 },
  { id: '4000-5000', label: '₹4,000 - ₹5,000', min: 4000, max: 5000 },
  { id: '5000-6000', label: '₹5,000 - ₹6,000', min: 5000, max: 6000 },
  { id: 'over-6000', label: 'Over ₹6,000', min: 6000, max: Infinity },
];

const LAPTOP_SIZES = [
  { id: '15.6-inch', label: '15.6-inch', minH: 44, maxH: 46 },
  { id: '17-inch', label: '17-inch', minH: 47, maxH: 99 },
];

const SMART_FEATURES = [
  {
    id: 'usb',
    label: 'USB Port',
    check: (p: Product) =>
      p.features.some((f) => /usb|charg|power-bank/i.test(f)) ||
      /usb|charging|power-bank/i.test(p.longDescription),
  },
  {
    id: 'water',
    label: 'Water Repellent',
    check: (p: Product) =>
      /water|hydrophobic|weather/i.test(p.material) ||
      p.features.some((f) => /water|weather/i.test(f)),
  },
  {
    id: 'anti-theft',
    label: 'Anti-Theft',
    check: (p: Product) =>
      p.features.some((f) => /anti-theft|lock|hidden/i.test(f)) ||
      /lock|hidden/i.test(p.description),
  },
  {
    id: 'rfid',
    label: 'RFID Pocket',
    check: (p: Product) =>
      p.features.some((f) => /rfid/i.test(f)) || /rfid/i.test(p.longDescription),
  },
];

const ITEMS_PER_PAGE = 9;

const ALL_COLORS: ColorKey[] = Array.from(
  new Set(PRODUCTS.flatMap((p) => p.colors))
) as ColorKey[];

export function ShopSection({ onView }: { onView: (product: Product) => void }) {
  const [category, setCategory] = useState<CategoryKey>('all');
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<ColorKey[]>([]);
  const [selectedLaptopSizes, setSelectedLaptopSizes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const gridTopRef = useRef<HTMLDivElement>(null);

  // Collapsible section state for sidebar
  const [openSections, setOpenSections] = useState({
    price: true,
    color: true,
    laptop: true,
    features: true,
  });

  // Reset to page 1 whenever search, filters, category or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    category,
    selectedPrices,
    selectedColors,
    selectedLaptopSizes,
    selectedFeatures,
    searchQuery,
    sortBy,
  ]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const togglePrice = (id: string) => {
    setSelectedPrices((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleColor = (c: ColorKey) => {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const toggleLaptopSize = (id: string) => {
    setSelectedLaptopSizes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetAllFilters = () => {
    setCategory('all');
    setSelectedPrices([]);
    setSelectedColors([]);
    setSelectedLaptopSizes([]);
    setSelectedFeatures([]);
    setSearchQuery('');
    setSortBy('featured');
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (category !== 'all') count++;
    count += selectedPrices.length;
    count += selectedColors.length;
    count += selectedLaptopSizes.length;
    count += selectedFeatures.length;
    if (searchQuery.trim()) count++;
    return count;
  }, [
    category,
    selectedPrices,
    selectedColors,
    selectedLaptopSizes,
    selectedFeatures,
    searchQuery,
  ]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category
      if (category === 'popular' && !product.popular) return false;
      if (
        category !== 'all' &&
        category !== 'popular' &&
        product.category !== category
      ) {
        return false;
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesTagline && !matchesDesc) return false;
      }

      // 3. Price Ranges (OR logic among selected ranges)
      if (selectedPrices.length > 0) {
        const matchesPrice = selectedPrices.some((rangeId) => {
          const range = PRICE_RANGES.find((r) => r.id === rangeId);
          if (!range) return false;
          return product.price >= range.min && product.price <= range.max;
        });
        if (!matchesPrice) return false;
      }

      // 4. Colors (OR logic among selected colors)
      if (selectedColors.length > 0) {
        const matchesColor = selectedColors.some((c) =>
          product.colors.includes(c)
        );
        if (!matchesColor) return false;
      }

      // 5. Laptop Size (OR logic among selected sizes)
      if (selectedLaptopSizes.length > 0) {
        const matchesSize = selectedLaptopSizes.some((sizeId) => {
          const size = LAPTOP_SIZES.find((s) => s.id === sizeId);
          if (!size) return false;
          return (
            product.dimensions.height >= size.minH &&
            product.dimensions.height <= size.maxH
          );
        });
        if (!matchesSize) return false;
      }

      // 6. Smart Features (AND logic - must have all selected features)
      if (selectedFeatures.length > 0) {
        const hasAllFeatures = selectedFeatures.every((featId) => {
          const feat = SMART_FEATURES.find((sf) => sf.id === featId);
          return feat ? feat.check(product) : false;
        });
        if (!hasAllFeatures) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [
    category,
    searchQuery,
    selectedPrices,
    selectedColors,
    selectedLaptopSizes,
    selectedFeatures,
    sortBy,
  ]);

  // Pagination Calculations
  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  }, [filteredProducts]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sidebar / Drawer Filter Content
  const renderFilterControls = () => (
    <div className="space-y-6">
      {/* Category Selection */}
      <div>
        <h4 className="text-[11px] font-semibold uppercase tracking-widest text-espresso-700/60 mb-3">
          Category
        </h4>
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                category === cat.key
                  ? 'bg-espresso-900 text-cream-50 shadow-cozy'
                  : 'text-espresso-800/80 hover:bg-cream-200/60'
              }`}
            >
              <span>{cat.label}</span>
              {category === cat.key && <Check className="h-4 w-4 text-terracotta-400" />}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-cream-300/60 pt-5" />

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex w-full items-center justify-between text-left text-[11px] font-semibold uppercase tracking-widest text-espresso-700/60"
        >
          <span>Price Range</span>
          {openSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.price && (
          <div className="mt-3 space-y-2.5">
            {PRICE_RANGES.map((range) => {
              const checked = selectedPrices.includes(range.id);
              return (
                <label
                  key={range.id}
                  className="flex items-center gap-3 cursor-pointer text-sm text-espresso-800/80 hover:text-espresso-900"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => togglePrice(range.id)}
                    className="h-4 w-4 rounded-md border-cream-300 text-espresso-900 focus:ring-espresso-900/20"
                  />
                  <span>{range.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-cream-300/60 pt-5" />

      {/* Color Swatches */}
      <div>
        <button
          onClick={() => toggleSection('color')}
          className="flex w-full items-center justify-between text-left text-[11px] font-semibold uppercase tracking-widest text-espresso-700/60"
        >
          <span>Color</span>
          {openSections.color ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.color && (
          <div className="mt-3 grid grid-cols-5 gap-2">
            {ALL_COLORS.map((c) => {
              const selected = selectedColors.includes(c);
              return (
                <button
                  key={c}
                  onClick={() => toggleColor(c)}
                  className={`group relative flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                    selected
                      ? 'border-espresso-900 scale-110 shadow-cozy'
                      : 'border-espresso-900/15 hover:border-espresso-900/40'
                  }`}
                  style={{ backgroundColor: COLORS[c].hex }}
                  title={COLORS[c].name}
                  aria-label={COLORS[c].name}
                >
                  {selected && (
                    <Check
                      className={`h-3.5 w-3.5 ${
                        c === 'cream' || c === 'sand'
                          ? 'text-espresso-900'
                          : 'text-cream-50'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-cream-300/60 pt-5" />

      {/* Laptop Size */}
      <div>
        <button
          onClick={() => toggleSection('laptop')}
          className="flex w-full items-center justify-between text-left text-[11px] font-semibold uppercase tracking-widest text-espresso-700/60"
        >
          <span>Laptop Fit</span>
          {openSections.laptop ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.laptop && (
          <div className="mt-3 flex flex-wrap gap-2">
            {LAPTOP_SIZES.map((size) => {
              const selected = selectedLaptopSizes.includes(size.id);
              return (
                <button
                  key={size.id}
                  onClick={() => toggleLaptopSize(size.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    selected
                      ? 'bg-espresso-900 text-cream-50 shadow-cozy'
                      : 'border border-cream-300 text-espresso-800 hover:border-espresso-900/30'
                  }`}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-cream-300/60 pt-5" />

      {/* Smart Features */}
      <div>
        <button
          onClick={() => toggleSection('features')}
          className="flex w-full items-center justify-between text-left text-[11px] font-semibold uppercase tracking-widest text-espresso-700/60"
        >
          <span>Smart Features</span>
          {openSections.features ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.features && (
          <div className="mt-3 space-y-2.5">
            {SMART_FEATURES.map((feat) => {
              const checked = selectedFeatures.includes(feat.id);
              return (
                <label
                  key={feat.id}
                  className="flex items-center gap-3 cursor-pointer text-sm text-espresso-800/80 hover:text-espresso-900"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleFeature(feat.id)}
                    className="h-4 w-4 rounded-md border-cream-300 text-espresso-900 focus:ring-espresso-900/20"
                  />
                  <span>{feat.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="shop" className="scroll-mt-20 bg-cream-100/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">
            The Collection
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
            Find Your Everyday Carry
          </h2>
          <p className="mt-4 max-w-lg text-espresso-700/70 leading-relaxed">
            Sixteen distinct silhouettes, thoughtfully designed for the office, commute, studio, and travel.
          </p>
        </div>

        {/* Toolbar: Search, Mobile Filter Button, Sort */}
        <div className="mt-12 flex flex-col gap-4 border-b border-cream-300/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso-700/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search backpacks..."
                className="w-full rounded-full border border-cream-300 bg-oat-50 pl-10 pr-9 py-2.5 text-sm text-espresso-900 placeholder-espresso-700/40 focus:border-espresso-900 focus:outline-none shadow-cozy"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso-700/50 hover:text-espresso-900"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 rounded-full border border-cream-300 bg-oat-50 px-4.5 py-2.5 text-sm font-semibold text-espresso-900 transition-all hover:bg-cream-200 lg:hidden shadow-cozy"
            >
              <Filter className="h-4 w-4 text-terracotta-500" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-espresso-900 px-1 text-[11px] font-semibold text-cream-50">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="text-xs font-medium text-espresso-700/60">
              Showing{' '}
              <strong className="text-espresso-900">
                {filteredProducts.length > 0
                  ? (currentPage - 1) * ITEMS_PER_PAGE + 1
                  : 0}
                -
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredProducts.length
                )}
              </strong>{' '}
              of {filteredProducts.length}
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-espresso-700/50" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-full border border-cream-300 bg-oat-50 px-4 py-2 text-xs font-semibold text-espresso-900 focus:border-espresso-900 focus:outline-none shadow-cozy"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {activeFilterCount > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2 rounded-3xl bg-oat-50/80 p-4 border border-cream-300/60 shadow-cozy">
            <span className="text-xs font-semibold text-espresso-700/60 mr-1">
              Active Filters:
            </span>
            {category !== 'all' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-espresso-900 px-3.5 py-1 text-xs font-medium text-cream-50">
                {CATEGORIES.find((c) => c.key === category)?.label}
                <button onClick={() => setCategory('all')}>
                  <X className="h-3 w-3 text-terracotta-400" />
                </button>
              </span>
            )}
            {selectedPrices.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full bg-cream-200/80 px-3.5 py-1 text-xs font-medium text-espresso-900"
              >
                {PRICE_RANGES.find((r) => r.id === id)?.label}
                <button onClick={() => togglePrice(id)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {selectedColors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full bg-cream-200/80 px-3.5 py-1 text-xs font-medium text-espresso-900"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full border border-espresso-900/20"
                  style={{ backgroundColor: COLORS[c].hex }}
                />
                {COLORS[c].name}
                <button onClick={() => toggleColor(c)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {selectedLaptopSizes.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full bg-cream-200/80 px-3.5 py-1 text-xs font-medium text-espresso-900"
              >
                {LAPTOP_SIZES.find((s) => s.id === id)?.label}
                <button onClick={() => toggleLaptopSize(id)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {selectedFeatures.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full bg-cream-200/80 px-3.5 py-1 text-xs font-medium text-espresso-900"
              >
                {SMART_FEATURES.find((f) => f.id === id)?.label}
                <button onClick={() => toggleFeature(id)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}

            <button
              onClick={resetAllFilters}
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta-500 hover:underline"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All
            </button>
          </div>
        )}

        {/* Main Catalog Layout (Sidebar + Product Grid) */}
        <div ref={gridTopRef} className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] scroll-mt-28">
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-cream-300/70 bg-oat-50/90 p-6 shadow-cozy">
              <div className="flex items-center justify-between pb-4 border-b border-cream-300/60">
                <div className="flex items-center gap-2 font-display text-base font-medium text-espresso-900">
                  <Filter className="h-4 w-4 text-terracotta-500" />
                  <span>Filters</span>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-xs font-semibold text-terracotta-500 hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="mt-5">{renderFilterControls()}</div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div>
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-cream-300 bg-oat-50 p-14 text-center shadow-cozy">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-200/80 text-espresso-700/40">
                  <Filter className="h-7 w-7 text-terracotta-500" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium text-espresso-900">
                  No matching backpacks
                </h3>
                <p className="mt-2 max-w-sm text-sm text-espresso-700/70 leading-relaxed">
                  We couldn't find any backpacks matching your selected filters. Try clearing some criteria.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-espresso-900 px-7 py-3 text-sm font-semibold text-cream-50 shadow-cozy hover:bg-espresso-800 transition-all"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onView={onView} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-300/60 pt-9 sm:flex-row">
                    <div className="text-xs font-medium text-espresso-700/70">
                      Page <span className="font-semibold text-espresso-900">{currentPage}</span> of{' '}
                      <span className="font-semibold text-espresso-900">{totalPages}</span> ({filteredProducts.length} items)
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1.5 rounded-full border border-cream-300 bg-oat-50 px-4 py-2 text-xs font-semibold text-espresso-900 transition-all hover:border-espresso-900/40 hover:bg-cream-200/80 shadow-cozy disabled:pointer-events-none disabled:opacity-40"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous</span>
                      </button>

                      <div className="flex items-center gap-1 px-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                          const isActive = pageNum === currentPage;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                                isActive
                                  ? 'bg-espresso-900 text-cream-50 shadow-cozy'
                                  : 'border border-transparent text-espresso-800 hover:border-cream-300 hover:bg-cream-200/50'
                              }`}
                              aria-label={`Page ${pageNum}`}
                              aria-current={isActive ? 'page' : undefined}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1.5 rounded-full border border-cream-300 bg-oat-50 px-4 py-2 text-xs font-semibold text-espresso-900 transition-all hover:border-espresso-900/40 hover:bg-cream-200/80 shadow-cozy disabled:pointer-events-none disabled:opacity-40"
                        aria-label="Next page"
                      >
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={`fixed inset-0 z-[80] lg:hidden ${
          mobileFilterOpen ? 'visible' : 'invisible'
        }`}
        aria-hidden={!mobileFilterOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileFilterOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileFilterOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 flex h-full w-full max-w-xs flex-col bg-cream-100 shadow-2xl transition-transform duration-300 ${
            mobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-charcoal-900/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-olive-500" />
              <h3 className="font-display text-lg font-medium text-charcoal-900">
                Filter Catalog
              </h3>
            </div>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="rounded-full p-2 text-charcoal-800 hover:bg-charcoal-900/5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            {renderFilterControls()}
          </div>

          <div className="flex items-center gap-3 border-t border-charcoal-900/10 px-5 py-4">
            <button
              onClick={resetAllFilters}
              className="flex-1 rounded-full border border-charcoal-900/20 py-2.5 text-xs font-medium text-charcoal-900 hover:bg-cream-200"
            >
              Reset All
            </button>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="flex-1 rounded-full bg-charcoal-900 py-2.5 text-xs font-medium text-cream-100 hover:bg-charcoal-800"
            >
              Apply ({filteredProducts.length})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

