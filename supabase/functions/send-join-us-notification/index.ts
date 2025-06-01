
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
    console.log(`[${new Date().toISOString()}] === STARTING EMAIL NOTIFICATION PROCESS ===`);
    console.log(`[${new Date().toISOString()}] Request method: ${req.method}`);
    console.log(`[${new Date().toISOString()}] Request headers:`, Object.fromEntries(req.headers.entries()));
    
    // Check for RESEND_API_KEY first
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    console.log(`[${new Date().toISOString()}] RESEND_API_KEY exists: ${!!RESEND_API_KEY}`);
    console.log(`[${new Date().toISOString()}] RESEND_API_KEY length: ${RESEND_API_KEY ? RESEND_API_KEY.length : 0}`);
    
    if (!RESEND_API_KEY) {
      console.error(`[${new Date().toISOString()}] ❌ CRITICAL: Missing RESEND_API_KEY`);
      return new Response(
        JSON.stringify({ 
          error: "Server configuration error: Missing RESEND_API_KEY",
          success: false,
          timestamp: new Date().toISOString()
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get and log payload
    const payloadText = await req.text();
    console.log(`[${new Date().toISOString()}] Raw payload:`, payloadText);
    
    let payload: WebhookPayload;
    try {
      payload = JSON.parse(payloadText);
      console.log(`[${new Date().toISOString()}] Parsed payload:`, JSON.stringify(payload, null, 2));
    } catch (parseError) {
      console.error(`[${new Date().toISOString()}] ❌ Failed to parse payload:`, parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON payload",
          success: false,
          timestamp: new Date().toISOString()
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Validate payload structure
    if (!payload.record || !payload.record.id) {
      console.error(`[${new Date().toISOString()}] ❌ Invalid payload structure:`, payload);
      return new Response(
        JSON.stringify({ 
          error: "Invalid payload structure - missing record or record.id",
          success: false,
          timestamp: new Date().toISOString()
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Only proceed if this is a join_us_submissions insert
    if (payload.table !== "join_us_submissions" || payload.type !== "INSERT") {
      console.log(`[${new Date().toISOString()}] ⚠️ Not a join_us_submissions insert event, skipping`);
      return new Response(
        JSON.stringify({ 
          message: "Not a join_us_submissions insert event",
          success: true,
          timestamp: new Date().toISOString()
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get submission details
    const submission = payload.record;
    const recipientEmail = submission.recipient_email || "fernando_espineira@yahoo.com";
    
    console.log(`[${new Date().toISOString()}] Processing submission ID: ${submission.id}`);
    console.log(`[${new Date().toISOString()}] Recipient email: ${recipientEmail}`);
    console.log(`[${new Date().toISOString()}] Sender: ${submission.name} <${submission.email}>`);
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    
    console.log(`[${new Date().toISOString()}] Supabase URL: ${supabaseUrl}`);
    console.log(`[${new Date().toISOString()}] Service role key exists: ${!!supabaseKey}`);
    
    if (!supabaseUrl || !supabaseKey) {
      console.error(`[${new Date().toISOString()}] ❌ Missing Supabase configuration`);
      return new Response(
        JSON.stringify({ 
          error: "Missing Supabase configuration",
          success: false,
          timestamp: new Date().toISOString()
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Log notification attempt
    console.log(`[${new Date().toISOString()}] Logging notification attempt...`);
    const { error: logError } = await supabase
      .from("notification_logs")
      .insert([{
        submission_id: submission.id,
        notification_type: "join_us_email",
        recipient_email: recipientEmail,
        status: "processing",
        details: "Starting email send process"
      }]);
    
    if (logError) {
      console.error(`[${new Date().toISOString()}] ⚠️ Failed to log notification attempt:`, logError);
    } else {
      console.log(`[${new Date().toISOString()}] ✅ Notification attempt logged`);
    }
    
    // Get files associated with this submission (if any)
    console.log(`[${new Date().toISOString()}] Fetching associated files...`);
    const { data: files, error: filesError } = await supabase
      .from("join_us_files")
      .select("*")
      .eq("submission_id", submission.id);
    
    if (filesError) {
      console.error(`[${new Date().toISOString()}] ⚠️ Error fetching files:`, filesError);
    } else {
      console.log(`[${new Date().toISOString()}] Found ${files ? files.length : 0} files`);
    }
    
    // Format file links (only if files exist)
    const fileLinks = files && files.length > 0 ? files.map(file => {
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/join-us-uploads/${file.file_path}`;
      console.log(`[${new Date().toISOString()}] File link: ${publicUrl}`);
      return `<p><a href="${publicUrl}" target="_blank">${file.file_name}</a> (${(file.file_size / 1024).toFixed(1)} KB)</p>`;
    }).join("") : "";

    console.log(`[${new Date().toISOString()}] Preparing email content...`);

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
    
    console.log(`[${new Date().toISOString()}] Email content prepared, length: ${htmlContent.length} characters`);
    console.log(`[${new Date().toISOString()}] Attempting to send email via Resend API...`);
    console.log(`[${new Date().toISOString()}] To: ${recipientEmail}`);
    console.log(`[${new Date().toISOString()}] Reply-to: ${submission.email}`);
    
    const emailPayload = {
      from: "Hotel Living <onboarding@resend.dev>",
      to: recipientEmail,
      reply_to: submission.email,
      subject: `New Join Us Application: ${submission.name}`,
      html: htmlContent,
    };
    
    console.log(`[${new Date().toISOString()}] Email payload:`, JSON.stringify(emailPayload, null, 2));
    
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    });
    
    console.log(`[${new Date().toISOString()}] Resend API response status: ${emailResponse.status}`);
    console.log(`[${new Date().toISOString()}] Resend API response headers:`, Object.fromEntries(emailResponse.headers.entries()));
    
    const responseText = await emailResponse.text();
    console.log(`[${new Date().toISOString()}] Resend API response body:`, responseText);
    
    let emailResult;
    try {
      emailResult = JSON.parse(responseText);
    } catch (parseError) {
      console.error(`[${new Date().toISOString()}] Failed to parse Resend response:`, parseError);
      emailResult = { raw_response: responseText };
    }
    
    if (!emailResponse.ok) {
      console.error(`[${new Date().toISOString()}] ❌ Resend API error (${emailResponse.status}):`, emailResult);
      
      // Log failure in database
      await supabase
        .from("notification_logs")
        .insert([{
          submission_id: submission.id,
          notification_type: "join_us_email",
          recipient_email: recipientEmail,
          status: "error",
          details: `Resend API error (${emailResponse.status}): ${JSON.stringify(emailResult)}`
        }]);
      
      return new Response(
        JSON.stringify({ 
          error: `Resend API returned ${emailResponse.status}`,
          details: emailResult,
          success: false,
          timestamp: new Date().toISOString()
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    console.log(`[${new Date().toISOString()}] ✅ Email successfully sent via Resend:`, emailResult);
    
    // Record successful send in database
    const { error: successLogError } = await supabase
      .from("notification_logs")
      .insert([{
        submission_id: submission.id,
        notification_type: "join_us_email",
        recipient_email: recipientEmail,
        status: "success",
        details: JSON.stringify(emailResult)
      }]);
    
    if (successLogError) {
      console.error(`[${new Date().toISOString()}] ⚠️ Failed to log success:`, successLogError);
    } else {
      console.log(`[${new Date().toISOString()}] ✅ Success logged to database`);
    }
    
    console.log(`[${new Date().toISOString()}] === EMAIL NOTIFICATION PROCESS COMPLETED SUCCESSFULLY ===`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email notification sent successfully", 
        emailResult,
        timestamp: new Date().toISOString()
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
    
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ CRITICAL FUNCTION ERROR:`, error);
    console.error(`[${new Date().toISOString()}] Error details:`, {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Try to log the error if we have the submission ID
    try {
      const payloadText = await req.clone().text();
      const payload = JSON.parse(payloadText);
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
            details: `Function error: ${error instanceof Error ? error.message : String(error)}`
          }]);
        
        console.log(`[${new Date().toISOString()}] ✅ Error logged to database`);
      }
    } catch (logError) {
      console.error(`[${new Date().toISOString()}] Failed to log error:`, logError);
    }
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : String(error),
        success: false,
        timestamp: new Date().toISOString()
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
