import { REVIEWS } from '@/data/products';
import { Stars } from '@/components/Stars';
import { Quote } from 'lucide-react';

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-cream-100/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">Community Reviews</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
            Loved by people on the move.
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2.5">
            <Stars rating={4.8} size="md" />
            <span className="text-xs font-medium text-espresso-700/60">4.8 average rating · 1,200+ verified reviews</span>
          </div>
        </div>

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col rounded-3xl border border-cream-300/60 bg-oat-50/90 p-7 shadow-cozy transition-all duration-500 hover:-translate-y-1.5 hover:shadow-cozy-hover"
            >
              <Quote className="h-8 w-8 text-terracotta-400/40" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-espresso-700/80">"{review.text}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-cream-300/50 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-xs font-bold text-sage-600 shadow-sm">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-espresso-900">{review.name}</p>
                  <p className="text-[11px] font-medium text-espresso-700/50">{review.role}</p>
                </div>
                <div className="ml-auto">
                  <Stars rating={review.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-espresso-700/40">
          Reviews are demo testimonials created for this showcase project.
        </p>
      </div>
    </section>
  );
}
