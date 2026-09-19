import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    topic: 'استشارة حول المنتجات والباقات',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#0D382A] px-3 py-1 rounded-full">
          خدمة عميلات ناما للجمال
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0D382A] font-arabic">
          تواصلِ معنا.. نحن دائماً في خدمتكِ 🌸
        </h1>
        <p className="text-xs sm:text-sm text-[#4A5D54]">
          فريق خبيرات التغذية السريرية والعناية بالشعر والبشرة مستعد للإجابة عن كافة استفساراتكِ.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Card (Right Column in RTL) */}
        <div className="lg:col-span-5 bg-[#0D382A] text-white p-8 rounded-3xl space-y-6 shadow-xl border border-[#D4AF37]/30 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">قنوات التواصل المباشرة</h3>
              <p className="text-xs text-[#E5DFD5] leading-relaxed">
                سواء كان لديكِ استفسار طبي حول الجرعات المناسبة أو رغبتِ في متابعة شحنتكِ، نحن هنا لمساعدتكِ.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <div className="font-bold text-white">المكتب الرئيسي والمستودعات</div>
                  <div className="text-[#C5BDB2] mt-0.5">دولة الكويت - مدينة الكويت، شرق، برج الراية</div>
                  <div className="text-[10px] text-[#D4AF37] mt-1">مستودع مركزي للتوزيع السريع في الشويخ لجميع مناطق الكويت</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <div className="font-bold text-white">الهاتف وخدمة الاتصال</div>
                  <div className="text-[#C5BDB2] mt-0.5" dir="ltr">+965 9123 4567</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <div className="font-bold text-white">البريد الإلكتروني للعميلات</div>
                  <div className="text-[#C5BDB2] mt-0.5">care@namabeauty.com</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <div className="font-bold text-white">ساعات العمل وخدمة العملاء</div>
                  <div className="text-[#C5BDB2] mt-0.5">يومياً من 9:00 صباحاً حتى 11:00 مساءً بتوقيت الكويت</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <a
              href="https://wa.me/96591234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D9%86%D8%A7%D9%85%D8%A7%20%D9%84%D9%84%D8%AC%D9%85%D8%A7%D9%84%D8%8C%20%D8%B9%D9%86%D8%AF%D9%8A%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%AD%D9%88%D9%84%20%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>محادثة واتساب فورية مع خبيرة التغذية</span>
            </a>
          </div>
        </div>

        {/* Contact Form (Left Column in RTL) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#0D382A]">أرسلي لنا استفساركِ</h3>
            <p className="text-xs text-[#6B7C73]">
              سيقوم فريقنا الطبي المتخصص بالتواصل معكِ خلال أقل من ساعتين.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#E9F4EE] border border-[#C5E2D2] text-center space-y-3 animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h4 className="font-bold text-lg text-[#0D382A]">تم استلام رسالتكِ بنجاح!</h4>
              <p className="text-xs text-[#4A5D54] leading-relaxed max-w-sm mx-auto">
                شكراً لتواصلكِ يا {formData.name || 'غالية'}. ستقوم إحدى أخصائيات ناما بالتواصل معكِ هاتفياً أو عبر واتساب قريباً جداً.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-[#0D382A] underline"
              >
                إرسال استفسار آخر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0D382A] mb-1">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: دلال العتيبي"
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#D0C8BC] bg-white focus:outline-hidden focus:border-[#0D382A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D382A] mb-1">
                  رقم الجوال للتواصل <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9XXXXXXX أو 6XXXXXXX"
                  className="w-full px-4 py-3 text-xs sm:text-sm font-mono text-right rounded-xl border border-[#D0C8BC] bg-white focus:outline-hidden focus:border-[#0D382A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D382A] mb-1">
                  موضوع الاستفسار
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#D0C8BC] bg-white focus:outline-hidden focus:border-[#0D382A]"
                >
                  <option value="استشارة حول المنتجات والباقات">استشارة حول اختيار الباقة المناسبة لي</option>
                  <option value="سؤال حول طريقة الاستخدام والجرعات">سؤال حول طريقة الاستخدام والجرعات</option>
                  <option value="متابعة طلب تم شحنه">متابعة شحنة طلبي (الدفع عند الاستلام)</option>
                  <option value="استفسار طبي آخر">استفسار طبي أو صيدلاني آخر</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D382A] mb-1">
                  نص الرسالة أو الاستفسار <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتبي لنا هنا أي سؤال عن شعرك، بشرتك، أو تفاصيل التوصيل..."
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#D0C8BC] bg-white focus:outline-hidden focus:border-[#0D382A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0D382A] hover:bg-[#134937] text-white font-black text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                إرسال الاستفسار الآن
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 text-xs text-[#6B7C73] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>بياناتكِ في سرية وأمان تام وفق سياسات حماية البيانات</span>
          </div>
        </div>
      </div>
    </div>
  );
};
