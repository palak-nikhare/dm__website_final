import { X, Heart, Eye } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { PRODUCTS, COLORS, imageForColor } from '@/data/products';
import type { Product } from '@/data/products';

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
  onView: (product: Product) => void;
}

export function WishlistDrawer({ open, onClose, onView }: WishlistDrawerProps) {
  const { wishlist, toggleWishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className={`fixed inset-0 z-[80] ${open ? 'visible' : 'invisible'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-espresso-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-oat-50 shadow-cozy-lg transition-transform duration-400 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-cream-300/60 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <Heart className="h-5 w-5 fill-terracotta-500 text-terracotta-500" />
            <h2 className="font-display text-xl font-medium text-espresso-900">
              Wishlist {items.length > 0 && `(${items.length})`}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-espresso-800 hover:bg-espresso-900/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-18 w-18 items-center justify-center rounded-full bg-cream-200/70 text-espresso-700/40">
              <Heart className="h-8 w-8 text-terracotta-500" />
            </div>
            <p className="mt-5 font-display text-xl font-medium text-espresso-900">No favorites yet</p>
            <p className="mt-2 text-sm text-espresso-700/60">Tap the heart on any backpack to save it here.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-4">
              {items.map((product) => (
                <div key={product.id} className="flex gap-4 rounded-3xl border border-cream-300/60 bg-cream-100/60 p-4 shadow-sm">
                  <img
                    src={imageForColor(product, product.defaultColor)}
                    alt={product.name}
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-espresso-900">{product.name}</p>
                        <p className="text-xs text-espresso-700/50 font-medium">{COLORS[product.defaultColor].name}</p>
                      </div>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="rounded-full p-1.5 text-terracotta-500 transition-colors hover:bg-terracotta-500/10"
                        aria-label="Remove from wishlist"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <p className="font-display text-sm font-semibold text-espresso-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                      <button
                        onClick={() => { onView(product); onClose(); }}
                        className="flex items-center gap-1.5 rounded-full bg-espresso-900 px-4 py-2 text-xs font-semibold text-cream-50 hover:bg-espresso-800 shadow-cozy"
                      >
                        <Eye className="h-3.5 w-3.5 text-terracotta-400" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
