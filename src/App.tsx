import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ShoppingBag, CheckCircle, Clock, Truck, ShieldCheck, ArrowRight, MessageSquare, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents
import { Header } from './components/Header';
import { AnnouncementBar } from './components/AnnouncementBar';
import { ProductSection } from './components/ProductSection';
import { SizeEstimator } from './components/SizeEstimator';
import { TikTokFeed } from './components/TikTokFeed';
import { ReviewsSection } from './components/ReviewsSection';
import { CheckoutForm } from './components/CheckoutForm';
import { Footer } from './components/Footer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AdminPanel } from './components/AdminPanel';

// Types & Data
import { Product, Order } from './types';
import { PRODUCTS } from './data';

export default function App() {
  // Admin Mode state & live products
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    // Sync products with local storage for stocks
    const saved = localStorage.getItem('hyd_products');
    if (saved) {
      setProductsList(JSON.parse(saved));
    } else {
      localStorage.setItem('hyd_products', JSON.stringify(PRODUCTS));
    }
  }, []);

  // Active product/size being purchased
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [selectedSize, setSelectedSize] = useState<'M' | 'L' | 'XL' | 'XXL' | ''>('');
  
  // Tracking Modal State
  const [trackerOpen, setTrackerOpen] = useState(false);
  
  // Order Success State
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Dynamic helpline fetch & format
  const getWhatsAppNumber = () => {
    const saved = localStorage.getItem('hyd_helpline') || '03000000000';
    const digitsOnly = saved.replace(/\D/g, '');
    if (digitsOnly.startsWith('0')) {
      return '92' + digitsOnly.slice(1);
    }
    if (digitsOnly.startsWith('92')) {
      return digitsOnly;
    }
    return digitsOnly || '923000000000';
  };

  // References for scrolling
  const catalogRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  // Smooth scroll handler
  const scrollTo = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Direct checkout trigger from catalog
  const handleCatalogBuyNow = (product: Product, size: 'M' | 'L' | 'XL' | 'XXL') => {
    setSelectedProduct(product);
    setSelectedSize(size);
    setTimeout(() => {
      scrollTo(checkoutRef);
    }, 100);
  };

  // Direct checkout from TikTok feed hot spots
  const handleTikTokShopNow = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      // Encourage XL or L as default oversized fit
      setSelectedSize('L');
      setTimeout(() => {
        scrollTo(checkoutRef);
      }, 100);
    }
  };

  // Order Complete Callback
  const handleOrderSuccess = (order: Order) => {
    setPlacedOrder(order);
  };

  if (isAdminMode) {
    return (
      <AdminPanel 
        onClose={() => setIsAdminMode(false)} 
        onProductsUpdate={(updated) => setProductsList(updated)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#f80759] selection:text-white overflow-x-hidden font-sans">
      
      {/* Header and sliding announcements */}
      <Header 
        cartCount={selectedSize ? 1 : 0} 
        onCartClick={() => scrollTo(checkoutRef)}
        onTrackOrderClick={() => setTrackerOpen(true)}
      />
      <AnnouncementBar />

      {/* Hero Banner Section */}
      <section id="hero-banner-section" className="relative w-full overflow-hidden bg-black py-16 lg:py-24 border-b border-zinc-900">
        {/* Abstract background blobs to fit the neon gradient style */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-gradient-to-tr from-[#00c6ff]/10 to-[#f80759]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-gradient-to-bl from-purple-600/10 to-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live stats highlight */}
            <div className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-[#f80759] animate-pulse" />
              🔥 4,810+ Pakistani Streetwear Orders Dispatched
            </div>

            {/* Main Title heading */}
            <h1 className="text-4xl sm:text-6xl font-black font-sans leading-none tracking-tight text-white">
              PAKISTAN’S HYPED <br />
              <span className="bg-gradient-to-r from-[#00c6ff] via-[#f80759] to-[#f9d423] bg-clip-text text-transparent">
                STREETWEAR DROPS
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Premium 240 GSM heavy combed-cotton drop-shoulder oversized T-shirts. Engineered with dual-layer puff print details and a perfect slouchy drape. Flat 50% Off & Free nationwide Cash on Delivery.
            </p>

            {/* Mini Trust Row */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 pt-2 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <div className="space-y-1 bg-zinc-950 border border-zinc-900 p-2.5 rounded-2xl">
                <span className="block text-white font-black text-sm sm:text-base">0% Risk</span>
                <span>Open Parcel</span>
              </div>
              <div className="space-y-1 bg-zinc-950 border border-zinc-900 p-2.5 rounded-2xl">
                <span className="block text-[#00c6ff] font-black text-sm sm:text-base">Free</span>
                <span>Home Delivery</span>
              </div>
              <div className="space-y-1 bg-zinc-950 border border-zinc-900 p-2.5 rounded-2xl">
                <span className="block text-[#f80759] font-black text-sm sm:text-base">7-Day</span>
                <span>Easy Exchange</span>
              </div>
            </div>

            {/* Dynamic visual CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4">
              <button
                id="btn-hero-shop-drop"
                onClick={() => scrollTo(catalogRef)}
                className="bg-gradient-to-r from-[#00c6ff] via-purple-600 to-[#f80759] text-white font-black uppercase text-xs tracking-wider py-4 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(248,7,89,0.3)] hover:scale-103 transition-transform cursor-pointer border border-white/10"
              >
                <ShoppingBag size={14} className="stroke-[2.5]" />
                <span>Shop the Drop (50% Off)</span>
              </button>
              
              <button
                id="btn-hero-estimator"
                onClick={() => {
                  const el = document.getElementById('size-estimator-section');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 py-4 px-8 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                📏 Check Your Size
              </button>
            </div>

          </div>

          {/* Hero Right Visual Column - Showing our flagship product */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[360px] aspect-square rounded-[36px] overflow-hidden border-2 border-zinc-800/80 bg-zinc-900 shadow-2xl group">
              <img
                src={PRODUCTS[0].image}
                alt="Aura Oversized Tee Hero Specimen"
                className="w-full h-full object-cover brightness-95 scale-102 transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Promo tag */}
              <span className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md border border-zinc-800/60 px-4 py-2 rounded-2xl text-xs text-zinc-300 font-mono text-left space-y-0.5">
                <strong className="block text-[#00c6ff] text-xs uppercase font-sans font-black">Aura Oversized Tee</strong>
                <span>Heavy 240 GSM • Rs. 1,499</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Simulated TikTok Video Try-ons Reel */}
      <TikTokFeed onShopClick={handleTikTokShopNow} />

      {/* Product Catalog Grid Section */}
      <div ref={catalogRef}>
        <ProductSection products={productsList} onBuyNow={handleCatalogBuyNow} />
      </div>

      {/* AI Smart Size Estimator */}
      <section className="w-full bg-zinc-950 py-12 px-4 border-t border-zinc-900">
        <SizeEstimator />
      </section>

      {/* Customer Feedback & Trust Chat Screenshot */}
      <ReviewsSection />

      {/* Checkout Drawer Section */}
      <section 
        id="checkout-anchor-section"
        ref={checkoutRef} 
        className="w-full bg-zinc-950 py-16 px-4 border-t border-zinc-900"
      >
        <div className="max-w-4xl mx-auto space-y-10 text-center">
          
          {/* Header block */}
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
              🛒 Order Placement Area
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-sans text-white tracking-tight">
              Finish Your Order — Pay Cash on Delivery
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
              Please fill your accurate shipping details. Free home delivery across Pakistan!
            </p>
          </div>

          {/* Form */}
          <CheckoutForm 
            selectedProduct={selectedProduct}
            selectedSize={selectedSize}
            onOrderSuccess={handleOrderSuccess}
          />

        </div>
      </section>

      {/* Footer copyright, support details, and couriers */}
      <Footer onAdminClick={() => setIsAdminMode(true)} />

      {/* Order Tracker popup modal */}
      <OrderTrackerModal 
        isOpen={trackerOpen} 
        onClose={() => setTrackerOpen(false)} 
      />

      {/* Order Success Overlay Modal (Triggers when checkouts complete) */}
      <AnimatePresence>
        {placedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Receipt Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-zinc-950 border border-zinc-800 rounded-[32px] w-full max-w-md p-6 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.3)] text-center font-sans space-y-6"
            >
              {/* Success Badge */}
              <div className="mx-auto h-16 w-16 bg-emerald-500/10 text-emerald-400 border-2 border-emerald-500/20 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="stroke-[2.5]" />
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white tracking-tight">Order Placed Successfully! 🎉</h3>
                <p className="text-xs text-zinc-400">
                  JazakAllah! Your Cash on Delivery order has been logged under reference:
                </p>
                <div className="inline-block bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full font-mono text-xs font-bold text-emerald-400 tracking-wider">
                  {placedOrder.id}
                </div>
              </div>

              {/* Order Specs */}
              <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 text-xs space-y-2.5 text-left">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Customer Name:</span>
                  <strong className="text-white">{placedOrder.customerName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Mobile Phone:</span>
                  <strong className="text-white font-mono">{placedOrder.phone}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Delivery Address:</span>
                  <strong className="text-white max-w-[200px] text-right truncate">{placedOrder.address}, {placedOrder.city}</strong>
                </div>
                <div className="flex justify-between border-t border-zinc-900 pt-2.5">
                  <span className="text-zinc-500">Total Bill (COD):</span>
                  <strong className="text-emerald-400 font-extrabold text-sm font-mono">Rs. {placedOrder.totalPrice}</strong>
                </div>
              </div>

              {/* Expected Delivery Roadmap */}
              <div className="flex items-center gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-900 text-left text-[11px] text-zinc-400">
                <Truck size={16} className="text-[#00c6ff] shrink-0" />
                <div>
                  <h5 className="font-bold text-zinc-300">Expected Delivery Timeline</h5>
                  <p className="text-[10px] mt-0.5">3-5 working days. Trax Logistics delivery boy will call you before arrival.</p>
                </div>
              </div>

              {/* Direct WhatsApp Call to Action to Speed-up parcel check (Extremely popular in PK) */}
              <div className="space-y-3">
                <a
                  id="whatsapp-success-confirm"
                  href={`https://wa.me/${getWhatsAppNumber()}?text=Salam%20HYD%20Shop!%20I%20just%20placed%20order%20${placedOrder.id}%20for%20a%20T-shirt.%20Please%20confirm%20my%20shipment!`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageSquare size={14} className="fill-white" />
                  <span>Send WhatsApp to Fast-Track Parcel</span>
                </a>

                <button
                  onClick={() => setPlacedOrder(null)}
                  className="w-full text-[11px] text-zinc-500 hover:text-zinc-300 font-mono transition-colors cursor-pointer"
                >
                  Close Receipt
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
