
import React from "react";
import { useTranslation } from "react-i18next";

interface SimpleTabContentProps {
  title: string;
  description: string;
}

export default function SimpleTabContent({
  title,
  description
}: SimpleTabContentProps) {
  const { t } = useTranslation();
  
  return <div className="glass-card rounded-2xl p-6 bg-[#5c0869]">
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      <p className="text-foreground/80">{description}</p>
    </div>;
}
