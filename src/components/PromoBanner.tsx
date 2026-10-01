import { ArrowRight } from 'lucide-react';
import { LIFESTYLE_IMAGES } from '@/data/products';

export function PromoBanner({ onShopClick }: { onShopClick: () => void }) {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={LIFESTYLE_IMAGES.campus}
            alt="NEXUS Studio backpack"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/85 via-charcoal-900/60 to-charcoal-900/30" />
          <div className="relative p-8 sm:p-14 lg:p-20">
            <p className="text-sm font-medium uppercase tracking-wider text-olive-300">Launch Offer</p>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight tracking-tightish text-cream-100 sm:text-4xl lg:text-5xl">
              Your everyday carry, upgraded.
            </h2>
            <p className="mt-4 text-lg text-cream-100/80">
              Launch Collection — Starting at ₹4,499
            </p>
            <button
              onClick={onShopClick}
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-cream-100 px-7 py-3.5 text-sm font-medium text-charcoal-900 transition-all hover:bg-cream-50 hover:shadow-xl"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
