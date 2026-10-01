import { useState } from 'react';
import type { Product } from '@/data/products';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

type FilterKey = 'all' | 'popular' | 'business' | 'commuter' | 'creator';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'popular', label: 'Popular' },
  { key: 'business', label: 'Business' },
  { key: 'commuter', label: 'Commuter' },
  { key: 'creator', label: 'Studio' },
];

const FILTER_MAP: Record<FilterKey, string[]> = {
  all: PRODUCTS.map((p) => p.id),
  popular: PRODUCTS.filter((p) => p.popular).map((p) => p.id),
  business: PRODUCTS.filter((p) => p.category === 'business').map((p) => p.id),
  commuter: PRODUCTS.filter((p) => p.category === 'commuter').map((p) => p.id),
  creator: PRODUCTS.filter((p) => p.category === 'creator').map((p) => p.id),
};

export function ShopSection({ onView }: { onView: (product: Product) => void }) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const filtered = PRODUCTS.filter((p) => FILTER_MAP[filter].includes(p.id));

  return (
    <section id="shop" className="scroll-mt-20 bg-cream-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-olive-500">The Collection</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tightish text-charcoal-900 sm:text-5xl">
            Find Your Everyday Carry
          </h2>
          <p className="mt-4 max-w-lg text-charcoal-800/60">
            Twelve distinct silhouettes, considered for the office, commute and creative workday.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-charcoal-900 text-cream-100'
                  : 'border border-charcoal-900/15 text-charcoal-800 hover:border-charcoal-900/30'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onView={onView} />
          ))}
        </div>
      </div>
    </section>
  );
}
