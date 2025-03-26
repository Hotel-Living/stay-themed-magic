
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Save, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Template {
  id: string;
  name: string;
  content: string;
}

interface ResponseTemplateManagerProps {
  onSelectTemplate: (content: string) => void;
}

export function ResponseTemplateManager({ onSelectTemplate }: ResponseTemplateManagerProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ name: '', content: '' });

  const handleCreateTemplate = () => {
    if (newTemplate.name && newTemplate.content) {
      const template = {
        id: crypto.randomUUID(),
        name: newTemplate.name,
        content: newTemplate.content
      };
      setTemplates([...templates, template]);
      setNewTemplate({ name: '', content: '' });
      setIsCreating(false);
    }
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Response Templates</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsCreating(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Template
        </Button>
      </div>

      {isCreating && (
        <div className="space-y-4 p-4 border rounded-lg">
          <Input
            placeholder="Template name"
            value={newTemplate.name}
            onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
          />
          <Textarea
            placeholder="Template content"
            value={newTemplate.content}
            onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
            className="min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setIsCreating(false);
                setNewTemplate({ name: '', content: '' });
              }}
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button 
              size="sm"
              onClick={handleCreateTemplate}
            >
              <Save className="w-4 h-4 mr-1" />
              Save Template
            </Button>
          </div>
        </div>
      )}

      <ScrollArea className="h-[200px] border rounded-lg p-4">
        {templates.length > 0 ? (
          <div className="space-y-3">
            {templates.map((template) => (
              <div 
                key={template.id} 
                className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{template.name}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelectTemplate(template.content)}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Use
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
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
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-sm text-muted-foreground">
              No templates yet. Create one to get started!
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
