
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "./Logo";
import { Menu, X, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 to-fuchsia-900/95 backdrop-blur-sm border-b border-purple-800/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" onClick={closeMobileMenu}>
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-white hover:text-fuchsia-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="text-white hover:text-fuchsia-200 transition-colors font-medium"
            >
              Search Hotels
            </Link>
            <Link 
              to="/featured-hotels" 
              className="text-white hover:text-fuchsia-200 transition-colors font-medium"
            >
              Featured
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard"
                  className="text-white hover:text-fuchsia-200 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-fuchsia-500 text-fuchsia-200 hover:bg-fuchsia-500 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-white hover:text-fuchsia-200 hover:bg-fuchsia-500/20"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    size="sm"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:text-fuchsia-200 hover:bg-fuchsia-500/20 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="py-4 space-y-3 border-t border-purple-800/30">
            <Link 
              to="/" 
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-white hover:text-fuchsia-200 hover:bg-fuchsia-500/20 rounded-md transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/search" 
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-white hover:text-fuchsia-200 hover:bg-fuchsia-500/20 rounded-md transition-colors font-medium"
            >
              Search Hotels
            </Link>
            <Link 
              to="/featured-hotels" 
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-white hover:text-fuchsia-200 hover:bg-fuchsia-500/20 rounded-md transition-colors font-medium"
            >
              Featured
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-white hover:text-fuchsia-200 hover:bg-fuchsia-500/20 rounded-md transition-colors font-medium"
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-white hover:text-fuchsia-200 hover:bg-fuchsia-500/20 rounded-md transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4 inline mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="px-4 space-y-3">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button 
                    variant="outline" 
                    className="w-full border-fuchsia-500 text-fuchsia-200 hover:bg-fuchsia-500 hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={closeMobileMenu}>
                  <Button 
                    className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
