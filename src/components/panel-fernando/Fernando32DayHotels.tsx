
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
            Create 66 Hotels for 32-Day Stays
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-gray-700">
              This will create 66 hotels across 6 European countries (Spain, Portugal, Italy, France, Germany, Netherlands) 
              specifically designed for 32-day extended stays. Each hotel will be assigned:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>1-3 affinities/themes from the official list</li>
              <li>3-5 activities matching the themes</li>
              <li>Complete property information (steps 1-5 except photos)</li>
              <li>Approved status for immediate availability</li>
            </ul>
            
            <Button 
              onClick={handleCreateHotels}
              disabled={isCreating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {isCreating ? 'Creating Hotels...' : 'Create 66 Hotels'}
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
