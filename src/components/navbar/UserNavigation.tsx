
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/context/LanguageContext";

interface UserNavigationProps {
  getInitials: () => string;
  signOut: () => Promise<void>;
}

export const UserNavigation: React.FC<UserNavigationProps> = ({
  getInitials,
  signOut,
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  if (!user) return null;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer">
          <Avatar className="h-8 w-8 bg-fuchsia-500/20 border border-fuchsia-500/30">
            <AvatarFallback className="text-fuchsia-500 text-sm">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link to="/dashboard">{t("nav.dashboard")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/bookings">{t("nav.bookings")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/favorites">{t("nav.favorites")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut}>{t("nav.logout")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
