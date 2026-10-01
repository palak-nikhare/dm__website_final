import type { Product, ColorKey } from '@/data/products';
import { COLORS, PRODUCTS, imageForColor } from '@/data/products';

const COLOR_ORDER: ColorKey[] = ['black', 'charcoal', 'graphite', 'navy', 'olive', 'sand', 'cream', 'burgundy'];

function findProductForColor(color: ColorKey): Product | undefined {
  return PRODUCTS.find((p) => p.colors.includes(color));
}

export function ColorCollection({ onView }: { onView: (product: Product) => void }) {
  return (
    <section className="bg-cream-100/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">Earth & Modern Tones</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
            Find Your Color.
          </h2>
          <p className="mt-4 text-espresso-700/70 leading-relaxed">Considered shades curated to complement any wardrobe and aesthetic.</p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-7">
          {COLOR_ORDER.map((ck) => {
            const product = findProductForColor(ck);
            if (!product) return null;
            const img = imageForColor(product, ck);
            return (
              <button
                key={ck}
                onClick={() => onView(product)}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full overflow-hidden rounded-3xl border border-cream-300/60 bg-oat-50/90 shadow-cozy transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-cozy-hover">
                  <img
                    src={img}
                    alt={`${COLORS[ck].name} backpack`}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute right-3.5 top-3.5 h-6 w-6 rounded-full border-2 border-cream-100 shadow-md"
                    style={{ backgroundColor: COLORS[ck].hex }}
                  />
                </div>
                <p className="mt-3.5 text-sm font-semibold text-espresso-900 transition-colors group-hover:text-terracotta-500">
                  {COLORS[ck].name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
