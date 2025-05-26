
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { benefitsList } from "./faqData";

export function BenefitsHeader() {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 mb-16">
      <div className="flex justify-center">
        <h2 className={`text-center font-bold ${isMobile ? "text-2xl" : "text-4xl"} text-[#FFF9B0] tracking-tight uppercase bg-[#8017B0] py-2 px-6 rounded-lg inline-block mx-auto`}>
          Step Into a New World of Benefits
        </h2>
      </div>
      <div className={`space-y-3 max-w-3xl mx-auto flex flex-col items-center ${isMobile ? "mt-12" : ""}`}>
        {benefitsList.map((benefit, index) => (
          <div key={index} className="bg-[#FFC700] py-2 px-4 text-center my-[12px] rounded-xl">
            <p className={`text-[#8017B0] ${isMobile ? "text-xl" : "text-base"} font-bold`}>{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
