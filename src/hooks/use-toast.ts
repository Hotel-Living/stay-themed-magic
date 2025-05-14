
import { toast as sonnerToast } from "sonner";

// Create a customized version of sonnerToast that matches what our app expects
const customToast = (message: string | React.ReactNode) => {
  if (typeof message === "string") {
    return sonnerToast(message);
  }
  return sonnerToast(message);
};

// Add methods to match our expected API
customToast.success = (message: string, options?: any) => {
  return sonnerToast.success(options?.description || message);
};

customToast.error = (message: string, options?: any) => {
  return sonnerToast.error(options?.description || message);
};

customToast.warning = (message: string, options?: any) => {
  return sonnerToast.warning(options?.description || message);
};

customToast.info = (message: string, options?: any) => {
  return sonnerToast.info(options?.description || message);
};

// Export the enhanced toast functionality
export const toast = customToast;

// Custom hook for toast functionality
export const useToast = () => {
  return { toast: customToast };
};
