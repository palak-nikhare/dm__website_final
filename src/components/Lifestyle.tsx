import { LIFESTYLE_IMAGES } from '@/data/products';

const SCENES = [
  { img: LIFESTYLE_IMAGES.campus, title: 'Campus Days', desc: 'From morning lectures to afternoon study sessions.' },
  { img: LIFESTYLE_IMAGES.study, title: 'Work & Study', desc: 'Your laptop, your notes, your focus — organized.' },
  { img: LIFESTYLE_IMAGES.commute, title: 'The Daily Commute', desc: 'Public transit, crowded platforms, peace of mind.' },
  { img: LIFESTYLE_IMAGES.coding, title: 'Late-Night Sessions', desc: 'Hackathons, deadlines, and the work that matters.' },
];

export function Lifestyle() {
  return (
    <section className="bg-cream-100/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">In Every Environment</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
            Made for Your Everyday.
          </h2>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {SCENES.map((scene) => (
            <div key={scene.title} className="group relative overflow-hidden rounded-[2.5rem] border border-cream-300/60 shadow-cozy-md">
              <img
                src={scene.img}
                alt={scene.title}
                className="aspect-[16/10] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-espresso-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="font-display text-2xl font-medium text-cream-50">{scene.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/80">{scene.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
