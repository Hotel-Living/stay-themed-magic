
import React, { ReactNode, useState } from "react";
import { LucideIcon, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export function Section({ 
  icon: Icon, 
  title, 
  children, 
  className = "",
  defaultOpen = false 
}: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <section className={`mb-16 bg-[#8017B0]/90 p-8 rounded-xl border border-[#3300B0]/30 shadow-lg ${className}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-start w-full text-left">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Icon className="h-7 w-7 text-[#FFF9B0] mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#FFF9B0]">{title}</h2>
            </div>
            <ChevronDown 
              className={`h-6 w-6 text-[#FFF9B0] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          {children}
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
}
