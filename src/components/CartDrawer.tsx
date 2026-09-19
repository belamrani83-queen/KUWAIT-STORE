import React from 'react';
import { X, Trash2, ShoppingBag, ArrowLeft, Truck, ShieldCheck, Gift } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onAddCrossSell?: (product: Product) => void;
  onOpenCheckout: () => void;
  onViewProduct: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onAddCrossSell,
  onOpenCheckout,
  onViewProduct,
}) => {
  if (!isOpen) return null;

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + item.selectedTier.priceSar, 0);
  const totalOriginal = items.reduce((acc, item) => acc + item.selectedTier.originalPriceSar, 0);
  const totalSavings = totalOriginal - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0B2A20]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-r border-[#E8E2D8] animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#E8E2D8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0D382A]" />
              <h3 className="font-bold text-lg text-[#0D382A]">سلة المشتريات ({items.length})</h3>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping & Scarcity Progress Bar */}
          <div className="bg-[#0D382A]/5 border-b border-[#0D382A]/10 px-5 py-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#0D382A] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>الشحن السريع المبرد مجاني لكافة مناطق الكويت!</span>
              </span>
              <span className="text-[#D4AF37]">100% مؤهل</span>
            </div>
            <div className="w-full bg-[#E5DFD5] h-2 rounded-full overflow-hidden">
              <div className="bg-linear-to-r from-[#D4AF37] to-[#0D382A] h-full w-full rounded-full transition-all duration-500" />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0D382A]/10 text-[#0D382A] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <div className="font-bold text-[#0D382A] text-lg">سلتكِ فارغة حالياً</div>
                <p className="text-xs text-[#6B7C73] max-w-xs mx-auto">
                  اكتشفي باقاتنا المعتمدة للشعر والبشرة وابدئي رحلة العناية الفاخرة اليوم.
                </p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  className="bg-white p-4 rounded-xl border border-[#E8E2D8] shadow-xs relative flex gap-3.5"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover border border-[#E8E2D8] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          onViewProduct(item.product.id);
                          onClose();
                        }}
                        className="text-sm font-bold text-[#0D382A] line-clamp-1 hover:text-[#D4AF37] cursor-pointer"
                      >
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        title="حذف من السلة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-[#C5A880] font-semibold mt-0.5">
                      {item.selectedTier.label}
                    </div>

                    {item.selectedTier.freeGifts && (
                      <div className="flex items-center gap-1 text-[11px] text-[#0D382A] mt-1 bg-[#0D382A]/5 px-2 py-0.5 rounded-md w-fit">
                        <Gift className="w-3 h-3 text-[#D4AF37]" />
                        <span>{item.selectedTier.freeGifts}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-black text-[#0D382A]">
                          {item.selectedTier.priceSar} د.ك
                        </span>
                        {item.selectedTier.originalPriceSar > item.selectedTier.priceSar && (
                          <span className="text-xs text-neutral-400 line-through">
                            {item.selectedTier.originalPriceSar} د.ك
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] bg-[#0D382A] text-white px-2 py-0.5 rounded-full font-bold">
                        وفرتِ {item.selectedTier.savingsSar} د.ك
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary & CTA */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E8E2D8] space-y-3">
              <div className="space-y-1.5 text-xs text-[#4A5D54]">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-[#0D382A]">{subtotal} د.ك</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-[#0D382A] font-bold">
                    <span>مجموع الخصومات الموفرة:</span>
                    <span>- {totalSavings} د.ك</span>
                  </div>
                )}
                <div className="flex justify-between text-[#0D382A]">
                  <span>الشحن والتوصيل المبرد:</span>
                  <span className="font-bold text-emerald-700">مجاني بالكامل 🚚</span>
                </div>
                <div className="flex justify-between">
                  <span>طريقة الدفع:</span>
                  <span className="font-bold text-[#0D382A]">نقداً عند الاستلام (COD)</span>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex justify-between items-baseline">
                  <span className="text-sm font-black text-[#0D382A]">المبلغ المطلوب عند الاستلام:</span>
                  <span className="text-xl font-black text-[#0D382A]">{subtotal} د.ك</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                id="cart-drawer-checkout-cta-btn"
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-4 rounded-xl bg-linear-to-r from-[#0D382A] to-[#16503D] hover:from-[#134937] hover:to-[#1b5f49] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              >
                <span>متابعة لإتمام الطلب السريع (الدفع عند الاستلام)</span>
                <ArrowLeft className="w-5 h-5 text-[#D4AF37]" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#6B7C73] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  ضمان ذهبي 30 يوماً
                </span>
                <span>•</span>
                <span>المعاينة قبل الدفع للمندوب</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
