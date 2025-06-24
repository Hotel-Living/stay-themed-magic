
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, CheckCircle, AlertCircle, Building } from "lucide-react";

interface BatchCreationStats {
  totalCreated: number;
  errors: string[];
  hotelDetails: string[];
}

export function BatchHotelCreation() {
  const [isCreating, setIsCreating] = useState(false);
  const [stats, setStats] = useState<BatchCreationStats | null>(null);
  const { toast } = useToast();

  const handleBatchCreation = async () => {
    setIsCreating(true);
    setStats(null);

    try {
      const { data, error } = await supabase.functions.invoke('batch-hotel-creation', {
        body: { 
          action: 'create_hotels',
          maxHotels: 20,
          // Enforce 3-4 star category limits
          categoryRange: { min: 3, max: 4 },
          // Exclude luxury brands
          excludeLuxuryBrands: true,
          // Ensure field completion
          requireAllFields: true
        }
      });

      if (error) {
        throw error;
      }

      setStats(data.stats);
      
      toast({
        title: "Batch Hotel Creation Complete",
        description: `Created ${data.stats.totalCreated} hotels with category 3-4 stars.`,
      });

    } catch (error) {
      console.error('Batch creation error:', error);
      toast({
        title: "Creation Failed",
        description: "An error occurred during hotel creation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#7a0486]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building className="w-5 h-5" />
            Batch Hotel Creation
          </CardTitle>
          <CardDescription className="text-white/80">
            Create multiple hotels with realistic 3-4 star properties and complete field population.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#5A1876]/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Hotel Creation Parameters:
            </h4>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• Maximum Hotels: 20</li>
              <li>• Category Range: 3-4 stars only</li>
              <li>• Luxury brands excluded (No Mandarin Oriental, Four Seasons, etc.)</li>
              <li>• All fields will be populated</li>
              <li>• Price range: €1200-1600/month</li>
              <li>• Mid-range hotel brands and independent properties</li>
            </ul>
          </div>

          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-600/30">
            <h4 className="text-amber-200 font-medium mb-2">Hotel Quality Standards:</h4>
            <ul className="text-amber-200/80 text-sm space-y-1">
              <li>• 3-star hotels: Standard comfort, good amenities</li>
              <li>• 4-star hotels: Superior comfort, extensive amenities</li>
              <li>• No 5-star luxury properties will be created</li>
              <li>• Focus on mid-market hotel chains and boutique properties</li>
            </ul>
          </div>

          <Button
            onClick={handleBatchCreation}
            disabled={isCreating}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating 3-4 Star Hotels...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create 20 Mid-Range Hotels (3-4 Stars)
              </>
            )}
          </Button>

          {stats && (
            <div className="space-y-3">
              <div className="bg-[#5A1876]/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Creation Results
                </h4>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Hotels Created:</span>
                    <span className="text-white ml-2 font-medium">{stats.totalCreated}</span>
                  </div>
                </div>

                {stats.hotelDetails.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-white/80 text-sm mb-2">Created Hotels:</h5>
                    <div className="text-xs text-white/60 space-y-1">
                      {stats.hotelDetails.slice(0, 10).map((hotel, index) => (
                        <div key={index}>• {hotel}</div>
                      ))}
                      {stats.hotelDetails.length > 10 && (
                        <div className="text-white/40">... and {stats.hotelDetails.length - 10} more</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {stats.errors.length > 0 && (
                <div className="bg-red-900/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    Errors ({stats.errors.length})
                  </h4>
                  <ul className="text-red-300 text-sm space-y-1">
                    {stats.errors.slice(0, 5).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                    {stats.errors.length > 5 && (
                      <li className="text-red-400">... and {stats.errors.length - 5} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
