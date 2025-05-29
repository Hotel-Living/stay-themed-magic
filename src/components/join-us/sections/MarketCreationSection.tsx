
import React from "react";
import { Section } from "../Section";
import { Zap } from "lucide-react";

export function MarketCreationSection() {
  return (
    <Section icon={Zap} title="🔥 WE ARE A SaaS APPLICATION">
      <div className="space-y-4">
        <p className="text-white leading-relaxed">
          <strong className="text-[#FFF9B0]">Hotel-Living</strong> is a SaaS (Software as a Service) application that creates a new market category by connecting hotels with long-term guests seeking alternative living solutions.
        </p>
        <p className="text-white leading-relaxed">
          We operate as a technology platform that facilitates extended stays, typically ranging from weeks to months, at participating hotels worldwide.
        </p>
        <p className="text-white leading-relaxed">
          Our model transforms traditional short-term hospitality into a sustainable long-term living solution, creating value for both hotels (increased occupancy and revenue) and guests (flexible, service-rich accommodations).
        </p>
        <p className="text-white leading-relaxed">
          By leveraging technology to match supply (empty hotel rooms) with demand (people needing flexible living arrangements), we've established an entirely new market segment worth billions.
        </p>
      </div>
    </Section>
  );
}
