
import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface FavoriteButtonProps {
  hotelId: string;
  variant?: "icon" | "button";
  className?: string;
}

export function FavoriteButton({ 
  hotelId, 
  variant = "icon",
  className 
}: FavoriteButtonProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const favorited = isFavorite(hotelId);
  
  const handleClick = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save favorites",
      });
      return;
    }
    
    setIsPending(true);
    toggleFavorite(hotelId);
    setIsPending(false);
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        disabled={isPending}
        className={cn(
          "group rounded-full p-2 transition-colors",
          favorited 
            ? "bg-fuchsia-600/20 text-fuchsia-500 hover:bg-fuchsia-600/30" 
            : "bg-black/20 text-white hover:bg-black/30",
          isPending && "opacity-50 cursor-wait",
          className
        )}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-all",
            favorited ? "fill-fuchsia-500" : "fill-transparent group-hover:scale-110"
          )}
        />
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "flex items-center gap-2",
        favorited && "text-fuchsia-500 border-fuchsia-500/30",
        className
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4",
          favorited && "fill-fuchsia-500"
        )}
      />
      {favorited ? "Saved" : "Save"}
    </Button>
  );
}
