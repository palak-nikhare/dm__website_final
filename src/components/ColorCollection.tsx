import type { Product, ColorKey } from '@/data/products';
import { COLORS, PRODUCTS, imageForColor } from '@/data/products';

const COLOR_ORDER: ColorKey[] = ['black', 'charcoal', 'graphite', 'navy', 'olive', 'sand', 'cream', 'burgundy'];

function findProductForColor(color: ColorKey): Product | undefined {
  return PRODUCTS.find((p) => p.colors.includes(color));
}

export function ColorCollection({ onView }: { onView: (product: Product) => void }) {
  return (
    <section className="bg-cream-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-olive-500">Colors</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tightish text-charcoal-900 sm:text-5xl">
            Find Your Color.
          </h2>
          <p className="mt-4 text-charcoal-800/60">Seven tones, one for every personality and every outfit.</p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
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
                <div className="relative w-full overflow-hidden rounded-2xl bg-cream-200">
                  <img
                    src={img}
                    alt={`${COLORS[ck].name} backpack`}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute right-3 top-3 h-6 w-6 rounded-full border-2 border-cream-100 shadow-sm"
                    style={{ backgroundColor: COLORS[ck].hex }}
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-charcoal-900 transition-colors group-hover:text-olive-500">
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
