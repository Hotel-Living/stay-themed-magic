
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
    
    console.log("Form submission completed successfully");
    
    // 3. Try to call the edge function directly as backup (in case trigger fails)
    try {
      console.log("Calling edge function directly as backup...");
      const { error: functionError } = await supabase.functions.invoke('send-join-us-notification', {
        body: {
          type: 'INSERT',
          table: 'join_us_submissions',
          schema: 'public',
          record: submission,
          old_record: null
        }
      });
      
      if (functionError) {
        console.warn("Direct function call failed:", functionError);
      } else {
        console.log("Direct function call succeeded");
      }
    } catch (directCallError) {
      console.warn("Direct function call error:", directCallError);
    }
    
    // 4. Wait for notification to be processed and check status
    console.log("Waiting for email notification to be sent...");
    await new Promise(resolve => setTimeout(resolve, 5000)); // Increased wait time
    
    // 5. Check if the email notification was sent successfully
    const { data: notifications, error: notificationError } = await supabase
      .from('notification_logs')
      .select('*')
      .eq('submission_id', submission.id)
      .eq('notification_type', 'join_us_email')
      .order('created_at', { ascending: false });
    
    if (notificationError) {
      console.error("Error checking notification status:", notificationError);
      // Don't fail the whole process if we can't check the notification status
    }
    
    console.log("Notification status check result:", notifications);
    
    // Check if we have a successful notification
    const hasSuccessfulNotification = notifications && notifications.some(n => n.status === 'success');
    
    if (hasSuccessfulNotification) {
      console.log("Email notification sent successfully");
      return true;
    } else {
      console.warn("Email notification may not have been sent successfully");
      // Check if there are any error notifications
      const hasErrorNotification = notifications && notifications.some(n => n.status === 'error');
      if (hasErrorNotification) {
        const errorNotification = notifications.find(n => n.status === 'error');
        console.error("Email delivery failed:", errorNotification);
      }
      // Still return true since the form was submitted successfully
      // The notification system runs independently
      return true;
    }
  } catch (error) {
    console.error("Full form submission error:", error);
    return false;
  }
}
