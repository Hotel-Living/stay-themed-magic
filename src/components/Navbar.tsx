import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <header className="glass-card fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo className="mr-2" />
          <span className="font-bold text-xl">Hotel-Living</span>
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden text-white focus:outline-none">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Navigation Links */}
        <nav className={`nav absolute top-full left-0 w-full glass-card rounded-b-md shadow-lg py-4 px-6 flex flex-col items-center space-y-4 lg:static lg:shadow-none lg:px-0 lg:py-0 lg:flex-row lg:items-center lg:space-x-6 ${isMenuOpen ? '' : 'hidden lg:flex'}`}>
          <Link to="/" className="text-white hover:text-gray-300">
            {t('navbar.home')}
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            {t('navbar.about')}
          </Link>
          <Link to="/faq" className="text-white hover:text-gray-300">
            {t('navbar.faq')}
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300">
            {t('navbar.contact')}
          </Link>
          
          {user ? (
            <>
              <Link to="/user-dashboard" className="text-white hover:text-gray-300 flex items-center">
                <User className="w-4 h-4 mr-1" />
                {t('navbar.dashboard')}
              </Link>
              <Button size="sm" variant="secondary" onClick={handleSignOut}>
                {t('navbar.signOut')}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">
                {t('navbar.login')}
              </Link>
              <Link to="/signup" className="text-white hover:text-gray-300">
                {t('navbar.signUp')}
              </Link>
            </>
          )}

          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
