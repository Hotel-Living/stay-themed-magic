
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

async function generateTextCompletions(hotelName: string, city: string, country: string, description: string, fieldsToGenerate: string[]) {
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
    // Skip fields that don't need to be generated
    if (!fieldsToGenerate.includes(promptConfig.field)) {
      continue;
    }

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

async function generateSingleCompletion(hotelName: string, city: string, country: string, description: string, field: string) {
  const prompts = {
    'ideal_guests': `Complete this phrase naturally for ${hotelName} in ${city}, ${country}: "Ideal Guests Enjoy" - Continue with a meaningful description that flows naturally. Hotel description: ${description}. Provide one compelling completion.`,
    'atmosphere': `Complete this phrase naturally for ${hotelName} in ${city}, ${country}: "Atmosphere Is" - Continue with a natural and coherent description. Hotel description: ${description}. Provide one compelling completion.`,
    'perfect_location': `Complete this phrase naturally for ${hotelName} in ${city}, ${country}: "Location Perfect For" - Continue with a description that complements the introduction. Hotel description: ${description}. Provide one compelling completion.`
  };

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
            content: 'You are a professional copywriter specializing in hotel marketing. Generate a natural, appealing text completion that flows seamlessly from the given phrase. Make it engaging, professional, and property-specific.'
          },
          {
            role: 'user',
            content: prompts[field]
          }
        ],
        temperature: 0.8,
        max_tokens: 200
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
    
  } catch (error) {
    console.error(`Error generating ${field} completion:`, error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json().catch(() => ({}));
    const autoFillMode = requestBody.autoFillMode === true;

    console.log(`Starting ${autoFillMode ? 'auto-fill' : 'batch'} text completion generation...`);

    let query = supabase
      .from('hotels')
      .select('id, name, city, country, description, ideal_guests, atmosphere, perfect_location')
      .eq('status', 'approved')
      .not('name', 'is', null)
      .not('city', 'is', null)
      .not('country', 'is', null);

    // In auto-fill mode, only get hotels with at least one empty field
    if (autoFillMode) {
      query = query.or('ideal_guests.is.null,atmosphere.is.null,perfect_location.is.null');
    }

    const { data: hotels, error: fetchError } = await query;

    if (fetchError) {
      throw fetchError;
    }

    if (!hotels || hotels.length === 0) {
      return new Response(
        JSON.stringify({
          message: autoFillMode ? 'No hotels found with empty fields' : 'No hotels found that need text completions',
          processedHotels: 0,
          successCount: 0,
          errorCount: 0,
          totalCompletions: 0,
          fieldsFilledCount: 0,
          hotelsWithEmptyFields: 0
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${hotels.length} hotels for ${autoFillMode ? 'auto-fill' : 'batch'} text completion generation`);

    let successCount = 0;
    let errorCount = 0;
    let totalCompletions = 0;
    let fieldsFilledCount = 0;
    let hotelsWithEmptyFields = 0;

    for (const hotel of hotels) {
      try {
        console.log(`Processing hotel: ${hotel.name} (${hotel.id})`);
        
        if (autoFillMode) {
          // Check which fields are empty
          const emptyFields = [];
          if (!hotel.ideal_guests || hotel.ideal_guests.trim() === '') emptyFields.push('ideal_guests');
          if (!hotel.atmosphere || hotel.atmosphere.trim() === '') emptyFields.push('atmosphere');
          if (!hotel.perfect_location || hotel.perfect_location.trim() === '') emptyFields.push('perfect_location');

          if (emptyFields.length === 0) {
            console.log(`Skipping hotel ${hotel.name} - no empty fields`);
            continue;
          }

          hotelsWithEmptyFields++;

          // Generate single completion for each empty field and apply directly
          const updates = {};
          for (const field of emptyFields) {
            const completion = await generateSingleCompletion(
              hotel.name,
              hotel.city,
              hotel.country,
              hotel.description || '',
              field
            );

            if (completion) {
              updates[field] = completion;
              fieldsFilledCount++;
            }

            // Rate limiting delay
            await new Promise(resolve => setTimeout(resolve, 500));
          }

          // Apply updates directly to the hotel record
          if (Object.keys(updates).length > 0) {
            const { error: updateError } = await supabase
              .from('hotels')
              .update(updates)
              .eq('id', hotel.id);

            if (updateError) {
              console.error(`Error updating hotel ${hotel.id}:`, updateError);
              errorCount++;
            } else {
              successCount++;
              console.log(`Successfully filled ${Object.keys(updates).length} fields for hotel ${hotel.name}`);
            }
          }
        } else {
          // Original batch mode - generate variations and store in pending_changes
          const fieldsToGenerate = ['ideal_guests', 'atmosphere', 'perfect_location'];
          const completions = await generateTextCompletions(
            hotel.name,
            hotel.city,
            hotel.country,
            hotel.description || '',
            fieldsToGenerate
          );

          // Store completions as JSON in pending_changes
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
        }

        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`Error processing hotel ${hotel.name}:`, error);
        errorCount++;
      }
    }

    const result = {
      message: autoFillMode ? 'Auto-fill text completion completed' : 'Batch text completion generation completed',
      processedHotels: hotels.length,
      successCount,
      errorCount,
      ...(autoFillMode ? {
        hotelsWithEmptyFields,
        fieldsFilledCount
      } : {
        totalCompletions
      })
    };

    console.log(`Completed processing: ${successCount} successful, ${errorCount} errors`);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in text completion generation:', error);
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
