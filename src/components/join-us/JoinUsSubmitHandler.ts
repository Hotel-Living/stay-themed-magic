
import { sendJoinUsSubmission } from "@/services/joinUsService";

export interface JoinUsFormData {
  name: string;
  email: string;
  message: string;
}

export interface SubmissionResult {
  success: boolean;
  error?: string;
}

export async function handleJoinUsSubmission(formData: JoinUsFormData): Promise<SubmissionResult> {
  try {
    // Validate required fields
    if (!formData.name.trim()) {
      return { success: false, error: "Name is required" };
    }
    
    if (!formData.email.trim()) {
      return { success: false, error: "Email is required" };
    }
    
    if (!formData.message.trim()) {
      return { success: false, error: "Message is required" };
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { success: false, error: "Please enter a valid email address" };
    }
    
    // Submit the form
    const success = await sendJoinUsSubmission({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });
    
    if (success) {
      return { success: true };
    } else {
      return { success: false, error: "Failed to submit your application. Please try again." };
    }
  } catch (error) {
    console.error("Error in handleJoinUsSubmission:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unexpected error occurred" 
    };
  }
}

// Utility function to reset form
export function createEmptyFormData(): JoinUsFormData {
  return {
    name: "",
    email: "",
    message: ""
  };
}

// Utility function to validate form data
export function validateFormData(formData: JoinUsFormData): string[] {
  const errors: string[] = [];
  
  if (!formData.name.trim()) {
    errors.push("Name is required");
  }
  
  if (!formData.email.trim()) {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }
  }
  
  if (!formData.message.trim()) {
    errors.push("Message is required");
  }
  
  return errors;
}
