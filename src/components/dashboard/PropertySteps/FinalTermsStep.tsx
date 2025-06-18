
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

interface FinalTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export function FinalTermsStep({
  formData,
  updateFormData,
  onValidationChange = () => {}
}: FinalTermsStepProps) {
  const { t } = useTranslation();
  const [faqItems, setFaqItems] = useState<FaqItem[]>(formData?.faqs || []);

  useEffect(() => {
    const isValid = formData?.termsAccepted === true;
    onValidationChange(isValid);
  }, [formData?.termsAccepted, onValidationChange]);

  useEffect(() => {
    updateFormData("faqs", faqItems);
  }, [faqItems, updateFormData]);

  const addFaqItem = () => {
    const newItem: FaqItem = {
      id: Date.now(),
      question: "",
      answer: ""
    };
    setFaqItems(prev => [...prev, newItem]);
  };

  const updateFaqItem = (id: number, field: 'question' | 'answer', value: string) => {
    setFaqItems(prev => prev.map(item => item.id === id ? {
      ...item,
      [field]: value
    } : item));
  };

  const removeFaqItem = (id: number) => {
    setFaqItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* FAQ Section */}
      <div className="bg-fuchsia-900/10 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4 uppercase text-white">{t('dashboard-faq-terms.frequentlyAskedQuestions')}</h3>
        
        <div className="space-y-4">
          {faqItems.map(item => (
            <div key={item.id} className="bg-fuchsia-950/30 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <Input 
                    placeholder={t('dashboard-faq-terms.questionPlaceholder')} 
                    value={item.question} 
                    onChange={e => updateFaqItem(item.id, 'question', e.target.value)} 
                    className="bg-fuchsia-950/50 border-fuchsia-500/30 text-white" 
                  />
                  <Textarea 
                    placeholder={t('dashboard-faq-terms.answerPlaceholder')} 
                    value={item.answer} 
                    onChange={e => updateFaqItem(item.id, 'answer', e.target.value)} 
                    className="bg-fuchsia-950/50 border-fuchsia-500/30 text-white h-20" 
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeFaqItem(item.id)} 
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button 
            onClick={addFaqItem} 
            variant="outline" 
            className="w-full border-fuchsia-500/50 text-fuchsia-300 hover:bg-fuchsia-500/10"
          >
            {t('dashboard-faq-terms.addQuestion')}
          </Button>
        </div>
      </div>

      {/* Terms and Conditions Acceptance Section */}
      <div className="bg-fuchsia-900/10 rounded-lg p-6">
        <div className="space-y-4">
          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
            <p className="text-sm text-blue-200">
              🔗 <strong>Nota:</strong> El texto legal completo de los términos y condiciones estará visible en una pestaña dedicada titulada "Términos y Condiciones" dentro del panel del hotel.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <input 
              type="checkbox" 
              id="terms-accepted" 
              checked={formData?.termsAccepted || false} 
              onChange={e => updateFormData("termsAccepted", e.target.checked)} 
              className="w-5 h-5 mt-1" 
            />
            <label htmlFor="terms-accepted" className="text-white">
              ✅ Acepto los términos y condiciones y confirmo que toda la información proporcionada es correcta.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
