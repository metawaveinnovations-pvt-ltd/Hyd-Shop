import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, ShoppingBag, Package, DollarSign, 
  Settings, Key, Plus, Trash2, Edit3, CheckCircle, 
  Truck, XCircle, Search, RefreshCw, BarChart2, MessageSquare, 
  HelpCircle, ArrowLeft, Save, PlusCircle, CreditCard, Percent
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Order } from '../types';
import { PRODUCTS, REVIEWS, PAKISTANI_CITIES } from '../data';
import { Logo } from './Header';

interface AdminPanelProps {
  onClose: () => void;
  onProductsUpdate?: (updatedProducts: Product[]) => void;
}

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface Coupon {
  code: string;
  discountPercent: number;
  isActive: boolean;
}

export function AdminPanel({ onClose, onProductsUpdate }: AdminPanelProps) {
  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'accounts' | 'coupons' | 'settings'>('overview');

  // Core States
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  // Filtering & Searching States
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  
  // Custom Settings (Saved to localStorage)
  const [helplineNumber, setHelplineNumber] = useState('03000000000');
  const [marqueeText, setMarqueeText] = useState('🔥 MID-SUMMER SLASH SALE: FLAT 50% OFF FOR A LIMITED TIME! • FREE COD NATIONWIDE');
  const [isStoreClosed, setIsStoreClosed] = useState(false);

  // New Expense Entry Form state
  const [expenseCategory, setExpenseCategory] = useState('TikTok Ads');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');

  // New Coupon Entry Form state
  const [couponCode, setCouponCode] = useState('');
  const [couponPercent, setCouponPercent] = useState('');

  // Load all initial configurations on mount
  useEffect(() => {
    // 1. Check Auth state (keep session alive during editing)
    const sessionAuth = sessionStorage.getItem('hyd_admin_authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }

    // 2. Load Orders
    const savedOrders = localStorage.getItem('hyd_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Seed some demo orders if empty, to make the dashboard look gorgeous instantly
      const demoOrders: Order[] = [
        {
          id: 'HYD-84201',
          customerName: 'Muhammad Hamza',
          phone: '03214567890',
          city: 'Lahore',
          address: 'House 42-B, Sector Z, DHA Phase 6',
          productId: 'aura-tee',
          size: 'L',
          quantity: 2,
          totalPrice: 2998,
          paymentMethod: 'COD',
          status: 'delivered',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'HYD-91024',
          customerName: 'Areeba Fatima',
          phone: '03009876543',
          city: 'Karachi',
          address: 'Apartment 403, Park View Heights, Clifton',
          productId: 'urdu-sukun-tee',
          size: 'M',
          quantity: 1,
          totalPrice: 1499,
          paymentMethod: 'COD',
          status: 'shipped',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'HYD-71052',
          customerName: 'Zain Malik',
          phone: '03331122334',
          city: 'Islamabad',
          address: 'Street 12, G-11/3',
          productId: 'cyber-hyd-tee',
          size: 'XL',
          quantity: 1,
          totalPrice: 1599,
          paymentMethod: 'COD',
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('hyd_orders', JSON.stringify(demoOrders));
      setOrders(demoOrders);
    }

    // 3. Load Products & Stock overrides
    const savedProducts = localStorage.getItem('hyd_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      localStorage.setItem('hyd_products', JSON.stringify(PRODUCTS));
      setProducts(PRODUCTS);
    }

    // 4. Load Expenses
    const savedExpenses = localStorage.getItem('hyd_expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else {
      const demoExpenses: Expense[] = [
        { id: 'exp-1', category: 'TikTok Ads', amount: 3500, description: 'Direct campaign for Sukun & Aura Tees', date: '2026-06-22' },
        { id: 'exp-2', category: 'Packaging', amount: 800, description: 'Zip lock polybags & custom sticker packs', date: '2026-06-21' },
        { id: 'exp-3', category: 'Influencer PR', amount: 2000, description: 'Free parcel review to @ahmad_vlogs', date: '2026-06-20' }
      ];
      localStorage.setItem('hyd_expenses', JSON.stringify(demoExpenses));
      setExpenses(demoExpenses);
    }

    // 5. Load Coupons
    const savedCoupons = localStorage.getItem('hyd_coupons');
    if (savedCoupons) {
      setCoupons(JSON.parse(savedCoupons));
    } else {
      const demoCoupons: Coupon[] = [
        { code: 'TIKTOK50', discountPercent: 50, isActive: true },
        { code: 'HYD10', discountPercent: 10, isActive: true },
        { code: 'STREET15', discountPercent: 15, isActive: true }
      ];
      localStorage.setItem('hyd_coupons', JSON.stringify(demoCoupons));
      setCoupons(demoCoupons);
    }

    // 6. Load Settings
    const savedHelpline = localStorage.getItem('hyd_helpline');
    if (savedHelpline) setHelplineNumber(savedHelpline);
    
    const savedMarquee = localStorage.getItem('hyd_marquee');
    if (savedMarquee) setMarqueeText(savedMarquee);

    const savedClosed = localStorage.getItem('hyd_store_closed');
    if (savedClosed) setIsStoreClosed(savedClosed === 'true');

  }, []);

  // Handle Admin Authorization
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default secret credentials popular with local operations
    if (password === 'admin123' || password === 'hyd99' || password === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('hyd_admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('❌ Galat password! Type admin123 or hyd99.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('hyd_admin_authenticated');
  };

  // Status Upgrades for Orders
  const updateOrderStatus = (orderId: string, nextStatus: 'pending' | 'shipped' | 'delivered') => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: nextStatus };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem('hyd_orders', JSON.stringify(updated));
  };

  const deleteOrder = (orderId: string) => {
    if (confirm(`Do you want to cancel and delete order ${orderId}?`)) {
      const updated = orders.filter(o => o.id !== orderId);
      setOrders(updated);
      localStorage.setItem('hyd_orders', JSON.stringify(updated));
    }
  };

  // Add Custom Expense entry
  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseAmount || isNaN(Number(expenseAmount))) {
      alert('Please enter a valid numeric amount.');
      return;
    }

    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      category: expenseCategory,
      amount: Math.round(Number(expenseAmount)),
      description: expenseDesc.trim() || `${expenseCategory} expense`,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newExp, ...expenses];
    setExpenses(updated);
    localStorage.setItem('hyd_expenses', JSON.stringify(updated));

    // Clear form
    setExpenseAmount('');
    setExpenseDesc('');
  };

  const deleteExpense = (id: string) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    localStorage.setItem('hyd_expenses', JSON.stringify(updated));
  };

  // Add Custom Promo Coupon Code
  const addCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const percent = Number(couponPercent);
    if (isNaN(percent) || percent < 1 || percent > 90) {
      alert('Please enter a valid discount percentage between 1 and 90.');
      return;
    }

    const newCoupon: Coupon = {
      code: couponCode.trim().toUpperCase(),
      discountPercent: Math.round(percent),
      isActive: true
    };

    // check if duplicate
    if (coupons.some(c => c.code === newCoupon.code)) {
      alert('Coupon code already exists.');
      return;
    }

    const updated = [newCoupon, ...coupons];
    setCoupons(updated);
    localStorage.setItem('hyd_coupons', JSON.stringify(updated));

    // Clear form
    setCouponCode('');
    setCouponPercent('');
  };

  const toggleCouponStatus = (code: string) => {
    const updated = coupons.map(c => {
      if (c.code === code) return { ...c, isActive: !c.isActive };
      return c;
    });
    setCoupons(updated);
    localStorage.setItem('hyd_coupons', JSON.stringify(updated));
  };

  const deleteCoupon = (code: string) => {
    const updated = coupons.filter(c => c.code !== code);
    setCoupons(updated);
    localStorage.setItem('hyd_coupons', JSON.stringify(updated));
  };

  // Update Global Settings
  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hyd_helpline', helplineNumber);
    localStorage.setItem('hyd_marquee', marqueeText);
    localStorage.setItem('hyd_store_closed', String(isStoreClosed));
    alert('✅ Settings saved! Refresh the storefront to view live updates.');
  };

  // Sync Products Stock override
  const handleStockChange = (productId: string, size: string, change: number) => {
    // We can track custom stock in local storage
    const updated = products.map(p => {
      if (p.id === productId) {
        // Just as an illustration and fully working functionality, let's keep track of stock levels
        // we can store a dynamically attached stock object inside the product
        const currentStocks = (p as any).stocks || { M: 50, L: 80, XL: 40, XXL: 20 };
        const updatedStocks = {
          ...currentStocks,
          [size]: Math.max(0, (currentStocks[size] || 0) + change)
        };
        return {
          ...p,
          stocks: updatedStocks
        };
      }
      return p;
    });

    setProducts(updated);
    localStorage.setItem('hyd_products', JSON.stringify(updated));
    if (onProductsUpdate) {
      onProductsUpdate(updated);
    }
  };

  // Financial Calculations for Pakistan T-Shirt Commerce
  // Selling Price average is Rs. 1500
  // Sourcing Cost / COGS is roughly Rs. 550 per organic 240 GSM heavy combed-cotton tee
  // Packaging, polybags, stickers: Rs. 40 per order
  // Courier shipping average: Rs. 180 per parcel
  const cogsPerShirt = 550;
  const deliveryExpensePerOrder = 180;
  const packagingCostPerOrder = 40;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'pending' ? o.totalPrice : 0), 0);
  const totalQtyOrdered = orders.reduce((sum, o) => sum + (o.status !== 'pending' ? o.quantity : 0), 0);
  
  // Cost analysis
  const totalCogs = totalQtyOrdered * cogsPerShirt;
  const totalShippingExpenses = orders.filter(o => o.status !== 'pending').length * deliveryExpensePerOrder;
  const totalPackagingExpenses = orders.filter(o => o.status !== 'pending').length * packagingCostPerOrder;
  const loggedExpensesSum = expenses.reduce((sum, e) => sum + e.amount, 0);

  const totalCostOfGoods = totalCogs + totalShippingExpenses + totalPackagingExpenses;
  const grossProfit = totalRevenue - totalCostOfGoods;
  const netProfit = grossProfit - loggedExpensesSum;

  // Filter Orders for table
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) || 
                          o.phone.includes(orderSearch) || 
                          o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          o.city.toLowerCase().includes(orderSearch.toLowerCase());
    
    if (orderStatusFilter === 'all') return matchesSearch;
    return o.status === orderStatusFilter && matchesSearch;
  });

  return (
    <div id="admin-panel-container" className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      
      {/* Top Admin Header */}
      <header className="bg-black/90 border-b border-zinc-800/80 px-6 py-4 flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center space-x-4">
          <Logo className="h-12 w-28 sm:h-14 sm:w-32" />
          <div className="h-6 w-px bg-zinc-800" />
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#f80759] animate-pulse" />
            Merchant Control Panel
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full cursor-pointer transition-colors"
            >
              Sign Out
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#00c6ff] to-[#f80759] text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full cursor-pointer hover:scale-103 transition-transform flex items-center gap-1.5"
          >
            <ArrowLeft size={12} />
            <span>Back to Store</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      {!isAuthenticated ? (
        /* Secure Auth Screen */
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,7,89,0.05)_0%,transparent_60%)] pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm bg-zinc-900/60 border border-zinc-800/80 p-8 rounded-3xl text-center space-y-6 relative overflow-hidden shadow-2xl"
          >
            {/* Lock icon */}
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-[#00c6ff] to-[#f80759] p-0.5 rounded-2xl flex items-center justify-center text-zinc-950 shadow-lg">
              <div className="bg-zinc-950 h-full w-full rounded-[14px] flex items-center justify-center text-[#f80759]">
                <Key size={24} className="stroke-[2.5]" />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-black tracking-tight">Staff / Admin Login</h2>
              <p className="text-xs text-zinc-400 mt-1">Provide merchant passcode to access inventory & finance ledger.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                id="admin-password-input"
                type="password"
                placeholder="Passcode (e.g. admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 text-white border border-zinc-800 px-4 py-3 rounded-xl text-center text-sm focus:outline-none focus:border-[#00c6ff] tracking-widest font-mono"
                required
              />

              {authError && (
                <p className="text-xs font-bold text-red-500 font-mono">{authError}</p>
              )}

              <button
                id="btn-admin-submit-login"
                type="submit"
                className="w-full bg-white text-zinc-950 hover:bg-gradient-to-r hover:from-[#00c6ff] hover:to-[#f80759] hover:text-white py-3 px-6 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                Access Dashboard
              </button>
            </form>

            <p className="text-[10px] text-zinc-500 font-mono">
              Tip: Default developers passcode is <strong className="text-zinc-400">admin123</strong> or <strong className="text-zinc-400">hyd99</strong>
            </p>
          </motion.div>
        </div>
      ) : (
        /* Authenticated Control Area */
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 bg-black/60 border-r border-zinc-900 px-4 py-6 space-y-2 flex-shrink-0 text-left">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest pl-3.5 block mb-3">Merchant Actions</span>
            
            <nav className="space-y-1.5 font-sans">
              {[
                { id: 'overview', label: 'Dashboard Overview', icon: <TrendingUp size={16} /> },
                { id: 'orders', label: 'Order Manager', icon: <ShoppingBag size={16} /> },
                { id: 'inventory', label: 'Inventory & Stock', icon: <Package size={16} /> },
                { id: 'accounts', label: 'Accounts & Expense', icon: <DollarSign size={16} /> },
                { id: 'coupons', label: 'Coupons & Promos', icon: <Percent size={16} /> },
                { id: 'settings', label: 'Special Settings', icon: <Settings size={16} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-zinc-900 to-black border-l-4 border-[#f80759] text-[#00c6ff] shadow-lg'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/30'
                  }`}
                >
                  <span className={activeTab === tab.id ? 'text-[#f80759]' : 'text-zinc-500'}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="border-t border-zinc-900 pt-6 mt-6 space-y-4 text-xs font-mono pl-3.5 text-zinc-500">
              <div>
                <p className="text-[10px] text-zinc-600">LIVE STATS</p>
                <p className="text-zinc-400 font-bold mt-1">₨ {totalRevenue} Sales</p>
                <p className="text-emerald-400 font-bold">₨ {netProfit} Profits</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-600">STORE STATUS</p>
                <p className="text-emerald-400 font-bold mt-1">● Online Accepting Orders</p>
              </div>
            </div>
          </aside>

          {/* Tab View Container */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto text-left">
            
            {/* 1. OVERVIEW / DASHBOARD TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white font-sans">Business Health Dashboard</h2>
                  <p className="text-xs text-zinc-400 mt-1">Calculated based on manufacturing, shipping costs, and direct expense deductions.</p>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Revenue", value: `₨ ${totalRevenue}`, desc: `${orders.filter(o => o.status !== 'pending').length} confirmed orders`, color: 'text-[#00c6ff]' },
                    { label: "Total Net Profit", value: `₨ ${netProfit}`, desc: "After COGS & ad spends", color: 'text-emerald-400' },
                    { label: "Total Items Sold", value: `${totalQtyOrdered} Tees`, desc: "Heavy 240 GSM stock", color: 'text-yellow-400' },
                    { label: "Direct Expenses", value: `₨ ${totalShippingExpenses + totalPackagingExpenses + loggedExpensesSum}`, desc: "Courier + Packaging + Ads", color: 'text-[#f80759]' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-2xl space-y-2">
                      <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                      <p className={`text-xl sm:text-2xl font-black ${stat.color}`}>{stat.value}</p>
                      <p className="text-[10px] text-zinc-400">{stat.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Sub-Ledger Calculations breakdown chart */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                  
                  {/* Financial Summary card */}
                  <div className="lg:col-span-5 bg-zinc-900/20 border border-zinc-900 p-6 rounded-3xl space-y-4">
                    <h3 className="text-sm font-bold font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-900 pb-3">Finance Ledger Model (PKR)</h3>
                    
                    <div className="space-y-3.5 text-xs font-sans">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Gross Sales Income:</span>
                        <strong className="text-white">₨ {totalRevenue}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">T-Shirt COGS (₨ {cogsPerShirt}/unit):</span>
                        <strong className="text-red-400">- ₨ {totalCogs}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Courier Shipping Cost (₨ {deliveryExpensePerOrder}/order):</span>
                        <strong className="text-red-400">- ₨ {totalShippingExpenses}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Packaging & Polybags (₨ {packagingCostPerOrder}/order):</span>
                        <strong className="text-red-400">- ₨ {totalPackagingExpenses}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">TikTok Campaign Spends (Logged):</span>
                        <strong className="text-red-400">- ₨ {loggedExpensesSum}</strong>
                      </div>
                      <div className="h-px bg-zinc-900 my-1" />
                      <div className="flex justify-between text-sm font-bold text-emerald-400">
                        <span className="flex items-center gap-1">💰 Dynamic Net Revenue:</span>
                        <strong className="text-base font-black">₨ {netProfit}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Graphic Performance by City custom SVG representation */}
                  <div className="lg:col-span-7 bg-zinc-900/20 border border-zinc-900 p-6 rounded-3xl space-y-4">
                    <h3 className="text-sm font-bold font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-900 pb-3">Top Selling Cities Breakdown</h3>
                    
                    {/* Visual Bar rows representing Pakistan city sales density */}
                    <div className="space-y-4 font-sans text-xs">
                      {[
                        { city: 'Karachi', percentage: 48, ordersCount: 22, color: 'bg-[#00c6ff]' },
                        { city: 'Lahore', percentage: 32, ordersCount: 15, color: 'bg-[#f80759]' },
                        { city: 'Islamabad / Rawalpindi', percentage: 14, ordersCount: 7, color: 'bg-purple-500' },
                        { city: 'Faisalabad / Peshawar', percentage: 6, ordersCount: 3, color: 'bg-yellow-500' }
                      ].map((bar, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-zinc-400 font-medium">
                            <span className="text-white font-bold">{bar.city}</span>
                            <span>{bar.ordersCount} Orders ({bar.percentage}%)</span>
                          </div>
                          <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden">
                            <div className={`${bar.color} h-full rounded-full`} style={{ width: `${bar.percentage}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* 2. ORDER MANAGER TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-white">Order Management Portal</h2>
                    <p className="text-xs text-zinc-400 mt-0.5">Filter, verify customer addresses, and upgrade delivery courier status.</p>
                  </div>

                  {/* Quick Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="bg-zinc-900 text-xs border border-zinc-800 px-3 py-2 rounded-xl text-white font-bold"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search size={14} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search by Name, Phone Number, City, or Order ID..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 pl-10 pr-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00c6ff] text-white"
                  />
                </div>

                {/* Orders Grid Table */}
                <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 font-mono font-bold">
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Customer Details</th>
                          <th className="p-4">Product Info</th>
                          <th className="p-4">Total Price</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {filteredOrders.length > 0 ? (
                          filteredOrders.map((order) => {
                            const product = PRODUCTS.find(p => p.id === order.productId);
                            return (
                              <tr key={order.id} className="hover:bg-zinc-900/10 transition-colors">
                                <td className="p-4 font-mono font-bold text-zinc-400">{order.id}</td>
                                <td className="p-4 space-y-0.5">
                                  <p className="font-bold text-white text-xs">{order.customerName}</p>
                                  <p className="text-[10px] text-zinc-400 font-mono">{order.phone}</p>
                                  <p className="text-[10px] text-zinc-500 leading-normal">{order.address}, <strong className="text-zinc-400">{order.city}</strong></p>
                                </td>
                                <td className="p-4">
                                  <p className="font-bold text-[#00c6ff]">{product?.name || 'T-Shirt'}</p>
                                  <p className="text-[10px] text-zinc-400">Size: {order.size} • Qty: {order.quantity}</p>
                                </td>
                                <td className="p-4 font-mono font-bold text-white">Rs. {order.totalPrice}</td>
                                <td className="p-4">
                                  <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
                                    order.status === 'delivered' 
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                      : order.status === 'shipped'
                                      ? 'bg-[#00c6ff]/10 text-[#00c6ff] border border-[#00c6ff]/20 animate-pulse'
                                      : 'bg-[#f80759]/10 text-[#f80759] border border-[#f80759]/20'
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td className="p-4 text-center space-y-1">
                                  <div className="flex gap-1.5 justify-center">
                                    {/* Upgrade Status actions */}
                                    {order.status === 'pending' && (
                                      <button
                                        onClick={() => updateOrderStatus(order.id, 'shipped')}
                                        className="bg-[#00c6ff] text-zinc-950 font-bold px-2 py-1 rounded font-mono text-[9px] hover:scale-105 transition-transform cursor-pointer uppercase"
                                      >
                                        Ship Package
                                      </button>
                                    )}
                                    {order.status === 'shipped' && (
                                      <button
                                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                                        className="bg-emerald-400 text-zinc-950 font-bold px-2 py-1 rounded font-mono text-[9px] hover:scale-105 transition-transform cursor-pointer uppercase"
                                      >
                                        Deliver
                                      </button>
                                    )}
                                    {/* Direct customer confirmation call button */}
                                    <a
                                      href={`https://wa.me/${order.phone.replace(/^0/, '92')}?text=Salam%20${order.customerName}%21%20This%20is%20HYD%20Shop%20Pakistan.%20Confirm%20your%20oversized%20T-shirt%20order%20${order.id}%20for%20delivery%3F`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white p-1 rounded hover:scale-105 transition-transform cursor-pointer flex items-center justify-center"
                                      title="WhatsApp Customer"
                                    >
                                      <MessageSquare size={12} className="fill-white" />
                                    </a>
                                    
                                    {/* Delete/Cancel Button */}
                                    <button
                                      onClick={() => deleteOrder(order.id)}
                                      className="bg-zinc-800 text-zinc-400 hover:text-red-500 p-1 rounded hover:scale-105 transition-transform cursor-pointer"
                                      title="Cancel Order"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-zinc-500 font-mono">No matching customer orders found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 3. INVENTORY & STOCK MANAGEMENT */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">Live Stock & Sizing Controller</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Control live quantities of oversized t-shirts. Setting a size stock to 0 disables that size button in storefront.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map((product) => {
                    const currentStocks = (product as any).stocks || { M: 50, L: 80, XL: 40, XXL: 20 };
                    return (
                      <div key={product.id} className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-2xl space-y-4">
                        <div className="flex gap-3 items-center">
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                          <div>
                            <h3 className="text-sm font-bold text-white">{product.name}</h3>
                            <p className="text-[10px] text-zinc-500 font-mono">{product.gsm} GSM • {product.fabric}</p>
                          </div>
                        </div>

                        {/* Size quantities controller */}
                        <div className="space-y-2.5 pt-2">
                          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Adjust stock by size:</span>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                            {['M', 'L', 'XL', 'XXL'].map((sz) => {
                              const qty = currentStocks[sz] ?? 0;
                              return (
                                <div key={sz} className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-900 flex flex-col items-center gap-1.5">
                                  <span className="font-bold text-zinc-400 font-mono">Size {sz}</span>
                                  <span className={`text-sm font-extrabold ${qty === 0 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{qty} Pcs</span>
                                  
                                  {/* Plus/Minus triggers */}
                                  <div className="flex gap-1 pt-1.5 w-full">
                                    <button
                                      onClick={() => handleStockChange(product.id, sz, -5)}
                                      className="bg-zinc-900 hover:bg-zinc-800 text-white flex-1 py-1 rounded text-[10px] font-black cursor-pointer font-sans"
                                    >
                                      -5
                                    </button>
                                    <button
                                      onClick={() => handleStockChange(product.id, sz, 5)}
                                      className="bg-zinc-900 hover:bg-zinc-800 text-white flex-1 py-1 rounded text-[10px] font-black cursor-pointer font-sans"
                                    >
                                      +5
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. ACCOUNTS & BUSINESS EXPENSE LEDGER */}
            {activeTab === 'accounts' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">Accounts & Expenses Ledger</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Input your daily platform expenses (such as TikTok promotion costs, office/shop utility costs, influencer PR gifts) to dynamically generate real net margins.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Expense Form */}
                  <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl space-y-4">
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-3">Log Expense Row</h3>
                    
                    <form onSubmit={addExpense} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Category</label>
                        <select
                          value={expenseCategory}
                          onChange={(e) => setExpenseCategory(e.target.value)}
                          className="w-full bg-zinc-950 text-white border border-zinc-850 px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00c6ff]"
                        >
                          <option value="TikTok Ads">TikTok Ad Campaigns</option>
                          <option value="Packaging">Packaging Accessories (Boxes/Polybags)</option>
                          <option value="PR Parcels">Influencer/Reviewer PR T-shirts</option>
                          <option value="Sourcing / Logistics">Extra Logistics / Fuel cost</option>
                          <option value="Office / Staff">Utility Bills / Warehouse Rent</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Amount (PKR)</label>
                        <input
                          type="number"
                          placeholder="e.g. 5000"
                          value={expenseAmount}
                          onChange={(e) => setExpenseAmount(e.target.value)}
                          className="w-full bg-zinc-950 text-white border border-zinc-850 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00c6ff]"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Short Description</label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Spent on TikTok transition video ad targeted to Gen-Z audience"
                          value={expenseDesc}
                          onChange={(e) => setExpenseDesc(e.target.value)}
                          className="w-full bg-zinc-950 text-white border border-zinc-850 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00c6ff] resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-white hover:bg-gradient-to-r hover:from-[#00c6ff] hover:to-[#f80759] hover:text-white text-zinc-950 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer"
                      >
                        Add Log Entry
                      </button>
                    </form>
                  </div>

                  {/* Expense logs list */}
                  <div className="lg:col-span-7 bg-zinc-900/20 border border-zinc-900 p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                      <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Logged Ledger Expenses</h3>
                      <span className="text-xs font-mono text-[#f80759] font-bold">Sum: ₨ {loggedExpensesSum}</span>
                    </div>

                    <div className="space-y-3 max-h-[350px] overflow-y-auto">
                      {expenses.length > 0 ? (
                        expenses.map((exp) => (
                          <div key={exp.id} className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-900/80 flex justify-between items-center text-xs">
                            <div className="text-left space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-white">{exp.category}</span>
                                <span className="text-[9px] text-zinc-500 font-mono">{exp.date}</span>
                              </div>
                              <p className="text-[10px] text-zinc-400 font-medium">{exp.description}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-red-400 font-mono">-₨ {exp.amount}</span>
                              <button
                                onClick={() => deleteExpense(exp.id)}
                                className="text-zinc-600 hover:text-red-500 cursor-pointer transition-colors"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-zinc-500 font-mono text-center py-8">No logged expenditures yet.</p>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 5. COUPONS & PROMOS MARKETING */}
            {activeTab === 'coupons' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">Coupons & Special Promos</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Configure discounts that customers can type in the Cash on Delivery checkout form to deduct percentages.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Coupon Form */}
                  <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl space-y-4">
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-3">Create Coupon Code</h3>
                    
                    <form onSubmit={addCoupon} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Coupon Code</label>
                        <input
                          type="text"
                          placeholder="e.g. LAHORE15"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full bg-zinc-950 text-white border border-zinc-850 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase focus:outline-none focus:border-[#00c6ff] placeholder:normal-case"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Discount Percentage (%)</label>
                        <input
                          type="number"
                          placeholder="e.g. 15"
                          value={couponPercent}
                          onChange={(e) => setCouponPercent(e.target.value)}
                          className="w-full bg-zinc-950 text-white border border-zinc-850 px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#00c6ff]"
                          min="1"
                          max="90"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-white hover:bg-gradient-to-r hover:from-[#00c6ff] hover:to-[#f80759] hover:text-white text-zinc-950 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer"
                      >
                        Create Code
                      </button>
                    </form>
                  </div>

                  {/* Coupons list */}
                  <div className="lg:col-span-7 bg-zinc-900/20 border border-zinc-900 p-6 rounded-2xl space-y-4">
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-3">Live Checkout Coupons</h3>

                    <div className="space-y-3">
                      {coupons.length > 0 ? (
                        coupons.map((coupon) => (
                          <div key={coupon.code} className="bg-zinc-950 p-4 rounded-xl border border-zinc-900/80 flex justify-between items-center text-xs">
                            <div className="text-left space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-sm text-[#00c6ff] bg-zinc-900 px-2.5 py-0.5 rounded-lg border border-zinc-800">{coupon.code}</span>
                                <span className="text-[10px] font-bold text-emerald-400 font-sans">{coupon.discountPercent}% Discount</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {/* Status Toggle */}
                              <button
                                onClick={() => toggleCouponStatus(coupon.code)}
                                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase cursor-pointer ${
                                  coupon.isActive 
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                                }`}
                              >
                                {coupon.isActive ? 'Active' : 'Disabled'}
                              </button>
                              <button
                                onClick={() => deleteCoupon(coupon.code)}
                                className="text-zinc-600 hover:text-red-500 cursor-pointer transition-colors"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-zinc-500 font-mono text-center py-8">No configured coupon discount codes.</p>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 6. SPECIAL SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h2 className="text-xl font-black text-white">Special Store Settings Updates</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Edit store marquee texts, customer service hotline channels, and platform status instantly.</p>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl">
                  <form onSubmit={saveSettings} className="space-y-5 text-xs font-sans">
                    
                    {/* Helpline number */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase">WhatsApp Helpline / Support phone number</label>
                      <input
                        type="text"
                        placeholder="e.g. 03000000000"
                        value={helplineNumber}
                        onChange={(e) => setHelplineNumber(e.target.value)}
                        className="w-full bg-zinc-950 text-white border border-zinc-800 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00c6ff]"
                        required
                      />
                      <p className="text-[9px] text-zinc-500 font-mono">This directs users' support clicks straight to your active mobile chat line.</p>
                    </div>

                    {/* Announcement Marquee text */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Announcement Tape Marquee Text</label>
                      <textarea
                        rows={3}
                        value={marqueeText}
                        onChange={(e) => setMarqueeText(e.target.value)}
                        className="w-full bg-zinc-950 text-white border border-zinc-800 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00c6ff]"
                        required
                      />
                      <p className="text-[9px] text-zinc-500 font-mono">This is looped infinitely across the top screen ribbon tape in storefront.</p>
                    </div>

                    {/* Toggle store closure */}
                    <div className="flex items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-900/80">
                      <div className="text-left">
                        <h4 className="font-bold text-white">Emergency Stop Order flow</h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Toggle this if stock runs completely dry to prevent buyer checkout errors.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={isStoreClosed}
                        onChange={(e) => setIsStoreClosed(e.target.checked)}
                        className="h-5 w-5 rounded bg-zinc-900 border-zinc-800 text-[#f80759] focus:ring-0 cursor-pointer"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#00c6ff] to-[#f80759] text-white py-3 px-6 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg"
                    >
                      Save Configuration
                    </button>
                  </form>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

    </div>
  );
}
