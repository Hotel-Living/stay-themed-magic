
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Tags, Check, X, Loader2, AlertCircle } from 'lucide-react';

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
  level: number;
  category: string;
}

const FernandoBatchThemeAssignment = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [loadingThemes, setLoadingThemes] = useState(true);
  const [assignmentStatus, setAssignmentStatus] = useState<string>('');

  useEffect(() => {
    fetchHotels();
    fetchThemes();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoadingHotels(true);
      const { data, error } = await supabase
        .from('hotels')
        .select('id, name, city, country, status')
        .eq('status', 'approved')
        .order('name');

      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setAssignmentStatus('Failed to load hotels');
    } finally {
      setLoadingHotels(false);
    }
  };

  const fetchThemes = async () => {
    try {
      setLoadingThemes(true);
      const { data, error } = await supabase
        .from('themes')
        .select('id, name, level, category')
        .order('name');

      if (error) throw error;
      setThemes(data || []);
      console.log(`Loaded ${data?.length || 0} themes for assignment`);
    } catch (error) {
      console.error('Error fetching themes:', error);
      setAssignmentStatus('Failed to load themes');
    } finally {
      setLoadingThemes(false);
    }
  };

  const selectAllHotels = () => {
    if (selectedHotels.length === hotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(hotels.map(hotel => hotel.id));
    }
  };

  const toggleHotelSelection = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const getRandomThemes = (allThemes: Theme[], count: number): string[] => {
    const shuffled = [...allThemes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(theme => theme.id);
  };

  const assignRandomThemes = async () => {
    if (selectedHotels.length === 0) {
      setAssignmentStatus('Please select at least one hotel');
      return;
    }

    if (themes.length === 0) {
      setAssignmentStatus('No themes available for assignment');
      return;
    }

    setIsProcessing(true);
    setAssignmentStatus('');
    let successCount = 0;
    let errorCount = 0;

    try {
      // First, remove existing theme assignments for selected hotels
      const { error: deleteError } = await supabase
        .from('hotel_themes')
        .delete()
        .in('hotel_id', selectedHotels);

      if (deleteError) {
        console.error('Error clearing existing assignments:', deleteError);
        setAssignmentStatus('Failed to clear existing theme assignments');
        return;
      }

      // Prepare batch assignments
      const assignments = [];
      
      for (const hotelId of selectedHotels) {
        // Randomly assign 2-3 themes per hotel
        const themeCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const randomThemeIds = getRandomThemes(themes, themeCount);
        
        for (const themeId of randomThemeIds) {
          assignments.push({
            hotel_id: hotelId,
            theme_id: themeId
          });
        }
      }

      console.log(`Preparing to assign ${assignments.length} theme-hotel relationships`);

      // Insert all assignments in batches to avoid overwhelming the database
      const batchSize = 100;
      for (let i = 0; i < assignments.length; i += batchSize) {
        const batch = assignments.slice(i, i + batchSize);
        
        const { error: insertError } = await supabase
          .from('hotel_themes')
          .insert(batch);

        if (insertError) {
          console.error('Batch insert error:', insertError);
          errorCount++;
        } else {
          successCount += batch.length;
        }
      }

      if (successCount > 0) {
        setAssignmentStatus(`✅ Successfully assigned ${successCount} theme relationships to ${selectedHotels.length} hotels`);
        toast.success(`Theme assignment completed`, {
          description: `${successCount} assignments created successfully`
        });
      } else {
        setAssignmentStatus('❌ Failed to create theme assignments');
        toast.error('Assignment failed', {
          description: 'No theme assignments were created'
        });
      }

    } catch (error) {
      console.error('Error during theme assignment:', error);
      setAssignmentStatus('❌ Unexpected error during theme assignment');
      toast.error('Assignment error', {
        description: 'An unexpected error occurred'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loadingHotels || loadingThemes) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6">
        <Card className="bg-purple-800/50 border-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-300" />
            <p className="text-purple-200">Loading hotels and themes...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6">
      <Card className="bg-purple-800/50 border-purple-600 text-white">
        <CardHeader className="bg-purple-700/50 border-b border-purple-600">
          <CardTitle className="flex items-center gap-3 text-white">
            <Tags className="w-6 h-6 text-purple-300" />
            Batch Theme Assignment
          </CardTitle>
          <p className="text-purple-200 mt-2">
            Assign 2-3 random themes to selected hotels from {themes.length} available themes
          </p>
        </CardHeader>
        
        <CardContent className="p-6 bg-purple-800/30">
          {/* Status Display */}
          {assignmentStatus && (
            <div className={`p-4 rounded-lg border mb-6 ${
              assignmentStatus.includes('✅') || assignmentStatus.includes('Successfully')
                ? 'bg-green-900/50 border-green-600 text-green-200'
                : 'bg-red-900/50 border-red-600 text-red-200'
            }`}>
              <div className="flex items-center gap-2">
                {assignmentStatus.includes('✅') || assignmentStatus.includes('Successfully') ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="font-medium">{assignmentStatus}</span>
              </div>
            </div>
          )}

          {/* Hotel Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Select Hotels ({hotels.length} available)
              </h3>
              <Button
                onClick={selectAllHotels}
                variant="outline"
                className="bg-purple-700 border-purple-500 text-white hover:bg-purple-600"
              >
                {selectedHotels.length === hotels.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-4 bg-purple-900/30 rounded-lg border border-purple-600">
              {hotels.map(hotel => (
                <div 
                  key={hotel.id}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-purple-800/40 border border-purple-600 hover:bg-purple-700/40 transition-colors"
                >
                  <Checkbox
                    checked={selectedHotels.includes(hotel.id)}
                    onCheckedChange={() => toggleHotelSelection(hotel.id)}
                    className="border-purple-400 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {hotel.name}
                    </p>
                    <p className="text-xs text-purple-300 truncate">
                      {hotel.city}, {hotel.country}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignment Summary */}
          {selectedHotels.length > 0 && (
            <div className="bg-purple-900/50 border border-purple-600 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold text-purple-200 mb-2">
                Assignment Summary
              </h4>
              <div className="space-y-2 text-purple-300">
                <p>• <strong>{selectedHotels.length}</strong> hotels selected</p>
                <p>• <strong>2-3 random themes</strong> will be assigned to each hotel</p>
                <p>• Selected from <strong>{themes.length} total themes</strong> (all levels)</p>
                <p>• Estimated <strong>{selectedHotels.length * 2.5} theme assignments</strong> to be created</p>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            <Button
              onClick={assignRandomThemes}
              disabled={selectedHotels.length === 0 || isProcessing}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Assigning Themes...
                </>
              ) : (
                <>
                  <Tags className="w-5 h-5 mr-2" />
                  Assign Random Themes to {selectedHotels.length} Hotels
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FernandoBatchThemeAssignment;
