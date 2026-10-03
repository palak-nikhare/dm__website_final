import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { StoreProvider } from '@/store/StoreContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductDetail } from '@/components/ProductDetail';
import { CartDrawer } from '@/components/CartDrawer';
import { Checkout } from '@/components/Checkout';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { ScrollToTop } from '@/components/ScrollToTop';

import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { FeaturesPage } from '@/pages/FeaturesPage';
import { TechnologyPage } from '@/pages/TechnologyPage';
import { WarrantyPage } from '@/pages/WarrantyPage';
import { ReviewsPage } from '@/pages/ReviewsPage';

import type { Product } from '@/data/products';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const handleView = (product: Product) => setSelectedProduct(product);

  const handleBuyNowCart = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <StoreProvider>
      <ScrollToTop />
      <Navbar
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={() => setWishlistOpen(true)}
      />

      <main className="min-h-screen bg-oat-50">
        <Routes>
          <Route path="/" element={<HomePage onView={handleView} />} />
          <Route path="/shop" element={<ShopPage onView={handleView} />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/warranty" element={<WarrantyPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="*" element={<HomePage onView={handleView} />} />
        </Routes>
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
