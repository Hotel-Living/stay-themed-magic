
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
      // COMPREHENSIVE COUNTRY MAPPING - Based on actual database values
      const countryCodeToValues: Record<string, string[]> = {
        'DE': ['Germany', 'Alemania', 'Deutschland', 'de', 'DE'],
        'AR': ['Argentina', 'Argentina', 'ar', 'AR'],
        'AU': ['Australia', 'au', 'AU'],
        'AT': ['Austria', 'at', 'AT'],
        'BE': ['Belgium', 'Bélgica', 'be', 'BE'],
        'BR': ['Brazil', 'Brasil', 'br', 'BR'],
        'BG': ['Bulgaria', 'bg', 'BG'],
        'CA': ['Canada', 'Canadá', 'ca', 'CA'],
        'CO': ['Colombia', 'co', 'CO'],
        'CR': ['Costa Rica', 'cr', 'CR'],
        'HR': ['Croatia', 'Croacia', 'hr', 'HR'],
        'DK': ['Denmark', 'Dinamarca', 'dk', 'DK'],
        'EG': ['Egypt', 'Egipto', 'eg', 'EG'],
        'AE': ['United Arab Emirates', 'Emiratos Árabes Unidos', 'ae', 'AE'],
        'ES': ['Spain', 'España', 'es', 'ES'],
        'US': ['United States', 'Estados Unidos', 'USA', 'us', 'US'],
        'EE': ['Estonia', 'ee', 'EE'],
        'PH': ['Philippines', 'Filipinas', 'ph', 'PH'],
        'FI': ['Finland', 'Finlandia', 'fi', 'FI'],
        'FR': ['France', 'Francia', 'FR', 'fr'],
        'GE': ['Georgia', 'ge', 'GE'],
        'GR': ['Greece', 'Grecia', 'GR', 'gr'],
        'HU': ['Hungary', 'Hungría', 'hu', 'HU'],
        'ID': ['Indonesia', 'id', 'ID'],
        'IE': ['Ireland', 'Irlanda', 'ie', 'IE'],
        'IS': ['Iceland', 'Islandia', 'is', 'IS'],
        'IT': ['Italy', 'Italia', 'it', 'IT'],
        'JP': ['Japan', 'Japón', 'jp', 'JP'],
        'KZ': ['Kazakhstan', 'Kazajistán', 'kz', 'KZ'],
        'LV': ['Latvia', 'Letonia', 'lv', 'LV'],
        'LT': ['Lithuania', 'Lituania', 'lt', 'LT'],
        'LU': ['Luxembourg', 'Luxemburgo', 'lu', 'LU'],
        'MY': ['Malaysia', 'Malasia', 'my', 'MY'],
        'MT': ['Malta', 'mt', 'MT'],
        'MA': ['Morocco', 'Marruecos', 'ma', 'MA'],
        'MX': ['Mexico', 'México', 'mx', 'MX'],
        'NO': ['Norway', 'Noruega', 'no', 'NO'],
        'NZ': ['New Zealand', 'Nueva Zelanda', 'nz', 'NZ'],
        'NL': ['Netherlands', 'Países Bajos', 'nl', 'NL'],
        'PA': ['Panama', 'Panamá', 'pa', 'PA'],
        'PY': ['Paraguay', 'py', 'PY'],
        'PE': ['Peru', 'Perú', 'pe', 'PE'],
        'PL': ['Poland', 'Polonia', 'pl', 'PL'],
        'PT': ['Portugal', 'PT', 'pt'],
        'GB': ['United Kingdom', 'Reino Unido', 'gb', 'GB'],
        'CZ': ['Czech Republic', 'República Checa', 'cz', 'CZ'],
        'DO': ['Dominican Republic', 'República Dominicana', 'do', 'DO'],
        'RO': ['Romania', 'Rumanía', 'ro', 'RO'],
        'SG': ['Singapore', 'Singapur', 'sg', 'SG'],
        'LK': ['Sri Lanka', 'lk', 'LK'],
        'SE': ['Sweden', 'Suecia', 'se', 'SE'],
        'CH': ['Switzerland', 'Suiza', 'ch', 'CH'],
        'TW': ['Taiwan', 'Taiwán', 'tw', 'TW'],
        'TH': ['Thailand', 'Tailandia', 'th', 'TH'],
        'TR': ['Turkey', 'Turquía', 'TR', 'tr'],
        'UY': ['Uruguay', 'uy', 'UY'],
        'VN': ['Vietnam', 'vn', 'VN'],
        'KR': ['South Korea', 'Corea del Sur', 'kr', 'KR'],
        'EC': ['Ecuador', 'ec', 'EC'],
        'SK': ['Slovakia', 'Eslovaquia', 'sk', 'SK']
      };
      
      // Get possible values for this country code or use the value as-is
      const possibleValues = countryCodeToValues[filters.country] || [filters.country];
      
      console.log(`🔍 COUNTRY FILTER DEBUG:`);
      console.log(`   - Selected country filter: ${filters.country}`);
      console.log(`   - Possible database values:`, possibleValues);
      console.log(`   - Filter being applied: country IN (${possibleValues.join(', ')})`);
      
      // Use IN condition to match any of the possible values
      query = query.in('country', possibleValues);
      
      console.log(`✅ Country filter applied successfully for: ${filters.country}`);
    }

    if (filters.month) {
      console.log(`🗓️ MONTH FILTER DEBUG: ${filters.month}`);
      query = query.contains('available_months', [filters.month]);
      console.log(`✅ Month filter applied successfully for: ${filters.month}`);
    }

    if (filters.theme && filters.theme.id) {
      console.log(`🎯 THEME FILTER DEBUG: ${filters.theme.name} (ID: ${filters.theme.id})`);
      // Filter by single theme using the theme relationship
      query = query.eq('hotel_themes.theme_id', filters.theme.id);
      console.log(`✅ Theme filter applied successfully for: ${filters.theme.name}`);
    }

    if (filters.minPrice && filters.minPrice > 0) {
      console.log(`💰 MIN PRICE FILTER DEBUG: >= ${filters.minPrice}`);
      query = query.gte('price_per_month', filters.minPrice);
      console.log(`✅ Min price filter applied successfully: >= ${filters.minPrice}`);
    }

    if (filters.maxPrice && filters.maxPrice > 0) {
      console.log(`💰 MAX PRICE FILTER DEBUG: <= ${filters.maxPrice}`);
      query = query.lte('price_per_month', filters.maxPrice);
      console.log(`✅ Max price filter applied successfully: <= ${filters.maxPrice}`);
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
