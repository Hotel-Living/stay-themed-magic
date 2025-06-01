
import { supabase } from "@/integrations/supabase/client";
import { handleApiError } from "@/utils/errorHandling";
import { toast } from "sonner";

export interface JoinUsSubmission {
  name: string;
  email: string;
  message: string;
  recipientEmail?: string;
}

export interface FileUpload {
  file: File;
  path: string;
}

export async function submitJoinUsForm(formData: JoinUsSubmission, files: File[]): Promise<boolean> {
  try {
    console.log("=== STARTING FORM SUBMISSION ===");
    console.log("Form data:", formData);
    console.log("Files count:", files.length);
    console.log("Recipient email:", formData.recipientEmail);
    
    // 1. Insert the form submission data
    console.log("Step 1: Saving form submission to database...");
    const { data: submission, error: submissionError } = await supabase
      .from('join_us_submissions')
      .insert([
        { 
          name: formData.name, 
          email: formData.email, 
          message: formData.message,
          recipient_email: formData.recipientEmail || "fernando_espineira@yahoo.com"
        }
      ])
      .select()
      .single();
    
    if (submissionError) {
      console.error("❌ Database submission failed:", submissionError);
      throw new Error(`Database error: ${submissionError.message}`);
    }
    
    console.log("✅ Form submission saved with ID:", submission.id);
    
    // 2. Upload files if any
    if (files.length > 0) {
      console.log(`Step 2: Uploading ${files.length} files...`);
      
      try {
        await Promise.all(files.map(async (file, index) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const filePath = `${submission.id}/${fileName}`;
          
          console.log(`Uploading file ${index + 1}: ${file.name} to path: ${filePath}`);
          
          // Upload file to storage bucket
          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('join-us-uploads')
            .upload(filePath, file);
            
          if (uploadError) {
            console.error(`❌ File upload failed for ${file.name}:`, uploadError);
            throw new Error(`File upload failed: ${uploadError.message}`);
          }
          
          console.log(`✅ File ${file.name} uploaded successfully:`, uploadData);
          
          // Record file metadata in the database
          const { error: fileRecordError } = await supabase
            .from('join_us_files')
            .insert([
              { 
                submission_id: submission.id,
                file_name: file.name,
                file_path: filePath,
                file_type: file.type,
                file_size: file.size
              }
            ]);
            
          if (fileRecordError) {
            console.error(`❌ File metadata recording failed for ${file.name}:`, fileRecordError);
            throw new Error(`File metadata error: ${fileRecordError.message}`);
          }
          
          console.log(`✅ File metadata recorded for ${file.name}`);
        }));
        
        console.log("✅ All files uploaded and recorded successfully");
      } catch (fileError) {
        console.error("❌ File processing failed:", fileError);
        // Continue with email sending even if file upload fails
        console.log("⚠️ Continuing with email sending despite file upload failure");
      }
    } else {
      console.log("Step 2: No files to upload");
    }
    
    // 3. Call the edge function directly to send the email notification
    console.log("Step 3: Calling edge function to send email notification...");
    console.log("Calling send-join-us-notification with payload:", {
      type: 'INSERT',
      table: 'join_us_submissions',
      schema: 'public',
      record: submission,
      old_record: null
    });
    
    const { data: functionResponse, error: functionError } = await supabase.functions.invoke('send-join-us-notification', {
      body: {
        type: 'INSERT',
        table: 'join_us_submissions',
        schema: 'public',
        record: submission,
        old_record: null
      }
    });
    
    console.log("Edge function response:", functionResponse);
    console.log("Edge function error:", functionError);
    
    if (functionError) {
      console.error("❌ Edge function call failed:", functionError);
      
      // Log the failed attempt
      await supabase
        .from('notification_logs')
        .insert([{
          submission_id: submission.id,
          notification_type: 'join_us_email',
          recipient_email: formData.recipientEmail || "fernando_espineira@yahoo.com",
          status: 'error',
          details: `Edge function error: ${functionError.message}`
        }]);
      
      throw new Error(`Email sending failed: ${functionError.message}`);
    }
    
    console.log("✅ Edge function called successfully");
    
    // 4. Verify the notification was processed
    console.log("Step 4: Verifying email notification was processed...");
    
    // Wait a moment for the notification to be logged
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { data: notifications, error: notificationError } = await supabase
      .from('notification_logs')
      .select('*')
      .eq('submission_id', submission.id)
      .eq('notification_type', 'join_us_email')
      .order('created_at', { ascending: false });
    
    if (!notificationError && notifications && notifications.length > 0) {
      const latestNotification = notifications[0];
      console.log("Latest notification status:", latestNotification.status);
      console.log("Notification details:", latestNotification.details);
      
      if (latestNotification.status === 'error') {
        console.warn("⚠️ Email delivery failed but form was submitted:", latestNotification.details);
        // Show warning but don't fail the whole process
        toast.warning("Form submitted but email delivery failed. We'll contact you manually.", {
          style: {
            background: "#f59e0b",
            color: "white",
            border: "1px solid #d97706"
          }
        });
        return true; // Still return true since form was submitted
      } else if (latestNotification.status === 'success') {
        console.log("✅ Email notification confirmed successful");
      }
    } else {
      console.warn("⚠️ No notification logs found, but continuing...");
    }
    
    console.log("=== FORM SUBMISSION COMPLETED SUCCESSFULLY ===");
    return true;
    
  } catch (error) {
    console.error("❌ FULL FORM SUBMISSION ERROR:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Try to log the error if we have enough information
    try {
      await supabase
        .from('notification_logs')
        .insert([{
          submission_id: 'unknown',
          notification_type: 'join_us_email',
          recipient_email: formData.recipientEmail || "fernando_espineira@yahoo.com",
          status: 'error',
          details: `Form submission error: ${error instanceof Error ? error.message : String(error)}`
        }]);
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }
    
    return false;
  }
}
