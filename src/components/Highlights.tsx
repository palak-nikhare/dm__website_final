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
    <section className="bg-cream-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center font-display text-3xl font-medium tracking-tightish text-charcoal-900 sm:text-4xl">
          Designed for your everyday.
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-charcoal-900/8 bg-cream-50 p-8 transition-all hover:border-charcoal-900/15 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-olive-500/10 text-olive-500 transition-transform group-hover:scale-110">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-charcoal-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-800/65">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
