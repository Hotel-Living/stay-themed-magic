
import { Plus, Check, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useComparison } from "./ComparisonContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CompareButtonProps {
  hotelId: string;
  hotelName: string;
  variant?: "icon" | "button";
}

export function CompareButton({ hotelId, hotelName, variant = "icon" }: CompareButtonProps) {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const isCompared = isInComparison(hotelId);

  const handleToggleComparison = () => {
    if (isCompared) {
      removeFromComparison(hotelId);
    } else {
      addToComparison({ id: hotelId, name: hotelName });
    }
  };

  if (variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleToggleComparison}
              className={`p-2 rounded-full transition-colors ${
                isCompared 
                  ? "bg-fuchsia-600 text-white hover:bg-fuchsia-700" 
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-label={isCompared ? "Remove from comparison" : "Add to comparison"}
            >
              {isCompared ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isCompared ? "Remove from comparison" : "Add to comparison"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant={isCompared ? "default" : "outline"}
      size="sm"
      onClick={handleToggleComparison}
      className={isCompared ? "bg-fuchsia-600 hover:bg-fuchsia-700" : ""}
    >
      <Scale className="w-4 h-4 mr-2" />
      {isCompared ? "Remove from comparison" : "Add to comparison"}
    </Button>
  );
}
