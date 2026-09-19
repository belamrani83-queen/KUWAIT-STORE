# ناما للجمال | Nama Beauty - CRO, Tiered Pricing & COD Funnel Playbook
**Focus:** Maximizing Average Order Value (AOV), Mobile Conversion Rate & Low COD Return Rates

---

## 1. High AOV Tiered Pricing Strategy

Every product on Nama Beauty uses an anchored, value-laddered bundle structure designed to push >68% of customers into Tier 2 (2 عبوات) or Tier 3 (3 عبوات).

```
+---------------------------------------------------------------------------------------+
| TIER 1: عبوة واحدة (تجربة)                                                             |
| السعر: 199 ر.س                                                                        |
| الهدف: كسر حاجز التردد للمترددين، ولكن السعر العالي يوجههم تلقائياً للعرض الأوفر.    |
+---------------------------------------------------------------------------------------+
                                        |
                                        v
+---------------------------------------------------------------------------------------+
| TIER 2: عبوتان (الأكثر طلباً ومبيعاً ⭐ - Best Value)                                    |
| السعر: 279 ر.س فقط (بدل 398 ر.س) - وفر 119 ر.س                                        |
| الميزة النفسية: الحبة تطلع بـ 139 ر.س فقط + شحن مجاني مبرد لكافة مدن المملكة.        |
+---------------------------------------------------------------------------------------+
                                        |
                                        v
+---------------------------------------------------------------------------------------+
| TIER 3: كورس 3 أشهر المتكامل (3 عبوات)                                                |
| السعر: 349 ر.س فقط (بدل 597 ر.س) - وفر 248 ر.س (أقصى توفير)                           |
| الميزة النفسية: الحبة تطلع بـ 116 ر.س فقط + شحن مجاني سريع + دليل العناية الحصري مجاناً.|
+---------------------------------------------------------------------------------------+
```

---

## 2. Cart Drawer Cross-Sell Architecture

When a customer clicks the CTA on any product page:
1. The selected offer (e.g. 2 Bottles for 279 SAR) is instantly saved to cart state.
2. The **Slide-Over Cart Drawer** automatically opens with smooth animation.
3. **Cart Drawer Elements:**
   - **Free Shipping Progress Bar:** "مبروك! طلبكِ مؤهل للشحن السريع المجاني والدفع عند الاستلام 🚚".
   - **Bundle Item Summary:** Product name, selected package, and total SAR with strikethrough original price.
   - **Complementary Cross-Sells Section:**
     - Displays the other 2 products with 1-click **"أضيفي للسلة (+199 ر.س)"** button.
     - Example: If customer selected *علكات البيوتين*, cross-sell shows *مشروب الكولاجين البحري* ("لإكمال روتين النقاء للبشرة والشعر معاً").
   - **Primary CTA:** "متابعة لإتمام الطلب السريع (الدفع عند الاستلام)" -> triggers the Checkout Modal.

---

## 3. High-Converting 2-Field COD Checkout Modal

Traditional e-commerce checkout forms have 7-10 fields (email, address lines, postal code, billing address) which kills KSA mobile conversion rates.
Nama Beauty uses a **Frictionless 2-Field Checkout Modal**:

### Fields:
1. **الاسم الكامل (Full Name):** `placeholder="مثال: سارة العتيبي"`
2. **رقم الجوال السعودي (Saudi Mobile Phone):** `placeholder="05XXXXXXXX"`
   - **Strict Real-Time Validation Regex:** `^(05|5|\+9665)[0-9]{8}$`
   - Real-time visual feedback (Green border + check icon when valid, soft error prompt if incomplete).
3. **المدينة (City Selector Dropdown):** Pre-populated with major Saudi hubs (الرياض، جدة، مكة، المدينة، الدمام، الخبر، القصيم، الطائف، أبها، تبوك، حائل، أخرى).
4. **ملاحظة العنوان (اختياري):** Street name or neighborhood.

### Authority & Reassurance Seals inside Modal:
- 🛡️ ضمان ذهبي 30 يوم استرجاع أموال.
- 📦 الدفع نقداً عند استلام الشحنة وفحصها.
- 🇸🇦 مستودعات جاهزة للشحن في الرياض وجدة.

---

## 4. The Post-Form 15-Second Timed 99 SAR Upsell

This is the secret weapon for increasing store AOV by an extra 35–40%.
When the customer clicks the CTA on the checkout form, **before showing the Thank You page**, a high-urgency pop-up appears:

### Trigger Copy:
- **العنوان:** "انتظري لحظة يا غالية! عرض استثنائي لمرة واحدة فقط قبل تغليف طلبكِ ⏳"
- **المنتج:** مكمل تكميلي متكامل (مثال: بودرة المغنيسيوم المهدئة أو مشروب الكولاجين).
- **السعر الخاص:** **99 ر.س فقط** (بدل 199 ر.س - خصم 50%).
- **العداد التنازلي:** 15 ثانية (Progress bar ينبض باللون الذهبي).
- **زر القبول:** "نعم! أضيفيه لطلبي بـ 99 ر.س فقط (الدفع عند الاستلام)"
- **زر الرفض:** "لا شكراً، سأكتفي بطلبي الأساسي وأفوت هذا العرض الاستثنائي"

---

## 5. Webhook & WhatsApp COD Retention Flow

To combat the typical 25–35% COD cancellation rate in the Gulf region:

1. **Instant Webhook to Google Sheets:**
   The moment the order is confirmed, order details, phone number, and items are posted to Google Sheets via Webhook.
2. **Automated WhatsApp Verification Message:**
   The customer immediately receives a friendly automated WhatsApp message:
   > "أهلاً يا سارة 🌸 معكِ خدمة عملاء ناما للجمال. تم استلام طلبكِ رقم #NAMA-84920 بنجاح! مندوبنا في الرياض سيتواصل معكِ غداً لتسليم الشحنة يداً بيد (الدفع نقداً عند الاستلام). للرد بتأكيد العنوان أرسلي 1."
3. **Outcome:** Reduces COD cancellations to **under 8%**.
