
import React from "react";
import { toast as sonnerToast } from "sonner";

// Add Spinner component export
export const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
    </div>
  );
};

export const useToast = () => {
  return {
    toast: sonnerToast,
    toasts: []
  }
}

export const toast = sonnerToast;
