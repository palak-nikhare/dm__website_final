import {
  BatteryCharging,
  ShieldCheck,
  MapPin,
  Droplets,
  Laptop,
  CreditCard,
  Backpack,
  CloudRain,
} from 'lucide-react';

const FEATURES = [
  { icon: BatteryCharging, title: 'USB-C Charging', desc: 'External port, internal power-bank pocket.' },
  { icon: ShieldCheck, title: 'Anti-Theft Security', desc: 'Hidden zippers and TSA-approved lock.' },
  { icon: MapPin, title: 'Smart-Ready Organization', desc: 'Every essential in its place.' },
  { icon: Droplets, title: 'Water-Repellent Material', desc: 'Durable nylon and canvas shells.' },
  { icon: Laptop, title: 'Shock-Proof Laptop Protection', desc: 'Padded sleeve for MacBook Air and similar.' },
  { icon: CreditCard, title: 'RFID Protection', desc: 'Blocking pocket for IDs and cards.' },
  { icon: Backpack, title: 'Ergonomic Comfort', desc: 'Mesh padding and weight-distributing straps.' },
  { icon: CloudRain, title: 'Everyday Weather Protection', desc: 'Ready for sudden rain and daily commutes.' },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="scroll-mt-20 bg-cream-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-olive-500">Why NEXUS</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tightish text-charcoal-900 sm:text-5xl">
            Eight reasons to carry smarter.
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-charcoal-900/8 bg-cream-50 p-6 transition-all hover:border-olive-500/30 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-olive-500/10 text-olive-500 transition-transform group-hover:scale-110">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-base font-medium text-charcoal-900">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal-800/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
