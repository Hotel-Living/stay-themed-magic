
import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

type ComparedHotel = {
  id: string;
  name: string;
};

interface ComparisonContextType {
  comparedHotels: ComparedHotel[];
  addToComparison: (hotel: ComparedHotel) => void;
  removeFromComparison: (hotelId: string) => void;
  clearComparison: () => void;
  isInComparison: (hotelId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
}

interface ComparisonProviderProps {
  children: ReactNode;
}

const MAX_COMPARED_HOTELS = 3;

export function ComparisonProvider({ children }: ComparisonProviderProps) {
  const [comparedHotels, setComparedHotels] = useState<ComparedHotel[]>([]);
  const { toast } = useToast();

  const addToComparison = useCallback((hotel: ComparedHotel) => {
    if (comparedHotels.length >= MAX_COMPARED_HOTELS) {
      toast({
        title: "Comparison limit reached",
        description: `You can compare up to ${MAX_COMPARED_HOTELS} hotels at once.`,
        variant: "destructive",
      });
      return;
    }

    if (comparedHotels.some(h => h.id === hotel.id)) {
      toast({
        title: "Already in comparison",
        description: `${hotel.name} is already in your comparison list.`,
      });
      return;
    }

    setComparedHotels(prev => [...prev, hotel]);
    toast({
      title: "Added to comparison",
      description: `${hotel.name} has been added to your comparison list.`,
    });
  }, [comparedHotels, toast]);

  const removeFromComparison = useCallback((hotelId: string) => {
    setComparedHotels(prev => prev.filter(hotel => hotel.id !== hotelId));
  }, []);

  const clearComparison = useCallback(() => {
    setComparedHotels([]);
  }, []);

  const isInComparison = useCallback((hotelId: string) => {
    return comparedHotels.some(hotel => hotel.id === hotelId);
  }, [comparedHotels]);

  return (
    <ComparisonContext.Provider value={{
      comparedHotels,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison
    }}>
      {children}
    </ComparisonContext.Provider>
  );
}
