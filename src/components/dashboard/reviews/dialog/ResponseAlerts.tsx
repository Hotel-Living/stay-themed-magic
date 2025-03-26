
import React from 'react';
import { AlertTriangle, Sparkles, FileText } from 'lucide-react';
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
  if (isGenerating) {
    return (
      <Alert className="mt-2 bg-foreground/5 border-foreground/10">
        <Sparkles className="h-4 w-4 text-fuchsia-400 mr-2" />
        <AlertDescription>
          Generating AI response...
        </AlertDescription>
      </Alert>
    );
  }
  
  if (generationError) {
    return (
      <Alert className="mt-2 bg-red-500/10 border-red-500/20" variant="destructive">
        <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
        <AlertDescription>
          {generationError}
        </AlertDescription>
      </Alert>
    );
  }
  
  if (responseSource === 'ai') {
    return (
      <Alert className="mt-2 bg-fuchsia-500/10 border-fuchsia-500/20">
        <Sparkles className="h-4 w-4 text-fuchsia-400 mr-2" />
        <AlertDescription>
          AI-generated response applied. Feel free to edit it before submitting.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (responseSource === 'template') {
    return (
      <Alert className="mt-2 bg-blue-500/10 border-blue-500/20">
        <FileText className="h-4 w-4 text-blue-400 mr-2" />
        <AlertDescription>
          Template applied. You can customize it before submitting.
        </AlertDescription>
      </Alert>
    );
  }
  
  return null;
}
