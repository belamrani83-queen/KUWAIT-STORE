import React, { useState } from 'react';
import { ShieldCheck, Truck, Banknote, Award, Sparkles, Star, ArrowLeft, CheckCircle2, ChevronDown, HeartHandshake, Zap, Clock } from 'lucide-react';
import { HERO_PRODUCTS } from '../data/products';
import { SAUDI_REVIEWS, GENERAL_FAQS } from '../data/reviews';
import { Product, ProductBundleTier } from '../types';

interface HomePageProps {
  onAddToCart: (product: Product, tier: ProductBundleTier) => void;
  onViewProduct: (productId: string) => void;
  onViewCollections: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToCart,
  onViewProduct,
  onViewCollections,
}) => {
  const [selectedTiers, setSelectedTiers] = useState<Record<string, number>>({
    'biotin-hair-gummies': 2, // default to 2 pieces (Best value 23 KWD)
    'marine-collagen-elixir': 2,
    'magnesium-glow-powder': 2,
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSelectTier = (productId: string, tierId: number) => {
    setSelectedTiers((prev) => ({ ...prev, [productId]: tierId }));
  };

  const handleQuickAdd = (product: Product) => {
    const tierId = selectedTiers[product.id] || 2;
    const chosenTier = product.tiers.find((t) => t.id === tierId) || product.tiers[1];
    onAddToCart(product, chosenTier);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. High-Authority Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Right: Persuasive Kuwait Authority Copy */}
            <div className="lg:col-span-7 space-y-6 text-right">
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D382A]/10 border border-[#0D382A]/20 text-[#0D382A] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span>العلامة الأولى لمكملات الجمال السريرية المعتمدة في الكويت 🇰🇼</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D382A] leading-[1.25] font-arabic">
                جمالكِ الطبيعي يستحق <span className="text-[#D4AF37]">الاستثمار الحقيقي</span>، لا الوعود الزائفة.
              </h1>

              <p className="text-base sm:text-lg text-[#4A5D54] leading-relaxed max-w-2xl font-medium">
                تركيبات سريرية مكثفة مصممة خصيصاً لمواجهة أضرار <strong>المياه المحلاة، جفاف التكييف المستمر، ورطوبة الصيف في الكويت</strong>. أوقفي تساقط الشعر، املئي الفراغات، واستعيدي نضارة بشرتك وشبابها من الداخل.
              </p>

              {/* 3 Quick Benefit Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0D382A] bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-[#E8E2D8]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>تراكيز علاجية مثبتة علمياً</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0D382A] bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-[#E8E2D8]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>الدفع نقداً عند الاستلام</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0D382A] bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-[#E8E2D8]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>ضمان ذهبي 30 يوماً</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="hero-shop-collections-btn"
                  onClick={onViewCollections}
                  className="px-8 py-4 rounded-xl bg-linear-to-r from-[#0D382A] to-[#16503D] hover:from-[#134937] hover:to-[#1b5f49] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
                >
                  <span>اكتشفي منتجاتنا الحصرية</span>
                  <ArrowLeft className="w-5 h-5 text-[#D4AF37]" />
                </button>

                <button
                  id="hero-view-biotin-btn"
                  onClick={() => onViewProduct('biotin-hair-gummies')}
                  className="px-6 py-4 rounded-xl bg-white hover:bg-neutral-50 text-[#0D382A] font-bold text-sm border border-[#D0C8BC] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>علكات البيوتين الأكثر طلباً (23 د.ك)</span>
                </button>
              </div>

              {/* Verified Customers Counter */}
              <div className="flex items-center gap-4 pt-3 border-t border-[#E8E2D8]/80 text-xs text-[#6B7C73]">
                <div className="flex -space-x-2 space-x-reverse">
                  <div className="w-8 h-8 rounded-full bg-[#0D382A] text-white font-bold flex items-center justify-center text-[10px] border-2 border-white">م.ك</div>
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0D382A] font-bold flex items-center justify-center text-[10px] border-2 border-white">ف.أ</div>
                  <div className="w-8 h-8 rounded-full bg-[#4A3B69] text-white font-bold flex items-center justify-center text-[10px] border-2 border-white">د.ع</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    ))}
                    <span className="font-bold text-[#0D382A] mr-1">4.96/5</span>
                  </div>
                  <p className="text-[11px] text-[#4A5D54]">أكثر من 4,000 عميلة وثقت في ناما للجمال في مختلف مناطق الكويت 🇰🇼</p>
                </div>
              </div>
            </div>

            {/* Left: Luxury Editorial Hero Product Grid Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-linear-to-r from-[#D4AF37]/20 to-[#0D382A]/20 rounded-3xl blur-xl" />

                <div className="relative bg-white p-4 rounded-3xl border border-[#E8E2D8] shadow-2xl space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3">
                    <img
                      src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80"
                      alt="علكات البيوتين ناما للجمال"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#0D382A]/90 backdrop-blur-md text-[#D4AF37] px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>التركيبة الأكثر مبيعاً ⭐</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-mono">
                      10,000 mcg D-Biotin + Zinc
                    </div>
                  </div>

                  {/* Quick Card Features */}
                  <div className="p-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-black text-[#0D382A] text-base">علكات البيوتين المكثفة</h4>
                        <p className="text-xs text-[#6B7C73]">كورس إنبات الفراغات ووقف التساقط</p>
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-neutral-400 line-through">33 د.ك</div>
                        <div className="text-lg font-black text-[#0D382A]">23 د.ك</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onViewProduct('biotin-hair-gummies')}
                      className="w-full py-2.5 rounded-xl bg-[#0D382A] text-white font-bold text-xs hover:bg-[#134937] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>عرض تفاصيل المنتج واختيار الباقة</span>
                      <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Authority & Certifications Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D382A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D4AF37]/30">
          <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              معايير الجودة والأمان الدوائي
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-arabic">
              لماذا تثق بنا عميلاتنا في دولة الكويت؟
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <h4 className="font-bold text-sm text-white">مطابق للمواصفات الخليجية</h4>
              <p className="text-[11px] text-[#C5BDB2]">مطابق لاشتراطات وزارة الصحة والمقاييس الخليجية</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <Award className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <h4 className="font-bold text-sm text-white">شهادة تصنيع GMP</h4>
              <p className="text-[11px] text-[#C5BDB2]">أعلى معايير الرقابة الدوائية العالمية</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <Banknote className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <h4 className="font-bold text-sm text-white">الدفع عند الاستلام</h4>
              <p className="text-[11px] text-[#C5BDB2]">افحصي الطرد بيدكِ أولاً قبل دفع أي دينار كويتي</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <Truck className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <h4 className="font-bold text-sm text-white">توصيل مبرد وسريع</h4>
              <p className="text-[11px] text-[#C5BDB2]">مستودعاتنا المركزية في الكويت لضمان جودة وفعالية التركيبة</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Hero 3 Products Showcase with High AOV Tiered Offers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider bg-[#0D382A] px-3 py-1 rounded-full">
            منتجاتنا السريرية الحصرية
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D382A] font-arabic">
            حلول جذرية مصممة لأدق تفاصيل جمالكِ
          </h2>
          <p className="text-sm text-[#4A5D54]">
            اختاري باقتكِ المفضلة مع شحن مجاني مبرد ودفع آمن عند الاستلام في باب بيتكِ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {HERO_PRODUCTS.map((product) => {
            const activeTierId = selectedTiers[product.id] || 2;
            const activeTier = product.tiers.find((t) => t.id === activeTierId) || product.tiers[1];

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#E8E2D8] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Image & Badges */}
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

                    <div className="absolute bottom-3 right-3 bg-red-600/95 text-white px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 shadow-sm">
                      <Clock className="w-3 h-3" />
                      <span>متبقي {product.stockRemaining} عبوات فقط</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
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
                      className="text-lg sm:text-xl font-black text-[#0D382A] hover:text-[#D4AF37] cursor-pointer transition-colors leading-snug"
                    >
                      {product.title}
                    </h3>

                    <p className="text-xs text-[#6B7C73] leading-relaxed line-clamp-2">
                      {product.subtitle}
                    </p>

                    {/* Tiered Pricing Boxes (16 / 23 / 29 KWD) */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold text-[#0D382A]">
                        اختاري العرض المناسب لكِ:
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {product.tiers.map((tier) => {
                          const isSelected = activeTierId === tier.id;
                          return (
                            <button
                              key={tier.id}
                              onClick={() => handleSelectTier(product.id, tier.id)}
                              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer relative ${
                                isSelected
                                  ? 'border-[#0D382A] bg-[#0D382A]/5 ring-2 ring-[#0D382A]/20'
                                  : 'border-[#E8E2D8] hover:border-neutral-400 bg-white'
                              }`}
                            >
                              {tier.id === 2 && (
                                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0D382A] text-[9px] font-black px-1.5 py-0.2 rounded-full whitespace-nowrap shadow-xs">
                                  الأكثر طلباً
                                </span>
                              )}
                              <div className="text-xs font-bold text-[#0D382A]">
                                {tier.quantity} {tier.quantity === 1 ? 'عبوة' : 'عبوات'}
                              </div>
                              <div className="text-sm font-black text-[#0D382A] mt-0.5">
                                {tier.priceSar} د.ك
                              </div>
                              {tier.savingsSar > 0 && (
                                <div className="text-[10px] text-emerald-700 font-bold">
                                  وفرتِ {tier.savingsSar} د.ك
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    id={`quick-add-btn-${product.id}`}
                    onClick={() => handleQuickAdd(product)}
                    className="w-full py-3.5 rounded-xl bg-linear-to-r from-[#0D382A] to-[#16503D] hover:from-[#134937] hover:to-[#1b5f49] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                  >
                    <span>اطلبي الآن ({activeTier.priceSar} د.ك) - دفع عند الاستلام</span>
                    <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
                  </button>

                  <button
                    onClick={() => onViewProduct(product.id)}
                    className="w-full py-2 rounded-xl text-[#0D382A] hover:bg-neutral-100 text-xs font-bold transition-colors text-center"
                  >
                    عرض صفحة المنتج التفصيلية ومراجعات البنات ←
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Alternating Storytelling Sections (Addressing Kuwait Pains) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* Story 1: Text Right + Image Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5 text-right">
            <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">
              المشكلة الخفية في بيوتنا
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0D382A] leading-tight font-arabic">
              أزمة المياه المحلاة وجفاف التكييف المستمر.. لماذا لا تنجح الزيوت العادية؟
            </h3>
            <p className="text-sm text-[#4A5D54] leading-relaxed">
              المياه المعالجة بالكلور والأملاح المتراكمة في خزانات البيوت تجرّد الشعرة من طبقة الحماية الطبيعية، مما يجعل الجذور ضعيفة وهشة تتساقط عند أدنى لمسة. وضع الزيوت والشامبوهات الخارجية يعطي ملمساً دهنياً مؤقتاً لكنه لا يغذي البصيلة من الداخل.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0D382A] shrink-0 mt-0.5" />
                <span className="text-xs text-[#2D3E36] font-semibold">
                  علكات ناما بـ 10,000 مكجم بيوتين تعوض النقص الخلوي وتغذي الكيراتين من الجذور.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0D382A] shrink-0 mt-0.5" />
                <span className="text-xs text-[#2D3E36] font-semibold">
                  تحفيز نمو البيبي هير وملء الفراغات في مقدمة الرأس خلال 30 يوماً فقط.
                </span>
              </div>
            </div>

            <button
              onClick={() => onViewProduct('biotin-hair-gummies')}
              className="inline-flex items-center gap-2 text-sm font-black text-[#0D382A] hover:text-[#D4AF37] pt-2"
            >
              <span>تعرفي على تركيبة البيوتين السريرية</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8E2D8]">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80"
                alt="شعر صحي كثيف ناما للجمال"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute bottom-4 right-4 left-4 bg-[#0D382A]/90 backdrop-blur-md text-white p-4 rounded-2xl border border-[#D4AF37]/30">
                <div className="text-xs font-bold text-[#D4AF37]">نتائج سريرية مثبتة:</div>
                <div className="text-xs mt-0.5 text-neutral-200">
                  انخفاض تساقط الشعر بنسبة 85% وزيادة سماكة البصيلة لدى 94% من المشاركات.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 2: Image Right + Text Left (Alternating Pattern) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8E2D8]">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80"
                alt="نضارة البشرة كولاجين ناما"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute bottom-4 right-4 left-4 bg-[#0D382A]/90 backdrop-blur-md text-white p-4 rounded-2xl border border-[#D4AF37]/30">
                <div className="text-xs font-bold text-[#D4AF37]">نقاء 2000 دالتون فائق الامتصاص:</div>
                <div className="text-xs mt-0.5 text-neutral-200">
                  ببتيدات كولاجين بحري متحلل بنسبة امتصاص 95% خلال 45 دقيقة فقط.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-right order-1 lg:order-2">
            <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">
              سر النضارة السريري
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0D382A] leading-tight font-arabic">
              الكولاجين السطحي لا يكفي.. بشرتكِ تحتاج لبناء الألياف من الداخل
            </h3>
            <p className="text-sm text-[#4A5D54] leading-relaxed">
              الكريمات العادية لا تستطيع اختراق طبقة الأدمة لأن جزيئات الكولاجين فيها ضخمة. كولاجين ناما البحري يخضع لتقنية تحلل إنزيمي سويسرية تصل لوزن 2000 دالتون، ليعيد ملء خطوط الابتسامة والجبهة وترطيب البشرة كالإسفنجة الممتلئة.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0D382A] shrink-0 mt-0.5" />
                <span className="text-xs text-[#2D3E36] font-semibold">
                  طعم الرمان والخوخ الطبيعي المنعش بدون أي أثر لطعم السمك.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0D382A] shrink-0 mt-0.5" />
                <span className="text-xs text-[#2D3E36] font-semibold">
                  معزز بحمض الهيالورونيك وفيتامين C وأقوى مضاد أكسدة (الأستازانتين).
                </span>
              </div>
            </div>

            <button
              onClick={() => onViewProduct('marine-collagen-elixir')}
              className="inline-flex items-center gap-2 text-sm font-black text-[#0D382A] hover:text-[#D4AF37] pt-2"
            >
              <span>اكتشفي إكسير الكولاجين البحري</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Story 3: Text Right + Image Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5 text-right">
            <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">
              علاج الهالات من الجذور
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0D382A] leading-tight font-arabic">
              الهالات السوداء ليست صبغة خارجية.. بل نتيجة اضطراب هرمونات التوتر
            </h3>
            <p className="text-sm text-[#4A5D54] leading-relaxed">
              السهر وضغوط الحياة ترفع هرمون الكورتيزول، مما يسبب ركود السوائل والأوعية الدموية الدقيقة حول العينين. بودرة مغنيسيوم بيسجليسينات النقية تهدئ الجهاز العصبي لتدخلي في مرحلة النوم العميق (REM) التي يتم فيها تصريف السموم وترميم خلايا الجفون.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0D382A] shrink-0 mt-0.5" />
                <span className="text-xs text-[#2D3E36] font-semibold">
                  نوم هانئ وعميق دون كسل أو خمول في الصباح.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0D382A] shrink-0 mt-0.5" />
                <span className="text-xs text-[#2D3E36] font-semibold">
                  تفتيح ملحوظ لهالات تحت العين وتصريف الانتفاخات خلال أسبوعين.
                </span>
              </div>
            </div>

            <button
              onClick={() => onViewProduct('magnesium-glow-powder')}
              className="inline-flex items-center gap-2 text-sm font-black text-[#0D382A] hover:text-[#D4AF37] pt-2"
            >
              <span>تعرفي على بودرة المغنيسيوم المهدئة</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8E2D8]">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80"
                alt="نوم عميق وعلاج الهالات بودرة المغنيسيوم"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute bottom-4 right-4 left-4 bg-[#0D382A]/90 backdrop-blur-md text-white p-4 rounded-2xl border border-[#D4AF37]/30">
                <div className="text-xs font-bold text-[#D4AF37]">الراحة العصبية والنضارة:</div>
                <div className="text-xs mt-0.5 text-neutral-200">
                  مغنيسيوم جلايسينات لطيف على المعدة بدون إسهال وبأعلى امتصاص عصبي.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Authentic Kuwait Social Proof & Reviews */}
      <section className="bg-[#F4EFE6] py-16 border-y border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#0D382A] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#D0C8BC]">
              تجارب حقيقية من مناطق الكويت 🇰🇼
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D382A] font-arabic">
              ماذا تقول بنات العاصمة وحولي والأحمدي والجهراء عن ناما؟
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5D54]">
              آراء موثقة من عميلات طلبن واستلمن منتجاتهن ودفعن نقداً عند الاستلام.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAUDI_REVIEWS.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 text-right"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#D4AF37]">
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
                  <div className="text-[10px] bg-[#0D382A]/10 text-[#0D382A] font-bold px-2 py-0.5 rounded-md">
                    مشترية موثقة
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Medical & Clinical Nutritionist Endorsement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-[#0D382A] to-[#174635] text-white rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold">
              <HeartHandshake className="w-4 h-4" />
              <span>توصية طبية سريرية معتمدة</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              "الجمع بين الكولاجين البحري 2000 دالتون والبيوتين 10,000 مكجم يمثل البروتوكول الذهبي لمقاومة جفاف المناخ الخليجي."
            </h3>

            <p className="text-xs sm:text-sm text-[#E5DFD5] leading-relaxed">
              ما يميز منتجات ناما للجمال هو النقاء المخبري وخلوها التام من السكر المضاف والمواد الحافظة الضارة، واعتمادها على أوزان جزيئية متحللة تضمن امتصاصاً خلوياً حقيقياً، مع مراعاة كافة المعايير الرقابية واللوائح الصحية الخليجية المعتمدة.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0D382A] font-bold flex items-center justify-center font-serif text-sm">
                د.ل
              </div>
              <div>
                <div className="font-bold text-sm text-white">د. ليلى المطيري</div>
                <div className="text-xs text-[#D4AF37]">استشارية تغذية سريرية وصحة البشرة - الكويت</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Comprehensive FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#0D382A] px-3 py-1 rounded-full">
            الأسئلة الشائعة
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D382A] font-arabic">
            كل ما يدور في بالكِ قبل إتمام الطلب
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7C73]">
            إجابات واضحة وشفافة تضمن لكِ راحة البال التامة.
          </p>
        </div>

        <div className="space-y-3">
          {GENERAL_FAQS.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full text-right p-5 font-bold text-[#0D382A] text-sm sm:text-base flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4A5D54] leading-relaxed border-t border-neutral-100 bg-[#FAF8F5]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. The Golden 30-Day Risk-Free Guarantee */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-[#FAF4EB] border-2 border-[#EEDFC6] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#0D382A] text-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#0D382A]">
            الضمان الذهبي لناما للجمال (30 يوماً بلا أي مخاطرة)
          </h3>

          <p className="text-xs sm:text-sm text-[#5D461E] max-w-xl mx-auto leading-relaxed">
            نحن على ثقة مطلقة بجودة تركيباتنا السريرية.. جربي منتجاتنا لمدة 30 يوماً كاملة، وإن لم تلاحظي فرقاً ملموساً في حيوية شعركِ أو نضارة بشرتكِ، تواصلي معنا لاسترجاع كامل أموالكِ دون أي تعقيد.
          </p>

          <div className="pt-2">
            <button
              onClick={onViewCollections}
              className="px-8 py-3.5 rounded-xl bg-[#0D382A] hover:bg-[#134937] text-white font-black text-sm inline-flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span>اختاري باقتكِ الآن واستمتعي بالشحن المجاني</span>
              <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
