
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// NOTE: Color scheme and two-line formatting are retained as per prior specification.
const TAB_BG = "bg-[#3C1865]";
const ACTIVE_TAB_BG = "bg-[#3C1865]";
const ACTIVE_TEXT = "text-white";

const tabs = [
  {
    value: "read-this",
    label: <>PLEASE<br />READ THIS</>
  },
  {
    value: "3star",
    label: <>3-STAR<br />HOTELS</>
  },
  {
    value: "4star",
    label: <>4-STAR<br />HOTELS</>
  },
  {
    value: "5star",
    label: <>5-STAR<br />HOTELS</>
  },
  {
    value: "download",
    label: <>DOWNLOAD<br />CALCULATOR</>
  }
];

export const ModelRatesTabs: React.FC = () => {
  // Move the tab state into this component so refactor does not break layout or logic.
  const [modelTab, setModelTab] = useState<string>("read-this"); // default

  return (
    <Tabs value={modelTab} onValueChange={setModelTab} className="w-full">
      <TabsList className="flex w-full mb-6 gap-1 rounded-xl shadow-lg bg-transparent">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`
              flex-1 font-bold text-xs md:text-base uppercase tracking-tight font-sans whitespace-pre-line text-center rounded-none px-1 md:px-4 py-4 transition-all font-condensed
              leading-snug
              ${modelTab === tab.value
                ? `${ACTIVE_TAB_BG} ${ACTIVE_TEXT}`
                : `bg-transparent text-white data-[state=active]:${ACTIVE_TAB_BG} data-[state=active]:${ACTIVE_TEXT}`
              }
            `}
            style={{
              fontStretch: "condensed",
              whiteSpace: "pre-line",
              minHeight: "52px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              lineHeight: 1.15
            }}
          >
            <span style={{
              display: "block",
              whiteSpace: "pre-line",
              lineHeight: "1.13",
              fontSize: "inherit"
            }}>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {/* PLEASE READ THIS Tab Content */}
      <TabsContent value="read-this" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-6 rounded-lg" style={{ background: "none", color: "#fff" }}>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              1️⃣ DOES YOUR HOTEL HAVE TO CLOSE FOR LONG PERIODS EACH YEAR?
            </div>
            <div className="text-white/80 text-[15px]">
              Most hotels have certain periods during the year when demand drops significantly, leading to partial or full closures. By adopting a flexible living model, you can keep rooms filled during these low seasons, stabilizing income and improving operational efficiency year-round.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              2️⃣ NOBODY KNOWS YOUR HOTEL BETTER THAN YOU DO
            </div>
            <div className="text-white/80 text-[15px]">
              Use your in-depth experience to build a living-stay model adapted to your specific reality, cultural context, and clientele. No generic formula beats your understanding of your business’s unique seasonality and potential.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              3️⃣ BUILD A MODEL THAT GUARANTEES FULL OCCUPANCY
            </div>
            <div className="text-white/80 text-[15px]">
              The key to sustained success is stable, predictable revenue and full rooms—even during historically low occupancy months. Structure rates and packages so that “living” guests fill gaps left by transient guests without undermining your regular pricing.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              4️⃣ USE AFFINITIES TO DIFFERENTIATE AND TARGET AUDIENCES
            </div>
            <div className="text-white/80 text-[15px]">
              Focus on niche audiences (artists, digital nomads, retirees, etc.) to avoid competing directly with standard hotel offerings and OTAs. Use affinities to build loyal, recurring client groups adapted to your category (see “Themes” section).
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2 bg-[#5d14ac]">
              5️⃣ ADAPT LENGTH OF STAY TO HOTEL SIZE AND DYNAMICS
            </div>
            <div className="text-white/80 text-[15px]">
              Smaller hotels may benefit from longer minimum stays (e.g., 1-3 months), reducing turnover cost. Larger hotels can experiment with rotations—e.g., “9 nights per month club”—to optimize for higher volume and guest experience.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              6️⃣ LEVERAGE BOUTIQUE CONCEPTS FOR SMALL HIGH-END HOTELS
            </div>
            <div className="text-white/80 text-[15px]">
              If you manage a boutique or luxury hotel, design tailored experiences (wellness, culture, business retreats) with premium rates. These can be highly attractive to remote professionals or guests seeking exclusivity and added value.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              7️⃣ APPLY VOLUME LOGIC FOR LARGER HOTELS
            </div>
            <div className="text-white/80 text-[15px]">
              Larger properties can tap into “living at scale” logic—discounts for recurring guests, flexible plans (e.g., alternate weeks), and partnerships with institutions or companies to fill blocks of rooms efficiently.
            </div>
          </div>
          <div>
            <div className="font-bold text-white text-base mb-2">
              8️⃣ UNDERSTAND THE POWER OF RECURRING STAYS AND CUSTOMER ROTATION
            </div>
            <div className="text-white/80 text-[15px]">
              Monthly, multi-month, or club-style stays (where guests return on set days each month) increase forecastability while giving guests “home” status. This increases loyalty and can transform your hotel’s business model in a predictable, positive way.
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="3star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{ background: "none" }}>
          <p>
            [Insert detailed strategic guidelines for 3-star hotels here. Replace with your specific content.]
          </p>
        </div>
      </TabsContent>
      <TabsContent value="4star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{ background: "none" }}>
          <p>
            [Insert detailed strategic guidelines for 4-star hotels here. Replace with your specific content.]
          </p>
        </div>
      </TabsContent>
      <TabsContent value="5star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{ background: "none" }}>
          <p>
            [Insert detailed strategic guidelines for 5-star hotels here. Replace with your specific content.]
          </p>
        </div>
      </TabsContent>
      <TabsContent value="download" className="w-full rounded-lg bg-[#3C1865]">
        <div className="p-4 rounded-lg text-white" style={{ background: "none" }}>
          <div>
            <p className="mb-3">
              Access the online calculator and supporting documents for building and testing your custom hotel living rates model.
            </p>
            <a href="#" className="inline-block px-5 py-2 font-semibold bg-fuchsia-600 hover:bg-fuchsia-700 transition rounded text-white shadow" target="_blank" rel="noopener noreferrer" tabIndex={0}>
              Download Excel Calculator
            </a>
            <p className="mt-2 text-xs text-fuchsia-200 opacity-80">
              Contact us if you need a different format or support customizing your template.
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
