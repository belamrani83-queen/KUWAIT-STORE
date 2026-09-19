import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, CheckCircle2, XCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Product } from '../types';

interface UpsellModalProps {
  isOpen: boolean;
  upsellProduct: Product;
  onAcceptUpsell: () => void;
  onSkipUpsell: () => void;
}

export const UpsellModal: React.FC<UpsellModalProps> = ({
  isOpen,
  upsellProduct,
  onAcceptUpsell,
  onSkipUpsell,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(15);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(15);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  // Percentage for progress bar
  const progressPercent = (secondsLeft / 15) * 100;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B2A20]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#FAF8F5] w-full max-w-lg rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Urgency Header */}
        <div className="bg-[#0D382A] text-white p-4 sm:p-5 text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>عرض حصري لمرة واحدة قبل شحن طلبكِ!</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            انتظري لحظة يا غالية! لا تفوتي هذا العرض الاستثنائي ⏳
          </h2>
          <p className="text-xs text-[#E5DFD5] mt-1">
            هذا هو المكان الوحيد الذي نخفض فيه منتجاً سريرياً لـ 8 د.ك فقط!
          </p>

          {/* 15-Second Animated Timer Bar */}
          <div className="mt-4 bg-black/40 rounded-xl p-2.5 border border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37]">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>ينتهي العرض الاستثنائي خلال:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black text-white bg-[#0D382A] px-2.5 py-0.5 rounded-md border border-[#D4AF37]">
                00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
              </span>
              <span className="text-xs text-neutral-300">ثانية</span>
            </div>
          </div>

          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-linear-to-r from-amber-400 to-[#D4AF37] h-full transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Upsell Offer Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-[#E8E2D8] flex gap-4 items-center shadow-xs">
            <img
              src={upsellProduct.images[0]}
              alt={upsellProduct.title}
              referrerPolicy="no-referrer"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-[#E8E2D8] shrink-0"
            />
            <div className="space-y-1.5 min-w-0">
              <span className="inline-block text-[10px] font-bold bg-[#0D382A] text-white px-2 py-0.5 rounded-full">
                البروتوكول السريري التكميلي
              </span>
              <h4 className="font-black text-sm sm:text-base text-[#0D382A] leading-snug">
                {upsellProduct.title}
              </h4>
              <p className="text-xs text-[#6B7C73] line-clamp-2">
                {upsellProduct.subtitle}
              </p>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-black text-emerald-800">
                  8 د.ك فقط
                </span>
                <span className="text-sm text-neutral-400 line-through">
                  16 د.ك
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-sm">
                  وفرتِ 8 د.ك (خصم 50%)
                </span>
              </div>
            </div>
          </div>

          {/* Value Reasons */}
          <div className="bg-[#FAF4EB] p-3.5 rounded-xl border border-[#EEDFC6] text-xs text-[#5D461E] space-y-1.5">
            <div className="font-bold text-[#0D382A] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>لماذا ننصحكِ بإضافة هذا المنتج مع شحنتك؟</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#554326]">
              <li>✓ يضاعف سرعة ظهور نتائج روتينك بنسبة 60% بتأثير سريري متبادل.</li>
              <li>✓ شحن مجاني مدمج مع نفس الطرد دون أي مصاريف إضافية.</li>
              <li>✓ تدفعين نقداً عند الاستلام فقط بعد معاينة المنتجات.</li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            {/* Accept Button */}
            <button
              id="accept-upsell-cta-btn"
              onClick={onAcceptUpsell}
              className="w-full py-4 rounded-xl bg-linear-to-r from-[#0D382A] to-[#16503D] hover:from-[#134937] hover:to-[#1b5f49] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-[0.98] border border-[#D4AF37]"
            >
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
              <span>نعم! أضيفيه لطلبي بـ 8 د.ك فقط (الدفع عند الاستلام)</span>
            </button>

            {/* Skip / Decline Button */}
            <button
              id="skip-upsell-btn"
              onClick={onSkipUpsell}
              className="w-full py-2.5 rounded-xl text-neutral-500 hover:text-neutral-700 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <XCircle className="w-4 h-4 text-neutral-400" />
              <span>لا شكراً، أتمم طلبي الأساسي فقط بدون هذا العرض الخاص</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>مشمول بالضمان الذهبي 30 يوماً والدفع عند الاستلام</span>
          </div>
        </div>
      </div>
    </div>
  );
};
