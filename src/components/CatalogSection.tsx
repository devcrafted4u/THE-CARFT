import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Sparkles, Filter, Check } from 'lucide-react';
import { Category, JewelryProduct, ThemeMode } from '../types';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  products: JewelryProduct[];
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  theme: ThemeMode;
  wishlist: Set<string>;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: JewelryProduct) => void;
  onAddToCart: (product: JewelryProduct) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  theme,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<number>(10000);

  const isDark = theme === 'dark';

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchMetal = product.details.metal.toLowerCase().includes(query);
          const matchGemstone = product.details.gemstone.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          if (!matchName && !matchMetal && !matchGemstone && !matchDesc) {
            return false;
          }
        }

        // Metal filter
        if (selectedMetal !== 'all') {
          if (!product.details.metal.toLowerCase().includes(selectedMetal.toLowerCase())) {
            return false;
          }
        }

        // Price range
        if (product.price > priceRange) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured maintains default catalog order
      });
  }, [products, selectedCategory, searchQuery, selectedMetal, priceRange, sortBy]);

  const metals = [
    { id: 'all', label: 'All Precious Metals' },
    { id: 'yellow gold', label: '18K Yellow Gold' },
    { id: 'white gold', label: '18K White Gold' },
    { id: 'rose gold', label: '18K Rose Gold' },
    { id: 'platinum', label: 'Platinum 950' },
  ];

  return (
    <section id="jewellery-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filter and Control Bar */}
      <div
        className={`p-4 rounded-sm border mb-8 transition-colors ${
          isDark
            ? 'bg-neutral-900/70 border-neutral-800 text-neutral-200'
            : 'bg-white/80 border-neutral-200/80 text-neutral-800 shadow-xs backdrop-blur-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Metal Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-sans-clean shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Metal:
            </span>
            {metals.map((metal) => (
              <button
                key={metal.id}
                type="button"
                onClick={() => setSelectedMetal(metal.id)}
                className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-sans-clean ${
                  selectedMetal === metal.id
                    ? isDark
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'bg-black text-white font-semibold shadow-xs'
                    : isDark
                    ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {metal.label}
              </button>
            ))}
          </div>

          {/* Sort & Count Controls */}
          <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
            {/* Active Count */}
            <span className="text-xs text-neutral-500 font-sans-clean">
              Showing <span className="font-semibold text-black dark:text-white">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'creation' : 'creations'}
            </span>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-neutral-400 sr-only">
                Sort By
              </label>
              <div className="relative">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className={`text-xs py-1.5 pl-3 pr-8 rounded-full border cursor-pointer appearance-none transition-colors font-sans-clean ${
                    isDark
                      ? 'bg-neutral-800 border-neutral-700 text-white focus:ring-amber-400'
                      : 'bg-white border-neutral-300 text-black focus:ring-black'
                  }`}
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ArrowUpDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {(selectedMetal !== 'all' || selectedCategory !== 'all' || searchQuery.trim()) && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-200/60 dark:border-neutral-800 text-xs">
            <span className="text-neutral-400">Active filters:</span>
            {selectedCategory !== 'all' && (
              <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded text-[11px] font-medium flex items-center gap-1">
                Category: {selectedCategory}
                <button
                  type="button"
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-rose-500 ml-1 cursor-pointer"
                >
                  ×
                </button>
              </span>
            )}
            {selectedMetal !== 'all' && (
              <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded text-[11px] font-medium flex items-center gap-1">
                Metal: {selectedMetal}
                <button
                  type="button"
                  onClick={() => setSelectedMetal('all')}
                  className="hover:text-rose-500 ml-1 cursor-pointer"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery.trim() && (
              <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded text-[11px] font-medium flex items-center gap-1">
                Search: "{searchQuery}"
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                setSelectedMetal('all');
                onSelectCategory('all');
              }}
              className="text-amber-600 dark:text-amber-400 hover:underline ml-auto font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Catalog Grid: Pure White Background on Cards with Isolated Jewellery & Zoom-in Hover */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm p-8">
          <Sparkles className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
          <h3 className="font-serif-luxury text-2xl text-black dark:text-white mb-2">
            No matching jewellery found
          </h3>
          <p className="text-neutral-500 text-xs max-w-md mx-auto font-sans-clean mb-6">
            We could not find pieces matching your exact selection. Try clearing filters or exploring all high-carat creations.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedMetal('all');
              onSelectCategory('all');
            }}
            className="py-2.5 px-6 bg-black text-white dark:bg-white dark:text-black text-xs uppercase tracking-widest font-semibold cursor-pointer"
          >
            Show All Creations
          </button>
        </div>
      ) : (
        <div
          id="product-catalog-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};
