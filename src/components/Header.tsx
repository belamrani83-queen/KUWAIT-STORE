import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeTab: string;
  onSelectTab: (tab: string, productId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  activeTab,
  onSelectTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string, productId?: string) => {
    onSelectTab(tab, productId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] shadow-xs">
      {/* Top Announcement Bar for Kuwait Urgency & Authority */}
      <div className="bg-[#0D382A] text-[#FAF8F5] text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0 font-medium tracking-wide">
            <span className="inline-block animate-pulse">🇰🇼</span>
            <span>شحن سريع مبرد لكافة مناطق الكويت | الدفع نقداً عند الاستلام | ضمان ذهبي 30 يوماً</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-[#E6C280]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              مطابق لاشتراطات وزارة الصحة والمعايير الخليجية
            </span>
            <span className="text-[#FAF8F5]/40">|</span>
            <span>توصيل خلال 24 ساعة لباب بيتك</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Right Side: Brand Logo (Circle 'N' + Bilingual Typography) */}
        <div 
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Circular Luxury Monogram */}
          <div className="w-12 h-12 rounded-full bg-[#0D382A] border-2 border-[#D4AF37] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
            <span className="font-serif text-2xl font-bold text-[#D4AF37] tracking-wider leading-none">
              N
            </span>
          </div>

          {/* Bilingual Brand Typography */}
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-[#0D382A] tracking-tight font-arabic leading-tight">
              ناما للجمال
            </span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880] font-english -mt-0.5">
              Nama Beauty
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            id="nav-home-btn"
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === 'home'
                ? 'text-[#0D382A] bg-[#0D382A]/10 font-bold'
                : 'text-[#4A5D54] hover:text-[#0D382A] hover:bg-[#0D382A]/5'
            }`}
          >
            الرئيسية
          </button>

          <button
            id="nav-collections-btn"
            onClick={() => handleNavClick('collections')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === 'collections'
                ? 'text-[#0D382A] bg-[#0D382A]/10 font-bold'
                : 'text-[#4A5D54] hover:text-[#0D382A] hover:bg-[#0D382A]/5'
            }`}
          >
            المجموعات
          </button>

          <button
            id="nav-biotin-btn"
            onClick={() => handleNavClick('product', 'biotin-hair-gummies')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === 'product'
                ? 'text-[#0D382A] bg-[#0D382A]/10'
                : 'text-[#4A5D54] hover:text-[#0D382A] hover:bg-[#0D382A]/5'
            }`}
          >
            علكات البيوتين
          </button>

          <button
            id="nav-collagen-btn"
            onClick={() => handleNavClick('product', 'marine-collagen-elixir')}
            className="px-3 py-2 text-sm font-semibold text-[#4A5D54] hover:text-[#0D382A] hover:bg-[#0D382A]/5 rounded-lg transition-colors"
          >
            الكولاجين البحري
          </button>

          <button
            id="nav-magnesium-btn"
            onClick={() => handleNavClick('product', 'magnesium-glow-powder')}
            className="px-3 py-2 text-sm font-semibold text-[#4A5D54] hover:text-[#0D382A] hover:bg-[#0D382A]/5 rounded-lg transition-colors"
          >
            بودرة المغنيسيوم
          </button>

          <button
            id="nav-about-btn"
            onClick={() => handleNavClick('about')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === 'about'
                ? 'text-[#0D382A] bg-[#0D382A]/10 font-bold'
                : 'text-[#4A5D54] hover:text-[#0D382A] hover:bg-[#0D382A]/5'
            }`}
          >
            عن ناما
          </button>

          <button
            id="nav-contact-btn"
            onClick={() => handleNavClick('contact')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === 'contact'
                ? 'text-[#0D382A] bg-[#0D382A]/10 font-bold'
                : 'text-[#4A5D54] hover:text-[#0D382A] hover:bg-[#0D382A]/5'
            }`}
          >
            تواصل معنا
          </button>

          {/* Dev Docs Tab requested by user */}
          <button
            id="nav-docs-btn"
            onClick={() => handleNavClick('docs')}
            className={`px-3 py-2 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 ${
              activeTab === 'docs'
                ? 'bg-[#D4AF37] text-[#0D382A] border-[#D4AF37] shadow-xs'
                : 'border-[#D4AF37]/50 text-[#8C6D23] hover:bg-[#D4AF37]/10'
            }`}
            title="التوثيق البرمجي والمعماري للمتجر والذكاء الاصطناعي"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>توثيق المطورين (Docs)</span>
          </button>
        </nav>

        {/* Left Side: Cart Drawer Trigger & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            id="open-cart-drawer-btn"
            onClick={onOpenCart}
            aria-label="سلة المشتريات"
            className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0D382A] text-[#FAF8F5] hover:bg-[#134937] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <span className="hidden sm:inline text-xs font-bold font-arabic">سلة المشتريات</span>
            {cartCount > 0 ? (
              <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#0D382A] text-xs font-black flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            ) : (
              <span className="text-xs text-[#FAF8F5]/80 font-mono">0</span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0D382A] hover:bg-[#0D382A]/5 focus:outline-none"
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E2D8] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 p-2 bg-[#0D382A]/5 rounded-lg text-xs font-semibold text-[#0D382A]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>منتجات ناما الأصلية - الدفع عند الاستلام في السعودية</span>
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-right px-3 py-2.5 rounded-lg text-sm font-bold text-[#0D382A] hover:bg-[#0D382A]/10 block"
          >
            الرئيسية
          </button>
          <button
            onClick={() => handleNavClick('collections')}
            className="w-full text-right px-3 py-2.5 rounded-lg text-sm font-semibold text-[#374940] hover:bg-[#0D382A]/10 block"
          >
            المجموعات والمنتجات
          </button>
          <div className="pr-3 pl-2 py-1 space-y-1 border-r-2 border-[#D4AF37]">
            <button
              onClick={() => handleNavClick('product', 'biotin-hair-gummies')}
              className="w-full text-right py-2 text-xs font-medium text-[#4A5D54] hover:text-[#0D382A] block"
            >
              • علكات البيوتين ضد تساقط الشعر
            </button>
            <button
              onClick={() => handleNavClick('product', 'marine-collagen-elixir')}
              className="w-full text-right py-2 text-xs font-medium text-[#4A5D54] hover:text-[#0D382A] block"
            >
              • مشروب الكولاجين البحري ضد التجاعيد
            </button>
            <button
              onClick={() => handleNavClick('product', 'magnesium-glow-powder')}
              className="w-full text-right py-2 text-xs font-medium text-[#4A5D54] hover:text-[#0D382A] block"
            >
              • بودرة المغنيسيوم ضد الهالات والأرق
            </button>
          </div>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-right px-3 py-2.5 rounded-lg text-sm font-semibold text-[#374940] hover:bg-[#0D382A]/10 block"
          >
            عن ناما للجمال
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-right px-3 py-2.5 rounded-lg text-sm font-semibold text-[#374940] hover:bg-[#0D382A]/10 block"
          >
            تواصل معنا وخدمة العملاء
          </button>
          <button
            onClick={() => handleNavClick('docs')}
            className="w-full text-right px-3 py-2.5 rounded-lg text-sm font-bold text-[#8C6D23] bg-[#D4AF37]/15 flex items-center justify-between"
          >
            <span>ملفات توثيق المطورين (Docs)</span>
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
