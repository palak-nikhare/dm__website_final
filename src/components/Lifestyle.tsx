import { LIFESTYLE_IMAGES } from '@/data/products';

const SCENES = [
  { img: LIFESTYLE_IMAGES.campus, title: 'Campus Days', desc: 'From morning lectures to afternoon study sessions.' },
  { img: LIFESTYLE_IMAGES.study, title: 'Work & Study', desc: 'Your laptop, your notes, your focus — organized.' },
  { img: LIFESTYLE_IMAGES.commute, title: 'The Daily Commute', desc: 'Public transit, crowded platforms, peace of mind.' },
  { img: LIFESTYLE_IMAGES.coding, title: 'Late-Night Sessions', desc: 'Hackathons, deadlines, and the work that matters.' },
];

export function Lifestyle() {
  return (
    <section className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-olive-500">Lifestyle</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tightish text-charcoal-900 sm:text-5xl">
            Made for Your Everyday.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {SCENES.map((scene) => (
            <div key={scene.title} className="group relative overflow-hidden rounded-2xl">
              <img
                src={scene.img}
                alt={scene.title}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-display text-2xl font-medium text-cream-100">{scene.title}</h3>
                <p className="mt-1 text-sm text-cream-100/80">{scene.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
