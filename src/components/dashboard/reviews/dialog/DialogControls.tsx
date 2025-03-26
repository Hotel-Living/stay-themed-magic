
import React, { useState } from 'react';
import { Loader2, Sparkles, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DialogControlsProps {
  selectedTone: ResponseTone;
  onToneChange: (value: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  selectedReviewsCount: number;
  onCustomResponse?: (value: string) => void;
}

export function DialogControls({
  selectedTone,
  onToneChange,
  isGenerating,
  onGenerate,
  selectedReviewsCount,
  onCustomResponse,
}: DialogControlsProps) {
  const [selectedTab, setSelectedTab] = useState<string>("ai");
  const [customResponse, setCustomResponse] = useState<string>("");

  const handleCustomResponseSubmit = () => {
    if (onCustomResponse && customResponse.trim()) {
      onCustomResponse(customResponse);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Tabs defaultValue="ai" className="w-full" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="ai">AI Generation</TabsTrigger>
          <TabsTrigger value="custom">Custom Response</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai" className="space-y-2">
          <div className="flex items-center gap-2">
            <Select value={selectedTone} onValueChange={onToneChange}>
              <SelectTrigger className="w-[130px] h-8 text-xs">
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
              variant="outline"
              size="sm"
              className="gap-1 text-fuchsia-400 border-fuchsia-400/20 hover:bg-fuchsia-400/10"
              onClick={onGenerate}
              disabled={isGenerating || selectedReviewsCount === 0}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" />
                  Generate All
                </>
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-2">
          <div className="flex flex-col gap-2">
            <textarea
              className="w-full border border-input rounded-md h-24 p-2 text-sm"
              placeholder="Write a custom response that will be applied to all selected reviews..."
              value={customResponse}
              onChange={(e) => setCustomResponse(e.target.value)}
            />
            <Button
              variant="outline"
              size="sm"
              className="gap-1 ml-auto"
              onClick={handleCustomResponseSubmit}
              disabled={!customResponse.trim() || selectedReviewsCount === 0}
            >
              <PenLine className="w-3 h-3" />
              Apply to Selected
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
