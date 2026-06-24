import { Sparkles, Truck, ShieldCheck, Flame } from 'lucide-react';

export function AnnouncementBar() {
  const announcements = [
    { text: "🇵🇰 FREE SHIPPING ALL OVER PAKISTAN!", icon: <Truck size={12} className="text-yellow-400" /> },
    { text: "🔥 MID-SUMMER SLASH SALE: FLAT 50% OFF FOR A LIMITED TIME!", icon: <Flame size={12} className="text-[#f80759] animate-pulse" /> },
    { text: "📦 CASH ON DELIVERY (COD) AVAILABLE NATIONWIDE", icon: <ShieldCheck size={12} className="text-[#00c6ff]" /> },
    { text: "⚡ BUY 2 GET 10% EXTRA DISCOUNT AUTOMATICALLY!", icon: <Sparkles size={12} className="text-yellow-400" /> }
  ];

  // Repeat items to make a seamless infinite loop
  const duplicatedAnnouncements = [...announcements, ...announcements, ...announcements];

  return (
    <div 
      id="announcement-bar" 
      className="w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-800 text-white py-2 overflow-hidden relative z-50 select-none"
    >
      {/* Moving tape container */}
      <div className="flex whitespace-nowrap animate-marquee">
        {duplicatedAnnouncements.map((item, index) => (
          <div 
            key={index} 
            className="inline-flex items-center mx-6 sm:mx-12 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-300"
          >
            <span className="mr-2 flex items-center justify-center bg-zinc-800/80 p-1 rounded-full border border-zinc-700/50">
              {item.icon}
            </span>
            <span className="font-bold">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Styled animation keyframe injected globally */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.33333%, 0, 0);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
