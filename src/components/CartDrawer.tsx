import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [giftWrapping, setGiftWrapping] = useState<boolean>(true);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const formattedSubtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(subtotal);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        onClearCart();
        setOrderComplete(false);
        onClose();
      }, 2500);
    }, 1200);
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-200 animate-in slide-in-from-right duration-300 text-neutral-900"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h2 className="font-serif-luxury text-xl font-medium text-black">Shopping Bag</h2>
            <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full font-mono">
              {items.reduce((total, i) => total + i.quantity, 0)}
            </span>
          </div>
          <button
            id="close-cart-btn"
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {orderComplete ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif-luxury text-2xl text-black font-medium mb-2">
              Order Confirmed
            </h3>
            <p className="text-neutral-600 text-xs font-sans-clean max-w-xs leading-relaxed">
              Your bespoke fine jewellery order has been received. Our master jewellers in Paris & Antwerp are preparing your insured heirloom parcel.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
            <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl text-black mb-1">Your bag is empty</h3>
            <p className="text-xs text-neutral-500 max-w-xs font-sans-clean mb-6">
              Explore our fine jewellery collection with pristine isolated showcases and high-clarity diamonds.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-6 border border-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              Discover Collection
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-neutral-50/50">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize || 'nosize'}`}
                className="flex gap-4 p-3 bg-white border border-neutral-200/80 rounded-sm shadow-xs"
              >
                {/* Pure white thumbnail */}
                <div className="w-20 h-20 bg-white rounded-xs border border-neutral-100 p-1 flex items-center justify-center shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h4 className="text-sm font-serif-luxury font-medium text-black line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-sans-clean mt-0.5">
                      {item.product.details.metal}
                      {item.selectedSize && ` • Size ${item.selectedSize}`}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                    <span className="text-xs font-semibold text-black font-sans-clean">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }).format(item.product.price * item.quantity)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-neutral-200 rounded-xs bg-neutral-50">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2 py-0.5 text-xs text-neutral-600 hover:text-black cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2 py-0.5 text-xs text-neutral-600 hover:text-black cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      aria-label="Remove item"
                      className="text-neutral-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Complimentary Gift Wrapping Toggle */}
            <div className="p-3 bg-white border border-neutral-200/80 rounded-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-black block">Signature Gift Packaging</span>
                <span className="text-[11px] text-neutral-500">Lacquer presentation box & wax seal</span>
              </div>
              <button
                type="button"
                onClick={() => setGiftWrapping(!giftWrapping)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                  giftWrapping ? 'bg-black' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    giftWrapping ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Footer / Checkout */}
        {items.length > 0 && !orderComplete && (
          <div className="p-5 border-t border-neutral-200 bg-white space-y-3">
            <div className="space-y-1.5 text-xs font-sans-clean">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-medium text-neutral-900">{formattedSubtotal}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Insured White-Glove Shipping</span>
                <span className="text-emerald-700 font-medium uppercase tracking-wider text-[10px]">
                  Complimentary
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-neutral-100 text-black">
                <span>Total Estimated</span>
                <span className="text-black">{formattedSubtotal}</span>
              </div>
            </div>

            <button
              id="checkout-btn"
              type="button"
              disabled={isCheckingOut}
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isCheckingOut ? (
                <span>Securing Heirloom Order...</span>
              ) : (
                <>
                  <span>Proceed to Insured Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Fully Insured Worldwide Delivery • GIA Certificates Included</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
