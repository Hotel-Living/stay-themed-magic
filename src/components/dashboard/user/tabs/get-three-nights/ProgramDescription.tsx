
import React from "react";
import { ProgramHeader } from "./components/ProgramHeader";
import { DescriptionParagraph } from "./components/DescriptionParagraph";
import { StepsList } from "./components/StepsList";
import { BenefitsList } from "./components/BenefitsList";

const ProgramDescription = () => {
  const howItWorksSteps = [
    "Recommend hotels you love and personally introduce them to Hotel Living",
    "The hotel must register on our platform within 15 calendar days from your referral",
    "Once verified, you'll receive credits for three free nights",
    "Redeem your free nights at any participating hotel on our platform"
  ];

  const benefitsList = [
    "Earn three free nights for successful referrals",
    "No limit on how many hotels you can refer",
    "Help your favorite hotels gain exposure",
    "Enjoy free stays at exceptional properties"
  ];

  return (
    <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
      <ProgramHeader title="Three Free Nights Program" />
      
      <div className="space-y-4">
        <DescriptionParagraph>
          Our Three Free Nights program rewards you for helping us grow the Hotel Living community.
          For each hotel you personally introduce to our platform that joins within 15 days, you'll earn three free nights.
        </DescriptionParagraph>
        
        <StepsList items={howItWorksSteps} />
        
        <DescriptionParagraph className="text-sm">
          This program rewards your personal connections and referrals. The 15-day window ensures timely registrations.
          There's no limit to how many hotels you can refer or how many free nights you can earn!
        </DescriptionParagraph>
        
        <BenefitsList items={benefitsList} />
      </div>
    </div>
  );
};

export default ProgramDescription;
