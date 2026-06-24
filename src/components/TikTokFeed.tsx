import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Music, Play, Volume2, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TikTokClip {
  id: string;
  influencerName: string;
  handle: string;
  likes: string;
  comments: string;
  shares: string;
  songName: string;
  caption: string;
  imagePoster: string;
  tshirtName: string;
}

interface TikTokFeedProps {
  onShopClick: (productId: string) => void;
}

export function TikTokFeed({ onShopClick }: TikTokFeedProps) {
  const clips: TikTokClip[] = [
    {
      id: 'clip-1',
      influencerName: 'Ahmad & Bilal Street Walk',
      handle: 'ahmad_vlogs',
      likes: '48.2K',
      comments: '1.2K',
      shares: '850',
      songName: 'HYD Shop - Sukun (Lo-Fi Remix)',
      caption: 'The drop is finally here! 😭 Honestly the best oversized streetwear tees I’ve found in Pakistan. 240 GSM is heavy and fits so premium. #urduwear #karachifashion #hydshop',
      imagePoster: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
      tshirtName: 'AURA Oversized Tee'
    },
    {
      id: 'clip-2',
      influencerName: 'Zoya’s Urban Transition',
      handle: 'zoya_trends',
      likes: '62.1K',
      comments: '2.4K',
      shares: '1.4K',
      songName: 'Aesthetic Chill Beat - Pakistani Synth',
      caption: 'From basic fit to streetwear vibe check! ⚡ Sukun Urdu Script Tee goes with everything. Quality of the print is puff 100/100! 📦 COD FREE DELIVERY. Order fast!',
      imagePoster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      tshirtName: 'SUKUN Urdu Script Tee'
    },
    {
      id: 'clip-3',
      influencerName: 'Cyberpunks of Lahore',
      handle: 'cyber_boy_pk',
      likes: '35.9K',
      comments: '980',
      shares: '410',
      songName: 'Slowed Synthwave - Pakistan Lo-Fi Vibes',
      caption: 'CYBER-HYD drop review! White tee with neon glowing print. Perfect oversize drape, doesn’t shrink. ⚡ FLAT 50% discount code applied on link! #cyberpunk #lahorestreetwear',
      imagePoster: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
      tshirtName: 'CYBER-HYD Graphic Tee'
    }
  ];

  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [heartsList, setHeartsList] = useState<{ id: number; x: number; y: number }[]>([]);
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const activeClip = clips[activeClipIndex];

  // Tap to like & create flying hearts animation
  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = activeClip.id;
    setHasLiked(prev => ({ ...prev, [key]: !prev[key] }));

    // Spawn 5 flying hearts around the click or center
    const newHearts = Array.from({ length: 5 }).map((_, idx) => ({
      id: Date.now() + idx,
      x: e.clientX ? e.clientX - 50 + Math.random() * 100 : 150 + Math.random() * 100,
      y: e.clientY ? e.clientY - 100 + Math.random() * 100 : 250 + Math.random() * 150,
    }));
    
    setHeartsList(prev => [...prev, ...newHearts]);
    setTimeout(() => {
      setHeartsList(prev => prev.filter(h => !newHearts.some(nh => nh.id === h.id)));
    }, 1200);
  };

  return (
    <div id="tiktok-influencer-feed" className="w-full max-w-5xl mx-auto my-12 px-4">
      {/* Visual Title */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold bg-[#f80759]/10 text-[#f80759] border border-[#f80759]/20 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          🎥 VIRAL ON TIKTOK PAKISTAN
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-sans text-white tracking-tight">
          Trending Reels & Try-Ons
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-2">
          Watch top Pakistani fashion influencers styling their HYD Shop oversized T-shirts. Click the hearts to show love!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Video Player Mockup (9:16 Aspect) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[320px] aspect-[9/16] bg-zinc-950 rounded-[32px] border-4 border-zinc-800 shadow-[0_25px_50px_-12px_rgba(248,7,89,0.25)] overflow-hidden">
            
            {/* Poster Image / Simulated Video Loop */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={activeClip.imagePoster}
                alt={activeClip.influencerName}
                className="w-full h-full object-cover brightness-75 scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay styling for simulated video motion feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
              
              {/* Animated camera lens scan effect to simulate moving video */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_95%,rgba(248,7,89,0.1)_98%,rgba(18,18,18,0)_100%)] bg-[length:100%_400%] animate-scanlines pointer-events-none" />
            </div>

            {/* Video Control Overlays */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <div className="flex space-x-1.5 items-center">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-bold font-mono tracking-widest text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full uppercase">LIVE REEL</span>
              </div>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-full text-white transition-colors cursor-pointer"
              >
                <Volume2 size={14} className={isMuted ? 'opacity-40' : 'opacity-100'} />
              </button>
            </div>

            {/* Floating Hearts Overlay (Dynamic Interaction) */}
            <AnimatePresence>
              {heartsList.map((heart) => (
                <motion.div
                  key={heart.id}
                  initial={{ opacity: 1, scale: 0.5, y: 150, x: 0 }}
                  animate={{ 
                    opacity: 0, 
                    scale: [1, 1.5, 0.8], 
                    y: -250 - Math.random() * 100, 
                    x: -50 + Math.random() * 100,
                    rotate: -30 + Math.random() * 60
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="absolute bottom-32 left-1/2 pointer-events-none z-30"
                >
                  <Heart size={36} className="text-[#f80759] fill-[#f80759] drop-shadow-[0_0_10px_#f80759]" />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Middle Big Play Indicator on Tap */}
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-10" 
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {!isPlaying && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 bg-black/60 backdrop-blur-md rounded-full text-white shadow-2xl"
                >
                  <Play size={28} className="fill-white translate-x-0.5" />
                </motion.div>
              )}
            </div>

            {/* TikTok Right-side Action Sidebar */}
            <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-4 z-20">
              {/* Creator Profile Image */}
              <div className="relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-white/90 overflow-hidden shadow-lg bg-zinc-800">
                  <img src={activeClip.imagePoster} alt="creator" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <button 
                  onClick={handleLikeClick}
                  className="absolute -bottom-1.5 bg-[#f80759] text-white rounded-full p-0.5 shadow-md hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="text-[8px] font-bold">+</span>
                </button>
              </div>

              {/* Heart Button */}
              <button 
                onClick={handleLikeClick}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white group-hover:bg-black/50 transition-colors">
                  <Heart 
                    size={20} 
                    className={`${hasLiked[activeClip.id] ? 'text-[#f80759] fill-[#f80759] scale-125' : 'text-white'} transition-all`} 
                  />
                </div>
                <span className="text-[10px] font-bold text-white mt-0.5">{activeClip.likes}</span>
              </button>

              {/* Comments Button */}
              <div className="flex flex-col items-center">
                <div className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white">
                  <MessageCircle size={20} className="fill-transparent text-white" />
                </div>
                <span className="text-[10px] font-bold text-white mt-0.5">{activeClip.comments}</span>
              </div>

              {/* Share Button */}
              <div className="flex flex-col items-center">
                <div className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white">
                  <Share2 size={20} className="fill-transparent text-white" />
                </div>
                <span className="text-[10px] font-bold text-white mt-0.5">{activeClip.shares}</span>
              </div>

              {/* Spinning Sound Disc Icon */}
              <div className="relative pt-2">
                <div className="w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
                  <div className="w-4 h-4 rounded-full bg-[#f80759] flex items-center justify-center">
                    <Music size={8} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* TikTok Bottom Info Overlay */}
            <div className="absolute left-4 right-14 bottom-4 z-20 text-white font-sans text-left">
              {/* Handle name */}
              <h4 className="font-bold text-sm flex items-center gap-1">
                @{activeClip.handle}
                <span className="inline-block h-3.5 w-3.5 bg-[#00c6ff] text-zinc-950 font-black rounded-full text-[8px] flex items-center justify-center">✓</span>
              </h4>
              
              {/* Caption */}
              <p className="text-xs text-zinc-200 line-clamp-3 mt-1 font-normal leading-relaxed">
                {activeClip.caption}
              </p>

              {/* Sound banner */}
              <div className="flex items-center space-x-1.5 mt-2 bg-black/30 backdrop-blur-sm p-1 rounded-md max-w-max">
                <Music size={10} className="text-white animate-bounce" />
                <div className="w-24 overflow-hidden text-[9px] font-medium text-zinc-300 whitespace-nowrap relative">
                  <div className="inline-block animate-marquee-text pr-4">{activeClip.songName}</div>
                </div>
              </div>

              {/* Dynamic product sticker direct check out */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onShopClick(activeClip.id === 'clip-1' ? 'aura-tee' : activeClip.id === 'clip-2' ? 'urdu-sukun-tee' : 'cyber-hyd-tee')}
                className="mt-3 w-full bg-gradient-to-r from-[#00c6ff] via-purple-600 to-[#f80759] text-white text-xs font-extrabold uppercase py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(248,7,89,0.3)] animate-pulse border border-white/10"
              >
                <ShoppingBag size={12} />
                <span>Buy: {activeClip.tshirtName}</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Side: Showcase Description & Selectors */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-yellow-400" />
              TikTok Creators’ Favorite Fits
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              Our tees have racked up millions of views across Pakistani social media for a simple reason: <strong className="text-white">Zero compromise on quality</strong>. We weave, dye, and print every garment in our local facility, tailoring the fit perfectly for our youth.
            </p>

            {/* Quick Clip Selector Tabs */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Select Influencer Reel</span>
              <div className="flex flex-col gap-2">
                {clips.map((clip, index) => (
                  <button
                    key={clip.id}
                    onClick={() => {
                      setActiveClipIndex(index);
                      setHeartsList([]);
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      activeClipIndex === index
                        ? 'bg-gradient-to-r from-zinc-900 to-black border-zinc-700 shadow-lg'
                        : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={clip.imagePoster}
                        alt={clip.influencerName}
                        className="w-10 h-10 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left">
                        <p className="text-xs font-bold text-white">@{clip.handle}</p>
                        <p className="text-[10px] text-zinc-400">{clip.influencerName}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-lg bg-zinc-800 text-[#00c6ff] uppercase tracking-wider">
                      {clip.likes} Likes
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quote of the Influencer */}
            <div className="border-l-4 border-[#f80759] pl-4 py-1 italic text-xs text-zinc-400 font-medium">
              "The sizing fits like high-end Zara/H&M streetwear, and the heavy cotton feel is literally insane. Definitely the best drops of 2026."
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Scanlines vertical loop */
        @keyframes scanlines {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
        .animate-scanlines {
          animation: scanlines 12s linear infinite;
        }
        
        /* Marquee text for song title inside player */
        @keyframes marquee-text {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
        .animate-marquee-text {
          animation: marquee-text 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
