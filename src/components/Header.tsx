import { useState, useEffect } from 'react';
import { ShoppingCart, MessageCircle, Phone, Clock, Search, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Reusable HYD Shop Logo component matching the attachment perfectly
export function Logo({ className = "h-20" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 280 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(250,112,154,0.3)]"
      >
        <defs>
          {/* Main neon gradient matching the uploaded logo: Blue/Cyan -> Magenta/Pink -> Orange/Yellow */}
          <linearGradient id="hydGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00c6ff" />     {/* Cool Blue */}
            <stop offset="45%" stopColor="#f80759" />    {/* Hot Magenta */}
            <stop offset="100%" stopColor="#f9d423" />   {/* Vibrant Yellow */}
          </linearGradient>
          
          {/* Subtle glow filter */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Shopping Bag Handle Arch */}
        <path
          d="M102 65 C102 38, 178 38, 178 65"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        />

        {/* 2. Cursive script-like "Hyd" style */}
        <text
          x="140"
          y="95"
          fontFamily="'Brush Script MT', 'Dancing Script', 'Inter', cursive"
          fontSize="56"
          fontWeight="bold"
          textAnchor="middle"
          fill="url(#hydGradient)"
          style={{ letterSpacing: '-1px' }}
          className="italic"
        >
          Hyd
        </text>

        {/* 3. Bold "SHOP" and Shopping Cart holding a colorful shirt on the right */}
        {/* SHOP text */}
        <text
          x="120"
          y="130"
          fontFamily="'Inter', 'Arial Black', sans-serif"
          fontSize="26"
          fontWeight="900"
          textAnchor="middle"
          fill="#ffffff"
          style={{ letterSpacing: '4px' }}
        >
          SHOP
        </text>

        {/* Shopping Cart holding shirt icon on the right */}
        <g transform="translate(195, 105)" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Cart handle and base */}
          <path d="M0 5 H5 L12 25 H25 L28 10 H10" />
          {/* Cart wheels */}
          <circle cx="14" cy="29" r="2.5" fill="#ffffff" stroke="none" />
          <circle cx="23" cy="29" r="2.5" fill="#ffffff" stroke="none" />
          {/* Vibrant T-shirt in the cart */}
          <path 
            d="M12 11 L14 13 L17 11 L19 13 L21 11 L23 15 L14 15 Z" 
            fill="url(#hydGradient)" 
            stroke="none"
          />
        </g>

        {/* 4. Fine neon gradient line underneath */}
        <rect
          x="20"
          y="144"
          width="240"
          height="2"
          rx="1"
          fill="url(#hydGradient)"
          filter="url(#neonGlow)"
        />

        {/* 5. Center-aligned Tagline "STYLE · QUALITY · YOU" */}
        <text
          x="140"
          y="163"
          fontFamily="'Inter', sans-serif"
          fontSize="10"
          fontWeight="600"
          textAnchor="middle"
          fill="#ffffff"
          style={{ letterSpacing: '4.5px' }}
          opacity="0.9"
        >
          STYLE · QUALITY · YOU
        </text>
      </svg>
    </div>
  );
}

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onTrackOrderClick: () => void;
}

export function Header({ cartCount, onCartClick, onTrackOrderClick }: HeaderProps) {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [helpline, setHelpline] = useState('03000000000');

  useEffect(() => {
    const saved = localStorage.getItem('hyd_helpline');
    if (saved) {
      setHelpline(saved);
    }
  }, []);

  // Format Pakistani numbers for WhatsApp APIs correctly (e.g. 03214567890 -> 923214567890)
  const formatWhatsAppNumber = (num: string) => {
    const digitsOnly = num.replace(/\D/g, '');
    if (digitsOnly.startsWith('0')) {
      return '92' + digitsOnly.slice(1);
    }
    if (digitsOnly.startsWith('92')) {
      return digitsOnly;
    }
    return digitsOnly || '923000000000';
  };

  const waNumber = formatWhatsAppNumber(helpline);

  return (
    <>
      <header id="main-header" className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          
          {/* Left info - Hidden on mobile, beautiful helper text */}
          <div className="hidden md:flex items-center space-x-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
              COD Available across Pakistan
            </span>
            <span className="text-zinc-600">|</span>
            <span className="flex items-center">
              <Clock size={12} className="mr-1 text-[#f80759]" />
              Delivery: 3-5 Working Days
            </span>
          </div>

          {/* Center Brand Logo */}
          <div className="flex-1 md:flex-initial flex justify-start md:justify-center">
            <a href="#" className="flex items-center -my-3">
              <Logo className="h-16 w-36 sm:h-20 sm:w-44" />
            </a>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Quick Order Tracking Button */}
            <button
              id="btn-track-order"
              onClick={onTrackOrderClick}
              className="text-xs font-semibold font-sans uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full transition-all duration-200 hover:border-zinc-700 flex items-center gap-1.5"
            >
              <ShieldCheck size={14} className="text-[#00c6ff]" />
              <span className="hidden sm:inline">Track</span> Order
            </button>

            {/* Helpline / WhatsApp Quick Action (Super crucial in PK) */}
            <a
              id="whatsapp-header-link"
              href={`https://wa.me/${waNumber}?text=Hi%20HYD%20Shop%2C%20I%20want%20to%20know%20more%20about%20your%20oversized%20T-shirts.`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 text-xs text-zinc-300 hover:text-emerald-400 font-medium bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-900/50 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              <MessageCircle size={14} className="text-emerald-400 fill-emerald-400" />
              <span>WhatsApp Help</span>
            </a>

            {/* Direct Phone Call Support */}
            <a
              id="call-header-link"
              href={`tel:${helpline}`}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full transition-colors hidden lg:block"
              title="Call Helpline"
            >
              <Phone size={18} />
            </a>

            {/* Cart Button */}
            <button
              id="btn-cart-toggle"
              onClick={onCartClick}
              className="relative p-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer group"
            >
              <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#00c6ff] to-[#f80759] text-white font-sans text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-black animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating WhatsApp Bubble for mobile & absolute ease of ordering */}
      <a
        id="floating-whatsapp-bubble"
        href={`https://wa.me/${waNumber}?text=Hi%20HYD%20Shop%2C%20I%20want%20to%20place%20an%20order%20for%20a%20T-shirt!`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:scale-110 transition-transform flex items-center justify-center border-2 border-white/20 cursor-pointer"
        title="Order via WhatsApp"
      >
        <MessageCircle size={24} className="fill-white" />
        <span className="absolute right-14 bg-zinc-900 text-white font-sans text-xs font-semibold px-3 py-1.5 rounded-xl border border-zinc-800 shadow-xl whitespace-nowrap hidden sm:block">
          💬 Chat with us / Place Order
        </span>
      </a>
    </>
  );
}
