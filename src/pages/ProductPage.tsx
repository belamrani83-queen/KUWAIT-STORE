import React, { useState } from 'react';
import { Star, ShieldCheck, Truck, Banknote, Award, Clock, Sparkles, CheckCircle2, ChevronDown, ArrowLeft, HeartHandshake, Eye, Gift } from 'lucide-react';
import { Product, ProductBundleTier } from '../types';
import { SAUDI_REVIEWS } from '../data/reviews';

interface ProductPageProps {
  product: Product;
  onAddToCart: (product: Product, tier: ProductBundleTier) => void;
  onSelectOtherProduct: (productId: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onAddToCart,
  onSelectOtherProduct,
}) => {
  // Active selected image index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Selected bundle tier: default to Tier 2 (2 pieces, 279 SAR - best value)
  const [selectedTierId, setSelectedTierId] = useState<number>(2);

  // State for accordion toggles
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const selectedTier = product.tiers.find((t) => t.id === selectedTierId) || product.tiers[1];

  const handleOrderClick = () => {
    onAddToCart(product, selectedTier);
  };

  // Specific reviews matching this product
  const productReviews = SAUDI_REVIEWS.filter(
    (r) => r.productTitle.includes(product.title) || r.productTitle.includes('المجموعة')
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Main Product Section (Desktop: Gallery Left/Right, Conversion Card Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6B7C73] mb-6">
          <span className="hover:text-[#0D382A] cursor-pointer" onClick={() => onSelectOtherProduct('home')}>الرئيسية</span>
          <span>/</span>
          <span>المجموعات</span>
          <span>/</span>
          <span className="text-[#0D382A] font-bold">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery (Left Column in RTL) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden bg-neutral-100 border border-[#E8E2D8] shadow-md">
              <img
                src={product.images[activeImageIndex]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-4 right-4 bg-[#0D382A] text-white px-3.5 py-1 rounded-full text-xs font-bold shadow-md">
                {product.badge}
              </div>

              {/* Live viewers badge */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>تشاهد هذا المنتج 19 عميلة الآن</span>
              </div>
            </div>

            {/* Thumbnails (3-4 sample images) */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#0D382A] ring-2 ring-[#0D382A]/20 scale-102'
                      : 'border-[#E8E2D8] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`عينة ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Trust Features Strip under gallery */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3 rounded-2xl border border-[#E8E2D8] text-center space-y-1 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-[#0D382A] mx-auto" />
                <div className="text-[11px] font-bold text-[#0D382A]">مطابق للمواصفات</div>
                <div className="text-[10px] text-neutral-500">معايير الصحة والرقابة</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E8E2D8] text-center space-y-1 shadow-2xs">
                <Banknote className="w-5 h-5 text-[#0D382A] mx-auto" />
                <div className="text-[11px] font-bold text-[#0D382A]">الدفع عند الاستلام</div>
                <div className="text-[10px] text-neutral-500">معاينة قبل الدفع</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E8E2D8] text-center space-y-1 shadow-2xs">
                <Truck className="w-5 h-5 text-[#0D382A] mx-auto" />
                <div className="text-[11px] font-bold text-[#0D382A]">شحن سريع مبرد</div>
                <div className="text-[10px] text-neutral-500">24-48 ساعة لباب بيتك</div>
              </div>
            </div>
          </div>

          {/* Product Offer & Buy Card (Right Column in RTL) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header & Rating */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-xs font-black text-[#0D382A]">{product.rating}</span>
                <span className="text-xs text-[#6B7C73]">
                  ({product.reviewsCount} تقييم موثق من سيدات الكويت)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D382A] leading-tight font-arabic">
                {product.title}
              </h1>

              <p className="text-xs sm:text-sm text-[#4A5D54] leading-relaxed font-medium">
                {product.subtitle}
              </p>
            </div>

            {/* Scarcity Urgency Banner */}
            <div className="bg-[#FEF7EC] border border-[#F5E6CC] p-3 rounded-2xl flex items-center justify-between text-xs text-[#8A580C]">
              <div className="flex items-center gap-2 font-bold">
                <Clock className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span>متبقي في مستودعنا المركزي بالكويت اليوم: {product.stockRemaining} عبوات فقط!</span>
              </div>
              <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">
                طلب متزايد 🔥
              </span>
            </div>

            {/* Tiered Bundles Offer Selector (199 / 279 / 349 SAR) */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-[#0D382A]">
                <span>اختر باقة التوفير المناسبة لكِ:</span>
                <span className="text-[#D4AF37]">الدفع نقداً عند الاستلام</span>
              </div>

              <div className="space-y-2.5">
                {product.tiers.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-[#0D382A] bg-[#0D382A]/5 ring-1 ring-[#0D382A]'
                          : 'border-[#E8E2D8] hover:border-neutral-300 bg-white'
                      }`}
                    >
                      {tier.popularBadge && (
                        <span className="absolute -top-3 left-4 bg-[#D4AF37] text-[#0D382A] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                          {tier.popularBadge}
                        </span>
                      )}

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? 'border-[#0D382A] bg-[#0D382A]'
                                : 'border-neutral-300'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>

                          <div>
                            <div className="text-sm font-black text-[#0D382A]">
                              {tier.label}
                            </div>
                            <div className="text-xs text-[#6B7C73]">
                              {tier.sublabel}
                            </div>
                            {tier.freeGifts && (
                              <div className="text-[11px] text-emerald-800 font-bold flex items-center gap-1 mt-1">
                                <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                                <span>{tier.freeGifts}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-left shrink-0">
                          <div className="text-lg font-black text-[#0D382A]">
                            {tier.priceSar} د.ك
                          </div>
                          {tier.originalPriceSar > tier.priceSar && (
                            <div className="text-xs text-neutral-400 line-through">
                              {tier.originalPriceSar} د.ك
                            </div>
                          )}
                          {tier.savingsSar > 0 && (
                            <div className="text-[11px] text-emerald-700 font-bold">
                              وفرتِ {tier.savingsSar} د.ك
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Primary Add-to-Cart & Checkout Trigger CTA */}
            <div className="space-y-3 pt-2">
              <button
                id="product-page-order-cta-btn"
                onClick={handleOrderClick}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-[#0D382A] to-[#16503D] hover:from-[#134937] hover:to-[#1b5f49] text-white font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer active:scale-95 border border-[#D4AF37]/50"
              >
                <span>اطلبي الآن ({selectedTier.priceSar} د.ك) - الدفع عند الاستلام</span>
                <ArrowLeft className="w-5 h-5 text-[#D4AF37]" />
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-[#6B7C73]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  ضمان ذهبي 30 يوماً
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-[#D4AF37]" />
                  شحن مجاني مبرد
                </span>
                <span>•</span>
                <span>معاينة قبل الدفع</span>
              </div>
            </div>

            {/* Emotional Problem -> Clinical Solution Box */}
            <div className="bg-[#FAF4EB] p-4 sm:p-5 rounded-2xl border border-[#EEDFC6] space-y-3">
              <div className="text-xs font-bold text-[#8C6D23] uppercase tracking-wider">
                معادلة ناما للجمال:
              </div>
              <p className="text-xs text-[#5D461E] leading-relaxed">
                <strong>الألم:</strong> {product.emotionalHook}
              </p>
              <p className="text-xs text-[#5D461E] leading-relaxed pt-1 border-t border-[#EEDFC6]">
                <strong>الحل السريري:</strong> {product.clinicalSolution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Alternating Section: Clinical Ingredients & Dosage Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Right Text */}
          <div className="lg:col-span-6 space-y-4 text-right">
            <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">
              نقاء المكونات وتراكيزها الفعالة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D382A] leading-tight font-arabic">
              ماذا تحتوي كل جرعة يومية من {product.title}؟
            </h2>
            <p className="text-sm text-[#4A5D54] leading-relaxed">
              لا نستخدم حشوات رخيصة أو ملونات صناعية. كل مكون تم اختياره بناءً على دراسات سريرية منشورة وبجرعات علاجية تضمن وصول المغذيات للخلايا المستهدفة مباشرة.
            </p>

            <div className="space-y-3 pt-2">
              {product.ingredients.map((ing, i) => (
                <div
                  key={i}
                  className="bg-white p-3.5 rounded-2xl border border-[#E8E2D8] flex items-start justify-between gap-3 shadow-2xs"
                >
                  <div>
                    <div className="font-black text-sm text-[#0D382A]">{ing.name}</div>
                    <div className="text-xs text-[#6B7C73] mt-0.5">{ing.benefit}</div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#0D382A]/10 text-[#0D382A] px-2.5 py-1 rounded-lg shrink-0">
                    {ing.dosage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Left Image (Alternating) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8E2D8]">
              <img
                src={product.images[1] || product.images[0]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <div className="text-xs font-bold text-[#D4AF37]">طريقة الاستخدام اليومية:</div>
                  <div className="text-xs text-neutral-200">{product.usageInstructions}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Alternating Section: Transformation Timeline (14, 30, 60 Days) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Image on Right (in LTR) / Left on Desktop */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8E2D8]">
              <img
                src={product.images[2] || product.images[0]}
                alt="خارطة النتائج السريرية"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#0D382A]/90 text-white px-3 py-1 rounded-full text-xs font-bold">
                بروتوكول التحول السريري
              </div>
            </div>
          </div>

          {/* Text on Left (order 1 in desktop) */}
          <div className="lg:col-span-6 space-y-6 text-right order-1 lg:order-2">
            <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">
              جدول النتائج المتوقعة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D382A] leading-tight font-arabic">
              ماذا سيحدث لشعركِ وبشرتكِ يوماً بيوم؟
            </h2>
            <p className="text-sm text-[#4A5D54] leading-relaxed">
              النتائج الحقيقية تبدأ من التراكم الخلوي الداخلي. إليكِ ما لاحظته أكثر من 4,000 عميلة في الكويت خلال مراحل الاستخدام:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-[#0D382A]">اليوم 1 إلى 14: مرحلة التنشيط الخلوي</span>
                  <span className="text-xs font-bold text-[#D4AF37]">المرحلة الأولى</span>
                </div>
                <p className="text-xs text-[#4A5D54] leading-relaxed">{product.timeline.day14}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#0D382A]/30 shadow-2xs space-y-1 ring-1 ring-[#0D382A]/10">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-[#0D382A]">اليوم 15 إلى 30: مرحلة الإنبات والترطيب العميق</span>
                  <span className="text-xs font-bold text-emerald-700">فارق ملموس ⭐</span>
                </div>
                <p className="text-xs text-[#4A5D54] leading-relaxed">{product.timeline.day30}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D382A] text-white shadow-md space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-white">اليوم 31 إلى 60: مرحلة الكثافة والنضارة المستدامة</span>
                  <span className="text-xs font-bold text-[#D4AF37]">النتائج الدائمة 💎</span>
                </div>
                <p className="text-xs text-[#E5DFD5] leading-relaxed">{product.timeline.day60}</p>
              </div>
            </div>

            <button
              onClick={handleOrderClick}
              className="inline-flex items-center gap-2 text-sm font-black text-[#0D382A] hover:text-[#D4AF37] pt-2"
            >
              <span>احجزي كورس الـ 60 يوماً الآن مع التوصيل المجاني</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Real Verified Kuwait Customer Reviews for This Product */}
      <section className="bg-[#FAF4EB] py-14 border-y border-[#EEDFC6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#0D382A] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#D0C8BC]">
              آراء حقيقية من مناطق الكويت 🇰🇼
            </span>
            <h3 className="text-2xl font-black text-[#0D382A] font-arabic">
              تجارب موثقة مع {product.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-3 text-right flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-[#D4AF37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#6B7C73]">{rev.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2D3E36] leading-relaxed font-normal">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[#0D382A] flex items-center gap-1">
                      <span>{rev.author}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-[11px] text-[#6B7C73]">{rev.city}</div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                    طلب مستلم COD
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions & Medical Answers */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl sm:text-2xl font-black text-[#0D382A]">
            الأسئلة الأكثر تكراراً حول هذا المنتج
          </h3>
          <p className="text-xs text-[#6B7C73]">
            إجابات الأطباء واستشاريي التغذية السريرية في ناما للجمال.
          </p>
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-xs">
            <button
              onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
              className="w-full text-right p-4 font-bold text-[#0D382A] text-sm flex items-center justify-between"
            >
              <span>متى تظهر أولى النتائج الملموسة؟</span>
              <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform ${openFaqIndex === 0 ? 'rotate-180' : ''}`} />
            </button>
            {openFaqIndex === 0 && (
              <div className="px-4 pb-4 text-xs text-[#4A5D54] leading-relaxed border-t border-neutral-100 bg-[#FAF8F5]/50">
                تلاحظ أغلب العميلات توقفاً كبيراً في التساقط وزيادة في حيوية الشعر أو ترطيب البشرة خلال أول 14 إلى 21 يوماً من الاستخدام اليومي المنتظم، وتبدأ الفراغات بالامتلاء في الشهر الثاني.
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-xs">
            <button
              onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
              className="w-full text-right p-4 font-bold text-[#0D382A] text-sm flex items-center justify-between"
            >
              <span>هل المنتج آمن تماماً ولا يسبب أي آثار جانبية؟</span>
              <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform ${openFaqIndex === 1 ? 'rotate-180' : ''}`} />
            </button>
            {openFaqIndex === 1 && (
              <div className="px-4 pb-4 text-xs text-[#4A5D54] leading-relaxed border-t border-neutral-100 bg-[#FAF8F5]/50">
                نعم، تركيبات ناما مصنوعة من مكونات طبيعية نقية خالية من السكر، خالية من الهرمونات والمواد المحظورة، ومصنعة في منشآت معتمدة GMP ومطابقة لأعلى المواصفات والاشتراطات الصحية.
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-xs">
            <button
              onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
              className="w-full text-right p-4 font-bold text-[#0D382A] text-sm flex items-center justify-between"
            >
              <span>كيف تتم عملية الدفع والتوصيل؟</span>
              <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform ${openFaqIndex === 2 ? 'rotate-180' : ''}`} />
            </button>
            {openFaqIndex === 2 && (
              <div className="px-4 pb-4 text-xs text-[#4A5D54] leading-relaxed border-t border-neutral-100 bg-[#FAF8F5]/50">
                الدفع نقداً عند الاستلام (COD) فقط. لا تدفعين أي دينار مسبقاً. يصلكِ المندوب لباب بيتك، تعاينين الطرد، ثم تدفعين المبلغ نقداً مع شحن مجاني للباقات.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Bottom Bar for High Mobile CRO */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E8E2D8] p-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-[#6B7C73]">الباقة المختارة:</div>
          <div className="text-base font-black text-[#0D382A]">
            {selectedTier.priceSar} د.ك <span className="text-[11px] font-normal text-emerald-700">شحن مجاني</span>
          </div>
        </div>

        <button
          onClick={handleOrderClick}
          className="flex-1 py-3 px-4 rounded-xl bg-[#0D382A] hover:bg-[#134937] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-95"
        >
          <span>اطلبي الآن (الدفع عند الاستلام)</span>
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
};
