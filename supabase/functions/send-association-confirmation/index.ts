import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record } = await req.json()
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      },
      body: JSON.stringify({
        from: 'Nomad Heaven <noreply@nomadheaven.com>',
        to: [record.email],
        subject: 'Confirmación de Registro - Asociación Hotelera',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">¡Bienvenido a Nomad Heaven!</h1>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="color: #00d4ff; margin-top: 0;">Registro Confirmado</h2>
              <p>Estimado/a responsable de <strong>${record.association_name}</strong>,</p>
              <p>Su asociación ha sido registrada exitosamente en nuestra plataforma.</p>
              
              <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #00d4ff;">Detalles de su registro:</h3>
                <p><strong>Asociación:</strong> ${record.association_name}</p>
                <p><strong>Responsable:</strong> ${record.responsible_person}</p>
                <p><strong>Email:</strong> ${record.email}</p>
                <p><strong>País:</strong> ${record.country}</p>
                <p><strong>Código de Asociación:</strong> <span style="background: #00d4ff; color: #000; padding: 2px 8px; border-radius: 3px; font-weight: bold;">${record.association_code}</span></p>
              </div>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="color: #00d4ff; margin-top: 0;">Próximos Pasos</h3>
              <ol style="padding-left: 20px;">
                <li style="margin-bottom: 10px;">Acceda a su panel de control en: <a href="${Deno.env.get('SITE_URL')}/panel-asociacion" style="color: #00d4ff;">Panel de Asociación</a></li>
                <li style="margin-bottom: 10px;">Complete la información de sus hoteles asociados</li>
                <li style="margin-bottom: 10px;">Comience a generar comisiones por las reservas</li>
              </ol>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="color: #00d4ff; margin-top: 0;">Información Importante</h3>
              <p>• Su cuenta está actualmente en estado <strong>"pendiente"</strong></p>
              <p>• Nuestro equipo revisará su solicitud en las próximas 24-48 horas</p>
              <p>• Recibirá una notificación cuando su cuenta sea aprobada</p>
              <p>• Mientras tanto, puede explorar todas las funcionalidades del panel</p>
            </div>
            
            <div style="text-align: center; padding: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
              <p style="margin: 0; color: #ccc;">Si tiene alguna pregunta, no dude en contactarnos.</p>
              <p style="margin: 5px 0 0 0; color: #ccc;">Equipo Nomad Heaven</p>
            </div>
          </div>
        `,
      }),
    })

    if (res.ok) {
      const data = await res.json()
      console.log('Email sent successfully:', data)
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      const error = await res.text()
      console.error('Email sending failed:', error)
      
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }
  } catch (error) {
    console.error('Error in send-association-confirmation function:', error)
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})