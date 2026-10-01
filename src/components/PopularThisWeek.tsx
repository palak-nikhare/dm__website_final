import type { Product } from '@/data/products';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export function PopularThisWeek({ onView }: { onView: (product: Product) => void }) {
  const popular = PRODUCTS.filter((p) => p.popular);

  return (
    <section className="bg-cream-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-olive-500">Trending</p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tightish text-charcoal-900 sm:text-4xl">
              Popular This Week
            </h2>
          </div>
          <span className="hidden text-sm text-charcoal-800/50 sm:block">Most wishlisted right now</span>
        </div>

        <div className="mt-10 flex gap-6 overflow-x-auto pb-4 no-scrollbar lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
          {popular.map((product) => (
            <div key={product.id} className="w-72 shrink-0 lg:w-auto">
              <ProductCard product={product} onView={onView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
