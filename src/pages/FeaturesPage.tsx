import { FeaturesGrid } from '@/components/FeaturesGrid';
import { Organization } from '@/components/Organization';
import { WhatFitsInside } from '@/components/WhatFitsInside';
import { Lifestyle } from '@/components/Lifestyle';

export function FeaturesPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 mb-10">
        <span className="inline-block rounded-full bg-sage-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sage-600 border border-sage-200/50 shadow-cozy">
          Thoughtful Details
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
          Features & Organization
        </h1>
        <p className="mt-2 text-base text-espresso-700/70 max-w-2xl">
          Discover anti-theft security, weight-distributing harnesses, and dedicated compartments built into every NEXUS silhouette.
        </p>
      </div>

      <FeaturesGrid />
      <Organization />
      <WhatFitsInside />
      <Lifestyle />
    </div>
  );
}
