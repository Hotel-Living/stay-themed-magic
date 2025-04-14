
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { BenefitsTravelersList } from "@/components/faq/BenefitsTravelersList";
import { FaqTravelersTabs } from "@/components/faq/FaqTravelersTabs";
import { 
  benefitsTravelersList, 
  faqTravelersCategories, 
  faqTravelersByCategory 
} from "@/components/faq/faqTravelersData";

export default function FAQTravelers() {
  const [activeTab, setActiveTab] = useState("general");
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col faq-page">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <BenefitsTravelersList benefits={benefitsTravelersList} />

          <FaqTravelersTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            faqCategories={faqTravelersCategories}
            faqsByCategory={faqTravelersByCategory}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
