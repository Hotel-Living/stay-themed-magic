
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Toggle animation on mount to ensure it starts
  useEffect(() => {
    setIsAnimating(true);
  }, []);
  
  return (
    <Link 
      to="/" 
      className={cn(
        "relative flex items-center justify-center rounded-full overflow-hidden",
        className
      )}
    >
      <div 
        className={cn(
          "absolute inset-0 -z-10 opacity-80",
          isAnimating && "bg-gradient-to-r from-[#4A90E2] via-[#67A9F0] to-[#87CEFA] bg-[length:220%_220%] animate-text-slow"
        )}
      />
      <img 
        src="/lovable-uploads/0f500031-cb6c-4b8d-ade2-551a627a0626.png" 
        alt="Hotel-Living Logo"
        className="h-10 md:h-12 relative z-10"
      />
    </Link>
  );
}
