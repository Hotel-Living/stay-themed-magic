
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Save } from 'lucide-react';
import { ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TemplateFormProps {
  template: {
    name: string;
    content: string;
    tone: ResponseTone;
  };
  setTemplate: React.Dispatch<React.SetStateAction<{
    name: string;
    content: string;
    tone: ResponseTone;
  }>>;
  onSave: () => void;
  onCancel: () => void;
}

export function TemplateForm({ template, setTemplate, onSave, onCancel }: TemplateFormProps) {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <Input
        placeholder="Template name"
        value={template.name}
        onChange={(e) => setTemplate({ ...template, name: e.target.value })}
      />
      <Select 
        value={template.tone} 
        onValueChange={(value) => setTemplate({ ...template, tone: value as ResponseTone })}
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
        value={template.content}
        onChange={(e) => setTemplate({ ...template, content: e.target.value })}
        className="min-h-[100px]"
      />
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCancel}
        >
          <X className="w-4 h-4 mr-1" />
          Cancel
        </Button>
        <Button 
          size="sm"
          onClick={onSave}
        >
          <Save className="w-4 h-4 mr-1" />
          Save Template
        </Button>
      </div>
    </div>
  );
}
