
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { user } = await req.json();
    
    if (!user || !user.email) {
      throw new Error("Invalid user data provided");
    }

    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
    
    // Get user profile data if available
    const { data: profileData } = await supabaseAdmin
      .from('profiles')
      .select('first_name, last_name, is_hotel_owner')
      .eq('id', user.id)
      .single();
      
    // Prepare a descriptive subject line
    const accountType = profileData?.is_hotel_owner ? "Hotel Partner" : "Traveler";
    const userName = profileData?.first_name 
      ? `${profileData.first_name} ${profileData.last_name || ''}`
      : user.email;
    
    // Don't rely on the send-notification function, instead send email directly using Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    
    // Send email using Resend directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Hotel Living <registration@hotel-living.com>",
        to: "gransoare@yahoo.com",
        subject: `New ${accountType} Registration: ${userName}`,
        html: `
          <h2>New User Registration</h2>
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Account Type:</strong> ${accountType}</p>
          <p><strong>Registration Time:</strong> ${new Date().toLocaleString()}</p>
          <p>A new user has registered on Hotel-Living.com. Please review their account details.</p>
        `,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email sending result:", emailResult);
    
    if (!emailResponse.ok) {
      throw new Error(`Failed to send email: ${JSON.stringify(emailResult)}`);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Admin notification sent successfully" 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send admin notification" }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
