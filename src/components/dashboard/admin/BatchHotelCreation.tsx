
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, CheckCircle, AlertCircle, Globe } from "lucide-react";

interface CreationStats {
  totalCountries: number;
  processedCountries: number;
  hotelsCreated: number;
  errors: string[];
  countryProgress: { [key: string]: number };
}

const TARGET_COUNTRIES = [
  "Austria", "Belgium", "Canada", "Denmark", "Finland", "France", 
  "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", 
  "Japan", "Luxembourg", "Netherlands", "Norway", "Poland", 
  "Portugal", "Romania", "Sweden", "Switzerland", "Thailand", 
  "Turkey", "United Kingdom"
];

export function BatchHotelCreation() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState<CreationStats | null>(null);
  const { toast } = useToast();

  const handleBatchCreation = async () => {
    setIsProcessing(true);
    setStats(null);

    try {
      const { data, error } = await supabase.functions.invoke('batch-create-hotels', {
        body: { 
          action: 'create_hotels_by_country',
          countries: TARGET_COUNTRIES,
          hotelsPerCountry: 3
        }
      });

      if (error) {
        throw error;
      }

      setStats(data.stats);
      
      toast({
        title: "Hotel Creation Complete",
        description: `Successfully created ${data.stats.hotelsCreated} hotels across ${data.stats.processedCountries} countries.`,
      });

    } catch (error) {
      console.error('Batch hotel creation error:', error);
      toast({
        title: "Creation Failed",
        description: "An error occurred during hotel creation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#7a0486]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Batch Hotel Creation
          </CardTitle>
          <CardDescription className="text-white/80">
            Create complete hotel records with all text-based fields across multiple countries.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#5A1876]/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Target Countries ({TARGET_COUNTRIES.length})
            </h4>
            <div className="grid grid-cols-3 gap-2 text-white/80 text-sm">
              {TARGET_COUNTRIES.map(country => (
                <div key={country} className="flex items-center gap-1">
                  <span>•</span>
                  <span>{country}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#5A1876]/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Creation Parameters:</h4>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• Hotels per Country: 3</li>
              <li>• Total Hotels: 72 (3 × 24 countries)</li>
              <li>• Real hotel names and addresses</li>
              <li>• Complete text data (descriptions, features, etc.)</li>
              <li>• Randomized pricing and categories</li>
              <li>• NO images (handled by separate batch)</li>
            </ul>
          </div>

          <Button
            onClick={handleBatchCreation}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Hotels...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create 72 Hotels Across All Countries
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
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Countries Processed:</span>
                    <span className="text-white ml-2 font-medium">{stats.processedCountries}/{stats.totalCountries}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Hotels Created:</span>
                    <span className="text-white ml-2 font-medium">{stats.hotelsCreated}</span>
                  </div>
                </div>

                {Object.keys(stats.countryProgress).length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-white/80 text-sm mb-2">Progress by Country:</h5>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {Object.entries(stats.countryProgress).map(([country, count]) => (
                        <div key={country} className="text-white/60">
                          {country}: {count} hotels
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
