
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Fernando32DayHotels() {
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCreateHotels = async () => {
    setIsCreating(true);
    setResult(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('creacion-hoteles-32-dias');
      
      if (error) {
        throw error;
      }
      
      setResult(data.message || 'Hotels created successfully');
      toast({
        title: "Success",
        description: data.message || 'Hotels created successfully',
        variant: "default",
      });
    } catch (error) {
      console.error('Error creating hotels:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create hotels';
      setResult(`Error: ${errorMessage}`);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Create 66 Welcome Pilot Hotels for 32-Day Stays
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">🏨 Welcome Pilot Hotels Batch Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <strong>🌍 Coverage:</strong> 8 European Countries<br/>
                  Spain, Portugal, Italy, France, Germany, Netherlands, United Kingdom, Switzerland
                </div>
                <div>
                  <strong>🏢 Hotel Count:</strong> 66 Premium Properties
                </div>
                <div>
                  <strong>📍 Locations:</strong> Real Hotels - Real Addresses
                </div>
                <div>
                  <strong>⏱️ Stay Format:</strong> Fixed 32-day Extended Stays
                </div>
                <div>
                  <strong>🎯 Affinity Themes:</strong> 1-3 from Official List
                </div>
                <div>
                  <strong>🎪 Activities:</strong> 3-5 Matching Each Theme
                </div>
                <div>
                  <strong>📋 Property Data:</strong> Complete Steps 1-5 (except photos)
                </div>
                <div>
                  <strong>✅ Status:</strong> Auto-approved for Immediate Availability
                </div>
                <div>
                  <strong>🏷️ Label:</strong> "Welcome Pilot Hotels"
                </div>
                <div>
                  <strong>🌐 Distribution:</strong> Location & Country Preassigned
                </div>
              </div>
            </div>
            
            <p className="text-gray-700">
              This batch will create 66 premium hotels across 8 European countries, each specifically designed 
              for 32-day extended stays with complete property information and immediate availability.
            </p>
            
            <Button 
              onClick={handleCreateHotels}
              disabled={isCreating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {isCreating ? 'Creating Welcome Pilot Hotels...' : 'Create 66 Welcome Pilot Hotels'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader className="bg-purple-800 text-white">
            <CardTitle className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-white">Creation Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium">{result}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
