
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
    const { user, userData } = await req.json();
    
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
    
    // Check if user is an agent by looking for agent record
    const { data: agentData } = await supabaseAdmin
      .from('agents')
      .select('id, agent_code')
      .eq('user_id', user.id)
      .single();
      
    // Determine account type with enhanced logic
    let accountType = "Traveler"; // Default
    
    // Check userData for explicit user_type first
    if (userData?.user_type === 'agent' || agentData) {
      accountType = "Agent";
    } else if (userData?.registration_source === 'hotel_form' || profileData?.is_hotel_owner) {
      accountType = "Hotel Partner";
    } else if (userData?.user_type === 'association') {
      accountType = "Hotel Association";
    }
    
    // Prepare user name
    const userName = profileData?.first_name 
      ? `${profileData.first_name} ${profileData.last_name || ''}`
      : userData?.first_name
        ? `${userData.first_name} ${userData.last_name || ''}`
        : user.email;
    
    // Check for RESEND API key
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    
    const adminEmail = "grand_soiree@yahoo.com"; // Use the proper admin email
    
    console.log(`Sending admin notification to: ${adminEmail}`);
    console.log(`Account type detected: ${accountType}`);
    console.log(`User metadata:`, userData);
    console.log(`Agent data found:`, !!agentData);
    
    // Send admin notification using Resend
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Hotel Living <contact@hotel-living.com>",
        to: adminEmail,
        subject: `New ${accountType} Registration: ${userName}`,
        html: `
          <h2>New User Registration</h2>
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Account Type:</strong> ${accountType}</p>
          ${agentData ? `<p><strong>Agent Code:</strong> ${agentData.agent_code || 'To be generated'}</p>` : ''}
          <p><strong>Registration Time:</strong> ${new Date().toLocaleString()}</p>
          <p>A new user has registered on Hotel-Living.com. Please review their account details.</p>
        `,
      }),
    });

    const adminEmailResult = await adminEmailResponse.json();
    console.log("Admin notification email result:", adminEmailResult);
    
    if (!adminEmailResponse.ok) {
      throw new Error(`Failed to send admin notification: ${JSON.stringify(adminEmailResult)}`);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Admin notification sent successfully",
        accountType: accountType
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
