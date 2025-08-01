import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

interface HotelContent {
  name: string;
  description?: string;
  ideal_guests?: string;
  atmosphere?: string;
  perfect_location?: string;
}

interface LanguageDetectionRequest {
  content: HotelContent;
}

const detectLanguageWithOpenAI = async (content: HotelContent): Promise<string> => {
  const textToAnalyze = [
    content.name,
    content.description,
    content.ideal_guests,
    content.atmosphere,
    content.perfect_location
  ].filter(Boolean).join(' ');

  const systemPrompt = `You are a language detection specialist. Analyze the provided text and determine its language.

Respond with ONLY one of these language codes:
- "en" for English
- "es" for Spanish
- "pt" for Portuguese
- "ro" for Romanian

If the language is not one of these four, respond with "en" as the default.
Do not include any explanations, just the language code.`;

  const userPrompt = `Detect the language of this hotel content:

${textToAnalyze}

Language code:`;

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
      temperature: 0.1,
      max_tokens: 10,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const detectedLanguage = data.choices[0].message.content.trim().toLowerCase();
  
  // Validate the response
  if (['en', 'es', 'pt', 'ro'].includes(detectedLanguage)) {
    return detectedLanguage;
  }
  
  return 'en'; // Default fallback
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { content }: LanguageDetectionRequest = await req.json();

    console.log('Starting language detection for content:', content.name);

    const detectedLanguage = await detectLanguageWithOpenAI(content);

    console.log(`Language detected: ${detectedLanguage}`);

    return new Response(
      JSON.stringify({
        success: true,
        language: detectedLanguage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Language detection error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        language: 'en' // Fallback to English
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});