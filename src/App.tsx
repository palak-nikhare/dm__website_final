import { useState } from 'react';
import { StoreProvider } from '@/store/StoreContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Highlights } from '@/components/Highlights';
import { ShopSection } from '@/components/ShopSection';
import { PopularThisWeek } from '@/components/PopularThisWeek';
import { Technology } from '@/components/Technology';
import { Organization } from '@/components/Organization';
import { WhatFitsInside } from '@/components/WhatFitsInside';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { Lifestyle } from '@/components/Lifestyle';
import { ColorCollection } from '@/components/ColorCollection';
import { Reviews } from '@/components/Reviews';
import { PromoBanner } from '@/components/PromoBanner';
import { Footer } from '@/components/Footer';
import { ProductDetail } from '@/components/ProductDetail';
import { CartDrawer } from '@/components/CartDrawer';
import { Checkout } from '@/components/Checkout';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import type { Product } from '@/data/products';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  const handleView = (product: Product) => setSelectedProduct(product);

  const handleBuyNowCart = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <StoreProvider>
      <Navbar onCartClick={() => setCartOpen(true)} onWishlistClick={() => setWishlistOpen(true)} />

      <main>
        <Hero
          onShopClick={() => scrollTo('#shop')}
          onTechClick={() => scrollTo('#technology')}
        />
        <Highlights />
        <ShopSection onView={handleView} />
        <PopularThisWeek onView={handleView} />
        <Technology />
        <Organization />
        <WhatFitsInside />
        <FeaturesGrid />
        <Lifestyle />
        <ColorCollection onView={handleView} />
        <Reviews />
        <PromoBanner onShopClick={() => scrollTo('#shop')} />
      </main>

      <Footer />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onView={handleView}
          onCartClick={() => setCartOpen(true)}
        />
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleBuyNowCart}
      />

      <Checkout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onView={handleView}
      />
    </StoreProvider>
  );
}

export default App;
