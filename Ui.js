import React, { useState, useMemo } from 'react';
import {
  Search,
  ShoppingCart,
  Tag,
  Filter,
  TrendingDown,
  Check,
  ChevronRight,
  Info,
  SlidersHorizontal,
  RefreshCw,
  Sparkles,
  Store,
  X,
  Plus,
  Minus,
  Trash2,
  BarChart2,
  Zap,
  ArrowUpDown,
  Percent,
  CheckCircle2,
  ExternalLink,
  Server,
  Layers,
  ArrowRight
} from 'lucide-react';

// --- STORES CONFIGURATION & BRAND STYLES ---
const STORES = [
  { id: 'edeka', name: 'EDEKA', short: 'EDEKA', bg: 'bg-blue-900', text: 'text-yellow-400', border: 'border-blue-700', badgeBg: '#005CA9', badgeText: '#FFD100' },
  { id: 'rewe', name: 'REWE', short: 'REWE', bg: 'bg-red-600', text: 'text-white', border: 'border-red-700', badgeBg: '#CC0000', badgeText: '#FFFFFF' },
  { id: 'aldi', name: 'ALDI', short: 'ALDI', bg: 'bg-slate-900', text: 'text-cyan-400', border: 'border-cyan-500', badgeBg: '#0A2540', badgeText: '#38BDF8' },
  { id: 'lidl', name: 'LIDL', short: 'LIDL', bg: 'bg-blue-700', text: 'text-yellow-300', border: 'border-blue-500', badgeBg: '#0050AA', badgeText: '#FFF000' },
  { id: 'netto', name: 'Netto', short: 'Netto', bg: 'bg-yellow-400', text: 'text-red-700', border: 'border-yellow-500', badgeBg: '#FFE500', badgeText: '#A80000' },
  { id: 'kaufland', name: 'Kaufland', short: 'Kaufland', bg: 'bg-red-700', text: 'text-white', border: 'border-red-800', badgeBg: '#D8232A', badgeText: '#FFFFFF' },
  { id: 'penny', name: 'PENNY', short: 'PENNY', bg: 'bg-red-800', text: 'text-white', border: 'border-red-900', badgeBg: '#CD1318', badgeText: '#FFFFFF' },
];

