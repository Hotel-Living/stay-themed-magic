import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { StepStatusIndicator } from './StepStatusIndicator';

interface EnhancedAccordionItemProps {
  value: string;
  stepNumber: number;
  title: string;
  children: React.ReactNode;
  className?: string;
  isValid: boolean;
  hasErrors: boolean;
  isComplete: boolean;
}

export const EnhancedAccordionItem = ({
  value,
  stepNumber,
  title,
  children,
  className = "bg-white/5 border-white/20 rounded-lg",
  isValid,
  hasErrors,
  isComplete
}: EnhancedAccordionItemProps) => {
  return (
    <AccordionItem value={value} className={className}>
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
              {stepNumber}
            </span>
            <span>{title}</span>
          </div>
          <StepStatusIndicator 
            isValid={isValid}
            hasErrors={hasErrors}
            isComplete={isComplete}
            className="mr-4"
          />
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};