import { useState } from 'react';
import { BatteryCharging, ShieldCheck, CloudRain, Backpack } from 'lucide-react';
import { OPEN_BAG_IMAGE } from '@/data/products';

const TECH_FEATURES = [
  {
    icon: BatteryCharging,
    num: '01',
    title: 'Power Integration',
    desc: 'A built-in USB-C charging port connects to a dedicated internal power-bank pocket. Keep your power bank safely inside the backpack while charging your phone through the external port — no need to open the bag.',
  },
  {
    icon: ShieldCheck,
    num: '02',
    title: 'Smart Security',
    desc: 'Hidden anti-theft zippers sit flush against the back, an external TSA-approved combination lock secures the main compartment, and an RFID-blocking pocket protects your IDs and debit/credit cards from wireless scanning.',
  },
  {
    icon: CloudRain,
    num: '03',
    title: 'Weather Resistance',
    desc: 'Durable water-repellent nylon and canvas shells are designed to help protect your electronics and personal belongings during sudden rain and everyday commuting.',
  },
  {
    icon: Backpack,
    num: '04',
    title: 'Ergonomic Comfort',
    desc: 'Breathable mesh back padding keeps you cool, weight-distributing shoulder straps reduce strain on long days, and a hidden quick-access lower-back pocket stores your phone, cards, or transit cash exactly where you need them.',
  },
];

export function Technology() {
  const [active, setActive] = useState(0);

  return (
    <section id="technology" className="scroll-mt-20 bg-charcoal-900 py-20 text-cream-100 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-olive-300">The Technology</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tightish sm:text-5xl">More Than a Backpack.</h2>
          <p className="mx-auto mt-4 max-w-xl text-cream-100/60">
            Every NEXUS pack is engineered with considered features that protect your gear, power your day, and keep you moving.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={OPEN_BAG_IMAGE}
              alt="NEXUS smart backpack"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col justify-center gap-3">
            {TECH_FEATURES.map((feature, i) => (
              <button
                key={feature.num}
                onClick={() => setActive(i)}
                className={`group rounded-2xl border p-6 text-left transition-all ${
                  active === i ? 'border-olive-300/40 bg-charcoal-800' : 'border-cream-100/10 hover:border-cream-100/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    active === i ? 'bg-olive-300/20 text-olive-300' : 'bg-cream-100/10 text-cream-100/60'
                  }`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm text-cream-100/40">{feature.num}</span>
                      <h3 className="font-display text-xl font-medium">{feature.title}</h3>
                    </div>
                    <p className={`mt-2 text-sm leading-relaxed text-cream-100/60 transition-all ${
                      active === i ? 'max-h-40 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                    }`}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
