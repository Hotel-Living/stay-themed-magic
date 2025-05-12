
import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface SectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Section({ icon: Icon, title, children, className = "" }: SectionProps) {
  return (
    <section className={`mb-16 bg-[#8017B0]/90 p-8 rounded-xl border border-[#3300B0]/30 shadow-lg ${className}`}>
      <div className="flex items-start mb-4">
        <Icon className="h-7 w-7 text-[#FFF9B0] mr-3 mt-1" />
        <h2 className="text-2xl md:text-3xl font-bold text-[#FFF9B0]">{title}</h2>
      </div>
      {children}
    </section>
  );
}
