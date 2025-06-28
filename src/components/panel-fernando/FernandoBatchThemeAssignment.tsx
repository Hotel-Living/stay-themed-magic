
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tags, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  category: string | null;
}

interface AssignmentResult {
  total: number;
  successful: number;
  failed: number;
  errors: string[];
}

export default function FernandoBatchThemeAssignment() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      console.log("🔄 Fetching hotels and themes...");

      // Fetch hotels
      const { data: hotelsData, error: hotelsError } = await supabase
        .from("hotels")
        .select("id, name, city, country, status")
        .order("name");

      if (hotelsError) {
        console.error("❌ Error fetching hotels:", hotelsError);
        throw hotelsError;
      }

      // Fetch themes
      const { data: themesData, error: themesError } = await supabase
        .from("themes")
        .select("id, name, category")
        .order("name");

      if (themesError) {
        console.error("❌ Error fetching themes:", themesError);
        throw themesError;
      }

      console.log(`✅ Fetched ${hotelsData?.length || 0} hotels and ${themesData?.length || 0} themes`);
      
      setHotels(hotelsData || []);
      setThemes(themesData || []);
    } catch (error) {
      console.error("❌ Error in fetchData:", error);
      toast.error("Failed to load data", {
        style: {
          background: "#5f098a",
          color: "white",
          border: "1px solid #d946ef"
        }
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleHotelSelection = (hotelId: string, checked: boolean) => {
    setSelectedHotels(prev => 
      checked 
        ? [...prev, hotelId]
        : prev.filter(id => id !== hotelId)
    );
  };

  const selectAllHotels = () => {
    setSelectedHotels(hotels.map(hotel => hotel.id));
  };

  const clearSelection = () => {
    setSelectedHotels([]);
  };

  const getRandomThemes = (allThemes: Theme[], count: number): Theme[] => {
    const shuffled = [...allThemes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const assignThemesToHotels = async (): Promise<AssignmentResult> => {
    const result: AssignmentResult = {
      total: 0,
      successful: 0,
      failed: 0,
      errors: []
    };

    console.log(`🎯 Starting theme assignment for ${selectedHotels.length} hotels with ${themes.length} available themes`);
    
    setProgress({ current: 0, total: selectedHotels.length });

    try {
      // First, clear existing assignments for selected hotels
      console.log("🧹 Clearing existing theme assignments...");
      const { error: deleteError } = await supabase
        .from("hotel_themes")
        .delete()
        .in("hotel_id", selectedHotels);

      if (deleteError) {
        console.error("❌ Error clearing existing assignments:", deleteError);
        result.errors.push(`Failed to clear existing assignments: ${deleteError.message}`);
      }

      // Process hotels in smaller batches
      const batchSize = 10;
      const batches = [];
      
      for (let i = 0; i < selectedHotels.length; i += batchSize) {
        batches.push(selectedHotels.slice(i, i + batchSize));
      }

      for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];
        console.log(`📦 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} hotels)`);

        // Create assignments for this batch
        const batchAssignments = [];
        
        for (const hotelId of batch) {
          // Assign 2-3 random themes per hotel
          const themeCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 themes
          const selectedThemes = getRandomThemes(themes, themeCount);
          
          for (const theme of selectedThemes) {
            batchAssignments.push({
              hotel_id: hotelId,
              theme_id: theme.id
            });
          }
          
          result.total += selectedThemes.length;
          setProgress(prev => ({ ...prev, current: prev.current + 1 }));
        }

        // Insert batch assignments
        console.log(`💾 Inserting ${batchAssignments.length} theme assignments for batch ${batchIndex + 1}`);
        
        const { data: insertData, error: insertError } = await supabase
          .from("hotel_themes")
          .insert(batchAssignments)
          .select();

        if (insertError) {
          console.error(`❌ Error inserting batch ${batchIndex + 1}:`, insertError);
          result.failed += batchAssignments.length;
          result.errors.push(`Batch ${batchIndex + 1} failed: ${insertError.message}`);
        } else {
          const insertedCount = insertData?.length || 0;
          console.log(`✅ Successfully inserted ${insertedCount} assignments in batch ${batchIndex + 1}`);
          result.successful += insertedCount;
        }

        // Small delay between batches to prevent overwhelming the database
        if (batchIndex < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

    } catch (error: any) {
      console.error("❌ Unexpected error during assignment:", error);
      result.errors.push(`Unexpected error: ${error.message}`);
    }

    return result;
  };

  const handleAssignThemes = async () => {
    if (selectedHotels.length === 0) {
      toast.error("Please select at least one hotel", {
        style: {
          background: "#5f098a",
          color: "white",
          border: "1px solid #d946ef"
        }
      });
      return;
    }

    if (themes.length === 0) {
      toast.error("No themes available for assignment", {
        style: {
          background: "#5f098a",
          color: "white",
          border: "1px solid #d946ef"
        }
      });
      return;
    }

    setLoading(true);
    
    try {
      console.log("🚀 Starting batch theme assignment process...");
      const result = await assignThemesToHotels();
      
      console.log("📊 Assignment Results:", result);

      if (result.successful > 0) {
        toast.success(
          `Successfully assigned themes! Created: ${result.successful}, Failed: ${result.failed}`,
          {
            style: {
              background: "#5f098a",
              color: "white",
              border: "1px solid #d946ef"
            },
            duration: 5000
          }
        );
      }

      if (result.failed > 0 || result.errors.length > 0) {
        console.error("⚠️ Assignment completed with errors:", result.errors);
        toast.error(
          `Assignment completed with ${result.failed} failures. Check console for details.`,
          {
            style: {
              background: "#dc2626",
              color: "white",
              border: "1px solid #ef4444"
            },
            duration: 7000
          }
        );
      }

      // Verify the assignments were created
      const { data: verificationData, error: verificationError } = await supabase
        .from("hotel_themes")
        .select("*")
        .in("hotel_id", selectedHotels);

      if (!verificationError && verificationData) {
        console.log(`🔍 Verification: Found ${verificationData.length} theme assignments in database`);
      }

    } catch (error: any) {
      console.error("💥 Critical error in handleAssignThemes:", error);
      toast.error(`Assignment failed: ${error.message}`, {
        style: {
          background: "#dc2626",
          color: "white",
          border: "1px solid #ef4444"
        }
      });
    } finally {
      setLoading(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-2 text-purple-600">Loading data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tags className="w-5 h-5" />
            Batch Theme Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-100">
            Assign random themes to selected hotels. Each hotel will receive 2-3 randomly selected themes 
            from the available {themes.length} themes.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-600 font-medium">Total Hotels</div>
          <div className="text-2xl font-bold text-purple-800">{hotels.length}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-600 font-medium">Available Themes</div>
          <div className="text-2xl font-bold text-purple-800">{themes.length}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-600 font-medium">Selected Hotels</div>
          <div className="text-2xl font-bold text-purple-800">{selectedHotels.length}</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-purple-800">Hotel Selection</CardTitle>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={selectAllHotels}
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                Select All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearSelection}
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto">
            <div className="space-y-2">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="flex items-center space-x-3 p-2 hover:bg-purple-50 rounded">
                  <Checkbox
                    id={hotel.id}
                    checked={selectedHotels.includes(hotel.id)}
                    onCheckedChange={(checked) => handleHotelSelection(hotel.id, !!checked)}
                  />
                  <label htmlFor={hotel.id} className="flex-1 cursor-pointer">
                    <div className="font-medium text-gray-900">{hotel.name}</div>
                    <div className="text-sm text-gray-500">{hotel.city}, {hotel.country}</div>
                  </label>
                  <Badge 
                    variant={hotel.status === 'approved' ? 'default' : 'secondary'}
                    className={hotel.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {hotel.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-purple-800">Assignment Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading && progress.total > 0 && (
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-700">Processing Hotels</span>
                  <span className="text-sm text-purple-600">{progress.current}/{progress.total}</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <Button
              onClick={handleAssignThemes}
              disabled={loading || selectedHotels.length === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Assigning Themes...
                </>
              ) : (
                <>
                  <Tags className="w-4 h-4 mr-2" />
                  Assign Random Themes to Selected Hotels
                </>
              )}
            </Button>
            
            {selectedHotels.length > 0 && !loading && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Assignment Preview:</p>
                    <p>
                      This will assign 2-3 random themes to each of the {selectedHotels.length} selected hotels,
                      potentially creating {selectedHotels.length * 2}-{selectedHotels.length * 3} theme assignments total.
                    </p>
                    <p className="mt-1 text-blue-600">
                      Existing theme assignments for selected hotels will be cleared first.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
