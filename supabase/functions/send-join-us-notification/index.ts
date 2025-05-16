
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
    recipient_email: string | null;
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
        JSON.stringify({ error: "Server configuration error: Missing RESEND_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get payload from request
    const payload: WebhookPayload = await req.json();
    
    console.log("Received webhook payload:", JSON.stringify(payload));
    
    // Only proceed if this is a join_us_submissions insert
    if (payload.table !== "join_us_submissions" || payload.type !== "INSERT") {
      console.log("Not a join_us_submissions insert event, skipping");
      return new Response(
        JSON.stringify({ message: "Not a join_us_submissions insert event" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get submission details
    const submission = payload.record;
    
    // Validate recipient email - THIS IS THE VALIDATION ENHANCEMENT
    const recipientEmail = submission.recipient_email || "grand_soiree@yahoo.com";
    if (!recipientEmail) {
      const errorMsg = "No recipient email provided in submission and no default available";
      console.error(errorMsg);
      return new Response(
        JSON.stringify({ error: errorMsg }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log("Sending notification to:", recipientEmail);
    
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

    console.log("Preparing to send email with payload:", {
      recipientEmail,
      hasFiles: files ? files.length > 0 : false,
      submissionName: submission.name
    });

    // Send email using Resend directly
    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Hotel Living <notifications@resend.dev>", // Using Resend's default verified domain
          to: recipientEmail,
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
      console.log("Email sending result:", emailResult);
      
      if (!emailResponse.ok) {
        console.error("Email sending failed:", emailResult);
        return new Response(
          JSON.stringify({ error: "Failed to send notification email", details: emailResult }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Notification sent successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: emailError.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
