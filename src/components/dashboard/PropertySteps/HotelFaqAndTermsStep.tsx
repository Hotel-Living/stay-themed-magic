
import React from "react";
import { ChevronRight, PlusCircle, Trash2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export default function HotelFaqAndTermsStep() {
  // Example FAQ items - in a real app, this would be state that can be modified
  const faqItems = [
    { 
      question: "What are the check-in and check-out times?", 
      answer: "Check-in is at 2:00 PM and check-out is at 11:00 AM." 
    },
    { 
      question: "Is breakfast included in the rate?", 
      answer: "Breakfast is included in rates with meal plans that specify breakfast." 
    },
    { 
      question: "Are pets allowed?", 
      answer: "Please check our hotel features section to see if we are pet friendly." 
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6">ADD A NEW PROPERTY</h2>
      
      <div>
        <Collapsible className="w-full" defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90 mb-3">
              FAQ
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30">
                  <div className="flex justify-between items-start mb-2">
                    <input
                      type="text"
                      defaultValue={item.question}
                      className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2 mb-2 text-sm font-medium"
                      placeholder="Enter your question here"
                    />
                    <button className="p-1 text-foreground/60 hover:text-foreground/80 ml-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    defaultValue={item.answer}
                    rows={3}
                    className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2 text-sm"
                    placeholder="Enter your answer here"
                  />
                </div>
              ))}
              
              <button className="flex items-center text-fuchsia-400 hover:text-fuchsia-300 transition">
                <PlusCircle className="w-5 h-5 mr-2" />
                <span>Add new FAQ item</span>
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full" defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90 mb-3">
              TERMS AND CONDITIONS
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2">
              <p className="text-sm text-foreground/80 mb-2">
                Enter your hotel's specific terms and conditions below. These will be displayed to guests during the booking process.
              </p>
              <textarea
                rows={10}
                className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-3 text-sm"
                placeholder="Enter your hotel's terms and conditions here..."
                defaultValue="1. Reservations must be guaranteed with a valid credit card.
2. Cancellations must be made at least 48 hours prior to arrival to avoid charges.
3. Early departures are subject to the full original booking charge.
4. Smoking is not permitted in any of our rooms or indoor areas.
5. Guests are responsible for any damages to hotel property during their stay."
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
