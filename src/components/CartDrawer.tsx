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
            <ShoppingBag className="h-5 w-5 text-espresso-900" />
            <h2 className="font-display text-xl font-medium text-espresso-900">
              Your Cart {cart.length > 0 && `(${cart.length})`}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-espresso-800 hover:bg-espresso-900/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-18 w-18 items-center justify-center rounded-full bg-cream-200/70 text-espresso-700/40">
              <ShoppingBag className="h-8 w-8 text-terracotta-500" />
            </div>
            <p className="mt-5 font-display text-xl font-medium text-espresso-900">Your cart is empty</p>
            <p className="mt-2 text-sm text-espresso-700/60">Browse the collection and find your everyday carry.</p>
            <button
              onClick={onClose}
              className="mt-7 rounded-full bg-espresso-900 px-7 py-3.5 text-sm font-semibold text-cream-50 hover:bg-espresso-800 shadow-cozy"
            >
              Explore Backpacks
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-3xl border border-cream-300/60 bg-cream-100/60 p-4 shadow-sm">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-espresso-900">{item.productName}</p>
                          <p className="text-xs text-espresso-700/50 font-medium">{item.colorName}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-full p-1.5 text-espresso-700/40 transition-colors hover:bg-terracotta-500/10 hover:text-terracotta-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-cream-300 bg-oat-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-espresso-800 hover:bg-espresso-900/5"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-espresso-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-espresso-800 hover:bg-espresso-900/5"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-display text-sm font-semibold text-espresso-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-cream-300/60 bg-cream-100/50 px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-espresso-700/70">Subtotal</span>
                <span className="font-display text-xl font-semibold text-espresso-900">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="mt-1 text-xs text-espresso-700/50">Shipping and taxes calculated at checkout.</p>
              <button
                onClick={onCheckout}
                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-espresso-900 py-4 text-sm font-semibold text-cream-50 transition-all duration-400 hover:bg-espresso-800 hover:shadow-cozy-hover hover:-translate-y-0.5"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-terracotta-400" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
