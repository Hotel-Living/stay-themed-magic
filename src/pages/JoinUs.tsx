
import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/container";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { JoinUsHeader } from "@/components/join-us/JoinUsHeader";
import { IntellectualPositioningSection } from "@/components/join-us/IntellectualPositioningSection";
import { JoinUsForm } from "@/components/join-us/JoinUsForm";
import { TeamLevelsAccordion } from "@/components/join-us/TeamLevelsAccordion";
import { JoinUsFaq } from "@/components/join-us/faq/JoinUsFaq";

// Import refactored section components
import { MarketCreationSection } from "@/components/join-us/sections/MarketCreationSection";
import { SaasApplicationSection } from "@/components/join-us/sections/SaasApplicationSection";
import { ProblemsWeSolveSection } from "@/components/join-us/sections/ProblemsWeSolveSection";
import { HotelLivingSolutionSection } from "@/components/join-us/sections/HotelLivingSolutionSection";
import { RevolutionSection } from "@/components/join-us/sections/RevolutionSection";
import { WhatWeOfferSection } from "@/components/join-us/sections/WhatWeOfferSection";
import { JobsInnovationSection } from "@/components/join-us/sections/JobsInnovationSection";
import { TechnologySection } from "@/components/join-us/sections/TechnologySection";
import { WelcomingTalentSection } from "@/components/join-us/sections/WelcomingTalentSection";
import { ImageSection } from "@/components/join-us/sections/ImageSection";
import { PartnershipsSection } from "@/components/join-us/sections/PartnershipsSection";
import { MindBehindSection } from "@/components/join-us/sections/MindBehindSection";

export default function JoinUs() {
  // Add an effect to scroll the open section to the top of the viewport
  useEffect(() => {
    // Listen for section toggle events
    const handleSectionToggle = (event: CustomEvent) => {
      setTimeout(() => {
        // Find the open section (the one that was just clicked)
        const openSection = document.querySelector('[data-state="open"]');
        if (openSection) {
          // Scroll to the top of the section
          openSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Small delay to ensure the section is fully open
    };

    // Add event listener
    window.addEventListener('section-toggle-event', handleSectionToggle as EventListener);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('section-toggle-event', handleSectionToggle as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <JoinUsHeader />
            
            <MarketCreationSection />
            <SaasApplicationSection />
            <ProblemsWeSolveSection />
            <HotelLivingSolutionSection />
            <RevolutionSection />
            <WhatWeOfferSection />
            <JobsInnovationSection />
            <TechnologySection />
            <WelcomingTalentSection />
            
            <ImageSection />
            
            <PartnershipsSection />
            <MindBehindSection />
            <IntellectualPositioningSection />
            <TeamLevelsAccordion />
            <JoinUsFaq />
            <JoinUsForm />
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}
