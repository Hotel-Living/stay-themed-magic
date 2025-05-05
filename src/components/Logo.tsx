
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
          src="/lovable-uploads/fe0b8f22-ec21-4b14-b6a1-d10b1db86c3f.png" 
          alt="Hotel-Living Logo"
          className={isMobile ? "h-[59.67px]" : "h-[11.7rem]"} // 30% más grande (45.9px * 1.3 = 59.67px) y (9px * 1.3 = 11.7px)
        />
      </div>
    </Link>
  );
}
