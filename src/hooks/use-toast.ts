
// Import toast functionality from radix UI
import { useToast as useToastPrimitive } from "@/components/ui/toast";

// Re-export the useToast hook with a more descriptive name to avoid conflicts
export const useToast = useToastPrimitive;

// Export the toast function directly
export { toast } from "@/components/ui/toast";
