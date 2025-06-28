
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tags, Hotel, Shuffle } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
}

interface Theme {
  id: string;
  name: string;
  category: string;
}

export default function FernandoBatchThemeAssignment() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHotels();
    fetchThemes();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('id, name, city, country')
        .eq('status', 'approved')
        .order('name');

      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hotels",
        variant: "destructive"
      });
    }
  };

  const fetchThemes = async () => {
    try {
      const { data, error } = await supabase
        .from('themes')
        .select('id, name, category')
        .eq('level', 1)
        .order('name');

      if (error) throw error;
      setThemes(data || []);
    } catch (error) {
      console.error('Error fetching themes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch themes",
        variant: "destructive"
      });
    }
  };

  const getRandomThemes = (allThemes: Theme[], count: number): Theme[] => {
    const shuffled = [...allThemes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const assignRandomThemesToHotels = async () => {
    if (selectedHotels.length === 0) {
      toast({
        title: "No Hotels Selected",
        description: "Please select at least one hotel",
        variant: "destructive"
      });
      return;
    }

    setIsAssigning(true);
    try {
      const assignmentsToCreate = [];

      for (const hotelId of selectedHotels) {
        // Randomly choose 2 or 3 themes for each hotel
        const themeCount = Math.random() < 0.5 ? 2 : 3;
        const randomThemes = getRandomThemes(themes, themeCount);

        for (const theme of randomThemes) {
          assignmentsToCreate.push({
            hotel_id: hotelId,
            theme_id: theme.id
          });
        }
      }

      // First, remove existing assignments for selected hotels
      const { error: deleteError } = await supabase
        .from('hotel_themes')
        .delete()
        .in('hotel_id', selectedHotels);

      if (deleteError) throw deleteError;

      // Then create new assignments
      const { error: insertError } = await supabase
        .from('hotel_themes')
        .insert(assignmentsToCreate);

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: `Assigned random themes to ${selectedHotels.length} hotels (${assignmentsToCreate.length} total assignments)`,
        variant: "success"
      });

      // Clear selections
      setSelectedHotels([]);

    } catch (error) {
      console.error('Error assigning themes:', error);
      toast({
        title: "Error",
        description: "Failed to assign themes to hotels",
        variant: "destructive"
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const handleHotelSelection = (hotelId: string, checked: boolean) => {
    if (checked) {
      setSelectedHotels(prev => [...prev, hotelId]);
    } else {
      setSelectedHotels(prev => prev.filter(id => id !== hotelId));
    }
  };

  const selectAllHotels = () => {
    setSelectedHotels(hotels.map(hotel => hotel.id));
  };

  const clearAllSelections = () => {
    setSelectedHotels([]);
  };

  const calculateEstimatedAssignments = () => {
    return selectedHotels.length * 2.5; // Average of 2-3 themes per hotel
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6">
      <div className="space-y-6">
        <Card className="bg-purple-800/40 border-purple-600/30 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-700 to-pink-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <Tags className="w-5 h-5" />
              Batch Theme Assignment - Randomized Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-purple-800/60 text-white">
            <p className="text-gray-200 mb-4">
              This tool assigns 2-3 random themes to each selected hotel, creating curated thematic experiences without bulk duplication.
            </p>
            
            <div className="flex gap-4 mb-6">
              <Button 
                onClick={selectAllHotels}
                variant="outline"
                className="border-purple-400 text-purple-100 hover:bg-purple-700"
              >
                Select All Hotels
              </Button>
              <Button 
                onClick={clearAllSelections}
                variant="outline"
                className="border-purple-400 text-purple-100 hover:bg-purple-700"
              >
                Clear Selection
              </Button>
            </div>

            {selectedHotels.length > 0 && (
              <div className="mb-6 p-4 bg-purple-900/60 rounded-lg border border-purple-600/30">
                <h3 className="text-lg font-semibold text-white mb-2">Assignment Summary:</h3>
                <ul className="text-purple-200 space-y-1">
                  <li>• {selectedHotels.length} hotels selected</li>
                  <li>• {themes.length} themes available</li>
                  <li>• ~{Math.round(calculateEstimatedAssignments())} estimated assignments (2-3 per hotel)</li>
                </ul>
                
                <Button
                  onClick={assignRandomThemesToHotels}
                  disabled={isAssigning}
                  className="mt-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  {isAssigning ? 'Assigning Random Themes...' : `Assign Random Themes to ${selectedHotels.length} Hotels`}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-purple-800/40 border-purple-600/30 backdrop-blur-sm">
          <CardHeader className="bg-purple-700/60 text-white border-b border-purple-600/30">
            <CardTitle className="flex items-center gap-2">
              <Hotel className="w-5 h-5" />
              Select Hotels ({selectedHotels.length} selected)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-purple-800/60">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {hotels.map(hotel => (
                <div
                  key={hotel.id}
                  className="flex items-center space-x-3 p-3 bg-purple-900/40 rounded-lg border border-purple-600/20 hover:bg-purple-900/60 transition-colors"
                >
                  <Checkbox
                    id={hotel.id}
                    checked={selectedHotels.includes(hotel.id)}
                    onCheckedChange={(checked) => handleHotelSelection(hotel.id, checked as boolean)}
                    className="border-purple-400 data-[state=checked]:bg-purple-600"
                  />
                  <label htmlFor={hotel.id} className="flex-1 cursor-pointer">
                    <div className="font-medium text-white">{hotel.name}</div>
                    <div className="text-sm text-purple-200">{hotel.city}, {hotel.country}</div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-800/40 border-purple-600/30 backdrop-blur-sm">
          <CardHeader className="bg-purple-700/60 text-white border-b border-purple-600/30">
            <CardTitle>Available Themes ({themes.length} total)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-purple-800/60">
            <p className="text-purple-200 mb-4">
              The system will randomly select 2-3 themes from the {themes.length} available themes for each hotel.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
              {themes.map(theme => (
                <div
                  key={theme.id}
                  className="p-2 bg-purple-900/40 rounded border border-purple-600/20 text-sm text-purple-100"
                >
                  {theme.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
