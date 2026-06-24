import { useState, useEffect } from 'react';
import { Star, CheckCircle2, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS } from '../data';
import { Logo } from './Header';

export function ReviewsSection() {
  const [helpline, setHelpline] = useState('03000000000');

  useEffect(() => {
    const saved = localStorage.getItem('hyd_helpline');
    if (saved) {
      setHelpline(saved);
    }
  }, []);

  const getWhatsAppNumber = () => {
    const digitsOnly = helpline.replace(/\D/g, '');
    if (digitsOnly.startsWith('0')) {
      return '92' + digitsOnly.slice(1);
    }
    if (digitsOnly.startsWith('92')) {
      return digitsOnly;
    }
    return digitsOnly || '923000000000';
  };

  const waNumber = getWhatsAppNumber();
  return (
    <section id="reviews-section" className="w-full bg-zinc-950 border-t border-zinc-900 py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
            ⭐ CUSTOMER REVIEWS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-sans text-white tracking-tight">
            Loved By 4,800+ Streetwear Heads
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Real feedback from verified buyers across Pakistan. We maintain an average rating of <strong className="text-white">4.9/5.0 Stars</strong>.
          </p>
        </div>

        {/* Brand Trust Badges Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
          {[
            { title: "Premium Fabric", desc: "Heavyweight 240 GSM Cotton", icon: "🧵" },
            { title: "No Fade Print", desc: "70+ washes guaranteed", icon: "🎨" },
            { title: "Easy Sizing Swap", desc: "Hassle-free replacement", icon: "🔄" },
            { title: "Genuine COD", desc: "Pay only after checking parcel", icon: "📦" }
          ].map((badge, idx) => (
            <div key={idx} className="bg-zinc-900/40 border border-zinc-800/80 p-4 rounded-2xl text-center space-y-1">
              <span className="text-2xl">{badge.icon}</span>
              <h4 className="text-xs font-bold text-white pt-1">{badge.title}</h4>
              <p className="text-[10px] text-zinc-400">{badge.desc}</p>
            </div>
          ))}
        </div>

        {/* Inner Grid: Reviews on Left, WhatsApp Conversation Trust Widget on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
          
          {/* Left Column: List of Verified Reviews (8 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase tracking-widest text-zinc-500 mb-4">Latest Verified Orders</h3>
            
            <div className="space-y-4">
              {REVIEWS.map((review) => (
                <div 
                  key={review.id} 
                  className="bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800/80 p-5 rounded-2xl space-y-3 transition-colors text-left"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{review.author}</span>
                        <CheckCircle2 size={12} className="text-emerald-400 fill-transparent" />
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-1.5 py-0.2 rounded font-mono uppercase">Verified</span>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-500">{review.city}, Pakistan • {review.date}</p>
                    </div>

                    {/* Star Rating */}
                    <div className="flex space-x-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-700'} 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    "{review.text}"
                  </p>

                  <div className="text-[10px] font-medium text-zinc-500 flex items-center gap-1 bg-zinc-950 max-w-max px-2 py-1 rounded-md border border-zinc-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00c6ff] mr-1" />
                    Ordered: <strong className="text-zinc-400">{review.productName}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Simulated WhatsApp Customer Love Widget (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-sm font-bold font-mono uppercase tracking-widest text-zinc-500 mb-4">Real Chat Proof</h3>

            {/* Custom Styled WhatsApp Chat Box Mockup */}
            <div className="bg-[#0b141a] rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl relative">
              
              {/* WhatsApp Header */}
              <div className="bg-[#1f2c34] px-4 py-3 flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center space-x-3">
                  {/* Small avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#00c6ff] to-[#f80759] p-0.5 flex items-center justify-center font-bold text-[10px] text-white">
                    HYD
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white">HYD Shop Support 🇵🇰</h4>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online • Custom Service
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 text-zinc-400">
                  <span className="text-xs font-mono select-none">💬 Official</span>
                </div>
              </div>

              {/* Chat Body */}
              <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto text-xs font-sans">
                
                {/* Day Marker */}
                <div className="text-center">
                  <span className="bg-[#121b22] text-zinc-400 text-[10px] px-2.5 py-1 rounded-md font-medium border border-zinc-900">
                    Yesterday
                  </span>
                </div>

                {/* Received Customer Message */}
                <div className="flex justify-start">
                  <div className="bg-[#202c33] text-white px-3 py-2 rounded-2xl rounded-tl-none max-w-[85%] text-left relative shadow-sm">
                    <p className="font-bold text-[#34d399] text-[10px] mb-0.5">Ali - Faisalabad</p>
                    <p className="leading-relaxed">Salam bro, parcel mil gya. T-shirt ki quality such me bohot kamaal h! Fabric bohot soft aur solid h 240 gsm ka. Size XL fitting perfect oversized high-shoulder h. 🖤 Stickers k lye thnx.</p>
                    <span className="block text-[9px] text-zinc-400 text-right mt-1">4:12 PM</span>
                  </div>
                </div>

                {/* Sent Support Reply */}
                <div className="flex justify-end">
                  <div className="bg-[#005c4b] text-white px-3 py-2 rounded-2xl rounded-tr-none max-w-[85%] text-left relative shadow-sm">
                    <p className="leading-relaxed">Walaikum Assalam Ali Bhai! Bohat bohat shukriya apka review share krne k lye. Hum hmesha fabric aur print quality pe hi focus rkhte hain. JazakAllah! 🔥 Tag us on TikTok next time!</p>
                    <span className="block text-[9px] text-emerald-300 text-right mt-1 flex items-center justify-end gap-1">
                      4:15 PM 
                      <span className="text-emerald-400">✓✓</span>
                    </span>
                  </div>
                </div>

                {/* Received Customer Message 2 */}
                <div className="flex justify-start">
                  <div className="bg-[#202c33] text-white px-3 py-2 rounded-2xl rounded-tl-none max-w-[85%] text-left relative shadow-sm">
                    <p className="font-bold text-[#00c6ff] text-[10px] mb-0.5">Laiba - Lahore</p>
                    <p className="leading-relaxed">Hi, I just ordered the "Sukun" script tee and paid online. Can I change my size from M to L? My height is 5'7". Please confirm!</p>
                    <span className="block text-[9px] text-zinc-400 text-right mt-1">6:32 PM</span>
                  </div>
                </div>

                {/* Sent Support Reply 2 */}
                <div className="flex justify-end">
                  <div className="bg-[#005c4b] text-white px-3 py-2 rounded-2xl rounded-tr-none max-w-[85%] text-left relative shadow-sm">
                    <p className="leading-relaxed">Sure Laiba! We checked your order and updated the size to L. Large will give you that perfect slouchy drop-shoulder look you'll love! It is scheduled for shipment tomorrow. 📦✈️</p>
                    <span className="block text-[9px] text-emerald-300 text-right mt-1 flex items-center justify-end gap-1">
                      6:35 PM 
                      <span className="text-emerald-400">✓✓</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Quick Input Bar Mockup */}
              <div className="bg-[#1f2c34] px-4 py-2 flex items-center border-t border-zinc-800">
                <div className="bg-[#2a3942] rounded-full px-3 py-1.5 flex-1 text-left text-zinc-500 text-[11px] select-none">
                  Type a response...
                </div>
                <a 
                  href={`https://wa.me/${waNumber}?text=Salam%2C%20I%20have%20a%20question%20about%20your%20T-shirts`} 
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full cursor-pointer transition-colors"
                >
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 leading-normal text-center">
              Want custom styling help or size confirmation before ordering? Tap the floating WhatsApp button to speak to Ali, our custom customer care specialist!
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
