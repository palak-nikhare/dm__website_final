import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Calendar,
  CreditCard,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: 'placed' | 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered';
  statusLabel: string;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  currentCheckpoint: string;
  lastUpdated: string;
  items: {
    productId: string;
    productName: string;
    color: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    pin: string;
  };
  totalAmount: number;
  paymentMethod: string;
}

const DEFAULT_ORDERS: OrderItem[] = [
  {
    id: 'ord-849201',
    orderNumber: 'NX-849201',
    date: 'October 6, 2026',
    status: 'shipped',
    statusLabel: 'Order Shipped',
    estimatedDelivery: 'Friday, Oct 11, 2026',
    carrier: 'Blue Dart Apex Express',
    trackingNumber: 'BD-8492019921IN',
    currentCheckpoint: 'Departed Bengaluru Sorting Hub — In Transit to Destination Facility',
    lastUpdated: 'Today at 08:30 AM',
    items: [
      {
        productId: 'executive',
        productName: 'NEXUS Executive',
        color: 'Jet Black',
        quantity: 1,
        price: 6499,
        image: PRODUCTS.find((p) => p.id === 'executive')?.images[0] || '/nexus_backpacks/02-executive.png',
      },
    ],
    shippingAddress: {
      name: 'Aditya Sharma',
      street: 'Flat 402, Oakwood Enclave, 12th Main Road, Indiranagar',
      city: 'Bengaluru, Karnataka',
      pin: '560038',
    },
    totalAmount: 6499,
    paymentMethod: 'Credit Card (ending in •••• 4242)',
  },
  {
    id: 'ord-772910',
    orderNumber: 'NX-772910',
    date: 'September 22, 2026',
    status: 'delivered',
    statusLabel: 'Delivered',
    estimatedDelivery: 'Delivered on Sep 26, 2026',
    carrier: 'Delhivery Surface',
    trackingNumber: 'DLV-7729104401IN',
    currentCheckpoint: 'Delivered to resident • Signed by Aditya S.',
    lastUpdated: 'Sep 26, 2026 at 02:45 PM',
    items: [
      {
        productId: 'metro',
        productName: 'NEXUS Metro',
        color: 'Graphite',
        quantity: 1,
        price: 5499,
        image: PRODUCTS.find((p) => p.id === 'metro')?.images[0] || '/nexus_backpacks/01-metro.png',
      },
    ],
    shippingAddress: {
      name: 'Aditya Sharma',
      street: 'Flat 402, Oakwood Enclave, 12th Main Road, Indiranagar',
      city: 'Bengaluru, Karnataka',
      pin: '560038',
    },
    totalAmount: 5499,
    paymentMethod: 'UPI (aditya@okhdfcbank)',
  },
];

// The 5 mandatory stages in order
const TRACKING_STAGES = [
  { id: 'placed', label: 'Order Placed', shortTime: 'Oct 06, 10:30 AM' },
  { id: 'confirmed', label: 'Order Confirmed', shortTime: 'Oct 06, 03:15 PM' },
  { id: 'shipped', label: 'Order Shipped', shortTime: 'Oct 07, 09:45 AM' },
  { id: 'out_for_delivery', label: 'Out for Delivery', shortTime: 'Expected Oct 10' },
  { id: 'delivered', label: 'Delivered', shortTime: 'Expected Oct 11' },
];

