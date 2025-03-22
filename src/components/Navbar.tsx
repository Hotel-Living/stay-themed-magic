
import { Link } from "react-router-dom";
import { UserCircle2, Building2, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-fuchsia-900/20">
      <div className="container px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-2xl font-bold relative group"
          >
            <span className="text-gradient">Hotel-Living.com</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-fuchsia-500 to-fuchsia-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/hotels">Hotels</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
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
            Sign up
          </Link>
          <Link 
            to="/hotel-dashboard" 
            className="text-sm font-medium flex items-center gap-2 text-foreground/80 hover:text-foreground transition-all p-1.5 rounded-full hover:bg-secondary/80"
          >
            <Building2 className="w-5 h-5 text-primary" />
            <span className="sr-only md:not-sr-only">Hotel Portal</span>
          </Link>
          <Link 
            to="/user-dashboard" 
            className="text-sm font-medium flex items-center gap-2 text-foreground/80 hover:text-foreground transition-all p-1.5 rounded-full hover:bg-secondary/80"
          >
            <UserCircle2 className="w-5 h-5 text-primary" />
            <span className="sr-only md:not-sr-only">My Account</span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-fuchsia-400" />
          ) : (
            <Menu className="w-6 h-6 text-fuchsia-400" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 top-16 bg-background/95 backdrop-blur-lg z-40 flex flex-col p-6 gap-5 transition-all duration-300 ease-in-out transform md:hidden",
        isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <nav className="flex flex-col space-y-5 text-lg">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/hotels" onClick={() => setIsMenuOpen(false)}>Hotels</NavLink>
          <NavLink to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</NavLink>
          <div className="h-px bg-fuchsia-900/20 my-2"></div>
          <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Log in</NavLink>
          <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>Sign up</NavLink>
          <NavLink to="/hotel-dashboard" onClick={() => setIsMenuOpen(false)}>Hotel Portal</NavLink>
          <NavLink to="/user-dashboard" onClick={() => setIsMenuOpen(false)}>My Account</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children, onClick }: { to: string, children: React.ReactNode, onClick?: () => void }) {
  return (
    <Link 
      to={to} 
      className="relative group text-sm font-medium transition-colors"
      onClick={onClick}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}
