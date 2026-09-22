export type Category = 'all' | 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'high-jewelry';

export type MetalType = 'all' | '18k-yellow-gold' | '18k-white-gold' | '18k-rose-gold' | 'platinum';

export interface JewelryProduct {
  id: string;
  name: string;
  category: 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'high-jewelry';
  price: number;
  originalPrice?: number;
  description: string;
  details: {
    metal: string;
    gemstone: string;
    caratWeight?: string;
    clarity?: string;
    dimensions?: string;
    sku: string;
  };
  image: string;
  secondaryImage?: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
}

export interface CartItem {
  product: JewelryProduct;
  quantity: number;
  selectedSize?: string;
}

export type ThemeMode = 'light' | 'dark';
