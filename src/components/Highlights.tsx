import { ShieldCheck, LayoutGrid, Route } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Smart Security',
    desc: 'Hidden anti-theft zippers, RFID-blocking pocket, and a TSA-approved lock.',
  },
  {
    icon: LayoutGrid,
    title: 'Organized Tech',
    desc: 'Dedicated compartments for laptop, cables, adapters, and everyday essentials.',
  },
  {
    icon: Route,
    title: 'Built for Every Journey',
    desc: 'From campus to commute to weekend trips — water-repellent and ready.',
  },
];

export function Highlights() {
  return (
    <section className="bg-cream-100/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="text-center font-display text-3xl font-semibold tracking-tightish text-espresso-900 sm:text-4xl">
          Designed for your everyday.
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-cream-300/60 bg-oat-50/90 p-9 shadow-cozy transition-all duration-500 hover:-translate-y-2 hover:shadow-cozy-hover hover:border-cream-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-100 text-sage-600 transition-transform duration-400 group-hover:scale-110 shadow-sm">
                <item.icon className="h-6.5 w-6.5" />
              </div>
              <h3 className="mt-7 font-display text-2xl font-medium text-espresso-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-espresso-700/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
