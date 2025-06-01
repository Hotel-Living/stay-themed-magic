
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
    console.log(`[${new Date().toISOString()}] Starting notification process`);
    
    // Get and validate API key
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return new Response(
        JSON.stringify({ error: "Server configuration error: Missing RESEND_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get payload from request
    const payload: WebhookPayload = await req.json();
    
    console.log(`[${new Date().toISOString()}] Received payload:`, JSON.stringify(payload));
    
    // Only proceed if this is a join_us_submissions insert
    if (payload.table !== "join_us_submissions" || payload.type !== "INSERT") {
      console.log("Not a join_us_submissions insert event, skipping");
      return new Response(
        JSON.stringify({ message: "Not a join_us_submissions insert event" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get submission details
    const submission = payload.record;
    
    // Use default recipient email if none provided
    const recipientEmail = submission.recipient_email || "fernando_espineira@yahoo.com";
    
    console.log(`[${new Date().toISOString()}] Processing submission for recipient: ${recipientEmail}`);
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Log notification attempt
    await supabase
      .from("notification_logs")
      .insert([{
        submission_id: submission.id,
        notification_type: "join_us_email",
        recipient_email: recipientEmail,
        status: "processing",
        details: "Starting email send process"
      }]);
    
    // Get files associated with this submission (if any)
    const { data: files, error: filesError } = await supabase
      .from("join_us_files")
      .select("*")
      .eq("submission_id", submission.id);
    
    if (filesError) {
      console.error(`[${new Date().toISOString()}] Error fetching files:`, filesError);
    }
    
    // Format file links (only if files exist)
    const fileLinks = files && files.length > 0 ? files.map(file => {
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/join-us-uploads/${file.file_path}`;
      return `<p><a href="${publicUrl}" target="_blank">${file.file_name}</a> (${(file.file_size / 1024).toFixed(1)} KB)</p>`;
    }).join("") : "";

    console.log(`[${new Date().toISOString()}] Preparing to send email with files:`, files ? files.length : 0);

    // HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>New Join Us Application</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          h2 {
            color: #8017B0;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .info-section {
            margin-bottom: 20px;
          }
          .label {
            font-weight: bold;
          }
          .files-section {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
          }
          a {
            color: #8017B0;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h2>New Join Us Application</h2>
        <div class="info-section">
          <p><span class="label">Name:</span> ${submission.name}</p>
          <p><span class="label">Email:</span> <a href="mailto:${submission.email}">${submission.email}</a></p>
          <p><span class="label">Date:</span> ${new Date(submission.created_at).toLocaleString()}</p>
        </div>
        <div class="info-section">
          <p><span class="label">Message:</span></p>
          <p>${submission.message.replace(/\n/g, "<br>")}</p>
        </div>
        ${files && files.length > 0 ? 
          `<div class="files-section">
            <h3>Uploaded Files:</h3>
            ${fileLinks}
          </div>` : ""}
      </body>
      </html>
    `;
    
    console.log(`[${new Date().toISOString()}] Attempting to send email to: ${recipientEmail}`);
    
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Hotel Living <onboarding@resend.dev>",
        to: recipientEmail,
        reply_to: submission.email,
        subject: `New Join Us Application: ${submission.name}`,
        html: htmlContent,
      }),
    });
    
    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error(`[${new Date().toISOString()}] Resend API error (${emailResponse.status}):`, errorData);
      
      // Log failure in database
      await supabase
        .from("notification_logs")
        .insert([{
          submission_id: submission.id,
          notification_type: "join_us_email",
          recipient_email: recipientEmail,
          status: "error",
          details: JSON.stringify(errorData)
        }]);
      
      throw new Error(`Resend API returned ${emailResponse.status}: ${JSON.stringify(errorData)}`);
    }
    
    const emailResult = await emailResponse.json();
    console.log(`[${new Date().toISOString()}] Email successfully sent:`, JSON.stringify(emailResult));
    
    // Record successful send in database
    await supabase
      .from("notification_logs")
      .insert([{
        submission_id: submission.id,
        notification_type: "join_us_email",
        recipient_email: recipientEmail,
        status: "success",
        details: JSON.stringify(emailResult)
      }]);
    
    return new Response(
      JSON.stringify({ success: true, message: "Notification sent successfully", emailResult }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Function error:`, error);
    
    // Try to log the error if we have the submission ID
    try {
      const payload = await req.clone().json();
      if (payload?.record?.id) {
        const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        await supabase
          .from("notification_logs")
          .insert([{
            submission_id: payload.record.id,
            notification_type: "join_us_email",
            recipient_email: payload.record.recipient_email || "fernando_espineira@yahoo.com",
            status: "error",
            details: error instanceof Error ? error.message : String(error)
          }]);
      }
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }
    
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
