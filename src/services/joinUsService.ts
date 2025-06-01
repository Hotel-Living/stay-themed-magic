
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
    console.log("Submitting form with data:", formData);
    console.log("Recipient email:", formData.recipientEmail);
    
    // 1. Insert the form submission data
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
      console.error("Submission error:", submissionError);
      throw submissionError;
    }
    
    console.log("Form submission successful, ID:", submission.id);
    
    // 2. Upload files if any
    if (files.length > 0) {
      console.log(`Uploading ${files.length} files...`);
      
      await Promise.all(files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${submission.id}/${fileName}`;
        
        console.log(`Uploading file: ${file.name} to path: ${filePath}`);
        
        // Upload file to storage bucket
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('join-us-uploads')
          .upload(filePath, file);
          
        if (uploadError) {
          console.error("File upload error:", uploadError);
          throw uploadError;
        }
        
        console.log("File uploaded successfully:", uploadData);
        
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
          console.error("File record error:", fileRecordError);
          throw fileRecordError;
        }
        
        console.log("File metadata recorded successfully");
      }));
    }
    
    // 3. Call the edge function directly to send the email notification
    console.log("Calling edge function directly to send notification...");
    
    const { data: functionResponse, error: functionError } = await supabase.functions.invoke('send-join-us-notification', {
      body: {
        type: 'INSERT',
        table: 'join_us_submissions',
        schema: 'public',
        record: submission,
        old_record: null
      }
    });
    
    if (functionError) {
      console.error("Edge function call error:", functionError);
      throw new Error(`Email sending failed: ${functionError.message}`);
    }
    
    console.log("Edge function called successfully:", functionResponse);
    
    // 4. Verify the notification was logged (optional check)
    const { data: notifications, error: notificationError } = await supabase
      .from('notification_logs')
      .select('*')
      .eq('submission_id', submission.id)
      .eq('notification_type', 'join_us_email')
      .order('created_at', { ascending: false });
    
    if (!notificationError && notifications && notifications.length > 0) {
      const latestNotification = notifications[0];
      console.log("Notification status:", latestNotification.status);
      
      if (latestNotification.status === 'error') {
        console.warn("Email delivery failed:", latestNotification.details);
        // Still return true since the form was submitted successfully
        // The email failure is logged but doesn't fail the whole process
      }
    }
    
    console.log("Form submission and email notification completed successfully");
    return true;
    
  } catch (error) {
    console.error("Full form submission error:", error);
    return false;
  }
}
