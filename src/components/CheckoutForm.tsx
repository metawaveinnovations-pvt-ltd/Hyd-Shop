import React, { useState, useEffect } from 'react';
import { ShoppingBag, Truck, Gift, CheckCircle, ArrowRight, ShoppingCart, MessageSquare, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Order } from '../types';
import { PAKISTANI_CITIES, PRODUCTS } from '../data';

interface CheckoutFormProps {
  selectedProduct: Product | null;
  selectedSize: 'M' | 'L' | 'XL' | 'XXL' | '';
  onClose?: () => void;
  onOrderSuccess: (order: Order) => void;
}

export function CheckoutForm({ selectedProduct, selectedSize, onClose, onOrderSuccess }: CheckoutFormProps) {
  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  
  // Selection Override (in case they want to change product/size inside checkout)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(selectedProduct);
  const [currentSize, setCurrentSize] = useState<'M' | 'L' | 'XL' | 'XXL' | ''>(selectedSize);

  // UI state
  const [citySearch, setCitySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state if props change
  useEffect(() => {
    if (selectedProduct) {
      setCurrentProduct(selectedProduct);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedSize) {
      setCurrentSize(selectedSize);
    }
  }, [selectedSize]);

  // Handle City Filter
  const filteredCities = PAKISTANI_CITIES.filter(c => 
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  // Handle Promo Codes
  const applyPromoCode = () => {
    setPromoError('');
    if (!currentProduct) return;

    const code = promoCode.trim().toUpperCase();
    let activeCoupons = [];
    try {
      const saved = localStorage.getItem('hyd_coupons');
      if (saved) {
        activeCoupons = JSON.parse(saved);
      }
    } catch (e) {}

    if (activeCoupons.length === 0) {
      activeCoupons = [
        { code: 'TIKTOK50', discountPercent: 50, isActive: true },
        { code: 'HYD10', discountPercent: 10, isActive: true },
        { code: 'STREET15', discountPercent: 15, isActive: true }
      ];
    }

    const matched = activeCoupons.find((c: any) => c.code === code && c.isActive);

    if (matched) {
      const discount = Math.round((currentProduct.price * quantity) * (matched.discountPercent / 100));
      setDiscountAmount(discount);
      setIsPromoApplied(true);
    } else if (code === 'FREEDELIVERY') {
      setIsPromoApplied(true);
      setDiscountAmount(0); // Delivery is already free
    } else {
      setPromoError('Invalid promo code. Try "TIKTOK50" or custom admin code!');
    }
  };

  // Auto update discount if quantity changes
  useEffect(() => {
    if (isPromoApplied && currentProduct) {
      const code = promoCode.trim().toUpperCase();
      let activeCoupons = [];
      try {
        const saved = localStorage.getItem('hyd_coupons');
        if (saved) activeCoupons = JSON.parse(saved);
      } catch (e) {}
      
      if (activeCoupons.length === 0) {
        activeCoupons = [
          { code: 'TIKTOK50', discountPercent: 50, isActive: true },
          { code: 'HYD10', discountPercent: 10, isActive: true }
        ];
      }

      const matched = activeCoupons.find((c: any) => c.code === code && c.isActive);
      if (matched) {
        setDiscountAmount(Math.round((currentProduct.price * quantity) * (matched.discountPercent / 100)));
      }
    }
  }, [quantity, currentProduct, isPromoApplied]);

  // Calculations
  const itemPrice = currentProduct ? currentProduct.price : 0;
  const subtotal = itemPrice * quantity;
  const deliveryCharges = 0; // FREE Shipping
  const total = subtotal - discountAmount;

  // Pakistan Phone Validation (03xxxxxxxxx or 923xxxxxxxxx)
  const validatePhone = (num: string) => {
    const cleanNum = num.replace(/[\s-]/g, '');
    const regex = /^(03\d{9}|923\d{9}|\+923\d{9})$/;
    return regex.test(cleanNum);
  };

  // Submit Order
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!currentProduct) {
      setFormError('Please select a T-shirt design first.');
      return;
    }
    if (!currentSize) {
      setFormError('Please choose your Size (M, L, XL, XXL).');
      return;
    }
    if (!customerName.trim()) {
      setFormError('Please enter your Full Name.');
      return;
    }
    if (!validatePhone(phone)) {
      setFormError('Please enter a valid Pakistani mobile number (e.g. 03001234567).');
      return;
    }
    if (!city) {
      setFormError('Please select your City from the list.');
      return;
    }
    if (!address.trim() || address.trim().length < 8) {
      setFormError('Please enter a complete delivery address so our courier can find you.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database write with 1s timeout
    setTimeout(() => {
      const orderId = `HYD-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder: Order = {
        id: orderId,
        customerName: customerName.trim(),
        phone: phone.trim(),
        city,
        address: address.trim(),
        productId: currentProduct.id,
        size: currentSize,
        quantity,
        totalPrice: total,
        paymentMethod: 'COD',
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Save order in local history for tracking
      const existingOrdersRaw = localStorage.getItem('hyd_orders');
      const existingOrders: Order[] = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      localStorage.setItem('hyd_orders', JSON.stringify([newOrder, ...existingOrders]));

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div id="quick-checkout-drawer" className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,198,255,0.15)] max-w-2xl mx-auto text-left">
      
      {/* Header bar */}
      <div className="bg-gradient-to-r from-zinc-900 to-black px-6 py-5 border-b border-zinc-800/80 flex justify-between items-center">
        <div className="flex items-center space-x-2.5">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold font-mono tracking-widest uppercase text-zinc-300">⚡ QUICK COD CHECKOUT</h3>
        </div>
        {onClose && (
          <button 
            id="close-checkout"
            onClick={onClose} 
            className="text-xs font-semibold text-zinc-400 hover:text-white px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700/50 cursor-pointer"
          >
            Back
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* Dynamic Selector overrides inside form */}
        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* T-Shirt design dropdown */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Select Design</label>
            <select
              id="select-checkout-product"
              value={currentProduct?.id || ''}
              onChange={(e) => {
                const prod = PRODUCTS.find(p => p.id === e.target.value);
                if (prod) setCurrentProduct(prod);
              }}
              className="w-full bg-zinc-950 text-white border border-zinc-800 px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00c6ff]"
            >
              <option value="" disabled>Choose a design...</option>
              {PRODUCTS.map(p => (
                <option key={p.id} value={p.id}>{p.name} — Rs.{p.price}</option>
              ))}
            </select>
          </div>

          {/* Sizing dropdown */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Select Size</label>
            <select
              id="select-checkout-size"
              value={currentSize}
              onChange={(e) => setCurrentSize(e.target.value as any)}
              className="w-full bg-zinc-950 text-white border border-zinc-800 px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#f80759]"
            >
              <option value="" disabled>Choose fitting...</option>
              {currentProduct?.sizes.map(sz => (
                <option key={sz} value={sz}>Size {sz} (Oversized)</option>
              ))}
            </select>
          </div>
        </div>

        {/* Customer Information Form Fields */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-zinc-500">Shipping Details</h4>

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Your Name <span className="text-red-500">*</span></label>
            <input
              id="checkout-name-input"
              type="text"
              placeholder="e.g. Muhammad Ali"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-zinc-900/60 text-white border border-zinc-800 px-3.5 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-[#00c6ff] focus:ring-1 focus:ring-[#00c6ff]/30 placeholder:text-zinc-600 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">WhatsApp / Mobile <span className="text-red-500">*</span></label>
              <input
                id="checkout-phone-input"
                type="tel"
                placeholder="e.g. 03001234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-zinc-900/60 text-white border border-zinc-800 px-3.5 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-[#00c6ff] focus:ring-1 focus:ring-[#00c6ff]/30 placeholder:text-zinc-600 font-medium"
              />
              <p className="text-[9px] text-zinc-500 font-mono mt-0.5">Used for shipment notifications</p>
            </div>

            {/* City Searchable dropdown */}
            <div className="space-y-1 relative">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">City <span className="text-red-500">*</span></label>
              
              <div className="relative">
                <input
                  id="checkout-city-search"
                  type="text"
                  placeholder="Type city e.g. Lahore, Karachi..."
                  value={city || citySearch}
                  onChange={(e) => {
                    setCity('');
                    setCitySearch(e.target.value);
                    setShowCityDropdown(true);
                  }}
                  onFocus={() => setShowCityDropdown(true)}
                  className="w-full bg-zinc-900/60 text-white border border-zinc-800 px-3.5 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-[#00c6ff] focus:ring-1 focus:ring-[#00c6ff]/30 placeholder:text-zinc-600 font-medium"
                />
                
                {city && (
                  <button 
                    onClick={() => { setCity(''); setCitySearch(''); }}
                    className="absolute right-3 top-2.5 text-[9px] font-mono text-zinc-400 hover:text-white bg-zinc-800 px-2 py-0.5 rounded"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {showCityDropdown && (
                <div className="absolute z-30 left-0 right-0 mt-1 max-h-44 overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl">
                  {filteredCities.length > 0 ? (
                    filteredCities.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setCity(c);
                          setCitySearch(c);
                          setShowCityDropdown(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs font-sans text-zinc-300 hover:bg-[#00c6ff]/10 hover:text-[#00c6ff] border-b border-zinc-900/50"
                      >
                        {c}
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-[10px] font-mono text-zinc-600">No matching cities. Type manually.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Full Delivery Address <span className="text-red-500">*</span></label>
            <textarea
              id="checkout-address-input"
              rows={2}
              placeholder="House Number, Street Address, Area, Near landmark..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-zinc-900/60 text-white border border-zinc-800 px-3.5 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-[#00c6ff] focus:ring-1 focus:ring-[#00c6ff]/30 placeholder:text-zinc-600 font-medium resize-none"
            />
          </div>
        </div>

        {/* Quantity & Promocode row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Quantity Selector */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Quantity</label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-9 h-9 bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 rounded-lg flex items-center justify-center font-bold font-sans cursor-pointer select-none"
              >
                -
              </button>
              <span className="w-10 text-center font-sans font-extrabold text-sm text-white">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 rounded-lg flex items-center justify-center font-bold font-sans cursor-pointer select-none"
              >
                +
              </button>
              <span className="text-[10px] font-mono text-zinc-500 pl-1">T-Shirts</span>
            </div>
          </div>

          {/* Promocode Apply */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Discount Code</label>
            <div className="flex space-x-1.5">
              <input
                type="text"
                placeholder="e.g. TIKTOK50"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={isPromoApplied}
                className="flex-1 bg-zinc-900/60 text-white border border-zinc-800 px-3 py-2 rounded-xl text-xs font-sans focus:outline-none focus:border-[#00c6ff] uppercase placeholder:text-zinc-600 font-semibold"
              />
              <button
                type="button"
                onClick={applyPromoCode}
                disabled={isPromoApplied || !promoCode}
                className="bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-white hover:text-[#00c6ff] px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
              >
                Apply
              </button>
            </div>
            {isPromoApplied && (
              <p className="text-[10px] text-emerald-400 font-bold font-mono">✓ Promo applied successfully!</p>
            )}
            {promoError && (
              <p className="text-[10px] text-red-500 font-bold font-mono">{promoError}</p>
            )}
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl space-y-2.5 font-sans">
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Subtotal ({quantity} {quantity === 1 ? 'item' : 'items'})</span>
            <span className="font-semibold text-white">Rs. {subtotal}</span>
          </div>
          
          {isPromoApplied && discountAmount > 0 && (
            <div className="flex justify-between text-xs text-emerald-400 font-medium">
              <span>Promo Code Applied</span>
              <span>- Rs. {discountAmount}</span>
            </div>
          )}

          <div className="flex justify-between text-xs text-zinc-400">
            <span>Nationwide Delivery</span>
            <span className="text-emerald-400 font-bold font-mono flex items-center gap-1">
              <span className="text-zinc-500 line-through font-normal">Rs. 200</span> FREE
            </span>
          </div>

          <div className="h-px bg-zinc-800/80 my-1" />

          <div className="flex justify-between text-sm font-bold text-white">
            <span className="flex items-center gap-1.5">
              <Gift size={14} className="text-[#f80759]" />
              Total Payable (COD)
            </span>
            <span className="text-base font-extrabold bg-gradient-to-r from-[#00c6ff] to-[#f80759] bg-clip-text text-transparent">
              Rs. {total}
            </span>
          </div>
        </div>

        {/* Validation Errors Display */}
        {formError && (
          <div className="bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl flex items-start gap-2 text-left">
            <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
            <span className="text-xs text-red-400 font-medium leading-relaxed">{formError}</span>
          </div>
        )}

        {/* Main Pulsing CTA button */}
        <button
          id="btn-submit-order"
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#34d399] hover:to-[#10b981] text-white py-3.5 px-6 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(16,185,129,0.3)] transition-all cursor-pointer disabled:opacity-50 select-none border border-white/10"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1" />
              <span>Placing Order...</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              <span>Order Now — Cash On Delivery</span>
            </>
          )}
        </button>

        <div className="flex justify-center items-center gap-6 text-[10px] font-mono text-zinc-500">
          <span className="flex items-center gap-1">📦 100% Open Parcel Option</span>
          <span className="flex items-center gap-1">🇵🇰 Dispatch from Karachi</span>
        </div>

      </form>
    </div>
  );
}
