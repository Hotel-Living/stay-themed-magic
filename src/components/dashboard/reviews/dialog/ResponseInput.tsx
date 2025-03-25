
import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ResponseInputProps {
  response: string;
  setResponse: (value: string) => void;
  isGenerating: boolean;
  generateAIResponse: () => void;
}

export function ResponseInput({ 
  response, 
  setResponse, 
  isGenerating, 
  generateAIResponse 
}: ResponseInputProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="response" className="text-sm font-medium">
          Your Response
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1 text-fuchsia-400 border-fuchsia-400/20 hover:bg-fuchsia-400/10"
          onClick={generateAIResponse}
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
