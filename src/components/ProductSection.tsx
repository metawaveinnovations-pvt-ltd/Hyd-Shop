import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShoppingBag, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ProductSectionProps {
  products?: Product[];
  onBuyNow: (product: Product, size: 'M' | 'L' | 'XL' | 'XXL') => void;
}

export function ProductSection({ products = PRODUCTS, onBuyNow }: ProductSectionProps) {
  // Store selected sizes for each individual product
  const [selectedSizes, setSelectedSizes] = useState<Record<string, 'M' | 'L' | 'XL' | 'XXL' | ''>>({});
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const handleSizeSelect = (productId: string, size: 'M' | 'L' | 'XL' | 'XXL') => {
    // Check if size is out of stock
    const prod = products.find(p => p.id === productId);
    const stocks = (prod as any)?.stocks || { M: 50, L: 80, XL: 40, XXL: 20 };
    if (stocks[size] === 0) {
      alert(`⚠️ Sorry! Size ${size} is currently OUT OF STOCK. Please choose another size.`);
      return;
    }

    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleOrderClick = (product: Product) => {
    const size = selectedSizes[product.id];
    if (!size) {
      alert(`Piyare Buyer! Please select your T-shirt Size (M, L, or XL) first! 😊`);
      return;
    }
    onBuyNow(product, size);
  };

  return (
    <section id="product-catalog-section" className="w-full bg-zinc-950 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold bg-[#00c6ff]/10 text-[#00c6ff] border border-[#00c6ff]/20 px-3.5 py-1 rounded-full uppercase tracking-wider">
            🔥 Limited Drop • Flat 50% Off
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-sans text-white tracking-tight">
            Select Your Vibe • Heavyweight Collection
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            Crafted with heavy 240 GSM organic cotton, dual-layer puff printing, and a tailored slouchy streetwear silhouette.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {products.map((product) => {
            const chosenSize = selectedSizes[product.id] || '';
            const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            const currentStocks = (product as any).stocks || { M: 50, L: 80, XL: 40, XXL: 20 };

            return (
              <div
                id={`product-card-${product.id}`}
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative group"
              >
                {/* Sale / Viral Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#00c6ff] to-[#f80759] text-white font-sans text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {product.badge}
                  </span>
                )}

                {/* Main Visual Image container */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Specs and info */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 text-left">
                  
                  {/* Name and pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">
                        {product.name}
                      </h3>
                      {/* Price Badge */}
                      <div className="text-right">
                        <div className="flex items-baseline space-x-1.5 justify-end">
                          <span className="text-[10px] text-zinc-500 line-through">Rs.{product.originalPrice}</span>
                          <span className="text-lg font-black text-white">Rs.{product.price}</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          SAVE {discountPercentage}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Built Specifications Table (Extremely crucial for PK quality proof) */}
                  <div className="bg-zinc-950/60 rounded-2xl p-4 border border-zinc-900 text-xs space-y-2 font-sans">
                    <div className="flex justify-between py-1 border-b border-zinc-900/60">
                      <span className="text-zinc-500">Fabric Density</span>
                      <strong className="text-zinc-300">{product.gsm} GSM (Ultra-Heavyweight)</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-900/60">
                      <span className="text-zinc-500">Fit Type</span>
                      <strong className="text-zinc-300">{product.fit}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-900/60">
                      <span className="text-zinc-500">Print Quality</span>
                      <strong className="text-zinc-300">{product.print}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-zinc-500">Material</span>
                      <strong className="text-zinc-300">{product.fabric}</strong>
                    </div>
                  </div>

                  {/* Size Selector with visual focus state */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider">Select Oversized Fitting:</span>
                      <span className="text-zinc-500 font-medium">Free Size Exchanges</span>
                    </div>

                    <div className="flex gap-2.5">
                      {product.sizes.map((sz) => {
                        const isChosen = chosenSize === sz;
                        const stockCount = currentStocks[sz] ?? 0;
                        const isOutOfStock = stockCount === 0;

                        return (
                          <button
                            id={`btn-size-${product.id}-${sz}`}
                            key={sz}
                            type="button"
                            disabled={isOutOfStock}
                            onClick={() => handleSizeSelect(product.id, sz)}
                            className={`flex-1 py-3 px-2 rounded-xl text-xs font-black transition-all cursor-pointer select-none border flex flex-col items-center justify-center gap-0.5 relative ${
                              isOutOfStock
                                ? 'bg-zinc-950 text-zinc-700 border-zinc-900 line-through cursor-not-allowed opacity-40'
                                : isChosen
                                ? 'bg-gradient-to-r from-[#00c6ff] to-[#f80759] text-white border-transparent shadow-[0_0_15px_rgba(248,7,89,0.3)] scale-102'
                                : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:border-zinc-700 hover:text-white'
                            }`}
                          >
                            <span>{sz}</span>
                            <span className={`text-[8px] font-medium font-mono uppercase ${
                              isOutOfStock ? 'text-red-900' : isChosen ? 'text-white/80' : 'text-zinc-500'
                            }`}>
                              {isOutOfStock ? 'SOLD OUT' : `${stockCount} LFT`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Full Description paragraph */}
                  <p className="text-xs text-zinc-400 font-normal leading-relaxed text-zinc-500 border-t border-zinc-900/60 pt-4">
                    {product.description}
                  </p>

                  {/* Hot Order Button */}
                  <button
                    id={`btn-buy-now-${product.id}`}
                    type="button"
                    onClick={() => handleOrderClick(product)}
                    className="w-full bg-white text-zinc-950 hover:bg-gradient-to-r hover:from-[#00c6ff] hover:to-[#f80759] hover:text-white py-3.5 px-6 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg select-none"
                  >
                    <ShoppingBag size={14} className="stroke-[2.5]" />
                    <span>Buy Now — Cash on Delivery</span>
                  </button>

                  <div className="flex justify-center items-center space-x-3 text-[10px] text-zinc-500 font-mono">
                    <span className="flex items-center gap-1">📦 COD Available</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">🔄 7-Day Exchange</span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
