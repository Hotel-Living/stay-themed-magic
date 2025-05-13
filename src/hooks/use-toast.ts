import { toast as sonnerToast } from "sonner";

// Hook personalizado
export const useToast = () => {
  return {
    toast: sonnerToast,
    toasts: []
  }
}

export const toast = sonnerToast;
