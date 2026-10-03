import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, Tag } from 'lucide-react';

export function TopAnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-[55] bg-espresso-900 px-4 py-2 text-cream-50 shadow-cozy border-b border-cream-100/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex flex-1 items-center justify-center gap-2 text-center text-[11px] sm:text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-terracotta-500/30 px-2.5 py-0.5 font-semibold text-terracotta-300 border border-terracotta-500/40">
            <Sparkles className="h-3 w-3" /> Special Offer
          </span>
          <span className="font-medium text-cream-100/90 hidden md:inline">
            Complimentary Shipping on orders over ₹5,000 | Use code <strong className="text-terracotta-400 font-bold">NEXUS15</strong> for 15% OFF
          </span>
          <span className="font-medium text-cream-100/90 md:hidden truncate">
            Use code <strong className="text-terracotta-400 font-bold">NEXUS15</strong> for 15% OFF
          </span>
          <Link
            to="/offers"
            className="inline-flex items-center gap-1 font-semibold text-terracotta-400 hover:text-cream-50 transition-colors underline underline-offset-2 ml-1"
          >
            <Tag className="h-3 w-3" />
            <span>View Offers →</span>
          </Link>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="rounded-full p-1 text-cream-100/60 hover:bg-cream-100/10 hover:text-cream-50 transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
