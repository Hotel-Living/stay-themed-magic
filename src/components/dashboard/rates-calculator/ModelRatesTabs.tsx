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
              Use your in-depth experience to build a living-stay model adapted to your specific reality, cultural context, and clientele. No generic formula beats your understanding of your business's unique seasonality and potential.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              3️⃣ BUILD A MODEL THAT GUARANTEES FULL OCCUPANCY
            </div>
            <div className="text-white/80 text-[15px]">
              The key to sustained success is stable, predictable revenue and full rooms—even during historically low occupancy months. Structure rates and packages so that "living" guests fill gaps left by transient guests without undermining your regular pricing.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              4️⃣ USE AFFINITIES TO DIFFERENTIATE AND TARGET AUDIENCES
            </div>
            <div className="text-white/80 text-[15px]">
              Focus on niche audiences (artists, digital nomads, retirees, etc.) to avoid competing directly with standard hotel offerings and OTAs. Use affinities to build loyal, recurring client groups adapted to your category (see "Themes" section).
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2 bg-[#5d14ac]">
              5️⃣ ADAPT LENGTH OF STAY TO HOTEL SIZE AND DYNAMICS
            </div>
            <div className="text-white/80 text-[15px]">
              Smaller hotels may benefit from longer minimum stays (e.g., 1-3 months), reducing turnover cost. Larger hotels can experiment with rotations—e.g., "9 nights per month club"—to optimize for higher volume and guest experience.
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
              Larger properties can tap into "living at scale" logic—discounts for recurring guests, flexible plans (e.g., alternate weeks), and partnerships with institutions or companies to fill blocks of rooms efficiently.
            </div>
          </div>
          <div>
            <div className="font-bold text-white text-base mb-2">
              8️⃣ UNDERSTAND THE POWER OF RECURRING STAYS AND CUSTOMER ROTATION
            </div>
            <div className="text-white/80 text-[15px]">
              Monthly, multi-month, or club-style stays (where guests return on set days each month) increase forecastability while giving guests "home" status. This increases loyalty and can transform your hotel's business model in a predictable, positive way.
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
            <span className="font-bold text-xl block mb-2">⭐⭐⭐ STRATEGIC TIPS FOR 3-STAR HOTELS</span>
            <span className="block mb-4">
              3-star hotels will naturally capture the largest share of the total customer base.
              <br />
              Thanks to their ability to offer the most affordable rates while still delivering comfort and safety, they are perfectly positioned to attract large volumes of guests. They must fully take advantage of this structural advantage by designing models that ensure constant, high occupancy.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ POSITION YOURSELF AS THE AFFORDABLE ALTERNATIVE FOR LONG STAYS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              3-star hotels have a natural advantage in offering very competitive rates for guests who are price-sensitive but still seek comfort, safety, and convenience. This makes them highly attractive for:
              <ul className="list-disc pl-6 mt-2">
                <li>Digital nomads</li>
                <li>Young professionals</li>
                <li>Remote workers</li>
                <li>Students and trainees</li>
                <li>Budget-conscious retirees</li>
              </ul>
              <div className="mt-2">
                A clear, stable pricing model focused on affordability will help maintain high occupancy levels.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ USE TARGETED AFFINITY THEMES TO ATTRACT NICHE AUDIENCES</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              While luxury may not be the core selling point, 3-star hotels can strongly benefit from thematic specialization:
              <ul className="list-disc pl-6 mt-2">
                <li>Language learning stays</li>
                <li>Career development programs</li>
                <li>Yoga, wellness, or light fitness groups</li>
                <li>Culinary introductions or workshops</li>
                <li>Hobby-based communities (photography, writing, gaming, etc.)</li>
              </ul>
              <div className="mt-2">
                Thematic options are unlimited: any type of legal activity, interest, or experience the hotel can imagine may be developed as a valid affinity. The more original and well-defined the theme, the easier it will be to reach specific guest segments.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ SIMPLIFY SERVICES WHILE OFFERING CLEAN, PREDICTABLE COMFORT</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Guests at this level value predictable quality: clean rooms, strong Wi-Fi, reliable breakfast options, and friendly service.
              <ul className="list-disc pl-6 mt-2">
                <li>Avoid overcomplicating services that increase operational costs.</li>
                <li>Instead, focus on consistent, solid delivery of essential services.</li>
                <li>Small personalized touches in the thematic experience can add perceived value without significant investment.</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ LEVERAGE GROUP STAYS AND CORPORATE SEGMENTS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              3-star hotels are well positioned to attract:
              <ul className="list-disc pl-6 mt-2">
                <li>Corporate training programs</li>
                <li>Team-building retreats</li>
                <li>Small academic groups</li>
                <li>NGO or association events</li>
              </ul>
              <div className="mt-2">
                By offering 8- to 16-day packages, these groups can fill blocks of rooms while benefiting from attractive pricing structures.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ MAXIMIZE MID-LENGTH STAYS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              3-star properties may find an ideal balance in promoting stays of 8, 16 or 24 days:
              <ul className="list-disc pl-6 mt-2">
                <li>Long enough to create meaningful revenue per guest.</li>
                <li>Short enough to maintain dynamic rotation and prevent operational stagnation.</li>
                <li>Allows easy adjustment of pricing based on demand and seasonality.</li>
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
            <span className="font-bold text-xl block mb-2">⭐⭐⭐⭐ STRATEGIC TIPS FOR 4-STAR HOTELS</span>
            <span className="block mb-4">
              4-star hotels have a unique position, balancing comfort, reputation, and attractive pricing to appeal to a wide but slightly more selective audience segment.<br />
              To maximize success, they must blend the best of affordability, service, and curated thematic experiences.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ HIGHLIGHT ADDED VALUE AND SERVICES</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Guests expect enhanced amenities, stylish surroundings, and professional hospitality.
              <ul className="list-disc pl-6 mt-2">
                <li>Communicate any differentiating features (wellness, spa access, modern gym, rooftop views, gourmet dining, etc.).</li>
                <li>Emphasize services that surpass 3-star standards but don't compete directly on price with 5-star luxury.</li>
                <li>Offer bundles, packages, or perks that resonate with mid- to high-level professionals, families, and couples.</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ CREATE CURATED THEMATIC EXPERIENCES</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Thematic stays are particularly effective at the 4-star level. Consider:
              <ul className="list-disc pl-6 mt-2">
                <li>Wellness and detox retreats</li>
                <li>Arts, music, or gastronomy events</li>
                <li>Active excursions (biking, hiking, surfing, etc.)</li>
                <li>Seasonal, cultural, or family programming</li>
              </ul>
              <div className="mt-2">
                Advertise the thematic experience clearly, so guests can identify what makes your property special year-round.
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
            <span className="font-bold text-base">4️⃣ TARGET REPEAT GUESTS AND LOYALTY BUILDING</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Many 4-star guests travel repeatedly for business, leisure, or hybrid work/play stays.
              <ul className="list-disc pl-6 mt-2">
                <li>Promote loyalty incentives or membership benefits for guests who stay monthly or seasonally.</li>
                <li>Create simple reward programs (discounts, gift upgrades, flexible booking rules).</li>
              </ul>
              <div className="mt-2">
                Encouraging return visits ensures long-term stability for your living model.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ FLEXIBLE STAY LENGTHS WITH TAILORED PRICING</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              4-star hotels should use flexible offers:
              <ul className="list-disc pl-6 mt-2">
                <li>Minimum stay (8, 16, or 24 nights)</li>
                <li>Modular weekly or biweekly bundles</li>
                <li>Adjusted rates for long-term guests</li>
              </ul>
              <div className="mt-2">
                Pricing strategy should communicate savings and unique value as guests consider increasing their length of stay.
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
            <span className="font-bold text-xl block mb-2">⭐⭐⭐⭐⭐ STRATEGIC TIPS FOR 5-STAR HOTELS</span>
            <span className="block mb-4">
              5-star hotels can attract high-net-worth individuals looking for premium living experiences inside a fully serviced environment.
              <br />
              Their focus is not primarily on volume or specialization, but on offering superior lifestyle, comfort, privacy, and exclusivity. Hotel-Living provides them with a new opportunity to convert luxury hotel rooms into highly desirable extended-stay residences.
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
