
import React from "react";
import { LucideIcon } from "lucide-react";
import { Section } from "./Section";

interface TextSectionProps {
  icon: LucideIcon;
  title: string;
  paragraphs: string[];
}

export function TextSection({ icon, title, paragraphs }: TextSectionProps) {
  return (
    <Section icon={icon} title={title}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={`text-white leading-relaxed ${index > 0 ? "mt-4" : ""}`}>
          {paragraph}
        </p>
      ))}
    </Section>
  );
}
