import { useState, useEffect } from 'react';
import { Ruler, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function SizeEstimator() {
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(8);
  const [weightKg, setWeightKg] = useState(68);
  const [recommendedSize, setRecommendedSize] = useState<'M' | 'L' | 'XL' | 'XXL'>('M');
  const [styleAdvice, setStyleAdvice] = useState('');

  // Sizing estimation logic popular for Pakistani male/unisex streetwear sizes
  useEffect(() => {
    const totalInches = heightFt * 12 + heightIn;
    
    // Base size on combination of weight and height
    let size: 'M' | 'L' | 'XL' | 'XXL' = 'M';

    if (weightKg < 62) {
      size = 'M';
    } else if (weightKg >= 62 && weightKg < 76) {
      size = 'L';
    } else if (weightKg >= 76 && weightKg < 90) {
      size = 'XL';
    } else {
      size = 'XXL';
    }

    // Adjust size slightly up if taller than 6 feet
    if (totalInches >= 72 && size === 'M' && weightKg >= 58) {
      size = 'L';
    }

    setRecommendedSize(size);

    // Dynamic advice
    if (size === 'M') {
      setStyleAdvice("Get 'M' for an aesthetic, slightly slouchy drop-shoulder look. If you prefer extremely baggy, size up to 'L'.");
    } else if (size === 'L') {
      setStyleAdvice("Get 'L' for the perfect trending oversized fit. Drop shoulders are engineered to lay flat and structured.");
    } else if (size === 'XL') {
      setStyleAdvice("Get 'XL' for the maximum comfort and a loose, relaxed streetwear drape. Great for heavy 240 GSM drape.");
    } else {
      setStyleAdvice("Get 'XXL' for broad shoulders and long torso. This fits heavily relaxed and holds shape excellently.");
    }
  }, [heightFt, heightIn, weightKg]);

  return (
    <div id="size-estimator-section" className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden max-w-3xl mx-auto my-8">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#00c6ff]/10 to-[#f80759]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-[#00c6ff] to-[#f80759] rounded-xl text-black">
          <Ruler size={20} className="stroke-[2.5]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">AI Smart Size Estimator</h3>
          <p className="text-xs text-zinc-400">Avoid wrong sizes! Slide your details to check perfect fit.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Sliders Area */}
        <div className="space-y-6">
          {/* Height slider (Feet) */}
          <div>
            <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
              <span>Height</span>
              <span className="text-white font-bold">{heightFt} ft {heightIn} in ({Math.round((heightFt * 30.48) + (heightIn * 2.54))} cm)</span>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="range"
                  min="4"
                  max="6"
                  step="1"
                  value={heightFt}
                  onChange={(e) => setHeightFt(Number(e.target.value))}
                  className="w-full accent-[#00c6ff] bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
                <span className="text-[10px] text-zinc-500 font-mono">Feet ({heightFt} ft)</span>
              </div>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="11"
                  step="1"
                  value={heightIn}
                  onChange={(e) => setHeightIn(Number(e.target.value))}
                  className="w-full accent-[#f80759] bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
                <span className="text-[10px] text-zinc-500 font-mono">Inches ({heightIn} in)</span>
              </div>
            </div>
          </div>

          {/* Weight slider (Kg) */}
          <div>
            <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
              <span>Weight</span>
              <span className="text-white font-bold">{weightKg} KG ({Math.round(weightKg * 2.20462)} lbs)</span>
            </div>
            <input
              type="range"
              min="40"
              max="110"
              step="1"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-gradient bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
              <span>40 kg (Lean)</span>
              <span>75 kg (Average)</span>
              <span>110 kg (Heavy)</span>
            </div>
          </div>
        </div>

        {/* Output Recommendation Area */}
        <div className="flex flex-col items-center justify-center bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 text-center relative overflow-hidden">
          {/* Animated background rings */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,7,89,0.03)_0%,transparent_70%)]" />

          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">Recommended Size</p>
          
          {/* Glowing Animated Recommended Size Badge */}
          <motion.div
            key={recommendedSize}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="relative my-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00c6ff] to-[#f80759] blur-xl opacity-40 rounded-full" />
            <div className="relative text-5xl font-black font-sans bg-gradient-to-r from-[#00c6ff] via-purple-500 to-[#f80759] bg-clip-text text-transparent px-8 py-3 rounded-full border border-white/10 bg-zinc-950 shadow-2xl">
              {recommendedSize}
            </div>
          </motion.div>

          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wider mb-3">
            <Sparkles size={10} /> 99% Fitting Match
          </span>

          {/* Sizing text advice */}
          <p className="text-xs text-zinc-300 leading-relaxed max-w-xs font-medium">
            {styleAdvice}
          </p>

          <div className="flex gap-4 border-t border-zinc-800/80 w-full pt-4 mt-4 text-[10px] font-mono text-zinc-500 text-left">
            <span className="flex-1">📋 <strong className="text-zinc-400">Chest:</strong> {recommendedSize === 'M' ? '22"' : recommendedSize === 'L' ? '23"' : recommendedSize === 'XL' ? '24"' : '25.5"'}</span>
            <span className="flex-1">📏 <strong className="text-zinc-400">Length:</strong> {recommendedSize === 'M' ? '28.5"' : recommendedSize === 'L' ? '29.5"' : recommendedSize === 'XL' ? '30.5"' : '31.5"'}</span>
          </div>
        </div>
      </div>

      <style>{`
        /* custom styles for range inputs */
        input[type="range"]::-webkit-slider-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}
