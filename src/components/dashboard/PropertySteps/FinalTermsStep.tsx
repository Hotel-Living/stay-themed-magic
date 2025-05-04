
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { nanoid } from "nanoid";

export interface FinalTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const FinalTermsStep: React.FC<FinalTermsStepProps> = ({
  formData,
  updateFormData,
  onValidationChange = () => {}
}) => {
  const [termsText, setTermsText] = useState<string>(formData.terms || "");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(formData.termsAccepted || false);
  const [faqs, setFaqs] = useState<{id: string, question: string, answer: string}[]>(
    formData.faqs || []
  );
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    // Update parent form with local state
    updateFormData("terms", termsText);
    updateFormData("termsAccepted", termsAccepted);
    updateFormData("faqs", faqs);
    
    // This step is only valid if terms are accepted
    onValidationChange(termsAccepted);
  }, [termsText, termsAccepted, faqs, updateFormData, onValidationChange]);

  const addFaq = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newFaq = {
        id: nanoid(),
        question: newQuestion.trim(),
        answer: newAnswer.trim()
      };
      setFaqs([...faqs, newFaq]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const removeFaq = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4 text-white">FAQS & TERMS</h2>

      {/* Terms and Conditions Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">Hotel Terms & Conditions</h3>
        <p className="text-sm text-gray-300 mb-4">
          Provide your hotel's terms, rules, and cancellation policy:
        </p>
        <textarea
          value={termsText}
          onChange={(e) => setTermsText(e.target.value)}
          className="w-full h-48 p-3 bg-fuchsia-900/20 border border-fuchsia-800/40 rounded-md 
                    text-white placeholder-gray-400 mb-4"
          placeholder="Enter your hotel's terms and conditions, rules, cancellation policy, etc."
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="termsConfirmation"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 rounded border-fuchsia-300 text-fuchsia-600 bg-fuchsia-900/30"
          />
          <label htmlFor="termsConfirmation" className="text-sm">
            I confirm that these terms are accurate and comply with all applicable laws and regulations.
          </label>
        </div>
      </Card>

      {/* FAQs Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">Frequently Asked Questions (Optional)</h3>
        <p className="text-sm text-gray-300 mb-4">
          Add common questions and answers for potential guests:
        </p>
        
        {/* List of existing FAQs */}
        {faqs.length > 0 && (
          <div className="space-y-4 mb-6">
            {faqs.map(faq => (
              <div key={faq.id} className="bg-fuchsia-900/20 p-3 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-fuchsia-200">{faq.question}</h4>
                  <button 
                    onClick={() => removeFaq(faq.id)}
                    className="text-fuchsia-400 hover:text-fuchsia-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Add new FAQ form */}
        <div className="space-y-3">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full p-2 bg-fuchsia-900/20 border border-fuchsia-800/40 rounded-md 
                      text-white placeholder-gray-400"
            placeholder="Question"
          />
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="w-full h-24 p-2 bg-fuchsia-900/20 border border-fuchsia-800/40 rounded-md 
                      text-white placeholder-gray-400"
            placeholder="Answer"
          />
          <button
            onClick={addFaq}
            className="px-4 py-2 bg-fuchsia-600 text-white rounded-md hover:bg-fuchsia-700"
            disabled={!newQuestion.trim() || !newAnswer.trim()}
          >
            Add FAQ
          </button>
        </div>
      </Card>

      <div className="bg-fuchsia-900/20 p-4 rounded-lg mt-6">
        <h4 className="font-medium mb-2">Important Notice</h4>
        <p className="text-sm text-gray-300">
          You must accept the terms and conditions to complete your hotel submission. 
          FAQs are optional but recommended to help guests with common questions.
        </p>
      </div>
    </div>
  );
};
