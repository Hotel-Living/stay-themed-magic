
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import ContactEN from "./Contact.en";
import ContactES from "./Contact.es";
import ContactPT from "./Contact.pt";
import ContactRO from "./Contact.ro";

export default function Contact() {
  const { language } = useTranslation();
  
  if (language === 'en') return <ContactEN />;
  if (language === 'es') return <ContactES />;
  if (language === 'pt') return <ContactPT />;
  if (language === 'ro') return <ContactRO />;
  
  // Default fallback to English
  return <ContactEN />;
}
