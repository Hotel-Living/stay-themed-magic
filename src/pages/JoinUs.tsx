
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
import { whoWeAreData, welcomingTalentData, revolutionData, whyEmergeData, jobsInnovationData, technologyData, strategicPartnershipsData } from "@/components/join-us/SectionData";

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

// Define whatWeOfferData with the updated content
const whatWeOfferData = {
  listGroups: [
    {
      title: "TO HOTELS",
      items: [
        "💰 A $131 billion opportunity in new annual sales",
        "Hotel Living opens the door to an entirely new market — one that generates over $131 billion in additional annual revenue for the hotel industry worldwide. And it does so without disrupting your core operations.",
        "",
        "📆 Permanent, year-round occupancy",
        "Say goodbye to empty rooms during low seasons. Hotel Living ensures a stable flow of long-stay guests through fixed-duration stays (8, 16, 24, or 32 days), helping maintain consistent revenue across all seasons.",
        "",
        "🔄 New revenue streams without disrupting traditional operations",
        "The Hotel Living model runs in parallel to your standard bookings. You continue your daily business, while simultaneously filling unused capacity with a curated, high-quality audience — no overhauls, no retraining, no restructuring.",
        "",
        "🧰 Smarter use of existing resources",
        "Maximize what you already have: rooms, dining services, cleaning staff, unused amenities. Hotel Living optimizes hotel infrastructure and personnel without requiring major investment.",
        "",
        "📈 Higher profitability per room",
        "Long-stay guests reduce operational turnover and generate more stable income. The result: lower cleaning frequency, fewer check-ins/outs, and improved resource efficiency — all leading to better margins.",
        "",
        "👥 Attract a new kind of guest",
        "Tap into the fast-growing segment of professionals, creatives, digital nomads, and active retirees seeking a home-like experience with hotel-level services — guests who value reliability, community, and lifestyle.",
        "",
        "🌟 Stronger positioning in the market",
        "Being part of Hotel Living associates your property with innovation, flexibility, and forward-thinking hospitality. It places your hotel at the intersection of travel, wellness, work, and culture.",
        "",
        "📣 Enhanced visibility and social relevance",
        "Hotels aligned with meaningful themes — like art, gastronomy, languages, or wellness — enjoy targeted exposure to new niche markets. You don't just host guests — you host aligned communities.",
        "",
        "🛠️ No risk, full control",
        "You decide how many rooms to offer, in which seasons, and under what conditions. You can test the model gradually or scale participation as it proves successful — always on your terms.",
        "",
        "🎯 Tailored marketing support",
        "Hotel Living promotes your property through a dedicated platform and content strategy focused on long-stay experiential travel — giving your brand visibility beyond conventional OTAs.",
        "",
        "🌍 New relevance in a changing world",
        "As travelers seek more than tourism — looking for meaning, connection, and lifestyle — your hotel becomes more than lodging. It becomes a lived experience."
      ]
    },
    {
      title: "TO OUR CUSTOMERS",
      items: [
        "🏃‍♂️ For many individuals or couples — even those still in their working years — Hotel Living offers the freedom to step away from traditional rental life. No need for long-term leases, complicated applications, payslips, deposits, or credit checks. You simply choose a hotel and move in — no strings, no stress.",
        "",
        "🧺 A fully-serviced lifestyle — no housework, no maintenance, no errands. Meals, cleaning, and comfort are already taken care of, so you can focus on living, creating, and connecting.",
        "",
        "💸 Affordable stays often comparable to the cost of conventional living — but with far more convenience, flexibility, and emotional well-being.",
        "",
        "🫂 A life beyond isolation — ideal for those tired of being alone in apartments. Hotel Living provides opportunities to be part of something, to connect naturally with others.",
        "",
        "🎨 Communities based on shared affinities — live among people who love the same things you do: art, languages, cuisine, wellness, technology, or creative work.",
        "",
        "✨ A chance to feel alive and socially reenergized — especially for those who feel their daily routine has become lonely or stagnant.",
        "",
        "🤝 The opportunity to make meaningful, even life-changing connections, through everyday encounters with people who share your mindset and passions.",
        "",
        "🌿 A lighter, more human way to live — ideal for remote workers, creatives, semi-retired individuals, and anyone seeking freedom without loneliness.",
        "",
        "🌍 And for retirees, early retirees, or those with financial independence: the chance to move freely around the world, living in 8, 16, 24, or 32-day stays while discovering new communities, people, and places — without pressure, without isolation, and with everything taken care of.",
        "",
        "🏠 And for homeowners: the possibility to rent out your primary residence while you live, travel, and enjoy life through Hotel Living — turning your home into income and your life into movement."
      ]
    },
    {
      title: "TO SOCIETY",
      items: [
        "🌐 A new model of urban mobility and social connection — Hotel Living makes it easier for people to move, live, and engage across cities, reducing geographic and emotional isolation.",
        "🏘️ Better use of urban infrastructure — vacant hotel rooms are activated as living spaces, reducing waste and revitalizing underused properties.",
        "🤝 More social cohesion and inclusion — by connecting people with shared affinities and values, Hotel Living helps build organic communities where dialogue and collaboration flourish.",
        "💡 A new alternative to housing stress — for people priced out of long-term rentals or burdened by rigid leases, Hotel Living offers a flexible, dignified, and accessible solution.",
        "🧓 Improved quality of life for aging populations — active seniors can live independently while enjoying built-in community and services, reducing loneliness and care-related stress.",
        "🌎 Opportunities for cultural exchange and mutual learning — thematic stays promote human connection across borders, fostering diversity and empathy.",
        "👩‍💼 Support for digital and creative professionals — Hotel Living offers a viable base for remote work and innovation, nurturing talent beyond large capitals.",
        "📊 An economic boost to the hospitality sector — increased occupancy and new market segments stabilize hotel revenue year-round, strengthening local economies.",
        "🏠 Unlocking housing potential — by allowing homeowners to rent out their primary residence while they travel or live elsewhere, Hotel Living activates dormant housing stock in a balanced way.",
        "🌱 A more sustainable way of living — shared services, optimized logistics, and conscious mobility reduce environmental impact compared to fragmented, resource-heavy lifestyles."
      ]
    }
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
            
            {/* WHAT WE OFFER section - updated content */}
            <MultiListSection icon={Compass} title="WHAT WE OFFER" listGroups={whatWeOfferData.listGroups} />
            
            {/* JOBS, INNOVATION, FUTURE section */}
            <ListSection icon={BarChart3} title="JOBS, INNOVATION, FUTURE" intro={jobsInnovationData.intro} items={jobsInnovationData.items} outro={jobsInnovationData.outro} />
            
            {/* TECHNOLOGY WITH A HUMAN PURPOSE section */}
            <TextSection icon={Star} title="TECHNOLOGY WITH A HUMAN PURPOSE" paragraphs={technologyData.paragraphs} />
            
            {/* WE'RE WELCOMING NEW TALENT section */}
            <TextSection icon={Lightbulb} title="WE'RE WELCOMING NEW TALENT" paragraphs={welcomingTalentData.paragraphs} />
            
            {/* Image section before Strategic Partnerships */}
            <div className="mb-16 flex justify-center">
              <img src="/lovable-uploads/06045feb-cf93-4027-bb37-f0c3102aace4.png" alt="Hotel-Living Partners Tier Structure and Projected Profits" className="w-1/2 max-w-3xl rounded-lg shadow-lg border border-[#3300B0]/30 object-scale-down" />
            </div>

            {/* WE ARE OPEN TO STRATEGIC PARTNERSHIPS section */}
            <TextSection icon={Handshake} title="WE ARE OPEN TO STRATEGIC PARTNERSHIPS" paragraphs={strategicPartnershipsData.paragraphs} />
            
            {/* WHO IS THE FOUNDER OF HOTEL-LIVING? section - renamed from "WHY DID THIS EMERGE?" */}
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
