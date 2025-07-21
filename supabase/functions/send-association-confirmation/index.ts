
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Association confirmation email function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { associationData } = await req.json();
    console.log("Received association data:", associationData);

    if (!associationData || !associationData.email) {
      console.error("Missing association data or email");
      return new Response(
        JSON.stringify({ error: "Missing association data or email" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const emailData = {
      from: "Hotel Living <contact@hotel-living.com>", // Updated to use verified domain
      to: [associationData.email],
      subject: "Confirmación de Registro - Hotel-Living Asociación",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">¡Bienvenido a Hotel-Living!</h1>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #555;">Confirmación de Registro de Asociación</h2>
            <p>Estimado/a ${associationData.responsibleName},</p>
            <p>Su registro como asociación en Hotel-Living ha sido recibido exitosamente.</p>
            
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Detalles del Registro:</h3>
              <p><strong>Nombre de la Asociación:</strong> ${associationData.name}</p>
              <p><strong>Responsable:</strong> ${associationData.responsibleName}</p>
              <p><strong>Email:</strong> ${associationData.email}</p>
              <p><strong>País:</strong> ${associationData.country}</p>
            </div>
            
            <p>Su solicitud está siendo revisada por nuestro equipo. Le contactaremos pronto con más información sobre los próximos pasos.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://ca48e511-da23-4c95-9913-59cb1724cacc.lovableproject.com/panel-asociacion" 
                 style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Acceder al Panel de Asociación
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
            <p>Este es un email automático, por favor no responda a este mensaje.</p>
            <p>© 2025 Hotel-Living. Todos los derechos reservados.</p>
          </div>
        </div>
      `,
    };

    console.log("Attempting to send email with data:", emailData);
    
    const emailResponse = await resend.emails.send(emailData);
    
    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      throw new Error(`Email sending failed: ${JSON.stringify(emailResponse.error)}`);
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResponse.data?.id,
        message: "Confirmation email sent successfully" 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Error in send-association-confirmation function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to send confirmation email",
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
