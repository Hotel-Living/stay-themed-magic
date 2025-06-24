
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

async function generateTextCompletions(hotelName: string, city: string, country: string, description: string) {
  const prompts = [
    {
      field: 'ideal_guests',
      prompt: `Complete this phrase naturally for ${hotelName} in ${city}, ${country}: "Ideal Guests Enjoy" - Continue with a meaningful description that flows naturally. Hotel description: ${description}. Generate 10 different variations, each on a new line.`
    },
    {
      field: 'atmosphere',
      prompt: `Complete this phrase naturally for ${hotelName} in ${city}, ${country}: "Atmosphere Is" - Continue with a natural and coherent description. Hotel description: ${description}. Generate 10 different variations, each on a new line.`
    },
    {
      field: 'perfect_location',
      prompt: `Complete this phrase naturally for ${hotelName} in ${city}, ${country}: "Location Perfect For" - Continue with a description that complements the introduction. Hotel description: ${description}. Generate 10 different variations, each on a new line.`
    }
  ];

  const results = {};
  
  for (const promptConfig of prompts) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a professional copywriter specializing in hotel marketing. Generate natural, appealing text completions that flow seamlessly from the given phrases. Each completion should be engaging, professional, and unique.'
            },
            {
              role: 'user',
              content: promptConfig.prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 800
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const completions = data.choices[0].message.content
        .split('\n')
        .filter(line => line.trim().length > 0)
        .slice(0, 10);
      
      results[promptConfig.field] = completions;
      
      // Small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`Error generating ${promptConfig.field} completions:`, error);
      results[promptConfig.field] = [];
    }
  }
  
  return results;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting batch text completion generation...');

    // Fetch approved hotels that need text completions
    const { data: hotels, error: fetchError } = await supabase
      .from('hotels')
      .select('id, name, city, country, description')
      .eq('status', 'approved')
      .not('name', 'is', null)
      .not('city', 'is', null)
      .not('country', 'is', null);

    if (fetchError) {
      throw fetchError;
    }

    if (!hotels || hotels.length === 0) {
      return new Response(
        JSON.stringify({
          message: 'No hotels found that need text completions',
          processedHotels: 0,
          successCount: 0,
          errorCount: 0,
          totalCompletions: 0
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${hotels.length} hotels for text completion generation`);

    let successCount = 0;
    let errorCount = 0;
    let totalCompletions = 0;

    for (const hotel of hotels) {
      try {
        console.log(`Processing hotel: ${hotel.name} (${hotel.id})`);
        
        const completions = await generateTextCompletions(
          hotel.name,
          hotel.city,
          hotel.country,
          hotel.description || ''
        );

        // Store completions as JSON in the database (you may want to create a separate table for this)
        const { error: updateError } = await supabase
          .from('hotels')
          .update({
            pending_changes: {
              ...hotel.pending_changes || {},
              text_completions: completions,
              text_completions_generated_at: new Date().toISOString()
            }
          })
          .eq('id', hotel.id);

        if (updateError) {
          console.error(`Error updating hotel ${hotel.id}:`, updateError);
          errorCount++;
        } else {
          successCount++;
          const completionCount = Object.values(completions).reduce((sum, arr) => sum + arr.length, 0);
          totalCompletions += completionCount;
          console.log(`Successfully generated ${completionCount} completions for hotel ${hotel.name}`);
        }

        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`Error processing hotel ${hotel.name}:`, error);
        errorCount++;
      }
    }

    console.log(`Completed processing: ${successCount} successful, ${errorCount} errors`);

    return new Response(
      JSON.stringify({
        message: 'Batch text completion generation completed',
        processedHotels: hotels.length,
        successCount,
        errorCount,
        totalCompletions
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in batch text completion generation:', error);
    return new Response(
      JSON.stringify({
        error: 'Text completion generation failed',
        details: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
