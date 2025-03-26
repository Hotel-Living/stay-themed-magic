
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@/components/ui/avatar";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  signOut: () => Promise<void>;
  getInitials: () => string;
}

export function MobileMenu({ isOpen, onClose, signOut, getInitials }: MobileMenuProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-40 flex md:hidden">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-4/5 max-w-sm bg-card border-r border-border shadow-lg flex flex-col h-full">
        <div className="p-6 border-b border-border">
          {user ? (
            <div className="flex items-center gap-4">
              <Avatar className="bg-fuchsia-600 text-white">
                <span>{getInitials()}</span>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium truncate max-w-[150px]">
                  {user.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link 
                to="/login"
                className="w-full bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-700 transition-colors flex justify-center"
                onClick={onClose}
              >
                {t("nav.login")}
              </Link>
              <Link 
                to="/signup"
                className="w-full border border-fuchsia-600 text-fuchsia-600 px-4 py-2 rounded hover:bg-fuchsia-600/10 transition-colors flex justify-center"
                onClick={onClose}
              >
                {t("nav.signup")}
              </Link>
            </div>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6">
          <ul className="space-y-6">
            <li>
              <Link 
                to="/" 
                className="text-foreground hover:text-fuchsia-400 transition-colors"
                onClick={onClose}
              >
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link 
                to="/search" 
                className="text-foreground hover:text-fuchsia-400 transition-colors"
                onClick={onClose}
              >
                {t("nav.search")}
              </Link>
            </li>
            <li>
              <Link 
                to="/favorites" 
                className="text-foreground hover:text-fuchsia-400 transition-colors"
                onClick={onClose}
              >
                {t("nav.favorites")}
              </Link>
            </li>
            <li>
              <Link 
                to="/bookings" 
                className="text-foreground hover:text-fuchsia-400 transition-colors"
                onClick={onClose}
              >
                {t("nav.bookings")}
              </Link>
            </li>
            {user && (
              <li>
                <button 
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                  className="text-foreground hover:text-fuchsia-400 transition-colors"
                >
                  {t("nav.logout")}
                </button>
              </li>
            )}
          </ul>
          <div className="mt-6 py-4 border-t border-border">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
