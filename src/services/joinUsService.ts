
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const sendJoinUsSubmission = async (formData: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    // Save the form submission to the database
    const { data: submission, error: dbError } = await supabase
      .from("join_us_submissions")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ])
      .select()
      .single();

    if (dbError || !submission) {
      console.error("Database insertion failed:", dbError);
      return false;
    }

    // Directly call the edge function to send the email
    const { error: fnError } = await supabase.functions.invoke("send-join-us-notification", {
      body: { submission },
    });

    if (fnError) {
      console.error("Edge function invocation failed:", fnError);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Unexpected error in sendJoinUsSubmission:", error);
    return false;
  }
};

// Legacy function exports for compatibility (keeping existing interface)
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
  // Redirect to the new simplified function
  return await sendJoinUsSubmission({
    name: formData.name,
    email: formData.email,
    message: formData.message,
  });
}
