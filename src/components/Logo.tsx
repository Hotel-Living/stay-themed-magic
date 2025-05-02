
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function Logo({ className }: { className?: string }) {
  const isMobile = useIsMobile();
  
  return (
    <Link 
      to="/" 
      className={className}
    >
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/6a8f03bf-4d50-4216-8288-cb10fe973731.png" 
          alt="Hotel-Living Logo"
          className={isMobile ? "h-[45.9px]" : "h-9"} // 10% smaller from original 51px
        />
      </div>
    </Link>
  );
}
