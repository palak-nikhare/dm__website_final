import { useState, useEffect } from 'react';
import { X, Check, CreditCard, Banknote, Truck } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

interface CheckoutProps {
  open: boolean;
  onClose: () => void;
}

export function Checkout({ open, onClose }: CheckoutProps) {
  const { cartSubtotal, clearCart } = useStore();
  const [placed, setPlaced] = useState(false);
  const [payment, setPayment] = useState('card');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setPlaced(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const shipping = cartSubtotal > 0 ? 0 : 0;
  const total = cartSubtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex min-h-full items-start justify-center">
        <div className="my-0 w-full max-w-2xl bg-cream-100 sm:my-8 sm:rounded-3xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-charcoal-900/8 bg-cream-100/95 px-5 py-4 backdrop-blur-md sm:rounded-t-3xl sm:px-8">
            <h2 className="font-display text-xl font-medium text-charcoal-900">Checkout</h2>
            <button onClick={onClose} className="rounded-full p-2 text-charcoal-800 hover:bg-charcoal-900/5">
              <X className="h-5 w-5" />
            </button>
          </div>

          {placed ? (
            <div className="flex flex-col items-center px-8 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-olive-500/15">
                <Check className="h-8 w-8 text-olive-500" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium text-charcoal-900">Order Placed!</h3>
              <p className="mt-2 text-sm text-charcoal-800/60">
                This is a demo checkout for a college presentation. No payment was processed and no order was shipped.
              </p>
              <button
                onClick={onClose}
                className="mt-8 rounded-full bg-charcoal-900 px-6 py-3 text-sm font-medium text-cream-100 hover:bg-charcoal-800"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-5 py-6 sm:px-8">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 font-display text-lg font-medium text-charcoal-900">Contact Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name" name="name" type="text" placeholder="Your name" required />
                    <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
                    <Field label="Phone" name="phone" type="tel" placeholder="+91 90000 00000" required />
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-display text-lg font-medium text-charcoal-900">Shipping Address</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field label="Address" name="address" type="text" placeholder="Street address" required />
                    </div>
                    <Field label="City" name="city" type="text" placeholder="Your city" required />
                    <Field label="PIN Code" name="pin" type="text" placeholder="560001" required />
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-display text-lg font-medium text-charcoal-900">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <PaymentOption value="card" current={payment} onChange={setPayment} icon={CreditCard} label="Card" />
                    <PaymentOption value="upi" current={payment} onChange={setPayment} icon={Banknote} label="UPI" />
                    <PaymentOption value="cod" current={payment} onChange={setPayment} icon={Truck} label="Cash on Delivery" />
                  </div>
                  <p className="mt-3 rounded-xl bg-cream-200/60 px-4 py-3 text-xs text-charcoal-800/50">
                    Demo checkout — no real payment will be processed. This is for academic presentation purposes only.
                  </p>
                </div>

                <div className="rounded-2xl bg-cream-50 p-5">
                  <div className="flex items-center justify-between text-sm text-charcoal-800/60">
                    <span>Subtotal</span>
                    <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-charcoal-800/60">
                    <span>Shipping</span>
                    <span className="text-olive-500">Free</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-charcoal-900/8 pt-3">
                    <span className="font-display text-lg font-medium text-charcoal-900">Total</span>
                    <span className="font-display text-xl font-semibold text-charcoal-900">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-charcoal-900 py-4 text-sm font-medium text-cream-100 transition-all hover:bg-charcoal-800 hover:shadow-lg"
                >
                  Place Order — ₹{total.toLocaleString('en-IN')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-charcoal-800/70">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-charcoal-900/12 bg-cream-50 px-4 py-3 text-sm text-charcoal-900 placeholder:text-charcoal-800/30 focus:border-olive-500/40 focus:outline-none"
      />
    </div>
  );
}

function PaymentOption({
  value,
  current,
  onChange,
  icon: Icon,
  label,
}: {
  value: string;
  current: string;
  onChange: (v: string) => void;
  icon: typeof CreditCard;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 transition-all ${
        current === value ? 'border-charcoal-900 bg-cream-50' : 'border-charcoal-900/10 hover:border-charcoal-900/20'
      }`}
    >
      <Icon className={`h-5 w-5 ${current === value ? 'text-charcoal-900' : 'text-charcoal-800/50'}`} />
      <span className="text-xs font-medium text-charcoal-900">{label}</span>
    </button>
  );
}
