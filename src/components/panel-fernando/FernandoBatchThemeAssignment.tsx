
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Tags, CheckSquare, Square, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  category?: string;
}

interface AssignmentProgress {
  current: number;
  total: number;
  phase: string;
}

export default function FernandoBatchThemeAssignment() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [progress, setProgress] = useState<AssignmentProgress | null>(null);
  const [lastAssignmentResult, setLastAssignmentResult] = useState<{
    success: boolean;
    message: string;
    details?: string;
  } | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  const addDebugLog = (message: string) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}`;
    console.log('🎯 Theme Assignment Debug:', logEntry);
    setDebugLogs(prev => [...prev.slice(-9), logEntry]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    addDebugLog('Starting data fetch process');
    
    try {
      // Fetch hotels
      addDebugLog('Fetching approved hotels');
      const { data: hotelsData, error: hotelsError } = await supabase
        .from('hotels')
        .select('id, name, city, country, status')
        .eq('status', 'approved')
        .order('name');

      if (hotelsError) {
        addDebugLog(`Hotels fetch error: ${hotelsError.message}`);
        throw hotelsError;
      }

      addDebugLog(`Successfully fetched ${hotelsData?.length || 0} hotels`);
      setHotels(hotelsData || []);

      // Fetch all themes (including subcategories and level-3 items)
      addDebugLog('Fetching all themes from database');
      const { data: themesData, error: themesError } = await supabase
        .from('themes')
        .select('id, name, level, category')
        .order('level, name');

      if (themesError) {
        addDebugLog(`Themes fetch error: ${themesError.message}`);
        throw themesError;
      }

      addDebugLog(`Successfully fetched ${themesData?.length || 0} themes (levels 1-3)`);
      setThemes(themesData || []);

      toast({
        title: "Data Loaded Successfully",
        description: `${hotelsData?.length || 0} hotels and ${themesData?.length || 0} themes loaded`,
        className: "bg-purple-600 text-white border-purple-700"
      });

    } catch (error: any) {
      addDebugLog(`Data fetch failed: ${error.message}`);
      toast({
        title: "Failed to Load Data",
        description: error.message,
        variant: "destructive",
        className: "bg-red-600 text-white border-red-700"
      });
    } finally {
      setIsLoading(false);
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
      addDebugLog('Deselected all hotels');
    } else {
      setSelectedHotels(hotels.map(h => h.id));
      addDebugLog(`Selected all ${hotels.length} hotels`);
    }
  };

  const validateBeforeAssignment = (): boolean => {
    addDebugLog('Starting pre-assignment validation');
    
    if (selectedHotels.length === 0) {
      addDebugLog('Validation failed: No hotels selected');
      toast({
        title: "No Hotels Selected",
        description: "Please select at least one hotel before assigning themes",
        variant: "destructive",
        className: "bg-red-600 text-white border-red-700"
      });
      return false;
    }

    if (themes.length < 3) {
      addDebugLog(`Validation failed: Only ${themes.length} themes available`);
      toast({
        title: "Insufficient Themes",
        description: "Need at least 3 themes to perform random assignment",
        variant: "destructive",
        className: "bg-red-600 text-white border-red-700"
      });
      return false;
    }

    // Validate hotel IDs exist
    const validHotelIds = hotels.map(h => h.id);
    const invalidSelections = selectedHotels.filter(id => !validHotelIds.includes(id));
    if (invalidSelections.length > 0) {
      addDebugLog(`Validation failed: Invalid hotel IDs: ${invalidSelections.join(', ')}`);
      return false;
    }

    addDebugLog(`Validation passed: ${selectedHotels.length} hotels, ${themes.length} themes available`);
    return true;
  };

  const getRandomThemes = (excludeIds: string[] = []): Theme[] => {
    const availableThemes = themes.filter(theme => !excludeIds.includes(theme.id));
    const shuffled = [...availableThemes].sort(() => Math.random() - 0.5);
    const numThemes = Math.floor(Math.random() * 2) + 2; // 2 or 3 themes
    return shuffled.slice(0, numThemes);
  };

  const clearExistingAssignments = async (hotelIds: string[]) => {
    addDebugLog(`Clearing existing assignments for ${hotelIds.length} hotels`);
    setProgress({ current: 0, total: hotelIds.length, phase: 'Clearing existing assignments' });

    try {
      const { error } = await supabase
        .from('hotel_themes')
        .delete()
        .in('hotel_id', hotelIds);

      if (error) {
        addDebugLog(`Failed to clear existing assignments: ${error.message}`);
        throw error;
      }

      addDebugLog('Successfully cleared existing assignments');
      return true;
    } catch (error: any) {
      addDebugLog(`Error clearing assignments: ${error.message}`);
      throw error;
    }
  };

  const createThemeAssignments = async (assignments: Array<{ hotel_id: string; theme_id: string }>) => {
    addDebugLog(`Creating ${assignments.length} theme assignments`);
    setProgress({ current: 0, total: assignments.length, phase: 'Creating theme assignments' });

    const BATCH_SIZE = 25; // Reduced from 50 for better reliability
    let successCount = 0;
    let failureCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < assignments.length; i += BATCH_SIZE) {
      const batch = assignments.slice(i, i + BATCH_SIZE);
      addDebugLog(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} assignments`);

      try {
        const { data, error } = await supabase
          .from('hotel_themes')
          .insert(batch)
          .select('id');

        if (error) {
          addDebugLog(`Batch insert error: ${error.message}`);
          failureCount += batch.length;
          errors.push(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${error.message}`);
        } else {
          const insertedCount = data?.length || 0;
          successCount += insertedCount;
          addDebugLog(`Batch successful: ${insertedCount} assignments created`);
        }

        setProgress({ 
          current: Math.min(i + BATCH_SIZE, assignments.length), 
          total: assignments.length, 
          phase: 'Creating theme assignments' 
        });

        // Small delay between batches to prevent rate limiting
        if (i + BATCH_SIZE < assignments.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error: any) {
        addDebugLog(`Batch processing error: ${error.message}`);
        failureCount += batch.length;
        errors.push(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${error.message}`);
      }
    }

    addDebugLog(`Assignment creation completed: ${successCount} success, ${failureCount} failures`);
    
    if (errors.length > 0) {
      addDebugLog(`Errors encountered: ${errors.join('; ')}`);
    }

    return { successCount, failureCount, errors };
  };

  const verifyAssignments = async (hotelIds: string[]): Promise<number> => {
    addDebugLog('Verifying created assignments');
    try {
      const { data, error } = await supabase
        .from('hotel_themes')
        .select('id, hotel_id, theme_id')
        .in('hotel_id', hotelIds);

      if (error) {
        addDebugLog(`Verification query error: ${error.message}`);
        throw error;
      }

      const actualCount = data?.length || 0;
      addDebugLog(`Verification complete: ${actualCount} assignments found in database`);
      return actualCount;
    } catch (error: any) {
      addDebugLog(`Verification failed: ${error.message}`);
      return 0;
    }
  };

  const assignRandomThemes = async () => {
    if (!validateBeforeAssignment()) return;

    setIsAssigning(true);
    setLastAssignmentResult(null);
    setDebugLogs([]);
    
    addDebugLog(`Starting theme assignment for ${selectedHotels.length} hotels`);
    
    try {
      // Step 1: Clear existing assignments
      await clearExistingAssignments(selectedHotels);

      // Step 2: Generate random assignments
      addDebugLog('Generating random theme assignments');
      setProgress({ current: 0, total: selectedHotels.length, phase: 'Generating assignments' });
      
      const allAssignments: Array<{ hotel_id: string; theme_id: string }> = [];
      
      selectedHotels.forEach((hotelId, index) => {
        const randomThemes = getRandomThemes();
        const hotelAssignments = randomThemes.map(theme => ({
          hotel_id: hotelId,
          theme_id: theme.id
        }));
        
        allAssignments.push(...hotelAssignments);
        addDebugLog(`Hotel ${index + 1}: assigned ${randomThemes.length} themes (${randomThemes.map(t => t.name).join(', ')})`);
      });

      addDebugLog(`Total assignments to create: ${allAssignments.length}`);

      // Step 3: Create assignments in database
      const { successCount, failureCount, errors } = await createThemeAssignments(allAssignments);

      // Step 4: Verify assignments
      const verifiedCount = await verifyAssignments(selectedHotels);

      // Step 5: Report results
      const isSuccess = successCount > 0 && verifiedCount > 0;
      const resultMessage = isSuccess 
        ? `Successfully assigned themes to ${selectedHotels.length} hotels`
        : 'Theme assignment failed';
      
      const details = `Created: ${successCount}, Failed: ${failureCount}, Verified: ${verifiedCount}`;
      
      addDebugLog(`Final result: ${resultMessage} - ${details}`);

      setLastAssignmentResult({
        success: isSuccess,
        message: resultMessage,
        details: details
      });

      if (isSuccess) {
        toast({
          title: "Theme Assignment Successful",
          description: `${successCount} theme assignments created and verified`,
          className: "bg-green-600 text-white border-green-700"
        });
      } else {
        toast({
          title: "Theme Assignment Issues",
          description: `${successCount} created, ${failureCount} failed. Check logs for details.`,
          variant: "destructive",
          className: "bg-orange-600 text-white border-orange-700"
        });
      }

      if (errors.length > 0) {
        addDebugLog(`Detailed errors: ${errors.join(' | ')}`);
      }

    } catch (error: any) {
      addDebugLog(`Assignment process failed: ${error.message}`);
      setLastAssignmentResult({
        success: false,
        message: 'Assignment process failed',
        details: error.message
      });

      toast({
        title: "Assignment Failed",
        description: error.message,
        variant: "destructive",
        className: "bg-red-600 text-white border-red-700"
      });
    } finally {
      setIsAssigning(false);
      setProgress(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 p-6">
        <Card className="bg-purple-800 border-purple-600">
          <CardContent className="flex items-center justify-center p-8">
            <RefreshCw className="w-8 h-8 animate-spin text-white mr-3" />
            <span className="text-white text-lg">Loading hotels and themes...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 p-6">
      <Card className="bg-purple-800 border-purple-600">
        <CardHeader className="bg-gradient-to-r from-purple-700 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Tags className="w-5 h-5" />
            Batch Theme Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-purple-800">
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-700 p-4 rounded-lg border border-purple-600">
              <h3 className="text-white font-semibold">Available Hotels</h3>
              <p className="text-2xl font-bold text-purple-100">{hotels.length}</p>
            </div>
            <div className="bg-purple-700 p-4 rounded-lg border border-purple-600">
              <h3 className="text-white font-semibold">Available Themes</h3>
              <p className="text-2xl font-bold text-purple-100">{themes.length}</p>
            </div>
            <div className="bg-purple-700 p-4 rounded-lg border border-purple-600">
              <h3 className="text-white font-semibold">Selected Hotels</h3>
              <p className="text-2xl font-bold text-purple-100">{selectedHotels.length}</p>
            </div>
          </div>

          {/* Assignment Progress */}
          {progress && (
            <div className="mb-6 bg-purple-700 p-4 rounded-lg border border-purple-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{progress.phase}</span>
                <span className="text-purple-200 text-sm">
                  {progress.current} / {progress.total}
                </span>
              </div>
              <Progress 
                value={(progress.current / progress.total) * 100} 
                className="bg-purple-600"
              />
            </div>
          )}

          {/* Last Assignment Result */}
          {lastAssignmentResult && (
            <Alert className={`mb-6 ${lastAssignmentResult.success 
              ? 'bg-green-600 border-green-500 text-white' 
              : 'bg-red-600 border-red-500 text-white'
            }`}>
              <div className="flex items-center">
                {lastAssignmentResult.success ? (
                  <CheckCircle className="w-4 h-4 mr-2" />
                ) : (
                  <AlertCircle className="w-4 h-4 mr-2" />
                )}
                <AlertDescription className="text-white">
                  <div className="font-semibold">{lastAssignmentResult.message}</div>
                  {lastAssignmentResult.details && (
                    <div className="text-sm opacity-90 mt-1">{lastAssignmentResult.details}</div>
                  )}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Controls */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={selectAllHotels}
              variant="outline"
              className="bg-purple-700 text-white border-purple-600 hover:bg-purple-600"
              disabled={isAssigning}
            >
              {selectedHotels.length === hotels.length ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Deselect All
                </>
              ) : (
                <>
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Select All Hotels
                </>
              )}
            </Button>
            
            <Button
              onClick={assignRandomThemes}
              disabled={selectedHotels.length === 0 || isAssigning}
              className="bg-purple-600 hover:bg-purple-500 text-white"
            >
              {isAssigning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Assigning Themes...
                </>
              ) : (
                <>
                  <Tags className="w-4 h-4 mr-2" />
                  Assign Random Themes
                </>
              )}
            </Button>
          </div>

          {/* Hotels List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <h3 className="text-white font-semibold mb-3">Select Hotels for Theme Assignment:</h3>
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="flex items-center space-x-3 p-3 bg-purple-700 rounded-lg border border-purple-600 hover:bg-purple-600 transition-colors"
              >
                <Checkbox
                  checked={selectedHotels.includes(hotel.id)}
                  onCheckedChange={() => toggleHotelSelection(hotel.id)}
                  className="border-purple-400 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  disabled={isAssigning}
                />
                <div className="flex-1">
                  <h4 className="text-white font-medium">{hotel.name}</h4>
                  <p className="text-purple-200 text-sm">{hotel.city}, {hotel.country}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Debug Logs */}
          {debugLogs.length > 0 && (
            <div className="mt-6 p-4 bg-purple-900 rounded-lg border border-purple-600">
              <h4 className="text-white font-semibold mb-2">Debug Information:</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {debugLogs.map((log, index) => (
                  <div key={index} className="text-purple-200 text-xs font-mono">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
