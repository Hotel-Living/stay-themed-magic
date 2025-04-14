
import { useMemo } from "react";

export function useCitiesByCountry(countryCode: string) {
  return useMemo(() => {
    switch(countryCode) {
      case 'spain':
        return ["Madrid", "Barcelona", "Valencia", "Seville"];
      case 'france':
        return ["Paris", "Nice", "Marseille", "Lyon"];
      case 'italy':
        return ["Rome", "Milan", "Venice", "Florence"];
      case 'usa':
        return ["New York", "Los Angeles", "Chicago", "Miami", "Las Vegas", "San Francisco"];
      default:
        return [];
    }
  }, [countryCode]);
}
