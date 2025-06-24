
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Camera, CheckCircle, XCircle } from 'lucide-react';

interface BatchResult {
  hotelId: string;
  hotelName: string;
  success: boolean;
  error: string | null;
  imageCount: number;
}

interface BatchResponse {
  message: string;
  totalHotels: number;
  processedCount: number;
  errorCount: number;
  results: BatchResult[];
}

export default function BatchImagePopulation() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<BatchResult[]>([]);
  const [summary, setSummary] = useState<{ total: number; processed: number; errors: number } | null>(null);
  const { toast } = useToast();

  const handleBatchPopulation = async () => {
    setIsProcessing(true);
    setResults([]);
    setSummary(null);

    try {
      const { data, error } = await supabase.functions.invoke('batch-populate-hotel-images');

      if (error) {
        throw error;
      }

      const response = data as BatchResponse;
      
      setResults(response.results || []);
      setSummary({
        total: response.totalHotels,
        processed: response.processedCount,
        errors: response.errorCount
      });

      toast({
        title: "Batch Processing Complete",
        description: `Processed ${response.processedCount} hotels with ${response.errorCount} errors`,
        variant: response.errorCount === 0 ? "default" : "destructive"
      });

    } catch (error: any) {
      console.error('Error in batch population:', error);
      toast({
        title: "Batch Processing Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Camera className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold">Batch Image Population</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          This will automatically populate images for all hotels that don't currently have any images. 
          Each hotel will receive 10 license-free images from Unsplash that match their city and style.
        </p>

        <Button
          onClick={handleBatchPopulation}
          disabled={isProcessing}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Camera className="w-4 h-4 mr-2" />
              Populate Images for All Hotels
            </>
          )}
        </Button>

        {summary && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Processing Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Hotels:</span>
                <span className="ml-2 font-medium">{summary.total}</span>
              </div>
              <div>
                <span className="text-gray-600">Successfully Processed:</span>
                <span className="ml-2 font-medium text-green-600">{summary.processed}</span>
              </div>
              <div>
                <span className="text-gray-600">Errors:</span>
                <span className="ml-2 font-medium text-red-600">{summary.errors}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Processing Results</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <div
                key={result.hotelId}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <span className="font-medium">{result.hotelName}</span>
                    {result.success ? (
                      <span className="ml-2 text-sm text-gray-600">
                        ({result.imageCount} images added)
                      </span>
                    ) : (
                      <span className="ml-2 text-sm text-red-600">
                        Error: {result.error}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
