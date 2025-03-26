
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface ResponseEditorProps {
  reviewId: string;
  responseText: string;
  onUpdateResponse: (reviewId: string, newResponse: string) => void;
}

export function ResponseEditor({ 
  reviewId, 
  responseText, 
  onUpdateResponse 
}: ResponseEditorProps) {
  const [editedResponse, setEditedResponse] = useState(responseText);
  
  const handleSave = () => {
    onUpdateResponse(reviewId, editedResponse);
  };
  
  const handleCancel = () => {
    // Reset to original and exit edit mode
    onUpdateResponse(reviewId, responseText);
  };
  
  return (
    <div className="mt-2 border-t pt-2">
      <p className="font-medium text-xs text-fuchsia-500 mb-1">Edit Response:</p>
      <Textarea
        value={editedResponse}
        onChange={(e) => setEditedResponse(e.target.value)}
        className="w-full text-xs min-h-[80px] mb-2"
      />
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 px-2 text-xs"
          onClick={handleCancel}
        >
          <X className="w-3 h-3 mr-1" />
          Cancel
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="h-7 px-2 text-xs bg-fuchsia-500 hover:bg-fuchsia-600"
          onClick={handleSave}
        >
          <Check className="w-3 h-3 mr-1" />
          Save
        </Button>
      </div>
    </div>
  );
}
