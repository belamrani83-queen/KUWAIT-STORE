import React, { useState } from 'react';
import { BookOpen, Copy, Check, FileText, Server, Users, DollarSign, FlaskConical, PenTool, Database } from 'lucide-react';

interface DocItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: string;
}

const DOCS_LIST: DocItem[] = [
  {
    id: '01_architecture',
    title: '01. المعمارية والتقنيات (Architecture & Stack)',
    subtitle: 'Next.js/React + FastAPI + PostgreSQL (namabeauty) + EasyPanel',
    icon: <Server className="w-5 h-5 text-[#D4AF37]" />,
    content: `# المعمارية والتقنيات (01_SYSTEM_ARCHITECTURE_AND_STACK)

- **Frontend:** React 19 / Next.js 14+ مع Tailwind CSS v4 و Motion و Lucide-React.
- **Backend:** Python 3.11+ مع FastAPI غير متزامن (Async) وأداء عالي.
- **Database:** PostgreSQL 16 باسم قاعدة البيانات \`namabeauty\` مثبتة مسبقاً على EasyPanel.
- **Validation:** Pydantic v2 للتحقق الصارم من رقم الجوال السعودي \`^(05|5|\\+9665)[0-9]{8}$\`.
- **EasyPanel Host:** خادم Docker مستقل مع ربط عكسي وشهادة SSL تلقائية.
- **Integration:** Webhook تلقائي إلى Google Sheets فور استلام الطلب مع إرسال تنبيه واتساب للعميلة.`
  },
  {
    id: '02_positioning',
    title: '02. تموضع البراند والعميلة السعودية (Brand Positioning & ICP)',
    subtitle: 'سيكولوجية البيع بسعر مرتفع (199-349 ر.س) لسيدات المملكة (22-45 سنة)',
    icon: <Users className="w-5 h-5 text-[#D4AF37]" />,
    content: `# تموضع البراند والعميلة السعودية (02_BRAND_POSITIONING_AND_SAUDI_ICP)

- **هوية البراند:** ناما للجمال (Nama Beauty) - مشتق من النماء والازدهار والنقاء الطبيعي الفاخر.
- **الألوان:** الزمردي النباتي الملكي (#0D382A) والذهب الشامبين الدافئ (#D4AF37) والحرير الكريمي (#FAF8F5).
- **العميلة المستهدفة:** المرأة السعودية (22 - 45 سنة) في الرياض، جدة، الشرقية، القصيم.
- **المشاكل البيئية المحلية:**
  1. أزمة "موية التحلية" والكلور التي تدمر بصيلات الشعر وتسبب الفراغات والتساقط.
  2. الجفاف الصحراوي ومكيفات الهواء الدائمة التي تسحب رطوبة البشرة وتسبب الخطوط المبكرة.
  3. السهر والتوتر وهرمون الكورتيزول المسبب للهالات السوداء المزمنة وانتفاخ العين.
- **سيكولوجية السعر المرتفع:** "الغالي ثمنه فيه" - السعوديات يتجنبن المنتجات الرخيصة لربطها بالمواد المغشوشة والكورتيزون والزئبق، بينما السعر 199 - 349 ر.س يعكس فئة سريرية راقية مرخصة.`
  },
  {
    id: '03_cro',
    title: '03. عروض الباقات والـ CRO والدفع عند الاستلام (CRO Funnel)',
    subtitle: 'عروض 199/279/349 ر.س وسلة المبيعات المتقاطعة وأبسل 99 ر.س التنازلي',
    icon: <DollarSign className="w-5 h-5 text-[#D4AF37]" />,
    content: `# عروض الباقات والـ CRO والدفع عند الاستلام (03_CRO_PRICING_AND_COD_FUNNEL)

- **هيكل الباقات لكل منتج:**
  * 1 عبوة: 199 ر.س (تجربة سريعة)
  * 2 عبوة: 279 ر.س (الأكثر طلباً ومبيعاً ⭐ - وفر 119 ر.س + شحن مجاني)
  * 3 عبوات: 349 ر.س (كورس الجمال المتكامل 3 أشهر - وفر 248 ر.س + هدية خاصة)
- **السلة الجانبية (Cart Drawer):**
  * تفتح تلقائياً فور ضغط زر الطلب في صفحة المنتج.
  * مؤشر شريط الشحن السريع المجاني المحقق.
  * مبيعات متقاطعة (Cross-Sells) بضغطة زر واحدة لإضافة المنتجات التكميلية.
- **نموذج الدفع السريع بحقلين فقط (2-Field Checkout Modal):**
  * الاسم الكامل + رقم الجوال السعودي (تحقق فوري من صيغة 05XXXXXXXX).
  * خيار المدينة لتوجيه المندوب.
- **نافذة الأبسل التنازلية 15 ثانية بسعر 99 ر.س (The 99 SAR Upsell):**
  * تظهر فور إرسال النموذج وقبل صفحة الشكر، تعرض منتجاً تكميلياً بخصم 50% لرفع الـ AOV بنسبة 40%.`
  },
  {
    id: '04_science',
    title: '04. التركيبات السريرية والإثبات العلمي (Science & Products)',
    subtitle: 'البيوتين 10,000 مكجم، الكولاجين 2000 دالتون، والمغنيسيوم جلايسينات',
    icon: <FlaskConical className="w-5 h-5 text-[#D4AF37]" />,
    content: `# التركيبات السريرية والإثبات العلمي (04_PRODUCTS_FORMULATIONS_AND_SCIENCE_PROOF)

1. **علكات البيوتين ضد تساقط الشعر:**
   - 10,000 مكجم بيوتين نقي + زنك مخلبي 15 ملجم + حمض الفوليك وفيتامينات د3 وهـ.
   - بكتين نباتي 100% خالٍ من الجيلاتين والسكر المضاف، لا يزيد الوزن ولا يؤثر على شعر الجسم.
2. **مشروب الكولاجين البحري ضد التجاعيد:**
   - ببتيدات كولاجين بحري متحلل بوزن جزيئي دقيق 2000 دالتون لامتصاص 95%.
   - حمض الهيالورونيك وفيتامين C وأستازانتين، بنكهة الرمان والخوخ المنعشة بدون أي طعم سمكي.
3. **بودرة المغنيسيوم ضد الهالات والأرق:**
   - مغنيسيوم بيسجليسينات نقي 350 ملجم يعبر الحاجز الدماغي لخفض الكورتيزول ودعم نوم الـ REM.
   - ل-ثيانين ومستخلص البابونج العضوي والكرز الحامض لتصريف انتفاخات ما تحت العين.
- **الشهادات:** مطابق لاشتراطات هيئة الغذاء والدواء SFDA، مصنع في منشآت GMP، فحص مخبري للنقاء، حلال 100%.`
  },
  {
    id: '05_copywriting',
    title: '05. نصوص وكتابة الإعلانات باللهجة السعودية (Copywriting Scripts)',
    subtitle: 'صياغات العناوين والمراجعات الواقعية والرد السريري على الاعتراضات',
    icon: <PenTool className="w-5 h-5 text-[#D4AF37]" />,
    content: `# نصوص وكتابة الإعلانات باللهجة السعودية (05_COPYWRITING_AND_KSA_DIALECT_SCRIPTS)

- **خطافات ألم موية التحلية والجفاف:**
  "تعبتي من خصلات شعرك اللي تطيح في كل شاور وموية التحلية تعدمه؟ اتركي الخلطات والزيوت المؤقتة.. اكتشفي تركيبة ناما السريرية لإنبات الفراغات من الجذور."
- **مراجعات موثقة من بنات السعودية:**
  * سارة العتيبي (الرياض): "بنات أقسم بالله فرق خيالي، البيبي هير نبت والتساقط وقف 85%."
  * ريم الغامدي (جدة): "الكولاجين طعمه رمان لذيذ بدون زنخة سمك، وجهي مليان نضارة زجاجية بدون فاونديشن."
  * نورة الشمري (الدمام): "بودرة المغنيسيوم نوم عميق وخفت الهالات والانتفاخات الصباحية."
- **الرد على الاعتراضات:** هل يزيد شعر الجسم؟ هل يسبب سمنة؟ كيف أعاين قبل الدفع؟ هل مرخص؟`
  },
  {
    id: '06_backend',
    title: '06. كود الباك إند FastAPI و EasyPanel (Backend Code)',
    subtitle: 'كود Python جاهز وقاعدة بيانات namabeauty وتكامل Google Sheets Webhook',
    icon: <Database className="w-5 h-5 text-[#D4AF37]" />,
    content: `# كود الباك إند FastAPI و EasyPanel (06_FASTAPI_BACKEND_AND_EASYPANEL_SETUP)

- ملفات مشروع FastAPI كاملة مع SQLAlchemy AsyncSession و Pydantic و Alembic.
- جدول \`orders\` وجدول \`order_items\` وجدول \`leads_abandoned\` لحفظ بيانات الدفع عند الاستلام.
- كود \`webhook.py\` غير المتزامن لإرسال بيانات الطلب عبر HTTP POST إلى Google Sheets.
- إعداد ملف Dockerfile و docker-compose لنشر المشروع بنقرة واحدة على EasyPanel مع قاعدة بيانات \`namabeauty\`.`
  }
];

