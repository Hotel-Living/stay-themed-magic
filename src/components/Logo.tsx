
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function Logo({ className }: { className?: string }) {
  const isMobile = useIsMobile();
  
  return (
    <Link 
      to="/" 
      className={className}
    >
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/5f5c42b5-cc7b-443f-b240-095cc0a36efb.png" 
          alt="Hotel-Living Logo"
          className={isMobile ? "h-[60px]" : "h-[60px] w-auto"} 
        />
      </div>
    </Link>
  );
}
