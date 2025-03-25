
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  type: 'booking' | 'review' | 'message';
  recipient: string;
  data: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, recipient, data }: NotificationRequest = await req.json();

    console.log(`Processing ${type} notification to ${recipient}`, data);
    
    // Create email content based on notification type
    const emailContent = {
      booking: {
        subject: "New Booking Confirmation",
        html: `<h1>Booking Confirmation</h1>
               <p>Your booking at ${data.hotelName} from ${data.checkIn} to ${data.checkOut} has been confirmed.</p>
               <p>Thank you for choosing our service!</p>`
      },
      review: {
        subject: "New Review Received",
        html: `<h1>New Review</h1>
               <p>You received a ${data.rating}-star review for ${data.hotelName}.</p>
               <p>${data.comment ? `"${data.comment}"` : ''}</p>`
      },
      message: {
        subject: "New Message Received",
        html: `<h1>New Message</h1>
               <p>You received a message from ${data.sender}:</p>
               <blockquote>${data.message}</blockquote>
               <p>Login to respond to this message.</p>`
      }
    };
    
    // Send the actual email using Resend
    const emailResponse = await resend.emails.send({
      from: "Hotel Life <onboarding@resend.dev>", // Update this with your verified domain
      to: [recipient],
      subject: emailContent[type].subject,
      html: emailContent[type].html,
    });
    
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({
      success: true,
      messageId: emailResponse.id,
      recipient,
      emailContent: emailContent[type]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-notification function:", error);
    
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
