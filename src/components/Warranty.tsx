import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Calendar,
  Hash,
  Mail,
  User,
  Package
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';

interface WarrantyProps {
  onNavigateHome: () => void;
}

export function Warranty({ onNavigateHome }: WarrantyProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [productModel, setProductModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!productModel) {
      newErrors.productModel = 'Please select your NEXUS product model.';
    }

    if (!serialNumber.trim() || serialNumber.trim().length < 4) {
      newErrors.serialNumber = 'Please enter a valid serial number (min 4 characters).';
    }

    if (!purchaseDate) {
      newErrors.purchaseDate = 'Please select the date of purchase.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const randomReg = `NX-WAR-${Math.floor(100000 + Math.random() * 900000)}`;
      setRegistrationId(randomReg);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setProductModel('');
    setSerialNumber('');
    setPurchaseDate('');
    setErrors({});
    setSubmitted(false);
    setRegistrationId('');
  };

  const selectedProductObj = PRODUCTS.find((p) => p.id === productModel);

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* Top Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-charcoal-900/15 bg-cream-100 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-olive-500">
            <ShieldCheck className="h-4 w-4" />
            NEXUS Assurance Program
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tightish text-charcoal-900 sm:text-5xl">
            Warranty & Registration
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-base text-charcoal-800/70 leading-relaxed">
            Protect your investment with 2-Year International Warranty coverage and priority support. Register your backpack below.
          </p>
        </div>

        {/* Form or Success Screen */}
        <div className="mt-12">
          {submitted ? (
            <div className="rounded-3xl border border-charcoal-900/10 bg-cream-100 p-8 sm:p-12 shadow-xl nova-scale-in">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-olive-500/10 text-olive-500">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <span className="mt-6 rounded-full bg-olive-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-olive-500">
                  Registration Complete
                </span>
                <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900">
                  Your Warranty is Active!
                </h2>
                <p className="mt-2 text-sm text-charcoal-800/60 max-w-md">
                  Thank you, <strong className="text-charcoal-900">{fullName}</strong>. A confirmation email with your warranty certificate has been sent to <strong className="text-charcoal-900">{email}</strong>.
                </p>

                {/* Registration Details Summary Card */}
                <div className="mt-8 w-full max-w-lg rounded-2xl border border-charcoal-900/10 bg-cream-50 p-6 text-left shadow-sm">
                  <div className="flex items-center justify-between border-b border-charcoal-900/10 pb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-800/50">
                      Registration ID
                    </span>
                    <span className="font-mono text-sm font-bold text-charcoal-900">
                      {registrationId}
                    </span>
                  </div>
                  <dl className="mt-4 grid grid-cols-1 gap-y-3 sm:grid-cols-2 text-sm">
                    <div>
                      <dt className="text-xs text-charcoal-800/50">Product Model</dt>
                      <dd className="mt-0.5 font-medium text-charcoal-900">
                        {selectedProductObj ? selectedProductObj.name : productModel}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-charcoal-800/50">Serial Number</dt>
                      <dd className="mt-0.5 font-mono font-medium text-charcoal-900">
                        {serialNumber}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-charcoal-800/50">Date of Purchase</dt>
                      <dd className="mt-0.5 font-medium text-charcoal-900">
                        {purchaseDate}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-charcoal-800/50">Warranty Duration</dt>
                      <dd className="mt-0.5 font-medium text-olive-500">
                        2 Years (Active)
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Action buttons */}
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal-900/20 px-6 py-3 text-sm font-medium text-charcoal-900 hover:bg-cream-200 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Register Another Product
                  </button>
                  <button
                    onClick={onNavigateHome}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal-900 px-7 py-3 text-sm font-medium text-cream-100 hover:bg-charcoal-800 transition-all shadow-md"
                  >
                    Return to Catalog
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-charcoal-900/10 bg-cream-100 p-8 sm:p-12 shadow-lg">
              <div className="mb-8 border-b border-charcoal-900/10 pb-6">
                <h2 className="font-display text-2xl font-semibold text-charcoal-900">
                  Product Registration Form
                </h2>
                <p className="mt-1 text-sm text-charcoal-800/60">
                  Please fill out the details from your purchase receipt.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name & Email */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800/70 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-800/40" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Aarav Mehta"
                        className={`w-full rounded-xl border bg-cream-50 py-3 pl-10 pr-4 text-sm text-charcoal-900 placeholder-charcoal-800/35 focus:outline-none transition-colors ${
                          errors.fullName
                            ? 'border-burgundy focus:border-burgundy'
                            : 'border-charcoal-900/15 focus:border-charcoal-900'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-burgundy">
                        <AlertCircle className="h-3 w-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800/70 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-800/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aarav@example.com"
                        className={`w-full rounded-xl border bg-cream-50 py-3 pl-10 pr-4 text-sm text-charcoal-900 placeholder-charcoal-800/35 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-burgundy focus:border-burgundy'
                            : 'border-charcoal-900/15 focus:border-charcoal-900'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-burgundy">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Product Model Dropdown */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800/70 mb-2">
                    Product Model *
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-800/40" />
                    <select
                      value={productModel}
                      onChange={(e) => setProductModel(e.target.value)}
                      className={`w-full rounded-xl border bg-cream-50 py-3 pl-10 pr-4 text-sm text-charcoal-900 focus:outline-none transition-colors ${
                        errors.productModel
                          ? 'border-burgundy focus:border-burgundy'
                          : 'border-charcoal-900/15 focus:border-charcoal-900'
                      }`}
                    >
                      <option value="">Select your backpack model...</option>
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.tagline})
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.productModel && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-burgundy">
                      <AlertCircle className="h-3 w-3" />
                      {errors.productModel}
                    </p>
                  )}
                </div>

                {/* Serial Number & Date of Purchase */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800/70 mb-2">
                      Serial Number *
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-800/40" />
                      <input
                        type="text"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        placeholder="e.g. NX-2026-8894"
                        className={`w-full rounded-xl border bg-cream-50 py-3 pl-10 pr-4 text-sm font-mono text-charcoal-900 placeholder-charcoal-800/35 focus:outline-none transition-colors ${
                          errors.serialNumber
                            ? 'border-burgundy focus:border-burgundy'
                            : 'border-charcoal-900/15 focus:border-charcoal-900'
                        }`}
                      />
                    </div>
                    {errors.serialNumber ? (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-burgundy">
                        <AlertCircle className="h-3 w-3" />
                        {errors.serialNumber}
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-charcoal-800/50">
                        Located on the internal care tag near the main laptop sleeve.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-800/70 mb-2">
                      Date of Purchase *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-800/40" />
                      <input
                        type="date"
                        value={purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        className={`w-full rounded-xl border bg-cream-50 py-3 pl-10 pr-4 text-sm text-charcoal-900 focus:outline-none transition-colors ${
                          errors.purchaseDate
                            ? 'border-burgundy focus:border-burgundy'
                            : 'border-charcoal-900/15 focus:border-charcoal-900'
                        }`}
                      />
                    </div>
                    {errors.purchaseDate && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-burgundy">
                        <AlertCircle className="h-3 w-3" />
                        {errors.purchaseDate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-charcoal-900/10 flex items-center justify-between">
                  <p className="text-xs text-charcoal-800/50">
                    By submitting, you agree to NEXUS warranty terms & conditions.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-charcoal-900 px-8 py-3.5 text-sm font-medium text-cream-100 hover:bg-charcoal-800 transition-all shadow-md hover:shadow-lg"
                  >
                    Submit Registration
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Warranty Highlights Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-charcoal-900/10 bg-cream-100 p-6">
            <ShieldCheck className="h-6 w-6 text-olive-500" />
            <h3 className="mt-3 font-display text-lg font-medium text-charcoal-900">2-Year Coverage</h3>
            <p className="mt-1 text-xs leading-relaxed text-charcoal-800/60">
              Covers zippers, seams, buckles, and fabric defects under normal carry conditions.
            </p>
          </div>
          <div className="rounded-2xl border border-charcoal-900/10 bg-cream-100 p-6">
            <Sparkles className="h-6 w-6 text-olive-500" />
            <h3 className="mt-3 font-display text-lg font-medium text-charcoal-900">Priority Support</h3>
            <p className="mt-1 text-xs leading-relaxed text-charcoal-800/60">
              Registered customers get fast-track customer support and complimentary replacement parts.
            </p>
          </div>
          <div className="rounded-2xl border border-charcoal-900/10 bg-cream-100 p-6">
            <RotateCcw className="h-6 w-6 text-olive-500" />
            <h3 className="mt-3 font-display text-lg font-medium text-charcoal-900">Hassle-Free Repair</h3>
            <p className="mt-1 text-xs leading-relaxed text-charcoal-800/60">
              Free return shipping for warranty repair or direct product replacement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
