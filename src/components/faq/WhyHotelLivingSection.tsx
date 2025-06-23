
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { AccordionContentRenderer } from "./accordion/AccordionContentRenderer";

const accordionOptions = [
  { id: "still-renting", key: "stillRenting" },
  { id: "hotel", key: "hotel" },
  { id: "retired", key: "retired" },
  { id: "commuter", key: "commuter" },
  { id: "online-worker", key: "onlineWorker" },
  { id: "free-soul", key: "freeSoul" },
  { id: "society", key: "society" }
];

export function WhyHotelLivingSection() {
  const { t } = useTranslation('faq');
  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);

  const toggleAccordion = (optionId: string) => {
    setOpenAccordion(openAccordion === optionId ? null : optionId);
  };

  return (
    <div className="text-center mb-8">
      <div className="flex justify-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#eedbf7] glow tracking-tight leading-tight bg-[#8017B0] py-2 px-8 rounded-lg inline-block">
          Why Hotel-Living?
        </h1>
      </div>

      <div className="max-w-4xl mx-auto backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-4 md:p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3 mb-6">
          {accordionOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleAccordion(option.id)}
              className={`
                px-2 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-200 
                ${openAccordion === option.id 
                  ? 'bg-[#981DA1] text-white scale-105' 
                  : 'bg-gradient-to-r from-[#730483] to-[#570366] text-white hover:scale-105'
                }
                shadow-md hover:shadow-fuchsia-500/20 border border-fuchsia-600/20
              `}
            >
              {t(`accordion.${option.key}`)}
            </button>
          ))}
        </div>

        {openAccordion && (
          <div className="mt-6 p-4 bg-[#460F54]/60 rounded-lg border border-fuchsia-400/30">
            <AccordionContentRenderer optionId={openAccordion} />
          </div>
        )}

        <div className="mt-8 p-6 bg-gradient-to-r from-[#8017B0]/20 to-[#460F54]/20 rounded-lg border border-fuchsia-400/30">
          <p className="text-xl md:text-2xl font-bold text-[#FFF9B0] mb-4">
            THE DREAM OF HUMANITY IS TO LIVE IN A HOTEL
          </p>
          <p className="text-base md:text-lg text-[#e3d6e9] mb-2">
            With everything taken care of
          </p>
          <p className="text-base md:text-lg text-[#e3d6e9]">
            On an endless vacation
          </p>
        </div>
      </div>
    </div>
  );
}
