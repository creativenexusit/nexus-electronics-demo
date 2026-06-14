export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  stock: number;
  isNew: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  description: string;
  features: string[];

  // Allow optional specification values
  specifications: Record<string, string | undefined>;

  images: string[];
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  image: string;
  icon: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  bgColor: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  language: "en" | "bn";

  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;

  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
  isInCart: (id: string) => boolean;

  cartTotal: number;
  cartCount: number;

  toggleLanguage: () => void;
  clearCart: () => void;
}