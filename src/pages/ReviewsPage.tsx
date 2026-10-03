import { Reviews } from '@/components/Reviews';
import { ProductReviews } from '@/components/ProductReviews';
import { PRODUCTS } from '@/data/products';

export function ReviewsPage() {
  const featuredProduct = PRODUCTS[0];

  return (
    <div className="pt-28 sm:pt-36 pb-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 mb-8">
        <span className="inline-block rounded-full bg-sage-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sage-600 border border-sage-200/50 shadow-cozy">
          Verified Feedback
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
          Customer Reviews & Testimonials
        </h1>
        <p className="mt-2 text-base text-espresso-700/70 max-w-2xl">
          Real stories and reviews from professionals, students, and travelers carrying NEXUS.
        </p>
      </div>

      <Reviews />
      <div className="mt-12">
        <ProductReviews product={featuredProduct} />
      </div>
    </div>
  );
}
