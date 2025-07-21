
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      className="toaster group" 
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          title: "group-[.toast]:text-foreground text-sm font-semibold",
          description: "group-[.toast]:text-muted-foreground text-sm opacity-90",
          success: "bg-[#7E26A6] text-white",
          error: "bg-[#7E26A6] text-white",
          warning: "bg-[#7E26A6] text-white",
          info: "bg-blue-500 text-white",
          loading: "bg-blue-500 text-white"
        }
      }}
    />
  );
}
