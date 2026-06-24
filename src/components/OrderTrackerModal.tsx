import React, { useState, useEffect } from 'react';
import { Search, Package, MapPin, Truck, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';
import { PRODUCTS } from '../data';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderTrackerModal({ isOpen, onClose }: OrderTrackerModalProps) {
  const [searchKey, setSearchKey] = useState('');
  const [foundOrders, setFoundOrders] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);
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

  // Search orders in localStorage
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    if (!searchKey.trim()) return;

    const existingOrdersRaw = localStorage.getItem('hyd_orders');
    if (existingOrdersRaw) {
      const orders: Order[] = JSON.parse(existingOrdersRaw);
      const filtered = orders.filter(
        o => o.id.toLowerCase() === searchKey.trim().toLowerCase() || o.phone.replace(/[\s-]/g, '').includes(searchKey.trim().replace(/[\s-]/g, ''))
      );
      setFoundOrders(filtered);
    } else {
      setFoundOrders([]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal content container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-lg p-6 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,198,255,0.25)] text-left"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Icon + Title */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 bg-gradient-to-r from-[#00c6ff] to-[#f80759] rounded-xl text-black">
              <Truck size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-lg font-black font-sans text-white tracking-tight">Track Your T-Shirt Package</h3>
              <p className="text-xs text-zinc-400">Enter your Order ID or registered Mobile Number.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3.5 top-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="e.g. HYD-12345 or 03001234567"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 pl-10 pr-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00c6ff] focus:ring-1 focus:ring-[#00c6ff]/30 text-white placeholder:text-zinc-600 uppercase"
                />
              </div>
              <button
                type="submit"
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Results */}
          <div className="mt-6 border-t border-zinc-900 pt-6 min-h-[160px] max-h-[350px] overflow-y-auto">
            {searched ? (
              foundOrders.length > 0 ? (
                <div className="space-y-6">
                  {foundOrders.map((order) => {
                    const product = PRODUCTS.find(p => p.id === order.productId);
                    return (
                      <div key={order.id} className="space-y-4">
                        {/* Order Mini summary */}
                        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl flex justify-between items-start text-xs font-sans">
                          <div>
                            <p className="font-extrabold text-white text-sm">{order.customerName}</p>
                            <p className="text-zinc-500 font-mono mt-0.5">Order ID: {order.id} • {order.city}</p>
                            <p className="text-[#00c6ff] font-bold mt-1">{product?.name} (Size {order.size})</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                              Cash on Delivery
                            </span>
                            <p className="font-black text-white text-sm mt-1.5">Rs. {order.totalPrice}</p>
                          </div>
                        </div>

                        {/* Tracker Timeline visual */}
                        <div className="space-y-5 pl-2 font-sans">
                          {/* Step 1: Placed */}
                          <div className="flex gap-4 relative">
                            {/* Connect line */}
                            <div className="absolute left-2.5 top-5 bottom-0 w-0.5 bg-[#10b981]" />
                            <div className="h-5 w-5 bg-[#10b981] rounded-full flex items-center justify-center text-white shrink-0 mt-0.5">
                              <CheckCircle size={10} className="stroke-[3]" />
                            </div>
                            <div className="text-left text-xs">
                              <h4 className="font-bold text-white">Order Confirmed</h4>
                              <p className="text-zinc-400 mt-0.5">Your package order has been verified. Preparing for packaging check.</p>
                              <span className="text-[10px] text-zinc-500 font-mono">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Step 2: Packed */}
                          <div className="flex gap-4 relative">
                            {/* Connect line */}
                            <div className="absolute left-2.5 top-5 bottom-0 w-0.5 bg-zinc-800" />
                            <div className="h-5 w-5 bg-[#00c6ff] rounded-full flex items-center justify-center text-zinc-950 shrink-0 mt-0.5 animate-pulse">
                              <Clock size={10} className="stroke-[3]" />
                            </div>
                            <div className="text-left text-xs">
                              <h4 className="font-bold text-white">Quality Checked & Packed</h4>
                              <p className="text-zinc-400 mt-0.5">T-shirt undergoes standard puff print inspect and secure box seal.</p>
                              <span className="text-[10px] text-zinc-500 font-mono">In Progress</span>
                            </div>
                          </div>

                          {/* Step 3: Dispatch */}
                          <div className="flex gap-4 relative">
                            <div className="h-5 w-5 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-600 shrink-0 mt-0.5">
                              <Package size={10} />
                            </div>
                            <div className="text-left text-xs">
                              <h4 className="font-bold text-zinc-500">Shipped via TRAX Express</h4>
                              <p className="text-zinc-500 mt-0.5">Expected dispatch tomorrow. Tracking link will be messaged to {order.phone}.</p>
                            </div>
                          </div>
                        </div>

                        {/* WhatsApp Speed-up Button */}
                        <a
                          href={`https://wa.me/${waNumber}?text=Salam%2C%20please%20speed%20up%20my%20order%20status%20${order.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 py-2 px-4 rounded-xl text-xs font-bold text-center block transition-all"
                        >
                          💬 Send WhatsApp to Speed Up Delivery
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <AlertCircle size={28} className="text-red-500 mx-auto" />
                  <div>
                    <p className="text-xs font-bold text-white">No active orders found</p>
                    <p className="text-[11px] text-zinc-400 max-w-xs mx-auto leading-relaxed mt-1">
                      We couldn't locate any order with "{searchKey}". Ensure you entered the correct phone or order reference.
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center py-8 space-y-2 font-sans">
                <Package size={28} className="text-zinc-700 mx-auto animate-bounce" />
                <div>
                  <p className="text-xs font-bold text-zinc-400">Awaiting search query...</p>
                  <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                    Type your details above to check real-time status of your COD parcel.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
