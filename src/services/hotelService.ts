
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

    // LOCATION/CITY FILTER - Filter by exact city match
    if (filters.location) {
      console.log(`🏙️ LOCATION FILTER DEBUG: ${filters.location}`);
      query = query.eq('city', filters.location);
      console.log(`✅ Location filter applied successfully for city: ${filters.location}`);
    }

    if (filters.month) {
      console.log(`🗓️ MONTH FILTER DEBUG: ${filters.month}`);
      
      // Handle both lowercase and capitalized month values (e.g., "january" and "January")
      const capitalizedMonth = filters.month.charAt(0).toUpperCase() + filters.month.slice(1);
      
      console.log(`🗓️ DATABASE QUERY: Filtering hotels with available_months containing '${filters.month}' OR '${capitalizedMonth}'`);
      
      // Use OR condition to match either lowercase or capitalized month
      query = query.or(`available_months.cs.{${filters.month}},available_months.cs.{${capitalizedMonth}}`);
      
      console.log(`✅ Month filter applied successfully for: ${filters.month} (checking both cases)`);
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

    // STAY LENGTH FILTER - Convert day values to night values for database comparison
    if (filters.stayLengths) {
      console.log(`⏱️ STAY LENGTH FILTER DEBUG: ${filters.stayLengths}`);
      
      // Map user-facing night values to database night values
      const nightToNightMap: Record<string, number> = {
        '7 nights': 7,   // 8 days = 7 nights
        '14 nights': 14, // 15 days = 14 nights  
        '21 nights': 21, // 22 days = 21 nights
        '28 nights': 28  // 29 days = 28 nights
      };
      
      const nightValue = nightToNightMap[filters.stayLengths];
      if (nightValue) {
        console.log(`   - Converting "${filters.stayLengths}" to ${nightValue} nights for database query`);
        query = query.contains('stay_lengths', [nightValue]);
        console.log(`✅ Stay length filter applied successfully: ${filters.stayLengths} -> ${nightValue} nights`);
      } else {
        console.warn(`⚠️ Unknown stay length value: ${filters.stayLengths}`);
      }
    }

    // CATEGORY/ATMOSPHERE FILTER - Filter by hotel star rating
    if (filters.atmosphere) {
      console.log(`⭐ CATEGORY FILTER DEBUG: ${filters.atmosphere}`);
      
      // Map the filter value to the database category field
      const categoryValue = parseInt(filters.atmosphere);
      if (!isNaN(categoryValue)) {
        console.log(`   - Filtering hotels with category = ${categoryValue}`);
        query = query.eq('category', categoryValue);
        console.log(`✅ Category filter applied successfully: ${categoryValue} stars`);
      } else {
        console.warn(`⚠️ Invalid category value: ${filters.atmosphere}`);
      }
    }

    // ACTIVITIES FILTER - Filter by hotel activities using many-to-many relationship
    if (filters.activities && filters.activities.length > 0) {
      console.log(`🎨 ACTIVITIES FILTER DEBUG:`, filters.activities);
      
      // Get hotel IDs that have ANY of the selected activities
      const { data: hotelActivities, error: activitiesError } = await supabase
        .from('hotel_activities')
        .select('hotel_id, activities(name)')
        .in('activities.name', filters.activities);
      
      if (activitiesError) {
        console.error('Activities filter error:', activitiesError);
      } else if (hotelActivities && hotelActivities.length > 0) {
        const hotelIds = [...new Set(hotelActivities.map(ha => ha.hotel_id))];
        console.log(`   - Found ${hotelIds.length} hotels with selected activities`);
        query = query.in('id', hotelIds);
        console.log(`✅ Activities filter applied successfully`);
      } else {
        console.log(`   - No hotels found with selected activities`);
        query = query.eq('id', '00000000-0000-0000-0000-000000000000');
      }
    }

    // MEAL PLANS FILTER - Single selection logic
    if (filters.mealPlans && filters.mealPlans.length > 0) {
      console.log(`🍽️ MEAL PLANS FILTER DEBUG:`, filters.mealPlans);
      
      // Since meal plans are now single-selection, get the first (and only) selected plan
      const selectedPlan = filters.mealPlans[0];
      
      if (selectedPlan === 'No meals') {
        // "No meals" selected - show hotels with empty or null meal_plans
        query = query.or('meal_plans.is.null,meal_plans.eq.{},meal_plans.eq.[]');
        console.log(`✅ "No meals" filter applied - showing hotels with no meal plans`);
      } else {
        // Regular meal plan filtering
        query = query.contains('meal_plans', [selectedPlan]);
        console.log(`✅ Single meal plan filter applied: ${selectedPlan}`);
      }
    }

    // PROPERTY TYPE FILTER
    if (filters.propertyType) {
      console.log(`🏨 PROPERTY TYPE FILTER DEBUG: ${filters.propertyType}`);
      query = query.eq('property_type', filters.propertyType);
      console.log(`✅ Property type filter applied successfully`);
    }

    // PROPERTY STYLE FILTER
    if (filters.propertyStyle) {
      console.log(`🎭 PROPERTY STYLE FILTER DEBUG: ${filters.propertyStyle}`);
      query = query.eq('style', filters.propertyStyle);
      console.log(`✅ Property style filter applied successfully`);
    }

    // ROOM TYPES FILTER
    if (filters.roomTypes && filters.roomTypes.length > 0) {
      console.log(`🛏️ ROOM TYPES FILTER DEBUG:`, filters.roomTypes);
      
      // Check if any room type in room_types array matches selected options
      const roomTypeConditions = filters.roomTypes.map(roomType => 
        `room_types.cs.[{"name":"${roomType}"}]`
      ).join(',');
      
      if (roomTypeConditions) {
        query = query.or(roomTypeConditions);
        console.log(`✅ Room types filter applied successfully`);
      }
    }

    // ROOM FEATURES FILTER
    if (filters.roomFeatures && filters.roomFeatures.length > 0) {
      console.log(`🛋️ ROOM FEATURES FILTER DEBUG:`, filters.roomFeatures);
      
      filters.roomFeatures.forEach(feature => {
        query = query.contains('features_room', { [feature]: true });
      });
      console.log(`✅ Room features filter applied successfully`);
    }

    // HOTEL FEATURES FILTER
    if (filters.hotelFeatures && filters.hotelFeatures.length > 0) {
      console.log(`🏩 HOTEL FEATURES FILTER DEBUG:`, filters.hotelFeatures);
      
      filters.hotelFeatures.forEach(feature => {
        query = query.contains('features_hotel', { [feature]: true });
      });
      console.log(`✅ Hotel features filter applied successfully`);
    }

    const { data: hotels, error } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    console.log(`📊 Database returned ${hotels?.length || 0} hotels`);
    
    // CRITICAL DEBUGGING: Log sample hotel available_months data to check format mismatch
    if (hotels && hotels.length > 0) {
      console.log('🔍 SAMPLE HOTEL available_months DATA:');
      hotels.slice(0, 3).forEach((hotel, index) => {
        console.log(`   Hotel ${index + 1} (${hotel.name}): available_months =`, hotel.available_months);
      });
      
      if (filters.month) {
        console.log(`🔍 MONTH FILTER DEBUGGING:`);
        console.log(`   - Looking for month: "${filters.month}"`);
        const hotelsWithMonth = hotels.filter(h => 
          h.available_months && Array.isArray(h.available_months) && h.available_months.includes(filters.month)
        );
        console.log(`   - Hotels matching month "${filters.month}": ${hotelsWithMonth.length}`);
        
        if (hotelsWithMonth.length === 0) {
          console.log('❌ NO HOTELS MATCH THE MONTH FILTER - POSSIBLE DATA MISMATCH!');
          console.log('🔍 Let\'s check what month values actually exist in the database:');
          const allAvailableMonths = new Set();
          hotels.forEach(h => {
            if (h.available_months && Array.isArray(h.available_months)) {
              h.available_months.forEach(month => allAvailableMonths.add(month));
            }
          });
          console.log('📅 All month values found in database:', Array.from(allAvailableMonths));
        }
      }
    }
    
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
