import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  X,
  Menu,
  ChevronRight,
} from 'lucide-react';
import { Category, ThemeMode, JewelryProduct } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { JEWELRY_CATALOG } from '../data/jewelry';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  wishlistCount: number;
  cartCount: number;
  onOpenCart: () => void;
  onOpenWishlistModal?: () => void;
  onQuickView?: (product: JewelryProduct) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistCount,
  cartCount,
  onOpenCart,
  onOpenWishlistModal,
  onQuickView,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  // Handle scroll detection for subtle navigation elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger brief bounce animation on cart icon when count updates
  useEffect(() => {
    if (cartCount > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Focus search input when expanded
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Click outside to close search dropdown if needed
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        if (!searchQuery) {
          setIsSearchOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  const navCategories: { id: Category; label: string; count?: number }[] = [
    { id: 'all', label: 'All Creations', count: 12 },
    { id: 'rings', label: 'Rings', count: 3 },
    { id: 'necklaces', label: 'Necklaces & Pendants', count: 3 },
    { id: 'earrings', label: 'Earrings', count: 3 },
    { id: 'bracelets', label: 'Bracelets', count: 2 },
    { id: 'high-jewelry', label: 'High Fine Jewellery', count: 2 },
  ];

  // Quick instant search suggestions
  const searchSuggestions = searchQuery.trim()
    ? JEWELRY_CATALOG.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.details.gemstone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.details.metal.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <header
      id="main-site-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-md ${
        isScrolled
          ? isDark
            ? 'bg-neutral-950/95 shadow-[0_4px_24px_rgba(0,0,0,0.6)] border-b border-neutral-800'
            : 'bg-[#FAF9F6]/95 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-neutral-200'
          : isDark
          ? 'bg-neutral-950/90 border-b border-neutral-800/80 text-neutral-100'
          : 'bg-[#FAF9F6]/90 border-b border-neutral-200/80 text-neutral-900'
      }`}
    >
      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isDark
                  ? 'border-neutral-800 text-neutral-200 hover:bg-neutral-900'
                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Left Desktop: Interactive Search Pill & Live Suggestion Popover */}
          <div
            ref={searchContainerRef}
            className="relative hidden lg:flex items-center gap-3 flex-1 max-w-sm"
          >
            <div className="relative w-full">
              <Search
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                  isSearchOpen ? 'text-black dark:text-white' : 'text-neutral-400'
                }`}
              />
              <input
                ref={searchInputRef}
                id="header-search-input"
                type="text"
                placeholder="Search solitaire, emerald cut, 18k gold..."
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (!isSearchOpen) setIsSearchOpen(true);
                }}
                className={`w-full pl-10 pr-9 py-2 text-xs font-sans-clean rounded-full border transition-all duration-300 focus:outline-none focus:ring-1 ${
                  isDark
                    ? 'bg-neutral-900/90 border-neutral-700 text-white placeholder-neutral-500 focus:ring-amber-400 focus:border-amber-400'
                    : 'bg-white/95 border-neutral-200 text-black placeholder-neutral-400 focus:ring-black focus:border-black shadow-xs'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Instant Search Flyout dropdown with pure white jewel preview */}
              {isSearchOpen && searchQuery.trim() && (
                <div
                  className={`absolute left-0 top-full mt-2 w-full rounded-sm border shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
                    isDark
                      ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
                      : 'bg-white border-neutral-200 text-neutral-900'
                  }`}
                >
                  <div className="p-2 border-b border-neutral-100 dark:border-neutral-800 text-[10px] tracking-wider uppercase font-semibold text-neutral-400">
                    Catalog Matches ({searchSuggestions.length})
                  </div>
                  {searchSuggestions.length === 0 ? (
                    <div className="p-4 text-center text-xs text-neutral-400 font-sans-clean">
                      No creations match "{searchQuery}"
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-100 dark:border-neutral-800">
                      {searchSuggestions.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            if (onQuickView) onQuickView(prod);
                            setIsSearchOpen(false);
                          }}
                          className="flex items-center gap-3 p-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 cursor-pointer transition-colors"
                        >
                          <div className="w-10 h-10 bg-white border border-neutral-200 rounded p-0.5 flex items-center justify-center shrink-0">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <h5 className="text-xs font-serif-luxury text-black dark:text-white truncate font-medium">
                              {prod.name}
                            </h5>
                            <p className="text-[10px] text-neutral-400">
                              {prod.details.metal}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-black dark:text-white shrink-0 font-sans-clean">
                            ${prod.price.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Center: Brand Crest & High Haute Joaillerie Typography */}
          <div className="text-center shrink-0 px-2">
            <a
              href="#"
              className="inline-block group"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-0.5">
                <span className="h-px w-4 sm:w-6 bg-amber-600/40" />
                <span className="text-[9px] uppercase tracking-[0.35em] text-amber-700 dark:text-amber-400 font-sans-clean">
                  Fondée 1928
                </span>
                <span className="h-px w-4 sm:w-6 bg-amber-600/40" />
              </div>
              <h1
                id="brand-logo"
                className={`font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.28em] uppercase transition-colors ${
                  isDark ? 'text-white' : 'text-neutral-950'
                }`}
              >
                L'AURA
              </h1>
              <p
                className={`text-[8.5px] uppercase tracking-[0.32em] font-sans-clean -mt-0.5 transition-colors ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                Haute Joaillerie Paris
              </p>
            </a>
          </div>

          {/* Right: Light/Dark Mode Switch, Wishlist & Cart */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 flex-1 max-w-sm">
            {/* The Dedicated Toggle Button for Light / Dark Mode */}
            <ThemeToggle theme={theme} onToggle={onToggleTheme} id="header-theme-toggle" />

            {/* Wishlist Icon Button */}
            <button
              id="header-wishlist-btn"
              type="button"
              onClick={onOpenWishlistModal}
              aria-label="View saved pieces"
              className={`relative p-2.5 rounded-full border transition-all cursor-pointer ${
                isDark
                  ? 'border-neutral-800 text-neutral-200 hover:border-neutral-600 hover:text-white bg-neutral-900/60'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 hover:text-black bg-white/80'
              }`}
            >
              <Heart
                className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform ${
                  wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center font-sans-clean shadow-xs animate-in zoom-in-75">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button with interactive bounce feedback */}
            <button
              id="header-cart-btn"
              type="button"
              onClick={onOpenCart}
              aria-label="Open shopping bag"
              className={`relative p-2.5 rounded-full border transition-all cursor-pointer ${
                cartBounce ? 'scale-110 ring-2 ring-black dark:ring-white' : ''
              } ${
                isDark
                  ? 'border-neutral-800 text-neutral-200 hover:border-neutral-600 hover:text-white bg-neutral-900/60'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 hover:text-black bg-white/80'
              }`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white dark:bg-white dark:text-black rounded-full text-[9px] font-bold flex items-center justify-center font-sans-clean shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search bar if on small screen */}
        <div className="lg:hidden pb-3 pt-1">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search creations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-8 py-2 text-xs font-sans-clean rounded-full border transition-all ${
                isDark
                  ? 'bg-neutral-900 border-neutral-700 text-white placeholder-neutral-500'
                  : 'bg-white border-neutral-200 text-black placeholder-neutral-400'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Categories Secondary Nav Bar */}
        <nav
          id="category-navigation-bar"
          aria-label="Jewellery categories"
          className="hidden lg:flex items-center justify-center gap-1 sm:gap-8 py-2.5 border-t border-neutral-200/60 dark:border-neutral-800/60"
        >
          {navCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative whitespace-nowrap px-3 py-1.5 text-xs tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? isDark
                      ? 'text-white font-semibold'
                      : 'text-black font-semibold'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200 font-normal'
                    : 'text-neutral-500 hover:text-black font-normal'
                }`}
              >
                <span>{cat.label}</span>
                {cat.count && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full transition-colors ${
                      isActive
                        ? isDark
                          ? 'bg-amber-400/20 text-amber-300'
                          : 'bg-neutral-900 text-white'
                        : 'text-neutral-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
                {/* Elegant gold / black indicator bar */}
                <span
                  className={`absolute bottom-0 inset-x-2 h-0.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? isDark
                        ? 'bg-amber-400 scale-x-100'
                        : 'bg-black scale-x-100'
                      : 'bg-transparent scale-x-0 group-hover:scale-x-50 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700'
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Flyout Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className={`lg:hidden border-t px-6 py-6 transition-colors shadow-2xl animate-in slide-in-from-top-4 duration-300 ${
            isDark
              ? 'bg-neutral-950 border-neutral-800 text-neutral-100'
              : 'bg-[#FAF9F6] border-neutral-200 text-neutral-900'
          }`}
        >
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-2">
              Curated Collections
            </div>
            <div className="grid grid-cols-1 gap-2">
              {navCategories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-sm text-left text-xs uppercase tracking-wider font-medium transition-colors ${
                      isActive
                        ? isDark
                          ? 'bg-neutral-900 text-white font-bold border-l-2 border-amber-400'
                          : 'bg-white text-black font-bold border-l-2 border-black shadow-xs'
                        : isDark
                        ? 'text-neutral-300 hover:bg-neutral-900'
                        : 'text-neutral-700 hover:bg-white'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <div className="flex items-center gap-2">
                      {cat.count && (
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {cat.count}
                        </span>
                      )}
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
