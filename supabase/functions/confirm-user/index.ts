import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, role } = await req.json();
    
    console.log("Confirming user:", { userId, role });

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    // Manually confirm the user's email
    const { data: user, error: updateError } = await supabase.auth.admin.updateUserById(
      userId,
      { 
        email_confirm: true,
        user_metadata: { role: role }
      }
    );

    if (updateError) {
      console.error("Error confirming user:", updateError);
      throw updateError;
    }

    console.log("User confirmed successfully:", user);
    
    // Generate a session for the user
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: user.user.email,
      options: {
        redirectTo: `https://ca48e511-da23-4c95-9913-59cb1724cacc.lovableproject.com/auth/callback?role=${role}`
      }
    });

    if (sessionError) {
      console.error("Error generating session:", sessionError);
      throw sessionError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        redirectUrl: sessionData.properties.action_link
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error: any) {
    console.error("Error in confirm-user function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});