
import { Link } from "react-router-dom";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={className}>
      <img 
        src="/lovable-uploads/0f500031-cb6c-4b8d-ade2-551a627a0626.png" 
        alt="Hotel-Living Logo"
        className="h-10 md:h-12"
      />
    </Link>
  );
}
