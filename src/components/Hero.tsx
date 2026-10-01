import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '@/data/products';

export function Hero({ onShopClick, onTechClick }: { onShopClick: () => void; onTechClick: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden bg-cream-100/70 pt-32 pb-20 sm:pt-40 lg:pt-44">
      {/* Gentle ambient background glows */}
      <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-terracotta-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-sage-100/40 blur-3xl pointer-events-none" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20">
        <div className="nova-fade-up order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream-300/80 bg-oat-50/90 px-4.5 py-2 text-xs font-semibold uppercase tracking-widest text-espresso-700 shadow-cozy backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-terracotta-500" />
            New Collection 2026
          </span>

          <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.08] tracking-tightish text-espresso-900 sm:text-6xl lg:text-7xl">
            Carry Smarter.
            <br />
            <span className="italic font-normal text-terracotta-500">Designed for Everyday.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-espresso-700/80">
            Intelligently crafted backpacks tailored for the way you commute, work, create, and wander.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
            <button
              onClick={onShopClick}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-espresso-900 px-8 py-4 text-sm font-semibold text-cream-50 transition-all duration-400 hover:bg-espresso-800 hover:shadow-cozy-hover hover:-translate-y-1"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-terracotta-400" />
            </button>
            <button
              onClick={onTechClick}
              className="inline-flex items-center justify-center rounded-full border border-cream-300 bg-oat-50/80 px-8 py-4 text-sm font-semibold text-espresso-900 shadow-cozy transition-all duration-400 hover:border-espresso-900/40 hover:bg-oat-100 hover:-translate-y-0.5"
            >
              Explore Technology
            </button>
          </div>

          <div className="mt-14 flex items-center gap-10 border-t border-cream-300/50 pt-8">
            <Stat value="16" label="Unique Silhouettes" />
            <div className="h-10 w-px bg-cream-300/70" />
            <Stat value="11" label="Earth Tones" />
            <div className="h-10 w-px bg-cream-300/70" />
            <Stat value="30-Day" label="Cozy Guarantee" />
          </div>
        </div>

        <div className="nova-scale-in order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-terracotta-100/30 via-cream-200/40 to-sage-100/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-cream-300/70 bg-gradient-to-br from-oat-100 to-cream-200 shadow-cozy-lg">
              <img
                src={HERO_IMAGE}
                alt="NEXUS Metro smart backpack"
                className="h-[400px] w-full object-cover transition-transform duration-1000 hover:scale-[1.02] sm:h-[500px] lg:h-[580px]"
                loading="eager"
              />
              <div className="absolute bottom-6 left-6 rounded-3xl border border-cream-200/80 bg-oat-50/90 px-6 py-4 shadow-cozy backdrop-blur-md">
                <p className="font-display text-xl font-medium text-espresso-900">NEXUS Metro</p>
                <p className="text-xs font-semibold text-espresso-700/70">From ₹4,799</p>
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
      <p className="font-display text-3xl font-semibold text-espresso-900">{value}</p>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-espresso-700/60 mt-0.5">{label}</p>
    </div>
  );
}
