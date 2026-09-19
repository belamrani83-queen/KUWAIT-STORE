export interface ProductBundleTier {
  id: 1 | 2 | 3;
  quantity: number;
  label: string;
  sublabel: string;
  priceSar: number; // Represents price value (in KWD: 16, 23, 29)
  originalPriceSar: number;
  savingsSar: number;
  popularBadge?: string;
  freeGifts?: string;
}

export interface ClinicalIngredient {
  name: string;
  dosage: string;
  benefit: string;
}

export interface Product {
  id: string;
  title: string;
  englishTitle: string;
  subtitle: string;
  category: string;
  rating: number;
  reviewsCount: number;
  stockRemaining: number;
  badge: string;
  accentColor: string;
  images: string[];
  description: string;
  emotionalHook: string;
  clinicalSolution: string;
  painPoints: string[];
  benefits: string[];
  ingredients: ClinicalIngredient[];
  usageInstructions: string;
  timeline: {
    day14: string;
    day30: string;
    day60: string;
  };
  tiers: ProductBundleTier[];
  upsellDescription: string;
}

export interface CartItem {
  product: Product;
  selectedTier: ProductBundleTier;
  addedAt: number;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  city: string;
  addressNotes?: string;
}

export interface Order {
  orderCode: string;
  createdAt: string;
  customer: OrderCustomer;
  items: CartItem[];
  hasUpsell: boolean;
  upsellProduct?: Product;
  upsellPriceSar: number;
  subtotalSar: number;
  discountSar: number;
  totalSar: number;
  paymentMethod: 'COD_CASH_ON_DELIVERY';
  status: 'PENDING_CONFIRMATION' | 'CONFIRMED' | 'SHIPPED';
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  productTitle: string;
  date: string;
  verified: boolean;
  comment: string;
  resultsNoted: string;
}
