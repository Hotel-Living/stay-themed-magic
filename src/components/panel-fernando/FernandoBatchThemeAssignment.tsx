
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, Tags, Hotel, CheckCircle } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  status: string;
}

interface Theme {
  id: string;
  name: string;
  category: string;
  level: number;
}

export default function FernandoBatchThemeAssignment() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHotels();
    fetchThemes();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('id, name, city, country, status')
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
    } finally {
      setLoading(false);
    }
  };

  const fetchThemes = async () => {
    try {
      const { data, error } = await supabase
        .from('themes')
        .select('id, name, category, level')
        .order('category, level, name');

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

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredThemes = themes.filter(theme =>
    filterCategory === "all" || theme.category === filterCategory
  );

  const uniqueCategories = [...new Set(themes.map(t => t.category))];

  const handleHotelSelect = (hotelId: string, checked: boolean) => {
    if (checked) {
      setSelectedHotels([...selectedHotels, hotelId]);
    } else {
      setSelectedHotels(selectedHotels.filter(id => id !== hotelId));
    }
  };

  const handleThemeSelect = (themeId: string, checked: boolean) => {
    if (checked) {
      setSelectedThemes([...selectedThemes, themeId]);
    } else {
      setSelectedThemes(selectedThemes.filter(id => id !== themeId));
    }
  };

  const selectAllHotels = () => {
    setSelectedHotels(filteredHotels.map(h => h.id));
  };

  const clearHotelSelection = () => {
    setSelectedHotels([]);
  };

  const selectAllThemes = () => {
    setSelectedThemes(filteredThemes.map(t => t.id));
  };

  const clearThemeSelection = () => {
    setSelectedThemes([]);
  };

  const assignThemesToHotels = async () => {
    if (selectedHotels.length === 0 || selectedThemes.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one hotel and one theme",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);

    try {
      // Create all hotel-theme combinations
      const assignments = [];
      for (const hotelId of selectedHotels) {
        for (const themeId of selectedThemes) {
          assignments.push({
            hotel_id: hotelId,
            theme_id: themeId
          });
        }
      }

      console.log(`Creating ${assignments.length} theme assignments...`);

      // Insert the assignments (using upsert to avoid duplicates)
      const { error } = await supabase
        .from('hotel_themes')
        .upsert(assignments, { 
          onConflict: 'hotel_id,theme_id',
          ignoreDuplicates: true 
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: `Successfully assigned ${selectedThemes.length} themes to ${selectedHotels.length} hotels`,
      });

      // Clear selections
      setSelectedHotels([]);
      setSelectedThemes([]);

    } catch (error) {
      console.error('Error assigning themes:', error);
      toast({
        title: "Error",
        description: "Failed to assign themes to hotels",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Tags className="w-5 h-5" />
            Batch Theme Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 mb-6">
            Assign themes to multiple hotels at once. Select hotels and themes, then click "Assign Themes" to create the associations.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hotels Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Hotel className="w-5 h-5" />
                  Hotels ({selectedHotels.length} selected)
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={selectAllHotels}
                    disabled={loading}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearHotelSelection}
                    disabled={selectedHotels.length === 0}
                  >
                    Clear
                  </Button>
                </div>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search hotels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="border rounded-lg max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-2 p-4">
                    {filteredHotels.map((hotel) => (
                      <div key={hotel.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                        <Checkbox
                          id={`hotel-${hotel.id}`}
                          checked={selectedHotels.includes(hotel.id)}
                          onCheckedChange={(checked) => handleHotelSelect(hotel.id, checked as boolean)}
                        />
                        <label htmlFor={`hotel-${hotel.id}`} className="flex-1 cursor-pointer">
                          <div className="font-medium">{hotel.name}</div>
                          <div className="text-sm text-gray-500">{hotel.city}, {hotel.country}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Themes Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Tags className="w-5 h-5" />
                  Themes ({selectedThemes.length} selected)
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={selectAllThemes}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearThemeSelection}
                    disabled={selectedThemes.length === 0}
                  >
                    Clear
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg max-h-96 overflow-y-auto">
                <div className="space-y-2 p-4">
                  {filteredThemes.map((theme) => (
                    <div key={theme.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                      <Checkbox
                        id={`theme-${theme.id}`}
                        checked={selectedThemes.includes(theme.id)}
                        onCheckedChange={(checked) => handleThemeSelect(theme.id, checked as boolean)}
                      />
                      <label htmlFor={`theme-${theme.id}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{theme.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {theme.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Level {theme.level}
                          </Badge>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={assignThemesToHotels}
              disabled={processing || selectedHotels.length === 0 || selectedThemes.length === 0}
              size="lg"
              className="px-8"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Assigning Themes...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Assign {selectedThemes.length} Themes to {selectedHotels.length} Hotels
                </>
              )}
            </Button>
          </div>

          {/* Summary */}
          {(selectedHotels.length > 0 || selectedThemes.length > 0) && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Assignment Summary:</h4>
              <div className="text-sm text-blue-800">
                <p>• {selectedHotels.length} hotels selected</p>
                <p>• {selectedThemes.length} themes selected</p>
                <p>• {selectedHotels.length * selectedThemes.length} total assignments will be created</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
