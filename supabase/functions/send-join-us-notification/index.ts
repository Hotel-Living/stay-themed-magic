
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface JoinUsSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  recipient_email: string;
}

interface JoinUsFile {
  id: string;
  submission_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("[" + new Date().toISOString() + "] === STARTING EMAIL NOTIFICATION PROCESS ===");

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!RESEND_API_KEY) {
    console.error("[" + new Date().toISOString() + "] Missing RESEND_API_KEY");
    return new Response(
      JSON.stringify({ error: "Missing RESEND_API_KEY" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const payload = await req.json();
    console.log("[" + new Date().toISOString() + "] Processing payload");

    const submission = payload.record as JoinUsSubmission;
    console.log("[" + new Date().toISOString() + "] Processing submission ID:", submission.id);

    // Initialize Supabase client with service role key
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Log notification attempt
    console.log("[" + new Date().toISOString() + "] Logging notification attempt...");
    const { error: logError } = await supabase
      .from('notification_logs')
      .insert({
        submission_id: submission.id,
        recipient_email: submission.recipient_email,
        notification_type: 'join_us_submission',
        status: 'attempting'
      });

    if (logError) {
      console.error("[" + new Date().toISOString() + "] Failed to log notification attempt:", logError);
    }

    // Fetch associated files
    console.log("[" + new Date().toISOString() + "] Fetching associated files...");
    const { data: files, error: filesError } = await supabase
      .from('join_us_files')
      .select('*')
      .eq('submission_id', submission.id);

    if (filesError) {
      console.error("[" + new Date().toISOString() + "] Error fetching files:", filesError);
    }

    console.log("[" + new Date().toISOString() + "] Found", files?.length || 0, "files");

    // Prepare email content
    let emailHtml = `
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
          <p>${submission.message.replace(/\n/g, '<br>')}</p>
        </div>`;

    // Prepare attachments
    const attachments = [];
    
    if (files && files.length > 0) {
      emailHtml += `
        <div class="files-section">
          <h3>Attached Files:</h3>
          <ul>`;

      for (const file of files) {
        console.log("[" + new Date().toISOString() + "] Processing file:", file.file_name);
        
        try {
          // Download file from Supabase storage
          const { data: fileData, error: downloadError } = await supabase.storage
            .from('join-us-uploads')
            .download(file.file_path);

          if (downloadError) {
            console.error("[" + new Date().toISOString() + "] Error downloading file:", downloadError);
            emailHtml += `<li>${file.file_name} (failed to download)</li>`;
          } else {
            console.log("[" + new Date().toISOString() + "] Successfully downloaded file:", file.file_name);
            
            // Convert file to base64 for attachment
            const arrayBuffer = await fileData.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const binaryString = Array.from(uint8Array, byte => String.fromCharCode(byte)).join('');
            const base64Content = btoa(binaryString);
            
            attachments.push({
              filename: file.file_name,
              content: base64Content,
              type: file.file_type,
              disposition: "attachment"
            });

            emailHtml += `<li>${file.file_name} (${(file.file_size / 1024).toFixed(1)} KB)</li>`;
          }
        } catch (fileError) {
          console.error("[" + new Date().toISOString() + "] Error processing file:", file.file_name, fileError);
          emailHtml += `<li>${file.file_name} (processing error)</li>`;
        }
      }

      emailHtml += `</ul></div>`;
    }

    emailHtml += `</body></html>`;

    console.log("[" + new Date().toISOString() + "] Email content prepared, attachments:", attachments.length);

    // Send email via Resend
    console.log("[" + new Date().toISOString() + "] Sending email to:", submission.recipient_email);

    const emailPayload = {
      from: "Hotel Living <onboarding@resend.dev>",
      to: submission.recipient_email,
      reply_to: submission.email,
      subject: `New Join Us Application: ${submission.name}`,
      html: emailHtml,
      ...(attachments.length > 0 && { attachments })
    };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    console.log("[" + new Date().toISOString() + "] Resend API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Resend API error: ${response.status} ${errorText}`);
    }

    const emailResult = await response.json();
    console.log("[" + new Date().toISOString() + "] ✅ Email successfully sent:", emailResult);

    // Log success
    await supabase
      .from('notification_logs')
      .insert({
        submission_id: submission.id,
        recipient_email: submission.recipient_email,
        notification_type: 'join_us_submission',
        status: 'success',
        details: `Email sent with ID: ${emailResult.id}. Attachments: ${attachments.length}`
      });

    console.log("[" + new Date().toISOString() + "] === EMAIL NOTIFICATION PROCESS COMPLETED SUCCESSFULLY ===");

    return new Response(JSON.stringify({ success: true, emailId: emailResult.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error) {
    console.error("[" + new Date().toISOString() + "] Error in send-join-us-notification:", error);

    // Log error to database if possible
    try {
      const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
      const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      
      if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        
        // Get submission ID from request if possible
        let submissionId = 'unknown';
        try {
          const payload = await req.clone().json();
          submissionId = payload.record?.id || 'unknown';
        } catch {
          // Failed to parse request again, use unknown
        }
        
        await supabase
          .from('notification_logs')
          .insert({
            submission_id: submissionId,
            recipient_email: 'unknown',
            notification_type: 'join_us_submission',
            status: 'error',
            details: error instanceof Error ? error.message : String(error)
          });
      }
    } catch (logError) {
      console.error("[" + new Date().toISOString() + "] Failed to log error:", logError);
    }

    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : String(error) 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
