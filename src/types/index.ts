export interface Retailer {
  id: string;
  name: string;
  logo: string;
  rating?: number;
}

export interface PriceOffer {
  retailerId: string;
  price: number;
  currency: string;
  stockStatus: 'in-stock' | 'out-of-stock' | 'pre-order';
  url: string;
  lastUpdated: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  animalType: 'dog' | 'cat' | 'bird' | 'fish' | 'small-pet';
  description: string;
  image: string;
  attributes: Record<string, string>;
  offers: PriceOffer[];
  bestPrice: number;
  bestOffer?: {
    shippingPrice: number;
    stockStatus: string;
    retailerName: string;
    retailerLogo: string;
    offerUrl: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}
