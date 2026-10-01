import { useState } from 'react';
import { Laptop, Cable, Umbrella, BatteryFull } from 'lucide-react';
import { OPEN_BAG_IMAGE } from '@/data/products';

const COMPARTMENTS = [
  {
    id: 'tech',
    icon: Laptop,
    title: 'Primary Tech',
    desc: 'Padded shock-proof laptop sleeve suitable for a MacBook Air and similar laptops.',
    position: 'top-1/4 left-1/3',
  },
  {
    id: 'cables',
    icon: Cable,
    title: 'Cable Management',
    desc: 'Dedicated organizer pouch for laptop chargers, USB-C cables, adapters, and external monitor accessories.',
    position: 'top-1/2 left-1/4',
  },
  {
    id: 'transit',
    icon: Umbrella,
    title: 'Transit Essentials',
    desc: 'Exterior side pockets for a compact umbrella and water bottle.',
    position: 'top-1/3 right-1/4',
  },
  {
    id: 'endurance',
    icon: BatteryFull,
    title: 'Endurance Gear',
    desc: 'Internal space for a high-capacity power bank, small notepad, snacks, and other everyday essentials.',
    position: 'bottom-1/4 left-1/3',
  },
];

export function Organization() {
  const [active, setActive] = useState('tech');
  const activeItem = COMPARTMENTS.find((c) => c.id === active)!;

  return (
    <section className="bg-cream-100/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">Thoughtful Organization</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
            Everything Has Its Place.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Interactive bag image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-cream-300/70 bg-cream-200 shadow-cozy-lg">
              <img src={OPEN_BAG_IMAGE} alt="Open backpack compartments" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              {COMPARTMENTS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`absolute flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-400 ${
                    c.position
                  } ${
                    active === c.id
                      ? 'scale-125 border-espresso-900 bg-espresso-900 text-cream-50 shadow-cozy'
                      : 'border-cream-100 bg-oat-50/90 text-espresso-900 hover:scale-110 shadow-sm'
                  }`}
                  aria-label={c.title}
                >
                  <span className="text-[11px] font-bold">{COMPARTMENTS.indexOf(c) + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Compartment list */}
          <div className="flex flex-col justify-center gap-4">
            {COMPARTMENTS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`group flex items-start gap-4 rounded-3xl border p-6 text-left transition-all duration-400 ${
                  active === c.id
                    ? 'border-espresso-900/30 bg-oat-50 shadow-cozy'
                    : 'border-cream-300/40 bg-oat-50/50 hover:border-cream-300 hover:bg-oat-50'
                }`}
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-400 ${
                  active === c.id ? 'bg-sage-100 text-sage-600 shadow-sm' : 'bg-cream-200/60 text-espresso-700/50'
                }`}>
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs font-semibold text-terracotta-500">0{i + 1}</span>
                    <h3 className="font-display text-xl font-medium text-espresso-900">{c.title}</h3>
                  </div>
                  <p className={`mt-2 text-sm leading-relaxed text-espresso-700/70 transition-all duration-400 ${
                    active === c.id ? 'max-h-36 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                  }`}>
                    {c.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-cream-300/60 bg-oat-50/80 p-6 text-center shadow-cozy">
          <p className="text-sm text-espresso-700/80">
            <span className="font-semibold text-terracotta-500">{activeItem.title}:</span> {activeItem.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
