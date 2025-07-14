import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  firstName: string;
  isHotelOwner: boolean;
  language: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, isHotelOwner, language }: WelcomeEmailRequest = await req.json();

    const getWelcomeContent = (lang: string, isHotel: boolean) => {
      const content = {
        es: {
          subject: isHotel ? "¡Bienvenido a Hotel Living - Socio Hotelero!" : "¡Bienvenido a Hotel Living!",
          greeting: `¡Hola ${firstName || 'usuario'}!`,
          welcome: isHotel 
            ? "¡Bienvenido a Hotel Living! Estamos emocionados de tenerte como socio hotelero."
            : "¡Bienvenido a Hotel Living! Tu aventura de viajes largos comienza aquí.",
          nextSteps: isHotel
            ? "Próximos pasos: Completa tu perfil de hotel y comienza a recibir huéspedes de larga estancia."
            : "Explora nuestros hoteles únicos y encuentra tu próximo hogar temporal.",
          closing: "¡Gracias por unirte a nosotros!",
          signature: "El equipo de Hotel Living"
        },
        en: {
          subject: isHotel ? "Welcome to Hotel Living - Hotel Partner!" : "Welcome to Hotel Living!",
          greeting: `Hello ${firstName || 'there'}!`,
          welcome: isHotel
            ? "Welcome to Hotel Living! We're excited to have you as a hotel partner."
            : "Welcome to Hotel Living! Your long-stay travel adventure starts here.",
          nextSteps: isHotel
            ? "Next steps: Complete your hotel profile and start receiving long-stay guests."
            : "Explore our unique hotels and find your next temporary home.",
          closing: "Thank you for joining us!",
          signature: "The Hotel Living Team"
        }
      };
      return content[lang as keyof typeof content] || content.en;
    };

    const content = getWelcomeContent(language, isHotelOwner);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${content.subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Hotel Living</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #667eea; margin-top: 0;">${content.greeting}</h2>
            
            <p style="font-size: 16px; margin-bottom: 20px;">${content.welcome}</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">${content.nextSteps}</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                ${content.closing}
              </p>
            </div>
            
            <p style="margin-top: 30px; color: #667eea; font-weight: bold;">
              ${content.signature}
            </p>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: "Hotel Living <welcome@hotel-living.com>",
      to: [email],
      subject: content.subject,
      html: html,
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    console.log("Welcome email sent successfully:", data);
    return new Response(
      JSON.stringify({ success: true, messageId: data?.id }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);