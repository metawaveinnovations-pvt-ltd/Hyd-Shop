import { HelpCircle, RefreshCw, Truck, Award, ShoppingBag } from 'lucide-react';
import { Logo } from './Header';

interface FooterProps {
  onAdminClick?: () => void;
}

export function Footer({ onAdminClick }: FooterProps) {
  return (
    <footer id="main-footer" className="bg-black text-white border-t border-zinc-900 py-12 px-4 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Core Value props grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-zinc-900 text-left">
          
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[#00c6ff]">
              <Truck size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Nationwide COD</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Cash on delivery available. Pay only after you receive your parcel at your doorstep.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[#f80759]">
              <RefreshCw size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">7-Day Swap</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Sizing issues? Don't worry. Contact us on WhatsApp for a smooth size replacement.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-yellow-500">
              <Award size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Premium Blend</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Heavy organic cotton French Terry fabric (240 GSM) built for ultimate comfort and drape.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-emerald-400">
              <ShoppingBag size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Open Parcel Option</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Check the quality at your doorstep! Complete transparent delivery process.</p>
            </div>
          </div>

        </div>

        {/* Brand visual and courier partnerships */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-4">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <Logo className="h-16 w-36 sm:h-20 sm:w-44" />
            <p className="text-[11px] text-zinc-500 font-medium max-w-sm">
              HYD Shop is Pakistan's leading Gen-Z streetwear brand, dedicated to delivering premium, heavy-weight oversized T-shirts. Designed locally, worn proudly.
            </p>
          </div>

          {/* Courier logos block */}
          <div className="space-y-3 text-center md:text-right">
            <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Our Nationwide Courier Partners</h4>
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-end text-[10px] font-mono font-black text-zinc-400 select-none">
              <span className="bg-zinc-900 border border-zinc-800/80 px-3 py-2 rounded-xl text-orange-500">TRAX Logistics</span>
              <span className="bg-zinc-900 border border-zinc-800/80 px-3 py-2 rounded-xl text-yellow-500">Leopards COD</span>
              <span className="bg-zinc-900 border border-zinc-800/80 px-3 py-2 rounded-xl text-[#00c6ff]">TCS Courier</span>
              <span className="bg-zinc-900 border border-zinc-800/80 px-3 py-2 rounded-xl text-white">M&P Logistics</span>
            </div>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 text-center sm:text-left gap-4">
          <p>© 2026 HYD Shop Pakistan Inc. All Rights Reserved. Style, Quality, You.</p>
          
          <div className="flex space-x-6">
            <span className="hover:text-white transition-colors cursor-pointer">Return Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms & COD Conditions</span>
            <span className="hover:text-white transition-colors cursor-pointer">Sizing Standards</span>
            {onAdminClick && (
              <button 
                id="btn-footer-staff-portal"
                onClick={onAdminClick} 
                className="hover:text-[#f80759] text-zinc-500 font-bold transition-colors cursor-pointer uppercase text-[10px]"
              >
                Staff Portal 🔑
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
