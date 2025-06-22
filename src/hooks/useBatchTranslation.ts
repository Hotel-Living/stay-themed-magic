import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BatchTranslationResult {
  success: boolean;
  processed: number;
  errors: number;
  total: number;
  hasMore: boolean;
  message: string;
}

export const useBatchTranslation = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<BatchTranslationResult | null>(null);
  const { toast } = useToast();

  const startBatchTranslation = async (batchSize: number = 5) => {
    setLoading(true);
    setProgress(null);

    try {
      console.log(`Starting sequential batch translation with batch size: ${batchSize}`);
      
      const { data, error } = await supabase.functions.invoke('batch-translate-hotels', {
        body: {
          batchSize,
          languages: ['es', 'pt', 'ro']
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Translation service error: ${error.message}`);
      }

      if (data.success) {
        setProgress(data);
        toast({
          title: "Sequential Batch Translation Completed",
          description: `Processed ${data.processed} translations with ${data.errors} errors`,
          variant: data.errors > 0 ? "warning" : "default"
        });
      } else {
        throw new Error(data.error || 'Sequential batch translation failed');
      }

      return data;
    } catch (error) {
      console.error('Sequential batch translation error:', error);
      
      let errorMessage = "There was an error processing the sequential batch translation";
      
      if (error.message.includes('OpenAI API error: 429')) {
        errorMessage = "OpenAI API rate limit exceeded. The sequential processing should have prevented this - please try again.";
      } else if (error.message.includes('OpenAI API key not configured')) {
        errorMessage = "OpenAI API key is not configured. Please contact the administrator.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Sequential Batch Translation Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getTranslationStats = async () => {
    try {
      // Get total hotels
      const { count: totalHotels } = await supabase
        .from('hotels')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');

      // Get completed translations
      const { data: translations } = await supabase
        .from('hotel_translations')
        .select('hotel_id, language_code')
        .eq('translation_status', 'completed');

      const translatedHotels = new Set();
      translations?.forEach(t => translatedHotels.add(t.hotel_id));

      return {
        totalHotels: totalHotels || 0,
        translatedHotels: translatedHotels.size,
        pendingTranslations: (totalHotels || 0) - translatedHotels.size
      };
    } catch (error) {
      console.error('Error getting translation stats:', error);
      return { totalHotels: 0, translatedHotels: 0, pendingTranslations: 0 };
    }
  };

  return {
    loading,
    progress,
    startBatchTranslation,
    getTranslationStats
  };
};
