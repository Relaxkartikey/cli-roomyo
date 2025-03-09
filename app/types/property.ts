export interface Price {
  type: string;
  price: string;
  pricePeriod: 'day' | 'monthly' | 'yearly';
}

export interface Privilege {
  icon: string;
  title: string;
  description: string;
  isCustom?: boolean;
}

export interface Host {
  name: string;
  position: string;
  phone?: string;
  email?: string;
}

export const PRICE_PERIODS = ['day', 'monthly', 'yearly'] as const;
export const CATEGORIES = ['Rent Roomyo', 'Roomyo Space', 'Roomyo Family', 'Other'] as const;
export const DEFAULT_PRIVILEGES = [
  {
    icon: 'wifi',
    title: 'High-Speed Internet',
    description: '24/7 unlimited high-speed wifi access'
  },
  {
    icon: 'utensils',
    title: 'Meals Included',
    description: 'Breakfast, lunch, and dinner provided'
  },
  {
    icon: 'shield',
    title: 'Security',
    description: '24/7 security with CCTV surveillance'
  },
  {
    icon: 'broom',
    title: 'Housekeeping',
    description: 'Daily room cleaning service'
  },
  {
    icon: 'couch',
    title: 'Furnished',
    description: 'Fully furnished with modern amenities'
  },
  {
    icon: 'bolt',
    title: 'Power Backup',
    description: '24/7 power backup available'
  }
] as const;

export const ROOM_TYPES = [
  '1RK',
  '1BHK',
  '2BHK',
  '3BHK',
  '4BHK',
  'Studio Apartment',
  'Single Room',
  'Double Room',
  'Triple Room',
  'Other'
] as const;

export interface Property {
  id?: string;
  name: string;
  location: string;
  category: typeof CATEGORIES[number] | string;
  customCategory?: string;
  prices: Price[];
  amenities: string[];
  images: string[];
  description: string;
  privileges: Privilege[];
  fullAddress: string;
  roomType: typeof ROOM_TYPES[number] | string;
  mapLocation: string;
  status: 'Available' | 'Sold' | 'Archived';
  createdAt: number;
  host: Host;
} 