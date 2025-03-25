
import { Link } from "react-router-dom";
import { Menu, X, LogOut, User, Home, Hotel, Book, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useAuth } from "@/context/AuthContext";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { isHotelOwner } = useAuthStatus();

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#860477] backdrop-blur-xl border-b border-[#c266af]">
      <div className="container px-4 sm:px-6 py-1 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link 
                to="/" 
                className="text-white font-bold hover:text-white/80 text-sm"
              >
                HOME
              </Link>
              
              <Link 
                to="/search" 
                className="text-white font-bold hover:text-white/80 text-sm"
              >
                EXPLORE
              </Link>
              
              <Link 
                to="/faq" 
                className="text-white font-bold hover:text-white/80 text-sm"
              >
                FAQ
              </Link>
              
              {isHotelOwner && (
                <Link 
                  to="/hotel-dashboard" 
                  className="text-white font-bold hover:text-white/80 text-sm"
                >
                  MY HOTELS
                </Link>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8 border-2 border-white/20">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="bg-fuchsia-600 text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {profile?.first_name ? (
                      <span>Hello, {profile.first_name}!</span>
                    ) : (
                      <span>My Account</span>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/user-dashboard" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookings" className="flex items-center cursor-pointer">
                      <Book className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  {isHotelOwner && (
                    <DropdownMenuItem asChild>
                      <Link to="/hotel-dashboard" className="flex items-center cursor-pointer">
                        <Hotel className="mr-2 h-4 w-4" />
                        <span>My Properties</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link 
                to="/signup" 
                className="text-white font-bold hover:text-white/80 text-sm"
              >
                REGISTER
              </Link>
              <Link 
                to="/login" 
                className="text-white font-bold hover:text-white/80 text-sm"
              >
                LOGIN
              </Link>
              <Link 
                to="/faq" 
                className="text-white font-bold hover:text-white/80 text-sm"
              >
                FAQ
              </Link>
              <Link 
                to="/hoteles" 
                className="text-white font-bold hover:text-white/80 text-sm"
              >
                HOTELS
              </Link>
            </>
          )}
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
        "fixed inset-0 top-10 bg-[#860477]/95 backdrop-blur-lg z-40 flex flex-col p-4 gap-3 transition-all duration-300 ease-in-out transform md:hidden",
        isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <nav className="flex flex-col space-y-4">
          {user ? (
            <>
              <div className="py-3 border-b border-white/10 flex items-center space-x-3">
                <Avatar className="h-10 w-10 border-2 border-white/20">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback className="bg-fuchsia-600 text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">
                    {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : 'My Account'}
                  </p>
                  <p className="text-white/60 text-sm">{user.email}</p>
                </div>
              </div>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
                <Home className="h-5 w-5" /> HOME
              </Link>
              <Link to="/search" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
                <Search className="h-5 w-5" /> EXPLORE
              </Link>
              <Link to="/user-dashboard" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
                <User className="h-5 w-5" /> PROFILE
              </Link>
              <Link to="/bookings" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
                <Book className="h-5 w-5" /> MY BOOKINGS
              </Link>
              {isHotelOwner && (
                <Link to="/hotel-dashboard" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
                  <Hotel className="h-5 w-5" /> MY PROPERTIES
                </Link>
              )}
              <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
                FREQUENTLY ASKED QUESTIONS
              </Link>
              <button 
                onClick={() => { 
                  signOut();
                  setIsMenuOpen(false);
                }} 
                className="text-white font-bold hover:text-white/80 flex items-center gap-2 mt-4 text-left"
              >
                <LogOut className="h-5 w-5" /> SIGN OUT
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-sm">REGISTER</Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-sm">LOGIN</Link>
              <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-sm">FAQ</Link>
              <Link to="/hoteles" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-sm">HOTELS</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
