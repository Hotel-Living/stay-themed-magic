
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function FernandoBatchThemeAssignment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [clearExisting, setClearExisting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [hotelsWithoutThemes, setHotelsWithoutThemes] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  // Get count of hotels without themes on component mount
  useEffect(() => {
    fetchHotelsWithoutThemes();
  }, []);

  const fetchHotelsWithoutThemes = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          id,
          name,
          hotel_themes!left(hotel_id)
        `)
        .eq('status', 'approved')
        .is('hotel_themes.hotel_id', null);

      if (error) throw error;
      
      setHotelsWithoutThemes(data?.length || 0);
    } catch (error) {
      console.error('Error fetching hotels without themes:', error);
      setMessage("Error loading hotels data");
      setMessageType("error");
    }
  };

  const handleClearExistingChange = (checked: CheckedState) => {
    setClearExisting(checked === true);
  };

  const handleBatchAssignment = async () => {
    if (hotelsWithoutThemes === 0) {
      setMessage("No hotels found that need theme assignment");
      setMessageType("info");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setMessage(`Starting batch theme assignment for ${hotelsWithoutThemes} hotels...`);
    setMessageType("info");

    try {
      console.log('Starting batch theme assignment...');

      const { data, error } = await supabase.functions.invoke('batch-theme-assignment', {
        body: {
          clearExisting,
          autoDiscover: true // Signal to auto-discover hotels without themes
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to call batch assignment function');
      }

      console.log('Batch assignment response:', data);

      if (data?.success) {
        setMessage(data.message || 'Batch theme assignment completed successfully!');
        setMessageType("success");
        setProgress(100);
        
        // Refresh the count of hotels without themes
        await fetchHotelsWithoutThemes();
      } else {
        throw new Error(data?.error || 'Unknown error occurred during batch assignment');
      }

    } catch (error: any) {
      console.error('Batch assignment error:', error);
      setMessage(`Error: ${error.message || 'Failed to assign themes'}`);
      setMessageType("error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#1A1F2C] border-[#7A0486]/20">
        <CardHeader>
          <CardTitle className="text-white text-xl">
            Batch Theme Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Status Display */}
          <div className="bg-[#7A0486]/10 border border-[#7A0486]/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Hotels Status</h3>
            <p className="text-white text-lg">
              <span className="font-bold text-[#7A0486]">{hotelsWithoutThemes}</span> hotels found without themes
            </p>
            {hotelsWithoutThemes > 0 && (
              <p className="text-gray-300 text-sm mt-1">
                These hotels will automatically receive 2-3 randomly assigned themes
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="clearExisting"
                checked={clearExisting}
                onCheckedChange={handleClearExistingChange}
                className="border-[#7A0486] data-[state=checked]:bg-[#7A0486]"
              />
              <label 
                htmlFor="clearExisting" 
                className="text-white text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Clear existing themes before assigning new ones
              </label>
            </div>
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white">Processing...</span>
                <span className="text-white">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full h-2" />
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={handleBatchAssignment}
            disabled={isProcessing || hotelsWithoutThemes === 0}
            className="w-full bg-[#7A0486] hover:bg-[#7A0486]/80 text-white font-semibold py-3"
          >
            {isProcessing 
              ? "Processing..." 
              : hotelsWithoutThemes === 0 
                ? "No Hotels Need Themes" 
                : `Assign Themes to ${hotelsWithoutThemes} Hotels`
            }
          </Button>

          {/* Status Messages */}
          {message && (
            <Alert className={`
              ${messageType === "success" ? "bg-green-500/20 border-green-500/30 text-green-100" : ""}
              ${messageType === "error" ? "bg-red-500/20 border-red-500/30 text-red-100" : ""}
              ${messageType === "info" ? "bg-[#7A0486]/20 border-[#7A0486]/30 text-white" : ""}
            `}>
              <AlertDescription className="text-sm font-medium">
                {message}
              </AlertDescription>
            </Alert>
          )}

          {/* Instructions */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">How it works:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Automatically finds all approved hotels without themes</li>
              <li>• Assigns 2-3 random themes to each hotel</li>
              <li>• Processes hotels in batches for optimal performance</li>
              <li>• Optionally clears existing themes before assignment</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
