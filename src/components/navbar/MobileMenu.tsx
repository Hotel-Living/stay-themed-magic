
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Heart } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  signOut: () => Promise<void>;
  getInitials: () => string;
}

export function MobileMenu({ isOpen, onClose, signOut, getInitials }: MobileMenuProps) {
  const { user, profile } = useAuth();
  const { favorites } = useFavorites();
  
  const handleSignOut = async () => {
    await signOut();
    onClose();
  };
  
  return (
    <div 
      className={cn(
        "fixed inset-0 h-screen bg-[#860477]/95 backdrop-blur-xl translate-x-full transition-transform duration-300 z-40 md:hidden",
        isOpen && "translate-x-0"
      )}
    >
      <div className="container h-full px-4 py-8 flex flex-col">
        {/* User info or sign in/up */}
        {user ? (
          <div className="border-b border-[#c266af]/30 pb-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-14 w-14">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile?.first_name || 'User avatar'} />
                ) : (
                  <AvatarFallback className="bg-fuchsia-800 text-white">{getInitials()}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-semibold text-white">
                  {profile?.first_name && profile?.last_name
                    ? `${profile.first_name} ${profile.last_name}`
                    : 'Welcome'}
                </p>
                <p className="text-sm text-white/70">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                asChild
                className="flex-1" 
                variant="outline"
                onClick={onClose}
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-b border-[#c266af]/30 pb-6 mb-6">
            <p className="text-white mb-4">Sign in to enjoy all features</p>
            <div className="flex gap-3">
              <Button 
                asChild
                variant="outline"
                className="flex-1" 
                onClick={onClose}
              >
                <Link to="/login">Sign in</Link>
              </Button>
              <Button 
                asChild
                className="flex-1"
                onClick={onClose}
              >
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        )}
        
        {/* Main navigation */}
        <nav className="flex flex-col text-lg space-y-5">
          <Link to="/" className="text-white" onClick={onClose}>Home</Link>
          <Link to="/search" className="text-white" onClick={onClose}>Browse Hotels</Link>
          
          {user && (
            <Link 
              to="/favorites" 
              className="text-white flex items-center gap-2" 
              onClick={onClose}
            >
              <Heart className="w-5 h-5" />
              Favorites
              {favorites.length > 0 && (
                <span className="bg-fuchsia-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          )}
          
          {user && (
            <Link to="/bookings" className="text-white" onClick={onClose}>My Bookings</Link>
          )}
          
          <Link to="/services" className="text-white" onClick={onClose}>Our Services</Link>
          <Link to="/values" className="text-white" onClick={onClose}>Our Values</Link>
          <Link to="/customer-service" className="text-white" onClick={onClose}>Customer Service</Link>
          <Link to="/faq" className="text-white" onClick={onClose}>FAQ</Link>
        </nav>
        
        {/* Legal links */}
        <div className="mt-auto pt-6 border-t border-[#c266af]/30">
          <div className="flex gap-4 text-sm text-white/70">
            <Link to="/terms" className="hover:text-white transition" onClick={onClose}>Terms</Link>
            <Link to="/privacy" className="hover:text-white transition" onClick={onClose}>Privacy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
