
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';

interface Template {
  id: string;
  name: string;
  content: string;
  tone: ResponseTone;
}

interface TemplatePreviewProps {
  template: Template | null;
  onUseTemplate: (content: string) => void;
  getToneBadgeColor: (tone: ResponseTone) => string;
}

export function TemplatePreview({ template, onUseTemplate, getToneBadgeColor }: TemplatePreviewProps) {
  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-sm text-muted-foreground">
          Select a template to preview its content
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{template.name}</h4>
          <Badge className={`text-xs ${getToneBadgeColor(template.tone)}`} variant="outline">
            {template.tone}
          </Badge>
        </div>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => onUseTemplate(template.content)}
        >
          Use Template
        </Button>
      </div>
      <ScrollArea className="flex-1 mt-2">
        <p className="text-sm">{template.content}</p>
      </ScrollArea>
    </>
  );
}
