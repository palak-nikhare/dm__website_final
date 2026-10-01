import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '@/data/products';

export function Hero({ onShopClick, onTechClick }: { onShopClick: () => void; onTechClick: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden bg-cream-100 pt-28 pb-16 sm:pt-32 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="nova-fade-up order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-charcoal-900/15 bg-cream-50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-charcoal-700">
            <Sparkles className="h-3.5 w-3.5" />
            New Collection 2026
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tightish text-charcoal-900 sm:text-6xl lg:text-7xl">
            Carry Smarter.
            <br />
            <span className="text-olive-500">Go Further.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal-800/70">
            Smart backpacks designed for the way you study, work, commute and create.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={onShopClick}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-charcoal-900 px-7 py-3.5 text-sm font-medium text-cream-100 transition-all hover:bg-charcoal-800 hover:shadow-xl"
            >
              Shop Backpacks
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onTechClick}
              className="inline-flex items-center justify-center rounded-full border border-charcoal-900/20 px-7 py-3.5 text-sm font-medium text-charcoal-900 transition-all hover:border-charcoal-900/40 hover:bg-cream-50"
            >
              Explore Technology
            </button>
          </div>
          <div className="mt-12 flex items-center gap-8">
            <Stat value="16" label="Designs" />
            <div className="h-10 w-px bg-charcoal-900/10" />
            <Stat value="11" label="Colors" />
            <div className="h-10 w-px bg-charcoal-900/10" />
            <Stat value="30-Day" label="Returns" />
          </div>
        </div>

        <div className="nova-scale-in order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sand-200/40 to-cream-300/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-sand-100 to-cream-200 shadow-2xl">
              <img
                src={HERO_IMAGE}
                alt="NEXUS Metro smart backpack"
                className="h-[380px] w-full object-cover sm:h-[480px] lg:h-[560px]"
                loading="eager"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-cream-100/90 px-5 py-3 backdrop-blur-sm">
                <p className="font-display text-lg font-medium text-charcoal-900">NEXUS Metro</p>
                <p className="text-xs text-charcoal-800/60">From ₹4,799</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold text-charcoal-900">{value}</p>
      <p className="text-xs uppercase tracking-wider text-charcoal-800/50">{label}</p>
    </div>
  );
}
