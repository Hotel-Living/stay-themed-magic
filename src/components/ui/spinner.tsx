import { toast as sonnerToast } from "sonner";

export const useToast = () => {
  return {
    toast: sonnerToast,
    toasts: []
  }
}

export const toast = sonnerToast;
