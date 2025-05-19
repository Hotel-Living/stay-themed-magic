
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Rocket, Lightbulb, Globe, Compass, BarChart3, Flame, Star, Briefcase, Handshake, Wrench, ChevronDown } from "lucide-react";
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
import { whoWeAreData, welcomingTalentData, revolutionData, alignmentData, whyEmergeData, whatWeOfferData, jobsInnovationData, technologyData, texasRevolutionData, strategicPartnershipsData } from "@/components/join-us/SectionData";

// Updated data for the first section
const marketCreationData = {
  paragraphs: ["🚀 We haven't just created a business — we've created an entirely new global market", "• 🌍 A completely new business model, legally registered and protected", "• 💰 With $12 billion in estimated annual profits", "• 🌐 And access to a brand-new $131 billion global market", "• ✅ A market that belongs entirely to us"]
};

// New section data - SaaS application updated to be more digestible blocks
const saasApplicationData = {
  paragraphs: [
    "• ⚡ Fully scalable SaaS solution",
    "• 📈 Profit margins nearly equal to total revenue",
    "• 🌎 Deployable instantly in any country",
    "________________________________________",
    "🚦 Our solution is 100% legal",
    "• We don't break systems — we enhance them with smart innovation",
    "• No regulatory conflicts like other disruptive platforms",
    "________________________________________",
    "🤝 Our core mission:",
    "Connecting two urgent needs:",
    "1. 🏨 Hospitality businesses losing millions on unused capacity",
    "2. 👥 People seeking meaningful, service-rich long-term stays",
    "________________________________________",
    "💡 A simple, elegant solution ready to reshape the future of lodging"
  ]
};

// New section data - Problems We Solve
const problemsWeSolveData = {
  paragraphs: ["🏨 On one side:", "HOTEL OCCUPANCY IN THE WEST IS JUST 50.3%", "• That means 4.7 billion hotel nights every year not only go unused — they generate losses.", "• Every year, 72,000 Western hotels are forced to shut down for up to 7 months due to lack of demand.", "• Over 4 million rooms remain completely empty for months on end.", "________________________________________", "👤 On the other side — in those same countries:", "270 MILLION PEOPLE:", "• Living alone or as couples", "• Pre-retired, retired, digital workers, or remote professionals", "• Tired of cooking, cleaning, daily repetition, loneliness, and lack of meaningful social life", "________________________________________", "These are 270 million individuals with stable income and freedom of movement.", "• Their \"impossible dream\"?", "To live as if on permanent vacation — with everything taken care of, full of services, attention, vibrant social interaction, and constant activities.", "• And if they're going to dream...", "They'd dream of being surrounded by people who share their values, interests, and lifestyle.", "Because the ultimate life?", "Is to live among people who truly match who you are."]
};

// New section data - Hotel-Living Solution
const hotelLivingSolutionData = {
  paragraphs: ["💡 At Hotel-Living, we've solved both sides of the equation.", "While the hotel industry bleeds from underused capacity,", "millions of people dream of living better lives.", "We didn't just patch the problem —", "we built a new system. A powerful, elegant, and absolutely unprecedented model, designed to revolutionize the way we live, travel, and connect.", "________________________________________", "🧠 HOTEL-LIVING IS A RADICAL SHIFT", "✅ We turn empty rooms into full lives.", "• We help hotels monetize what's losing them money:", "their unused rooms, closed wings, and off-season operations.", "• And we give individuals — retirees, remote workers, couples, solo livers —", "a new way to live:", "in comfort, community, and complete freedom from domestic routines.", "________________________________________", "🧩 A SYSTEM OF INTELLIGENT MODULES", "Hotel-Living is not just a booking platform.", "It's a fully integrated, smart-living ecosystem made of powerful modules:", "• 🗓️ Fixed-duration stays (8, 16, 24, 32 nights): predictable, profitable, optimized", "• 💸 Dynamic revenue logic: automatic pricing growth as rooms are booked", "• 🎯 Affinity-based segmentation: guests grouped by shared interests and lifestyles", "• 🧼 Full-service living: no cleaning, no cooking, no worries — ever", "• 🤝 Community by design: rich social interaction, shared experiences, human connection", "• 🔁 Plug & play SaaS: scalable, replicable, deployable worldwide in minutes", "• 🏷️ Marketing modules: built-in tools for hotels to attract the right guest, every time", "________________________________________", "🌍 GLOBAL, LEGAL, READY", "• ✅ Fully legal — no conflicts like Uber", "• 🛠️ Fully scalable — we're a SaaS product", "• 🌎 Ready for instant rollout in any country", "• 🧾 Business model fully registered and protected"]
};

