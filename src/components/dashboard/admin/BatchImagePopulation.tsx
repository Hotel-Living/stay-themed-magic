
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Play, Clock, Settings } from "lucide-react";

export const BatchImagePopulation = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSettingUpCron, setIsSettingUpCron] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const { toast } = useToast();

  const handleBatchPopulate = async () => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('batch-populate-hotel-images');
      
      if (error) {
        throw error;
      }

      setLastResult(data);
      toast({
        title: "Batch processing completed",
        description: `Successfully processed ${data.successCount} hotels, ${data.errorCount} errors`,
      });
    } catch (error: any) {
      console.error('Error in batch populate:', error);
      toast({
        variant: "destructive",
        title: "Batch processing failed",
        description: error.message || "Unknown error occurred",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAutoPopulate = async () => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('auto-populate-images');
      
      if (error) {
        throw error;
      }

      setLastResult(data);
      toast({
        title: "Auto processing completed",
        description: data.message || "Processing completed successfully",
      });
    } catch (error: any) {
      console.error('Error in auto populate:', error);
      toast({
        variant: "destructive",
        title: "Auto processing failed",
        description: error.message || "Unknown error occurred",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSetupCron = async () => {
    setIsSettingUpCron(true);
    try {
      const { data, error } = await supabase.functions.invoke('setup-image-population-cron');
      
      if (error) {
        throw error;
      }

      toast({
        title: "Cron job configured",
        description: "Automatic image population will run every 12 hours",
      });
    } catch (error: any) {
      console.error('Error setting up cron:', error);
      toast({
        variant: "destructive",
        title: "Cron setup failed",
        description: error.message || "Unknown error occurred",
      });
    } finally {
      setIsSettingUpCron(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Hotel Image Population</h2>
        <p className="text-gray-600 mb-6">
          Manage automatic image population for hotels using the Unsplash API.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Play className="h-4 w-4" />
            Batch Processing
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Process all hotels without images immediately (respects rate limits).
          </p>
          <Button 
            onClick={handleBatchPopulate}
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Populate Images for All Hotels
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Rate-Limited Processing
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Process up to 4 hotels (40 API requests) respecting hourly limits.
          </p>
          <Button 
            onClick={handleAutoPopulate}
            disabled={isProcessing}
            variant="outline"
            className="w-full"
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Run Auto Population
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Cron Job Setup
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Configure automatic processing every 12 hours.
          </p>
          <Button 
            onClick={handleSetupCron}
            disabled={isSettingUpCron}
            variant="secondary"
            className="w-full"
          >
            {isSettingUpCron && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Setup Automatic Processing
          </Button>
        </div>
      </div>

      {lastResult && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Last Processing Result</h4>
          <div className="text-sm space-y-1">
            {lastResult.processedHotels && (
              <p>Processed Hotels: {lastResult.processedHotels}</p>
            )}
            {lastResult.successCount !== undefined && (
              <p>Successful: {lastResult.successCount}</p>
            )}
            {lastResult.errorCount !== undefined && (
              <p>Errors: {lastResult.errorCount}</p>
            )}
            {lastResult.apiUsage && (
              <p>API Usage: {lastResult.apiUsage.requestsUsed}/{lastResult.apiUsage.maxRequests} requests this hour</p>
            )}
            {lastResult.message && (
              <p className="text-blue-600">{lastResult.message}</p>
            )}
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">System Configuration</h4>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• Maximum 40 Unsplash API requests per hour</li>
          <li>• 10 images per hotel (4 hotels maximum per hour)</li>
          <li>• Automatic processing every 12 hours</li>
          <li>• Only processes approved hotels without images</li>
          <li>• Images are relevant to hotel city/style</li>
        </ul>
      </div>
    </div>
  );
};
