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
    <section id="technology" className="scroll-mt-20 bg-espresso-900 py-24 text-cream-50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-terracotta-400">The Technology</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tightish sm:text-5xl">More Than a Backpack.</h2>
          <p className="mx-auto mt-4 max-w-xl text-cream-100/70 leading-relaxed">
            Every NEXUS pack is engineered with considered features that protect your gear, power your day, and keep you moving effortlessly.
          </p>
        </div>

        <div className="mt-18 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="overflow-hidden rounded-[2.5rem] border border-cream-100/10 shadow-cozy-lg">
            <img
              src={OPEN_BAG_IMAGE}
              alt="NEXUS smart backpack"
              className="h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.03]"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col justify-center gap-4">
            {TECH_FEATURES.map((feature, i) => (
              <button
                key={feature.num}
                onClick={() => setActive(i)}
                className={`group rounded-3xl border p-7 text-left transition-all duration-400 ${
                  active === i
                    ? 'border-terracotta-500/50 bg-espresso-800 shadow-cozy-md'
                    : 'border-cream-100/10 bg-espresso-900/50 hover:border-cream-100/20 hover:bg-espresso-800/40'
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors duration-400 ${
                    active === i ? 'bg-terracotta-500/20 text-terracotta-400 shadow-sm' : 'bg-cream-100/10 text-cream-100/60'
                  }`}>
                    <feature.icon className="h-5.5 w-5.5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-xs font-semibold text-terracotta-400/80">{feature.num}</span>
                      <h3 className="font-display text-2xl font-medium">{feature.title}</h3>
                    </div>
                    <p className={`mt-3 text-sm leading-relaxed text-cream-100/70 transition-all duration-500 ${
                      active === i ? 'max-h-48 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
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
