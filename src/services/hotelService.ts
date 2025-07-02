
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

    // COMPREHENSIVE COUNTRY MAPPING - Based on actual database values found via query
    const countryCodeToValues: Record<string, string[]> = {
      'AT': ['Austria'],
      'BE': ['Belgium'],  
      'CA': ['Canada'],
      'DK': ['Denmark'],
      'FI': ['Finland'],
      'FR': ['France', 'FR'],
      'DE': ['Germany'],
      'GR': ['Greece', 'GR'],
      'HU': ['Hungary'],
      'IS': ['Iceland'],
      'IE': ['Ireland'],
      'LU': ['Luxembourg'],
      'NL': ['Netherlands'],
      'NO': ['Norway'],
      'PL': ['Poland'],
      'PT': ['Portugal', 'PT'],
      'RO': ['Romania'],
      'ES': ['Spain', 'es'],
      'SE': ['Sweden'],
      'CH': ['Switzerland'],
      'TH': ['Thailand'],
      'TR': ['Turkey', 'TR'],
      'GB': ['United Kingdom']
    };

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
      console.log(`🗓️ DATABASE QUERY: Filtering hotels with available_months containing '${filters.month}'`);
      query = query.contains('available_months', [filters.month]);
      console.log(`✅ Month filter applied successfully for: ${filters.month}`);
    }

    // THEME FILTER - Must be handled differently due to many-to-many relationship
    if (filters.theme && filters.theme.id) {
      console.log(`🎯 THEME FILTER DEBUG: ${filters.theme.name} (ID: ${filters.theme.id})`);
      
      // First get hotel IDs that have this theme
      const { data: hotelThemes, error: themeError } = await supabase
        .from('hotel_themes')
        .select('hotel_id')
        .eq('theme_id', filters.theme.id);
      
      if (themeError) {
        console.error('Theme filter error:', themeError);
      } else if (hotelThemes && hotelThemes.length > 0) {
        const hotelIds = hotelThemes.map(ht => ht.hotel_id);
        console.log(`   - Found ${hotelIds.length} hotels with this theme`);
        query = query.in('id', hotelIds);
      } else {
        // No hotels found with this theme, return empty results
        console.log(`   - No hotels found with theme: ${filters.theme.name}`);
        query = query.eq('id', '00000000-0000-0000-0000-000000000000'); // Non-existent ID
      }
      
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
    
    // VALIDATION: Log unique countries in results to verify filtering worked
    if (hotels && hotels.length > 0) {
      const uniqueCountries = [...new Set(hotels.map(h => h.country))];
      console.log('🌍 Countries in results:', uniqueCountries);
      
      if (filters.country && uniqueCountries.length > 0) {
        const expectedValues = countryCodeToValues[filters.country] || [filters.country];
        const matchingCountries = uniqueCountries.filter(country => 
          expectedValues.includes(country)
        );
        console.log(`✅ Filter validation - Expected: ${expectedValues.join(', ')}, Found: ${matchingCountries.join(', ')}`);
        
        if (matchingCountries.length === 0 && uniqueCountries.length > 0) {
          console.warn('⚠️ FILTER MISMATCH: No results match the country filter!');
          console.warn(`   Expected one of: ${expectedValues.join(', ')}`);
          console.warn(`   But got countries: ${uniqueCountries.join(', ')}`);
        }
      }
      
      console.log('🏨 Sample hotel data structure:', {
        id: hotels[0].id,
        name: hotels[0].name,
        country: hotels[0].country,
        hotel_themes: hotels[0].hotel_themes,
        hotel_activities: hotels[0].hotel_activities
      });
    } else if (Object.keys(filters).some(key => filters[key as keyof FilterState] !== null && filters[key as keyof FilterState] !== undefined)) {
      console.log('ℹ️ No hotels found matching the applied filters - this is expected if no hotels match the criteria');
    }

    return hotels || [];
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
