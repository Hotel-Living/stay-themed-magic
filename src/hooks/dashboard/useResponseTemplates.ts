
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface ResponseTemplate {
  id: string;
  name: string;
  content: string;
  tone: 'professional' | 'friendly' | 'apologetic';
  property_id?: string | null;
}

export function useResponseTemplates(propertyId?: string | null) {
  const [templates, setTemplates] = useState<ResponseTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch templates from the database or use default ones
  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Default templates as fallback
        const defaultTemplates: ResponseTemplate[] = [
          {
            id: 'default-professional',
            name: 'Default Professional',
            content: 'Thank you for your feedback. We appreciate your comments and will take them into consideration to improve our services.',
            tone: 'professional'
          },
          {
            id: 'default-friendly',
            name: 'Default Friendly',
            content: 'Thanks so much for sharing your experience with us! We're glad you stayed with us and hope to see you again soon!',
            tone: 'friendly'
          },
          {
            id: 'default-apologetic',
            name: 'Default Apologetic',
            content: 'We sincerely apologize for not meeting your expectations. We take your feedback seriously and will work hard to address the issues you mentioned.',
            tone: 'apologetic'
          }
        ];
        
        // In a real app, we would fetch from the database
        // For now, just simulate with a delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In the future, this would be a real database query:
        // const { data, error } = await supabase
        //   .from('response_templates')
        //   .select('*')
        //   .eq('property_id', propertyId)
        //   .order('name');
        
        // if (error) throw error;
        
        setTemplates(defaultTemplates);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError(err instanceof Error ? err.message : 'Failed to load templates');
        
        toast({
          title: 'Error loading templates',
          description: 'Could not load response templates. Using defaults instead.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTemplates();
  }, [propertyId, toast]);

  const applyTemplate = (templateId: string): string | null => {
    const template = templates.find(t => t.id === templateId);
    return template ? template.content : null;
  };

  return {
    templates,
    isLoading,
    error,
    applyTemplate
  };
}
