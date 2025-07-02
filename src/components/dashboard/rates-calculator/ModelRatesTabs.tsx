import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/useTranslation";

// NOTE: Color scheme and two-line formatting are retained as per prior specification.
const TAB_BG = "bg-[#3C1865]";
const ACTIVE_TAB_BG = "bg-[#3C1865]";
const ACTIVE_TEXT = "text-white";

export const ModelRatesTabs: React.FC = () => {
  const { t } = useTranslation();
  // Move the tab state into this component so refactor does not break layout or logic.
  const [modelTab, setModelTab] = useState<string>("read-this"); // default

  const tabs = [{
    value: "read-this",
    label: <span dangerouslySetInnerHTML={{ __html: t('dashboard.ratesCalculator.pleaseReadThis') }} />
  }, {
    value: "3star",
    label: <span dangerouslySetInnerHTML={{ __html: t('dashboard.ratesCalculator.3starHotels') }} />
  }, {
    value: "4star",
    label: <span dangerouslySetInnerHTML={{ __html: t('dashboard.ratesCalculator.4starHotels') }} />
  }, {
    value: "5star",
    label: <span dangerouslySetInnerHTML={{ __html: t('dashboard.ratesCalculator.5starHotels') }} />
  }, {
    value: "download",
    label: <span dangerouslySetInnerHTML={{ __html: t('dashboard.ratesCalculator.downloadCalculator') }} />
  }];

  return <Tabs value={modelTab} onValueChange={setModelTab} className="w-full">
      <TabsList className="flex w-full mb-6 gap-1 rounded-xl shadow-lg bg-transparent">
        {tabs.map(tab => <TabsTrigger key={tab.value} value={tab.value} className={`
              flex-1 font-bold text-xs md:text-base uppercase tracking-tight font-sans whitespace-pre-line text-center rounded-none px-1 md:px-4 py-4 transition-all font-condensed
              leading-snug
              ${modelTab === tab.value ? `${ACTIVE_TAB_BG} ${ACTIVE_TEXT}` : `bg-transparent text-white data-[state=active]:${ACTIVE_TAB_BG} data-[state=active]:${ACTIVE_TEXT}`}
            `} style={{
        fontStretch: "condensed",
        whiteSpace: "pre-line",
        minHeight: "52px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: 1.15
      }}>
            <span style={{
          display: "block",
          whiteSpace: "pre-line",
          lineHeight: "1.13",
          fontSize: "inherit"
        }}>{tab.label}</span>
          </TabsTrigger>)}
      </TabsList>
      {/* PLEASE READ THIS Tab Content */}
      <TabsContent value="read-this" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-6 rounded-lg" style={{
        background: "none",
        color: "#fff"
      }}>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              {t('dashboard.ratesCalculator.readThisContent.question1')}
            </div>
            <div className="text-white/80 text-[15px]">
              {t('dashboard.ratesCalculator.readThisContent.answer1')}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              {t('dashboard.ratesCalculator.readThisContent.question2')}
            </div>
            <div className="text-white/80 text-[15px]">
              {t('dashboard.ratesCalculator.readThisContent.answer2')}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              {t('dashboard.ratesCalculator.readThisContent.question3')}
            </div>
            <div className="text-white/80 text-[15px]">
              {t('dashboard.ratesCalculator.readThisContent.answer3')}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              {t('dashboard.ratesCalculator.readThisContent.question4')}
            </div>
            <div className="text-white/80 text-[15px]">
              {t('dashboard.ratesCalculator.readThisContent.answer4')}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2 bg-[#5d14ac]">
              {t('dashboard.ratesCalculator.readThisContent.question5')}
            </div>
            <div className="text-white/80 text-[15px]">
              {t('dashboard.ratesCalculator.readThisContent.answer5')}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              {t('dashboard.ratesCalculator.readThisContent.question6')}
            </div>
            <div className="text-white/80 text-[15px]">
              {t('dashboard.ratesCalculator.readThisContent.answer6')}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              {t('dashboard.ratesCalculator.readThisContent.question7')}
            </div>
            <div className="text-white/80 text-[15px]">
              {t('dashboard.ratesCalculator.readThisContent.answer7')}
            </div>
          </div>
          <div>
            <div className="font-bold text-white text-base mb-2">
              {t('dashboard.ratesCalculator.readThisContent.question8')}
            </div>
            <div className="text-white/80 text-[15px]">
              {t('dashboard.ratesCalculator.readThisContent.answer8')}
            </div>
          </div>
        </div>
      </TabsContent>

      {/* 3-STAR HOTELS Tab Content */}
      <TabsContent value="3star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">{t('dashboard.ratesCalculator.threeStarContent.title')}</span>
            <span className="block mb-4">
              {t('dashboard.ratesCalculator.threeStarContent.description')}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">{t('dashboard.ratesCalculator.threeStarContent.tip1Title')}</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              {t('dashboard.ratesCalculator.threeStarContent.tip1Content')}
              <ul className="list-disc pl-6 mt-2">
                {(t('dashboard.ratesCalculator.threeStarContent.tip1List', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="mt-2">
                {t('dashboard.ratesCalculator.threeStarContent.tip1Footer')}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">{t('dashboard.ratesCalculator.threeStarContent.tip2Title')}</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              {t('dashboard.ratesCalculator.threeStarContent.tip2Content')}
              <ul className="list-disc pl-6 mt-2">
                {(t('dashboard.ratesCalculator.threeStarContent.tip2List', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="mt-2">
                {t('dashboard.ratesCalculator.threeStarContent.tip2Footer')}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">{t('dashboard.ratesCalculator.threeStarContent.tip3Title')}</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              {t('dashboard.ratesCalculator.threeStarContent.tip3Content')}
              <ul className="list-disc pl-6 mt-2">
                {(t('dashboard.ratesCalculator.threeStarContent.tip3List', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">{t('dashboard.ratesCalculator.threeStarContent.tip4Title')}</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              {t('dashboard.ratesCalculator.threeStarContent.tip4Content')}
              <ul className="list-disc pl-6 mt-2">
                {(t('dashboard.ratesCalculator.threeStarContent.tip4List', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="mt-2">
                {t('dashboard.ratesCalculator.threeStarContent.tip4Footer')}
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">{t('dashboard.ratesCalculator.threeStarContent.tip5Title')}</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              {t('dashboard.ratesCalculator.threeStarContent.tip5Content')}
              <ul className="list-disc pl-6 mt-2">
                {(t('dashboard.ratesCalculator.threeStarContent.tip5List', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* 4-STAR HOTELS Tab Content */}
      <TabsContent value="4star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">{t('dashboard.ratesCalculator.fourStarContent.title')}</span>
            <span className="block mb-4">
              {t('dashboard.ratesCalculator.fourStarContent.description')}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">{t('dashboard.ratesCalculator.fourStarContent.tip1Title')}</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              {t('dashboard.ratesCalculator.fourStarContent.tip1Content')}
              <ul className="list-disc pl-6 mt-2">
                {(t('dashboard.ratesCalculator.fourStarContent.tip1List', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">{t('dashboard.ratesCalculator.fourStarContent.tip2Title')}</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              {t('dashboard.ratesCalculator.fourStarContent.tip2Content')}
              <ul className="list-disc pl-6 mt-2">
                {(t('dashboard.ratesCalculator.fourStarContent.tip2List', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="mt-2">
                {t('dashboard.ratesCalculator.fourStarContent.tip2Footer')}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ FOCUS ON “SMART LUXURY” RATHER THAN EXTRAVAGANCE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              4-star guests seek luxury in intelligent, approachable ways:
              <ul className="list-disc pl-6 mt-2">
                <li>Design thoughtful spaces without over-the-top excess.</li>
                <li>Offer upgrades that add genuine comfort (high-quality beds, soundproofing, blackout curtains, improved tech, etc.).</li>
                <li>Eco-friendly, guest-centric, and wellness-focused touches will be valued.</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">{t('dashboard.ratesCalculator.fourStarContent.tip4Title')}</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              {t('dashboard.ratesCalculator.fourStarContent.tip4Content')}
              <ul className="list-disc pl-6 mt-2">
                {(t('dashboard.ratesCalculator.fourStarContent.tip4List', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="mt-2">
                {t('dashboard.ratesCalculator.fourStarContent.tip4Footer')}
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">{t('dashboard.ratesCalculator.fourStarContent.tip5Title')}</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              {t('dashboard.ratesCalculator.fourStarContent.tip5Content')}
              <ul className="list-disc pl-6 mt-2">
                {(t('dashboard.ratesCalculator.fourStarContent.tip5List', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="mt-2">
                {t('dashboard.ratesCalculator.fourStarContent.tip5Footer')}
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* 5-STAR HOTELS Tab Content */}
      <TabsContent value="5star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">{t('dashboard.ratesCalculator.fiveStarContent.title')}</span>
            <span className="block mb-4">
              {t('dashboard.ratesCalculator.fiveStarContent.description')}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ POSITION THE HOTEL AS A LUXURY RESIDENTIAL EXPERIENCE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              5-star hotels can present the stay not as a “temporary booking” but as a luxury temporary residence. Guests will appreciate:
              <ul className="list-disc pl-6 mt-2">
                <li>Full hotel services available daily</li>
                <li>Privacy combined with personalized attention</li>
                <li>Superior comfort compared to conventional apartments or villas</li>
                <li>Prestigious location, security, and reputation</li>
              </ul>
              <div className="mt-2">
                The pricing model can reflect the exclusivity, while offering clear advantages compared to the complexity of renting private properties.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ TARGET A VERY SELECT AUDIENCE PROFILE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              The ideal guests for 5-star Hotel-Living stays include:
              <ul className="list-disc pl-6 mt-2">
                <li>International business executives</li>
                <li>Wealthy retirees testing new destinations</li>
                <li>Entrepreneurs needing flexible residence periods</li>
                <li>VIPs seeking discretion and comfort</li>
                <li>Families relocating temporarily for business or personal reasons</li>
              </ul>
              <div className="mt-2">
                These guests value flexibility, service consistency, and the ability to live for weeks or months in full comfort without long-term rental obligations.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ USE LIMITED, HIGH-LEVEL THEMATIC OPTIONS WHEN RELEVANT</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Unlike 3- or 4-star hotels, 5-star properties may not require affinity-based themes to attract guests. However, if applied, themes should match the luxury positioning:
              <ul className="list-disc pl-6 mt-2">
                <li>Private medical wellness programs</li>
                <li>Executive coaching residencies</li>
                <li>Luxury art or wine masterclasses</li>
                <li>Private language or cultural immersion with exclusive tutors</li>
                <li>Personal development retreats</li>
              </ul>
              <div className="mt-2">
                Any thematic offering must reinforce exclusivity and personalized attention, not mass participation.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ PROMOTE FLEXIBLE STAY DURATIONS TO FIT VIP SCHEDULES</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              5-star guests often appreciate complete flexibility:
              <ul className="list-disc pl-6 mt-2">
                <li>8-day "testing" stays</li>
                <li>16 to 32-day comfortable living periods</li>
                <li>Options to extend or repeat stays seamlessly</li>
              </ul>
              <div className="mt-2">
                The flexibility of Hotel-Living allows VIP guests to adapt their stay based on private, professional, or family needs.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ DELIVER UNCOMPROMISING SERVICE QUALITY</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              This guest segment demands flawless service:
              <ul className="list-disc pl-6 mt-2">
                <li>Top-level housekeeping</li>
                <li>24/7 concierge and support</li>
                <li>Discretion and privacy protection</li>
                <li>Premium dining and wellness options</li>
                <li>Impeccable room comfort and maintenance</li>
              </ul>
              <div className="mt-2">
                Operational excellence becomes the main driver of guest satisfaction, loyalty, and future referrals.
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* DOWNLOAD CALCULATOR Tab Content */}
      <TabsContent value="download" className="w-full rounded-lg bg-[#3C1865]">
        <div className="p-4 rounded-lg text-white" style={{
        background: "none"
      }}>
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
    </Tabs>;
};
