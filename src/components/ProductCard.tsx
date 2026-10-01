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
  const isNew = Boolean(product.isNewProduct);
  const bgClass = isNew ? 'bg-oat-100/90' : 'bg-oat-50';

  return (
    <article className="group relative flex flex-col rounded-3xl border border-cream-300/60 bg-oat-50/80 p-4 shadow-cozy transition-all duration-500 hover:-translate-y-2 hover:shadow-cozy-hover hover:border-cream-300">
      <div className={`relative aspect-square w-full overflow-hidden rounded-2xl ${bgClass} transition-colors duration-500`}>
        <img
          src={mainImage}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-contain p-3 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-0"
          loading="lazy"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        />
        <img
          src={hoverImage}
          alt={`${product.name} alternate view`}
          className="absolute inset-0 h-full w-full object-contain p-3 opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
          loading="lazy"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        />

        {product.badge && (
          <span className="absolute left-3.5 top-3.5 rounded-full bg-espresso-900/90 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream-50 backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${
            wished ? 'bg-terracotta-500 text-cream-50 shadow-md' : 'bg-oat-50/80 text-espresso-900 hover:bg-oat-100 hover:scale-105'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`h-4 w-4 ${wished ? 'fill-cream-50' : ''}`} />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-3 opacity-100 transition-all duration-500 sm:translate-y-full sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            onClick={() => onView(product)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso-900/90 py-3 text-xs font-semibold text-cream-50 shadow-cozy-md backdrop-blur-md transition-all hover:bg-espresso-800 hover:shadow-cozy-hover"
          >
            <Eye className="h-4 w-4 text-terracotta-400" />
            Quick View
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col px-1">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-600">{product.category}</p>
          <span className="text-xs text-espresso-600/60 font-medium">{defaultColor.name}</span>
        </div>
        
        <h3 className="mt-1 font-display text-xl font-medium text-espresso-900 tracking-tightish">{product.name}</h3>
        
        <div className="mt-2 flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-xs text-espresso-700/60">{product.rating} · {product.reviews} reviews</span>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-espresso-700/70 line-clamp-2">{product.tagline}</p>

        <div className="mt-3 flex items-center gap-1.5">
          {product.colors.map((ck) => (
            <span
              key={ck}
              className="h-3.5 w-3.5 rounded-full border border-espresso-900/15 shadow-sm transition-transform hover:scale-125"
              style={{ backgroundColor: COLORS[ck].hex }}
              title={COLORS[ck].name}
            />
          ))}
          <span className="ml-1 text-[11px] text-espresso-600/50">{product.colors.length} shades</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-cream-200/60">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold text-espresso-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-espresso-600/40 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <button
            onClick={() => onView(product)}
            className="rounded-full bg-cream-200/70 px-3.5 py-1.5 text-xs font-semibold text-espresso-900 hover:bg-espresso-900 hover:text-cream-50 transition-colors"
          >
            Explore
          </button>
        </div>
      </div>
    </article>
  );
}
