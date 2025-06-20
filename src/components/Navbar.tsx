import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/hooks/useTranslation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { t } = useTranslation('common');

  const navigation = [
    { name: t('mainNavigation.content.faq'), href: "/faq" },
    { name: t('mainNavigation.content.affinityStays'), href: "/affinity-stays" },
    { name: t('mainNavigation.content.hotels'), href: "/hotels" },
    { name: t('mainNavigation.content.videos'), href: "/videos" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#4B0082] via-[#9400D3] to-[#4B0082] text-white py-4 relative z-20">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Hotel-Living
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`hover:text-gray-200 transition-colors duration-200 ${
                location.pathname === item.href ? "text-yellow-300" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="hover:text-gray-200 transition-colors duration-200"
              >
                <User className="h-5 w-5 inline-block mr-1" />
                Dashboard
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-2 px-4 rounded"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-purple-800 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-2 px-4 hover:bg-purple-700 rounded transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/dashboard"
                  className="block py-2 px-4 hover:bg-purple-700 rounded transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5 inline-block mr-1" />
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/login"
                  className="block py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
