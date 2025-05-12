
import React from "react";
import { Mail } from "lucide-react";
import { Section } from "./Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { Star } from "lucide-react";

export function JoinUsForm() {
  return (
    <Section icon={Star} title="Want to join us?">
      <p className="text-white leading-relaxed mb-6">
        If you feel aligned with this vision and want to help bring it to life, we want to hear from you.
      </p>
      
      <div className="flex items-center mb-6">
        <Mail className="h-6 w-6 text-[#FFF9B0] mr-3" />
        <h3 className="text-xl font-semibold text-[#FFF9B0]">Apply to join our founding team:</h3>
      </div>
      
      <ContactForm />
    </Section>
  );
}
