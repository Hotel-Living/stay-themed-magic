
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
    
    // Send notification email to admin
    const { data: emailData, error: emailError } = await supabaseAdmin.functions.invoke(
      "send-notification",
      {
        body: {
          type: "admin-notification",
          recipient: "gransoare@yahoo.com",
          data: {
            subject: `New ${accountType} Registration: ${userName}`,
            userName: userName,
            userEmail: user.email,
            accountType: accountType,
            registrationTime: new Date().toISOString(),
            message: `A new user has registered on Hotel-Living.com. Please review their account details.`
          }
        }
      }
    );
    
    if (emailError) {
      throw emailError;
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
