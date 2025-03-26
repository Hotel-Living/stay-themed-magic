
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button 
      variant="ghost" 
      size={isMobile ? "sm" : "icon"} 
      onClick={toggleTheme}
      className="text-white flex items-center gap-1"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-4 w-4" />
          {isMobile && <span>Light Mode</span>}
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          {isMobile && <span>Dark Mode</span>}
        </>
      )}
    </Button>
  );
}
