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
    <div className="min-h-screen bg-cream-100/40 pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        {/* Top Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream-300/80 bg-oat-50 px-4.5 py-2 text-xs font-semibold uppercase tracking-widest text-sage-600 shadow-cozy">
            <ShieldCheck className="h-4 w-4 text-terracotta-500" />
            NEXUS Assurance Program
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tightish text-espresso-900 sm:text-5xl">
            Warranty & Registration
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-base text-espresso-700/75 leading-relaxed">
            Protect your investment with 2-Year International Warranty coverage and priority support. Register your backpack below.
          </p>
        </div>

        {/* Form or Success Screen */}
        <div className="mt-14">
          {submitted ? (
            <div className="rounded-3xl border border-cream-300/70 bg-oat-50/90 p-9 sm:p-14 shadow-cozy-lg nova-scale-in">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-100 text-sage-600 shadow-sm">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <span className="mt-6 rounded-full bg-sage-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-sage-600">
                  Registration Complete
                </span>
                <h2 className="mt-3 font-display text-3xl font-semibold text-espresso-900">
                  Your Warranty is Active!
                </h2>
                <p className="mt-2 text-sm text-espresso-700/70 max-w-md">
                  Thank you, <strong className="text-espresso-900">{fullName}</strong>. A confirmation email with your warranty certificate has been sent to <strong className="text-espresso-900">{email}</strong>.
                </p>

                {/* Registration Details Summary Card */}
                <div className="mt-8 w-full max-w-lg rounded-2xl border border-cream-300/70 bg-cream-100/50 p-6 text-left shadow-cozy">
                  <div className="flex items-center justify-between border-b border-cream-300/60 pb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-espresso-700/50">
                      Registration ID
                    </span>
                    <span className="font-mono text-sm font-bold text-espresso-900">
                      {registrationId}
                    </span>
                  </div>
                  <dl className="mt-4 grid grid-cols-1 gap-y-3 sm:grid-cols-2 text-sm">
                    <div>
                      <dt className="text-xs text-espresso-700/50">Product Model</dt>
                      <dd className="mt-0.5 font-medium text-espresso-900">
                        {selectedProductObj ? selectedProductObj.name : productModel}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-espresso-700/50">Serial Number</dt>
                      <dd className="mt-0.5 font-mono font-medium text-espresso-900">
                        {serialNumber}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-espresso-700/50">Date of Purchase</dt>
                      <dd className="mt-0.5 font-medium text-espresso-900">
                        {purchaseDate}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-espresso-700/50">Warranty Duration</dt>
                      <dd className="mt-0.5 font-semibold text-sage-600">
                        2 Years (Active)
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Action buttons */}
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-300 bg-oat-50 px-6 py-3.5 text-sm font-semibold text-espresso-900 hover:bg-cream-200 transition-colors shadow-cozy"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Register Another Product
                  </button>
                  <button
                    onClick={onNavigateHome}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-espresso-900 px-7 py-3.5 text-sm font-semibold text-cream-50 hover:bg-espresso-800 transition-all shadow-cozy hover:shadow-cozy-hover"
                  >
                    Return to Catalog
                    <ArrowRight className="h-4 w-4 text-terracotta-400" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-cream-300/70 bg-oat-50/90 p-8 sm:p-14 shadow-cozy-lg">
              <div className="mb-8 border-b border-cream-300/60 pb-6">
                <h2 className="font-display text-2xl font-semibold text-espresso-900">
                  Product Registration Form
                </h2>
                <p className="mt-1 text-sm text-espresso-700/65">
                  Please fill out the details from your purchase receipt.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name & Email */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso-700/40" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Aarav Mehta"
                        className={`w-full rounded-2xl border bg-cream-100/50 py-3 pl-10 pr-4 text-sm text-espresso-900 placeholder-espresso-700/35 focus:outline-none transition-colors shadow-sm ${
                          errors.fullName
                            ? 'border-terracotta-500 focus:border-terracotta-600'
                            : 'border-cream-300 focus:border-espresso-900'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-terracotta-500 font-medium">
                        <AlertCircle className="h-3 w-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso-700/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aarav@example.com"
                        className={`w-full rounded-2xl border bg-cream-100/50 py-3 pl-10 pr-4 text-sm text-espresso-900 placeholder-espresso-700/35 focus:outline-none transition-colors shadow-sm ${
                          errors.email
                            ? 'border-terracotta-500 focus:border-terracotta-600'
                            : 'border-cream-300 focus:border-espresso-900'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-terracotta-500 font-medium">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Product Model Dropdown */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-2">
                    Product Model *
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso-700/40" />
                    <select
                      value={productModel}
                      onChange={(e) => setProductModel(e.target.value)}
                      className={`w-full rounded-2xl border bg-cream-100/50 py-3 pl-10 pr-4 text-sm text-espresso-900 focus:outline-none transition-colors shadow-sm ${
                        errors.productModel
                          ? 'border-terracotta-500 focus:border-terracotta-600'
                          : 'border-cream-300 focus:border-espresso-900'
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
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-terracotta-500 font-medium">
                      <AlertCircle className="h-3 w-3" />
                      {errors.productModel}
                    </p>
                  )}
                </div>

                {/* Serial Number & Date of Purchase */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-2">
                      Serial Number *
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso-700/40" />
                      <input
                        type="text"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        placeholder="e.g. NX-2026-8894"
                        className={`w-full rounded-2xl border bg-cream-100/50 py-3 pl-10 pr-4 text-sm font-mono text-espresso-900 placeholder-espresso-700/35 focus:outline-none transition-colors shadow-sm ${
                          errors.serialNumber
                            ? 'border-terracotta-500 focus:border-terracotta-600'
                            : 'border-cream-300 focus:border-espresso-900'
                        }`}
                      />
                    </div>
                    {errors.serialNumber ? (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-terracotta-500 font-medium">
                        <AlertCircle className="h-3 w-3" />
                        {errors.serialNumber}
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-espresso-700/50">
                        Located on the internal care tag near the main laptop sleeve.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-espresso-700/70 mb-2">
                      Date of Purchase *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso-700/40" />
                      <input
                        type="date"
                        value={purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        className={`w-full rounded-2xl border bg-cream-100/50 py-3 pl-10 pr-4 text-sm text-espresso-900 focus:outline-none transition-colors shadow-sm ${
                          errors.purchaseDate
                            ? 'border-terracotta-500 focus:border-terracotta-600'
                            : 'border-cream-300 focus:border-espresso-900'
                        }`}
                      />
                    </div>
                    {errors.purchaseDate && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-terracotta-500 font-medium">
                        <AlertCircle className="h-3 w-3" />
                        {errors.purchaseDate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-6 border-t border-cream-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-espresso-700/50">
                    By submitting, you agree to NEXUS warranty terms & conditions.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-espresso-900 px-8 py-4 text-sm font-semibold text-cream-50 hover:bg-espresso-800 transition-all shadow-cozy hover:shadow-cozy-hover hover:-translate-y-0.5"
                  >
                    Submit Registration
                    <ArrowRight className="h-4 w-4 text-terracotta-400" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Warranty Highlights Cards */}
        <div className="mt-18 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-cream-300/60 bg-oat-50/90 p-7 shadow-cozy">
            <ShieldCheck className="h-7 w-7 text-sage-600" />
            <h3 className="mt-4 font-display text-xl font-medium text-espresso-900">2-Year Coverage</h3>
            <p className="mt-2 text-xs leading-relaxed text-espresso-700/70">
              Covers zippers, seams, buckles, and fabric defects under normal carry conditions.
            </p>
          </div>
          <div className="rounded-3xl border border-cream-300/60 bg-oat-50/90 p-7 shadow-cozy">
            <Sparkles className="h-7 w-7 text-terracotta-500" />
            <h3 className="mt-4 font-display text-xl font-medium text-espresso-900">Priority Support</h3>
            <p className="mt-2 text-xs leading-relaxed text-espresso-700/70">
              Registered customers get fast-track customer support and complimentary replacement parts.
            </p>
          </div>
          <div className="rounded-3xl border border-cream-300/60 bg-oat-50/90 p-7 shadow-cozy">
            <RotateCcw className="h-7 w-7 text-sage-600" />
            <h3 className="mt-4 font-display text-xl font-medium text-espresso-900">Hassle-Free Repair</h3>
            <p className="mt-2 text-xs leading-relaxed text-espresso-700/70">
              Free return shipping for warranty repair or direct product replacement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
