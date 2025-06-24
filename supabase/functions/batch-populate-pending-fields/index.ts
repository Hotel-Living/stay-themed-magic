
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Available options for randomization
const MEAL_PLANS = ['Half board'];
const PROPERTY_TYPES = ['hotel', 'resort'];
const CATEGORIES = [3, 4];

const HOTEL_FEATURES = [
  'WiFi Gratis', 'Estacionamiento', 'Restaurante', 'Piscina', 'Spa', 'Gimnasio',
  'Recepción 24/7', 'Servicio de Habitaciones', 'Bar', 'Salón',
  'Centro de Negocios', 'Salas de Conferencias', 'Servicio de Lavandería',
  'Conserjería', 'Traslado al Aeropuerto', 'Acepta Mascotas',
  'Acceso a la Playa', 'Vista a la Montaña', 'Jardín', 'Terraza'
];

const ROOM_FEATURES = [
  'Aire Acondicionado', 'Baño Privado', 'Televisor', 'Caja Fuerte', 'Mini Bar',
  'Máquina de Café', 'Hervidor de Agua', 'Secador de Pelo', 'Plancha', 'Escritorio',
  'Balcón', 'Vista al Mar', 'Vista a la Montaña', 'Vista a la Ciudad', 'Bañera',
  'Ducha a Ras de Suelo', 'Cama King', 'Cama Queen', 'Camas Twin', 'Sofá Cama'
];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElements<T>(array: T[], min: number, max: number): T[] {
  const count = getRandomInt(min, max);
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

async function getRandomAffinities(supabase: any, count: number) {
  const { data: themes } = await supabase
    .from('themes')
    .select('id, name')
    .limit(50);
  
  if (themes && themes.length > 0) {
    return getRandomElements(themes, 1, Math.min(count, 3));
  }
  return [];
}

async function getRandomActivities(supabase: any, count: number) {
  const { data: activities } = await supabase
    .from('activities')
    .select('id, name')
    .limit(50);
  
  if (activities && activities.length > 0) {
    return getRandomElements(activities, 1, Math.min(count, 3));
  }
  return [];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get pending hotels with empty fields
    const { data: pendingHotels, error: fetchError } = await supabaseClient
      .from('hotels')
      .select('*')
      .eq('status', 'pending');

    if (fetchError) {
      throw fetchError;
    }

    let processed = 0;
    let fieldsFilledCount = 0;
    const errors: string[] = [];

    for (const hotel of pendingHotels || []) {
      try {
        const updates: any = {};
        let hasUpdates = false;

        // Room Types - always double if empty
        if (!hotel.room_types || hotel.room_types.length === 0) {
          updates.room_types = [{ name: 'double', basePrice: getRandomInt(1200, 1600) }];
          hasUpdates = true;
          fieldsFilledCount++;
        }

        // Base price (if no pricing matrix exists)
        if (!hotel.price_per_month || hotel.price_per_month === 0) {
          updates.price_per_month = getRandomInt(1200, 1600);
          hasUpdates = true;
          fieldsFilledCount++;
        }

        // Dynamic pricing
        if (hotel.enable_price_increase === null || hotel.enable_price_increase === undefined) {
          updates.enable_price_increase = true;
          hasUpdates = true;
          fieldsFilledCount++;
        }

        if (!hotel.price_increase_cap || hotel.price_increase_cap === 0) {
          updates.price_increase_cap = 20;
          hasUpdates = true;
          fieldsFilledCount++;
        }

        // Meal plans
        if (!hotel.meal_plans || hotel.meal_plans.length === 0) {
          updates.meal_plans = MEAL_PLANS;
          hasUpdates = true;
          fieldsFilledCount++;
        }

        // Category
        if (!hotel.category) {
          updates.category = getRandomElement(CATEGORIES);
          hasUpdates = true;
          fieldsFilledCount++;
        }

        // Property type
        if (!hotel.property_type) {
          updates.property_type = getRandomElement(PROPERTY_TYPES);
          hasUpdates = true;
          fieldsFilledCount++;
        }

        // Hotel features
        if (!hotel.features_hotel || Object.keys(hotel.features_hotel).length === 0) {
          const selectedFeatures = getRandomElements(HOTEL_FEATURES, 5, 10);
          const featuresObj: any = {};
          selectedFeatures.forEach(feature => {
            featuresObj[feature] = true;
          });
          updates.features_hotel = featuresObj;
          hasUpdates = true;
          fieldsFilledCount++;
        }

        // Room features
        if (!hotel.features_room || Object.keys(hotel.features_room).length === 0) {
          const selectedFeatures = getRandomElements(ROOM_FEATURES, 5, 10);
          const featuresObj: any = {};
          selectedFeatures.forEach(feature => {
            featuresObj[feature] = true;
          });
          updates.features_room = featuresObj;
          hasUpdates = true;
          fieldsFilledCount++;
        }

        // Stay lengths
        if (!hotel.stay_lengths || hotel.stay_lengths.length === 0) {
          updates.stay_lengths = [7, 14, 30]; // Common stay lengths
          hasUpdates = true;
          fieldsFilledCount++;
        }

        if (hasUpdates) {
          const { error: updateError } = await supabaseClient
            .from('hotels')
            .update(updates)
            .eq('id', hotel.id);

          if (updateError) {
            errors.push(`Hotel ${hotel.name}: ${updateError.message}`);
          } else {
            processed++;

            // Handle affinities/themes
            const randomThemes = await getRandomAffinities(supabaseClient, 3);
            for (const theme of randomThemes) {
              await supabaseClient
                .from('hotel_themes')
                .insert({ hotel_id: hotel.id, theme_id: theme.id });
            }

            // Handle activities
            const randomActivities = await getRandomActivities(supabaseClient, 3);
            for (const activity of randomActivities) {
              await supabaseClient
                .from('hotel_activities')
                .insert({ hotel_id: hotel.id, activity_id: activity.id });
            }
          }
        }
      } catch (error) {
        errors.push(`Hotel ${hotel.name}: ${error.message}`);
      }
    }

    const stats = {
      totalPending: pendingHotels?.length || 0,
      processed,
      fieldsFilledCount,
      errors
    };

    return new Response(
      JSON.stringify({ success: true, stats }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Batch processing error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
