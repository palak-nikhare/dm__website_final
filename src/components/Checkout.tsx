import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check, CreditCard, Banknote, Truck } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

interface CheckoutProps {
  open: boolean;
  onClose: () => void;
}

export function Checkout({ open, onClose }: CheckoutProps) {
  const { cart, cartSubtotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [payment, setPayment] = useState('card');
  const [newOrderNum, setNewOrderNum] = useState('');

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
    const orderNum = `NX-${Math.floor(100000 + Math.random() * 900000)}`;
    setNewOrderNum(orderNum);

    // Save order into localStorage
    try {
      const existing = localStorage.getItem('nexus_orders');
      const orders = existing ? JSON.parse(existing) : [];
      const newOrder = {
        id: `ord-${Date.now()}`,
        orderNumber: orderNum,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: 'shipped', // highlighted at Order Shipped
        statusLabel: 'Order Shipped',
        estimatedDelivery: 'In 3-4 business days',
        carrier: 'Blue Dart Apex Express',
        trackingNumber: `BD-${Math.floor(1000000000 + Math.random() * 9000000000)}IN`,
        currentCheckpoint: 'Dispatched from Central Fulfillment Hub • In Transit',
        lastUpdated: 'Just now',
        items: cart.length > 0 ? cart.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          color: item.colorName,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })) : [
          {
            productId: 'executive',
            productName: 'NEXUS Executive',
            color: 'Jet Black',
            quantity: 1,
            price: 6499,
            image: '/nexus_backpacks/02-executive.png',
          }
        ],
        shippingAddress: {
          name: 'Aditya Sharma',
          street: 'Flat 402, Oakwood Enclave, 12th Main Road, Indiranagar',
          city: 'Bengaluru, Karnataka',
          pin: '560038',
        },
        totalAmount: total > 0 ? total : 6499,
        paymentMethod: payment === 'card' ? 'Credit/Debit Card' : payment === 'upi' ? 'UPI' : 'Cash on Delivery',
      };
      localStorage.setItem('nexus_orders', JSON.stringify([newOrder, ...orders]));
    } catch {
      // ignore
    }

    setPlaced(true);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-espresso-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex min-h-full items-start justify-center p-4 sm:p-8">
        <div className="my-0 w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-oat-50 border border-cream-300/70 shadow-cozy-lg sm:my-8">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream-300/60 bg-oat-50/95 px-6 py-5 backdrop-blur-md sm:px-10">
            <h2 className="font-display text-2xl font-semibold text-espresso-900">Checkout</h2>
            <button onClick={onClose} className="rounded-full p-2 text-espresso-800 hover:bg-espresso-900/5">
              <X className="h-5 w-5" />
            </button>
          </div>

          {placed ? (
            <div className="flex flex-col items-center px-8 py-16 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-100 text-sage-600 shadow-sm">
                <Check className="h-9 w-9" />
              </div>
              <h3 className="mt-6 font-display text-3xl font-semibold text-espresso-900">Order Placed!</h3>
              <p className="mt-2 text-sm font-mono font-bold text-terracotta-600">
                Order #{newOrderNum}
              </p>
              <p className="mt-2 text-sm text-espresso-700/70 max-w-md leading-relaxed">
                Thank you! Your order has been placed and is currently in transit. You can track real-time shipment progress under My Orders.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/orders');
                  }}
                  className="rounded-full bg-espresso-900 px-7 py-3.5 text-sm font-semibold text-cream-50 hover:bg-espresso-800 shadow-cozy transition-all"
                >
                  Track in My Orders →
                </button>
                <button
                  onClick={onClose}
                  className="rounded-full border border-cream-300/80 bg-oat-50 px-6 py-3.5 text-sm font-semibold text-espresso-900 hover:bg-cream-100 shadow-sm transition-all"
                >
                  Continue Exploring
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-10">
              <div className="space-y-7">
                <div>
                  <h3 className="mb-4 font-display text-xl font-medium text-espresso-900">Contact Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name" name="name" type="text" placeholder="Your name" required />
                    <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
                    <Field label="Phone" name="phone" type="tel" placeholder="+91 90000 00000" required />
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-display text-xl font-medium text-espresso-900">Shipping Address</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field label="Address" name="address" type="text" placeholder="Street address" required />
                    </div>
                    <Field label="City" name="city" type="text" placeholder="Your city" required />
                    <Field label="PIN Code" name="pin" type="text" placeholder="560001" required />
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-display text-xl font-medium text-espresso-900">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <PaymentOption value="card" current={payment} onChange={setPayment} icon={CreditCard} label="Card" />
                    <PaymentOption value="upi" current={payment} onChange={setPayment} icon={Banknote} label="UPI" />
                    <PaymentOption value="cod" current={payment} onChange={setPayment} icon={Truck} label="Cash on Delivery" />
                  </div>
                  <p className="mt-3.5 rounded-2xl bg-cream-200/60 px-4 py-3 text-xs text-espresso-700/60">
                    Demo checkout — no real payment will be processed. This is for academic presentation purposes only.
                  </p>
                </div>

                <div className="rounded-3xl border border-cream-300/60 bg-cream-100/60 p-6 shadow-sm">
                  <div className="flex items-center justify-between text-sm text-espresso-700/70">
                    <span>Subtotal</span>
                    <span className="font-semibold text-espresso-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-espresso-700/70">
                    <span>Shipping</span>
                    <span className="font-semibold text-sage-600">Free</span>
                  </div>
                  <div className="mt-3.5 flex items-center justify-between border-t border-cream-300/60 pt-3.5">
                    <span className="font-display text-lg font-medium text-espresso-900">Total</span>
                    <span className="font-display text-2xl font-semibold text-espresso-900">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-espresso-900 py-4 text-sm font-semibold text-cream-50 transition-all duration-400 hover:bg-espresso-800 hover:shadow-cozy-hover hover:-translate-y-0.5"
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
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-espresso-700/70">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-cream-300 bg-cream-100/50 px-4 py-3 text-sm text-espresso-900 placeholder:text-espresso-700/35 focus:border-espresso-900 focus:outline-none shadow-sm"
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
      className={`flex flex-col items-center gap-2.5 rounded-2xl border-2 px-3 py-4 transition-all duration-300 ${
        current === value
          ? 'border-espresso-900 bg-cream-100/80 shadow-cozy'
          : 'border-cream-300 bg-oat-50/50 hover:border-cream-400'
      }`}
    >
      <Icon className={`h-5 w-5 ${current === value ? 'text-terracotta-500' : 'text-espresso-700/50'}`} />
      <span className="text-xs font-semibold text-espresso-900">{label}</span>
    </button>
  );
}
