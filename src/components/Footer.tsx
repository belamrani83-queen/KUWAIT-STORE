import React from 'react';
import { ShieldCheck, Truck, Banknote, Award, Phone, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string, productId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#0B2A20] text-[#E8E2D8] border-t border-[#1C4D3D] pt-16 pb-12">
      {/* Top 4 Trust Pillars Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-12 border-b border-[#1C4D3D]/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0D382A]/40 border border-[#1C4D3D]">
            <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <Banknote className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">الدفع عند الاستلام</h4>
              <p className="text-xs text-[#C5BDB2] mt-1 leading-relaxed">
                عايني وتأكدي من طلبكِ أولاً، ثم ادفعي نقداً للمندوب عند باب بيتك.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0D382A]/40 border border-[#1C4D3D]">
            <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">شحن سريع ومبرد</h4>
              <p className="text-xs text-[#C5BDB2] mt-1 leading-relaxed">
                توصيل خلال 24 - 48 ساعة لباب بيتكِ في كافة مناطق ومحافظات الكويت.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0D382A]/40 border border-[#1C4D3D]">
            <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">مطابق للمعايير الكويتية والخليجية</h4>
              <p className="text-xs text-[#C5BDB2] mt-1 leading-relaxed">
                معايير واشتراطات وزارة الصحة ومنشآت GMP العالمية.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0D382A]/40 border border-[#1C4D3D]">
            <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">ضمان ذهبي 30 يوماً</h4>
              <p className="text-xs text-[#C5BDB2] mt-1 leading-relaxed">
                ثقة مطلقة في جودة منتجاتنا.. استرداد كامل للمبلغ إن لم تلحظي نتيجة.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#0D382A] border-2 border-[#D4AF37] flex items-center justify-center shadow-md">
              <span className="font-serif text-xl font-bold text-[#D4AF37] leading-none">N</span>
            </div>
            <div>
              <div className="text-2xl font-black text-white font-arabic">ناما للجمال</div>
              <div className="text-xs font-semibold tracking-widest text-[#D4AF37] font-english">NAMA BEAUTY KUWAIT</div>
            </div>
          </div>

          <p className="text-sm text-[#C5BDB2] leading-relaxed max-w-md">
            العلامة الفاخرة لمكملات الجمال السريرية المبتكرة في دولة الكويت. ندمج بين نقاء الطبيعة وأحدث الدراسات المعملية لنقدم حلولاً جذرية لتساقط الشعر، بهتان البشرة، وجفاف المناخ ومياه التحلية.
          </p>

          <div className="pt-2 text-xs text-[#D4AF37] flex items-center gap-2">
            <span>🇰🇼 براند موثق في الكويت - توصيل سريع لباب بيتك</span>
          </div>
        </div>

        {/* Hero Products */}
        <div className="space-y-3">
          <h5 className="font-bold text-white text-base border-r-2 border-[#D4AF37] pr-2">منتجاتنا الحصرية</h5>
          <ul className="space-y-2 text-sm text-[#C5BDB2]">
            <li>
              <button
                onClick={() => onSelectTab('product', 'biotin-hair-gummies')}
                className="hover:text-[#D4AF37] transition-colors text-right"
              >
                علكات البيوتين ضد تساقط الشعر
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('product', 'marine-collagen-elixir')}
                className="hover:text-[#D4AF37] transition-colors text-right"
              >
                مشروب الكولاجين البحري المركز
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('product', 'magnesium-glow-powder')}
                className="hover:text-[#D4AF37] transition-colors text-right"
              >
                بودرة المغنيسيوم ضد الهالات والأرق
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('collections')}
                className="hover:text-[#D4AF37] transition-colors text-right"
              >
                تصفح كافة الباقات والعروض
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h5 className="font-bold text-white text-base border-r-2 border-[#D4AF37] pr-2">روابط مهمة</h5>
          <ul className="space-y-2 text-sm text-[#C5BDB2]">
            <li>
              <button onClick={() => onSelectTab('about')} className="hover:text-[#D4AF37] transition-colors">
                عن ناما للجمال وقصتنا
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('contact')} className="hover:text-[#D4AF37] transition-colors">
                خدمة العملاء والاستفسارات
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('docs')} className="hover:text-[#D4AF37] transition-colors">
                توثيق النظام والمطورين (Docs)
              </button>
            </li>
            <li className="text-xs text-[#8BA49B]">
              سياسة الشحن والدفع عند الاستلام
            </li>
            <li className="text-xs text-[#8BA49B]">
              الضمان الذهبي للاسترجاع (30 يوماً)
            </li>
          </ul>
        </div>

        {/* Direct Contact in Kuwait */}
        <div className="space-y-3">
          <h5 className="font-bold text-white text-base border-r-2 border-[#D4AF37] pr-2">تواصلي معنا</h5>
          <div className="space-y-2.5 text-xs text-[#C5BDB2]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>دولة الكويت، العاصمة - شرق، برج الحمراء</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span dir="ltr">+965 99 412 345</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>care@namabeauty.com</span>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/96599412345?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D9%86%D8%A7%D9%85%D8%A7%20%D9%84%D9%84%D8%AC%D9%85%D8%A7%D9%84%D8%8C%20%D8%B9%D9%86%D8%AF%D9%8A%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:bg-[#20bd5a] transition-all shadow-xs"
              >
                <span>تحدثي مع خبيرة التغذية عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-[#1C4D3D]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8BA49B] gap-4">
        <div>
          © {new Date().getFullYear()} ناما للجمال (Nama Beauty Kuwait). جميع الحقوق محفوظة لعلامة ناما التجارية.
        </div>
        <div className="flex items-center gap-2">
          <span>صُمم بعناية للمرأة في الكويت</span>
          <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
        </div>
      </div>
    </footer>
  );
};
