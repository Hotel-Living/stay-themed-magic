
// Define types for hotel comparison
export interface HotelForComparison {
  id: string;
  name: string;
  price_per_month: number;
  category: number;
  city: string;
  country: string;
  available_months: string[];
  amenities: string[];
  average_rating?: number;
  hotel_images?: { image_url: string; is_main?: boolean }[];
  main_image_url?: string;
}

// Define types for comparison categories
export interface ComparisonCategory {
  name: string;
  key: keyof HotelForComparison;
  secondKey?: keyof HotelForComparison;
  formatter: (value: any, secondValue?: any) => string | number | JSX.Element;
}
