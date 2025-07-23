
import React, { useState } from "react";
import { ChevronUp, ChevronDown, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { FaqItem } from "./types";
import FaqItemComponent from "./FaqItem";
import FaqItemForm from "./FaqItemForm";

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
    if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
      const newItem: FaqItem = {
        id: Date.now(),
        question: newFaqQuestion.trim(),
        answer: newFaqAnswer.trim(),
        isEditing: false
      };
      setFaqItems(prev => [...prev, newItem]);
      setNewFaqQuestion("");
      setNewFaqAnswer("");
      setIsAddingFaq(false);
    }
  };

  const updateFaqItem = (index: number, field: keyof FaqItem, value: string) => {
    setFaqItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const removeFaqItem = (index: number) => {
    setFaqItems(prev => prev.filter((_, i) => i !== index));
  };

  const startEditingFaq = (index: number) => {
    setFaqItems(prev => prev.map((item, i) => 
      i === index ? { ...item, isEditing: true } : item
    ));
  };

  const saveFaqItem = (index: number) => {
    setFaqItems(prev => prev.map((item, i) => 
      i === index ? { ...item, isEditing: false } : item
    ));
  };

  return (
    <div>
      <Collapsible className="w-full" open={isOpenFaq} onOpenChange={setIsOpenFaq}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
          <div>
            <h3 className="text-xl font-bold uppercase text-white">PREGUNTAS FRECUENTES (opcional)</h3>
            <p className="text-sm text-fuchsia-300/70 mt-1">
              Puede añadir preguntas frecuentes para ayudar a los huéspedes a entender mejor su propiedad.
            </p>
            <p className="text-xs text-fuchsia-300/50">
              Esta sección es opcional para la publicación de la propiedad.
            </p>
          </div>
          {isOpenFaq ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="space-y-4 mt-4">
            {faqItems.map((item, index) => (
              <div key={item.id} className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30">
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
            
            {isAddingFaq && (
              <FaqItemForm
                newFaqQuestion={newFaqQuestion}
                setNewFaqQuestion={setNewFaqQuestion}
                newFaqAnswer={newFaqAnswer}
                setNewFaqAnswer={setNewFaqAnswer}
                addFaqItem={addFaqItem}
                onCancel={() => setIsAddingFaq(false)}
              />
            )}
            
            {!isAddingFaq && (
              <Button 
                onClick={() => setIsAddingFaq(true)} 
                className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Añadir Nueva Pregunta Frecuente
              </Button>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
