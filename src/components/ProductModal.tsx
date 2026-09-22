import React, { useState, useRef } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, ZoomIn, Check, Star } from 'lucide-react';
import { JewelryProduct } from '../types';

interface ProductModalProps {
  product: JewelryProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: JewelryProduct, size?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('6.5');
  const [activeImage, setActiveImage] = useState<string>('');
  const [isZooming, setIsZooming] = useState<boolean>(false);
  const [zoomCoords, setZoomCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !product) return null;

  const currentImage = activeImage || product.image;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomCoords({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

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

  const handleAddToCart = () => {
    onAddToCart(product, product.category === 'rings' ? selectedSize : undefined);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const ringSizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5'];

  return (
    <div
      id="product-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        id="product-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white text-neutral-900 rounded-sm shadow-2xl overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          type="button"
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-neutral-700 hover:text-black hover:bg-white border border-neutral-200 transition-colors shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Pure White Canvas with Interactive Zoom Loupe */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-between p-6 md:p-8 border-b md:border-b-0 md:border-r border-neutral-100">
          <div className="relative">
            {/* Interactive Zoom Container */}
            <div
              ref={imageContainerRef}
              id="modal-zoom-container"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              className="relative w-full aspect-square bg-white flex items-center justify-center cursor-crosshair overflow-hidden rounded-xs border border-neutral-100 group"
            >
              {/* Normal Image with smooth hover transition */}
              <img
                src={currentImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-contain p-4 transition-opacity duration-200 ${
                  isZooming ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {/* Magnified zoom layer positioned strictly at cursor position */}
              {isZooming && (
                <div
                  className="absolute inset-0 bg-white pointer-events-none"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                    backgroundSize: '250%',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}

              {/* Zoom hint overlay */}
              <div
                className={`absolute bottom-3 right-3 px-2.5 py-1 bg-white/95 text-neutral-800 text-[11px] font-sans-clean font-medium tracking-wider uppercase border border-neutral-200 rounded shadow-xs flex items-center gap-1.5 transition-opacity duration-200 ${
                  isZooming ? 'opacity-0' : 'opacity-90'
                }`}
              >
                <ZoomIn className="w-3.5 h-3.5 text-neutral-600" />
                <span>Move to Magnify</span>
              </div>
            </div>

            {/* Thumbnail switcher if secondary image exists */}
            {product.secondaryImage && (
              <div className="mt-4 flex items-center gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => setActiveImage(product.image)}
                  className={`w-14 h-14 p-1 bg-white border rounded transition-all cursor-pointer ${
                    currentImage === product.image ? 'border-black ring-1 ring-black' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} primary`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  className={`w-14 h-14 p-1 bg-white border rounded transition-all cursor-pointer ${
                    currentImage === product.secondaryImage ? 'border-black ring-1 ring-black' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <img
                    src={product.secondaryImage}
                    alt={`${product.name} secondary angle`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs text-neutral-400 tracking-wider uppercase">
              Isolated Studio Capture • Pure White Background
            </span>
          </div>
        </div>

        {/* Right Column: Specifications & Black Font Product Name and Pricing */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[80vh] flex flex-col justify-between bg-white text-left">
          <div>
            {/* Category / Badge */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-sans-clean">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-semibold text-neutral-800">{product.rating}</span>
                <span className="text-neutral-400">({product.reviewsCount})</span>
              </div>
            </div>

            {/* Product Name: STRICTLY in Black font color, elegant & clean typography */}
            <h2
              id="modal-product-name"
              className="text-black font-serif-luxury text-2xl md:text-3xl font-medium tracking-wide leading-tight mb-2"
            >
              {product.name}
            </h2>

            {/* Product Price: STRICTLY in Black font color, elegant & clean typography */}
            <div className="flex items-baseline gap-3 my-3">
              <span
                id="modal-product-price"
                className="text-black font-sans-clean text-2xl md:text-3xl font-bold tracking-tight"
              >
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-sm text-neutral-400 line-through font-sans-clean">
                  {formattedOriginalPrice}
                </span>
              )}
              <span className="text-xs uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                In Stock
              </span>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed font-sans-clean mt-2 mb-6">
              {product.description}
            </p>

            {/* Ring Size Selector if Ring */}
            {product.category === 'rings' && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-neutral-700 mb-2 font-medium">
                  <span>SELECT RING SIZE (US)</span>
                  <span className="text-neutral-400 underline cursor-pointer hover:text-black">
                    Ring Size Guide
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {ringSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-medium tracking-wider rounded-xs transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-black text-white border-black shadow-xs'
                          : 'bg-neutral-50 text-neutral-800 border border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Table */}
            <div className="border-t border-neutral-100 pt-4 mb-6">
              <h4 className="text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-3 font-sans-clean">
                Craftsmanship & Gemological Specs
              </h4>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div>
                  <dt className="text-neutral-400">Precious Metal</dt>
                  <dd className="text-neutral-900 font-medium">{product.details.metal}</dd>
                </div>
                <div>
                  <dt className="text-neutral-400">Gemstone Details</dt>
                  <dd className="text-neutral-900 font-medium">{product.details.gemstone}</dd>
                </div>
                {product.details.caratWeight && (
                  <div>
                    <dt className="text-neutral-400">Carat Weight</dt>
                    <dd className="text-neutral-900 font-medium">{product.details.caratWeight}</dd>
                  </div>
                )}
                {product.details.clarity && (
                  <div>
                    <dt className="text-neutral-400">Clarity & Color</dt>
                    <dd className="text-neutral-900 font-medium">{product.details.clarity}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-neutral-400">SKU Reference</dt>
                  <dd className="text-neutral-500 font-mono">{product.details.sku}</dd>
                </div>
                <div>
                  <dt className="text-neutral-400">Hallmark</dt>
                  <dd className="text-neutral-900 font-medium">Laser Inscribed & Certified</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-neutral-100">
            <div className="flex gap-3">
              <button
                id="modal-add-to-bag-btn"
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              <button
                id="modal-wishlist-toggle-btn"
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label="Wishlist toggle"
                className={`px-4 py-3.5 border rounded-xs transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-neutral-200 hover:border-black text-neutral-700 hover:text-black'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-neutral-500 text-center">
              <div className="flex items-center justify-center gap-1">
                <Truck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Complimentary Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
