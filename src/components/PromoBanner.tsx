import { ArrowRight } from 'lucide-react';
import { LIFESTYLE_IMAGES } from '@/data/products';

export function PromoBanner({ onShopClick }: { onShopClick: () => void }) {
  return (
    <section className="bg-cream-100/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-cream-300/60 shadow-cozy-lg">
          <img
            src={LIFESTYLE_IMAGES.campus}
            alt="NEXUS Studio backpack"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso-900/90 via-espresso-900/65 to-espresso-900/35" />
          <div className="relative p-10 sm:p-16 lg:p-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-terracotta-400">Launch Offer</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight tracking-tightish text-cream-50 sm:text-5xl lg:text-6xl">
              Your everyday carry, upgraded.
            </h2>
            <p className="mt-4 text-lg text-cream-100/85">
              Launch Collection — Starting at ₹4,499
            </p>
            <button
              onClick={onShopClick}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-cream-50 px-8 py-4 text-sm font-semibold text-espresso-900 shadow-cozy transition-all duration-400 hover:bg-oat-50 hover:shadow-cozy-hover hover:-translate-y-1"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-terracotta-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
