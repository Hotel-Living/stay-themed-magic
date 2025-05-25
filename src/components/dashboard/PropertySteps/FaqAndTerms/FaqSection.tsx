
import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import FaqItemForm from "./FaqItemForm";
import FaqItemComponent from "./FaqItem";
import { FaqItem } from "./types";

interface FaqSectionProps {
  faqItems: FaqItem[];
  setFaqItems: React.Dispatch<React.SetStateAction<FaqItem[]>>;
  isOpenFaq: boolean;
  setIsOpenFaq: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FaqSection({
  faqItems,
  setFaqItems,
  isOpenFaq,
  setIsOpenFaq
}: FaqSectionProps) {
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");

  const addFaqItem = () => {
    if (newFaqQuestion && newFaqAnswer) {
      setFaqItems([...faqItems, {
        question: newFaqQuestion,
        answer: newFaqAnswer
      }]);
      setNewFaqQuestion("");
      setNewFaqAnswer("");
      setIsAddingFaq(false);
    }
  };

  const removeFaqItem = (index: number) => {
    const updatedFaqs = [...faqItems];
    updatedFaqs.splice(index, 1);
    setFaqItems(updatedFaqs);
  };

  const startEditingFaq = (index: number) => {
    const updatedFaqs = [...faqItems];
    updatedFaqs[index] = { ...updatedFaqs[index], isEditing: true };
    setFaqItems(updatedFaqs);
  };

  const updateFaqItem = (index: number, field: keyof FaqItem, value: string) => {
    const updatedFaqs = [...faqItems];
    updatedFaqs[index] = { 
      ...updatedFaqs[index], 
      [field]: value 
    };
    setFaqItems(updatedFaqs);
  };

  const saveFaqItem = (index: number) => {
    const updatedFaqs = [...faqItems];
    updatedFaqs[index] = { 
      ...updatedFaqs[index], 
      isEditing: false 
    };
    setFaqItems(updatedFaqs);
  };

  return (
    <div>
      <Collapsible className="w-full" open={isOpenFaq} onOpenChange={setIsOpenFaq}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
          <h3 className="text-xl font-bold uppercase text-white">FREQUENTLY ASKED QUESTIONS <span className="text-sm font-normal italic text-fuchsia-300">(optional)</span></h3>
          {isOpenFaq ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="space-y-4">
            {faqItems.length === 0 && (
              <p className="text-sm text-fuchsia-300/80 italic mb-2">
                You can add frequently asked questions to help guests understand your property better.
                This section is optional for property submission.
              </p>
            )}
            
            {faqItems.map((item, index) => (
              <div key={index} className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30">
                <FaqItemComponent 
                  item={item}
                  index={index}
                  updateFaqItem={updateFaqItem}
                  removeFaqItem={removeFaqItem}
                  startEditingFaq={startEditingFaq}
                  saveFaqItem={saveFaqItem}
                />
              </div>
            ))}
            
            {isAddingFaq ? (
              <FaqItemForm 
                newFaqQuestion={newFaqQuestion}
                setNewFaqQuestion={setNewFaqQuestion}
                newFaqAnswer={newFaqAnswer}
                setNewFaqAnswer={setNewFaqAnswer}
                addFaqItem={addFaqItem}
                onCancel={() => setIsAddingFaq(false)}
              />
            ) : (
              <Button 
                onClick={() => setIsAddingFaq(true)} 
                className="flex items-center bg-fuchsia-700 hover:bg-fuchsia-800 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span>Add New FAQ</span>
              </Button>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
