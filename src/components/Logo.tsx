
import { Link } from "react-router-dom";

export function Logo({ className }: { className?: string }) {
  return (
    <Link 
      to="/" 
      className={className}
    >
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/2b7ba670-5b90-4de2-b91f-e2a999c06b30.png" 
          alt="Hotel-Living Logo"
          className="h-12"
        />
      </div>
    </Link>
  );
}
