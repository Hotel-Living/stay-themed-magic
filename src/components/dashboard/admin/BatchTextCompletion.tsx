
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Type, Sparkles, FileText, Target } from "lucide-react";

export const BatchTextCompletion = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const [lastAutoFillResult, setLastAutoFillResult] = useState<any>(null);
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

  const handleAutoFillEmptyFields = async () => {
    setIsAutoFilling(true);
    try {
      const { data, error } = await supabase.functions.invoke('batch-generate-text-completions', {
        body: { autoFillMode: true }
      });
      
      if (error) {
        throw error;
      }

      setLastAutoFillResult(data);
      toast({
        title: "Auto-fill processing completed",
        description: `Filled ${data.fieldsFilledCount || 0} empty fields across ${data.successCount} hotels`,
      });
    } catch (error: any) {
      console.error('Error in auto-fill text completion:', error);
      toast({
        variant: "destructive",
        title: "Auto-fill processing failed",
        description: error.message || "Unknown error occurred",
      });
    } finally {
      setIsAutoFilling(false);
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
            disabled={isProcessing || isAutoFilling}
            className="w-full"
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Text Completions for All Hotels
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Auto-Fill Empty Fields
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Automatically detect and fill only empty "Ideal Guests Enjoy", "Atmosphere Is", and "Location Perfect For" fields. Existing content will never be overwritten.
          </p>
          <Button 
            onClick={handleAutoFillEmptyFields}
            disabled={isProcessing || isAutoFilling}
            className="w-full"
            variant="outline"
          >
            {isAutoFilling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Target className="mr-2 h-4 w-4" />
            Auto-Fill Empty Fields Only
          </Button>
        </div>
      </div>

      {lastResult && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Last Batch Generation Result</h4>
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

      {lastAutoFillResult && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold mb-2">Last Auto-Fill Result</h4>
          <div className="text-sm space-y-1">
            {lastAutoFillResult.processedHotels && (
              <p>Hotels Processed: {lastAutoFillResult.processedHotels}</p>
            )}
            {lastAutoFillResult.hotelsWithEmptyFields !== undefined && (
              <p>Hotels with Empty Fields: {lastAutoFillResult.hotelsWithEmptyFields}</p>
            )}
            {lastAutoFillResult.fieldsFilledCount !== undefined && (
              <p>Fields Filled: {lastAutoFillResult.fieldsFilledCount}</p>
            )}
            {lastAutoFillResult.successCount !== undefined && (
              <p>Successful: {lastAutoFillResult.successCount}</p>
            )}
            {lastAutoFillResult.errorCount !== undefined && (
              <p>Errors: {lastAutoFillResult.errorCount}</p>
            )}
            {lastAutoFillResult.message && (
              <p className="text-green-600">{lastAutoFillResult.message}</p>
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
          <li>• <strong>Batch Generation:</strong> Generates 10 variations for each text field</li>
          <li>• <strong>Auto-Fill Mode:</strong> Only fills empty fields, never overwrites existing content</li>
          <li>• Fields: "Ideal Guests Enjoy", "Atmosphere Is", "Location Perfect For"</li>
          <li>• Uses OpenAI GPT model for natural language generation</li>
          <li>• Only processes approved hotels with existing basic information</li>
          <li>• Results are contextual and property-specific</li>
        </ul>
      </div>
    </div>
  );
};
