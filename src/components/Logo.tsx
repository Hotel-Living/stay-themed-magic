import { Link } from "react-router-dom";

export function Logo({ className }: { className?: string }) {
  return (
    <Link 
      to="/" 
      className={className}
    >
      {/* Logo has been removed as requested */}
    </Link>
  );
}
