import { Technology } from '@/components/Technology';
import { WhatFitsInside } from '@/components/WhatFitsInside';
import { Highlights } from '@/components/Highlights';

export function TechnologyPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 mb-10">
        <span className="inline-block rounded-full bg-sage-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sage-600 border border-sage-200/50 shadow-cozy">
          Innovation & Craft
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
          Carrying Technology
        </h1>
        <p className="mt-2 text-base text-espresso-700/70 max-w-2xl">
          Hydrophobic weave coatings, TSA-approved combination locks, external USB charging, and shock-absorbing laptop suspension.
        </p>
      </div>

      <Technology />
      <WhatFitsInside />
      <Highlights />
    </div>
  );
}
