import { FLAT_LAY_IMAGE } from '@/data/products';

const ITEMS = [
  'MacBook Air',
  'Charger',
  'USB-C Cable',
  'Adapters',
  'Power Bank',
  'Notebook',
  'Smartphone',
  'Water Bottle',
  'Compact Umbrella',
  'Snacks',
];

export function WhatFitsInside() {
  return (
    <section className="bg-cream-100/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">Thoughtful Capacity</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
              What Fits Inside?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-espresso-700/75">
              Considerately designed for campus days, remote work, creative sessions, and everyday transit.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {ITEMS.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cream-300/80 bg-oat-50 px-5 py-2.5 text-sm font-medium text-espresso-800 shadow-cozy transition-all duration-300 hover:border-terracotta-400/60 hover:text-terracotta-500 hover:-translate-y-0.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-cream-300/70 bg-cream-200 shadow-cozy-lg">
            <img
              src={FLAT_LAY_IMAGE}
              alt="NEXUS professional backpack"
              className="aspect-[4/3] w-full object-cover transition-transform duration-1000 hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-5 left-5 rounded-2xl border border-cream-200/80 bg-oat-50/90 px-5 py-3 shadow-cozy backdrop-blur-md">
              <p className="text-xs font-semibold text-espresso-900">Everything you need. Nothing you don't.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
