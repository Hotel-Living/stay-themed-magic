
import { Link } from "react-router-dom";
import { X, LogOut, User, Home, Hotel, Book, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  signOut: () => Promise<void>;
  getInitials: () => string;
}

export function MobileMenu({ isOpen, onClose, signOut, getInitials }: MobileMenuProps) {
  const { user, profile } = useAuth();
  const { isHotelOwner } = useAuthStatus();

  return (
    <div className={cn(
      "fixed inset-0 top-10 bg-[#860477]/95 backdrop-blur-lg z-40 flex flex-col p-4 gap-3 transition-all duration-300 ease-in-out transform md:hidden",
      isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
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
            <Link to="/" onClick={onClose} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
              <Home className="h-5 w-5" /> HOME
            </Link>
            <Link to="/search" onClick={onClose} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
              <Search className="h-5 w-5" /> EXPLORE
            </Link>
            <Link to="/user-dashboard" onClick={onClose} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
              <User className="h-5 w-5" /> PROFILE
            </Link>
            <Link to="/bookings" onClick={onClose} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
              <Book className="h-5 w-5" /> MY BOOKINGS
            </Link>
            {isHotelOwner && (
              <Link to="/hotel-dashboard" onClick={onClose} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
                <Hotel className="h-5 w-5" /> MY PROPERTIES
              </Link>
            )}
            <Link to="/faq" onClick={onClose} className="text-white font-bold hover:text-white/80 flex items-center gap-2">
              FREQUENTLY ASKED QUESTIONS
            </Link>
            <button 
              onClick={() => { 
                signOut();
                onClose();
              }} 
              className="text-white font-bold hover:text-white/80 flex items-center gap-2 mt-4 text-left"
            >
              <LogOut className="h-5 w-5" /> SIGN OUT
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" onClick={onClose} className="text-white font-bold hover:text-white/80 text-center text-sm">REGISTER</Link>
            <Link to="/login" onClick={onClose} className="text-white font-bold hover:text-white/80 text-center text-sm">LOGIN</Link>
            <Link to="/faq" onClick={onClose} className="text-white font-bold hover:text-white/80 text-center text-sm">FAQ</Link>
            <Link to="/hoteles" onClick={onClose} className="text-white font-bold hover:text-white/80 text-center text-sm">HOTELS</Link>
          </>
        )}
      </nav>
    </div>
  );
}
