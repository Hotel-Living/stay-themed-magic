
import { Link } from "react-router-dom";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={className}>
      <img 
        src="/lovable-uploads/38fb8be7-c721-46fb-88a5-9b75c738a1c1.png" 
        alt="Hotel-Living Logo"
        className="h-10 md:h-12"
      />
    </Link>
  );
}
