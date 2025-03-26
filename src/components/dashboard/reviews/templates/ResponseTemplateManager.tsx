
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Save, X, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

interface Template {
  id: string;
  name: string;
  content: string;
  tone: ResponseTone;
}

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
  const { toast } = useToast();

  // Load templates from localStorage on component mount
  useEffect(() => {
    try {
      const savedTemplates = localStorage.getItem('responseTemplates');
      if (savedTemplates) {
        setTemplates(JSON.parse(savedTemplates));
      }
    } catch (error) {
      console.error('Error loading templates from localStorage:', error);
    }
  }, []);

  // Save templates to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('responseTemplates', JSON.stringify(templates));
    } catch (error) {
      console.error('Error saving templates to localStorage:', error);
    }
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
    
    toast({
      title: "Template deleted",
      description: templateToDelete ? `"${templateToDelete.name}" has been removed.` : "Template has been removed.",
    });
  };

  // Get badge color based on tone
  const getToneBadgeColor = (tone: ResponseTone) => {
    switch (tone) {
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'friendly': return 'bg-green-100 text-green-800';
      case 'apologetic': return 'bg-amber-100 text-amber-800';
      case 'enthusiastic': return 'bg-purple-100 text-purple-800';
      case 'formal': return 'bg-gray-100 text-gray-800';
      case 'grateful': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          <Select 
            value={newTemplate.tone} 
            onValueChange={(value) => setNewTemplate({ ...newTemplate, tone: value as ResponseTone })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="apologetic">Apologetic</SelectItem>
              <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="grateful">Grateful</SelectItem>
            </SelectContent>
          </Select>
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
                setNewTemplate({ name: '', content: '', tone: 'professional' });
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
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <Badge className={`text-xs ${getToneBadgeColor(template.tone)}`} variant="outline">
                      {template.tone}
                    </Badge>
                  </div>
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
            <FileText className="h-12 w-12 text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">
              No templates yet. Create one to get started!
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
