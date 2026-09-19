import React, { useState } from 'react';
import { Sparkles, Star, ArrowLeft, ShieldCheck, Clock } from 'lucide-react';
import { HERO_PRODUCTS } from '../data/products';
import { Product, ProductBundleTier } from '../types';

interface CollectionsPageProps {
  onViewProduct: (productId: string) => void;
  onAddToCart: (product: Product, tier: ProductBundleTier) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  onViewProduct,
  onAddToCart,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProducts = HERO_PRODUCTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'hair' && p.id === 'biotin-hair-gummies') return true;
    if (activeFilter === 'skin' && p.id === 'marine-collagen-elixir') return true;
    if (activeFilter === 'sleep' && p.id === 'magnesium-glow-powder') return true;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#0D382A] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-[#D4AF37]/30 shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-english">
            NAMA BEAUTY CLINICAL COLLECTIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-arabic">
            مجموعات ناما للجمال السريرية
          </h1>
          <p className="text-xs sm:text-sm text-[#E5DFD5] leading-relaxed">
            مكملات غذائية فاخرة صممت خصيصاً لمقاومة جفاف التكييف والمياه المحلاة في الكويت، بتركيزات فعالة وضمان ذهبي 30 يوماً مع الدفع عند الاستلام.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#0D382A] text-white shadow-md'
              : 'bg-white text-[#4A5D54] hover:bg-neutral-100 border border-[#E8E2D8]'
          }`}
        >
          جميع المنتجات (3)
        </button>
        <button
          onClick={() => setActiveFilter('hair')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeFilter === 'hair'
              ? 'bg-[#0D382A] text-white shadow-md'
              : 'bg-white text-[#4A5D54] hover:bg-neutral-100 border border-[#E8E2D8]'
          }`}
        >
          عناية الشعر وتكثيف الفراغات
        </button>
        <button
          onClick={() => setActiveFilter('skin')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeFilter === 'skin'
              ? 'bg-[#0D382A] text-white shadow-md'
              : 'bg-white text-[#4A5D54] hover:bg-neutral-100 border border-[#E8E2D8]'
          }`}
        >
          نضارة البشرة ومقاومة التجاعيد
        </button>
        <button
          onClick={() => setActiveFilter('sleep')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeFilter === 'sleep'
              ? 'bg-[#0D382A] text-white shadow-md'
              : 'bg-white text-[#4A5D54] hover:bg-neutral-100 border border-[#E8E2D8]'
          }`}
        >
          النوم العميق وعلاج الهالات
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const bestTier = product.tiers[1]; // 2 pieces offer
          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#E8E2D8] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#0D382A] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {product.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>متبقي {product.stockRemaining} عبوات</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#C5A880] font-bold">{product.category}</span>
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      <span className="font-bold text-[#0D382A]">{product.rating}</span>
                      <span className="text-neutral-400">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => onViewProduct(product.id)}
                    className="text-lg font-black text-[#0D382A] hover:text-[#D4AF37] cursor-pointer transition-colors leading-snug"
                  >
                    {product.title}
                  </h3>

                  <p className="text-xs text-[#6B7C73] leading-relaxed line-clamp-2">
                    {product.subtitle}
                  </p>

                  <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8E2D8] space-y-1">
                    <div className="text-[11px] font-bold text-[#0D382A]">
                      عروض الباقات الأكثر طلباً:
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-neutral-600">باقة عبوتين (شهرين):</span>
                      <span className="font-black text-base text-[#0D382A]">
                        {bestTier.priceSar} د.ك <span className="text-xs text-neutral-400 line-through">{bestTier.originalPriceSar} د.ك</span>
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold">
                      شحن مجاني مبرد + دفع عند الاستلام
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => onAddToCart(product, bestTier)}
                  className="w-full py-3.5 rounded-xl bg-[#0D382A] hover:bg-[#134937] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <span>اطلبي باقة العبوتين ({bestTier.priceSar} د.ك)</span>
                  <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <button
                  onClick={() => onViewProduct(product.id)}
                  className="w-full py-2 text-xs font-bold text-[#0D382A] hover:bg-neutral-50 rounded-xl transition-colors text-center"
                >
                  تصفح تفاصيل المنتج الكاملة ←
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
