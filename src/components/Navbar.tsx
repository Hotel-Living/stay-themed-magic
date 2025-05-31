
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/Logo";

interface NavItem {
  href: string;
  label: string;
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getNavItems = () => {
    const baseItems = [
      { href: "/", label: "Home" },
      { href: "/affinity-explorer", label: "Affinity Explorer" },
      { href: "/affinity-stays", label: "Affinity Stays" },
      { href: "/hotels", label: "For Hotels" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" }
    ];

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="bg-background py-4 shadow-sm glass-card">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-gray-300 hover:text-white transition-colors duration-200 ${
                location.pathname === item.href ? "text-white" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.email || "User Avatar"} />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/user-dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-200">
                Login
              </Link>
              <Link to="/register" className=" text-gray-300 hover:text-white transition-colors duration-200">
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs bg-background">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Explore Nomad Stays
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="justify-start"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to={item.href}>{item.label}</Link>
                </Button>
              ))}
              {user ? (
                <>
                  <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link to="/user-dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
