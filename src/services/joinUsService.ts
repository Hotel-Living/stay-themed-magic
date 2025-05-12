
import { supabase } from "@/integrations/supabase/client";
import { handleApiError } from "@/utils/errorHandling";
import { toast } from "sonner";

export interface JoinUsSubmission {
  name: string;
  email: string;
  message: string;
}

export interface FileUpload {
  file: File;
  path: string;
}

export async function submitJoinUsForm(formData: JoinUsSubmission, files: File[]): Promise<boolean> {
  try {
    // 1. Insert the form submission data
    const { data: submission, error: submissionError } = await supabase
      .from('join_us_submissions')
      .insert([
        { 
          name: formData.name, 
          email: formData.email, 
          message: formData.message 
        }
      ])
      .select()
      .single();
    
    if (submissionError) {
      throw submissionError;
    }
    
    // 2. Upload files if any
    if (files.length > 0) {
      await Promise.all(files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${submission.id}/${fileName}`;
        
        // Upload file to storage bucket
        const { error: uploadError } = await supabase.storage
          .from('join-us-uploads')
          .upload(filePath, file);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get file URL
        const { data: fileUrl } = supabase.storage
          .from('join-us-uploads')
          .getPublicUrl(filePath);
        
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
          throw fileRecordError;
        }
      }));
    }
    
    return true;
  } catch (error) {
    handleApiError(error, "Failed to submit form. Please try again later.", toast);
    return false;
  }
}
