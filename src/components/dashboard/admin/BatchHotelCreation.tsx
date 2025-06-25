
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, CheckCircle, AlertCircle, Building, MapPin, Star, Euro } from "lucide-react";

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
          maxHotels: 20
        }
      });

      if (error) {
        throw error;
      }

      setStats(data.stats);
      
      toast({
        title: "Batch Hotel Creation Complete",
        description: `Successfully created ${data.stats.totalCreated} real hotels with comprehensive details.`,
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
            Comprehensive Batch Hotel Creation
          </CardTitle>
          <CardDescription className="text-white/80">
            Create 20 real hotels with complete configurations including affinities, activities, room details, and all platform features.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#5A1876]/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Complete Implementation Status:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-green-400" />
                  <span>✓ 21 Authorized Countries Only</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-3 h-3 text-green-400" />
                  <span>✓ Real Hotel Data Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-green-400" />
                  <span>✓ 3-4 Star Categories Only</span>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="w-3 h-3 text-green-400" />
                  <span>✓ €1200-1600 Price Range</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>✓ 1-3 Random Affinities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>✓ 1-3 Random Activities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>✓ Double Rooms (Capacity 2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>✓ Half Board Meal Plans</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-600/30">
            <h4 className="text-blue-200 font-medium mb-2 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Complete Feature Set:
            </h4>
            <ul className="text-blue-200/80 text-sm space-y-1">
              <li>• Real hotel verification with luxury brand exclusion</li>
              <li>• Comprehensive room details with descriptions and images</li>
              <li>• Dynamic pricing settings (20% cap) with 32-day stays</li>
              <li>• 8-15 hotel features and 6-12 room features per property</li>
              <li>• Terms acceptance and contact information</li>
              <li>• Property type/style from official platform options</li>
              <li>• Multi-image galleries (3-5 images per hotel)</li>
              <li>• All database schema compliance ensured</li>
            </ul>
          </div>

          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-600/30">
            <h4 className="text-amber-200 font-medium mb-2">Quality Assurance:</h4>
            <ul className="text-amber-200/80 text-sm space-y-1">
              <li>• Only real, existing hotels from verified database</li>
              <li>• Accurate geographic coordinates and addresses</li>
              <li>• Authentic hotel descriptions and positioning</li>
              <li>• Brand verification and luxury exclusion filters</li>
              <li>• Complete data integrity and relationship consistency</li>
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
                Creating Real Hotels with Full Configuration...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create 20 Complete Real Hotels
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
                    <span className="text-white/60">Real Hotels Created:</span>
                    <span className="text-white ml-2 font-medium">{stats.totalCreated}</span>
                  </div>
                </div>

                {stats.hotelDetails.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-white/80 text-sm mb-2">Created Hotels:</h5>
                    <div className="text-xs text-white/60 space-y-1 max-h-48 overflow-y-auto">
                      {stats.hotelDetails.map((hotel, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Building className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span>{hotel}</span>
                        </div>
                      ))}
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
                  <ul className="text-red-300 text-sm space-y-1 max-h-32 overflow-y-auto">
                    {stats.errors.slice(0, 10).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                    {stats.errors.length > 10 && (
                      <li className="text-red-400">... and {stats.errors.length - 10} more</li>
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
