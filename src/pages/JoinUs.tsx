
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Rocket, Lightbulb, Globe, Compass, BarChart3, Flame, Star, Briefcase, Handshake, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { JoinUsHeader } from "@/components/join-us/JoinUsHeader";
import { TextSection } from "@/components/join-us/TextSection";
import { ListSection } from "@/components/join-us/ListSection";
import { MultiListSection } from "@/components/join-us/MultiListSection";
import { IntellectualPositioningSection } from "@/components/join-us/IntellectualPositioningSection";
import { JoinUsForm } from "@/components/join-us/JoinUsForm";
import { TeamLevelsAccordion } from "@/components/join-us/TeamLevelsAccordion";
import { JoinUsFaq } from "@/components/join-us/faq/JoinUsFaq";
import { whoWeAreData, welcomingTalentData, revolutionData, whyEmergeData, whatWeOfferData, jobsInnovationData, technologyData, strategicPartnershipsData } from "@/components/join-us/SectionData";

// Updated data for the market creation section
const marketCreationData = {
  paragraphs: [
    "🚀 We didn't just start a business — we created an entirely new global market.",
    "🌐 A $131 billion opportunity that exists because of our original and fully registered business model.",
    "🔐 This market wouldn't exist without it — and it belongs 100% to us.",
    "🌍 Our structure is unique, protected, and legally secured, making replication impossible.",
    "💰 With $12 billion in estimated annual profits, this is not just a company — it's a fully-owned, global category we built from the ground up.",
    "✅ We own the model. We own the market."
  ]
};

// Updated data for the SaaS application section
const saasApplicationData = {
  paragraphs: [
    "⚡ FULLY SCALABLE SAAS",
    "📈 Profit margins nearly equal to total revenue",
    "🌎 Deployable instantly in any country",
    "",
    "🚫 WE DON'T BREAK SYSTEMS",
    "🚫 We're not Uber or Airbnb: we don't disrupt and wait years to scale",
    "✅ We enhance existing systems through smart, seamless innovation",
    "",
    "🤝 OUR CORE MISSION:",
    "Connecting two urgent needs:",
    "1. 🏨 Hospitality businesses losing millions on unused capacity",
    "2. 👥 People seeking better, meaningful lifes",
    "________________________________________",
    "💡 We are not just a platform — but a complete ecosystem, progressively unfolding to redefine lodging worldwide."
  ]
};

// Updated data for the problems we solve section
const problemsWeSolveData = {
  paragraphs: [
    "🏨 On one side:",
    "🏢 HOTEL OCCUPANCY IN THE WEST IS JUST 50.3% *",
    "• That means 4.7 billion hotel nights** every year not only go unused — they generate losses.",
    "• Every year, 72,000 Western hotels*** are forced to shut down for up to 7 months due to lack of demand.",
    "________________________________________",
    "👤 ON THE OTHER SIDE — IN THOSE SAME COUNTRIES:",
    "370 MILLION PEOPLE****:",
    "• Living alone or as couples",
    "• Pre-retired, retired, digital workers, or remote professionals",
    "• Tired of cooking, cleaning, daily repetition, loneliness, and lack of meaningful social life",
    "________________________________________",
    "These are 370 million individuals with stable income and freedom of movement.",
    "",
    "• Their "impossible dream"?",
    "To live with everything taken care of, enjoying a full array of services, attention, vibrant social interaction, and constant activities. And for many of them, pre-retired, retired, ecc, to live as if on permanent vacation",
    "",
    "• And if they're going to dream...",
    "They'd dream of being surrounded by people who share their values, interests, and lifestyle.",
    "",
    "Because the ultimate life is to live among people who truly match who you are.",
    "",
    "WE ARE THE SOLUTION FOR THOSE 4,7 B EMPTY HOTEL NIGHTS, AND FOR A LUCKY FRACTION, 3,1%****** IN FACT, OF THOSE 370 MILLIONS OF PEOPLE NEEDING OUR SERVICES"
  ]
};

