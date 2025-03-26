
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';

interface Template {
  id: string;
  name: string;
  content: string;
  tone: ResponseTone;
}

interface TemplateListProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
  onUseTemplate: (content: string) => void;
  onDeleteTemplate: (id: string) => void;
  getToneBadgeColor: (tone: ResponseTone) => string;
}

export function TemplateList({ 
  templates, 
  onSelectTemplate, 
  onUseTemplate, 
  onDeleteTemplate,
  getToneBadgeColor
}: TemplateListProps) {
  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <FileText className="h-12 w-12 text-muted-foreground/40 mb-2" />
        <p className="text-sm text-muted-foreground">
          No matching templates found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {templates.map((template) => (
        <div 
          key={template.id} 
          className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
          onClick={() => onSelectTemplate(template)}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm">{template.name}</h4>
              <Badge className={`text-xs ${getToneBadgeColor(template.tone)}`} variant="outline">
                {template.tone}
              </Badge>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUseTemplate(template.content);
                }}
                className="text-xs text-blue-500 hover:underline"
              >
                Use
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTemplate(template.id);
                }}
                className="text-xs text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {template.content}
          </p>
        </div>
      ))}
    </div>
  );
}
