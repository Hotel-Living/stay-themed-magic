
import React from "react";
import { ProgramHeader } from "./components/ProgramHeader";
import { DescriptionParagraph } from "./components/DescriptionParagraph";
import { StepsList } from "./components/StepsList";
import { BenefitsList } from "./components/BenefitsList";

const ProgramDescription = () => {
  const howItWorksSteps = [
    "Recommend hotels you love using our simple form",
    "We'll reach out to them with your personalized recommendation",
    "If they join Hotel Living, you earn credits toward free stays",
    "Accumulate enough credits to enjoy three free nights at any participating hotel"
  ];

  const benefitsList = [
    "Earn credits for successful recommendations",
    "Help your favorite hotels gain exposure",
    "Expand the Hotel Living community",
    "Enjoy free stays at exceptional properties"
  ];

  return (
    <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
      <ProgramHeader title="Three Free Nights Program" />
      
      <div className="space-y-4">
        <DescriptionParagraph>
          Our Three Free Nights program rewards you for helping us grow the Hotel Living community.
          For each hotel you recommend that joins our platform, you'll earn credits toward free stays.
        </DescriptionParagraph>
        
        <StepsList items={howItWorksSteps} />
        
        <DescriptionParagraph className="text-sm">
          Our program is designed to reward our community members who help us discover exceptional hotels.
          There's no limit to how many hotels you can recommend or how many free nights you can earn!
        </DescriptionParagraph>
        
        <BenefitsList items={benefitsList} />
      </div>
    </div>
  );
};

export default ProgramDescription;
