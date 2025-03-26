
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";
import { ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';
import { ResponseTemplateManager } from '../templates/ResponseTemplateManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DialogControlsProps {
  selectedTone: ResponseTone;
  onToneChange: (value: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  selectedReviewsCount: number;
  onCustomResponse: (response: string) => void;
}

export function DialogControls({
  selectedTone,
  onToneChange,
  isGenerating,
  onGenerate,
  selectedReviewsCount,
  onCustomResponse,
}: DialogControlsProps) {
  const [activeTab, setActiveTab] = useState<string>("ai-generation");
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="ai-generation" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai-generation">AI Generation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai-generation" className="space-y-4">
          <h3 className="text-sm font-medium">AI Generation Settings</h3>
          <div className="flex items-center gap-4">
            <Select value={selectedTone} onValueChange={onToneChange}>
              <SelectTrigger className="w-[200px]">
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
            
            <Button
              onClick={onGenerate}
              disabled={isGenerating || selectedReviewsCount === 0}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate Responses
                </>
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <ResponseTemplateManager onSelectTemplate={onCustomResponse} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
