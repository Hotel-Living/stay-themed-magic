
import React from "react";
import HotelFaqAndTermsStep from "./FaqAndTerms/HotelFaqAndTermsStep";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";

interface StepFiveProps {
  onValidationChange?: (isValid: boolean) => void;
  renderPriceTable?: (roomType: string, mealTypes: string[], stayDurations: number[]) => React.ReactNode;
}

export default function StepFive({ onValidationChange = () => {}, renderPriceTable }: StepFiveProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold mb-4">FAQ & TERMS AND CONDITIONS</h2>
      
      <Accordion type="single" collapsible className="w-full mb-6">
        <AccordionItem value="faq" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
          <AccordionTrigger className="px-4 py-3">
            <h3 className="text-lg capitalize">Frequently Asked Questions</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Pre-configured FAQs */}
              <div className="space-y-2">
                <h4 className="font-medium">Common FAQs</h4>
                <div className="rounded bg-fuchsia-950/20 p-3 mb-2">
                  <h5 className="font-medium mb-1">What time is check-in and check-out?</h5>
                  <Textarea 
                    defaultValue="Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request for an additional fee."
                    className="bg-fuchsia-950/30 border border-fuchsia-800/30 h-20 text-white"
                  />
                </div>
                
                <div className="rounded bg-fuchsia-950/20 p-3 mb-2">
                  <h5 className="font-medium mb-1">Do you offer airport transfers?</h5>
                  <Textarea 
                    defaultValue="Yes, we offer airport transfers for an additional fee. Please contact us at least 48 hours before your arrival to arrange this service."
                    className="bg-fuchsia-950/30 border border-fuchsia-800/30 h-20 text-white"
                  />
                </div>
                
                <div className="rounded bg-fuchsia-950/20 p-3">
                  <h5 className="font-medium mb-1">Is breakfast included?</h5>
                  <Textarea 
                    defaultValue="Breakfast is included in some of our room rates. Please check your specific booking for details."
                    className="bg-fuchsia-950/30 border border-fuchsia-800/30 h-20 text-white"
                  />
                </div>
              </div>
              
              {/* Add new FAQ */}
              <div className="pt-4 border-t border-fuchsia-800/20">
                <button className="w-full py-2 bg-fuchsia-700/50 hover:bg-fuchsia-700/70 rounded-lg text-white">
                  + Add New FAQ
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="terms" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
          <AccordionTrigger className="px-4 py-3">
            <h3 className="text-lg capitalize">Terms and Conditions</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Pre-configured Terms */}
              <div className="space-y-2">
                <Textarea 
                  defaultValue="1. RESERVATIONS: All reservations must be guaranteed with a valid credit card at the time of booking.

2. CANCELLATION POLICY: Cancellations must be made at least 48 hours prior to arrival to avoid a penalty of one night's room charge.

3. PAYMENT: Full payment is due upon check-in. We accept major credit cards and cash.

4. DAMAGE POLICY: Guests will be held responsible for any damage to the property or its contents during their stay.

5. PETS: Pets are not allowed unless specified as a pet-friendly accommodation.

6. SMOKING: This is a non-smoking property. A cleaning fee of $250 will be charged for smoking in non-designated areas.

7. QUIET HOURS: Quiet hours are from 10:00 PM to 8:00 AM. Please be respectful of other guests.

8. LIABILITY: The property is not responsible for any loss or damage to personal belongings.

9. AGE REQUIREMENT: Guests must be at least 18 years of age to check-in.

10. ADDITIONAL GUESTS: Only registered guests are allowed in the rooms. Additional guests must be registered at the front desk."
                  className="bg-fuchsia-950/30 border border-fuchsia-800/30 h-80 text-white"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
