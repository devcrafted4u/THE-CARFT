import React, { useState, useEffect } from 'react';
import { JEWELRY_CATALOG } from './data/jewelry';
import { Category, JewelryProduct, CartItem, ThemeMode } from './types';
import { Header } from './components/Header';
import { CatalogHero } from './components/CatalogHero';
import { CatalogSection } from './components/CatalogSection';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';

export default function App() {
  // Theme state: defaults to 'light' (lighter shade website theme so jewellery pops out)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('laura_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<JewelryProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('laura_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('laura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast notification for user actions
  const [notification, setNotification] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const showNotification = (message: string) => {
    setNotification({ message, visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('laura_theme', theme);
  }, [theme]);

  // Persist Wishlist
  useEffect(() => {
    localStorage.setItem('laura_wishlist', JSON.stringify(Array.from(wishlist)));
  }, [wishlist]);

  // Persist Cart
  useEffect(() => {
    localStorage.setItem('laura_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showNotification('Removed from Saved Creations');
      } else {
        next.add(productId);
        showNotification('Added to Saved Creations');
      }
      return next;
    });
  };

  const handleAddToCart = (product: JewelryProduct, size?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1, selectedSize: size }];
    });
    showNotification(`Added ${product.name} to Shopping Bag`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const wishlistProducts = JEWELRY_CATALOG.filter((p) => wishlist.has(p.id));
  const totalCartCount = cart.reduce((total, i) => total + i.quantity, 0);

  return (
    <div
      id="app-root"
      className={`min-h-screen transition-colors duration-300 flex flex-col font-sans-clean ${
        theme === 'dark'
          ? 'bg-[#111113] text-neutral-100'
          : 'bg-[#F9F8F5] text-neutral-900'
      }`}
    >
      {/* Toast Banner */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 pointer-events-none ${
          notification.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="bg-black text-white px-4 py-2.5 rounded-sm shadow-xl text-xs font-sans-clean tracking-wider uppercase border border-neutral-700 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{notification.message}</span>
        </div>
      </div>

      {/* Header with Navigation and Theme Toggle */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        wishlistCount={wishlist.size}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlistModal={() => setIsWishlistOpen(true)}
        onQuickView={(product) => setSelectedProduct(product)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Editorial Introduction */}
        <CatalogHero theme={theme} />

        {/* Product Catalog with Pure White Showcases & Black Name/Price */}
        <CatalogSection
          products={JEWELRY_CATALOG}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          theme={theme}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
        />

        {/* Atelier Craftsmanship & Philosophy */}
        <StorySection theme={theme} />
      </main>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Detailed Product Inspection Modal with Zoom Lens */}
      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlist.has(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Saved Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(product) => setSelectedProduct(product)}
      />
    </div>
  );
}
