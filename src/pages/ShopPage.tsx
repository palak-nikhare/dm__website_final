import { ShopSection } from '@/components/ShopSection';
import { PopularThisWeek } from '@/components/PopularThisWeek';
import type { Product } from '@/data/products';

interface ShopPageProps {
  onView: (product: Product) => void;
}

export function ShopPage({ onView }: ShopPageProps) {
  return (
    <div className="pt-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 mb-6">
        <span className="inline-block rounded-full bg-sage-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sage-600 border border-sage-200/50 shadow-cozy">
          Full Catalog
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
          Explore All Backpacks
        </h1>
        <p className="mt-2 text-base text-espresso-700/70 max-w-2xl">
          Filter by price range, color swatches, laptop compatibility, and smart features to find your ideal daily carry.
        </p>
      </div>

      <ShopSection onView={onView} />
      <div className="py-12 border-t border-cream-300/60">
        <PopularThisWeek onView={onView} />
      </div>
    </div>
  );
}
