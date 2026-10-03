import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Truck,
  RotateCcw,
  Mail,
  Clock,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Send
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Waterproofing & Care',
    question: 'Are NEXUS backpacks water-resistant?',
    answer:
      'Yes! All NEXUS backpacks are engineered with hydrophobic technical weaves (such as water-repellent Oxford fabrics, ballistics nylon, or waxed canvas) paired with water-resistant seam flaps and coated zippers. Water beads off the shell during heavy downpours, keeping your laptop and electronic gear completely dry.',
  },
  {
    category: 'Smart Tech Features',
    question: 'How does the built-in USB charging port work?',
    answer:
      'Our smart packs feature an internal USB pass-through cable connected to a dedicated internal power-bank pocket. Simply attach your portable charger inside the bag, then connect your smartphone cable directly to the exterior USB port to charge on the go during commutes or airport layovers.',
  },
  {
    category: 'Laptop Compatibility',
    question: 'What size laptops fit inside the computer sleeves?',
    answer:
      'Most NEXUS models accommodate up to 15.6-inch laptops, while executive models like Apex and Executive fit up to 17-inch devices. Every laptop sleeve is fleece-lined and suspended half an inch off the bottom of the bag so your device never takes direct ground impacts.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'Do you ship internationally?',
    answer:
      'Yes! We provide complimentary tracked shipping across all pincodes in India (2–4 business days) and reliable international express shipping to over 45 countries worldwide (5–8 business days). Live tracking numbers are emailed as soon as your bag dispatches.',
  },
  {
    category: 'Returns & Guarantee',
    question: 'What is the 30-Day Cozy Return Policy?',
    answer:
      'We stand behind our carry experience. If your bag is not ideal for your daily commute, you can return it within 30 days of delivery in original condition for a full refund or hassle-free exchange. Return shipping is 100% complimentary.',
  },
  {
    category: 'Warranty & Registration',
    question: 'How does the Lifetime Warranty work?',
    answer:
      'Every authentic NEXUS backpack comes with a unique serial number located inside the interior pocket. Simply register your product on our /warranty portal to activate lifetime coverage against zipper failures, stitching defects, and hardware issues.',
  },
];

