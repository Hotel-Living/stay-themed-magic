
import { supabase } from '@/integrations/supabase/client';
import { FilterState } from '@/components/filters/FilterTypes';

// Helper function to get filter mappings for hotel search
async function getFilterMappings() {
  const { data: mappings, error } = await supabase
    .from('filter_value_mappings')
    .select('category, spanish_value, english_value')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching filter mappings:', error);
    return { meal_plans: new Map(), room_types: new Map(), property_styles: new Map() };
  }

  const filterMappings = {
    meal_plans: new Map<string, string>(),
    room_types: new Map<string, string>(),
    property_styles: new Map<string, string>()
  };

  if (mappings) {
    mappings.forEach(mapping => {
      const category = mapping.category as keyof typeof filterMappings;
      if (filterMappings[category]) {
        // Bidirectional mapping for flexible matching
        filterMappings[category].set(mapping.spanish_value, mapping.english_value);
        filterMappings[category].set(mapping.english_value, mapping.spanish_value);
      }
    });
  }

  return filterMappings;
}

// Helper function to get all possible values for a filter (both languages)
function getAllPossibleValues(filterValue: string, mappings: Map<string, string>): string[] {
  const values = [filterValue];
  const mappedValue = mappings.get(filterValue);
  if (mappedValue && !values.includes(mappedValue)) {
    values.push(mappedValue);
  }
  return values;
}

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
    const startTime = Date.now();

    // Get filter mappings for consistent hotel matching
    console.log('📡 Fetching filter mappings...');
    const filterMappings = await getFilterMappings();
    console.log(`🔗 Filter mappings loaded in ${Date.now() - startTime}ms`);

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
      
      // Map user-facing day values to database night values
      const dayToNightMap: Record<string, number> = {
        '8 days': 8,    // 8 days = 8 nights (special case)
        '15 days': 16,  // 15 days = 16 nights (old values)  
        '22 days': 24,  // 22 days = 24 nights (old values)
        '29 days': 32   // 29 days = 32 nights (old values)
      };
      
      const nightValue = dayToNightMap[filters.stayLengths];
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

    // MEAL PLANS FILTER - Updated to handle Spanish/English mappings
    if (filters.mealPlans && filters.mealPlans.length > 0) {
      console.log(`🍽️ MEAL PLANS FILTER DEBUG:`, filters.mealPlans);
      
      // Handle "No meals" filter separately
      if (filters.mealPlans.includes('No meals')) {
        if (filters.mealPlans.length === 1) {
          // Only "No meals" selected - show hotels with empty or null meal_plans
          query = query.or('meal_plans.is.null,meal_plans.eq.{},meal_plans.eq.[]');
          console.log(`✅ "No meals" filter applied - showing hotels with no meal plans`);
        } else {
          // "No meals" + other options - show hotels with no meals OR hotels with selected meal plans
          const otherPlans = filters.mealPlans.filter(plan => plan !== 'No meals');
          
          // Get all possible values (Spanish + English) for each meal plan
          const allPossibleValues = otherPlans.flatMap(plan => 
            getAllPossibleValues(plan, filterMappings.meal_plans)
          );
          
          const mealConditions = allPossibleValues.map(plan => `meal_plans.cs.[${plan}]`).join(',');
          query = query.or(`meal_plans.is.null,meal_plans.eq.{},${mealConditions}`);
          console.log(`✅ Mixed meal plans filter applied - no meals + selected options (with mappings)`);
        }
      } else {
        // Regular meal plans filtering with mappings support
        const allMeatPlanValues = filters.mealPlans.flatMap(plan => 
          getAllPossibleValues(plan, filterMappings.meal_plans)
        );
        
        console.log(`🔗 Meal plan values to search for:`, allMeatPlanValues);
        
        // Build OR condition to match any of the possible values
        const mealConditions = allMeatPlanValues.map(plan => `meal_plans.cs.[${plan}]`).join(',');
        if (mealConditions) {
          query = query.or(mealConditions);
        }
        console.log(`✅ Meal plans filter applied successfully with mapping support`);
      }
    }

    // PROPERTY TYPE FILTER
    if (filters.propertyType) {
      console.log(`🏨 PROPERTY TYPE FILTER DEBUG: ${filters.propertyType}`);
      query = query.eq('property_type', filters.propertyType);
      console.log(`✅ Property type filter applied successfully`);
    }

    // PROPERTY STYLE FILTER - Updated to handle Spanish/English mappings
    if (filters.propertyStyle) {
      console.log(`🎭 PROPERTY STYLE FILTER DEBUG: ${filters.propertyStyle}`);
      
      // Get all possible values (Spanish + English) for the property style
      const possibleStyleValues = getAllPossibleValues(filters.propertyStyle, filterMappings.property_styles);
      console.log(`🔗 Property style values to search for:`, possibleStyleValues);
      
      // Use OR condition to match any of the possible values
      const styleConditions = possibleStyleValues.map(style => `style.eq.${style}`).join(',');
      if (styleConditions) {
        query = query.or(styleConditions);
      }
      console.log(`✅ Property style filter applied successfully with mapping support`);
    }

    // ROOM TYPES FILTER - Updated to handle Spanish/English mappings
    if (filters.roomTypes && filters.roomTypes.length > 0) {
      console.log(`🛏️ ROOM TYPES FILTER DEBUG:`, filters.roomTypes);
      
      // Get all possible values (Spanish + English) for each room type
      const allRoomTypeValues = filters.roomTypes.flatMap(roomType => 
        getAllPossibleValues(roomType, filterMappings.room_types)
      );
      
      console.log(`🔗 Room type values to search for:`, allRoomTypeValues);
      
      // Build OR conditions to check room_types JSONB array for both name patterns and direct values
      const roomTypeConditions = allRoomTypeValues.flatMap(roomType => [
        `room_types.cs.[{"type":"${roomType}"}]`,  // Check for {type: "value"} format
        `room_types.cs.["${roomType}"]`           // Check for direct string format
      ]).join(',');
      
      if (roomTypeConditions) {
        query = query.or(roomTypeConditions);
        console.log(`✅ Room types filter applied successfully with mapping support`);
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

    console.log('📡 Executing database query...');
    const queryStartTime = Date.now();
    const { data: hotels, error } = await query;
    console.log(`⚡ Database query completed in ${Date.now() - queryStartTime}ms`);

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    console.log(`📊 Database returned ${hotels?.length || 0} hotels`);
    
    // CRITICAL FIX: Check for hotels with empty available_months
    if (hotels && hotels.length > 0) {
      const hotelsWithEmptyMonths = hotels.filter(h => 
        !h.available_months || h.available_months.length === 0
      );
      if (hotelsWithEmptyMonths.length > 0) {
        console.warn(`⚠️ Found ${hotelsWithEmptyMonths.length} hotels with empty available_months:`, 
          hotelsWithEmptyMonths.map(h => h.name));
      }
    }
    
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

    console.log(`🚀 fetchHotelsWithFilters returning ${hotels?.length || 0} hotels to useHotels`);
    if (hotels && hotels.length > 0) {
      console.log('🏨 Sample hotel being returned:', {
        id: hotels[0].id,
        name: hotels[0].name,
        status: hotels[0].status
      });
    }
    return hotels || [];
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