// --- SAMPLE PRODUCTS DATABASE (10 German Grocery Staples) ---
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Barilla Spaghetti N.5',
    category: 'Vorrat & Teigwaren',
    brand: 'Barilla',
    amount: '500g',
    unit: 'kg',
    unitMultiplier: 2,
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=400&q=80',
    genericAlternative: 'Eigenmarke Spaghetti 500g (ca. 0,99 €)',
    prices: {
      edeka: { price: 1.99, isSale: false, oldPrice: null },
      rewe: { price: 1.99, isSale: false, oldPrice: null },
      aldi: { price: 1.99, isSale: false, oldPrice: null },
      lidl: { price: 1.29, isSale: true, oldPrice: 1.99, discountPct: 35 },
      netto: { price: 1.99, isSale: false, oldPrice: null },
      kaufland: { price: 1.11, isSale: true, oldPrice: 1.99, discountPct: 44 },
      penny: { price: 1.99, isSale: false, oldPrice: null },
    }
  },
  {
    id: 'prod-2',
    name: 'Kerrygold Original Irische Butter',
    category: 'Milch & Molkerei',
    brand: 'Kerrygold',
    amount: '250g',
    unit: 'kg',
    unitMultiplier: 4,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80',
    genericAlternative: 'Deutsche Markenbutter 250g (ca. 1,49 €)',
    prices: {
      edeka: { price: 2.39, isSale: false, oldPrice: null },
      rewe: { price: 2.49, isSale: false, oldPrice: null },
      aldi: { price: 1.79, isSale: true, oldPrice: 2.49, discountPct: 28 },
      lidl: { price: 2.49, isSale: false, oldPrice: null },
      netto: { price: 2.49, isSale: false, oldPrice: null },
      kaufland: { price: 1.69, isSale: true, oldPrice: 2.49, discountPct: 32 },
      penny: { price: 2.49, isSale: false, oldPrice: null },
    }
  },
  {
    id: 'prod-3',
    name: 'Nutella Haselnusscreme',
    category: 'Süßes & Brotaufstrich',
    brand: 'Ferrero',
    amount: '450g',
    unit: 'kg',
    unitMultiplier: 2.22,
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=400&q=80',
    genericAlternative: 'Nuss-Nougat-Creme Eigenmarke (ca. 1,79 €)',
    prices: {
      edeka: { price: 3.29, isSale: false, oldPrice: null },
      rewe: { price: 3.29, isSale: false, oldPrice: null },
      aldi: { price: 2.22, isSale: true, oldPrice: 3.29, discountPct: 32 },
      lidl: { price: 3.29, isSale: false, oldPrice: null },
      netto: { price: 3.29, isSale: false, oldPrice: null },
      kaufland: { price: 2.19, isSale: true, oldPrice: 3.29, discountPct: 33 },
      penny: { price: 3.29, isSale: false, oldPrice: null },
    }
  },
  {
    id: 'prod-4',
    name: 'Frische Vollmilch 3.5%',
    category: 'Milch & Molkerei',
    brand: 'Eigenmarken / Basis',
    amount: '1L',
    unit: 'L',
    unitMultiplier: 1,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80',
    genericAlternative: 'Standard Molkerei-Milch',
    prices: {
      edeka: { price: 0.99, isSale: false, oldPrice: null },
      rewe: { price: 0.99, isSale: false, oldPrice: null },
      aldi: { price: 0.99, isSale: false, oldPrice: null },
      lidl: { price: 0.99, isSale: false, oldPrice: null },
      netto: { price: 0.99, isSale: false, oldPrice: null },
      kaufland: { price: 0.99, isSale: false, oldPrice: null },
      penny: { price: 0.99, isSale: false, oldPrice: null },
    }
  },
  {
    id: 'prod-5',
    name: 'Oatly Haferdrink Barista Edition',
    category: 'Milch & Molkerei',
    brand: 'Oatly',
    amount: '1L',
    unit: 'L',
    unitMultiplier: 1,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    genericAlternative: 'Bio Haferdrink Barista Eigenmarke (ca. 1,25 €)',
    prices: {
      edeka: { price: 2.49, isSale: false, oldPrice: null },
      rewe: { price: 2.39, isSale: false, oldPrice: null },
      aldi: { price: 2.19, isSale: false, oldPrice: null },
      lidl: { price: 1.99, isSale: true, oldPrice: 2.49, discountPct: 20 },
      netto: { price: 2.49, isSale: false, oldPrice: null },
      kaufland: { price: 1.89, isSale: true, oldPrice: 2.49, discountPct: 24 },
      penny: { price: 2.49, isSale: false, oldPrice: null },
    }
  },
  {
    id: 'prod-6',
    name: 'Bio Bananen Fairtrade',
    category: 'Obst & Gemüse',
    brand: 'Bio',
    amount: '1kg',
    unit: 'kg',
    unitMultiplier: 1,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80',
    genericAlternative: 'Konventionelle Bananen (ca. 1,29 €)',
    prices: {
      edeka: { price: 1.99, isSale: false, oldPrice: null },
      rewe: { price: 1.89, isSale: false, oldPrice: null },
      aldi: { price: 1.69, isSale: false, oldPrice: null },
      lidl: { price: 1.69, isSale: false, oldPrice: null },
      netto: { price: 1.79, isSale: false, oldPrice: null },
      kaufland: { price: 1.59, isSale: true, oldPrice: 1.99, discountPct: 20 },
      penny: { price: 1.69, isSale: false, oldPrice: null },
    }
  },
  {
    id: 'prod-7',
    name: 'Tchibo Feine Milde Gemahlener Kaffee',
    category: 'Kaffee & Getränke',
    brand: 'Tchibo',
    amount: '500g',
    unit: 'kg',
    unitMultiplier: 2,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80',
    genericAlternative: 'Eigenmarke Filterkaffee 500g (ca. 4,49 €)',
    prices: {
      edeka: { price: 6.99, isSale: false, oldPrice: null },
      rewe: { price: 6.99, isSale: false, oldPrice: null },
      aldi: { price: 6.49, isSale: false, oldPrice: null },
      lidl: { price: 4.99, isSale: true, oldPrice: 6.99, discountPct: 28 },
      netto: { price: 6.99, isSale: false, oldPrice: null },
      kaufland: { price: 5.29, isSale: true, oldPrice: 6.99, discountPct: 24 },
      penny: { price: 6.99, isSale: false, oldPrice: null },
    }
  },
  {
    id: 'prod-8',
    name: 'Coca-Cola Original Taste',
    category: 'Kaffee & Getränke',
    brand: 'Coca-Cola',
    amount: '1.5L',
    unit: 'L',
    unitMultiplier: 0.6667,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
    genericAlternative: 'Cola Eigenmarke 1.5L (ca. 0,49 €)',
    prices: {
      edeka: { price: 1.39, isSale: false, oldPrice: null },
      rewe: { price: 1.39, isSale: false, oldPrice: null },
      aldi: { price: 1.19, isSale: true, oldPrice: 1.39, discountPct: 14 },
      lidl: { price: 1.39, isSale: false, oldPrice: null },
      netto: { price: 0.99, isSale: true, oldPrice: 1.39, discountPct: 28 },
      kaufland: { price: 1.39, isSale: false, oldPrice: null },
      penny: { price: 1.39, isSale: false, oldPrice: null },
    }
  },
  {
    id: 'prod-9',
    name: 'Freilandeier Klasse M/L 10er',
    category: 'Milch & Molkerei',
    brand: 'Eigenmarken / Regional',
    amount: '10 Stück',
    unit: 'Stk',
    unitMultiplier: 0.1,
    image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=400&q=80',
    genericAlternative: 'Bodenhaltungseier (ca. 1,69 €)',
    prices: {
      edeka: { price: 2.19, isSale: false, oldPrice: null },
      rewe: { price: 2.19, isSale: false, oldPrice: null },
      aldi: { price: 1.99, isSale: false, oldPrice: null },
      lidl: { price: 1.99, isSale: false, oldPrice: null },
      netto: { price: 2.09, isSale: false, oldPrice: null },
      kaufland: { price: 1.99, isSale: false, oldPrice: null },
      penny: { price: 1.99, isSale: false, oldPrice: null },
    }
  },
  {
    id: 'prod-10',
    name: 'Ritter Sport Schokolade 100g',
    category: 'Süßes & Brotaufstrich',
    brand: 'Ritter Sport',
    amount: '100g',
    unit: 'kg',
    unitMultiplier: 10,
    image: 'https://images.unsplash.com/photo-1582176647440-206a58376b33?auto=format&fit=crop&w=400&q=80',
    genericAlternative: 'Eigenmarke Alpenvollmilch 100g (ca. 0,79 €)',
    prices: {
      edeka: { price: 1.49, isSale: false, oldPrice: null },
      rewe: { price: 1.49, isSale: false, oldPrice: null },
      aldi: { price: 1.11, isSale: true, oldPrice: 1.49, discountPct: 25 },
      lidl: { price: 1.49, isSale: false, oldPrice: null },
      netto: { price: 1.49, isSale: false, oldPrice: null },
      kaufland: { price: 0.99, isSale: true, oldPrice: 1.49, discountPct: 33 },
      penny: { price: 1.49, isSale: false, oldPrice: null },
    }
  }
];