// New section data - The Impact
const impactData = {
  paragraphs: ["________________________________________", "• 💰 $12B in projected annual net profits", "• 🌐 A $131B market — created from scratch", "• 🔐 And yes, it's 100% ours"]
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
            
            {/* THE IMPACT section */}
            <TextSection icon={BarChart3} title="THE IMPACT" paragraphs={impactData.paragraphs} />
            
            {/* WE ARE A SaaS APPLICATION section - updated content */}
            <TextSection icon={Wrench} title="WE ARE A SaaS APPLICATION" paragraphs={saasApplicationData.paragraphs} />
            
            {/* THE PROBLEMS WE SOLVE section */}
            <TextSection icon={Lightbulb} title="THE PROBLEMS WE SOLVE" paragraphs={problemsWeSolveData.paragraphs} />
            
            {/* THE HOTEL-LIVING SOLUTION section */}
            <TextSection icon={Star} title="THE HOTEL-LIVING SOLUTION" paragraphs={hotelLivingSolutionData.paragraphs} />
            
            {/* HOTEL LIVING: A NECESSARY REVOLUTION section */}
            <TextSection icon={Flame} title="HOTEL LIVING: A NECESSARY REVOLUTION" paragraphs={revolutionData.paragraphs} />
            
            {/* A NEW ALIGNMENT section */}
            <TextSection icon={Globe} title="A NEW ALIGNMENT" paragraphs={alignmentData.paragraphs} />
            
            {/* WHAT WE OFFER section */}
            <MultiListSection icon={Compass} title="WHAT WE OFFER" listGroups={whatWeOfferData.listGroups} />
            
            {/* JOBS, INNOVATION, FUTURE section */}
            <ListSection icon={BarChart3} title="JOBS, INNOVATION, FUTURE" intro={jobsInnovationData.intro} items={jobsInnovationData.items} outro={jobsInnovationData.outro} />
            
            {/* TECHNOLOGY WITH A HUMAN PURPOSE section */}
            <TextSection icon={Star} title="TECHNOLOGY WITH A HUMAN PURPOSE" paragraphs={technologyData.paragraphs} />
            
            {/* WE'RE WELCOMING NEW TALENT section */}
            <TextSection icon={Lightbulb} title="WE'RE WELCOMING NEW TALENT" paragraphs={welcomingTalentData.paragraphs} />
            
            {/* Image section before Strategic Partnerships - UPDATED WITH NEW IMAGE */}
            <div className="mb-16 flex justify-center">
              <img src="/lovable-uploads/06045feb-cf93-4027-bb37-f0c3102aace4.png" alt="Hotel-Living Partners Tier Structure and Projected Profits" className="w-1/2 max-w-3xl rounded-lg shadow-lg border border-[#3300B0]/30 object-scale-down" />
            </div>

            {/* WE ARE OPEN TO STRATEGIC PARTNERSHIPS section */}
            <TextSection icon={Handshake} title="WE ARE OPEN TO STRATEGIC PARTNERSHIPS" paragraphs={strategicPartnershipsData.paragraphs} />
            
            {/* WHO WE ARE section */}
            <TextSection icon={Rocket} title="WHO WE ARE" paragraphs={whoWeAreData.paragraphs} />
            
            {/* WHY DID THIS EMERGE? section */}
            <ListSection icon={Lightbulb} title="WHY DID THIS EMERGE?" intro={whyEmergeData.intro} items={whyEmergeData.items} outro={whyEmergeData.outro} />
            
            {/* INTELLECTUAL POSITIONING STATEMENT section */}
            <IntellectualPositioningSection />
            
            {/* Team Levels Accordion - title is already updated */}
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
