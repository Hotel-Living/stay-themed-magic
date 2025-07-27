import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, table, record, old_record } = await req.json();
    
    console.log("Auth hook triggered:", { type, table, record: record?.id });

    // Only handle user signup events that are NOT yet confirmed
    if (type === "INSERT" && table === "users" && record) {
      const { id, email, email_confirmed_at, user_metadata } = record;
      
      console.log("Processing user signup:", { email, confirmed: !!email_confirmed_at });
      
      // Send verification email for new signups that haven't been confirmed yet
      if (email && !email_confirmed_at) {
        console.log("Sending verification email for user:", email);
        
        // Create Supabase client to call our email function
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        
        if (!supabaseUrl || !supabaseKey) {
          throw new Error("Missing Supabase configuration");
        }

        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Get the role from user metadata to construct proper redirect URL
        const role = user_metadata?.role || 'user';
        
        // Use the production domain for email confirmations
        const projectDomain = 'https://hotel-living.com';
        
        // Create a simple confirmation URL pointing to production domain
        const confirmationUrl = `${projectDomain}/auth/callback`;
        
        // Call our custom email verification function
        const { error: emailError } = await supabase.functions.invoke('send-email-verification', {
          body: {
            email: email,
            confirmationUrl: confirmationUrl,
            language: user_metadata?.language || 'en'
          }
        });

        if (emailError) {
          console.error("Error sending verification email:", emailError);
        } else {
          console.log("Verification email sent successfully to:", email);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error: any) {
    console.error("Error in auth hook:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});