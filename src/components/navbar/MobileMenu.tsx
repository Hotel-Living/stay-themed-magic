import {
  Search,
  Settings,
  Heart,
  HelpCircle,
  Home,
  Calendar,
  LogOut,
  X
} from "lucide-react";
import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/Logo";
import { useFavorites } from "@/hooks/useFavorites";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  getInitials: () => string;
  signOut: () => Promise<void>;
}

interface MobileNavLinkProps {
  href: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
}

function MobileNavLink({ href, label, icon, onClick }: MobileNavLinkProps) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-3 text-white/90 hover:text-white font-normal"
      asChild
    >
      <Link to={href} onClick={onClick}>
        {icon}
        <span>{label}</span>
      </Link>
    </Button>
  );
}

export function MobileMenu({ 
  getInitials, 
  signOut, 
  isOpen, 
  onClose 
}: MobileMenuProps) {
  const { user } = useAuth();
  const { favorites } = useFavorites();

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-xs bg-gradient-to-b from-fuchsia-950 to-gray-950 p-6 shadow-lg transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Main navigation links */}
          <div className="space-y-3">
            <MobileNavLink href="/search" label="Browse Hotels" icon={<Search className="h-5 w-5" />} onClick={onClose} />
            <MobileNavLink href="/services" label="Our Services" icon={<Settings className="h-5 w-5" />} onClick={onClose} />
            <MobileNavLink href="/values" label="Our Values" icon={<Heart className="h-5 w-5" />} onClick={onClose} />
            <MobileNavLink href="/customer-service" label="Customer Service" icon={<HelpCircle className="h-5 w-5" />} onClick={onClose} />
            
            {/* Add Favorites link for authenticated users */}
            {user && (
              <MobileNavLink 
                href="/favorites" 
                label={
                  <div className="flex items-center">
                    <span>Favorites</span>
                    {favorites.length > 0 && (
                      <span className="ml-2 text-xs bg-fuchsia-500 text-white px-1.5 py-0.5 rounded-full">
                        {favorites.length}
                      </span>
                    )}
                  </div>
                } 
                icon={<Heart className="h-5 w-5" />} 
                onClick={onClose} 
              />
            )}
          </div>

          {/* Authentication section */}
          <div className="pt-6 border-t border-fuchsia-800/20">
            {user ? (
              // User is logged in
              <>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-fuchsia-800/30">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">My Account</p>
                    <p className="text-sm text-white/70">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <MobileNavLink href="/dashboard" label="Dashboard" icon={<Home className="h-5 w-5" />} onClick={onClose} />
                  <MobileNavLink href="/bookings" label="My Bookings" icon={<Calendar className="h-5 w-5" />} onClick={onClose} />
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 text-white/90 hover:text-white font-normal" 
                    onClick={() => { 
                      signOut();
                      onClose();
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              // User is not logged in
              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link to="/login" onClick={onClose}>Sign In</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/signup" onClick={onClose}>Create Account</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
