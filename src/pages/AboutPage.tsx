import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onViewCollections: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onViewCollections }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Hero Brand Header */}
      <div className="bg-[#0D382A] text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden border border-[#D4AF37]/30 shadow-xl space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-inner">
          <span className="font-serif text-3xl font-bold text-[#D4AF37]">N</span>
        </div>
        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-english">
          THE STORY OF NAMA BEAUTY
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-arabic">
          قصة ناما للجمال: النماء، النقاء، والعلم السريري
        </h1>
        <p className="text-sm sm:text-base text-[#E5DFD5] max-w-2xl mx-auto leading-relaxed">
          انطلقت ناما للجمال لتقديم مكملات جمال سريرية حقيقية تتصدى للتحديات البيئية القاسية التي تواجهها المرأة في الكويت والخليج كل يوم.
        </p>
      </div>

      {/* Brand Mission & Local Problem */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D8] shadow-sm space-y-6 text-right">
        <div className="space-y-3">
          <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">
            فلسفتنا التأسيسية
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D382A] font-arabic">
            لماذا ترفض ناما للجمال "الخلطات العشوائية" والحلول التجارية الرخيصة؟
          </h2>
          <p className="text-sm text-[#4A5D54] leading-relaxed">
            لسنوات طويلة، عانت المرأة في مجتمعنا من تساقط الشعر وبهتان البشرة نتيجة عوامل بيئية لا مفر منها: كلور وأملاح مياه التحلية المنزلية، الجفاف الشديد لمناخنا، التكييف المستمر، وضغوط المسؤوليات اليومية.
          </p>
          <p className="text-sm text-[#4A5D54] leading-relaxed">
            وكانت الإجابة السائدة هي شراء زيوت ثقيلة تسد المسام، أو كريمات سطحية لا تتجاوز الطبقة الميتة من الجلد، أو مكملات مجهولة المصدر تباع بأسعار رخيصة وتحمل مخاطر صحية مجهولة.
          </p>
        </div>

        <div className="bg-[#FAF4EB] p-6 rounded-2xl border border-[#EEDFC6] space-y-3">
          <h3 className="font-bold text-base text-[#0D382A] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span>معيار ناما السريري المعتمد</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#5D461E] leading-relaxed">
            في ناما، نؤمن بأن جمال الشعر والبشرة يُبنى من أعماق الخلية. نستخدم فقط مكونات ذات أوزان جزيئية فائقة الامتصاص (مثل الكولاجين البحري 2000 دالتون، والبيوتين المركز بـ 10,000 مكجم، ومغنيسيوم بيسجليسينات النقي)، مع الالتزام التام بكافة الاشتراطات والمواصفات الخليجية المعتمدة.
          </p>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-2xs space-y-3">
          <ShieldCheck className="w-8 h-8 text-[#0D382A]" />
          <h4 className="font-bold text-base text-[#0D382A]">أمان دوائي مطابق للمواصفات والاشتراطات الصحية</h4>
          <p className="text-xs text-[#6B7C73] leading-relaxed">
            جميع تركيباتنا ومرافق تصنيعنا تخضع لرقابة صارمة وخالية تماماً من المواد المحظورة أو السكر المضاف أو الهرمونات.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-2xs space-y-3">
          <Award className="w-8 h-8 text-[#0D382A]" />
          <h4 className="font-bold text-base text-[#0D382A]">نقاء سريري معتمد مخبرياً</h4>
          <p className="text-xs text-[#6B7C73] leading-relaxed">
            فحوصات معملية دورية لكل دفعة للتأكد من خلوها من المعادن الثقيلة ومطابقتها لأعلى معايير التصنيع الجيد (GMP).
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-2xs space-y-3">
          <HeartHandshake className="w-8 h-8 text-[#0D382A]" />
          <h4 className="font-bold text-base text-[#0D382A]">ثقة الدفع عند الاستلام والمعاينة</h4>
          <p className="text-xs text-[#6B7C73] leading-relaxed">
            نحن نحترم خصوصيتك وأمانك المالي: اطلبي وادفعي نقداً فقط عندما يصل المندوب لباب بيتك وتتفقدين شحنتك.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-2xs space-y-3">
          <Sparkles className="w-8 h-8 text-[#0D382A]" />
          <h4 className="font-bold text-base text-[#0D382A]">الضمان الذهبي 30 يوماً</h4>
          <p className="text-xs text-[#6B7C73] leading-relaxed">
            إذا لم تلحظي نتائج حقيقية بعد 30 يوماً من الاستخدام، نسترجع كامل أموالكِ بكل احترام وسرور.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E8E2D8] text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-[#0D382A]">
          جاهزة لتجربة الفرق السريري مع ناما للجمال؟
        </h3>
        <p className="text-xs sm:text-sm text-[#4A5D54]">
          شحن سريع مبرد مجاناً لكافة مناطق ومحافظات الكويت مع جميع باقات التوفير.
        </p>
        <button
          onClick={onViewCollections}
          className="px-8 py-4 rounded-xl bg-[#0D382A] hover:bg-[#134937] text-white font-black text-sm inline-flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span>تصفحي المنتجات والباقات الحصرية</span>
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
};
