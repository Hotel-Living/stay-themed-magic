
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
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

    const { email } = await req.json();
    const targetEmail = email || "grand_soiree@yahoo.com";

    // Get the current admin user ID
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .limit(1)
      .single();

    if (adminError || !adminData) {
      return new Response(
        JSON.stringify({ error: "No admin user found in admin_users table" }),
        { 
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const adminUserId = adminData.id;
    console.log("Found admin user ID:", adminUserId);

    // Update the admin user's email in auth.users
    const { data: updateData, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      adminUserId,
      { email: targetEmail }
    );

    if (updateError) {
      console.error("Error updating admin email:", updateError);
      return new Response(
        JSON.stringify({ error: `Failed to update admin email: ${updateError.message}` }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Ensure admin role exists in user_roles table
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .upsert(
        { user_id: adminUserId, role: 'admin' },
        { onConflict: 'user_id,role' }
      );

    if (roleError) {
      console.error("Error ensuring admin role:", roleError);
    }

    // Get updated user info to confirm
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(adminUserId);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Admin email updated to ${targetEmail}`,
        user: {
          id: adminUserId,
          email: userData?.user?.email,
          email_confirmed: userData?.user?.email_confirmed_at !== null
        }
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in restore-admin-access:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to restore admin access" }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
