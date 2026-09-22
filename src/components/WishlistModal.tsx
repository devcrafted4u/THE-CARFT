import React from 'react';
import { X, Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { JewelryProduct } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: JewelryProduct[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: JewelryProduct) => void;
  onQuickView: (product: JewelryProduct) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="wishlist-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="wishlist-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white text-neutral-900 rounded-sm shadow-2xl overflow-hidden border border-neutral-200"
      >
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h2 className="font-serif-luxury text-2xl font-medium text-black">Saved Creations</h2>
            <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full font-mono">
              {wishlistProducts.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wishlist"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <h3 className="font-serif-luxury text-xl text-black mb-1">No saved pieces yet</h3>
              <p className="text-xs text-neutral-500 font-sans-clean max-w-xs mx-auto">
                Tap the heart icon on any jewelry piece to curate your personal private collection.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 bg-white border border-neutral-200 rounded-sm"
                >
                  <div
                    onClick={() => {
                      onClose();
                      onQuickView(product);
                    }}
                    className="w-20 h-20 bg-white p-1 rounded border border-neutral-100 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-115"
                    />
                  </div>

                  <div className="flex-1 text-left">
                    <h4
                      onClick={() => {
                        onClose();
                        onQuickView(product);
                      }}
                      className="text-sm font-serif-luxury font-medium text-black cursor-pointer hover:underline"
                    >
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-sans-clean mt-0.5">
                      {product.details.metal}
                    </p>
                    <span className="text-sm font-semibold text-black font-sans-clean mt-1 block">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }).format(product.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="py-2 px-3 bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add to Bag</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveFromWishlist(product.id)}
                      aria-label="Remove from wishlist"
                      className="p-2 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs uppercase tracking-wider font-semibold rounded-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
