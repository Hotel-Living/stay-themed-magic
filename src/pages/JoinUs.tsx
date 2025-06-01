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
import { useIsMobile } from "@/hooks/use-mobile";

// Import refactored section components
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
  const isMobile = useIsMobile();

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
            
            {/* Two spectacular highlighted boxes with slogans - Vertically Stacked and Centered */}
            <div className="flex flex-col items-center gap-8 mb-16 relative">
              {/* Top box - Enhanced design with blue glow and purple background */}
              <div className="relative group w-fit">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className={`relative bg-[#5E1183] backdrop-blur-xl border-2 border-cyan-400/60 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ${isMobile ? 'p-6 mx-4' : 'p-8'}`}>
                  <div className="space-y-5">
                    <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                      <span className="text-2xl mr-4 filter drop-shadow-lg">🏨</span>
                      <span className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>Hotels need people</span>
                    </div>
                    <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                      <span className="text-2xl mr-4 filter drop-shadow-lg">🧑‍🤝‍🧑</span>
                      <span className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>People need better living</span>
                    </div>
                    <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                      <span className="text-2xl mr-4 filter drop-shadow-lg">🌐</span>
                      <span className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>Society needs an update</span>
                    </div>
                    <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                      <span className="text-2xl mr-4 filter drop-shadow-lg">💡</span>
                      <span className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>All need Hotel Living</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom box - Enhanced design with blue glow and purple background */}
              <div className="relative group w-fit">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className={`relative bg-[#5E1183] backdrop-blur-xl border-2 border-cyan-400/60 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ${isMobile ? 'p-6 mx-6' : 'p-8'}`}>
                  <div className="space-y-5">
                    <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                      <span className="text-2xl mr-4 filter drop-shadow-lg">🛏️</span>
                      <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>
                        {isMobile ? "5B hotel nights need to be full" : "5 billion hotel nights need to be full"}
                      </span>
                    </div>
                    <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                      <span className="text-2xl mr-4 filter drop-shadow-lg">👨‍👩‍👧‍👦</span>
                      <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>
                        {isMobile ? "400M people need better living" : "400 million people need better living"}
                      </span>
                    </div>
                    <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                      <span className="text-2xl mr-4 filter drop-shadow-lg">🔁</span>
                      <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>Society keeps repeating the past</span>
                    </div>
                    <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                      <span className="text-2xl mr-4 filter drop-shadow-lg">🚀</span>
                      <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>
                        {isMobile ? "Hotel-Living changes that" : "Hotel Living changes that"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Third box - Enhanced design with blue glow and purple background */}
              <div className="relative group w-fit">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className={`relative bg-[#5E1183] backdrop-blur-xl border-2 border-cyan-400/60 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ${isMobile ? 'p-6 mx-6' : 'p-8'}`}>
                  <div className="space-y-8">
                    {/* Section 1 */}
                    <div className="space-y-5">
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">💼</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>We created a $131B category</span>
                      </div>
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">🔗</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>We matched two massive needs</span>
                      </div>
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">🧠</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide ${isMobile ? '' : 'whitespace-nowrap'}`}>By building a unique, original model</span>
                      </div>
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">🔒</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide ${isMobile ? '' : 'whitespace-nowrap'}`}>
                          {isMobile ? (
                            <>
                              A model that can't be cloned —<br />
                              and 80% still unknown!
                            </>
                          ) : (
                            "A model that can't be cloned — and 80% still unknown!"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-5">
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">🛡️</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide ${isMobile ? '' : 'whitespace-nowrap'}`}>Hotel Living is crisis-proof</span>
                      </div>
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">💸</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide ${isMobile ? '' : 'whitespace-nowrap'}`}>
                          {isMobile ? (
                            <>
                              The greater the crisis, the stronger<br />
                              the need to unify living costs.
                            </>
                          ) : (
                            "The greater the crisis, the stronger the need to unify living costs."
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-5">
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">🙅‍♂️</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide ${isMobile ? '' : 'whitespace-nowrap'}`}>
                          {isMobile ? (
                            <>
                              Business model benefiting<br />
                              from any crisis?
                            </>
                          ) : (
                            "Business model benefiting from any crisis?"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">📈</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>Yes. Hotel Living. It does!</span>
                      </div>
                    </div>

                    {/* Section 4 */}
                    <div className="space-y-5">
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">🌐</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide ${isMobile ? '' : 'whitespace-nowrap'}`}>
                          {isMobile ? (
                            <>
                              We own the market — because<br />
                              our model creates it
                            </>
                          ) : (
                            "We own the market — because our model creates it"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">💰</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide ${isMobile ? '' : 'whitespace-nowrap'}`}>
                          {isMobile ? (
                            <>
                              $12B in annual profits<br />
                              and an astonishing road ahead
                            </>
                          ) : (
                            "$12B in annual profits — and an astonishing road ahead"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Section 5 */}
                    <div className="space-y-5">
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">🎯</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide whitespace-nowrap`}>Very few even get this chance</span>
                      </div>
                      <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                        <span className="text-2xl mr-4 filter drop-shadow-lg">❓</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold tracking-wide ${isMobile ? '' : 'whitespace-nowrap'}`}>
                          {isMobile ? (
                            <>
                              Are you one of them<br />
                              who belong?
                            </>
                          ) : (
                            "Are you one of them who belong?"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
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
