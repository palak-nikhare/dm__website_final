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
        className={`absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-100 shadow-2xl transition-transform duration-400 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-charcoal-900/8 px-5 py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-burgundy" />
            <h2 className="font-display text-lg font-medium text-charcoal-900">
              Wishlist {items.length > 0 && `(${items.length})`}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-charcoal-800 hover:bg-charcoal-900/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-200">
              <Heart className="h-7 w-7 text-charcoal-800/40" />
            </div>
            <p className="mt-4 font-display text-lg text-charcoal-900">No favorites yet</p>
            <p className="mt-1 text-sm text-charcoal-800/50">Tap the heart on any backpack to save it here.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-4">
              {items.map((product) => (
                <div key={product.id} className="flex gap-4 rounded-2xl bg-cream-50 p-3">
                  <img
                    src={imageForColor(product, product.defaultColor)}
                    alt={product.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-charcoal-900">{product.name}</p>
                        <p className="text-xs text-charcoal-800/50">{COLORS[product.defaultColor].name}</p>
                      </div>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="rounded-full p-1.5 text-burgundy transition-colors hover:bg-burgundy/10"
                        aria-label="Remove from wishlist"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <p className="font-display text-sm font-semibold text-charcoal-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                      <button
                        onClick={() => { onView(product); onClose(); }}
                        className="flex items-center gap-1.5 rounded-full bg-charcoal-900 px-4 py-2 text-xs font-medium text-cream-100 hover:bg-charcoal-800"
                      >
                        <Eye className="h-3.5 w-3.5" />
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
