
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ResponseAlertsProps {
  generationError: string | null;
  responseSource: 'ai' | 'template' | null;
  isGenerating: boolean;
}

export function ResponseAlerts({ 
  generationError, 
  responseSource,
  isGenerating
}: ResponseAlertsProps) {
  return (
    <>
      {generationError && (
        <Alert variant="destructive" className="mb-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {generationError}
          </AlertDescription>
        </Alert>
      )}

      {responseSource === 'template' && !generationError && (
        <Alert className="mb-3 bg-amber-500/10 border-amber-500/30 text-amber-500">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This is a template-based response as our AI system was unavailable. Feel free to edit it.
          </AlertDescription>
        </Alert>
      )}
      
      {isGenerating && (
        <div className="mt-2 flex items-center gap-2 text-xs text-fuchsia-400">
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 rounded-full border-2 border-fuchsia-400/20 border-t-fuchsia-400 animate-spin"></div>
          </div>
          <p>Creating a personalized response based on the guest's feedback...</p>
        </div>
      )}
    </>
  );
}
