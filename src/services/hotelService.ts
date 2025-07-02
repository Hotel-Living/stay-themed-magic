
import { supabase } from '@/integrations/supabase/client';
import { FilterState } from '@/components/filters/FilterTypes';

export const convertHotelToUIFormat = (hotel: any) => {
  if (!hotel || typeof hotel !== 'object') {
    console.warn('Invalid hotel data received:', hotel);
    return null;
  }

  try {
    const converted = {
      id: hotel.id,
      name: hotel.name || 'Unnamed Hotel',
      location: hotel.location || `${hotel.city || ''}, ${hotel.country || ''}`.replace(/^,\s*/, ''),
      city: hotel.city,
      country: hotel.country,
      price_per_month: hotel.price_per_month || 0,
      thumbnail: hotel.main_image_url || hotel.thumbnail,
      theme: hotel.theme,
      category: hotel.category,
      hotel_images: hotel.hotel_images || [],
      hotel_themes: hotel.hotel_themes || [],
      hotel_activities: hotel.hotel_activities || [], // Include hotel_activities
      available_months: hotel.available_months || [],
      features_hotel: hotel.features_hotel || {},
      features_room: hotel.features_room || {},
      meal_plans: hotel.meal_plans || [],
      stay_lengths: hotel.stay_lengths || [],
      atmosphere: hotel.atmosphere,
      property_type: hotel.property_type,
      style: hotel.style,
      rates: hotel.rates,
      // Add any other pricing-related fields
      room_types: hotel.room_types,
      pricingMatrix: hotel.pricingMatrix || hotel.pricingmatrix,
    };

    return converted;
  } catch (error) {
    console.error('Error converting hotel data:', error, hotel);
    return null;
  }
};

export const fetchHotelsWithFilters = async (filters: FilterState) => {
  try {
    console.log('🔍 Applying filters:', filters);

    let query = supabase
      .from('hotels')
      .select(`
        *,
        hotel_images (
          id,
          image_url,
          is_main
        ),
        hotel_themes (
          theme_id,
          themes (
            id,
            name,
            description,
            category
          )
        ),
        hotel_activities (
          activity_id,
          activities (
            id,
            name,
            category
          )
        )
      `)
      .eq('status', 'approved');

    if (filters.country) {
      // Map country codes to actual values stored in the database
      // Some hotels have full country names, others have lowercase codes
      const countryCodeToValues: Record<string, string[]> = {
        'US': ['United States', 'USA', 'us'],
        'CA': ['Canada', 'ca'],
        'MX': ['Mexico', 'mx'],
        'AR': ['Argentina', 'ar'],
        'BR': ['Brazil', 'br'],
        'CO': ['Colombia', 'co'],
        'ES': ['Spain', 'España', 'es'], // Handle Spanish hotels stored as lowercase 'es'
        'PT': ['Portugal', 'pt'],
        'RO': ['Romania', 'ro'],
        'IT': ['Italy', 'it'],
        'FR': ['France', 'fr'],
        'DE': ['Germany', 'de'],
        'GR': ['Greece', 'gr'],
        'AU': ['Australia', 'au'],
        'NZ': ['New Zealand', 'nz'],
        'ZA': ['South Africa', 'za'],
        'MA': ['Morocco', 'ma'],
        'EG': ['Egypt', 'eg'],
        'TH': ['Thailand', 'th'],
        'ID': ['Indonesia', 'id'],
        'VN': ['Vietnam', 'vn'],
        'PH': ['Philippines', 'ph'],
        'TR': ['Turkey', 'tr'],
        'GB': ['United Kingdom', 'gb'],
        'CH': ['Switzerland', 'ch'],
        'HU': ['Hungary', 'hu'],
        'BE': ['Belgium', 'be'],
        'LU': ['Luxembourg', 'lu'],
        'NO': ['Norway', 'no']
      };
      
      // Get possible values for this country code
      const possibleValues = countryCodeToValues[filters.country] || [filters.country];
      console.log(`🌍 Country filter: ${filters.country} -> checking values:`, possibleValues);
      
      // Use OR condition to match any of the possible values
      query = query.or(possibleValues.map(value => `country.eq.${value}`).join(','));
    }

    if (filters.month) {
      query = query.contains('available_months', [filters.month]);
    }

    if (filters.theme && filters.theme.id) {
      // Filter by single theme using the theme relationship
      query = query.eq('hotel_themes.theme_id', filters.theme.id);
    }

    if (filters.minPrice) {
      query = query.gte('price_per_month', filters.minPrice);
    }

    if (filters.maxPrice) {
      query = query.lte('price_per_month', filters.maxPrice);
    }

    const { data: hotels, error } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    console.log(`📊 Database returned ${hotels?.length || 0} hotels`);
    
    if (hotels && hotels.length > 0) {
      console.log('🏨 Sample hotel data structure:', {
        id: hotels[0].id,
        name: hotels[0].name,
        hotel_themes: hotels[0].hotel_themes,
        hotel_activities: hotels[0].hotel_activities
      });
    }

    return hotels || [];
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
