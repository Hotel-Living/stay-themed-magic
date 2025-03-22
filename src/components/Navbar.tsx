
import { Link } from "react-router-dom";
import { UserCircle2, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-fuchsia-900 backdrop-blur-xl border-b border-fuchsia-700">
      <div className="container px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/search">Search</NavLink>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/faq">FAQ</NavLink>
          <Link 
            to="/login" 
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition"
          >
            Log in
          </Link>
          <Link 
            to="/signup" 
            className="text-sm font-medium bg-primary/90 hover:bg-primary text-white rounded-full px-5 py-2 transition-all duration-300"
          >
            Sign in
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 top-16 bg-fuchsia-900/95 backdrop-blur-lg z-40 flex flex-col p-6 gap-5 transition-all duration-300 ease-in-out transform md:hidden",
        isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <nav className="flex flex-col space-y-5 text-lg">
          <NavLink to="/search" onClick={() => setIsMenuOpen(false)}>Search</NavLink>
          <NavLink to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</NavLink>
          <div className="h-px bg-fuchsia-700 my-2"></div>
          <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Log in</NavLink>
          <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>Sign in</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children, onClick }: { to: string, children: React.ReactNode, onClick?: () => void }) {
  return (
    <Link 
      to={to} 
      className="relative group text-sm font-medium transition-colors text-white"
      onClick={onClick}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}
