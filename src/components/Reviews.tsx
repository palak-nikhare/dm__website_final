import { REVIEWS } from '@/data/products';
import { Stars } from '@/components/Stars';
import { Quote } from 'lucide-react';

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-cream-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-olive-500">Reviews</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tightish text-charcoal-900 sm:text-5xl">
            Loved by people on the move.
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Stars rating={4.8} size="md" />
            <span className="text-sm text-charcoal-800/60">4.8 average · 1,200+ reviews</span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col rounded-2xl border border-charcoal-900/8 bg-cream-100 p-6 transition-all hover:shadow-lg"
            >
              <Quote className="h-7 w-7 text-olive-500/30" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal-800/75">"{review.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-charcoal-900/8 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-500/15 text-sm font-semibold text-olive-500">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal-900">{review.name}</p>
                  <p className="text-xs text-charcoal-800/50">{review.role}</p>
                </div>
                <div className="ml-auto">
                  <Stars rating={review.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-charcoal-800/40">
          Reviews are fictional demo testimonials created for this academic project.
        </p>
      </div>
    </section>
  );
}