// Helper: Format currency
const formatEuro = (val) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val);
};

// Helper: Get cheapest store details for a product
const getProductCheapestStore = (product) => {
  let minPrice = Infinity;
  let cheapestStore = null;

  Object.entries(product.prices).forEach(([storeId, info]) => {
    if (info.price < minPrice) {
      minPrice = info.price;
      cheapestStore = STORES.find(s => s.id === storeId);
    }
  });

  return { store: cheapestStore, price: minPrice };
};

export default function App() {
  // --- STATES ---
  const [products] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedStoreFilter, setSelectedStoreFilter] = useState('all');
  const [onlySales, setOnlySales] = useState(false);
  const [sortBy, setSortBy] = useState('cheapest'); // 'cheapest', 'name', 'savings'
  
  // Basket State: Map of productId -> quantity
  const [basket, setBasket] = useState({
    'prod-1': 1,
    'prod-2': 1,
    'prod-3': 1,
    'prod-5': 1,
  });
  
  // UI Modals & Drawers
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [activeDetailProduct, setActiveDetailProduct] = useState(null);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // Suggested quick tags
  const QUICK_TAGS = ['Nutella', 'Kerrygold', 'Barilla', 'Vollmilch', 'Oatly', 'Kaffee', 'Bananen', 'Ritter Sport'];

  // Categories list
  const categories = ['Alle', 'Milch & Molkerei', 'Vorrat & Teigwaren', 'Süßes & Brotaufstrich', 'Kaffee & Getränke', 'Obst & Gemüse'];

  // --- FILTERED PRODUCTS ---
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search match
      const queryMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category match
      const categoryMatch = selectedCategory === 'Alle' || product.category === selectedCategory;

      // Store filter match (Product has active low offer or standard price in store)
      let storeMatch = true;
      if (selectedStoreFilter !== 'all') {
        const storeInfo = product.prices[selectedStoreFilter];
        storeMatch = storeInfo !== undefined;
      }

      // Sales filter match
      let saleMatch = true;
      if (onlySales) {
        saleMatch = Object.values(product.prices).some(p => p.isSale);
      }

      return queryMatch && categoryMatch && storeMatch && saleMatch;
    }).sort((a, b) => {
      const aCheapest = getProductCheapestStore(a).price;
      const bCheapest = getProductCheapestStore(b).price;

      if (sortBy === 'cheapest') return aCheapest - bCheapest;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'savings') {
        const aMax = Math.max(...Object.values(a.prices).map(p => p.price));
        const bMax = Math.max(...Object.values(b.prices).map(p => p.price));
        const aDiff = aMax - aCheapest;
        const bDiff = bMax - bCheapest;
        return bDiff - aDiff;
      }
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedStoreFilter, onlySales, sortBy]);

  // --- BASKET CALCULATIONS ---
  const basketTotals = useMemo(() => {
    const basketProductIds = Object.keys(basket).filter(id => basket[id] > 0);
    const totalItems = Object.values(basket).reduce((sum, q) => sum + q, 0);

    // Calculate store totals
    const storeTotals = STORES.reduce((acc, store) => {
      let sum = 0;
      basketProductIds.forEach(id => {
        const prod = products.find(p => p.id === id);
        if (prod && prod.prices[store.id]) {
          sum += prod.prices[store.id].price * basket[id];
        }
      });
      acc[store.id] = sum;
      return acc;
    }, {});

    // Optimal Split Calculation (Buy each item where it is absolute cheapest)
    let optimalSplitTotal = 0;
    const splitBreakdown = basketProductIds.map(id => {
      const prod = products.find(p => p.id === id);
      const cheapest = getProductCheapestStore(prod);
      const qty = basket[id];
      const lineTotal = cheapest.price * qty;
      optimalSplitTotal += lineTotal;

      return {
        product: prod,
        quantity: qty,
        cheapestStore: cheapest.store,
        unitPrice: cheapest.price,
        total: lineTotal
      };
    });

    // Find overall cheapest single store for this basket
    let cheapestSingleStoreId = STORES[0].id;
    let lowestSingleStoreTotal = Infinity;

    Object.entries(storeTotals).forEach(([storeId, total]) => {
      if (total < lowestSingleStoreTotal) {
        lowestSingleStoreTotal = total;
        cheapestSingleStoreId = storeId;
      }
    });

    const cheapestSingleStore = STORES.find(s => s.id === cheapestSingleStoreId);

    // Find most expensive single store to calculate max potential savings
    const maxSingleStoreTotal = Math.max(...Object.values(storeTotals));

    return {
      totalItems,
      basketProductIds,
      storeTotals,
      optimalSplitTotal,
      splitBreakdown,
      cheapestSingleStore,
      lowestSingleStoreTotal,
      maxSingleStoreTotal,
      maxPossibleSavings: maxSingleStoreTotal - optimalSplitTotal
    };
  }, [basket, products]);

  // --- HANDLERS ---
  const updateQuantity = (productId, delta) => {
    setBasket(prev => {
      const current = prev[productId] || 0;
      const updated = Math.max(0, current + delta);
      const copy = { ...prev };
      if (updated === 0) {
        delete copy[productId];
      } else {
        copy[productId] = updated;
      }
      return copy;
    });
  };

  const clearBasket = () => setBasket({});

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      
      {/* 1. TOP HEADER & API STATUS BANNER */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-amber-400 font-black shadow-sm">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">
                    SuperMarkt<span className="text-blue-600">Radar</span>
                  </h1>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full border border-emerald-200">
                    DE Live
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Transparenter Lebensmittel-Preisvergleich für Deutschland
                </p>
              </div>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center space-x-3">
              
              {/* API Integration Drawer Trigger */}
              <button 
                onClick={() => setIsApiModalOpen(true)}
                className="hidden sm:flex items-center space-x-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
              >
                <Server className="w-3.5 h-3.5 text-blue-600" />
                <span>API-Status: <strong className="text-slate-800">Mock Data (7/7 Live)</strong></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>

              {/* Basket Toggle Button */}
              <button
                onClick={() => setIsBasketOpen(true)}
                className="relative flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-slate-800 shadow-sm transition active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Einkaufsliste</span>
                {basketTotals.totalItems > 0 && (
                  <span className="bg-amber-400 text-slate-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-1">
                    {basketTotals.totalItems}
                  </span>
                )}
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN SEARCH & FILTER HERO */}
      <section className="bg-gradient-to-b from-white to-slate-100 border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Jetzt mit Edeka, Rewe, Aldi, Lidl, Netto, Kaufland & Penny im Direktvergleich</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Welcher Supermarkt ist heute am günstigsten?
          </h2>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Produkt oder Marke suchen (z.B. Nutella, Barilla, Kerrygold, Kaffee)..."
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-300 rounded-2xl shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Search Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Beliebt:
            </span>
            {QUICK_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. FILTER & SUPERMARKET BAR */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Supermarket Brand Filter Tabs */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Supermarkt-Filter
          </label>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedStoreFilter('all')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                selectedStoreFilter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>Alle Märkte (7)</span>
            </button>

            {STORES.map(store => (
              <button
                key={store.id}
                onClick={() => setSelectedStoreFilter(store.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                  selectedStoreFilter === store.id
                    ? `${store.bg} ${store.text} shadow-md border-transparent ring-2 ring-slate-900/10`
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: store.badgeBg }}></span>
                <span>{store.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Category & Options Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Toggles & Sorting */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            
            {/* Sale filter toggle */}
            <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlySales}
                onChange={(e) => setOnlySales(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-slate-300"
              />
              <span className="flex items-center gap-1 text-red-600 font-semibold">
                <Percent className="w-3.5 h-3.5" /> Nur Angebote
              </span>
            </label>

            {/* Sorting Select */}
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sortierung:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="cheapest">Günstigster Preis zuerst</option>
                <option value="savings">Höchste Ersparnis</option>
                <option value="name">Produktname (A-Z)</option>
              </select>
            </div>

          </div>

        </div>

        {/* 4. PRODUCTS RESULTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Keine Produkte gefunden</h3>
            <p className="text-sm text-slate-500 mt-1">
              Keine Treffer für "{searchQuery}". Versuche Suchbegriffe wie "Milch", "Butter", "Nutella" oder setze die Filter zurück.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Alle'); setOnlySales(false); setSelectedStoreFilter('all'); }}
              className="mt-4 inline-flex items-center space-x-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-slate-800 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Filter zurücksetzen</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const cheapest = getProductCheapestStore(product);
              const maxPrice = Math.max(...Object.values(product.prices).map(p => p.price));
              const potentialSaving = maxPrice - cheapest.price;
              const inBasketCount = basket[product.id] || 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Content */}
                  <div>
                    {/* Image & Header Tags */}
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-700 shadow-sm border border-slate-200">
                        {product.category}
                      </div>

                      {/* Best price highlight badge */}
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white font-bold text-xs px-2.5 py-1 rounded-lg shadow-md flex items-center space-x-1">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>Ab {formatEuro(cheapest.price)}</span>
                      </div>
                    </div>

                    {/* Title & Brand Info */}
                    <div className="p-5 pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {product.brand} • {product.amount}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      {/* Grundpreis / Base Price */}
                      <div className="mt-1 text-xs text-slate-500 font-medium">
                        Grundpreis: ca. {formatEuro(cheapest.price * product.unitMultiplier)} / {product.unit}
                      </div>

                      {/* Generic Alternative Tip */}
                      <div className="mt-3 bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-start space-x-2 text-xs">
                        <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">
                          <strong className="text-slate-800">Spar-Tipp:</strong> {product.genericAlternative}
                        </span>
                      </div>
                    </div>

                    {/* Side-by-Side Supermarket Mini-Pills */}
                    <div className="px-5 py-2">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase mb-2">
                        Preise im Vergleich:
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {STORES.map(store => {
                          const storeData = product.prices[store.id];
                          if (!storeData) return null;

                          const isCheapest = store.id === cheapest.store.id;

                          return (
                            <div
                              key={store.id}
                              className={`p-1.5 rounded-lg border text-center transition ${
                                isCheapest
                                  ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-400'
                                  : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <div className="text-[10px] font-bold text-slate-600 truncate">
                                {store.short}
                              </div>
                              <div className={`text-xs font-extrabold ${isCheapest ? 'text-emerald-700' : 'text-slate-800'}`}>
                                {formatEuro(storeData.price)}
                              </div>
                              {storeData.isSale && (
                                <span className="text-[9px] bg-red-100 text-red-700 font-semibold px-1 rounded block mt-0.5">
                                  -{storeData.discountPct}%
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
                    
                    {/* Detail Modal Button */}
                    <button
                      onClick={() => setActiveDetailProduct(product)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center space-x-1"
                    >
                      <span>Detailvergleich</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Add / Adjust Basket Button */}
                    {inBasketCount === 0 ? (
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm active:scale-95 transition"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-400" />
                        <span>Zur Liste</span>
                      </button>
                    ) : (
                      <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="px-2 py-1.5 hover:bg-slate-100 text-slate-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">
                          {inBasketCount}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="px-2 py-1.5 hover:bg-slate-100 text-slate-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* 5. PRODUCT DETAIL COMPARISON MODAL */}
      {activeDetailProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in duration-200">
            
            {/* Modal Header */}
            <div className="relative h-48 bg-slate-100">
              <img
                src={activeDetailProduct.image}
                alt={activeDetailProduct.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveDetailProduct(null)}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full p-2 backdrop-blur-md transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {activeDetailProduct.brand} • {activeDetailProduct.category}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {activeDetailProduct.name} ({activeDetailProduct.amount})
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Preisvergleich in allen Märkten
                </h4>
                <span className="text-xs text-slate-500">
                  Stand: Heute Live-Abfrage
                </span>
              </div>

              {/* Stores Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                {STORES.map(store => {
                  const info = activeDetailProduct.prices[store.id];
                  if (!info) return null;

                  const cheapest = getProductCheapestStore(activeDetailProduct);
                  const isCheapest = store.id === cheapest.store.id;

                  return (
                    <div
                      key={store.id}
                      className={`p-4 flex items-center justify-between transition ${
                        isCheapest ? 'bg-emerald-50/70' : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Store Brand Badge */}
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-24 py-1.5 px-3 rounded-lg text-center text-xs font-black shadow-sm"
                          style={{ backgroundColor: store.badgeBg, color: store.badgeText }}
                        >
                          {store.name}
                        </div>
                        {isCheapest && (
                          <span className="inline-flex items-center space-x-1 text-[11px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Günstigstes Angebot</span>
                          </span>
                        )}
                      </div>

                      {/* Price & Sales info */}
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {info.isSale && (
                            <span className="text-xs bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">
                              -{info.discountPct}% Angebot
                            </span>
                          )}
                          <span className={`text-base font-black ${isCheapest ? 'text-emerald-700' : 'text-slate-900'}`}>
                            {formatEuro(info.price)}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          Grundpreis: {formatEuro(info.price * activeDetailProduct.unitMultiplier)} / {activeDetailProduct.unit}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Eigenmarke Suggestion Card */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3">
                <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <strong className="font-bold block text-sm text-amber-950 mb-0.5">
                    Noch mehr sparen mit Eigenmarken?
                  </strong>
                  Alternativ zur Markenware bieten Supermärkte wie Edeka (Gut & Günstig), Rewe (ja!), Aldi und Lidl Eigenmarken ab {activeDetailProduct.genericAlternative} an.
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveDetailProduct(null)}
                className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800 transition"
              >
                Schließen
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 6. BASKET & SHOPPING LIST CALCULATOR DRAWER */}
      {isBasketOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold">Einkaufslisten-Rechner</h3>
                <span className="bg-slate-800 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {basketTotals.totalItems} Artikel
                </span>
              </div>
              <button
                onClick={() => setIsBasketOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {basketTotals.totalItems === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">Deine Einkaufsliste ist leer</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Füge Produkte hinzu, um herauszufinden, welcher Supermarkt für deinen gesamten Einkauf am günstigsten ist!
                  </p>
                </div>
              ) : (
                <>
                  {/* Item List */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Ausgewählte Produkte
                      </h4>
                      <button
                        onClick={clearBasket}
                        className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Liste leeren
                      </button>
                    </div>

                    <div className="space-y-2">
                      {basketTotals.basketProductIds.map(id => {
                        const prod = products.find(p => p.id === id);
                        const qty = basket[id];
                        const cheapest = getProductCheapestStore(prod);

                        return (
                          <div
                            key={id}
                            className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl"
                          >
                            <div className="flex items-center space-x-3">
                              <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg" />
                              <div>
                                <h5 className="text-xs font-bold text-slate-900">{prod.name}</h5>
                                <div className="text-[11px] text-slate-500">
                                  Bester Einzelpreis: <strong className="text-emerald-700">{formatEuro(cheapest.price)}</strong> ({cheapest.store.name})
                                </div>
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(id, -1)}
                                className="p-1.5 hover:bg-slate-100 text-slate-700"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-slate-900">{qty}</span>
                              <button
                                onClick={() => updateQuantity(id, 1)}
                                className="p-1.5 hover:bg-slate-100 text-slate-700"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* SAVINGS HIGHLIGHT BOX */}
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-md">
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-200">
                      <Sparkles className="w-4 h-4" />
                      <span>Optimale Einkaufs-Strategie</span>
                    </div>

                    <div className="mt-2 flex items-baseline justify-between">
                      <div>
                        <div className="text-2xl font-black">
                          {formatEuro(basketTotals.optimalSplitTotal)}
                        </div>
                        <div className="text-xs text-emerald-100">
                          Wenn du jedes Produkt im günstigsten Markt kaufst
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full shadow-sm">
                          Spart bis zu {formatEuro(basketTotals.maxPossibleSavings)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BASKET COMPARISON CHART ACROSS ALL 7 STORES */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      Gesamtkosten pro Markt im Vergleich
                    </h4>

                    <div className="space-y-2.5">
                      {STORES.map(store => {
                        const total = basketTotals.storeTotals[store.id];
                        const isCheapestSingle = store.id === basketTotals.cheapestSingleStore.id;
                        const diffVsCheapest = total - basketTotals.lowestSingleStoreTotal;

                        return (
                          <div
                            key={store.id}
                            className={`p-3.5 rounded-xl border transition ${
                              isCheapestSingle
                                ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20'
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center space-x-2">
                                <span
                                  className="px-2.5 py-0.5 rounded text-xs font-black"
                                  style={{ backgroundColor: store.badgeBg, color: store.badgeText }}
                                >
                                  {store.name}
                                </span>
                                {isCheapestSingle && (
                                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    Bester Komplett-Markt
                                  </span>
                                )}
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-black text-slate-900">
                                  {formatEuro(total)}
                                </span>
                                {diffVsCheapest > 0 && (
                                  <span className="text-[11px] text-red-600 font-medium block">
                                    +{formatEuro(diffVsCheapest)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Progress bar visual comparison */}
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  isCheapestSingle ? 'bg-emerald-500' : 'bg-slate-400'
                                }`}
                                style={{
                                  width: `${Math.min(100, (total / basketTotals.maxSingleStoreTotal) * 100)}%`
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setIsBasketOpen(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition text-sm shadow-sm"
              >
                Fertig & Weiter stöbern
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 7. TECHNICAL API CONFIG & BACKEND INTEGRATION MODAL */}
      {isApiModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 space-y-5 animate-in fade-in duration-200">
            
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <Server className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Live API & Proxy Integration</h3>
              </div>
              <button onClick={() => setIsApiModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Direkte Browser-Anfragen an Supermarkt-APIs (Rewe, Edeka, Lidl) blockieren Browser-CORS-Header. Dieses Dashboard nutzt aktuell unseren <strong>Simulierten Realtime-Engine (Mock Server Mode)</strong>.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Option A: Live Server Proxy (Apify / Pepesto / Custom Node.js)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Verbinde ein eigenes Backend (z.B. Python FastAPI / Express API), welches Supermarkt-Preise im Stundentakt scraped und als JSON liefert.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Option B: Open Food Facts DE / Bring! API Sync
                </h4>
                <p className="text-[11px] text-slate-500">
                  Verknüpfung mit Open-Data Repositories für Barcodes, Nährwerte und tagesaktuelle Grundpreise.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto">
              <span className="text-emerald-400">// Sample Proxy API Endpoint Structure</span>
              <br />
              <code>GET https://api.supermarkt-radar.de/v1/compare?query=nutella</code>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsApiModalOpen(false)}
                className="bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-800 transition"
              >
                Verstanden
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}