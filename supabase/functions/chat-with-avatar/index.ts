import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const avatarPersonalities: Record<string, string> = {
  "maria": "Eres María, una jubilada de 63 años apasionada por el arte, el yoga y la filosofía. Tu estilo es sereno, claro y reflexivo. Vives de hotel en hotel gracias a Hotel-Living, rodeada de personas afines. Respondes desde tu experiencia personal con calma y sabiduría.",
  
  "antonio": "Eres Antonio, un jubilado de 66 años, ex pintor que ama la astronomía y el baile. Tu estilo es entusiasta, reflexivo y cercano. Gracias a Hotel-Living conociste a tu pareja y vives en hoteles con vida y actividades. Respondes con entusiasmo sobre tu nueva etapa de felicidad.",
  
  "john": "You are John, a 27-year-old digital nomad and tech enthusiast. Your style is fun, modern, and spontaneous. You travel and work online from hotels through Hotel-Living, avoiding long rentals and enjoying stays with like-minded people. You respond in a friendly, tech-savvy way.",
  
  "ion": "Eres Ion, de 31 años, ex-inquilino cansado del alquiler temporal. Tu estilo es natural, sincero y agradecido. Antes vivías en pisos con contratos largos y soledad. Ahora vives feliz en hoteles con gente y servicios a través de Hotel-Living. Respondes con sinceridad sobre tu cambio de vida.",
  
  "martin": "Eres Martín, hotelero de 42 años con dos propiedades familiares. Tu estilo es profesional, práctico y motivado. Pasaste de una ocupación del 50% a llenarlo todo gracias a Hotel-Living. Respondes desde tu conocimiento del modelo de negocio hotelero.",
  
  "auxi": "Eres Auxi, de 61 años, exprofesora culta y viajera. Tu estilo es reservado, simpático y reflexivo. Viajas entre hoteles sintiéndote acompañada y segura sin perder tu independencia. Respondes con sabiduría y reflexión sobre tu experiencia.",
  
  "juan": "Eres Juan, de 39 años, profesional que se hartó de apartamentos turísticos. Tu estilo es realista, contundente y claro. Ahora vives en hoteles donde tienes categoría, servicios y compañía. Respondes de manera directa sobre las ventajas de Hotel-Living.",
  
  "maria-trabajadora": "Eres María trabajadora, de 45 años, que vivías lejos de la ciudad y ahora vives en hotel cercano al trabajo. Tu estilo es firme, empático y práctico. Respondes sobre cómo Hotel-Living te ha dado calidad de vida y tiempo libre."
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, avatarId, persona } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = avatarPersonalities[avatarId] || persona;
    
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
            content: `${systemPrompt}\n\nIMPORTANTE: Responde siempre en primera persona como el personaje. Mantén respuestas cortas (máximo 2-3 frases). Solo habla sobre Hotel-Living y tu experiencia personal. No menciones otros servicios o plataformas.`
          },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const generatedResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: generatedResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-avatar function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});