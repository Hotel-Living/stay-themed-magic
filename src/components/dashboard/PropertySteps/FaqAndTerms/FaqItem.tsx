
import React from "react";
import { Edit2, Trash2, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaqItem } from "./types";

interface FaqItemProps {
  item: FaqItem;
  index: number;
  updateFaqItem: (index: number, field: keyof FaqItem, value: string) => void;
  removeFaqItem: (index: number) => void;
  startEditingFaq: (index: number) => void;
  saveFaqItem: (index: number) => void;
}

export default function FaqItemComponent({
  item,
  index,
  updateFaqItem,
  removeFaqItem,
  startEditingFaq,
  saveFaqItem
}: FaqItemProps) {
  if (item.isEditing) {
    return (
      <div className="space-y-3">
        <div>
          <Label htmlFor={`faq-question-${index}`} className="block mb-1 text-white">Question</Label>
          <Input 
            id={`faq-question-${index}`}
            value={item.question}
            onChange={(e) => updateFaqItem(index, 'question', e.target.value)}
            className="w-full bg-[#7a0380]/80 text-white"
          />
        </div>
        <div>
          <Label htmlFor={`faq-answer-${index}`} className="block mb-1 text-white">Answer</Label>
          <Textarea 
            id={`faq-answer-${index}`}
            value={item.answer}
            onChange={(e) => updateFaqItem(index, 'answer', e.target.value)}
            className="w-full bg-[#7a0380]/80 text-white"
            rows={3}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => saveFaqItem(index)} className="bg-green-600 hover:bg-green-700 text-white">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <h4 className="font-medium mb-1 uppercase">{item.question}</h4>
        <div className="flex space-x-2">
          <button onClick={() => startEditingFaq(index)} className="text-fuchsia-300 hover:text-fuchsia-100">
            <Edit2 className="h-4 w-4" />
          </button>
          <button onClick={() => removeFaqItem(index)} className="text-red-400 hover:text-red-300">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-foreground/80">{item.answer}</p>
    </>
  );
}
