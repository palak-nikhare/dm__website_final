import type { Product } from '@/data/products';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export function PopularThisWeek({ onView }: { onView: (product: Product) => void }) {
  const popular = PRODUCTS.filter((p) => p.popular);

  return (
    <section className="bg-cream-100/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex items-end justify-between border-b border-cream-300/60 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">Trending Now</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tightish text-espresso-900 sm:text-4xl">
              Popular This Week
            </h2>
          </div>
          <span className="hidden text-sm text-espresso-700/60 font-medium sm:block">Most wishlisted by our community</span>
        </div>

        <div className="mt-12 flex gap-8 overflow-x-auto pb-4 no-scrollbar lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible">
          {popular.map((product) => (
            <div key={product.id} className="w-76 shrink-0 lg:w-auto">
              <ProductCard product={product} onView={onView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
