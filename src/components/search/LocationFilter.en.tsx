
import { useState, useEffect } from "react";
import { FilterItem } from "./FilterItem";
import { supabase } from "@/integrations/supabase/client";

interface LocationFilterENProps {
  activeLocation: string | null;
  onChange: (value: string) => void;
}

export function LocationFilterEN({ activeLocation, onChange }: LocationFilterENProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch unique cities from the hotels table
  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('city')
          .order('city');
        
        if (error) {
          console.error('Error fetching cities:', error);
          setCities([]);
        } else {
          // Extract unique cities
          const uniqueCities = [...new Set(data.map(hotel => hotel.city))];
          setCities(uniqueCities);
        }
      } catch (err) {
        console.error('Unexpected error fetching cities:', err);
        setCities([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <FilterItem title="LOCATION">
      {isLoading ? (
        <div className="text-sm text-fuchsia-300/70 italic">Loading cities...</div>
      ) : cities.length === 0 ? (
        <div className="text-sm text-fuchsia-300/70 italic">None</div>
      ) : (
        cities.map(city => (
          <label key={city} className="flex items-start">
            <input 
              type="radio" 
              name="location"
              checked={activeLocation === city}
              onChange={() => onChange(city)}
              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm">{city}</span>
          </label>
        ))
      )}
    </FilterItem>
  );
}
