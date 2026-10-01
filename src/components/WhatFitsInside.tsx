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
    <section className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-olive-500">Capacity</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tightish text-charcoal-900 sm:text-5xl">
              What Fits Inside?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal-800/70">
              Built for campus days, commutes, coding sessions and late-night hackathons.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {ITEMS.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-charcoal-900/12 bg-cream-100 px-4 py-2 text-sm font-medium text-charcoal-800 transition-colors hover:border-olive-500/40 hover:text-olive-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-cream-200">
            <img
              src={FLAT_LAY_IMAGE}
              alt="NEXUS professional backpack"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 rounded-xl bg-cream-100/90 px-4 py-2 backdrop-blur-sm">
              <p className="text-sm font-medium text-charcoal-900">Everything you need. Nothing you don't.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
