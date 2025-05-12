
import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Section } from "./Section";

interface ListGroup {
  title: string;
  items: string[];
}

interface MultiListSectionProps {
  icon: LucideIcon;
  title: string;
  listGroups: ListGroup[];
}

export function MultiListSection({ icon, title, listGroups }: MultiListSectionProps) {
  return (
    <Section icon={icon} title={title}>
      {listGroups.map((group, index) => (
        <div key={index} className={index > 0 ? "mt-6" : ""}>
          <h3 className="text-xl font-semibold text-[#FFF9B0] mb-3">{group.title}</h3>
          <ul className="text-white leading-relaxed list-disc pl-6 space-y-2">
            {group.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}