export function HelpPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactEmail.trim() && contactMessage.trim()) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      }, 3000);
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-oat-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream-300/80 bg-oat-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sage-600 shadow-cozy">
            <HelpCircle className="h-3.5 w-3.5 text-terracotta-500" />
            Help Center & Support
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl lg:text-6xl">
            How Can We Help You?
          </h1>

          {/* About Us / Brand Statement */}
          <p className="mt-5 text-base leading-relaxed text-espresso-700/80 sm:text-lg">
            NEXUS is dedicated to crafting premium, intelligent everyday carry tailored for the way you commute, work, create, and wander. Find answers to common questions, essential policies, or connect directly with our support team below.
          </p>
        </div>

        {/* Essential Policies Cards */}
        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <PolicyCard
            icon={Truck}
            title="Shipping & Delivery"
            tagline="Free Tracked Dispatch"
            description="Complimentary express delivery across India in 2–4 business days. International express delivery in 5–8 business days with live GPS tracking updates."
          />
          <PolicyCard
            icon={RotateCcw}
            title="30-Day Cozy Guarantee"
            tagline="Hassle-Free Returns"
            description="Take 30 days to test your backpack on your daily commute. If it doesn't fit your routine perfectly, return it in original condition for a full refund."
          />
          <PolicyCard
            icon={ShieldCheck}
            title="Lifetime Craft Warranty"
            tagline="Hardware & Seam Protection"
            description="Every bag is backed by our craft guarantee covering zippers, seams, and structural materials. Easily register your serial number on our Warranty page."
            actionLink="/warranty"
            actionText="Register Your Bag"
          />
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-20">
          <div className="flex flex-col items-center text-center">
            <span className="rounded-full bg-sage-100/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sage-600 border border-sage-200/50">
              Customer Questions
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-espresso-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-espresso-700/60 max-w-xl">
              Quick answers regarding waterproofing, laptop sleeve sizing, power bank integration, and warranty claims.
            </p>
          </div>

          <div className="mt-10 mx-auto max-w-4xl space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-3xl border border-cream-300/80 bg-oat-50/90 shadow-cozy transition-all duration-500 hover:shadow-cozy-hover overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-6 sm:p-7 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3.5 pr-4">
                      <span className="rounded-full bg-sage-100/70 p-2 text-sage-600 border border-sage-200/40">
                        <Sparkles className="h-4 w-4 text-terracotta-500" />
                      </span>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-espresso-700/50">
                          {faq.category}
                        </span>
                        <h3 className="font-display text-lg font-medium text-espresso-900 leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream-300/80 bg-cream-100/60 transition-transform duration-400 ${
                        isOpen ? 'rotate-180 bg-espresso-900 text-cream-50' : 'text-espresso-800'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-7 sm:px-7 border-t border-cream-300/40 pt-4 nova-fade-up">
                      <p className="text-sm leading-relaxed text-espresso-700/80">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Information & Support Section */}
        <div className="mt-20 mx-auto max-w-5xl rounded-[2.5rem] border border-cream-300/80 bg-oat-50/95 p-8 sm:p-12 lg:p-16 shadow-cozy-lg">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream-300/80 bg-cream-100/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-espresso-700">
                <MessageSquare className="h-3.5 w-3.5 text-terracotta-500" />
                Contact Support
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightish text-espresso-900 sm:text-4xl">
                We're Here for You
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-espresso-700/70">
                Have a specific question about product sizing, shipping status, or corporate custom orders? Our cozy carry specialists respond to every message within 4 hours.
              </p>

              <div className="mt-8 space-y-4 border-t border-cream-300/60 pt-6">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100/80 text-sage-600 border border-sage-200/50">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs text-espresso-700/50 font-semibold uppercase tracking-wider">Email Support</p>
                    <p className="font-display text-sm font-semibold text-espresso-900">support@nexuscarry.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100/80 text-sage-600 border border-sage-200/50">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs text-espresso-700/50 font-semibold uppercase tracking-wider">Response Hours</p>
                    <p className="font-display text-sm font-semibold text-espresso-900">Mon – Sat: 9:00 AM – 9:00 PM IST (under 4h response)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Support Message Form */}
            <div className="rounded-3xl border border-cream-300/80 bg-cream-100/60 p-6 sm:p-8 shadow-cozy">
              {contactSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600 shadow-sm">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-espresso-900">Message Received!</h3>
                  <p className="mt-2 text-xs text-espresso-700/70">
                    Thanks for reaching out! A NEXUS support specialist will reply to {contactEmail} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="font-display text-lg font-semibold text-espresso-900">Send us a message</h3>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-2xl border border-cream-300 bg-oat-50 px-4 py-2.5 text-xs text-espresso-900 placeholder:text-espresso-700/35 focus:border-espresso-900 focus:outline-none shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full rounded-2xl border border-cream-300 bg-oat-50 px-4 py-2.5 text-xs text-espresso-900 placeholder:text-espresso-700/35 focus:border-espresso-900 focus:outline-none shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-1.5">
                      How can we help?
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Ask about product sizing, warranty, shipping status..."
                      className="w-full rounded-2xl border border-cream-300 bg-oat-50 px-4 py-2.5 text-xs text-espresso-900 placeholder:text-espresso-700/35 focus:border-espresso-900 focus:outline-none shadow-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-espresso-900 py-3 text-xs font-semibold text-cream-50 shadow-cozy transition-all duration-300 hover:bg-espresso-800 hover:shadow-cozy-hover"
                  >
                    <Send className="h-3.5 w-3.5 text-terracotta-400" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolicyCard({
  icon: Icon,
  title,
  tagline,
  description,
  actionLink,
  actionText,
}: {
  icon: typeof Truck;
  title: string;
  tagline: string;
  description: string;
  actionLink?: string;
  actionText?: string;
}) {
  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-cream-300/80 bg-oat-50/90 p-7 shadow-cozy transition-all duration-500 hover:-translate-y-1.5 hover:shadow-cozy-hover">
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100/80 text-sage-600 border border-sage-200/50 shadow-sm transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6 text-terracotta-500" />
        </div>
        <span className="mt-5 inline-block text-[10px] font-semibold uppercase tracking-widest text-espresso-700/50">
          {tagline}
        </span>
        <h3 className="mt-1 font-display text-xl font-medium text-espresso-900">{title}</h3>
        <p className="mt-3 text-xs leading-relaxed text-espresso-700/80">{description}</p>
      </div>

      {actionLink && actionText && (
        <div className="mt-6 pt-4 border-t border-cream-300/50">
          <Link
            to={actionLink}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta-500 hover:text-espresso-900 transition-colors"
          >
            {actionText} →
          </Link>
        </div>
      )}
    </div>
  );
}
