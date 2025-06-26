
import { supabase } from '@/integrations/supabase/client';
import { FilterState } from '@/components/filters/FilterTypes';

interface HotelServiceResponse {
  id: string;
  name: string;
  location?: string;
  city?: string;
  country?: string;
  price_per_month: number;
  thumbnail?: string;
  theme?: string;
  category?: number;
  hotel_images?: Array<{ image_url: string, is_main?: boolean }>;
  hotel_themes?: Array<{ themes?: { name: string } }>;
  available_months?: string[];
  features_hotel?: Record<string, boolean> | null;
  features_room?: Record<string, boolean> | null;
  meal_plans?: string[];
  stay_lengths?: number[];
  atmosphere?: string;
  property_type?: string;
  style?: string;
}

export const fetchHotelsWithFilters = async (filters: FilterState): Promise<HotelServiceResponse[]> => {
  console.log("🔍 Fetching hotels with filters:", filters);
  
  try {
    let query = supabase
      .from('hotels')
      .select(`
        id,
        name,
        city,
        country,
        price_per_month,
        category,
        property_type,
        style,
        atmosphere,
        available_months,
        stay_lengths,
        meal_plans,
        features_hotel,
        features_room,
        status,
        hotel_images (
          image_url,
          is_main
        ),
        hotel_themes (
          themes (
            name
          )
        ),
        hotel_activities (
          activities (
            name
          )
        )
      `)
      .eq('status', 'approved'); // This is the critical filter - only show approved hotels

    console.log("📊 Base query for approved hotels created");

    // Apply price filter with correct logic
    if (filters.maxPrice && filters.maxPrice > 0) {
      console.log("💰 Applying price filter <= ", filters.maxPrice);
      query = query.lte('price_per_month', filters.maxPrice);
    }

    // Apply country filter
    if (filters.country && filters.country !== 'all') {
      console.log("🌍 Applying country filter:", filters.country);
      query = query.eq('country', filters.country);
    }

    // Apply month filter - check if month is in available_months array
    if (filters.month && filters.month !== 'all') {
      console.log("📅 Applying month filter:", filters.month);
      query = query.contains('available_months', [filters.month]);
    }

    // Apply stay length filter - check if the selected length exists in stay_lengths array
    if (filters.stayLengths) {
      console.log("⏱️ Applying stay length filter:", filters.stayLengths);
      // Extract the number from the string like "8 days" -> 8
      const lengthNumber = parseInt(filters.stayLengths.split(' ')[0]);
      query = query.contains('stay_lengths', [lengthNumber]);
    }

    // Apply property type filter
    if (filters.propertyType && filters.propertyType !== 'all') {
      console.log("🏢 Applying property type filter:", filters.propertyType);
      query = query.eq('property_type', filters.propertyType);
    }

    // Apply property style filter
    if (filters.propertyStyle && filters.propertyStyle !== 'all') {
      console.log("🎨 Applying property style filter:", filters.propertyStyle);
      query = query.eq('style', filters.propertyStyle);
    }

    // Apply category filter
    if (filters.stars && filters.stars.length > 0) {
      console.log("⭐ Applying category filter:", filters.stars);
      const categoryNumber = parseInt(filters.stars[0]);
      query = query.eq('category', categoryNumber);
    }

    // Apply search term filter if provided
    if (filters.searchTerm && filters.searchTerm.trim() !== '') {
      console.log("🔎 Applying search term filter:", filters.searchTerm);
      const searchTerm = filters.searchTerm.trim().toLowerCase();
      query = query.or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,country.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
    }

    console.log("🚀 Executing query...");
    const { data, error } = await query;
    
    if (error) {
      console.error("❌ Error fetching hotels:", error);
      throw error;
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} approved hotels from database`);
    
    // Log sample data for debugging
    if (data && data.length > 0) {
      console.log("📝 Sample hotel data:", {
        firstHotel: {
          name: data[0].name,
          status: data[0].status,
          city: data[0].city,
          country: data[0].country
        },
        totalCount: data.length
      });
    } else {
      console.warn("⚠️ No hotels returned from query - this might indicate a filtering issue");
    }
    
    // Type-safe conversion to ensure proper typing
    const typedData: HotelServiceResponse[] = (data || []).map(hotel => ({
      ...hotel,
      features_hotel: hotel.features_hotel as Record<string, boolean> | null,
      features_room: hotel.features_room as Record<string, boolean> | null,
    }));
    
    return typedData;
    
  } catch (error) {
    console.error("❌ Error in fetchHotelsWithFilters:", error);
    throw error;
  }
};

export const convertHotelToUIFormat = (hotel: HotelServiceResponse) => {
  if (!hotel || !hotel.id || !hotel.name) {
    console.warn("⚠️ Invalid hotel data:", hotel);
    return null;
  }

  const mainImage = hotel.hotel_images?.find(img => img.is_main)?.image_url || 
                   hotel.hotel_images?.[0]?.image_url || 
                   '/placeholder-hotel.jpg';

  const themes = hotel.hotel_themes?.map(ht => ht.themes?.name).filter(Boolean) || [];
  const primaryTheme = themes[0] || 'General';

  console.log(`🏨 Converting hotel ${hotel.name} to UI format`);

  return {
    id: hotel.id,
    name: hotel.name,
    location: `${hotel.city || 'Unknown'}, ${hotel.country || 'Unknown'}`,
    city: hotel.city,
    country: hotel.country,
    price_per_month: hotel.price_per_month || 0,
    thumbnail: mainImage,
    theme: primaryTheme,
    category: hotel.category || 0,
    hotel_images: hotel.hotel_images || [],
    hotel_themes: hotel.hotel_themes || [],
    available_months: hotel.available_months || [],
    features_hotel: hotel.features_hotel || {},
    features_room: hotel.features_room || {},
    meal_plans: hotel.meal_plans || [],
    stay_lengths: hotel.stay_lengths || [],
    atmosphere: hotel.atmosphere,
    property_type: hotel.property_type,
    style: hotel.style
  };
};
