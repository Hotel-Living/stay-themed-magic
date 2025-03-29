import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function HotelFaqAndTermsStep() {
  const [faqItems, setFaqItems] = useState([
    { question: "What is your cancellation policy?", answer: "Our cancellation policy is..." },
    { question: "What are the check-in and check-out times?", answer: "Check-in is at 3 PM, and check-out is at 11 AM." },
  ]);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("Our terms and conditions are...");
  const [isOpenFaq, setIsOpenFaq] = useState(true);
  const [isOpenTerms, setIsOpenTerms] = useState(false);
  
  const addFaqItem = () => {
    if (newFaqQuestion && newFaqAnswer) {
      setFaqItems([...faqItems, { question: newFaqQuestion, answer: newFaqAnswer }]);
      setNewFaqQuestion("");
      setNewFaqAnswer("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Collapsible className="w-full" defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <h3 className="text-xl font-bold uppercase">FREQUENTLY ASKED QUESTIONS</h3>
            {isOpenFaq ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30">
                  <h4 className="font-medium mb-1 uppercase">{item.question}</h4>
                  <p className="text-sm text-foreground/80">{item.answer}</p>
                </div>
              ))}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
                    NEW QUESTION
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30"
                    placeholder="Enter question"
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
                    ANSWER
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30"
                    placeholder="Enter answer"
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                  />
                </div>
              </div>
              
              <button 
                onClick={addFaqItem}
                className="rounded-lg px-4 py-2 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors"
              >
                Add FAQ
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full" defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <h3 className="text-xl font-bold uppercase">TERMS & CONDITIONS</h3>
            {isOpenTerms ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div>
              <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
                TERMS & CONDITIONS TEXT
              </label>
              <textarea 
                className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 h-48 resize-none"
                placeholder="Enter terms and conditions"
                value={termsAndConditions}
                onChange={(e) => setTermsAndConditions(e.target.value)}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
