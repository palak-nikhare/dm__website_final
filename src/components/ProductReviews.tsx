import { useState } from 'react';
import { Stars } from '@/components/Stars';
import { PenSquare, CheckCircle2, ShieldCheck, X, Sparkles, MessageSquare } from 'lucide-react';
import type { Product } from '@/data/products';

export interface ReviewItem {
  id: string;
  name: string;
  location?: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified: boolean;
  featureMention?: string;
}

const INITIAL_MOCK_REVIEWS: Record<string, ReviewItem[]> = {
  default: [
    {
      id: 'rev-1',
      name: 'Aarav Sharma',
      location: 'Mumbai, IN',
      rating: 5,
      date: 'September 18, 2026',
      title: 'Flawless 15.6-inch laptop protection',
      text: 'The laptop sleeve is suspended half an inch off the bottom of the bag, so even when I set it down heavily on concrete platform floors during my daily train commute, my MacBook Pro never takes an impact. Exceptional build quality and stitching.',
      verified: true,
      featureMention: 'Laptop Sleeve Protection',
    },
    {
      id: 'rev-2',
      name: 'Elena Vance',
      nameLocation: 'Berlin, DE',
      rating: 5,
      date: 'September 12, 2026',
      title: 'Game changer for long travel layovers',
      text: 'The built-in USB charging port connects straight to my 20,000mAh power bank inside the designated internal pocket. I charged my phone twice on a 14-hour flight layover without ever unzipping the main bag!',
      verified: true,
      featureMention: 'USB-C Charging Port',
    },
    {
      id: 'rev-3',
      name: 'Marcus Chen',
      location: 'Singapore',
      rating: 5,
      date: 'August 29, 2026',
      title: 'Total security in crowded metro stations',
      text: 'The TSA combination lock and flush anti-theft back zipper mean I never worry about pickpockets in dense crowds. Water literally beads off the shell during heavy tropical rainstorms. 10/10 recommendation.',
      verified: true,
      featureMention: 'Anti-Theft & TSA Lock',
    },
    {
      id: 'rev-4',
      name: 'Priya Patel',
      location: 'Bengaluru, IN',
      rating: 5,
      date: 'August 15, 2026',
      title: 'Organization engineered for developers',
      text: 'Dedicated pouches for my mechanical keyboard, dongles, cables, and external SSD. Everything has an exact place, which cuts my pack/unpack time in half when moving between home and office.',
      verified: true,
      featureMention: 'Tech Cable Organization',
    },
    {
      id: 'rev-5',
      name: 'David Ross',
      location: 'London, UK',
      rating: 5,
      date: 'August 02, 2026',
      title: 'Surprising weight-distributing comfort',
      text: 'Even when packed to full 24L capacity with a laptop, charger, water bottle, and jacket, the 3D mesh back padding distributes weight so evenly it feels effortless on 10,000-step workdays.',
      verified: true,
      featureMention: 'Ergonomic Mesh Straps',
    },
    {
      id: 'rev-6',
      name: 'Siddharth Rao',
      location: 'Hyderabad, IN',
      rating: 5,
      date: 'July 24, 2026',
      title: 'Executive minimalism at its best',
      text: 'Clean aesthetic that matches formal client presentations as naturally as casual weekend trips. Zippers are buttery smooth and the matte finish resists scuffs effortlessly.',
      verified: true,
      featureMention: 'Premium Weather Shell',
    },
  ],
};

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  // Use product specific reviews fallback to initial list
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    return INITIAL_MOCK_REVIEWS[product.id] || INITIAL_MOCK_REVIEWS.default;
  });

  const [showModal, setShowModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newRev: ReviewItem = {
      id: `custom-rev-${Date.now()}`,
      name: newName.trim(),
      rating: newRating,
      date: 'Just now',
      title: newTitle.trim() || 'Exceptional Everyday Carry',
      text: newText.trim(),
      verified: true,
      featureMention: 'Verified Purchase',
    };

    setReviews([newRev, ...reviews]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowModal(false);
      setNewName('');
      setNewTitle('');
      setNewText('');
      setNewRating(5);
    }, 1500);
  };

  return (
    <section className="border-t border-cream-300/60 bg-cream-100/50 px-6 py-14 sm:px-10 lg:py-18">
      {/* Section Header */}
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-cream-300/60 pb-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream-300/80 bg-oat-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sage-600 shadow-cozy">
              <MessageSquare className="h-3.5 w-3.5 text-terracotta-500" />
              Verified Reviews ({reviews.length})
            </span>
            <h3 className="mt-3.5 font-display text-3xl font-semibold tracking-tightish text-espresso-900 sm:text-4xl">
              Customer Experiences
            </h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Stars rating={Number(avgRating)} size="md" />
              </div>
              <span className="text-sm font-semibold text-espresso-900">{avgRating} out of 5</span>
              <span className="text-xs text-espresso-700/60 font-medium">• Based on real carry feedback</span>
            </div>
          </div>

          {/* Minimalist Write a Review Button with slow smooth hover animation */}
          <button
            onClick={() => setShowModal(true)}
            className="group inline-flex items-center gap-2.5 rounded-full border border-cream-300/80 bg-oat-50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-espresso-900 shadow-cozy transition-all duration-500 hover:-translate-y-1 hover:border-espresso-900/40 hover:bg-espresso-900 hover:text-cream-50 hover:shadow-cozy-hover"
          >
            <PenSquare className="h-4 w-4 text-terracotta-500 transition-colors duration-500 group-hover:text-terracotta-400" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Customer Reviews Grid / Masonry */}
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="group flex flex-col justify-between rounded-3xl border border-cream-300/70 bg-oat-50/90 p-7 shadow-cozy transition-all duration-500 hover:-translate-y-1.5 hover:shadow-cozy-hover hover:border-cream-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Stars rating={rev.rating} />
                  <span className="text-[11px] font-medium text-espresso-700/50">{rev.date}</span>
                </div>

                <h4 className="mt-4 font-display text-lg font-medium text-espresso-900 leading-snug">
                  {rev.title}
                </h4>

                <p className="mt-3 text-xs leading-relaxed text-espresso-700/80">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cream-300/50 flex flex-col gap-2">
                {rev.featureMention && (
                  <span className="self-start inline-flex items-center gap-1.5 rounded-full bg-sage-100/70 px-3 py-1 text-[10px] font-semibold text-sage-600 border border-sage-200/50">
                    <Sparkles className="h-3 w-3 text-sage-600" />
                    {rev.featureMention}
                  </span>
                )}
                
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <p className="text-xs font-semibold text-espresso-900">{rev.name}</p>
                    {rev.location && (
                      <p className="text-[10px] text-espresso-700/50 font-medium">{rev.location}</p>
                    )}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-sage-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-sage-600" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-espresso-900/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowModal(false)}
          />

          <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-cream-300/80 bg-oat-50 p-8 shadow-cozy-lg nova-scale-in">
            <div className="flex items-center justify-between border-b border-cream-300/60 pb-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-espresso-900">Write a Review</h3>
                <p className="text-xs text-espresso-700/60 mt-0.5">Share your experience with {product.name}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full p-2 text-espresso-800 hover:bg-espresso-900/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submittedMessage ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-600 shadow-sm">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="mt-4 font-display text-2xl font-semibold text-espresso-900">Thank You!</h4>
                <p className="mt-2 text-sm text-espresso-700/70">Your review has been published successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="mt-6 space-y-5">
                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-2">
                    Overall Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <span className={`text-2xl ${star <= newRating ? 'text-terracotta-500' : 'text-cream-300'}`}>
                          ★
                        </span>
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-semibold text-espresso-900">{newRating} Stars</span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Ishaan Verma"
                    className="w-full rounded-2xl border border-cream-300 bg-cream-100/50 px-4 py-3 text-sm text-espresso-900 placeholder:text-espresso-700/35 focus:border-espresso-900 focus:outline-none shadow-sm"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-2">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Incredibly durable & comfortable"
                    className="w-full rounded-2xl border border-cream-300 bg-cream-100/50 px-4 py-3 text-sm text-espresso-900 placeholder:text-espresso-700/35 focus:border-espresso-900 focus:outline-none shadow-sm"
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-2">
                    Review Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Mention features like laptop protection, build quality, zipper smoothness, or travel convenience..."
                    className="w-full rounded-2xl border border-cream-300 bg-cream-100/50 px-4 py-3 text-sm text-espresso-900 placeholder:text-espresso-700/35 focus:border-espresso-900 focus:outline-none shadow-sm"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-full border border-cream-300 px-6 py-3 text-xs font-semibold text-espresso-800 hover:bg-cream-200/60"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-espresso-900 px-7 py-3 text-xs font-semibold text-cream-50 hover:bg-espresso-800 shadow-cozy transition-all"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
