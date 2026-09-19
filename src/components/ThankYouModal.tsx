import React, { useState } from 'react';
import { CheckCircle2, Truck, MessageCircle, Copy, Check, FileJson, ArrowRight, ShieldCheck } from 'lucide-react';
import { Order } from '../types';

interface ThankYouModalProps {
  order: Order;
  onClose: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({ order, onClose }) => {
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [showJsonDetails, setShowJsonDetails] = useState(false);

  // Webhook JSON payload matching Kuwait schema
  const webhookPayload = {
    order_code: order.orderCode,
    created_at: order.createdAt,
    customer_name: order.customer.fullName,
    phone: order.customer.phone,
    country: 'الكويت (Kuwait)',
    city: order.customer.city,
    address_notes: order.customer.addressNotes || 'لم يحدد',
    items: order.items.map((i) => ({
      product: i.product.title,
      tier: i.selectedTier.label,
      price_kwd: i.selectedTier.priceSar,
    })),
    has_upsell: order.hasUpsell,
    upsell_item: order.upsellProduct
      ? `${order.upsellProduct.title} (عرض خاص بـ ${order.upsellPriceSar} د.ك)`
      : null,
    total_kwd: order.totalSar,
    currency: 'KWD',
    payment_method: 'الدفع عند الاستلام (COD)',
    status: 'جديد - بانتظار تأكيد الاتصال والشحن',
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(webhookPayload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `يا هلا بكِ في ناما للجمال 🌸\nأرغب بتأكيد طلبي رقم #${order.orderCode} باسم ${order.customer.fullName} بمدينة/منطقة ${order.customer.city}.\nالمبلغ الإجمالي المطلوب عند الاستلام: ${order.totalSar} د.ك.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B2A20]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#FAF8F5] w-full max-w-xl rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-[#0D382A] text-white p-6 text-center relative">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" />
          </div>

          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-english">
            ORDER CONFIRMED • تم تأكيد طلبكِ بنجاح
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            شكراً لثقتكِ يا {order.customer.fullName} 🌸
          </h2>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#E5DFD5]">
            <span>رقم الطلب:</span>
            <span className="font-bold text-[#D4AF37]">#{order.orderCode}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Delivery & COD Promise */}
          <div className="bg-[#E9F4EE] p-4 rounded-2xl border border-[#C5E2D2] flex gap-3.5 items-start">
            <Truck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-[#1E4D38] space-y-1">
              <div className="font-extrabold text-sm text-[#0D382A]">
                شحنتكِ تُجهز الآن في مستودعنا الرئيسي في الكويت!
              </div>
              <p className="leading-relaxed">
                سيتواصل معكِ مندوب التوصيل في <strong>{order.customer.city}</strong> هاتفياً أو عبر واتساب لتسليم الطرد لباب بيتك خلال <strong>24 إلى 48 ساعة</strong>.
              </p>
              <div className="text-[11px] font-bold text-[#0D382A] pt-1">
                الدفع نقداً عند الاستلام: {order.totalSar} د.ك فقط (لا توجد أي رسوم إضافية).
              </div>
            </div>
          </div>

          {/* Order Breakdown Box */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8E2D8] space-y-3">
            <div className="text-xs font-bold text-[#6B7C73] border-b border-neutral-100 pb-2 flex justify-between">
              <span>تفاصيل المنتجات المحجوزة:</span>
              <span>رقم الهاتف: {order.customer.phone}</span>
            </div>

            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-[#0D382A]">{item.product.title}</span>
                    <span className="text-neutral-500 text-xs block sm:inline sm:mr-2">
                      ({item.selectedTier.label})
                    </span>
                  </div>
                  <span className="font-bold text-[#0D382A] shrink-0">
                    {item.selectedTier.priceSar} د.ك
                  </span>
                </div>
              ))}

              {order.hasUpsell && order.upsellProduct && (
                <div className="flex justify-between items-center text-xs sm:text-sm bg-[#FAF4EB] p-2 rounded-lg border border-[#EEDFC6]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-[#D4AF37] text-[#0D382A] px-1.5 py-0.5 rounded-sm font-bold">
                      عرض الفرصة الأخيرة
                    </span>
                    <span className="font-bold text-[#0D382A]">{order.upsellProduct.title}</span>
                  </div>
                  <span className="font-bold text-emerald-700 shrink-0">
                    + {order.upsellPriceSar} د.ك
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-100 space-y-1 text-xs">
              <div className="flex justify-between text-[#4A5D54]">
                <span>الشحن والتوصيل المبرد لكافة مناطق الكويت:</span>
                <span className="font-bold text-emerald-700">مجاناً بالكامل 🇰🇼</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#0D382A] pt-1">
                <span>المبلغ المطلوب تسليمه للمندوب:</span>
                <span className="text-xl text-[#0D382A]">{order.totalSar} د.ك</span>
              </div>
            </div>
          </div>

          {/* Real-time Webhook Dispatch Status for Sheets */}
          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#DCD5C9] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#0D382A]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>حالة مزامنة الطلب مع جدول العمليات (Google Sheets Webhook):</span>
              </div>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                تم الإرسال بنجاح ✓
              </span>
            </div>

            <p className="text-[11px] text-[#6B7C73] leading-relaxed">
              تم إرسال كامل بيانات العميلة ورقم الهاتف الكويتي والمنطقة وتفاصيل الباقة والأبسل كـ Webhook Payload مباشر لفريق العمليات والتوصيل.
            </p>

            <button
              onClick={() => setShowJsonDetails(!showJsonDetails)}
              className="text-xs font-bold text-[#8C6D23] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>{showJsonDetails ? 'إخفاء كود الـ Webhook Payload' : 'عرض كود الـ Webhook Payload المرسل'}</span>
            </button>

            {showJsonDetails && (
              <div className="mt-2 bg-[#1A2621] text-emerald-400 p-3 rounded-xl font-mono text-[11px] relative overflow-x-auto border border-[#2D3E36]">
                <button
                  onClick={handleCopyJson}
                  className="absolute top-2 left-2 bg-white/10 hover:bg-white/20 text-white p-1 rounded-md text-[10px] flex items-center gap-1"
                >
                  {copiedPayload ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPayload ? 'تم النسخ' : 'نسخ JSON'}</span>
                </button>
                <pre dir="ltr">{JSON.stringify(webhookPayload, null, 2)}</pre>
              </div>
            )}
          </div>

          {/* WhatsApp Direct Action Button */}
          <div className="space-y-2">
            <a
              href={`https://wa.me/96599412345?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تأكيد موعد التوصيل الفوري عبر واتساب</span>
            </a>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#0D382A] text-white font-bold text-sm hover:bg-[#134937] flex items-center justify-center gap-1 transition-colors"
            >
              <span>العودة للمتجر ومتابعة التصفح</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          <div className="text-center text-[11px] text-[#6B7C73] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>طلبكِ محمي بالضمان الذهبي لمدة 30 يوماً من تاريخ الاستلام</span>
          </div>
        </div>
      </div>
    </div>
  );
};
