
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';
import { TemplateForm } from './TemplateForm';
import { TemplateList } from './TemplateList';
import { TemplatePreview } from './TemplatePreview';
import { TemplateSearch } from './TemplateSearch';
import { 
  Template, 
  getToneBadgeColor, 
  filterTemplates,
  saveTemplatesToStorage,
  loadTemplatesFromStorage
} from './utils/templateUtils';

interface ResponseTemplateManagerProps {
  onSelectTemplate: (content: string) => void;
}

export function ResponseTemplateManager({ onSelectTemplate }: ResponseTemplateManagerProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ 
    name: '', 
    content: '',
    tone: 'professional' as ResponseTone 
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [toneFilter, setToneFilter] = useState<ResponseTone | 'all'>('all');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const { toast } = useToast();

  // Load templates from localStorage on component mount
  useEffect(() => {
    const loadedTemplates = loadTemplatesFromStorage();
    setTemplates(loadedTemplates);
  }, []);

  // Save templates to localStorage whenever they change
  useEffect(() => {
    saveTemplatesToStorage(templates);
  }, [templates]);

  const handleCreateTemplate = () => {
    if (newTemplate.name && newTemplate.content) {
      const template = {
        id: crypto.randomUUID(),
        name: newTemplate.name,
        content: newTemplate.content,
        tone: newTemplate.tone
      };
      
      const updatedTemplates = [...templates, template];
      setTemplates(updatedTemplates);
      setNewTemplate({ name: '', content: '', tone: 'professional' });
      setIsCreating(false);
      
      toast({
        title: "Template saved",
        description: `"${template.name}" has been saved to your templates.`,
      });
    }
  };

  const handleDeleteTemplate = (id: string) => {
    const templateToDelete = templates.find(t => t.id === id);
    setTemplates(templates.filter(t => t.id !== id));
    
    if (previewTemplate?.id === id) {
      setPreviewTemplate(null);
    }
    
    toast({
      title: "Template deleted",
      description: templateToDelete ? `"${templateToDelete.name}" has been removed.` : "Template has been removed.",
    });
  };

  // Filter templates based on search query and tone filter
  const filteredTemplates = filterTemplates(templates, searchQuery, toneFilter);

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

      {/* Search and filter bar */}
      <TemplateSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toneFilter={toneFilter}
        setToneFilter={setToneFilter}
      />

      {isCreating && (
        <TemplateForm 
          template={newTemplate}
          setTemplate={setNewTemplate}
          onSave={handleCreateTemplate}
          onCancel={() => {
            setIsCreating(false);
            setNewTemplate({ name: '', content: '', tone: 'professional' });
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScrollArea className="h-[200px] border rounded-lg p-4">
          {templates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-sm text-muted-foreground">
                  No templates yet. Create one to get started!
                </p>
              </div>
            </div>
          ) : (
            <TemplateList 
              templates={filteredTemplates}
              onSelectTemplate={setPreviewTemplate}
              onUseTemplate={onSelectTemplate}
              onDeleteTemplate={handleDeleteTemplate}
              getToneBadgeColor={getToneBadgeColor}
            />
          )}
        </ScrollArea>
        
        {/* Template preview section */}
        <div className="border rounded-lg p-4 h-[200px] flex flex-col">
          <TemplatePreview 
            template={previewTemplate}
            onUseTemplate={onSelectTemplate}
            getToneBadgeColor={getToneBadgeColor}
          />
        </div>
      </div>
    </div>
  );
}
