
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Type, Sparkles, FileText } from "lucide-react";

export const BatchTextCompletion = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const { toast } = useToast();

  const handleBatchGenerate = async () => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('batch-generate-text-completions');
      
      if (error) {
        throw error;
      }

      setLastResult(data);
      toast({
        title: "Text completion processing completed",
        description: `Successfully processed ${data.successCount} hotels, ${data.errorCount} errors`,
      });
    } catch (error: any) {
      console.error('Error in batch text completion:', error);
      toast({
        variant: "destructive",
        title: "Text completion processing failed",
        description: error.message || "Unknown error occurred",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Hotel Text Completion Generator</h2>
        <p className="text-gray-600 mb-6">
          Generate AI-powered completions for hotel description fields using OpenAI.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Type className="h-4 w-4" />
            Batch Text Generation
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Generate 10 variations each for "Ideal Guests Enjoy", "Atmosphere Is", and "Location Perfect For" fields for all hotels.
          </p>
          <Button 
            onClick={handleBatchGenerate}
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Text Completions for All Hotels
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
            {lastResult.totalCompletions && (
              <p>Total Completions Generated: {lastResult.totalCompletions}</p>
            )}
            {lastResult.message && (
              <p className="text-blue-600">{lastResult.message}</p>
            )}
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Text Generation Configuration
        </h4>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• Generates 10 variations for each text field</li>
          <li>• Fields: "Ideal Guests Enjoy", "Atmosphere Is", "Location Perfect For"</li>
          <li>• Uses OpenAI GPT model for natural language generation</li>
          <li>• Only processes approved hotels with existing basic information</li>
          <li>• Results are contextual and property-specific</li>
        </ul>
      </div>
    </div>
  );
};
