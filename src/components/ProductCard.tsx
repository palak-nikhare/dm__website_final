import { Heart, Eye } from 'lucide-react';
import type { Product } from '@/data/products';
import { COLORS, imageForColor } from '@/data/products';
import { useStore } from '@/store/StoreContext';
import { Stars } from '@/components/Stars';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
}

export function ProductCard({ product, onView }: ProductCardProps) {
  const { toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  const defaultColor = COLORS[product.defaultColor];
  const mainImage = imageForColor(product, product.defaultColor);
  const hoverImage = product.images[1] ?? mainImage;

  return (
    <article className="group flex flex-col border-b border-charcoal-900/10 pb-7">
      <div className="relative overflow-hidden bg-[#ede9e1] shadow-[0_1px_0_rgba(43,40,38,0.08)]">
        <div className="relative aspect-square">
          <img
            src={mainImage}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain p-2 transition-all duration-700 group-hover:scale-[1.025] group-hover:opacity-0"
            loading="lazy"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          />
          <img
            src={hoverImage}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 h-full w-full object-contain p-2 opacity-0 transition-all duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
            loading="lazy"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-charcoal-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream-100">
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all ${
            wished ? 'bg-burgundy text-cream-100' : 'bg-cream-100/80 text-charcoal-800 hover:bg-cream-100'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`h-4 w-4 ${wished ? 'fill-cream-100' : ''}`} />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-3 opacity-100 transition-all duration-500 sm:translate-y-full sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            onClick={() => onView(product)}
            className="flex w-full items-center justify-center gap-2 bg-cream-100/95 py-3 text-sm font-medium text-charcoal-900 shadow-sm backdrop-blur-sm transition-colors hover:bg-cream-100"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-500">{product.category}</p>
        <h3 className="mt-1 font-display text-xl font-medium text-charcoal-900">{product.name}</h3>
        <div className="mt-2 flex items-center gap-1.5"><Stars rating={product.rating} /><span className="text-xs text-charcoal-800/50">{product.rating} · {product.reviews} reviews</span></div>
        <p className="mt-1 text-sm leading-relaxed text-charcoal-800/60">{product.tagline}</p>
        <p className="mt-2 text-xs leading-relaxed text-charcoal-800/50">{product.description}</p>

        <div className="mt-3 flex items-center gap-1.5">
          {product.colors.map((ck) => (
            <span
              key={ck}
              className="h-4 w-4 rounded-full border border-charcoal-900/15"
              style={{ backgroundColor: COLORS[ck].hex }}
              title={COLORS[ck].name}
            />
          ))}
          <span className="ml-1 text-xs text-charcoal-800/50">{product.colors.length} colors</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold text-charcoal-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-charcoal-800/40 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-xs text-charcoal-800/50">{defaultColor.name}</span>
        </div>
      </div>
    </article>
  );
}
