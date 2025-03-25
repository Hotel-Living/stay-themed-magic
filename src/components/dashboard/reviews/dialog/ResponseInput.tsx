
import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';

interface ResponseInputProps {
  response: string;
  setResponse: (value: string) => void;
  isGenerating: boolean;
  generateAIResponse: (tone: ResponseTone) => void;
}

export function ResponseInput({ 
  response, 
  setResponse, 
  isGenerating, 
  generateAIResponse 
}: ResponseInputProps) {
  const [selectedTone, setSelectedTone] = useState<ResponseTone>('professional');
  
  const handleToneChange = (value: string) => {
    setSelectedTone(value as ResponseTone);
  };
  
  const handleGenerateResponse = () => {
    generateAIResponse(selectedTone);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="response" className="text-sm font-medium">
          Your Response
        </label>
        <div className="flex items-center gap-2">
          <Select value={selectedTone} onValueChange={handleToneChange}>
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
            type="button"
            variant="outline"
            size="sm"
            className="gap-1 text-fuchsia-400 border-fuchsia-400/20 hover:bg-fuchsia-400/10"
            onClick={handleGenerateResponse}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3" />
                AI Suggest
              </>
            )}
          </Button>
        </div>
      </div>

      <Textarea
        id="response"
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Write your response here..."
        className="mt-1 h-32"
      />
    </>
  );
}
