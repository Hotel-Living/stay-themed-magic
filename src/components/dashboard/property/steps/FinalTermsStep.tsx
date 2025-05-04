
import React, { useEffect, useState } from "react";
import { PropertyFormData } from "../hooks/usePropertyFormData";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FinalTermsStepProps {
  formData: PropertyFormData;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const FinalTermsStep = ({
  formData,
  updateFormData,
  onValidationChange = () => {}
}: FinalTermsStepProps) => {
  const [faqs, setFaqs] = useState<FaqItem[]>(formData.faqs || []);
  const [terms, setTerms] = useState(formData.terms || '');
  const [termsAccepted, setTermsAccepted] = useState(formData.termsAccepted || false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Update from form data if available
    if (formData.faqs?.length) {
      setFaqs(formData.faqs);
    }
    
    setTerms(formData.terms || '');
    setTermsAccepted(formData.termsAccepted || false);
  }, [formData]);

  useEffect(() => {
    // Update form data when local state changes
    updateFormData('faqs', faqs);
    updateFormData('terms', terms);
    updateFormData('termsAccepted', termsAccepted);
    
    // Validation - only terms accepted is required
    setIsValid(termsAccepted);
    onValidationChange(termsAccepted);
  }, [faqs, terms, termsAccepted, updateFormData, onValidationChange]);

  const addFaq = () => {
    if (question.trim() && answer.trim()) {
      const newFaq = {
        id: Date.now().toString(),
        question: question.trim(),
        answer: answer.trim()
      };
      
      setFaqs([...faqs, newFaq]);
      setQuestion('');
      setAnswer('');
    }
  };

  const removeFaq = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Frequently Asked Questions (Optional)</h3>
        <p className="text-sm text-gray-400">
          Add common questions and answers about your property
        </p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-fuchsia-950/20 p-4 rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{faq.question}</h4>
                  <p className="text-sm mt-1">{faq.answer}</p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => removeFaq(faq.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="space-y-3 border border-fuchsia-800/30 p-4 rounded-md">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter a common question"
                className="w-full p-2 border rounded bg-white text-[#7A0486] border-[#7A0486]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Provide an answer"
                className="min-h-[100px]"
              />
            </div>
            
            <Button onClick={addFaq} disabled={!question.trim() || !answer.trim()}>
              Add FAQ
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Terms and Conditions *</h3>
        <p className="text-sm text-gray-400">
          Specify any house rules, cancellation policies, or other important terms
        </p>
        
        <Textarea
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          placeholder="Enter your property's terms and conditions, cancellation policies, and house rules"
          className="min-h-[200px]"
        />
        
        <div className="flex items-start space-x-3 pt-4">
          <Checkbox
            id="terms-accepted"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          />
          <div>
            <Label htmlFor="terms-accepted" className="font-semibold">
              I accept the platform's terms and conditions *
            </Label>
            <p className="text-sm text-gray-400 mt-1">
              By submitting this property, you confirm that all information is accurate and you agree to our platform's terms of service.
            </p>
          </div>
        </div>
      </div>
      
      {!termsAccepted && (
        <p className="text-sm text-red-400">
          You must accept the terms and conditions to complete your submission.
        </p>
      )}
      
      <div className="text-sm text-gray-400">
        Fields marked with * are required
      </div>
    </div>
  );
};
