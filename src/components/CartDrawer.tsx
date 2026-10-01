import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartSubtotal } = useStore();

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
            <ShoppingBag className="h-5 w-5 text-charcoal-900" />
            <h2 className="font-display text-lg font-medium text-charcoal-900">
              Your Cart {cart.length > 0 && `(${cart.length})`}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-charcoal-800 hover:bg-charcoal-900/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-200">
              <ShoppingBag className="h-7 w-7 text-charcoal-800/40" />
            </div>
            <p className="mt-4 font-display text-lg text-charcoal-900">Your cart is empty</p>
            <p className="mt-1 text-sm text-charcoal-800/50">Browse the collection and find your everyday carry.</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-charcoal-900 px-6 py-3 text-sm font-medium text-cream-100 hover:bg-charcoal-800"
            >
              Shop Backpacks
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-2xl bg-cream-50 p-3">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-charcoal-900">{item.productName}</p>
                          <p className="text-xs text-charcoal-800/50">{item.colorName}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-full p-1.5 text-charcoal-800/40 transition-colors hover:bg-burgundy/10 hover:text-burgundy"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-charcoal-900/12">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal-800 hover:bg-charcoal-900/5"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-medium text-charcoal-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal-800 hover:bg-charcoal-900/5"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-display text-sm font-semibold text-charcoal-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-charcoal-900/8 px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal-800/60">Subtotal</span>
                <span className="font-display text-xl font-semibold text-charcoal-900">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="mt-1 text-xs text-charcoal-800/40">Shipping and taxes calculated at checkout.</p>
              <button
                onClick={onCheckout}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-charcoal-900 py-3.5 text-sm font-medium text-cream-100 transition-all hover:bg-charcoal-800 hover:shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