export const DocsViewer: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocItem>(DOCS_LIST[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#0D382A] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/40">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold font-english uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Developer & AI Coder Documentation Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-arabic">
              توثيق نظام ناما للجمال الكامل (Docs Folder)
            </h1>
            <p className="text-xs sm:text-sm text-[#E5DFD5]">
              تم إنشاء جميع ملفات Markdown الستة في مجلد <code className="bg-black/30 px-2 py-0.5 rounded font-mono text-[#D4AF37]">/docs/</code> لمساعد الذكاء الاصطناعي والمطورين.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a02e] text-[#0D382A] font-black text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم نسخ الملف!' : 'نسخ هذا الملف (Markdown)'}</span>
          </button>
        </div>

        {/* Layout: Sidebar list + Active Doc content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Docs Navigation Sidebar */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-l border-[#E8E2D8] bg-[#FAF8F5] p-4 space-y-2">
            <div className="text-xs font-bold text-[#6B7C73] uppercase tracking-wider px-2 py-1">
              ملفات التوثيق المتاحة (6 ملفات MD):
            </div>
            {DOCS_LIST.map((doc) => {
              const isActive = selectedDoc.id === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => {
                    setSelectedDoc(doc);
                    setCopied(false);
                  }}
                  className={`w-full text-right p-3.5 rounded-2xl transition-all flex items-start gap-3 ${
                    isActive
                      ? 'bg-[#0D382A] text-white shadow-md'
                      : 'hover:bg-white text-[#0D382A] border border-transparent hover:border-[#E8E2D8]'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isActive ? 'bg-white/10' : 'bg-[#0D382A]/5'}`}>
                    {doc.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs sm:text-sm line-clamp-1 leading-snug">
                      {doc.title}
                    </h4>
                    <p className={`text-[11px] mt-0.5 line-clamp-1 ${isActive ? 'text-[#E5DFD5]' : 'text-[#6B7C73]'}`}>
                      {doc.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Markdown Viewer */}
          <div className="lg:col-span-8 p-6 sm:p-8 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-4 mb-6 border-b border-[#E8E2D8]">
                <FileText className="w-5 h-5 text-[#0D382A]" />
                <h3 className="font-black text-lg text-[#0D382A]">{selectedDoc.title}</h3>
              </div>

              <div className="prose prose-emerald max-w-none text-[#2D3E36] leading-relaxed text-sm whitespace-pre-wrap font-sans">
                {selectedDoc.content}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E8E2D8] flex items-center justify-between text-xs text-[#6B7C73]">
              <span>مسار الملف في المشروع: <code className="font-mono text-[#0D382A]">/docs/{selectedDoc.id.toUpperCase()}.md</code></span>
              <span className="text-[#D4AF37] font-bold">جاهز للاستخدام والتطوير</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
