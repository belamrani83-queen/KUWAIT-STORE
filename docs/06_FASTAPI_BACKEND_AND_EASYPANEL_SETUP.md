# ناما للجمال | Nama Beauty - FastAPI Backend & EasyPanel Deployment
**Framework:** FastAPI 0.110+ | **Database:** PostgreSQL (`namabeauty`) on EasyPanel

---

## 1. Project Directory Layout for FastAPI Backend

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app initialization, CORS, routes mounting
│   ├── config.py            # Environment variables & Pydantic settings
│   ├── database.py          # SQLAlchemy async session engine
│   ├── models.py            # DB tables (Order, OrderItem, Lead)
│   ├── schemas.py           # Pydantic request/response validation
│   ├── crud.py              # Database queries
│   └── webhook.py           # Google Sheets & WhatsApp dispatchers
├── alembic/                 # Migrations
├── Dockerfile               # EasyPanel container build
├── requirements.txt         # Python dependencies
└── .env.example             # Environment template
```

---

## 2. Requirements (`requirements.txt`)

```txt
fastapi>=0.110.0
uvicorn[standard]>=0.28.0
sqlalchemy[asyncio]>=2.0.28
asyncpg>=0.29.0
alembic>=1.13.1
pydantic>=2.6.4
pydantic-settings>=2.2.1
httpx>=0.27.0
python-dotenv>=1.0.1
```

---

## 3. Database Engine (`app/database.py`)

```python
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from app.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    pool_size=10,
    max_overflow=20,
    pool_recycle=1800,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
```

---

## 4. Models Definition (`app/models.py`)

```python
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Numeric, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_code = Column(String(32), unique=True, index=True, nullable=False)
    customer_name = Column(String(120), nullable=False)
    phone = Column(String(20), nullable=False, index=True)
    city = Column(String(80), nullable=False)
    address_notes = Column(Text, nullable=True)
    
    subtotal_sar = Column(Numeric(10, 2), nullable=False)
    discount_sar = Column(Numeric(10, 2), default=0.0)
    upsell_sar = Column(Numeric(10, 2), default=0.0)
    total_sar = Column(Numeric(10, 2), nullable=False)
    
    upsell_accepted = Column(Boolean, default=False)
    upsell_product_name = Column(String(120), nullable=True)
    payment_method = Column(String(30), default="COD_ONLY")
    status = Column(String(30), default="PENDING_CONFIRMATION")
    
    webhook_synced = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(String(50), nullable=False)
    product_title = Column(String(150), nullable=False)
    tier_label = Column(String(80), nullable=False)
    quantity_bottles = Column(Integer, default=1)
    price_sar = Column(Numeric(10, 2), nullable=False)

    order = relationship("Order", back_populates="items")
```

---

## 5. Pydantic Schemas with Saudi Phone Validation (`app/schemas.py`)

```python
import re
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator

SAUDI_PHONE_REGEX = re.compile(r"^(05|5|\+9665)[0-9]{8}$")

class OrderItemCreate(BaseModel):
    product_id: str
    product_title: str
    tier_label: str
    quantity_bottles: int = 1
    price_sar: float

class CreateOrderRequest(BaseModel):
    customer_name: str = Field(..., min_length=3, max_length=100)
    phone: str = Field(..., description="Saudi phone starting with 05, 5, or +9665")
    city: str
    address_notes: Optional[str] = None
    items: List[OrderItemCreate]
    has_upsell: bool = False
    upsell_sar: float = 0.0
    upsell_name: Optional[str] = None

    @field_validator("phone")
    def validate_saudi_phone(cls, v: str) -> str:
        clean = v.strip().replace(" ", "").replace("-", "")
        if not SAUDI_PHONE_REGEX.match(clean):
            raise ValueError("يجب إدخال رقم جوال سعودي صحيح يبدأ بـ 05 ويتكون من 10 أرقام")
        return clean
```

---

## 6. Google Sheets Webhook Dispatcher (`app/webhook.py`)

```python
import httpx
import logging
from app.config import settings

logger = logging.getLogger(__name__)

async def dispatch_order_to_google_sheet(order_payload: dict):
    """
    Sends order data to Google Sheets Apps Script Webhook asynchronously.
    """
    webhook_url = settings.GOOGLE_SHEET_WEBHOOK_URL
    if not webhook_url:
        logger.warning("GOOGLE_SHEET_WEBHOOK_URL is not configured; skipping sync.")
        return False

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(webhook_url, json=order_payload)
            if resp.status_code in (200, 201):
                logger.info(f"Order {order_payload.get('order_code')} synced to Google Sheet successfully.")
                return True
            else:
                logger.error(f"Failed to sync order: HTTP {resp.status_code} - {resp.text}")
                return False
    except Exception as exc:
        logger.exception(f"Exception syncing order to Google Sheets: {exc}")
        return False
```

---

## 7. EasyPanel Dockerfile & Deployment

```dockerfile
# Dockerfile for FastAPI on EasyPanel
FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### EasyPanel Environment Variables (`.env` in EasyPanel):
```ini
DATABASE_URL=postgresql+asyncpg://nama_user:STRONG_PASSWORD@namabeauty-postgres:5432/namabeauty
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
ALLOWED_ORIGINS=https://namabeauty.sa,https://www.namabeauty.sa
ENVIRONMENT=production
```
