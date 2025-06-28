
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function FernandoBatchThemeAssignment() {
  const [hotelIds, setHotelIds] = useState('');
  const [clearExisting, setClearExisting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    totalCreated?: number;
    totalFailed?: number;
    failureDetails?: string[];
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hotelIds.trim()) {
      setResult({
        success: false,
        message: 'Please enter hotel IDs'
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setResult(null);

    try {
      // Parse hotel IDs from input
      const hotelIdArray = hotelIds
        .split(/[,\n\s]+/)
        .map(id => id.trim())
        .filter(id => id.length > 0);

      if (hotelIdArray.length === 0) {
        throw new Error('No valid hotel IDs provided');
      }

      console.log(`Starting batch theme assignment for ${hotelIdArray.length} hotels`);
      setProgress(10);

      // Call the edge function using Supabase's function invocation
      const { data, error } = await supabase.functions.invoke('batch-theme-assignment', {
        body: {
          hotelIds: hotelIdArray,
          clearExisting: clearExisting
        }
      });

      setProgress(90);

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Function call failed: ${error.message}`);
      }

      if (!data) {
        throw new Error('No response data received from function');
      }

      console.log('Edge function response:', data);
      setProgress(100);
      setResult(data);

    } catch (error) {
      console.error('Batch theme assignment error:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-[#7a0486] p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-4 text-white">Batch Theme Assignment</h2>
        <p className="text-white/80 mb-6">
          Assign random themes to multiple hotels at once. Each hotel will get 2-3 randomly selected themes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="hotelIds" className="text-white font-medium">
              Hotel IDs (comma or newline separated)
            </Label>
            <textarea
              id="hotelIds"
              value={hotelIds}
              onChange={(e) => setHotelIds(e.target.value)}
              placeholder="Enter hotel IDs, separated by commas or line breaks..."
              className="w-full mt-2 p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/60 min-h-[120px] resize-y"
              disabled={isProcessing}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="clearExisting"
              checked={clearExisting}
              onCheckedChange={setClearExisting}
              disabled={isProcessing}
              className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-[#7a0486]"
            />
            <Label htmlFor="clearExisting" className="text-white">
              Clear existing themes before assigning new ones
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isProcessing || !hotelIds.trim()}
            className="w-full bg-white text-[#7a0486] hover:bg-white/90 font-semibold py-3"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Assign Themes'
            )}
          </Button>
        </form>
      </div>

      {isProcessing && (
        <div className="bg-[#7a0486] p-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Loader2 className="w-5 h-5 animate-spin text-white" />
            <span className="text-white font-medium">Processing theme assignments...</span>
          </div>
          <Progress value={progress} className="w-full bg-white/20" />
        </div>
      )}

      {result && (
        <Alert className={`border ${result.success ? 'bg-green-600 border-green-500' : 'bg-red-600 border-red-500'}`}>
          <div className="flex items-start gap-3">
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-white mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-white mt-0.5" />
            )}
            <div className="flex-1">
              <AlertDescription className="text-white font-medium">
                {result.message}
              </AlertDescription>
              
              {result.success && result.totalCreated !== undefined && (
                <div className="mt-2 text-white/90 text-sm">
                  <p>✅ Total assignments created: {result.totalCreated}</p>
                  {result.totalFailed! > 0 && (
                    <p>❌ Total failures: {result.totalFailed}</p>
                  )}
                </div>
              )}

              {result.failureDetails && result.failureDetails.length > 0 && (
                <div className="mt-3">
                  <p className="text-white font-medium mb-2">Failure Details:</p>
                  <div className="bg-black/20 p-3 rounded border max-h-40 overflow-y-auto">
                    {result.failureDetails.map((detail, index) => (
                      <p key={index} className="text-white/90 text-sm mb-1">
                        • {detail}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Alert>
      )}

      <div className="bg-[#7a0486] p-4 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold mb-2 text-white">How it works:</h3>
        <ul className="text-white/80 text-sm space-y-1">
          <li>• Each hotel gets 2-3 randomly selected themes</li>
          <li>• Process runs in batches of 5 hotels at a time</li>
          <li>• Optionally clears existing themes before assigning new ones</li>
          <li>• Provides detailed success/failure reporting</li>
        </ul>
      </div>
    </div>
  );
}
