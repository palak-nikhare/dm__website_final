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
    <section id="features" className="scroll-mt-20 bg-cream-100/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">Why NEXUS</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
            Eight reasons to carry smarter.
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-cream-300/60 bg-oat-50/90 p-7 shadow-cozy transition-all duration-500 hover:-translate-y-1.5 hover:shadow-cozy-hover hover:border-cream-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-600 transition-transform duration-400 group-hover:scale-110 shadow-sm">
                <f.icon className="h-5.5 w-5.5" />
              </div>
              <h3 className="mt-6 font-display text-lg font-medium text-espresso-900">{f.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-espresso-700/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
