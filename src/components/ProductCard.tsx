import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Sparkles, ZoomIn } from 'lucide-react';
import { JewelryProduct } from '../types';

interface ProductCardProps {
  product: JewelryProduct;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: JewelryProduct) => void;
  onAddToCart: (product: JewelryProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Formatting currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  return (
    <article
      id={`catalog-product-${product.id}`}
      className="group relative flex flex-col bg-white border border-neutral-200/80 rounded-sm shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        {product.badge ? (
          <span className="pointer-events-auto inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium tracking-widest uppercase bg-white/95 text-neutral-900 border border-neutral-200/90 backdrop-blur-xs rounded-xs shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-amber-600" />
            {product.badge}
          </span>
        ) : (
          <span />
        )}

        <button
          id={`wishlist-btn-${product.id}`}
          type="button"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`pointer-events-auto w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm border border-rose-200'
              : 'bg-white/90 text-neutral-600 hover:text-black hover:bg-white border border-neutral-200/80 shadow-xs'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-300 ${
              isWishlisted ? 'fill-current scale-110' : 'stroke-current'
            }`}
          />
        </button>
      </div>

      {/* Pure White Product Canvas with Smooth Zoom-in Hover Effect */}
      <div
        id={`product-image-container-${product.id}`}
        onClick={() => onQuickView(product)}
        className="relative w-full aspect-square bg-white flex items-center justify-center p-6 sm:p-8 cursor-pointer overflow-hidden select-none"
      >
        {/* Isolated Jewellery Image with smooth zoom-in hover effect */}
        {!imageError ? (
          <img
            id={`product-image-${product.id}`}
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain object-center transform transition-transform duration-700 ease-out group-hover:scale-125 will-change-transform drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 bg-white p-4 text-center">
            <Sparkles className="w-8 h-8 text-neutral-300 mb-2" />
            <span className="text-xs text-neutral-500 font-serif-luxury">{product.name}</span>
          </div>
        )}

        {/* Hover zoom indicator hint */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-xs text-neutral-900 border border-neutral-200 px-2 py-1 rounded text-[10px] tracking-wider uppercase font-medium flex items-center gap-1 shadow-xs pointer-events-none">
          <ZoomIn className="w-3 h-3 text-neutral-700" />
          <span>Zoom</span>
        </div>

        {/* Quick View overlay button */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
          <button
            id={`quick-view-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-neutral-900 text-white hover:bg-black text-xs font-medium tracking-wider uppercase transition-colors shadow-md rounded-xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Examine</span>
          </button>
          <button
            id={`quick-add-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            aria-label="Add to bag"
            className="p-2.5 bg-white text-black border border-neutral-300 hover:border-black transition-colors shadow-sm rounded-xs cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>

      {/* Product Details Section - Explicitly Black Font Color for Name and Pricing */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 bg-white border-t border-neutral-100 text-left">
        <div>
          {/* Subtle category & metal specification */}
          <div className="flex items-center justify-between gap-2 text-[11px] text-neutral-500 uppercase tracking-wider mb-1.5 font-sans-clean">
            <span className="truncate">{product.details.metal}</span>
            {product.details.caratWeight && (
              <span className="shrink-0 text-amber-800 font-medium">
                {product.details.caratWeight.split(' ')[0]} ct
              </span>
            )}
          </div>

          {/* Product Name: Written strictly in Black font color, elegant & clean typography */}
          <h3
            id={`product-name-${product.id}`}
            onClick={() => onQuickView(product)}
            className="text-black font-serif-luxury text-lg sm:text-xl font-medium tracking-normal leading-snug line-clamp-2 hover:underline decoration-neutral-400 underline-offset-4 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing: Written strictly in Black font color, elegant & clean typography */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span
              id={`product-price-${product.id}`}
              className="text-black font-sans-clean text-lg sm:text-xl font-bold tracking-tight"
            >
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-xs text-neutral-400 line-through font-sans-clean">
                {formattedOriginalPrice}
              </span>
            )}
          </div>

          <span className="text-[11px] text-neutral-500 tracking-wider uppercase font-medium">
            Complimentary Insured
          </span>
        </div>
      </div>
    </article>
  );
};
