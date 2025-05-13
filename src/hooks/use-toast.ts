
import { toast as sonnerToast } from "sonner";

// Create a hook interface that's compatible with the existing usage pattern
export const useToast = () => {
  return {
    toast: (props: {
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
      action?: React.ReactNode;
    }) => {
      if (props.variant === "destructive") {
        return sonnerToast.error(props.title, {
          description: props.description,
          action: props.action,
        });
      }
      return sonnerToast(props.title, {
        description: props.description,
        action: props.action,
      });
    },
    toasts: [] // This maintains compatibility with the Toaster component
  };
};

// Export toast directly for cases where it's used without the hook
export const toast = sonnerToast;
