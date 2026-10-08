import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Tag,
  Copy,
  Check,
  Gift,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { PRODUCTS, type Product } from '@/data/products';

interface OfferItem {
  id: string;
  code: string;
  title: string;
  discountText: string;
  condition: string;
  description: string;
  expiry: string;
  badge: string;
  theme: 'gold' | 'terracotta' | 'sage' | 'amber';
  featuredProduct?: Product;
}

interface OffersPageProps {
  onView: (product: Product) => void;
}

export function OffersPage({ onView }: OffersPageProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const OFFERS: OfferItem[] = [
    {
      id: 'offer-1',
      code: 'NEXUS15',
      title: 'Tiered Order Savings',
      discountText: '15% OFF',
      condition: 'On all orders above ₹15,000',
      description: 'Upgrade your carry collection or order multiple packs for your team to unlock 15% instant savings at checkout.',
      expiry: 'Valid Season 2026',
      badge: 'Bestseller Reward',
      theme: 'gold',
      featuredProduct: PRODUCTS.find((p) => p.id === 'executive'),
    },
    {
      id: 'offer-2',
      code: 'WELCOME10',
      title: 'First Carry Bonus',
      discountText: '₹1,000 OFF',
      condition: 'On your very first order',
      description: 'Welcome to NEXUS. Take ₹1,000 off any smart backpack silhouette on your initial purchase.',
      expiry: 'New Member Offer',
      badge: 'Welcome Special',
      theme: 'terracotta',
      featuredProduct: PRODUCTS.find((p) => p.id === 'metro'),
    },
    {
      id: 'offer-3',
      code: 'COZYDUO',
      title: 'Double Carry Bundle',
      discountText: 'SAVE ₹2,500',
      condition: 'When purchasing 2 or more backpacks',
      description: 'Add any two backpacks to your cart to automatically apply ₹2,500 bundle savings. Ideal for gifting.',
      expiry: 'Bundle Deal',
      badge: 'Multi-Pack Special',
      theme: 'sage',
      featuredProduct: PRODUCTS.find((p) => p.id === 'solace'),
    },
    {
      id: 'offer-4',
      code: 'PROSERIES',
      title: 'Business & Pro Series',
      discountText: '20% OFF',
      condition: 'On Axis Pro, Executive & Tweed Executive',
      description: 'Exclusive 20% discount tailored for business leaders choosing our armor-shelled executive backpacks.',
      expiry: 'Limited Availability',
      badge: 'Executive Class',
      theme: 'amber',
      featuredProduct: PRODUCTS.find((p) => p.id === 'axis-pro'),
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-oat-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream-300/80 bg-oat-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sage-600 shadow-cozy">
            <Gift className="h-3.5 w-3.5 text-terracotta-500" />
            Curated Savings & Rewards
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl lg:text-6xl">
            Special Offers & Promotional Rewards
          </h1>
          <p className="mt-4 text-base leading-relaxed text-espresso-700/80 sm:text-lg">
            Discover exclusive discount codes, seasonal savings, and bundled rewards on NEXUS smart carry systems.
          </p>
        </div>

        {/* Highlighted Banner */}
        <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-cream-300/80 bg-gradient-to-r from-espresso-900 via-espresso-800 to-espresso-900 p-8 text-cream-50 shadow-cozy-lg sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-500/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-400 border border-terracotta-500/30">
                <Sparkles className="h-3.5 w-3.5" /> Launch Highlight
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl text-cream-50">
                Complimentary Express Shipping Nationwide
              </h2>
              <p className="mt-2 text-sm text-cream-100/75 max-w-2xl">
                All orders above ₹5,000 include complimentary 2–4 day express delivery across India with full GPS tracking and 30-day cozy trial.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-cream-50 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-espresso-900 shadow-cozy transition-all duration-300 hover:bg-oat-50 hover:shadow-cozy-hover hover:-translate-y-0.5 shrink-0"
            >
              Shop Collection Now
              <ArrowRight className="h-4 w-4 text-terracotta-500" />
            </Link>
          </div>
        </div>

        {/* Offers Cards Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {OFFERS.map((offer) => {
            const isCopied = copiedCode === offer.code;

            // Theme colors
            const themeStyles = {
              gold: {
                badgeBg: 'bg-amber-100/80 text-amber-900 border-amber-300/60',
                accentText: 'text-amber-700',
                cardBorder: 'border-amber-200/60 hover:border-amber-300',
              },
              terracotta: {
                badgeBg: 'bg-terracotta-100/80 text-terracotta-700 border-terracotta-300/60',
                accentText: 'text-terracotta-600',
                cardBorder: 'border-cream-300/80 hover:border-terracotta-300/70',
              },
              sage: {
                badgeBg: 'bg-sage-100/80 text-sage-700 border-sage-200/60',
                accentText: 'text-sage-700',
                cardBorder: 'border-cream-300/80 hover:border-sage-300/70',
              },
              amber: {
                badgeBg: 'bg-amber-100/80 text-amber-800 border-amber-200/60',
                accentText: 'text-amber-800',
                cardBorder: 'border-cream-300/80 hover:border-amber-300/60',
              },
            }[offer.theme];

            return (
              <div
                key={offer.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border bg-oat-50/95 p-8 shadow-cozy transition-all duration-500 hover:-translate-y-2 hover:shadow-cozy-hover ${themeStyles.cardBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider border ${themeStyles.badgeBg}`}>
                      {offer.badge}
                    </span>
                    <span className="text-xs text-espresso-700/50 font-medium">
                      {offer.expiry}
                    </span>
                  </div>

                  <div className="mt-6 flex items-baseline gap-3">
                    <span className={`font-display text-4xl font-semibold tracking-tightish sm:text-5xl ${themeStyles.accentText}`}>
                      {offer.discountText}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-medium text-espresso-900">
                    {offer.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-espresso-700/70">
                    {offer.condition}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-espresso-700/80">
                    {offer.description}
                  </p>

                  {offer.featuredProduct && (
                    <div
                      onClick={() => onView(offer.featuredProduct!)}
                      className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-cream-300/60 bg-cream-100/60 p-3 hover:bg-cream-200/60 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={offer.featuredProduct.images[0]}
                          alt={offer.featuredProduct.name}
                          className="h-10 w-10 shrink-0 rounded-xl bg-white object-contain p-1 border border-cream-300/40"
                        />
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase font-semibold text-espresso-700/50 tracking-wider">Suggested Match</p>
                          <p className="font-display text-xs font-semibold text-espresso-900 truncate">
                            {offer.featuredProduct.name}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-terracotta-500 shrink-0">View Bag →</span>
                    </div>
                  )}
                </div>

                {/* Click to Copy Coupon Code Section */}
                <div className="mt-8 pt-6 border-t border-cream-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 rounded-2xl border border-dashed border-espresso-900/30 bg-cream-100/80 px-4 py-2.5">
                    <Tag className="h-4 w-4 text-terracotta-500" />
                    <span className="font-mono text-sm font-bold tracking-wider text-espresso-900">
                      {offer.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-cozy ${
                      isCopied
                        ? 'bg-sage-600 text-cream-50 shadow-sage-200 ring-2 ring-sage-400 scale-105'
                        : 'bg-espresso-900 text-cream-50 hover:bg-espresso-800 hover:shadow-cozy-hover hover:-translate-y-0.5'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 text-cream-50" />
                        <span>Copied! ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-terracotta-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* How to Apply & Reward Info */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-cream-300/80 bg-oat-50/95 p-8 sm:p-10 shadow-cozy">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-terracotta-500">
              <Zap className="h-4 w-4" /> Quick Steps
            </span>
            <h3 className="mt-3 font-display text-2xl font-semibold text-espresso-900">
              How to Redeem Your Offer
            </h3>
            <ol className="mt-6 space-y-4 text-xs text-espresso-700/80">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta-500 text-xs font-bold text-cream-50">1</span>
                <span>Click <strong>Copy Code</strong> on any active coupon above.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta-500 text-xs font-bold text-cream-50">2</span>
                <span>Browse the catalog and add your chosen NEXUS backpack to your cart.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta-500 text-xs font-bold text-cream-50">3</span>
                <span>Proceed to Checkout and paste the code into the Promo Code box to apply your savings.</span>
              </li>
            </ol>
          </div>

          <div className="rounded-[2.5rem] border border-cream-300/80 bg-oat-50/95 p-8 sm:p-10 shadow-cozy">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sage-600">
              <ShieldCheck className="h-4 w-4" /> NEXUS Guarantee
            </span>
            <h3 className="mt-3 font-display text-2xl font-semibold text-espresso-900">
              Complimentary Cozy Benefits
            </h3>
            <ul className="mt-6 space-y-3.5 text-xs text-espresso-700/80">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-sage-600 shrink-0" />
                <span><strong>30-Day Cozy Trial:</strong> Test your bag on daily commutes risk-free.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-sage-600 shrink-0" />
                <span><strong>Lifetime Craft Protection:</strong> Guaranteed zipper and seam warranty.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-sage-600 shrink-0" />
                <span><strong>Secure Checkout:</strong> Encrypted payment gateways with 256-bit protection.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
