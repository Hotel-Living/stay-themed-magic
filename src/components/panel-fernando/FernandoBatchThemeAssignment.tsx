
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tags, Hotel, CheckSquare, Square } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
}

interface Theme {
  id: string;
  name: string;
  level: number;
  category?: string;
}

export default function FernandoBatchThemeAssignment() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all hotels
      const { data: hotelsData, error: hotelsError } = await supabase
        .from('hotels')
        .select('id, name, city, country')
        .eq('status', 'approved')
        .order('name');

      if (hotelsError) throw hotelsError;

      // Fetch ALL themes regardless of level - this includes subcategories and level-3 entries
      const { data: themesData, error: themesError } = await supabase
        .from('themes')
        .select('id, name, level, category')
        .order('name');

      if (themesError) throw themesError;

      setHotels(hotelsData || []);
      setThemes(themesData || []);
      
      console.log(`📊 Loaded ${hotelsData?.length || 0} hotels and ${themesData?.length || 0} themes (all levels)`);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const toggleHotelSelection = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const selectAllHotels = () => {
    if (selectedHotels.length === hotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(hotels.map(hotel => hotel.id));
    }
  };

  const getRandomThemes = (allThemes: Theme[], count: number): Theme[] => {
    const shuffled = [...allThemes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const assignThemesToHotels = async () => {
    if (selectedHotels.length === 0) {
      toast.error('Please select at least one hotel');
      return;
    }

    if (themes.length === 0) {
      toast.error('No themes available');
      return;
    }

    try {
      setAssigning(true);
      
      // Clear existing theme assignments for selected hotels
      const { error: deleteError } = await supabase
        .from('hotel_themes')
        .delete()
        .in('hotel_id', selectedHotels);

      if (deleteError) throw deleteError;

      // Generate assignments - 2 or 3 random themes per hotel
      const assignments = [];
      for (const hotelId of selectedHotels) {
        const themeCount = Math.random() < 0.5 ? 2 : 3; // Random between 2 and 3
        const randomThemes = getRandomThemes(themes, themeCount);
        
        for (const theme of randomThemes) {
          assignments.push({
            hotel_id: hotelId,
            theme_id: theme.id
          });
        }
      }

      // Insert new assignments
      const { error: insertError } = await supabase
        .from('hotel_themes')
        .insert(assignments);

      if (insertError) throw insertError;

      toast.success(`Successfully assigned themes to ${selectedHotels.length} hotels (${assignments.length} total assignments)`);
      setSelectedHotels([]);
      
    } catch (error) {
      console.error('Error assigning themes:', error);
      toast.error('Failed to assign themes');
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-6">
      <div className="space-y-6">
        <Card className="bg-purple-800/50 border-purple-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Tags className="w-5 h-5" />
              Batch Theme Assignment
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p className="mb-4">
              Assign random themes to selected hotels. Each hotel will receive 2-3 randomly selected themes from the full database of {themes.length} available themes.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-800/50 border-purple-600">
          <CardHeader>
            <CardTitle className="text-white">Available Themes ({themes.length} total)</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p className="mb-4">
              The system will randomly select 2-3 themes from the {themes.length} available themes for each hotel, including all subcategories and detailed affinity items.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {themes.slice(0, 20).map((theme) => (
                <div key={theme.id} className="bg-purple-700/30 p-2 rounded text-sm">
                  {theme.name} (L{theme.level})
                </div>
              ))}
              {themes.length > 20 && (
                <div className="bg-purple-700/30 p-2 rounded text-sm text-center">
                  +{themes.length - 20} more themes...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-800/50 border-purple-600">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Hotel className="w-5 h-5" />
              Select Hotels ({selectedHotels.length}/{hotels.length} selected)
            </CardTitle>
            <Button
              onClick={selectAllHotels}
              variant="outline"
              className="bg-purple-700 border-purple-500 text-white hover:bg-purple-600"
            >
              {selectedHotels.length === hotels.length ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Deselect All
                </>
              ) : (
                <>
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Select All
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="flex items-start space-x-2 p-2 bg-purple-700/30 rounded hover:bg-purple-700/50 cursor-pointer"
                  onClick={() => toggleHotelSelection(hotel.id)}
                >
                  <Checkbox
                    checked={selectedHotels.includes(hotel.id)}
                    onChange={() => toggleHotelSelection(hotel.id)}
                    className="mt-1"
                  />
                  <div className="text-white">
                    <div className="font-medium text-sm">{hotel.name}</div>
                    <div className="text-xs text-white/70">
                      {hotel.city}, {hotel.country}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-800/50 border-purple-600">
          <CardContent className="pt-6">
            <Button
              onClick={assignThemesToHotels}
              disabled={selectedHotels.length === 0 || assigning}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white"
            >
              {assigning ? (
                'Assigning Themes...'
              ) : (
                `Assign Random Themes to ${selectedHotels.length} Selected Hotels`
              )}
            </Button>
            {selectedHotels.length > 0 && (
              <p className="text-white/70 text-sm mt-2 text-center">
                Each hotel will receive 2-3 randomly selected themes from the full database
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
