
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface BatchTranslationRequest {
  languages?: ('es' | 'pt' | 'ro')[];
}

const getHotelsNeedingTranslation = async (languages: string[]) => {
  // Get all hotels
  const { data: hotels, error: hotelsError } = await supabase
    .from('hotels')
    .select('id, name, description, ideal_guests, atmosphere, perfect_location')
    .eq('status', 'approved');

  if (hotelsError) {
    throw new Error(`Failed to fetch hotels: ${hotelsError.message}`);
  }

  // Get existing translations
  const { data: existingTranslations, error: translationsError } = await supabase
    .from('hotel_translations')
    .select('hotel_id, language_code')
    .eq('translation_status', 'completed');

  if (translationsError) {
    throw new Error(`Failed to fetch translations: ${translationsError.message}`);
  }

  // Filter hotels that need translation
  const hotelsNeedingTranslation = hotels?.filter(hotel => {
    return languages.some(lang => {
      return !existingTranslations?.some(
        t => t.hotel_id === hotel.id && t.language_code === lang
      );
    });
  }) || [];

  return hotelsNeedingTranslation;
};

const translateSingleHotel = async (hotel: any, targetLanguage: string) => {
  try {
    const translationContent = {
      name: hotel.name,
      description: hotel.description || undefined,
      ideal_guests: hotel.ideal_guests || undefined,
      atmosphere: hotel.atmosphere || undefined,
      perfect_location: hotel.perfect_location || undefined
    };

    // Call the existing translate-hotel-content function
    const { data, error } = await supabase.functions.invoke('translate-hotel-content', {
      body: {
        hotelId: hotel.id,
        targetLanguage,
        content: translationContent
      }
    });

    if (error) {
      console.error(`Translation failed for hotel ${hotel.id} (${targetLanguage}):`, error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Translation error for hotel ${hotel.id} (${targetLanguage}):`, error);
    return { success: false, error: error.message };
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { languages = ['es', 'pt', 'ro'] }: BatchTranslationRequest = await req.json();

    console.log(`Starting complete batch translation process for languages: ${languages.join(', ')}`);

    // Get ALL hotels that need translation
    const hotelsToTranslate = await getHotelsNeedingTranslation(languages);
    
    console.log(`Found ${hotelsToTranslate.length} hotels needing translation`);

    if (hotelsToTranslate.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No hotels need translation',
          processed: 0,
          total: 0
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    let processed = 0;
    let errors = 0;
    const results = [];

    // Process ALL hotels without batch size limitation
    for (const hotel of hotelsToTranslate) {
      const hotelResults = [];
      
      for (const language of languages) {
        // Check if this specific hotel-language combination needs translation
        const { data: existingTranslation } = await supabase
          .from('hotel_translations')
          .select('id')
          .eq('hotel_id', hotel.id)
          .eq('language_code', language)
          .eq('translation_status', 'completed')
          .maybeSingle();

        if (!existingTranslation) {
          console.log(`Translating hotel ${hotel.name} to ${language}`);
          const result = await translateSingleHotel(hotel, language);
          hotelResults.push({ language, ...result });
          
          if (!result.success) {
            errors++;
          }
          
          // Increased delay to 3 seconds to prevent OpenAI API rate limiting
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }

      if (hotelResults.length > 0) {
        results.push({
          hotelId: hotel.id,
          hotelName: hotel.name,
          translations: hotelResults
        });
      }

      processed++;
      
      // Log progress every 10 hotels
      if (processed % 10 === 0) {
        console.log(`Progress: ${processed}/${hotelsToTranslate.length} hotels processed`);
      }
    }

    console.log(`Complete batch translation finished. Processed: ${processed}, Errors: ${errors}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Complete batch translation finished - processed all ${processed} hotels`,
        processed,
        errors,
        total: hotelsToTranslate.length,
        hasMore: false, // Always false since we process everything
        results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Batch translation error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
