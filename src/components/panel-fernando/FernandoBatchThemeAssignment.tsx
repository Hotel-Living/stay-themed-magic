
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tags, Play, RotateCcw, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  status: string;
}

export default function FernandoBatchThemeAssignment() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [clearExisting, setClearExisting] = useState(true);
  const [assignmentResult, setAssignmentResult] = useState<{
    success: boolean;
    message: string;
    totalCreated: number;
    totalFailed: number;
    failureDetails?: string[];
  } | null>(null);

  useEffect(() => {
    fetchHotels();
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
      toast.error("Failed to fetch hotels");
    } finally {
      setLoadingHotels(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedHotels.length === hotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(hotels.map(h => h.id));
    }
  };

  const handleHotelToggle = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const performBatchAssignment = async () => {
    if (selectedHotels.length === 0) {
      toast.error("Please select at least one hotel");
      return;
    }

    setIsAssigning(true);
    setAssignmentResult(null);

    try {
      console.log(`Starting batch theme assignment for ${selectedHotels.length} hotels`);
      
      const response = await fetch('/functions/v1/batch-theme-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.supabaseKey}`,
        },
        body: JSON.stringify({
          hotelIds: selectedHotels,
          clearExisting
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to assign themes');
      }

      setAssignmentResult(result);
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "Theme assignment failed");
      }

    } catch (error) {
      console.error('Error in batch theme assignment:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Assignment failed: ${errorMessage}`);
      setAssignmentResult({
        success: false,
        message: `Assignment failed: ${errorMessage}`,
        totalCreated: 0,
        totalFailed: selectedHotels.length
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const resetSelection = () => {
    setSelectedHotels([]);
    setAssignmentResult(null);
  };

  if (loadingHotels) {
    return (
      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Tags className="w-5 h-5" />
            Batch Theme Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-600">Loading hotels...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const estimatedAssignments = selectedHotels.length * 2.5; // Average of 2-3 themes per hotel

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
          <div className="space-y-6">
            {/* Assignment Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="clearExisting"
                  checked={clearExisting}
                  onCheckedChange={(checked) => setClearExisting(checked === true)}
                />
                <label htmlFor="clearExisting" className="text-sm font-medium">
                  Clear existing theme assignments first
                </label>
              </div>
            </div>

            {/* Assignment Preview */}
            {selectedHotels.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Assignment Preview:</strong>
                  <br />
                  This will assign 2-3 random themes to each of the {selectedHotels.length} selected hotels, potentially creating {Math.floor(estimatedAssignments * 0.8)}-{Math.ceil(estimatedAssignments * 1.2)} theme assignments total.
                  <br />
                  {clearExisting && "Existing theme assignments for selected hotels will be cleared first."}
                </AlertDescription>
              </Alert>
            )}

            {/* Assignment Result */}
            {assignmentResult && (
              <Alert className={assignmentResult.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
                {assignmentResult.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={assignmentResult.success ? "text-green-800" : "text-red-800"}>
                  <strong>{assignmentResult.message}</strong>
                  {assignmentResult.failureDetails && assignmentResult.failureDetails.length > 0 && (
                    <div className="mt-2">
                      <details>
                        <summary className="cursor-pointer font-medium">View failure details</summary>
                        <ul className="mt-1 ml-4 text-sm list-disc">
                          {assignmentResult.failureDetails.map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={performBatchAssignment}
                disabled={isAssigning || selectedHotels.length === 0}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Play className="w-4 h-4 mr-2" />
                {isAssigning ? 'Assigning Themes...' : 'Start Assignment'}
              </Button>
              
              <Button
                onClick={resetSelection}
                variant="outline"
                disabled={isAssigning}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Hotel Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Select Hotels ({hotels.length} total)</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {selectedHotels.length} selected
                  </Badge>
                  <Button
                    onClick={handleSelectAll}
                    variant="outline"
                    size="sm"
                    disabled={isAssigning}
                  >
                    {selectedHotels.length === hotels.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto border rounded-lg">
                <div className="grid gap-2 p-4">
                  {hotels.map(hotel => (
                    <div
                      key={hotel.id}
                      className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={selectedHotels.includes(hotel.id)}
                        onCheckedChange={() => handleHotelToggle(hotel.id)}
                        disabled={isAssigning}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{hotel.name}</div>
                        <div className="text-sm text-gray-500">
                          {hotel.city}, {hotel.country}
                        </div>
                      </div>
                      <Badge variant="secondary">{hotel.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
