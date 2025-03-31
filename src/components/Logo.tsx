
import { Link } from "react-router-dom";

export function Logo({ className }: { className?: string }) {
  return (
    <Link 
      to="/" 
      className={className}
    >
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/6a8f03bf-4d50-4216-8288-cb10fe973731.png" 
          alt="Hotel-Living Logo"
          className="h-12"
        />
      </div>
    </Link>
  );
}
