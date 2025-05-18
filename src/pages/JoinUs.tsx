
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
import { whoWeAreData, welcomingTalentData, revolutionData, alignmentData, whyEmergeData, whatWeOfferData, jobsInnovationData, technologyData, texasRevolutionData, strategicPartnershipsData } from "@/components/join-us/SectionData";

// Updated data for the first section
const marketCreationData = {
  paragraphs: ["🚀 We haven't just created a business — we've created an entirely new global market", "• 🌍 A completely new business model, legally registered and protected", "• 💰 With $12 billion in estimated annual profits", "• 🌐 And access to a brand-new $131 billion global market", "• ✅ A market that belongs entirely to us"]
};

// New section data - SaaS application
const saasApplicationData = {
  paragraphs: ["• ⚡ Fully scalable", "• 📈 Profit margins nearly equal to total revenue", "• 🌎 Deployable instantly, in any country", "________________________________________", "🚦Our revolution is fully legal", "• We are not Uber.", "• We don't break the system — we empower it with smart, lawful innovation.", "________________________________________", "🤝 What do we do?", "We connect two worlds in urgent need of each other:", "1. 🏨 Hospitality businesses losing millions to underused resources", "2. 👥 People looking to radically improve their lives through meaningful, long-term stays", "________________________________________", "💡 A simple, legal, game-changing solution.", "And it's ready to reshape the future of lodging"]
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
            
            {/* We Created a $12.7B Market section - updated content */}
            <TextSection icon={Flame} title="We Created a $12.7B Market" paragraphs={marketCreationData.paragraphs} />
            
            {/* New section - We are a SaaS application */}
            <TextSection icon={Wrench} title="🛠️ We are a SaaS application" paragraphs={saasApplicationData.paragraphs} />
            
            {/* Who we are section */}
            <TextSection icon={Rocket} title="Who We Are" paragraphs={whoWeAreData.paragraphs} />
            
            {/* New section - The Problems We Solve */}
            <TextSection icon={Lightbulb} title="The Problems We Solve" paragraphs={problemsWeSolveData.paragraphs} />
            
            {/* New section - The Hotel-Living Solution */}
            <TextSection icon={Star} title="The Hotel-Living Solution" paragraphs={hotelLivingSolutionData.paragraphs} />
            
            {/* New section - THE IMPACT */}
            <TextSection icon={BarChart3} title="THE IMPACT" paragraphs={impactData.paragraphs} />
            
            {/* We're welcoming new talent section */}
            <TextSection icon={Lightbulb} title="We're Welcoming New Talent" paragraphs={welcomingTalentData.paragraphs} />

            {/* Image section before Strategic Partnerships - REPLACED WITH NEW IMAGE AT HALF SIZE */}
            <div className="mb-16 flex justify-center">
              <img src="/lovable-uploads/ce5f1cc2-14f9-4811-b54b-a204288d75a3.png" alt="Hotel-Living Partners Tier Structure and Projected Profits" className="w-1/2 max-w-3xl rounded-lg shadow-lg border border-[#3300B0]/30 object-scale-down" />
            </div>

            {/* Strategic partnerships section */}
            <TextSection icon={Handshake} title="We are Open to Strategic Partnerships" paragraphs={strategicPartnershipsData.paragraphs} />
            
            {/* Hotel Living: a necessary revolution section */}
            <TextSection icon={Flame} title="Hotel Living: A Necessary Revolution" paragraphs={revolutionData.paragraphs} />
            
            {/* A new alignment section */}
            <TextSection icon={Globe} title="A New Alignment" paragraphs={alignmentData.paragraphs} />
            
            {/* Why did this emerge? section */}
            <ListSection icon={Lightbulb} title="Why Did This Emerge?" intro={whyEmergeData.intro} items={whyEmergeData.items} outro={whyEmergeData.outro} />
            
            {/* What we offer section */}
            <MultiListSection icon={Compass} title="What We Offer" listGroups={whatWeOfferData.listGroups} />
            
            {/* Jobs, innovation, future section */}
            <ListSection icon={BarChart3} title="Jobs, Innovation, Future" intro={jobsInnovationData.intro} items={jobsInnovationData.items} outro={jobsInnovationData.outro} />
            
            {/* Technology with a human purpose section */}
            <TextSection icon={Star} title="Technology With a Human Purpose" paragraphs={technologyData.paragraphs} />
            
            {/* Intellectual Positioning Statement section */}
            <IntellectualPositioningSection />
            
            {/* Team Levels Accordion - NEW SECTION */}
            <TeamLevelsAccordion />
            
            {/* Join Us section */}
            <JoinUsForm />
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>;
}
