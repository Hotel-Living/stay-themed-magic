
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

// Helper function to retry a function with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> {
  let retries = 0;
  
  while (true) {
    try {
      return await fn();
    } catch (error) {
      retries++;
      if (retries > maxRetries) {
        console.error(`Failed after ${maxRetries} retries:`, error);
        throw error;
      }
      
      const delay = initialDelay * Math.pow(2, retries - 1);
      console.log(`Retry ${retries}/${maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  
  try {
    // Get and validate API key with detailed logging
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    console.log(`[${new Date().toISOString()}] Starting notification process`);
    console.log("API Key verification check:");
    console.log("API Key exists:", !!RESEND_API_KEY);
    console.log("API Key length:", RESEND_API_KEY ? RESEND_API_KEY.length : 0);
    console.log("API Key prefix:", RESEND_API_KEY ? `${RESEND_API_KEY.substring(0, 2)}...` : "none");
    
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return new Response(
        JSON.stringify({ error: "Server configuration error: Missing RESEND_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get payload from request
    const payload: WebhookPayload = await req.json();
    
    console.log(`[${new Date().toISOString()}] Received webhook payload:`, JSON.stringify(payload));
    
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
    
    // Validate recipient email - use multiple fallback options for testing
    // First try the submission's recipient_email, then try multiple providers for testing
    const recipientEmails = [
      submission.recipient_email,
      "grand_soiree@yahoo.com", 
      "hotellivingtesting@gmail.com", 
      "hotellivingtesting@outlook.com"
    ].filter(Boolean) as string[];
    
    const primaryRecipient = recipientEmails[0];
    
    if (!primaryRecipient) {
      const errorMsg = "No recipient email provided in submission and no default available";
      console.error(errorMsg);
      return new Response(
        JSON.stringify({ error: errorMsg }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    console.log(`[${new Date().toISOString()}] Primary recipient: ${primaryRecipient}`);
    console.log(`Testing fallback recipients: ${recipientEmails.slice(1).join(', ')}`);
    
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
      console.error(`[${new Date().toISOString()}] Error fetching files:`, filesError);
    }
    
    // Format file links
    const fileLinks = files ? files.map(file => {
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/join-us-uploads/${file.file_path}`;
      return `<p><a href="${publicUrl}" target="_blank">${file.file_name}</a> (${(file.file_size / 1024).toFixed(1)} KB)</p>`;
    }).join("") : "";

    console.log(`[${new Date().toISOString()}] Preparing to send email with files:`, files ? files.length : 0);

    // HTML email content with better formatting for improved deliverability
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
    
    // Try sending to the primary recipient first
    console.log(`[${new Date().toISOString()}] Starting email send to ${primaryRecipient}`);
    
    let emailSent = false;
    let lastError = null;
    
    // Try sending to each recipient in order until one succeeds
    for (const recipient of recipientEmails) {
      try {
        // Use retry mechanism for better reliability
        const emailResponse = await retryWithBackoff(async () => {
          console.log(`[${new Date().toISOString()}] Attempting to send email to: ${recipient}`);
          
          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "Hotel Living <onboarding@resend.dev>",
              to: recipient,
              reply_to: submission.email,
              subject: `New Join Us Application: ${submission.name}`,
              html: htmlContent,
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error(`[${new Date().toISOString()}] Resend API error (${response.status}):`, errorData);
            throw new Error(`Resend API returned ${response.status}: ${JSON.stringify(errorData)}`);
          }
          
          return response.json();
        }, 3, 1000);
        
        console.log(`[${new Date().toISOString()}] Email successfully sent to ${recipient}:`, JSON.stringify(emailResponse));
        emailSent = true;
        
        // Record successful send in database for tracking
        await supabase
          .from("notification_logs")
          .insert([{
            submission_id: submission.id,
            notification_type: "join_us_email",
            recipient_email: recipient,
            status: "success",
            details: JSON.stringify(emailResponse)
          }])
          .select();
        
        break; // Stop trying other recipients if one succeeds
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Failed to send to ${recipient}:`, err);
        lastError = err;
        
        // Log the failure
        try {
          await supabase
            .from("notification_logs")
            .insert([{
              submission_id: submission.id,
              notification_type: "join_us_email",
              recipient_email: recipient,
              status: "error",
              details: err instanceof Error ? err.message : String(err)
            }])
            .select();
        } catch (logError) {
          console.error(`[${new Date().toISOString()}] Failed to log error:`, logError);
        }
      }
    }
    
    if (emailSent) {
      return new Response(
        JSON.stringify({ success: true, message: "Notification sent successfully" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    } else {
      throw new Error(`Failed to send email to any recipient: ${lastError}`);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Function error:`, error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
