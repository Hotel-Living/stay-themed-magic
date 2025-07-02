import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// NOTE: Color scheme and two-line formatting are retained as per prior specification.
const TAB_BG = "bg-[#3C1865]";
const ACTIVE_TAB_BG = "bg-[#3C1865]";
const ACTIVE_TEXT = "text-white";

export const ModelRatesTabs: React.FC = () => {
  // Move the tab state into this component so refactor does not break layout or logic.
  const [modelTab, setModelTab] = useState<string>("read-this"); // default

  const tabs = [{
    value: "read-this",
    label: <span dangerouslySetInnerHTML={{ __html: "PLEASE<br />READ THIS" }} />
  }, {
    value: "3star",
    label: <span dangerouslySetInnerHTML={{ __html: "3-STAR<br />HOTELS" }} />
  }, {
    value: "4star",
    label: <span dangerouslySetInnerHTML={{ __html: "4-STAR<br />HOTELS" }} />
  }, {
    value: "5star",
    label: <span dangerouslySetInnerHTML={{ __html: "5-STAR<br />HOTELS" }} />
  }, {
    value: "download",
    label: <span dangerouslySetInnerHTML={{ __html: "DOWNLOAD<br />CALCULATOR" }} />
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
              1️⃣ What is the Hotel-Living model and why is it more profitable than traditional tourism?
            </div>
            <div className="text-white/80 text-[15px]">
              Hotel-Living redefines hotel occupancy by targeting guests who stay 8-32 days instead of 1-3 nights. This approach increases guest retention, reduces acquisition costs, and minimizes the operational complexity of constant turnover.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              2️⃣ What are the main competitive advantages over traditional hotels?
            </div>
            <div className="text-white/80 text-[15px]">
              Extended stays reduce marketing costs, lower cleaning frequencies, increase revenue per available room (RevPAR), and provide predictable cash flow. Guests develop loyalty to the location and are more likely to return.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              3️⃣ How does thematic specialization improve bookings?
            </div>
            <div className="text-white/80 text-[15px]">
              By offering experiences aligned with guest interests (culinary, wellness, remote work, arts, etc.), hotels attract motivated guests willing to pay premium rates for longer stays that match their lifestyle or goals.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              4️⃣ What is the recommended pricing strategy for Hotel-Living?
            </div>
            <div className="text-white/80 text-[15px]">
              Implement progressive discounts: charge standard rates for 8-day stays, moderate discounts for 16-day stays, and attractive discounts for 32-day stays. This encourages longer commitments while maintaining profitability.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2 bg-[#5d14ac]">
              5️⃣ How to calculate optimal room rates for different durations?
            </div>
            <div className="text-white/80 text-[15px]">
              Use the strategic calculators in the following tabs. Each hotel category (3, 4, 5-star) has specific recommendations for balancing competitive pricing with maximum profitability based on operational costs and target demographics.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              6️⃣ Which guest segments are most profitable for Hotel-Living?
            </div>
            <div className="text-white/80 text-[15px]">
              Remote workers, digital nomads, business travelers on extended projects, relocating professionals, and theme-motivated guests (culinary enthusiasts, wellness seekers, etc.) represent the highest-value segments.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              7️⃣ How to implement this model without disrupting existing operations?
            </div>
            <div className="text-white/80 text-[15px]">
              Start by dedicating 20-30% of rooms to Hotel-Living packages while maintaining traditional bookings. Gradually increase the allocation based on demand and profitability analysis.
            </div>
          </div>
          <div>
            <div className="font-bold text-white text-base mb-2">
              8️⃣ What are the key metrics to monitor success?
            </div>
            <div className="text-white/80 text-[15px]">
              Track average length of stay (ALOS), revenue per available room (RevPAR), customer acquisition cost (CAC), repeat guest percentage, and guest satisfaction scores for extended stays vs. traditional bookings.
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
            <span className="font-bold text-xl block mb-2">Strategic Tips for 3-Star Hotels</span>
            <span className="block mb-4">
              3-star hotels have the greatest opportunity to differentiate through thematic specialization and community-building around guest interests.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ FOCUS ON AUTHENTIC THEMATIC EXPERIENCES</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              3-star hotels succeed by offering genuine, immersive experiences rather than luxury amenities:
              <ul className="list-disc pl-6 mt-2">
                <li>Culinary workshops with local chefs</li>
                <li>Wellness programs with qualified instructors</li>
                <li>Language immersion with native speakers</li>
                <li>Artisan craft workshops</li>
                <li>Professional development seminars</li>
              </ul>
              <div className="mt-2">
                Focus on experiences that create lasting value and justify longer stays through learning and personal growth.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ BUILD COMMUNITY AMONG GUESTS WITH SHARED INTERESTS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Create social spaces and programs that connect guests around common themes:
              <ul className="list-disc pl-6 mt-2">
                <li>Daily group activities related to the hotel's theme</li>
                <li>Shared workspaces for remote workers and digital nomads</li>
                <li>Evening social hours with theme-based conversations</li>
                <li>Guest collaboration projects and skill sharing</li>
                <li>Local community integration events</li>
              </ul>
              <div className="mt-2">
                When guests form connections, they stay longer and return more frequently, increasing lifetime value.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ OPTIMIZE PRICING FOR LONGER STAYS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Implement progressive pricing that rewards commitment:
              <ul className="list-disc pl-6 mt-2">
                <li>8-day stays: Full rate or minimal discount (5-10%)</li>
                <li>16-day stays: Moderate discount (15-20%)</li>
                <li>32-day stays: Attractive discount (25-30%)</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ REDUCE OPERATIONAL COSTS THROUGH EXTENDED STAYS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Longer stays naturally reduce key operational expenses:
              <ul className="list-disc pl-6 mt-2">
                <li>Housekeeping frequency: every 3-4 days instead of daily</li>
                <li>Lower laundry and supply costs per guest-night</li>
                <li>Reduced reception and check-in/out processing</li>
                <li>Decreased marketing and booking commission costs</li>
              </ul>
              <div className="mt-2">
                These savings can be reinvested in improving thematic experiences and guest satisfaction.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ LEVERAGE LOCAL PARTNERSHIPS FOR AUTHENTIC EXPERIENCES</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Partner with local businesses to enhance thematic offerings:
              <ul className="list-disc pl-6 mt-2">
                <li>Local restaurants for authentic culinary experiences</li>
                <li>Artisan workshops and cultural centers</li>
                <li>Fitness studios and wellness practitioners</li>
                <li>Educational institutions for language and skill programs</li>
                <li>Professional networks for business development events</li>
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
            <span className="font-bold text-xl block mb-2">Strategic Tips for 4-Star Hotels</span>
            <span className="block mb-4">
              4-star hotels can balance premium comfort with accessible thematic experiences to attract affluent guests seeking extended stays.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ COMBINE COMFORT WITH PURPOSEFUL STAYS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              4-star guests expect quality accommodations plus meaningful experiences:
              <ul className="list-disc pl-6 mt-2">
                <li>Premium workspace setups for business travelers</li>
                <li>High-quality wellness and fitness facilities</li>
                <li>Sophisticated culinary programs with renowned chefs</li>
                <li>Cultural immersion with expert guides and educators</li>
                <li>Professional development with industry leaders</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ TARGET AFFLUENT PROFESSIONALS AND LIFESTYLE SEEKERS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Focus marketing on guests who value both comfort and personal development:
              <ul className="list-disc pl-6 mt-2">
                <li>Business executives on extended projects</li>
                <li>Wellness enthusiasts seeking transformative experiences</li>
                <li>Creative professionals on sabbaticals or retreats</li>
                <li>Affluent retirees exploring new destinations and interests</li>
                <li>Entrepreneurs attending intensive programs or masterclasses</li>
              </ul>
              <div className="mt-2">
                These guests are willing to pay premium rates for stays that combine luxury with personal or professional growth.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ FOCUS ON "SMART LUXURY" RATHER THAN EXTRAVAGANCE</span>
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
            <span className="font-bold text-base">4️⃣ IMPLEMENT TIERED PRICING FOR MAXIMUM REVENUE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              4-star hotels can command higher base rates with strategic discounting:
              <ul className="list-disc pl-6 mt-2">
                <li>8-day stays: Premium rate with exclusive amenities</li>
                <li>16-day stays: 10-15% discount with upgraded services</li>
                <li>32-day stays: 20-25% discount with VIP treatment</li>
              </ul>
              <div className="mt-2">
                Higher base rates offset the discounts while longer stays reduce operational costs and increase overall revenue.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ CREATE EXCLUSIVE EXPERIENCES THAT JUSTIFY PREMIUM PRICING</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Develop unique offerings that guests cannot find elsewhere:
              <ul className="list-disc pl-6 mt-2">
                <li>Access to exclusive events, restaurants, or cultural sites</li>
                <li>Private sessions with renowned experts in various fields</li>
                <li>Customized itineraries based on guest interests and goals</li>
                <li>Premium partnerships with luxury brands and service providers</li>
                <li>Concierge services that extend beyond traditional hotel offerings</li>
              </ul>
              <div className="mt-2">
                These experiences create memorable stays that guests are willing to repeat and recommend to others.
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
            <span className="font-bold text-xl block mb-2">Strategic Tips for 5-Star Hotels</span>
            <span className="block mb-4">
              5-star hotels can position extended stays as luxury residential experiences for ultra-high-net-worth individuals and exclusive clientele.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ POSITION THE HOTEL AS A LUXURY RESIDENTIAL EXPERIENCE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              5-star hotels can present the stay not as a "temporary booking" but as a luxury temporary residence. Guests will appreciate:
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
                <li>24/7 personalized concierge and butler services</li>
                <li>Anticipatory service that exceeds expectations</li>
                <li>Seamless coordination of all guest requests and preferences</li>
                <li>Absolute discretion and privacy protection</li>
                <li>Immediate resolution of any issues or concerns</li>
              </ul>
              <div className="mt-2">
                Premium pricing is justified by delivering experiences that surpass even the highest guest expectations.
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* DOWNLOAD CALCULATOR Tab Content */}
      <TabsContent value="download" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-6 rounded-lg text-white" style={{
        background: "none"
      }}>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Download Strategic Calculator</h3>
            <p className="text-white/80 mb-6">
              Access our comprehensive Excel calculator to model rates and profitability for your specific hotel category and market conditions.
            </p>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">PREDICTABILITY – RESPONSIBILITY – EFFICIENCY</h4>
                <p className="text-white/90 text-sm">
                  The Hotel-Living model transforms traditional hospitality by focusing on extended stays that create predictable revenue streams, foster responsible resource management, and maximize operational efficiency.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">HOTEL-LIVING GUESTS ARE NOT TRANSIENT TOURISTS</h4>
                <p className="text-white/90 text-sm">
                  Our guests seek meaningful experiences, community connection, and purposeful stays that align with their personal or professional development goals. This approach creates higher guest satisfaction and loyalty.
                </p>
              </div>
              <div className="text-center mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Download Calculator (Excel)
                </button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>;
};