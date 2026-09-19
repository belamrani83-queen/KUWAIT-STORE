# ناما للجمال | Nama Beauty - System Architecture & Technical Stack
**Version:** 1.0.0 | **Target Market:** Saudi Arabia (KSA) DTC E-Commerce

---

## 1. High-Level Architecture Overview

Nama Beauty operates as a high-converting, high-AOV Direct-to-Consumer (DTC) e-commerce system optimized specifically for the Saudi Arabian consumer landscape.

```
+-------------------------------------------------------------------------------+
|                                CLIENT TIER                                    |
|   - Next.js 14+ (or React 19 + Vite) SPA/SSR with Tailwind CSS v4             |
|   - RTL (Right-to-Left) Native Typography (Tajawal & Plus Jakarta Sans)       |
|   - Instant Cart Drawer + 2-Field Checkout Modal + 15s 99 SAR Timed Upsell     |
+---------------------------------------+---------------------------------------+
                                        | HTTPS / REST JSON
                                        v
+-------------------------------------------------------------------------------+
|                               BACKEND TIER                                    |
|   - Python 3.11+ with FastAPI (Asynchronous High-Performance API)             |
|   - Pydantic v2 validation (Strict KSA Mobile Regex ^(05|5|\+9665)[0-9]{8}$)  |
|   - SQLAlchemy 2.0 (asyncpg) ORM Layer                                        |
|   - EasyPanel Hosted Docker Container                                         |
+-------------------+-----------------------------------+-----------------------+
                    |                                   |
                    v                                   v
+------------------------------------+  +---------------------------------------+
|          DATABASE TIER             |  |         INTEGRATION DISPATCH          |
|   - PostgreSQL 16 on EasyPanel     |  |   - Webhook Dispatcher to Google      |
|   - Database Name: `namabeauty`    |  |     Sheets (for Call Center / COD ops)|
|   - Connection pooling (pgBouncer) |  |   - WhatsApp Cloud API Notification   |
|   - Daily automated backups        |  |   - SMS Gateway (Taqnyat / Unifonic)  |
+------------------------------------+  +---------------------------------------+
```

---

## 2. Frontend Technology Stack

| Layer | Recommended Library / Tool | Justification & Purpose |
| :--- | :--- | :--- |
| **Framework** | **React 19 / Vite** (or **Next.js 14+ App Router**) | Ultra-fast load times (<1.2s First Contentful Paint in KSA 5G networks). Zero lag on mobile checkout popup. |
| **Styling** | **Tailwind CSS v4** | Utility-first, native RTL support (`rtl:space-x-reverse`, `ms-`, `me-`), lightweight bundle size. |
| **Typography** | **Google Fonts: Tajawal & Plus Jakarta Sans** | Modern luxury Arabic font with high readability across all weights; paired with refined Latin typography for bilingual polish. |
| **Animation** | **motion/react** | Smooth drawer slides, urgency timer progress ring, luxury accordion toggles. |
| **Icons** | **lucide-react** | Clean, minimalist SVG icons (ShieldCheck, Truck, Sparkles, HeartHandshake, Award, Clock). |
| **State Management** | **React Context / Zustand** | Lightweight cart drawer persistence, selected bundle tier, checkout form state, upsell countdown timer. |

---

## 3. Backend Technology Stack (FastAPI)

- **Language:** Python 3.11+
- **Framework:** FastAPI (`fastapi>=0.110.0`, `uvicorn[standard]>=0.28.0`)
- **ORM:** SQLAlchemy 2.0 (`asyncpg` for asynchronous PostgreSQL operations)
- **Data Validation:** Pydantic v2 (`pydantic[email]>=2.6.0`)
- **Migration Engine:** Alembic
- **HTTP Client:** `httpx` (async background webhook dispatching to Google Sheets & WhatsApp)
- **Deployment Platform:** **EasyPanel** running Docker on a VPS (Hetzner / DigitalOcean / Contabo).
- **PostgreSQL Database:** `namabeauty` hosted inside EasyPanel PostgreSQL service.

---

## 4. Database Schema Structure (`namabeauty`)

### 4.1. Tables

1. **`orders`**:
   - `id` (UUID / Integer Primary Key)
   - `order_code` (e.g. `NAMA-84920` - customer-facing unique identifier)
   - `customer_name` (String, max 100)
   - `phone` (String, validated Saudi mobile number)
   - `city` (String, KSA city e.g. Riyadh, Jeddah, Dammam)
   - `address_details` (Text, optional street/district info)
   - `subtotal_sar` (Numeric 10,2)
   - `discount_sar` (Numeric 10,2)
   - `upsell_sar` (Numeric 10,2 - default 0.00, 99.00 if accepted)
   - `total_sar` (Numeric 10,2)
   - `payment_method` (Enum: `COD_ONLY`)
   - `status` (Enum: `NEW`, `CONFIRMED_CALL`, `SHIPPED`, `DELIVERED`, `CANCELLED`, `RETURNED`)
   - `upsell_accepted` (Boolean, default False)
   - `ip_address` & `user_agent` (Audit / fraud prevention)
   - `webhook_synced` (Boolean, default False)
   - `created_at` & `updated_at` (Timestamp with timezone)

2. **`order_items`**:
   - `id` (Primary Key)
   - `order_id` (Foreign Key to `orders.id`)
   - `product_id` (String: `biotin-gummies`, `marine-collagen`, `magnesium-glow`)
   - `product_title` (Arabic String)
   - `tier_quantity` (Integer: 1, 2, or 3 bottles)
   - `tier_name` (e.g. "كورس الجمال المتكامل - 3 عبوات")
   - `unit_price_sar` (Numeric 10,2)
   - `total_price_sar` (Numeric 10,2)

3. **`leads_abandoned`**:
   - Captures customer name & phone as soon as entered in the popup before final confirmation to enable 15-minute WhatsApp recovery automation.

---

## 5. Webhook & Google Sheets Integration

Every completed order immediately queues an asynchronous background task via FastAPI `BackgroundTasks` to post the following JSON payload to the Google Sheets Webhook URL:

```json
{
  "order_code": "NAMA-84920",
  "created_at": "2026-09-19T18:45:00+03:00",
  "customer_name": "سارة فهد العتيبي",
  "phone": "0554123456",
  "city": "الرياض",
  "address": "حي النرجس - شارع أنس بن مالك",
  "items": [
    {
      "product": "علكات البيوتين ضد تساقط الشعر",
      "tier": "3 عبوات (كورس 3 أشهر)",
      "price_sar": 349.00
    }
  ],
  "has_upsell": true,
  "upsell_item": "بودرة المغنيسيوم ضد الهالات والأرق (عرض خاص بـ 99 ر.س)",
  "total_sar": 448.00,
  "payment_method": "الدفع عند الاستلام (COD)",
  "status": "بانتظار تأكيد الاتصال"
}
```

---

## 6. EasyPanel Deployment Instructions

1. Log into EasyPanel dashboard (`https://your-server-ip:3000`).
2. Create Project: `namabeauty`.
3. Create PostgreSQL Service:
   - Database name: `namabeauty`
   - User: `nama_admin`
   - Password: `[GENERATE_SECURE_PASSWORD]`
4. Create App Service for FastAPI backend:
   - Source: Git Repository
   - Port: `8000`
   - Env variables:
     - `DATABASE_URL=postgresql+asyncpg://nama_admin:[PASSWORD]@namabeauty-postgres:5432/namabeauty`
     - `GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/.../exec`
     - `WHATSAPP_API_TOKEN=...`
5. Map custom domain with SSL (e.g., `api.namabeauty.sa`).
