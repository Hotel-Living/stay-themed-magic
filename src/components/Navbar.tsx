
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useNavbar } from "@/hooks/useNavbar";
import { DesktopNavigation } from "./navbar/DesktopNavigation";
import { MobileMenu } from "./navbar/MobileMenu";

export function Navbar() {
  const { isMenuOpen, toggleMenu, closeMenu, getInitials, signOut } = useNavbar();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#860477] backdrop-blur-xl border-b border-[#c266af]">
      <div className="container px-4 sm:px-6 py-1 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
        </div>
        
        <DesktopNavigation getInitials={getInitials} signOut={signOut} />
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={toggleMenu}
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
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={closeMenu} 
        signOut={signOut} 
        getInitials={getInitials} 
      />
    </header>
  );
}
