import { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Zap, Truck, ShieldCheck, RotateCcw, Minus, Plus, Check, Maximize2 } from 'lucide-react';
import type { Product, ColorKey } from '@/data/products';
import { COLORS, PRODUCTS, imageForColor } from '@/data/products';
import { useStore } from '@/store/StoreContext';
import { Stars } from '@/components/Stars';
import { ProductCard } from '@/components/ProductCard';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onView: (product: Product) => void;
  onCartClick: () => void;
}

export function ProductDetail({ product, onClose, onView, onCartClick }: ProductDetailProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [color, setColor] = useState<ColorKey>(product.defaultColor);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    setColor(product.defaultColor);
    setActiveImage(0);
    setQuantity(1);
    setAdded(false);
    setZoomed(false);
  }, [product]);

  const selectedImage = imageForColor(product, color);
  const gallery = [selectedImage, ...product.images.filter((image) => image !== selectedImage)];
  const imageLabel = (image: string) => {
    if (image.includes('details')) return 'Detail view';
    if (image === selectedImage && !product.colorImages?.[color]) return 'Front view';
    const photographedColor = product.colors.find((key) => product.colorImages?.[key] === image);
    return photographedColor ? COLORS[photographedColor].name : 'Front view';
  };
  const wished = isWishlisted(product.id);
  const recommendations = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, color, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, color, quantity);
    onCartClick();
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative min-h-full">
        <div className="mx-auto my-0 max-w-6xl bg-cream-100 sm:my-8">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-charcoal-900/8 bg-cream-100/95 px-5 py-4 backdrop-blur-md sm:px-8">
            <span className="font-display text-lg font-medium text-charcoal-900">{product.name}</span>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-charcoal-800 transition-colors hover:bg-charcoal-900/5"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
            {/* Gallery */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <button onClick={() => setZoomed(true)} className="group/image relative block w-full overflow-hidden bg-[#ede9e1]" aria-label={`Enlarge ${product.name} image`}>
                <img
                  src={gallery[activeImage]}
                  alt={`${product.name} product view ${activeImage + 1}`}
                  className="aspect-square w-full object-contain p-3 nova-scale-in"
                  key={`${color}-${activeImage}`}
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
                <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-cream-100/90 px-3 py-2 text-xs font-medium text-charcoal-900 opacity-100 backdrop-blur sm:opacity-0 sm:transition-opacity sm:group-hover/image:opacity-100"><Maximize2 className="h-3.5 w-3.5" /> Enlarge</span>
              </button>
              {gallery.length > 1 && <div className="mt-4 grid grid-cols-6 gap-2">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(index)}
                    className={`overflow-hidden rounded-lg border-2 transition-all ${
                      activeImage === index ? 'border-charcoal-900' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt={`${product.name} in ${imageLabel(image)}`} className="aspect-square w-full object-contain" loading="lazy" />
                    <span className="block truncate px-1 pb-1 text-[9px] text-charcoal-800/60">{imageLabel(image)}</span>
                  </button>
                ))}
              </div>}
            </div>

            {/* Info */}
            <div>
              {product.badge && (
                <span className="inline-block rounded-full bg-olive-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-olive-500">
                  {product.badge}
                </span>
              )}
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tightish text-charcoal-900 sm:text-4xl">
                {product.name}
              </h2>
              <div className="mt-3 flex items-center gap-2">
                <Stars rating={product.rating} size="md" />
                <span className="text-sm text-charcoal-800/60">
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold text-charcoal-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-charcoal-800/40 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="rounded-full bg-burgundy/10 px-2 py-0.5 text-xs font-semibold text-burgundy">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>

              <p className="mt-5 text-base leading-relaxed text-charcoal-800/70">{product.longDescription}</p>

              {/* Color selection */}
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-charcoal-900">Choose your color</p>
                  <p className="text-sm text-charcoal-800/60">Color: <span className="font-medium text-charcoal-900">{COLORS[color].name}</span></p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {product.colors.map((ck) => (
                    <button
                      key={ck}
                      onClick={() => { setColor(ck); setActiveImage(0); }}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                        color === ck ? 'border-charcoal-900 scale-110' : 'border-charcoal-900/15 hover:border-charcoal-900/30'
                      }`}
                      style={{ backgroundColor: COLORS[ck].hex }}
                      title={COLORS[ck].name}
                      aria-label={COLORS[ck].name}
                    >
                      {color === ck && (
                        <Check className={`h-4 w-4 ${ck === 'cream' || ck === 'sand' ? 'text-charcoal-900' : 'text-cream-100'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-7">
                <p className="text-sm font-medium text-charcoal-900">Quantity</p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-charcoal-900/15">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-800 transition-colors hover:bg-charcoal-900/5"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium text-charcoal-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-800 transition-colors hover:bg-charcoal-900/5"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-charcoal-800/60">
                    Total: <span className="font-medium text-charcoal-900">₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleAddToCart}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all ${
                    added ? 'bg-olive-500 text-cream-100' : 'bg-charcoal-900 text-cream-100 hover:bg-charcoal-800 hover:shadow-lg'
                  }`}
                >
                  {added ? (<><Check className="h-4 w-4" /> Added to Cart</>) : (<><ShoppingBag className="h-4 w-4" /> Add to Cart</>)}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-charcoal-900/20 px-6 py-3.5 text-sm font-medium text-charcoal-900 transition-all hover:border-charcoal-900/40 hover:bg-cream-50"
                >
                  <Zap className="h-4 w-4" /> Buy Now
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                  wished ? 'bg-burgundy/10 text-burgundy' : 'border border-charcoal-900/15 text-charcoal-800 hover:border-charcoal-900/30'
                }`}
              >
                <Heart className={`h-4 w-4 ${wished ? 'fill-burgundy' : ''}`} />
                {wished ? 'In Wishlist' : 'Add to Wishlist'}
              </button>

              {/* Trust badges */}
              <div className="mt-7 grid grid-cols-3 gap-3 border-t border-charcoal-900/8 pt-6">
                <TrustBadge icon={Truck} label="Free delivery" />
                <TrustBadge icon={ShieldCheck} label="Secure checkout" />
                <TrustBadge icon={RotateCcw} label="30-day return" />
              </div>
            </div>
          </div>

          <section className="border-t border-charcoal-900/10 px-5 py-12 sm:px-8 sm:py-16">
            <div className="grid items-center gap-8 bg-[#eae5dc] lg:grid-cols-[1.15fr_.85fr]">
              <img src={product.images[0]} alt={`${product.name} design story`} className="aspect-[4/3] h-full w-full object-contain p-4" loading="lazy" sizes="(min-width: 1024px) 600px, 100vw" />
              <div className="p-6 sm:p-10 lg:pl-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive-500">The design story</p>
                <h3 className="mt-3 font-display text-3xl text-charcoal-900">Professional carry, reduced to its essentials.</h3>
                <p className="mt-4 text-sm leading-7 text-charcoal-800/65">A composed silhouette, understated NEXUS identity and carefully organized storage make {product.name} feel equally at home from morning commute to evening plans.</p>
                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">{product.features.slice(0,4).map((feature)=><div key={feature} className="border-t border-charcoal-900/15 pt-3 text-sm text-charcoal-800/75">{feature}</div>)}</div>
              </div>
            </div>
          </section>

          <div className="grid gap-10 border-t border-charcoal-900/10 px-5 py-10 sm:px-8 lg:grid-cols-2">
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive-500">Product specification</p>
              <h3 className="mt-3 font-display text-2xl text-charcoal-900">Designed around the working day</h3>
              <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-charcoal-900/10 py-5 text-sm">
                <div><dt className="text-charcoal-800/50">Height</dt><dd className="mt-1 font-medium">{product.dimensions.height} cm</dd></div>
                <div><dt className="text-charcoal-800/50">Width</dt><dd className="mt-1 font-medium">{product.dimensions.width} cm</dd></div>
                <div><dt className="text-charcoal-800/50">Depth</dt><dd className="mt-1 font-medium">{product.dimensions.depth} cm</dd></div>
              </dl>
              <p className="mt-5 text-sm leading-relaxed text-charcoal-800/70"><span className="font-medium text-charcoal-900">Material:</span> {product.material}</p>
              <ul className="mt-5 space-y-3">
                {product.features.map((feature) => <li key={feature} className="flex gap-3 text-sm text-charcoal-800/75"><Check className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" />{feature}</li>)}
              </ul>
              <p className="mt-6 border-t border-charcoal-900/10 pt-5 text-sm text-charcoal-800/65">Complimentary tracked delivery. Returns are accepted within 30 days in original condition.</p>
            </section>
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive-500">Sample reviews</p>
              <h3 className="mt-3 font-display text-2xl text-charcoal-900">Notes from the NEXUS community</h3>
              <div className="mt-6 space-y-4">
                {product.demoReviews.map((review) => <article key={review.name} className="border border-charcoal-900/10 bg-cream-50 p-5"><Stars rating={5} /><h4 className="mt-3 font-medium text-charcoal-900">{review.title}</h4><p className="mt-2 text-sm leading-relaxed text-charcoal-800/65">“{review.text}”</p><p className="mt-3 text-xs font-medium uppercase tracking-wider text-charcoal-800/50">{review.name} · Demo review</p></article>)}
              </div>
            </section>
          </div>

          {/* You may also like */}
          <div className="border-t border-charcoal-900/8 px-5 py-10 sm:px-8">
            <h3 className="font-display text-2xl font-medium text-charcoal-900">You may also like</h3>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
              {recommendations.map((p) => (
                <ProductCard key={p.id} product={p} onView={onView} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {zoomed && <div className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal-900/90 p-4 sm:p-10" onClick={() => setZoomed(false)} role="dialog" aria-modal="true" aria-label="Expanded product image"><button onClick={() => setZoomed(false)} className="absolute right-5 top-5 rounded-full bg-cream-100 p-3 text-charcoal-900" aria-label="Close expanded image"><X className="h-5 w-5" /></button><img src={gallery[activeImage]} alt={`${product.name} enlarged`} className="max-h-full max-w-full object-contain" onClick={(event) => event.stopPropagation()} /></div>}
    </div>
  );
}

function TrustBadge({ icon: Icon, label }: { icon: typeof Truck; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <Icon className="h-5 w-5 text-olive-500" />
      <span className="text-xs text-charcoal-800/70">{label}</span>
    </div>
  );
}