// Updated data for the hotel-living solution section
const hotelLivingSolutionData = {
  paragraphs: [
    "🧩 A SYSTEM OF INTELLIGENT MODULES",
    "",
    "We are not just another ¨booking¨ platform.",
    "We are a fully integrated, smart-living ecosystem made of powerful modules. Just to start:",
    "",
    "🗓️ Fixed-duration stays (8, 16, 24, 32 nights): predictable, profitable, optimized",
    "🎯 Affinity-based segmentation: guests grouped by shared interests and lifestyles",
    "🤝 Community by design: rich social interaction, shared experiences, human connection",
    "🧼 Full-service living: no cleaning, no cooking, no worries — ever",
    "💸 Dynamic revenue logic: automatic pricing growth as rooms are booked",
    "🔁 Plug & play SaaS: scalable, replicable, deployable worldwide in minutes",
    "Marketing modules: built-in tools for hotels to attract the right guest, every time"
  ]
};

export default function JoinUs() {
  return <div className="min-h-screen flex flex-col relative">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <JoinUsHeader />
            
            {/* WE CREATED A $131B MARKET section - updated content */}
            <TextSection icon={Flame} title="WE CREATED A $131B MARKET" paragraphs={marketCreationData.paragraphs} />
            
            {/* WE ARE A SaaS APPLICATION section - updated content */}
            <TextSection icon={Wrench} title="WE ARE A SaaS APPLICATION" paragraphs={saasApplicationData.paragraphs} />
            
            {/* THE PROBLEMS WE SOLVE section - updated content */}
            <TextSection icon={Lightbulb} title="THE PROBLEMS WE SOLVE" paragraphs={problemsWeSolveData.paragraphs} />
            
            {/* THE HOTEL-LIVING SOLUTION section - updated content */}
            <TextSection icon={Star} title="THE HOTEL-LIVING SOLUTION" paragraphs={hotelLivingSolutionData.paragraphs} />
            
            {/* HOTEL LIVING: A NECESSARY REVOLUTION section */}
            <TextSection icon={Flame} title="HOTEL LIVING: A NECESSARY REVOLUTION" paragraphs={revolutionData.paragraphs} />
            
            {/* WHAT WE OFFER section - will update in SectionData.ts */}
            <MultiListSection icon={Compass} title="WHAT WE OFFER" listGroups={whatWeOfferData.listGroups} />
            
            {/* JOBS, INNOVATION, FUTURE section - will update in SectionData.ts */}
            <ListSection icon={BarChart3} title="JOBS, INNOVATION, FUTURE" intro={jobsInnovationData.intro} items={jobsInnovationData.items} outro={jobsInnovationData.outro} />
            
            {/* TECHNOLOGY WITH A HUMAN PURPOSE section - will update in SectionData.ts */}
            <TextSection icon={Star} title="TECHNOLOGY WITH A HUMAN PURPOSE" paragraphs={technologyData.paragraphs} />
            
            {/* WE'RE WELCOMING NEW TALENT section - will update in SectionData.ts */}
            <TextSection icon={Lightbulb} title="WE'RE WELCOMING NEW TALENT" paragraphs={welcomingTalentData.paragraphs} />
            
            {/* Image section before Strategic Partnerships */}
            <div className="mb-16 flex justify-center">
              <img src="/lovable-uploads/06045feb-cf93-4027-bb37-f0c3102aace4.png" alt="Hotel-Living Partners Tier Structure and Projected Profits" className="w-1/2 max-w-3xl rounded-lg shadow-lg border border-[#3300B0]/30 object-scale-down" />
            </div>

            {/* WE ARE OPEN TO STRATEGIC PARTNERSHIPS section - will update in SectionData.ts */}
            <TextSection icon={Handshake} title="WE ARE OPEN TO STRATEGIC PARTNERSHIPS" paragraphs={strategicPartnershipsData.paragraphs} />
            
            {/* WHO IS THE FOUNDER OF HOTEL-LIVING? section - renamed from "WHY DID THIS EMERGE?" - will update in SectionData.ts */}
            <ListSection icon={Rocket} title="WHO IS THE FOUNDER OF HOTEL-LIVING?" intro={whyEmergeData.intro} items={whyEmergeData.items} outro={whyEmergeData.outro} />
            
            {/* INTELLECTUAL POSITIONING STATEMENT section */}
            <IntellectualPositioningSection />
            
            {/* Team Levels Accordion */}
            <TeamLevelsAccordion />
            
            {/* FREQUENTLY ASKED QUESTIONS Section */}
            <JoinUsFaq />
            
            {/* Join Us form */}
            <JoinUsForm />
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>;
}
