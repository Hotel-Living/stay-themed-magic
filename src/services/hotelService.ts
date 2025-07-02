
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
      // Complete list of 47 countries with all possible database formats
      const countryCodeToValues: Record<string, string[]> = {
        'AR': ['Argentina', 'ar'],
        'DE': ['Germany', 'Alemania', 'de'],
        'AU': ['Australia', 'au'],
        'AT': ['Austria', 'at'],
        'BE': ['Belgium', 'Bélgica', 'be'],
        'BR': ['Brazil', 'Brasil', 'br'],
        'CA': ['Canada', 'Canadá', 'ca'],
        'CO': ['Colombia', 'co'],
        'CR': ['Costa Rica', 'cr'],
        'HR': ['Croatia', 'Croacia', 'hr'],
        'DK': ['Denmark', 'Dinamarca', 'dk'],
        'EG': ['Egypt', 'Egipto', 'eg'],
        'ES': ['Spain', 'España', 'es'],
        'US': ['United States', 'Estados Unidos', 'USA', 'us'],
        'EE': ['Estonia', 'ee'],
        'PH': ['Philippines', 'Filipinas', 'ph'],
        'FI': ['Finland', 'Finlandia', 'fi'],
        'FR': ['France', 'Francia', 'FR', 'fr'],
        'GR': ['Greece', 'Grecia', 'GR', 'gr'],
        'HU': ['Hungary', 'Hungría', 'hu'],
        'ID': ['Indonesia', 'id'],
        'IE': ['Ireland', 'Irlanda', 'ie'],
        'IS': ['Iceland', 'Islandia', 'is'],
        'IT': ['Italy', 'Italia', 'it'],
        'JP': ['Japan', 'Japón', 'jp'],
        'LU': ['Luxembourg', 'Luxemburgo', 'lu'],
        'MY': ['Malaysia', 'my'],
        'MT': ['Malta', 'mt'],
        'MA': ['Morocco', 'Marruecos', 'ma'],
        'MX': ['Mexico', 'México', 'mx'],
        'NO': ['Norway', 'Noruega', 'no'],
        'NZ': ['New Zealand', 'Nueva Zelanda', 'nz'],
        'NL': ['Netherlands', 'Países Bajos', 'nl'],
        'PL': ['Poland', 'Polonia', 'pl'],
        'PT': ['Portugal', 'PT', 'pt'],
        'GB': ['United Kingdom', 'Reino Unido', 'gb'],
        'CZ': ['Czech Republic', 'República Checa', 'cz'],
        'RO': ['Romania', 'Rumanía', 'ro'],
        'LK': ['Sri Lanka', 'lk'],
        'ZA': ['South Africa', 'Sudáfrica', 'za'],
        'SE': ['Sweden', 'Suecia', 'se'],
        'CH': ['Switzerland', 'Suiza', 'ch'],
        'TH': ['Thailand', 'Tailandia', 'th'],
        'TR': ['Turkey', 'Turquía', 'TR', 'tr'],
        'UY': ['Uruguay', 'uy'],
        'VN': ['Vietnam', 'vn'],
        'KR': ['South Korea', 'Corea del Sur', 'kr']
      };
      
      // Get possible values for this country code
      const possibleValues = countryCodeToValues[filters.country] || [filters.country];
      console.log(`🌍 Country filter: ${filters.country} -> checking values:`, possibleValues);
      console.log(`🔍 Query will search for hotels where country matches any of:`, possibleValues);
      
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
