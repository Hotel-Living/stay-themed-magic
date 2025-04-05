
import React, { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Plus, Trash2, Edit2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FaqItem {
  question: string;
  answer: string;
  isEditing?: boolean;
}

interface HotelFaqAndTermsStepProps {
  onValidationChange?: (isValid: boolean) => void;
}

// Predefined FAQs
const predefinedFaqs: FaqItem[] = [
  {
    question: "What is your cancellation policy?",
    answer: "Our standard cancellation policy allows free cancellation up to 48 hours before the check-in date. Cancellations made within 48 hours of arrival may be subject to a charge equivalent to the first night's stay."
  },
  {
    question: "What are the check-in and check-out times?",
    answer: "Check-in time is 3:00 PM, and check-out time is 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability and possibly an additional fee."
  },
  {
    question: "Do you offer airport transfers?",
    answer: "Yes, we provide airport transfer services for an additional fee. Please contact us at least 48 hours before arrival to arrange this service."
  },
  {
    question: "Is breakfast included in the room rate?",
    answer: "Breakfast is included in most of our room rates. Please check your specific booking details or contact us directly to confirm if breakfast is included in your reservation."
  }
];

const predefinedTerms = `TERMS AND CONDITIONS

1. RESERVATION POLICIES:
   Reservations are confirmed upon receipt of a valid credit card and may require a deposit depending on the rate selected and length of stay.

2. PAYMENT:
   We accept major credit cards (Visa, MasterCard, American Express) and cash. Full payment is required upon check-in.

3. CANCELLATION POLICY:
   Cancellations made 48 hours or more before the scheduled arrival date will receive a full refund. Cancellations made within 48 hours of arrival may be charged for the first night's stay.

4. CHECK-IN/CHECK-OUT:
   Check-in time is 3:00 PM. Check-out time is 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability and possibly an additional fee.

5. DAMAGE POLICY:
   Guests will be held responsible for any damage to hotel property during their stay.

6. PET POLICY:
   Pets are allowed in designated pet-friendly rooms only, subject to additional cleaning fees.

7. SMOKING POLICY:
   This is a non-smoking hotel. A cleaning fee will be charged for smoking in non-smoking rooms.

8. NOISE POLICY:
   Quiet hours are from 10:00 PM to 7:00 AM. Excessive noise that disturbs other guests may result in eviction without refund.

9. LIABILITY:
   The hotel is not responsible for any loss, theft, or damage to guests' personal belongings.

10. AGE REQUIREMENT:
    Guests must be at least 18 years of age to check in.

11. PRIVACY POLICY:
    We respect your privacy and will protect your personal information according to applicable laws.

12. MODIFICATIONS:
    These terms and conditions are subject to change without notice.`;

export default function HotelFaqAndTermsStep({ onValidationChange = () => {} }: HotelFaqAndTermsStepProps) {
  const [faqItems, setFaqItems] = useState<FaqItem[]>(predefinedFaqs);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(predefinedTerms);
  const [isOpenFaq, setIsOpenFaq] = useState(true);
  const [isOpenTerms, setIsOpenTerms] = useState(false);
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    // Validate based on having at least one FAQ and terms and conditions
    const isValid = faqItems.length > 0 && termsAndConditions.trim().length > 0;
    onValidationChange(isValid);
  }, [faqItems, termsAndConditions, onValidationChange]);

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
    <div className="space-y-6">
      <div>
        <Collapsible className="w-full" open={isOpenFaq} onOpenChange={setIsOpenFaq}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <h3 className="text-xl font-bold uppercase">FREQUENTLY ASKED QUESTIONS</h3>
            {isOpenFaq ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30">
                  {item.isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`faq-question-${index}`} className="block mb-1">Question</Label>
                        <Input 
                          id={`faq-question-${index}`}
                          value={item.question}
                          onChange={(e) => updateFaqItem(index, 'question', e.target.value)}
                          className="w-full bg-[#7a0380]/80"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`faq-answer-${index}`} className="block mb-1">Answer</Label>
                        <Textarea 
                          id={`faq-answer-${index}`}
                          value={item.answer}
                          onChange={(e) => updateFaqItem(index, 'answer', e.target.value)}
                          className="w-full bg-[#7a0380]/80"
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
                  ) : (
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
                  )}
                </div>
              ))}
              
              {isAddingFaq ? (
                <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30 space-y-3">
                  <div>
                    <Label htmlFor="new-faq-question" className="block text-sm font-medium mb-1 uppercase">
                      New Question
                    </Label>
                    <Input 
                      id="new-faq-question" 
                      placeholder="Enter question" 
                      value={newFaqQuestion} 
                      onChange={e => setNewFaqQuestion(e.target.value)} 
                      className="w-full bg-[#76027c]" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="new-faq-answer" className="block text-sm font-medium mb-1 uppercase">
                      Answer
                    </Label>
                    <Textarea
                      id="new-faq-answer"
                      placeholder="Enter answer"
                      value={newFaqAnswer}
                      onChange={e => setNewFaqAnswer(e.target.value)}
                      className="w-full bg-[#7a0380]"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button onClick={() => setIsAddingFaq(false)} variant="outline" className="text-fuchsia-300 border-fuchsia-300">
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
      
      <div>
        <Collapsible className="w-full" open={isOpenTerms} onOpenChange={setIsOpenTerms}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <h3 className="text-xl font-bold uppercase">TERMS & CONDITIONS</h3>
            {isOpenTerms ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div>
              <Label htmlFor="terms" className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
                TERMS & CONDITIONS TEXT
              </Label>
              <Textarea 
                id="terms"
                placeholder="Enter terms and conditions" 
                value={termsAndConditions} 
                onChange={e => setTermsAndConditions(e.target.value)} 
                className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 h-72 resize-none bg-[#810586]" 
              />
              <p className="text-xs text-fuchsia-300/70 mt-2">
                This pre-configured template covers standard hotel policies. Feel free to modify it to match your specific requirements.
              </p>
              
              <div className="flex items-center space-x-2 mt-6">
                <input 
                  type="checkbox"
                  id="accept-terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50"
                />
                <Label htmlFor="accept-terms" className="text-sm">
                  I confirm that all information provided is accurate and I accept the Hotel-Living.com partner terms
                </Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
