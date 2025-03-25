
import { Link } from "react-router-dom";
import { LogOut, User, Hotel, Book } from "lucide-react";
import { Profile } from "@/integrations/supabase/types-custom";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserNavigationProps {
  profile: Profile | null;
  getInitials: () => string;
  signOut: () => Promise<void>;
}

export function UserNavigation({ profile, getInitials, signOut }: UserNavigationProps) {
  const { isHotelOwner } = useAuthStatus();

  return (
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
  );
}
