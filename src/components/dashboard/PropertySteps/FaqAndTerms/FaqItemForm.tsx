
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FaqItemFormProps {
  newFaqQuestion: string;
  setNewFaqQuestion: (value: string) => void;
  newFaqAnswer: string;
  setNewFaqAnswer: (value: string) => void;
  addFaqItem: () => void;
  onCancel: () => void;
}

export default function FaqItemForm({
  newFaqQuestion,
  setNewFaqQuestion,
  newFaqAnswer,
  setNewFaqAnswer,
  addFaqItem,
  onCancel
}: FaqItemFormProps) {
  return (
    <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30 space-y-3">
      <div>
        <Label htmlFor="new-faq-question" className="block text-sm font-medium mb-1 uppercase text-white">
          New Question
        </Label>
        <Input 
          id="new-faq-question" 
          placeholder="Enter question" 
          value={newFaqQuestion} 
          onChange={e => setNewFaqQuestion(e.target.value)} 
          className="w-full bg-[#76027c] text-white" 
        />
      </div>
      
      <div>
        <Label htmlFor="new-faq-answer" className="block text-sm font-medium mb-1 uppercase text-white">
          Answer
        </Label>
        <Textarea
          id="new-faq-answer"
          placeholder="Enter answer"
          value={newFaqAnswer}
          onChange={e => setNewFaqAnswer(e.target.value)}
          className="w-full bg-[#7a0380] text-white"
          rows={3}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button onClick={onCancel} variant="outline" className="text-fuchsia-300 border-fuchsia-300">
          Cancel
        </Button>
        <Button 
          onClick={addFaqItem} 
          disabled={!newFaqQuestion.trim() || !newFaqAnswer.trim()} 
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
        >
          Add FAQ
        </Button>
      </div>
    </div>
  );
}
