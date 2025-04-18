
import { supabase } from '@/integrations/supabase/client';
import { FilterState } from '@/components/filters/FilterTypes';
import { useToast } from '@/hooks/use-toast';

export const fetchHotelsWithFilters = async (filters: FilterState) => {
  try {
    console.log("Fetching hotels with filters:", filters);
    
    let query = supabase
      .from('hotels')
      .select('*, hotel_images(*), hotel_themes(theme_id, themes:themes(*))');

    // Apply search term filter
    if (filters.searchTerm) {
      query = query.ilike('name', `%${filters.searchTerm}%`);
    }

    // Apply theme filter
    if (filters.theme) {
      query = query.contains('themes', [filters.theme]);
    }

    // Apply country filter
    if (filters.country) {
      query = query.eq('country', filters.country);
    }

    // Apply month filter
    if (filters.month) {
      query = query.contains('available_months', [filters.month]);
    }

    // Apply city/location filter
    if (filters.location) {
      query = query.eq('city', filters.location);
    }

    // Apply property type filter
    if (filters.propertyType) {
      query = query.eq('property_type', filters.propertyType);
    }

    // Apply minimum price filter
    if (filters.minPrice !== undefined || (filters.priceRange && typeof filters.priceRange === 'object' && filters.priceRange.min !== undefined)) {
      const minPrice = filters.minPrice || (typeof filters.priceRange === 'object' ? filters.priceRange.min : 0);
      query = query.gte('price_per_month', minPrice);
    }

    // Apply maximum price filter
    if (filters.maxPrice !== undefined || (filters.priceRange && typeof filters.priceRange === 'object' && filters.priceRange.max !== undefined)) {
      const maxPrice = filters.maxPrice || (typeof filters.priceRange === 'object' ? filters.priceRange.max : 1000);
      query = query.lte('price_per_month', maxPrice);
    }

    // Handle numeric priceRange (for dropdown selection)
    if (typeof filters.priceRange === 'number') {
      if (filters.priceRange > 2000) {
        query = query.gte('price_per_month', 2000);
      } else {
        query = query.lte('price_per_month', filters.priceRange);
      }
    }

    // Apply star rating filter - Convert string[] to number[] for category comparison
    if (filters.stars && filters.stars.length > 0) {
      const numericStars = filters.stars.map(star => parseInt(star)).filter(star => !isNaN(star));
      query = query.in('category', numericStars);
    }

    console.log("Executing Supabase query...");
    const { data, error } = await query;

    if (error) {
      console.error("Supabase query error:", error);
      throw new Error(`Failed to fetch hotels: ${error.message}`);
    }

    console.log("Hotels fetched successfully:", data?.length || 0, "results");
    return data || [];
  } catch (err: any) {
    console.error("Error in fetchHotelsWithFilters:", err);
    throw err;
  }
};

// Add a function to fetch all hotels (for admin view)
export const fetchAllHotels = async () => {
  try {
    const { data, error } = await supabase
      .from('hotels')
      .select('*, hotel_images(*)');
    
    if (error) {
      console.error("Error fetching all hotels:", error);
      throw new Error(`Failed to fetch hotels: ${error.message}`);
    }
    
    return data || [];
  } catch (err: any) {
    console.error("Error in fetchAllHotels:", err);
    throw err;
  }
};

// Add this new function to create a hotel
export const createHotel = async (hotelData: any) => {
  try {
    console.log("Creating new hotel:", hotelData);
    
    // First, we need to create the hotel
    const { data: hotel, error: hotelError } = await supabase
      .from('hotels')
      .insert([
        {
          name: hotelData.name,
          description: hotelData.description,
          country: hotelData.country || 'Unknown',
          city: hotelData.city || 'Unknown',
          address: hotelData.address,
          property_type: hotelData.propertyType,
          price_per_month: hotelData.pricePerMonth || 0,
          category: hotelData.category || 1,
          owner_id: hotelData.ownerId,
          latitude: hotelData.latitude,
          longitude: hotelData.longitude,
          is_featured: false,
          style: hotelData.style
        }
      ])
      .select()
      .single();
    
    if (hotelError) {
      console.error("Error creating hotel:", hotelError);
      throw new Error(`Failed to create hotel: ${hotelError.message}`);
    }
    
    console.log("Hotel created successfully:", hotel);
    
    // If there are images, add them
    if (hotelData.images && hotelData.images.length > 0) {
      const images = hotelData.images.map((imageUrl: string, index: number) => ({
        hotel_id: hotel.id,
        image_url: imageUrl,
        is_main: index === 0 // Make the first image the main one
      }));
      
      const { error: imagesError } = await supabase
        .from('hotel_images')
        .insert(images);
      
      if (imagesError) {
        console.error("Error adding hotel images:", imagesError);
        // We continue even if image insertion fails
      }
    }
    
    // If there are themes, add them
    if (hotelData.themes && hotelData.themes.length > 0) {
      const themes = hotelData.themes.map((themeId: string) => ({
        hotel_id: hotel.id,
        theme_id: themeId
      }));
      
      const { error: themesError } = await supabase
        .from('hotel_themes')
        .insert(themes);
      
      if (themesError) {
        console.error("Error adding hotel themes:", themesError);
        // We continue even if theme insertion fails
      }
    }
    
    return hotel;
  } catch (err: any) {
    console.error("Error in createHotel:", err);
    throw err;
  }
};
