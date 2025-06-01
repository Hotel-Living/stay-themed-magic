
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
        
        // Get file URL
        const { data: fileUrl } = supabase.storage
          .from('join-us-uploads')
          .getPublicUrl(filePath);
        
        console.log("File public URL:", fileUrl);
        
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
    
    // Wait a moment to allow the database trigger to fire
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error("Full form submission error:", error);
    
    // Return false instead of throwing to let the form handle the error display
    return false;
  }
}
