export interface Retailer {
  id: string;
  name: string;
  logo: string;
  rating?: number;
  shippingPolicy?: string;
}

export interface PriceOffer {
  retailerId: string;
  price: number;
  currency: string;
  stockStatus: 'in-stock' | 'out-of-stock' | 'pre-order';
  shippingCost?: number;
  url: string;
  lastUpdated: string; // ISO date string
  discount?: string;
  deliveryInfo?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
  tags: string[];
}

export type AnimalType = 'dog' | 'cat' | 'bird' | 'fish' | 'small-pet' | 'reptile' | 'wildlife' | 'horse' | 'livestock';
export type LifeStage = 'Puppy' | 'Adult' | 'Senior' | 'Kitten' | 'All Ages';

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string; // e.g., "Food", "Toys"
  animalType: AnimalType;
  lifeStage: LifeStage;
  description: string;
  image: string;
  attributes: Record<string, string>;
  offers: PriceOffer[];
  // Computed fields for easier sorting/filtering
  bestPrice: number;
  bestOffer?: {
    shippingPrice: number;
    stockStatus: string;
    retailerName: string;
    retailerLogo: string;
    offerUrl: string;
  };
}
