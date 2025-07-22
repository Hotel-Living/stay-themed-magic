
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const ReprocessJotFormSubmissions = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleReprocess = async () => {
    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('reprocess-jotform-submissions');
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Reprocessing Complete",
        description: `${data.message}. Processed: ${data.processed}, Errors: ${data.errors}`,
      });
      
    } catch (error: any) {
      console.error('Reprocessing error:', error);
      toast({
        title: "Reprocessing Failed",
        description: error.message || "There was an error reprocessing the submissions",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Reprocess JotForm Submissions</h3>
        <p className="text-sm text-muted-foreground">
          This will attempt to reprocess all failed JotForm submissions and create hotel records for them.
        </p>
      </div>
      
      <Button 
        onClick={handleReprocess} 
        disabled={isProcessing}
        variant="outline"
      >
        {isProcessing ? 'Processing...' : 'Reprocess Submissions'}
      </Button>
    </div>
  );
};
