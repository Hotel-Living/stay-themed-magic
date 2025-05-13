
// This declaration file ensures all components have proper typings

import { BadgeProps } from "@/components/ui/badge";
import { PasswordFieldProps } from "@/components/auth/PasswordField";

// Fix for Badge component props in HotelCard.tsx
declare module '@/components/ui/badge' {
  interface BadgeProps {
    className?: string;
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "error";
  }
}

// Fix for PasswordField component props in LoginForm.tsx
declare module '@/components/auth/PasswordField' {
  interface PasswordFieldProps {
    id: string;
    label: string;
    value?: any;
    onChange?: (e: any) => any;
    placeholder?: string;
    showPassword?: boolean;
    toggleShowPassword?: () => any;
    inputClassName?: string;
  }
}
