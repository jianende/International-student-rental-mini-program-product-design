
export enum AppRoute {
  HOME = 'home',
  SEARCH = 'search',
  DETAIL = 'detail',
  AI_CHAT = 'ai_chat',
  ME = 'me'
}

export interface City {
  id: string;
  name: string;
  image: string;
  hot?: boolean;
}

export interface CommuteInfo {
  destination: string;
  type: 'walk' | 'transit' | 'drive';
  duration: string;
  label: string; // e.g. "To USC Campus"
}

export interface Listing {
  id: string;
  title: string;
  cityId: string;
  price: number;
  currency: string;
  tags: string[];
  image: string;
  distanceToSchool: string; // e.g., "Walk 5 mins to USC"
  type: string; // Studio, 1B1B, etc.
  sqft: number;
  images: string[];
  description: string;
  amenities: string[];
  location: {
    lat: number;
    lng: number;
  };
  s1Benefits: string[];
  // New fields for enhanced display
  status: 'available' | 'low_stock' | 'sold_out';
  stockCount: number;
  leaseTerms: string[]; // e.g., "12 Months", "Aug 2025 - Jul 2026"
  videoUrl?: string;
  vrUrl?: string; // 360 VR Tour URL
  securityFeatures: string[]; // e.g., "CCTV", "Gated", "24h Guard"
  safetyRating: number; // 1-5
  commuteTimes: CommuteInfo[];
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  relatedListings?: Listing[]; // If the AI recommends houses
  isTyping?: boolean;
  groundingChunks?: any[]; // Google Maps Grounding Metadata
}

export interface PriceComparisonData {
  name: string;
  baseRent: number;
  utilities: number;
  furniture: number;
  serviceFee: number;
  total: number;
}
