
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

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

interface TranslationRequest {
  hotelId: string;
  targetLanguage: 'es' | 'pt' | 'ro';
  content: {
    name: string;
    description?: string;
    ideal_guests?: string;
    atmosphere?: string;
    perfect_location?: string;
  };
}

interface TranslationResponse {
  translated_name: string;
  translated_description?: string;
  translated_ideal_guests?: string;
  translated_atmosphere?: string;
  translated_perfect_location?: string;
}

const getLanguageName = (code: string): string => {
  const languages: Record<string, string> = {
    'es': 'Spanish',
    'pt': 'Portuguese', 
    'ro': 'Romanian'
  };
  return languages[code] || code;
};

const translateContent = async (content: TranslationRequest['content'], targetLanguage: string): Promise<TranslationResponse> => {
  const languageName = getLanguageName(targetLanguage);
  
  const systemPrompt = `You are a professional hotel content translator specializing in hospitality marketing. 
  
Your task is to translate hotel content into ${languageName} while:
- Maintaining the welcoming, inviting tone typical of hotel descriptions
- Preserving the marketing appeal and emotional connection
- Using hospitality industry terminology appropriately
- Keeping the same structure and formatting
- Ensuring cultural appropriateness for ${languageName}-speaking markets

Respond ONLY with a valid JSON object containing the translated fields. Do not include any explanations or additional text.`;

  const userPrompt = `Translate the following hotel content to ${languageName}:

${JSON.stringify(content, null, 2)}

Return a JSON object with these exact keys:
- translated_name
- translated_description (if provided)
- translated_ideal_guests (if provided)  
- translated_atmosphere (if provided)
- translated_perfect_location (if provided)`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const translatedContent = data.choices[0].message.content;
  
  try {
    return JSON.parse(translatedContent);
  } catch (error) {
    console.error('Failed to parse OpenAI response:', translatedContent);
    throw new Error('Invalid translation response format');
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { hotelId, targetLanguage, content }: TranslationRequest = await req.json();

    console.log(`Starting translation for hotel ${hotelId} to ${targetLanguage}`);

    // Check if translation already exists
    const { data: existingTranslation } = await supabase
      .from('hotel_translations')
      .select('*')
      .eq('hotel_id', hotelId)
      .eq('language_code', targetLanguage)
      .single();

    if (existingTranslation && existingTranslation.translation_status === 'completed') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Translation already exists',
          translation: existingTranslation
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create or update translation record as pending
    const translationData = {
      hotel_id: hotelId,
      language_code: targetLanguage,
      translation_status: 'pending',
      auto_generated: true,
    };

    const { error: upsertError } = await supabase
      .from('hotel_translations')
      .upsert(translationData, { 
        onConflict: 'hotel_id,language_code',
        ignoreDuplicates: false 
      });

    if (upsertError) {
      console.error('Database upsert error:', upsertError);
      throw new Error('Failed to initialize translation record');
    }

    // Perform translation
    const translatedContent = await translateContent(content, targetLanguage);

    // Update with completed translation
    const { data: finalTranslation, error: updateError } = await supabase
      .from('hotel_translations')
      .update({
        ...translatedContent,
        translation_status: 'completed',
        updated_at: new Date().toISOString(),
      })
      .eq('hotel_id', hotelId)
      .eq('language_code', targetLanguage)
      .select()
      .single();

    if (updateError) {
      console.error('Translation update error:', updateError);
      // Mark as failed
      await supabase
        .from('hotel_translations')
        .update({ translation_status: 'failed' })
        .eq('hotel_id', hotelId)
        .eq('language_code', targetLanguage);
      
      throw new Error('Failed to save translation');
    }

    console.log(`Translation completed for hotel ${hotelId} to ${targetLanguage}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Translation completed successfully',
        translation: finalTranslation
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Translation error:', error);

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
