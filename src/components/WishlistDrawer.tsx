import React, { useState, useEffect } from 'react';
import { Product, Currency } from '../types';
import { CURRENCY_RATES } from '../data/constants';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Eye, 
  ArrowRight, 
  Sparkles, 
  Check, 
  AlertCircle,
  Scissors
} from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProductIds: string[];
  products: Product[];
  currency: Currency;
  onToggleWishlist: (product: Product) => void;
  onClearWishlist: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onQuickView: (product: Product) => void;
  onExploreCollections: () => void;
  onOpenCart?: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProductIds,
  products,
  currency,
  onToggleWishlist,
  onClearWishlist,
  onAddToCart,
  onQuickView,
  onExploreCollections,
  onOpenCart,
}) => {
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter products matching wishlisted IDs
  const wishlistedProducts = products.filter(p => wishlistProductIds.includes(p.id));

  // Currency converter
  const rateObj = CURRENCY_RATES[currency] || { code: 'ETB' as any, symbol: 'ETB ', rateToUSD: 1 };

  // Calculate total wishlist value
  const totalWishlistUSD = wishlistedProducts.reduce((sum, p) => sum + (p.priceUSD || 0), 0);
  const totalWishlistConverted = Math.round(totalWishlistUSD * rateObj.rateToUSD);

  const handleItemAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard';
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : 'Original';
    
    onAddToCart(product, defaultSize, defaultColor);
    setAddedItemIds(prev => ({ ...prev, [product.id]: true }));

    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach(product => {
      const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard';
      const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : 'Original';
      onAddToCart(product, defaultSize, defaultColor);
    });

    const allAdded: Record<string, boolean> = {};
    wishlistedProducts.forEach(p => {
      allAdded[p.id] = true;
    });
    setAddedItemIds(allAdded);

    if (onOpenCart) {
      setTimeout(() => {
        onClose();
        onOpenCart();
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose} 
        aria-label="Close Wishlist Drawer"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] text-[#181310] shadow-2xl border-l-2 border-[#D4AF37]/50 flex flex-col justify-between h-full relative z-10">
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-[#D4AF37]/30 bg-[#0E0B0A] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black border border-[#D4AF37] flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 text-[#F5D77F] fill-[#8B0000]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#FFF0C2] tracking-wide">
                    Saved Masterpieces
                  </h2>
                  <span className="bg-[#8B0000] text-[#FFF0C2] text-xs font-black px-2 py-0.5 rounded-full border border-[#D4AF37] shadow-sm">
                    {wishlistProductIds.length}
                  </span>
                </div>
                <p className="text-[11px] text-[#D4AF37] font-sans tracking-widest uppercase">
                  Yared Tibeb Private Curation
                </p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              title="Close Wishlist"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              /* Empty State */
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-5">
                <div className="w-20 h-20 rounded-2xl bg-[#0E0B0A] border-2 border-[#D4AF37] flex items-center justify-center shadow-xl relative">
                  <Heart className="w-10 h-10 text-[#D4AF37] animate-pulse" />
                  <Sparkles className="w-5 h-5 text-[#FFF0C2] absolute -top-2 -right-2" />
                </div>
                
                <div className="space-y-2 max-w-xs">
                  <h3 className="font-serif text-xl font-bold text-[#181310]">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                    You haven’t saved any couture creations yet. Explore our royal Habesha Kemis, silk Shemma gowns, and wedding attire, then tap the heart icon to curate your personal collection.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onExploreCollections();
                  }}
                  className="px-6 py-3 bg-[#0E0B0A] text-[#F5D77F] border-2 border-[#D4AF37] rounded-xl font-sans font-bold text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 group"
                >
                  <span>Explore Atelier Collections</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              /* Product List */
              <>
                {/* Summary bar */}
                <div className="bg-[#FAF3E0] border border-[#D4AF37]/40 rounded-xl p-3 flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-2 text-[#684C24]">
                    <Sparkles className="w-4 h-4 text-[#B58E22] shrink-0" />
                    <span className="font-semibold">
                      {wishlistedProducts.length} Piece{wishlistedProducts.length === 1 ? '' : 's'} Selected
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 uppercase block font-medium">Estimated Value</span>
                    <span className="font-bold text-[#8B0000] text-sm">
                      {rateObj.symbol}{totalWishlistConverted.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Items Container */}
                <div className="space-y-3.5">
                  {wishlistedProducts.map((product) => {
                    const convertedPrice = Math.round(product.priceUSD * rateObj.rateToUSD);
                    const originalPriceConverted = product.originalPriceUSD 
                      ? Math.round(product.originalPriceUSD * rateObj.rateToUSD) 
                      : null;
                    const isAdded = addedItemIds[product.id];

                    return (
                      <div 
                        key={product.id}
                        className="bg-white rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] p-3.5 shadow-sm hover:shadow-md transition-all flex gap-3.5 relative group"
                      >
                        {/* Thumbnail Image */}
                        <div 
                          onClick={() => {
                            onQuickView(product);
                            onClose();
                          }}
                          className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-[#241C16] shrink-0 cursor-pointer relative border border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition"
                        >
                          <img 
                            src={product.images[0] || 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80'} 
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-5 h-5 text-white drop-shadow-md" />
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            {/* Badges */}
                            <div className="flex items-center gap-1.5 flex-wrap mb-1">
                              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#181310] text-[#F5D77F] border border-[#D4AF37]/40">
                                {product.category || 'Atelier Kemis'}
                              </span>
                              {product.isBespokeAvailable && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#FAF3E0] text-[#B58E22] border border-[#D4AF37]/30 flex items-center gap-0.5">
                                  <Scissors className="w-2.5 h-2.5" />
                                  <span>Bespoke</span>
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h4 
                              onClick={() => {
                                onQuickView(product);
                                onClose();
                              }}
                              className="font-serif font-bold text-sm text-[#181310] hover:text-[#8B0000] cursor-pointer line-clamp-1 transition"
                              title={product.name}
                            >
                              {product.name}
                            </h4>

                            {product.amharicName && (
                              <p className="text-xs text-[#8B6B38] font-serif truncate mt-0.5">
                                {product.amharicName}
                              </p>
                            )}

                            {/* Price */}
                            <div className="mt-1 flex items-baseline gap-2">
                              <span className="font-bold text-sm text-[#8B0000]">
                                {rateObj.symbol}{convertedPrice.toLocaleString()}
                              </span>
                              {originalPriceConverted && originalPriceConverted > convertedPrice && (
                                <span className="text-[11px] text-gray-400 line-through">
                                  {rateObj.symbol}{originalPriceConverted.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons Row */}
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                            <button
                              onClick={(e) => handleItemAddToCart(product, e)}
                              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold font-sans tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                                isAdded 
                                  ? 'bg-emerald-700 text-white border border-emerald-800' 
                                  : 'bg-[#0E0B0A] hover:bg-black text-[#F5D77F] border border-[#D4AF37] hover:border-[#FFF0C2]'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-white" />
                                  <span>Added to Bag</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>Add to Bag</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => {
                                onQuickView(product);
                                onClose();
                              }}
                              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-[#181310] hover:border-[#D4AF37] hover:bg-gray-50 transition cursor-pointer"
                              title="Quick View Details"
                              aria-label="Quick View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => onToggleWishlist(product)}
                              className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-[#8B0000] hover:border-[#8B0000]/40 hover:bg-red-50 transition cursor-pointer"
                              title="Remove from Wishlist"
                              aria-label="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer Actions */}
          {wishlistedProducts.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-[#D4AF37]/30 shadow-lg space-y-3 shrink-0">
              {/* Add All to Cart Button */}
              <button
                onClick={handleAddAllToCart}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0E0B0A] via-[#1A1817] to-[#0E0B0A] text-[#F5D77F] rounded-xl font-sans font-extrabold text-xs tracking-widest uppercase border-2 border-[#D4AF37] hover:border-[#FFF0C2] hover:text-white transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span>Move All ({wishlistedProducts.length}) to Shopping Bag</span>
              </button>

              {/* Secondary Options */}
              <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                {showClearConfirm ? (
                  <div className="w-full flex items-center justify-between bg-red-50 p-2.5 rounded-xl border border-red-200 animate-fade-in">
                    <div className="flex items-center gap-1.5 text-red-800 text-xs font-semibold">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Clear all saved pieces?</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          onClearWishlist();
                          setShowClearConfirm(false);
                        }}
                        className="px-2.5 py-1 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        Yes, Clear
                      </button>
                      <button
                        onClick={() => setShowClearConfirm(false)}
                        className="px-2.5 py-1 bg-white text-gray-700 border border-gray-300 rounded-lg text-xs hover:bg-gray-100 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      className="text-gray-500 hover:text-[#8B0000] font-sans font-medium hover:underline flex items-center gap-1 cursor-pointer transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear Wishlist</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onExploreCollections();
                      }}
                      className="text-[#8B6B38] hover:text-[#181310] font-sans font-semibold flex items-center gap-1 cursor-pointer hover:underline transition"
                    >
                      <span>Continue Browsing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
