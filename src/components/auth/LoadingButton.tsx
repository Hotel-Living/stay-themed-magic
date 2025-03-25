
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  loadingText?: string;
}

export function LoadingButton({ 
  children, 
  isLoading, 
  loadingText = "Loading...", 
  className, 
  disabled, 
  ...props 
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn("relative", className)}
      {...props}
    >
      {isLoading && (
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <Loader2 className="h-4 w-4 animate-spin" />
        </span>
      )}
      <span className={cn(isLoading && "pl-6")}>
        {isLoading ? loadingText : children}
      </span>
    </Button>
  );
}
