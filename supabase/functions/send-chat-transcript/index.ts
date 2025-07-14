import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ChatMessage {
  from: 'user' | 'avatar';
  text: string;
  timestamp?: string;
}

interface ChatTranscriptRequest {
  email: string;
  messages: ChatMessage[];
  avatarName: string;
  language: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, messages, avatarName, language }: ChatTranscriptRequest = await req.json();

    // Format the conversation transcript
    const formatTranscript = (messages: ChatMessage[], lang: string) => {
      const greetings = {
        es: {
          subject: "Transcripción de tu conversación con Hotel Living",
          greeting: "Hola,",
          thanks: "Gracias por conversar con nosotros. Aquí tienes la transcripción completa de tu conversación:",
          conversation: "Conversación",
          closing: "Si tienes más preguntas, no dudes en contactarnos.",
          signature: "El equipo de Hotel Living"
        },
        en: {
          subject: "Your Hotel Living Chat Transcript",
          greeting: "Hello,",
          thanks: "Thank you for chatting with us. Here's the complete transcript of your conversation:",
          conversation: "Conversation",
          closing: "If you have any more questions, feel free to contact us.",
          signature: "The Hotel Living Team"
        },
        pt: {
          subject: "Transcrição do seu chat com Hotel Living",
          greeting: "Olá,",
          thanks: "Obrigado por conversar conosco. Aqui está a transcrição completa da sua conversa:",
          conversation: "Conversa",
          closing: "Se tiver mais perguntas, não hesite em contactar-nos.",
          signature: "A equipe Hotel Living"
        },
        ro: {
          subject: "Transcriptul conversației tale cu Hotel Living",
          greeting: "Salut,",
          thanks: "Mulțumim că ai conversât cu noi. Iată transcriptul complet al conversației tale:",
          conversation: "Conversație",
          closing: "Dacă ai mai multe întrebări, nu ezita să ne contactezi.",
          signature: "Echipa Hotel Living"
        }
      };

      const texts = greetings[lang as keyof typeof greetings] || greetings.es;
      
      const transcriptHtml = messages.map(msg => `
        <div style="margin-bottom: 15px; padding: 10px; border-radius: 8px; ${
          msg.from === 'user' 
            ? 'background-color: #f3e8ff; text-align: right;' 
            : 'background-color: #fdf4ff; text-align: left;'
        }">
          <strong>${msg.from === 'user' ? 'Tú' : avatarName}:</strong><br>
          ${msg.text}
        </div>
      `).join('');

      return {
        subject: texts.subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #7c3aed; margin: 0;">Hotel Living</h1>
            </div>
            
            <p>${texts.greeting}</p>
            <p>${texts.thanks}</p>
            
            <h2 style="color: #7c3aed; border-bottom: 2px solid #e879f9; padding-bottom: 10px;">
              ${texts.conversation}
            </h2>
            
            <div style="background-color: #fafafa; padding: 20px; border-radius: 10px; margin: 20px 0;">
              ${transcriptHtml}
            </div>
            
            <p style="margin-top: 30px;">${texts.closing}</p>
            
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #7c3aed; font-weight: bold;">${texts.signature}</p>
              <p style="color: #666; font-size: 12px;">
                <a href="https://hotel-living.com" style="color: #7c3aed;">hotel-living.com</a>
              </p>
            </div>
          </div>
        `
      };
    };

    const { subject, html } = formatTranscript(messages, language);

    const emailResponse = await resend.emails.send({
      from: "Hotel Living <no-reply@hotel-living.com>",
      to: [email],
      subject: subject,
      html: html,
    });

    console.log("Chat transcript sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-chat-transcript function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);