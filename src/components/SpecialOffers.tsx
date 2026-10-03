import { useState } from 'react';
import { Tag, Copy, Check, Sparkles, Gift } from 'lucide-react';

interface SpecialOfferItem {
  id: string;
  code: string;
  discountText: string;
  title: string;
  subtext: string;
  badge: string;
  accentColor: string;
}

const OFFERS_DATA: SpecialOfferItem[] = [
  {
    id: 'off-1',
    code: 'NEXUS500',
    discountText: 'Flat ₹500 OFF',
    title: 'Cart Booster Savings',
    subtext: 'Valid on orders over ₹4,000',
    badge: 'Bestseller',
    accentColor: 'text-terracotta-500',
  },
  {
    id: 'off-2',
    code: 'FIRST999',
    discountText: 'Save ₹999',
    title: 'First Carry Reward',
    subtext: 'Exclusive on your first order',
    badge: 'Welcome Bonus',
    accentColor: 'text-sage-600',
  },
  {
    id: 'off-3',
    code: 'DUO750',
    discountText: 'Flat ₹750 OFF',
    title: 'Duo Bundle Savings',
    subtext: 'When buying any 2 backpacks',
    badge: 'Bundle Special',
    accentColor: 'text-amber-700',
  },
  {
    id: 'off-4',
    code: 'COZY300',
    discountText: 'Flat ₹300 OFF',
    title: 'Everyday Commute',
    subtext: 'On all creator & studio packs',
    badge: 'Daily Deal',
    accentColor: 'text-espresso-900',
  },
];

export function SpecialOffers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2200);
  };

  return (
    <section className="border-t border-cream-300/60 bg-cream-100/50 py-12 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-cream-300/60 pb-6 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cream-300/80 bg-oat-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-sage-600 shadow-cozy">
              <Gift className="h-3.5 w-3.5 text-terracotta-500" />
              Special Savings
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-semibold tracking-tightish text-espresso-900 sm:text-3xl">
              Special Offers & Coupon Rewards
            </h2>
          </div>
          <p className="text-xs text-espresso-700/70 max-w-md">
            Click any code below to copy it instantly to your clipboard for checkout. Max discount ₹1,000 per offer.
          </p>
        </div>

        {/* Compact Horizontal Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS_DATA.map((item) => {
            const isCopied = copiedCode === item.code;

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-3xl border border-cream-300/80 bg-oat-50/95 p-5 shadow-cozy transition-all duration-400 hover:-translate-y-1.5 hover:shadow-cozy-hover hover:border-cream-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-sage-100/80 px-2.5 py-0.5 text-[10px] font-semibold text-sage-600 border border-sage-200/50">
                      {item.badge}
                    </span>
                    <Sparkles className="h-3.5 w-3.5 text-terracotta-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className={`mt-3.5 font-display text-2xl font-semibold tracking-tightish ${item.accentColor}`}>
                    {item.discountText}
                  </h3>

                  <p className="mt-1 font-display text-sm font-medium text-espresso-900">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[11px] text-espresso-700/65">
                    {item.subtext}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-cream-300/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 rounded-xl border border-dashed border-espresso-900/30 bg-cream-100/80 px-2.5 py-1">
                    <Tag className="h-3 w-3 text-terracotta-500" />
                    <span className="font-mono text-xs font-bold text-espresso-900">
                      {item.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.code)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-300 shadow-cozy ${
                      isCopied
                        ? 'bg-sage-600 text-cream-50 shadow-sage-200 scale-105'
                        : 'bg-espresso-900 text-cream-50 hover:bg-espresso-800 hover:-translate-y-0.5'
                    }`}
                    title={`Copy code ${item.code}`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 text-cream-50" />
                        <span>Copied! ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 text-terracotta-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
