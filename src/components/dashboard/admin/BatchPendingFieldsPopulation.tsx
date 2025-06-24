
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Play, CheckCircle, AlertCircle } from "lucide-react";

interface ProcessingStats {
  totalPending: number;
  processed: number;
  fieldsFilledCount: number;
  errors: string[];
}

export function BatchPendingFieldsPopulation() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState<ProcessingStats | null>(null);
  const { toast } = useToast();

  const handleBatchProcess = async () => {
    setIsProcessing(true);
    setStats(null);

    try {
      const { data, error } = await supabase.functions.invoke('batch-populate-pending-fields', {
        body: { action: 'process_pending_fields' }
      });

      if (error) {
        throw error;
      }

      setStats(data.stats);
      
      toast({
        title: "Batch Processing Complete",
        description: `Processed ${data.stats.processed} pending properties, filled ${data.stats.fieldsFilledCount} empty fields.`,
      });

    } catch (error) {
      console.error('Batch processing error:', error);
      toast({
        title: "Processing Failed",
        description: "An error occurred during batch processing. Please try again.",
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
            <Play className="w-5 h-5" />
            Batch Fill Pending Fields
          </CardTitle>
          <CardDescription className="text-white/80">
            Automatically fill empty fields in pending properties with randomized data according to predefined rules.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#5A1876]/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Automated Field Rules:</h4>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• Room Types: Always "double"</li>
              <li>• Base Prices: Random between 1200-1600</li>
              <li>• Dynamic Pricing: Always enabled with 20% cap</li>
              <li>• Meal Plans: "Half board"</li>
              <li>• Category: Random 3-4 stars</li>
              <li>• Property Type: Random hotel/resort</li>
              <li>• Affinities: Random 1-3 selections</li>
              <li>• Features: Random 5-10 selections</li>
            </ul>
          </div>

          <Button
            onClick={handleBatchProcess}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Fill Empty Fields in Pending Properties
              </>
            )}
          </Button>

          {stats && (
            <div className="space-y-3">
              <div className="bg-[#5A1876]/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Processing Results
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Total Pending:</span>
                    <span className="text-white ml-2 font-medium">{stats.totalPending}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Properties Processed:</span>
                    <span className="text-white ml-2 font-medium">{stats.processed}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-white/60">Fields Filled:</span>
                    <span className="text-white ml-2 font-medium">{stats.fieldsFilledCount}</span>
                  </div>
                </div>
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
