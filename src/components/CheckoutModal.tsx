import React, { useState } from 'react';
import { X, ShieldCheck, Truck, Lock, CheckCircle2, AlertCircle, Sparkles, Clock, MapPin } from 'lucide-react';
import { CartItem, OrderCustomer } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onSubmitValidCustomer: (customer: OrderCustomer) => void;
}

const KUWAIT_AREAS = [
  'مدينة الكويت (العاصمة)',
  'حولي والسالمية',
  'الجابرية وبيان ومشرف',
  'الفروانية وخيطان والأندلس',
  'الأحمدي والمنقف والفنطاس والعقيلة',
  'مبارك الكبير وصباح السالم والقرين',
  'الجهراء',
  'كيفان والروضة والشامية والدسمة',
  'صباح الأحمد والخيران والوفرة',
  'منطقة أخرى في دولة الكويت'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onSubmitValidCustomer,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('مدينة الكويت (العاصمة)');
  const [addressNotes, setAddressNotes] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.selectedTier.priceSar, 0);

  // Strict Kuwait phone validation helper (8 digits starting with 5, 6, or 9)
  const validateKuwaitPhone = (input: string): boolean => {
    const clean = input.replace(/[\s\-+]/g, '');
    if (/^[569][0-9]{7}$/.test(clean)) return true;
    if (/^965[569][0-9]{7}$/.test(clean)) return true;
    if (/^00965[569][0-9]{7}$/.test(clean)) return true;
    return false;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (val.trim().length > 0) {
      if (!validateKuwaitPhone(val)) {
        setPhoneError('رقم الهاتف الكويتي يتكون من 8 أرقام ويبدأ بـ 5 أو 6 أو 9 (مثال: 99123456 أو 55123456)');
      } else {
        setPhoneError('');
      }
    } else {
      setPhoneError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFullName(val);
    if (val.trim().length > 0 && val.trim().length < 3) {
      setNameError('يرجى كتابة الاسم الثلاثي أو الثنائي الكامل');
    } else {
      setNameError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || fullName.trim().length < 3) {
      setNameError('يرجى كتابة الاسم الكريم بشكل واضح');
      return;
    }

    if (!validateKuwaitPhone(phone)) {
      setPhoneError('يرجى إدخال رقم هاتف كويتي صحيح (8 أرقام يبدأ بـ 5 أو 6 أو 9)');
      return;
    }

    setIsSubmitting(true);

    // Format phone cleanly
    let cleanPhone = phone.replace(/[\s\-+]/g, '');
    if (cleanPhone.startsWith('00965')) {
      cleanPhone = cleanPhone.substring(5);
    } else if (cleanPhone.startsWith('965')) {
      cleanPhone = cleanPhone.substring(3);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitValidCustomer({
        fullName: fullName.trim(),
        phone: cleanPhone,
        city,
        addressNotes: addressNotes.trim(),
      });
    }, 400);
  };

  const isFormValid = fullName.trim().length >= 3 && validateKuwaitPhone(phone);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B2A20]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#FAF8F5] w-full max-w-lg rounded-2xl shadow-2xl border border-[#E8E2D8] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header with Urgency Ticker */}
        <div className="bg-[#0D382A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center font-serif text-lg font-bold text-[#D4AF37]">
              N
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">إتمام الطلب السريع (الدفع عند الاستلام)</h3>
              <p className="text-xs text-[#C5A880] flex items-center gap-1 mt-0.5">
                <Truck className="w-3.5 h-3.5" />
                <span>توصيل سريع مبرد لكافة مناطق الكويت مجاناً</span>
              </p>
            </div>
          </div>
          <button
            id="close-checkout-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Social Proof & Scarcity Banner */}
        <div className="bg-[#FEF7EC] border-b border-[#F5E6CC] px-4 py-2.5 flex items-center justify-between text-xs text-[#8A580C]">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>طلب 24 عميلة من الكويت ومختلف المحافظات هذا المنتج اليوم!</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold bg-white/80 px-2 py-0.5 rounded-full border border-[#E6D4B8]">
            <Clock className="w-3 h-3" />
            <span>متبقي 5 حصص</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Order Summary Box */}
          <div className="bg-white p-4 rounded-xl border border-[#E8E2D8] space-y-2.5 shadow-2xs">
            <div className="text-xs font-bold text-[#6B7C73] uppercase tracking-wider">
              ملخص طلبكِ المباشر:
            </div>
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0D382A]" />
                  <span className="font-bold text-[#0D382A]">{item.product.title}</span>
                  <span className="text-neutral-500 text-xs">({item.selectedTier.label})</span>
                </div>
                <span className="font-black text-[#0D382A]">{item.selectedTier.priceSar} د.ك</span>
              </div>
            ))}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-[#4A5D54]">رسوم الشحن والتوصيل (داخل الكويت):</span>
              <span className="font-bold text-emerald-700">مجاناً بالكامل 🇰🇼</span>
            </div>
            <div className="flex items-center justify-between text-base font-black text-[#0D382A] pt-1">
              <span>المبلغ الإجمالي المطلوب عند الاستلام:</span>
              <span className="text-xl text-[#0D382A]">{subtotal} د.ك</span>
            </div>
          </div>

          {/* High Conversion 2-Field Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field 1: Name */}
            <div>
              <label htmlFor="customer-name-input" className="block text-xs sm:text-sm font-bold text-[#0D382A] mb-1.5">
                الاسم الكريم (الاسم الكامل) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="customer-name-input"
                  type="text"
                  required
                  value={fullName}
                  onChange={handleNameChange}
                  placeholder="مثال: مريم خالد المطيري"
                  className={`w-full px-4 py-3 text-sm rounded-xl border ${
                    nameError ? 'border-red-400 bg-red-50/20' : 'border-[#D0C8BC] bg-white'
                  } focus:outline-hidden focus:border-[#0D382A] focus:ring-2 focus:ring-[#0D382A]/20 transition-all`}
                />
                {fullName.trim().length >= 3 && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                )}
              </div>
              {nameError && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{nameError}</span>
                </p>
              )}
            </div>

            {/* Field 2: Kuwait Mobile Phone (Strict Validation) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="customer-phone-input" className="block text-xs sm:text-sm font-bold text-[#0D382A]">
                  رقم الهاتف للتوصيل <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-[#C5A880] font-semibold">
                  سيتواصل معكِ المندوب قبل التسليم
                </span>
              </div>
              <div className="relative flex items-center">
                <div className="absolute right-3 top-3.5 text-xs font-bold text-neutral-500 pointer-events-none flex items-center gap-1" dir="ltr">
                  <span>+965</span>
                  <span>🇰🇼</span>
                </div>
                <input
                  id="customer-phone-input"
                  type="tel"
                  dir="ltr"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="99123456 أو 55123456"
                  className={`w-full pr-20 pl-10 py-3 text-sm font-mono rounded-xl border ${
                    phoneError ? 'border-red-400 bg-red-50/20' : 'border-[#D0C8BC] bg-white'
                  } focus:outline-hidden focus:border-[#0D382A] focus:ring-2 focus:ring-[#0D382A]/20 transition-all`}
                />
                {validateKuwaitPhone(phone) && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                )}
              </div>
              {phoneError ? (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{phoneError}</span>
                </p>
              ) : (
                <p className="text-[11px] text-neutral-500 mt-1">
                  أدخلي رقمكِ الكويتي (يتكون من 8 أرقام يبدأ بـ 5 أو 6 أو 9).
                </p>
              )}
            </div>

            {/* Area / Governorate Selector */}
            <div>
              <label htmlFor="customer-city-select" className="block text-xs sm:text-sm font-bold text-[#0D382A] mb-1.5">
                المنطقة / المحافظة <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="customer-city-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#D0C8BC] bg-white focus:outline-hidden focus:border-[#0D382A] focus:ring-2 focus:ring-[#0D382A]/20 transition-all appearance-none cursor-pointer"
                >
                  {KUWAIT_AREAS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Optional Address note */}
            <div>
              <label htmlFor="customer-address-input" className="block text-xs font-semibold text-[#4A5D54] mb-1">
                القطعة / الشارع / تفاصيل العنوان (اختياري)
              </label>
              <input
                id="customer-address-input"
                type="text"
                value={addressNotes}
                onChange={(e) => setAddressNotes(e.target.value)}
                placeholder="مثال: قطعة 2، شارع 15، منزل 4"
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C8BC] bg-white focus:outline-hidden focus:border-[#0D382A]"
              />
            </div>

            {/* COD Trust Note */}
            <div className="bg-[#0D382A]/5 p-3 rounded-xl border border-[#0D382A]/10 text-xs text-[#0D382A] space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>طلبكِ آمن 100% - لا نطلب أي بيانات بنكية أو بطاقات</span>
              </div>
              <p className="text-[11px] text-[#4A5D54] leading-relaxed">
                ستقومين بالدفع نقداً لمندوب التوصيل بعد استلام الطرد وفحصه عند باب المنزل.
              </p>
            </div>

            {/* Submit CTA */}
            <button
              id="checkout-form-submit-btn"
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`w-full py-4 rounded-xl font-black text-base flex items-center justify-center gap-2 shadow-lg transition-all ${
                isFormValid && !isSubmitting
                  ? 'bg-linear-to-r from-[#0D382A] to-[#16503D] hover:from-[#134937] hover:to-[#1b5f49] text-white cursor-pointer active:scale-[0.98]'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>تأكيد الطلب الآن (الدفع عند الاستلام)</span>
                  <Truck className="w-5 h-5 text-[#D4AF37]" />
                </>
              )}
            </button>
          </form>

          {/* Guarantee Footer */}
          <div className="flex items-center justify-center gap-3 text-xs text-[#6B7C73] pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              ضمان ذهبي 30 يوماً
            </span>
            <span>•</span>
            <span>مطابق للاشتراطات والمعايير الكويتية والخليجية</span>
          </div>
        </div>
      </div>
    </div>
  );
};
