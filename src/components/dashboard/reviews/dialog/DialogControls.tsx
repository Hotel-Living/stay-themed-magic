
import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';

interface DialogControlsProps {
  selectedTone: ResponseTone;
  onToneChange: (value: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  selectedReviewsCount: number;
}

export function DialogControls({
  selectedTone,
  onToneChange,
  isGenerating,
  onGenerate,
  selectedReviewsCount,
}: DialogControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <Select value={selectedTone} onValueChange={onToneChange}>
        <SelectTrigger className="w-[130px] h-8 text-xs">
          <SelectValue placeholder="Select tone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="friendly">Friendly</SelectItem>
          <SelectItem value="apologetic">Apologetic</SelectItem>
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
  );
}
