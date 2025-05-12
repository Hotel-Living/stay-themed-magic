
import React from "react";
import { LucideIcon } from "lucide-react";
import { Section } from "./Section";

interface ListSectionProps {
  icon: LucideIcon;
  title: string;
  intro?: string;
  items: string[];
  outro?: string;
}

export function ListSection({ icon, title, intro, items, outro }: ListSectionProps) {
  return (
    <Section icon={icon} title={title}>
      {intro && <p className="text-white leading-relaxed mb-4">{intro}</p>}
      <ul className="text-white leading-relaxed list-disc pl-6 space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {outro && <p className="text-white leading-relaxed mt-4">{outro}</p>}
    </Section>
  );
}
