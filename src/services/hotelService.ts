
import { supabase } from '@/integrations/supabase/client';
import { FilterState } from '@/components/filters/FilterTypes';

export const convertHotelToUIFormat = (hotel: any) => {
  console.log('🔄 Converting hotel to UI format:', hotel?.name, hotel?.id);
  
  if (!hotel || typeof hotel !== 'object') {
    console.warn('❌ Invalid hotel data received:', hotel);
    return null;
  }

  try {
    // Ensure we have proper fallback image
    const thumbnail = hotel.main_image_url || 
                     hotel.thumbnail || 
                     (hotel.hotel_images && hotel.hotel_images[0]?.image_url) ||
                     "/placeholder.svg";
    
    console.log('🖼️ Hotel image fallback for', hotel.name, ':', {
      main_image_url: hotel.main_image_url,
      thumbnail: hotel.thumbnail,
      final_thumbnail: thumbnail
    });

    const converted = {
      id: hotel.id,
      name: hotel.name || 'Unnamed Hotel',
      location: hotel.location || `${hotel.city || ''}, ${hotel.country || ''}`.replace(/^,\s*/, ''),
      city: hotel.city || 'Unknown City',
      country: hotel.country || 'Unknown Country',
      price_per_month: hotel.price_per_month || 0,
      thumbnail: thumbnail,
      theme: hotel.theme,
      category: hotel.category || 0,
      // For simplified queries, these may be empty
      hotel_images: hotel.hotel_images || [],
      hotel_themes: hotel.hotel_themes || [],
      hotel_activities: hotel.hotel_activities || [],
      available_months: hotel.available_months || [],
      features_hotel: hotel.features_hotel || {},
      features_room: hotel.features_room || {},
      meal_plans: hotel.meal_plans || [],
      stay_lengths: hotel.stay_lengths || [],
      atmosphere: hotel.atmosphere,
      property_type: hotel.property_type,
      style: hotel.style,
      rates: hotel.rates,
      room_types: hotel.room_types,
      pricingMatrix: hotel.pricingMatrix || hotel.pricingmatrix,
    };

    console.log('✅ Successfully converted hotel:', converted.name, converted.id);
    return converted;
  } catch (error) {
    console.error('❌ Error converting hotel data:', error, hotel);
    return null;
  }
};

export const fetchHotelsWithFilters = async (filters: FilterState) => {
  try {
    console.log('🔍 fetchHotelsWithFilters: Fetching all approved hotels - SIMPLE');
    
    const { data: hotelData, error } = await supabase
      .from('hotels')
      .select('id, name, city, country, price_per_month, main_image_url, category')
      .eq('status', 'approved')
      .limit(50);

    console.log('🔍 Simple query response:', { error, count: hotelData?.length });

    if (error) {
      console.error('Simple query error:', error);
      throw error;
    }

    console.log(`📊 Returning ${hotelData?.length || 0} approved hotels`);
    return hotelData || [];
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