export function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(() => {
    try {
      const stored = localStorage.getItem('nexus_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_ORDERS;
  });

  // Track which orders have their tracking line expanded (default active order open)
  const [expandedTracking, setExpandedTracking] = useState<Record<string, boolean>>({
    'ord-849201': true, // Expanded by default for immediate visibility
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleTracking = (orderId: string) => {
    setExpandedTracking((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-oat-50 min-h-screen">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-medium text-espresso-700/60 mb-3">
            <Link to="/" className="hover:text-terracotta-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-espresso-900 font-semibold">My Orders</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-cream-300/60 pb-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream-300/80 bg-oat-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sage-600 shadow-cozy">
                <Package className="h-3.5 w-3.5 text-terracotta-500" />
                Account Purchases ({orders.length})
              </span>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
                My Orders
              </h1>
              <p className="mt-2 text-sm text-espresso-700/70 max-w-xl">
                View your recent backpack purchases, track live shipping status, and review delivery timelines.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-espresso-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream-50 shadow-cozy transition-all hover:bg-espresso-800 hover:-translate-y-0.5"
            >
              <span>Explore More Bags</span>
              <ArrowRight className="h-3.5 w-3.5 text-terracotta-400" />
            </Link>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-8">
          {orders.map((order) => {
            const isTrackingOpen = !!expandedTracking[order.id];
            const isShippedCurrent = order.status === 'shipped';

            return (
              <div
                key={order.id}
                className="overflow-hidden rounded-[2.5rem] border border-cream-300/80 bg-oat-50/95 shadow-cozy-lg transition-all duration-300"
              >
                {/* Order Summary Top Bar */}
                <div className="border-b border-cream-300/60 bg-cream-100/50 p-6 sm:px-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                      <div>
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-espresso-700/50">
                          Order Placed
                        </span>
                        <span className="text-sm font-semibold text-espresso-900">
                          {order.date}
                        </span>
                      </div>

                      <div className="hidden sm:block h-8 w-px bg-cream-300/60" />

                      <div>
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-espresso-700/50">
                          Order Number
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-sm font-bold text-espresso-900">
                            #{order.orderNumber}
                          </span>
                          <button
                            onClick={() => handleCopy(order.orderNumber)}
                            className="p-1 text-espresso-700/40 hover:text-espresso-900"
                            title="Copy Order Number"
                          >
                            {copiedId === order.orderNumber ? (
                              <Check className="h-3 w-3 text-sage-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="hidden sm:block h-8 w-px bg-cream-300/60" />

                      <div>
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-espresso-700/50">
                          Total Amount
                        </span>
                        <span className="text-sm font-semibold text-espresso-900">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold ${
                          order.status === 'shipped'
                            ? 'bg-terracotta-500/15 text-terracotta-600 border border-terracotta-500/30'
                            : order.status === 'delivered'
                            ? 'bg-sage-100 text-sage-700 border border-sage-200'
                            : 'bg-cream-200 text-espresso-800'
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            order.status === 'shipped'
                              ? 'bg-terracotta-500 animate-pulse'
                              : order.status === 'delivered'
                              ? 'bg-sage-600'
                              : 'bg-espresso-700'
                          }`}
                        />
                        {order.statusLabel}
                      </span>

                      {/* Primary Track Order Action Button */}
                      <button
                        onClick={() => toggleTracking(order.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-cozy ${
                          isTrackingOpen
                            ? 'bg-espresso-900 text-cream-50 hover:bg-espresso-800'
                            : 'border border-cream-300/90 bg-oat-50 text-espresso-900 hover:bg-cream-100 hover:border-espresso-900/40'
                        }`}
                      >
                        <Truck className="h-3.5 w-3.5 text-terracotta-500" />
                        <span>Track Order</span>
                        {isTrackingOpen ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Horizontal Order-Tracking Progress Line Section */}
                {isTrackingOpen && (
                  <div className="border-b border-cream-300/60 bg-cream-100/30 p-6 sm:p-8 nova-fade-up">
                    <div className="flex items-center justify-between mb-8 pb-3 border-b border-cream-300/40">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-espresso-700/60">
                          Live Shipment Tracking
                        </span>
                        <h3 className="font-display text-lg font-semibold text-espresso-900">
                          {order.carrier} • Tracking ID:{' '}
                          <span className="font-mono text-terracotta-600 font-bold">
                            {order.trackingNumber}
                          </span>
                        </h3>
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="text-[11px] text-espresso-700/60">Estimated Arrival</span>
                        <p className="text-sm font-semibold text-espresso-900">
                          {order.estimatedDelivery}
                        </p>
                      </div>
                    </div>

                    {/* HORIZONTAL TRACKING PROGRESS LINE */}
                    <div className="my-6 px-2 sm:px-6">
                      <div className="relative">
                        {/* Connecting horizontal line */}
                        <div className="absolute top-5 left-8 right-8 h-1 bg-cream-300/80 -translate-y-1/2 z-0 hidden sm:block" />
                        <div
                          className={`absolute top-5 left-8 h-1 -translate-y-1/2 z-0 hidden sm:block transition-all duration-700 ${
                            isShippedCurrent ? 'w-1/2 bg-sage-600' : 'w-full bg-sage-600'
                          }`}
                        />

                        {/* Stages list in horizontal line */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-5 sm:gap-2 relative z-10">
                          {TRACKING_STAGES.map((stage, idx) => {
                            const isOrderShipped = stage.id === 'shipped';
                            const isPast =
                              order.status === 'delivered'
                                ? true
                                : idx <= 2; // stage 0 (placed), 1 (confirmed), 2 (shipped)
                            const isCurrentHighlight =
                              order.status === 'shipped' && isOrderShipped;

                            return (
                              <div
                                key={stage.id}
                                className={`flex sm:flex-col items-center sm:items-center gap-4 sm:gap-2.5 text-left sm:text-center group ${
                                  isCurrentHighlight ? 'scale-100' : ''
                                }`}
                              >
                                {/* Circle Node Icon */}
                                <div className="relative shrink-0">
                                  {isCurrentHighlight ? (
                                    /* CURRENT STATUS HIGHLIGHTED AT 'ORDER SHIPPED' */
                                    <div className="relative">
                                      <div className="absolute -inset-2 rounded-full bg-terracotta-500/25 animate-ping" />
                                      <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-terracotta-500 text-cream-50 shadow-md ring-4 ring-terracotta-500/30">
                                        <Truck className="h-5 w-5 animate-pulse" />
                                      </div>
                                    </div>
                                  ) : isPast ? (
                                    /* COMPLETED STAGE */
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-600 text-cream-50 shadow-sm">
                                      <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                  ) : (
                                    /* UPCOMING / PENDING STAGE */
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream-300 bg-oat-50 text-espresso-700/30">
                                      <Clock className="h-4 w-4" />
                                    </div>
                                  )}
                                </div>

                                {/* Label & Timestamps */}
                                <div>
                                  {isCurrentHighlight && (
                                    <span className="inline-block rounded-full bg-terracotta-500/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-terracotta-600 border border-terracotta-500/30 mb-1">
                                      Current Status
                                    </span>
                                  )}

                                  <h4
                                    className={`text-xs font-semibold ${
                                      isCurrentHighlight
                                        ? 'text-terracotta-600 font-bold text-sm'
                                        : isPast
                                        ? 'text-espresso-900'
                                        : 'text-espresso-700/40'
                                    }`}
                                  >
                                    {stage.label}
                                  </h4>

                                  <p
                                    className={`text-[11px] mt-0.5 ${
                                      isCurrentHighlight
                                        ? 'font-medium text-espresso-900'
                                        : 'text-espresso-700/50'
                                    }`}
                                  >
                                    {stage.shortTime}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Live Checkpoint Alert */}
                    <div className="mt-8 rounded-2xl border border-cream-300/70 bg-oat-50 p-4 sm:p-5 shadow-sm flex items-start gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta-500/15 text-terracotta-600">
                        <MapPin className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="text-xs font-semibold text-espresso-900">
                            {order.currentCheckpoint}
                          </span>
                          <span className="text-[11px] text-espresso-700/50 font-medium">
                            Updated {order.lastUpdated}
                          </span>
                        </div>
                        <p className="text-xs text-espresso-700/70 mt-1">
                          Your package is traveling with secure temperature and impact sensors. Handled exclusively by certified courier personnel.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ordered Items Details & Shipping Address */}
                <div className="p-6 sm:p-8">
                  <div className="grid gap-8 lg:grid-cols-3">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-espresso-700/60">
                        Items in this Order
                      </h4>
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-4 rounded-3xl border border-cream-300/60 bg-cream-100/40 p-4 shadow-sm"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="h-16 w-16 shrink-0 rounded-2xl border border-cream-300/60 bg-white object-contain p-1.5 shadow-sm"
                            />
                            <div className="min-w-0">
                              <h5 className="font-display text-base font-semibold text-espresso-900 truncate">
                                {item.productName}
                              </h5>
                              <p className="text-xs text-espresso-700/70 mt-0.5">
                                Color: <span className="font-medium text-espresso-900">{item.color}</span> • Qty: {item.quantity}
                              </p>
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-sage-600 mt-1">
                                <ShieldCheck className="h-3 w-3" /> Includes Lifetime Craft Warranty
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-display text-base font-semibold text-espresso-900">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                            <span className="block text-[11px] text-espresso-700/50">
                              ₹{item.price.toLocaleString('en-IN')} each
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery & Payment Information */}
                    <div className="rounded-3xl border border-cream-300/60 bg-cream-100/40 p-5 space-y-4 text-xs">
                      <div>
                        <h4 className="font-semibold uppercase tracking-wider text-espresso-700/60 mb-1.5">
                          Delivery Address
                        </h4>
                        <p className="font-semibold text-espresso-900">{order.shippingAddress.name}</p>
                        <p className="text-espresso-700/80 leading-relaxed mt-0.5">
                          {order.shippingAddress.street}
                          <br />
                          {order.shippingAddress.city} - {order.shippingAddress.pin}
                        </p>
                      </div>

                      <div className="border-t border-cream-300/50 pt-3">
                        <h4 className="font-semibold uppercase tracking-wider text-espresso-700/60 mb-1.5">
                          Payment Method
                        </h4>
                        <div className="flex items-center gap-2 text-espresso-900 font-medium">
                          <CreditCard className="h-4 w-4 text-terracotta-500" />
                          <span>{order.paymentMethod}</span>
                        </div>
                      </div>

                      <div className="border-t border-cream-300/50 pt-3 flex items-center justify-between">
                        <Link
                          to="/help"
                          className="text-xs font-semibold text-terracotta-500 hover:text-espresso-900 transition-colors"
                        >
                          Need help with this order? →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
