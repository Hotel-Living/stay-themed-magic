
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
import { Badge } from "@/components/ui/badge";

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
  
  // Get tone display color
  const getToneColor = (tone: ResponseTone) => {
    switch (tone) {
      case 'professional': return 'text-blue-600';
      case 'friendly': return 'text-green-600';
      case 'apologetic': return 'text-amber-600';
      case 'enthusiastic': return 'text-purple-600';
      case 'formal': return 'text-gray-600';
      case 'grateful': return 'text-pink-600';
      default: return '';
    }
  };
  
  // Get tone badge color
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
                <SelectValue placeholder="Select tone">
                  <div className="flex items-center gap-2">
                    <span className={getToneColor(selectedTone)}>
                      {selectedTone.charAt(0).toUpperCase() + selectedTone.slice(1)}
                    </span>
                    <Badge className={`text-xs ${getToneBadgeColor(selectedTone)}`} variant="outline">
                      {selectedTone}
                    </Badge>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">Professional</span>
                    <Badge className="bg-blue-100 text-blue-800 text-xs" variant="outline">professional</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="friendly">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">Friendly</span>
                    <Badge className="bg-green-100 text-green-800 text-xs" variant="outline">friendly</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="apologetic">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-600">Apologetic</span>
                    <Badge className="bg-amber-100 text-amber-800 text-xs" variant="outline">apologetic</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="enthusiastic">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">Enthusiastic</span>
                    <Badge className="bg-purple-100 text-purple-800 text-xs" variant="outline">enthusiastic</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="formal">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Formal</span>
                    <Badge className="bg-gray-100 text-gray-800 text-xs" variant="outline">formal</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="grateful">
                  <div className="flex items-center gap-2">
                    <span className="text-pink-600">Grateful</span>
                    <Badge className="bg-pink-100 text-pink-800 text-xs" variant="outline">grateful</Badge>
                  </div>
                </SelectItem>
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
