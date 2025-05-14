
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
          success: "bg-green-500 text-white",
          error: "bg-red-500 text-white",
          warning: "bg-yellow-500 text-white",
          info: "bg-blue-500 text-white",
          loading: "bg-blue-500 text-white"
        }
      }}
    />
  );
}
