
import React, { useState, useEffect } from "react";
import { Search, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { AffinitySection } from "@/components/affinity-explorer/AffinitySection";
import { AffinityFilters } from "@/components/affinity-explorer/AffinityFilters";

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  price_per_month: number;
  main_image_url: string;
  property_style?: string;
  themes: Array<{ id: string; name: string; category?: string }>;
}

interface AffinityCategory {
  name: string;
  hotels: Hotel[];
  emoji: string;
}

export default function AffinityExplorer() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [affinityCategories, setAffinityCategories] = useState<AffinityCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");

  useEffect(() => {
    fetchHotelsWithThemes();
  }, []);

  useEffect(() => {
    organizeHotelsByAffinities();
  }, [hotels, searchTerm, selectedCountry, selectedExperience, selectedDuration]);

  const fetchHotelsWithThemes = async () => {
    try {
      setIsLoading(true);
      const { data: hotelsData, error } = await supabase
        .from('hotels')
        .select(`
          id,
          name,
          city,
          country,
          price_per_month,
          main_image_url,
          property_style,
          hotel_themes(
            themes(
              id,
              name,
              category
            )
          )
        `)
        .eq('status', 'approved');

      if (error) throw error;

      const processedHotels = hotelsData?.map(hotel => ({
        ...hotel,
        themes: hotel.hotel_themes?.map(ht => ht.themes).filter(Boolean) || []
      })) || [];

      setHotels(processedHotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const organizeHotelsByAffinities = () => {
    let filteredHotels = hotels;

    // Apply filters
    if (selectedCountry) {
      filteredHotels = filteredHotels.filter(hotel => hotel.country === selectedCountry);
    }

    if (selectedExperience) {
      filteredHotels = filteredHotels.filter(hotel => 
        hotel.themes.some(theme => theme.category === selectedExperience)
      );
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filteredHotels = filteredHotels.filter(hotel =>
        hotel.name.toLowerCase().includes(lowerSearchTerm) ||
        hotel.themes.some(theme => theme.name.toLowerCase().includes(lowerSearchTerm))
      );
    }

    // Group hotels by affinity themes
    const affinityMap = new Map<string, Hotel[]>();
    
    filteredHotels.forEach(hotel => {
      hotel.themes.forEach(theme => {
        if (!affinityMap.has(theme.name)) {
          affinityMap.set(theme.name, []);
        }
        affinityMap.get(theme.name)?.push(hotel);
      });
    });

    // Convert to array and add emojis
    const categories: AffinityCategory[] = Array.from(affinityMap.entries()).map(([name, hotels]) => ({
      name,
      hotels: Array.from(new Set(hotels.map(h => h.id))).map(id => hotels.find(h => h.id === id)!),
      emoji: getEmojiForAffinity(name)
    })).filter(category => category.hotels.length > 0);

    setAffinityCategories(categories);
  };

  const getEmojiForAffinity = (affinity: string): string => {
    const emojiMap: Record<string, string> = {
      'Art': '🎨',
      'Dance': '🕺',
      'Cinema': '🎬',
      'Music': '🎵',
      'Meditation': '🧘',
      'Yoga': '🧘‍♀️',
      'Fitness': '💪',
      'Nature': '🌿',
      'Beach': '🏖️',
      'Mountain': '⛰️',
      'City': '🏙️',
      'Culture': '🏛️',
      'Food': '🍽️',
      'Wine': '🍷',
      'Adventure': '🎯',
      'Relaxation': '🛀',
      'Business': '💼',
      'Family': '👨‍👩‍👧‍👦'
    };
    
    return emojiMap[affinity] || '✨';
  };

  const getUniqueCountries = () => {
    return Array.from(new Set(hotels.map(hotel => hotel.country))).sort();
  };

  const getUniqueExperiences = () => {
    const experiences = new Set<string>();
    hotels.forEach(hotel => {
      hotel.themes.forEach(theme => {
        if (theme.category) {
          experiences.add(theme.category);
        }
      });
    });
    return Array.from(experiences).sort();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0B2E] via-[#2D1B4E] to-[#0F051A]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🔍 Affinity Explorer
          </h1>
          <p className="text-xl text-fuchsia-200 max-w-2xl mx-auto">
            Discover hotels that match your passions and interests. 
            Explore unique stays curated by affinities.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-fuchsia-400" />
              <Input
                placeholder="Search affinities or hotel themes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-fuchsia-950/30 border-fuchsia-900/20 text-white placeholder:text-fuchsia-300/50"
              />
            </div>

            <AffinityFilters
              countries={getUniqueCountries()}
              experiences={getUniqueExperiences()}
              selectedCountry={selectedCountry}
              selectedExperience={selectedExperience}
              selectedDuration={selectedDuration}
              onCountryChange={setSelectedCountry}
              onExperienceChange={setSelectedExperience}
              onDurationChange={setSelectedDuration}
            />
          </div>
        </div>

        {/* Affinity Categories */}
        <div className="space-y-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-fuchsia-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-fuchsia-200">Loading affinities...</p>
            </div>
          ) : affinityCategories.length > 0 ? (
            affinityCategories.map((category) => (
              <AffinitySection
                key={category.name}
                category={category}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-fuchsia-200 mb-4">No hotels found for your search criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCountry("");
                  setSelectedExperience("");
                  setSelectedDuration("");
                }}
                variant="outline"
                className="border-fuchsia-400 text-fuchsia-400 hover:bg-fuchsia-400 hover:text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
