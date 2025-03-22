
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#9E0078] backdrop-blur-xl border-b border-[#c266af]">
      <div className="container px-4 sm:px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo className="animate-floating" />
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <Link 
            to="/signup" 
            className="bg-white text-[#9E0078] hover:bg-white/90 px-3 py-1 text-sm"
          >
            REGISTER
          </Link>
          <Link 
            to="/login" 
            className="bg-white text-[#9E0078] hover:bg-white/90 px-3 py-1 text-sm"
          >
            LOGIN
          </Link>
          <Link 
            to="/faq" 
            className="bg-white text-[#9E0078] hover:bg-white/90 px-3 py-1 text-sm"
          >
            FAQ
          </Link>
          <Link 
            to="/hoteles" 
            className="bg-white text-[#9E0078] hover:bg-white/90 px-3 py-1 text-sm"
          >
            HOTELS
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 top-12 bg-[#9E0078]/95 backdrop-blur-lg z-40 flex flex-col p-4 gap-3 transition-all duration-300 ease-in-out transform md:hidden",
        isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <nav className="flex flex-col space-y-2">
          <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="bg-white text-[#9E0078] py-1 text-center text-sm">REGISTER</Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-white text-[#9E0078] py-1 text-center text-sm">LOGIN</Link>
          <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="bg-white text-[#9E0078] py-1 text-center text-sm">FAQ</Link>
          <Link to="/hoteles" onClick={() => setIsMenuOpen(false)} className="bg-white text-[#9E0078] py-1 text-center text-sm">HOTELS</Link>
        </nav>
      </div>
    </header>
  );
}
