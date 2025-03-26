
import type { HotelDetailProps } from '@/types/hotel';
import type { HotelImage } from '@/integrations/supabase/types-custom';

/**
 * Adapter to transform API hotel data to the format expected by components
 */
export function adaptHotelData(apiHotels: any[]): HotelDetailProps[] {
  return apiHotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    description: hotel.description,
    city: hotel.city,
    country: hotel.country,
    category: hotel.category,
    price_per_month: hotel.price_per_month,
    main_image_url: hotel.main_image_url,
    average_rating: hotel.average_rating || 4,
    amenities: hotel.amenities || [],
    available_months: hotel.available_months || [],
    hotel_images: ensureHotelImagesFormat(hotel.hotel_images, hotel.id),
    hotel_themes: hotel.hotel_themes || [],
    owner_id: hotel.owner_id // Add this to fix HotelDashboard filter
  }));
}

/**
 * Ensures hotel images conform to the required type
 */
function ensureHotelImagesFormat(images: any[], hotelId: string): HotelImage[] {
  if (!images || !Array.isArray(images)) return [];
  
  return images.map(img => ({
    id: img.id || `img-${Math.random().toString(36).substring(2, 9)}`,
    hotel_id: hotelId,
    image_url: img.image_url,
    is_main: img.is_main || false,
    created_at: img.created_at || new Date().toISOString()
  }));
}
