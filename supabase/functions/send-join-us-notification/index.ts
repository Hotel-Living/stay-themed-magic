
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.15.0";

interface WebhookPayload {
  type: string;
  table: string;
  record: {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
  };
  schema: string;
  old_record: null;
}

serve(async (req) => {
  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get payload from request
    const payload: WebhookPayload = await req.json();
    
    // Only proceed if this is a join_us_submissions insert
    if (payload.table !== "join_us_submissions" || payload.type !== "INSERT") {
      return new Response(
        JSON.stringify({ message: "Not a join_us_submissions insert event" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get submission details
    const submission = payload.record;
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get files associated with this submission
    const { data: files, error: filesError } = await supabase
      .from("join_us_files")
      .select("*")
      .eq("submission_id", submission.id);
    
    if (filesError) {
      console.error("Error fetching files:", filesError);
    }
    
    // Format file links
    const fileLinks = files ? files.map(file => {
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/join-us-uploads/${file.file_path}`;
      return `<p><a href="${publicUrl}" target="_blank">${file.file_name}</a> (${(file.file_size / 1024).toFixed(1)} KB)</p>`;
    }).join("") : "";

    // Send email using Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Hotel Living <join-us@hotel-living.com>",
        to: "info@hotel-living.com", // Replace with the actual recipient
        subject: `New Join Us Application: ${submission.name}`,
        html: `
          <h2>New Join Us Application</h2>
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> ${submission.email}</p>
          <p><strong>Date:</strong> ${new Date(submission.created_at).toLocaleString()}</p>
          <p><strong>Message:</strong></p>
          <p>${submission.message.replace(/\n/g, "<br>")}</p>
          ${files && files.length > 0 ? `<h3>Uploaded Files:</h3>${fileLinks}` : ""}
        `,
      }),
    });

    const emailResult = await emailResponse.json();
    
    if (!emailResponse.ok) {
      console.error("Email sending failed:", emailResult);
      return new Response(
        JSON.stringify({ error: "Failed to send notification email" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
