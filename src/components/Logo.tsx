
import { Link } from "react-router-dom";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={className}>
      <img 
        src="/lovable-uploads/c3784dc5-56be-4a0f-8737-7cf0cc465105.png" 
        alt="Hotel-Living Logo"
        className="h-10 md:h-12"
      />
    </Link>
  );
}
