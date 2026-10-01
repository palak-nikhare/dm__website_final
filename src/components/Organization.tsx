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
    <section className="bg-cream-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-olive-500">Organization</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tightish text-charcoal-900 sm:text-5xl">
            Everything Has Its Place.
          </h2>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Interactive bag image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-cream-200">
              <img src={OPEN_BAG_IMAGE} alt="Open backpack compartments" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              {COMPARTMENTS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`absolute flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all ${
                    c.position
                  } ${
                    active === c.id
                      ? 'scale-125 border-charcoal-900 bg-charcoal-900 text-cream-100'
                      : 'border-cream-100 bg-cream-100/80 text-charcoal-800 hover:scale-110'
                  }`}
                  aria-label={c.title}
                >
                  <span className="text-[10px] font-bold">{COMPARTMENTS.indexOf(c) + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Compartment list */}
          <div className="flex flex-col justify-center gap-3">
            {COMPARTMENTS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
                  active === c.id ? 'border-charcoal-900 bg-cream-50 shadow-md' : 'border-charcoal-900/10 hover:border-charcoal-900/20'
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  active === c.id ? 'bg-olive-500/15 text-olive-500' : 'bg-charcoal-900/5 text-charcoal-800/50'
                }`}>
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs text-charcoal-800/40">0{i + 1}</span>
                    <h3 className="font-display text-lg font-medium text-charcoal-900">{c.title}</h3>
                  </div>
                  <p className={`mt-1 text-sm leading-relaxed text-charcoal-800/60 transition-all ${
                    active === c.id ? 'max-h-32 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                  }`}>
                    {c.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-olive-500/8 p-6 text-center">
          <p className="text-sm text-charcoal-800/70">
            <span className="font-medium text-olive-500">{activeItem.title}:</span> {activeItem.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
