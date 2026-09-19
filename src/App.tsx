import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { UpsellModal } from './components/UpsellModal';
import { ThankYouModal } from './components/ThankYouModal';
import { DocsViewer } from './components/DocsViewer';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HERO_PRODUCTS } from './data/products';
import { Product, ProductBundleTier, CartItem, OrderCustomer, Order } from './types';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('biotin-hair-gummies');

  // Cart State (Starts empty, only containing products the user chooses)
  const [cart, setCart] = useState<CartItem[]>([]);

  // Modal Visibility States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);

  // Temporary Pending Customer Data & Completed Order
  const [pendingCustomer, setPendingCustomer] = useState<OrderCustomer | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedProductId]);

  // Handle Tab / Page Navigation
  const handleSelectTab = (tab: string, productId?: string) => {
    setActiveTab(tab);
    if (productId) {
      setSelectedProductId(productId);
    }
  };

  // Add Product with chosen Tier to Cart
  const handleAddToCart = (product: Product, tier: ProductBundleTier) => {
    setCart((prevCart) => {
      // If product already in cart, update tier
      const existingIdx = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx] = { product, selectedTier: tier, addedAt: Date.now() };
        return updated;
      }
      return [...prevCart, { product, selectedTier: tier, addedAt: Date.now() }];
    });
    // Open Cart Drawer immediately to show the items, tier savings and cross-sells
    setIsCartOpen(true);
  };

  // Quick Cross-Sell add directly from Cart Drawer
  const handleAddCrossSell = (product: Product) => {
    // Default to Tier 1 (199 SAR) for cross-sells
    const singleTier = product.tiers[0];
    handleAddToCart(product, singleTier);
  };

  // Remove Item from Cart by Index
  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Proceed from Cart Drawer to 2-Field Checkout Modal
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Calculate Subtotal and savings
  const cartSubtotal = cart.reduce((sum, item) => sum + item.selectedTier.priceSar, 0);
  const originalTotal = cart.reduce((sum, item) => sum + item.selectedTier.originalPriceSar, 0);
  const totalSavings = originalTotal - cartSubtotal;

  // Pick relevant upsell product (e.g. one not currently in cart, or Marine Collagen/Magnesium)
  const getUpsellProduct = (): Product => {
    const cartProductIds = cart.map((i) => i.product.id);
    const candidate = HERO_PRODUCTS.find((p) => !cartProductIds.includes(p.id));
    return candidate || HERO_PRODUCTS[1]; // fallback to Marine Collagen
  };

  const upsellProduct = getUpsellProduct();

  // Triggered when user submits 2-field form in CheckoutModal
  const handleCheckoutSubmit = (customer: OrderCustomer) => {
    setPendingCustomer(customer);
    setIsCheckoutOpen(false);
    // Trigger 10-15s Timed Upsell Modal (8 KWD offer) as requested!
    setIsUpsellOpen(true);
  };

  // Finalize order and simulate Webhook payload to Google Sheets / FastAPI backend
  const finalizeOrder = (acceptedUpsell: boolean) => {
    if (!pendingCustomer) return;

    const baseTotal = cartSubtotal;
    const upsellCost = acceptedUpsell ? 8 : 0;
    const finalTotal = baseTotal + upsellCost;
    const orderCode = `NAMA-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      orderCode,
      createdAt: new Date().toISOString(),
      customer: pendingCustomer,
      items: [...cart],
      hasUpsell: acceptedUpsell,
      upsellProduct: acceptedUpsell ? upsellProduct : undefined,
      upsellPriceSar: upsellCost,
      subtotalSar: cartSubtotal,
      discountSar: totalSavings + (acceptedUpsell ? 8 : 0),
      totalSar: finalTotal,
      paymentMethod: 'COD_CASH_ON_DELIVERY',
      status: 'PENDING_CONFIRMATION',
    };

    // Dispatch webhook to Google Sheets / Backend
    dispatchWebhook(newOrder);

    // Set confirmed order and open Thank You modal
    setConfirmedOrder(newOrder);
    setIsUpsellOpen(false);

    // Clear cart
    setCart([]);
  };

  const dispatchWebhook = async (order: Order) => {
    const payload = {
      order_code: order.orderCode,
      timestamp: order.createdAt,
      country: 'الكويت (Kuwait)',
      customer_name: order.customer.fullName,
      phone: order.customer.phone,
      city: order.customer.city,
      address_notes: order.customer.addressNotes || '',
      items: order.items.map((i) => ({
        product_id: i.product.id,
        title: i.product.title,
        tier: i.selectedTier.label,
        quantity: i.selectedTier.quantity,
        price_kwd: i.selectedTier.priceSar,
      })),
      has_upsell: order.hasUpsell,
      upsell_item: order.upsellProduct?.title || null,
      upsell_kwd: order.upsellPriceSar || 0,
      total_kwd: order.totalSar,
      currency: 'KWD',
      payment_method: 'COD (الدفع عند الاستلام)',
    };

    // Log payload for developer inspection
    console.log('[NAMA BEAUTY] 🚀 Dispatching Webhook to Google Sheets / Backend:', payload);

    try {
      if (typeof window !== 'undefined') {
        const webhookUrl = (window as unknown as { GOOGLE_SHEET_WEBHOOK_URL?: string }).GOOGLE_SHEET_WEBHOOK_URL;
        if (webhookUrl) {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        }
      }
    } catch (err) {
      console.warn('[NAMA BEAUTY] Webhook async dispatch notice:', err);
    }
  };

  // Find active product for product page
  const currentProduct =
    HERO_PRODUCTS.find((p) => p.id === selectedProductId) || HERO_PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2D3E36] font-arabic antialiased selection:bg-[#D4AF37] selection:text-[#0D382A]">
      {/* Header */}
      <Header
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main Routed Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onAddToCart={handleAddToCart}
            onViewProduct={(id) => handleSelectTab('product', id)}
            onViewCollections={() => handleSelectTab('collections')}
          />
        )}

        {activeTab === 'product' && (
          <ProductPage
            product={currentProduct}
            onAddToCart={handleAddToCart}
            onSelectOtherProduct={(tab) => handleSelectTab(tab)}
          />
        )}

        {activeTab === 'collections' && (
          <CollectionsPage
            onViewProduct={(id) => handleSelectTab('product', id)}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage onViewCollections={() => handleSelectTab('collections')} />
        )}

        {activeTab === 'contact' && <ContactPage />}

        {activeTab === 'docs' && <DocsViewer />}
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleSelectTab} />

      {/* 1. Cart Drawer (Slide-in with Items, Cross-sells, Free shipping bar) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onAddCrossSell={handleAddCrossSell}
        onOpenCheckout={handleProceedToCheckout}
        onViewProduct={(id) => {
          setIsCartOpen(false);
          handleSelectTab('product', id);
        }}
      />

      {/* 2. Strict 2-Field Saudi Checkout Modal (Name + Phone + City) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onSubmitValidCustomer={handleCheckoutSubmit}
      />

      {/* 3. The 10-15s Timed 99 SAR Upsell Modal (Exclusive Discount before shipping) */}
      <UpsellModal
        isOpen={isUpsellOpen}
        upsellProduct={upsellProduct}
        onAcceptUpsell={() => finalizeOrder(true)}
        onSkipUpsell={() => finalizeOrder(false)}
      />

      {/* 4. Thank You Page Modal + Webhook Dispatch confirmation */}
      {confirmedOrder && (
        <ThankYouModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
        />
      )}
    </div>
  );
}
