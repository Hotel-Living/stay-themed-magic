
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Rocket, Lightbulb, Globe, Compass, BarChart3, Flame, Star, Briefcase, Handshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { JoinUsHeader } from "@/components/join-us/JoinUsHeader";
import { TextSection } from "@/components/join-us/TextSection";
import { ListSection } from "@/components/join-us/ListSection";
import { MultiListSection } from "@/components/join-us/MultiListSection";
import { IntellectualPositioningSection } from "@/components/join-us/IntellectualPositioningSection";
import { JoinUsForm } from "@/components/join-us/JoinUsForm";
import { 
  whoWeAreData, 
  welcomingTalentData, 
  revolutionData, 
  alignmentData, 
  whyEmergeData, 
  whatWeOfferData, 
  jobsInnovationData, 
  technologyData,
  texasRevolutionData,
  strategicPartnershipsData
} from "@/components/join-us/SectionData";

export default function JoinUs() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <JoinUsHeader />
            
            {/* We Created a $12.7B Market section (formerly Texas Revolution) */}
            <TextSection 
              icon={Flame} 
              title="We Created a $12.7B Market" 
              paragraphs={texasRevolutionData.paragraphs} 
            />
            
            {/* Who we are section */}
            <TextSection 
              icon={Rocket} 
              title="Who We Are" 
              paragraphs={whoWeAreData.paragraphs} 
            />
            
            {/* We're welcoming new talent section */}
            <TextSection 
              icon={Lightbulb} 
              title="We're Welcoming New Talent" 
              paragraphs={welcomingTalentData.paragraphs} 
            />

            {/* Strategic partnerships section */}
            <TextSection 
              icon={Handshake} 
              title="We are Open to Strategic Partnerships" 
              paragraphs={strategicPartnershipsData.paragraphs} 
            />
            
            {/* Hotel Living: a necessary revolution section */}
            <TextSection 
              icon={Flame} 
              title="Hotel Living: A Necessary Revolution" 
              paragraphs={revolutionData.paragraphs} 
            />
            
            {/* A new alignment section */}
            <TextSection 
              icon={Globe} 
              title="A New Alignment" 
              paragraphs={alignmentData.paragraphs} 
            />
            
            {/* Why did this emerge? section */}
            <ListSection 
              icon={Lightbulb} 
              title="Why Did This Emerge?" 
              intro={whyEmergeData.intro}
              items={whyEmergeData.items}
              outro={whyEmergeData.outro}
            />
            
            {/* What we offer section */}
            <MultiListSection 
              icon={Compass} 
              title="What We Offer" 
              listGroups={whatWeOfferData.listGroups} 
            />
            
            {/* Jobs, innovation, future section */}
            <ListSection 
              icon={BarChart3} 
              title="Jobs, Innovation, Future" 
              intro={jobsInnovationData.intro}
              items={jobsInnovationData.items}
              outro={jobsInnovationData.outro}
            />
            
            {/* Technology with a human purpose section */}
            <TextSection 
              icon={Star} 
              title="Technology With a Human Purpose" 
              paragraphs={technologyData.paragraphs} 
            />
            
            {/* Intellectual Positioning Statement section */}
            <IntellectualPositioningSection />
            
            {/* Join Us section */}
            <JoinUsForm />
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}
