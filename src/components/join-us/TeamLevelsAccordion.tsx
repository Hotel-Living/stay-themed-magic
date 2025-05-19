import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "./Section";

interface TeamLevel {
  id: string;
  name: string;
  tier: string;
  shortName: string;
  color: string;
  content: React.ReactNode;
}

export function TeamLevelsAccordion() {
  const [activeLevel, setActiveLevel] = useState<string>("glow");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Team levels with content
  const teamLevels: TeamLevel[] = [
    {
      id: "glow",
      name: "GLOW LEVEL",
      tier: "TIER 4",
      shortName: "GLOW",
      color: "#FFC83D",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#FFF9B0]">OPERATIONAL & CREATIVE TEAM</h3>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">PROFILE</h4>
            <p>
              Dynamic and adaptable persons who are ready to act on the frontlines of hotel acquisition 
              while also contributing to the development of Hotel Living in a variety of areas. 
              Members may come from different backgrounds, including tech, content creation, marketing, or hospitality.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">PURPOSE</h4>
            <p>
              The Glow Level (Tier 4) represents the largest group within Hotel Living's founding structure. 
              Members play a key operational role in the startup phase, with a strong focus on direct outreach to hotels, 
              while also offering the potential to contribute in technical, marketing, and creative areas as the project grows.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">COLLABORATION & REPRESENTATION SCOPE</h4>
            <p>
              Tier 4 team members are dynamic individuals with strong interpersonal skills and a natural talent for communication. 
              While professional qualifications are not strictly required at this level, it is essential that they embody 
              the values of Hotel Living and can represent the platform with confidence, enthusiasm, and credibility.
            </p>
            <p>
              They act as the social front line of the project — engaging with contacts, promoting the vision, 
              and helping extend the network of potential hotels, partners, or clients. Their ability to build trust, 
              maintain a positive presence, and connect with diverse audiences makes them an essential part of each Tier 3 leader's team.
            </p>
            <p>
              Tier 4 members may grow into more specialized roles over time, but their primary value lies in 
              their energy, social intelligence, and dedication to the success of the team and the platform.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">CORE RESPONSIBILITIES</h4>
            
            <div>
              <h5 className="text-base font-semibold text-[#FFF9B0]">1) STARTUP PHASE</h5>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Actively reach out to hotels via phone, email, and messaging platforms — this is a core responsibility of the role, whether identifying hotels independently or working with leads provided by Tier 3.</li>
                <li>Present the Hotel Living model using approved materials</li>
                <li>Track responses and report progress to Tier 3 coordinators</li>
                <li>Handle basic hotel inquiries and redirect as needed</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-base font-semibold text-[#FFF9B0]">2) MID-TERM GROWTH</h5>
              <p className="mt-1">
                Any professional field or area of contribution that could support the growth of Hotel Living includes, 
                among others but is not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Legal, accounting, business administration, and other roles relevant to a growing tech platform</li>
                <li>Hotel content creation (descriptions, FAQs, translation)</li>
                <li>Graphic design and UX interface feedback</li>
                <li>Front-end/back-end support and testing</li>
                <li>Digital marketing campaigns and community engagement</li>
                <li>Admin work: uploading photos, texts, or updating listings</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">Language Requirements</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fluency in English is required. Spanish knowledge would be a great plus</li>
              <li>Additional languages would be great for regional assignments</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "bridge",
      name: "BRIDGE LEVEL",
      tier: "TIER 3",
      shortName: "BRIDGE",
      color: "#9387F5", 
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#FFF9B0]">OUTREACH COORDINATORS</h3>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">PROFILE</h4>
            <p>
              Ambitious, resourceful, and well-connected professionals ready to take the lead. Tier 3 members 
              are empowered to build and lead their own Tier 4 team — a group of three collaborators they trust 
              and guide. This is not just about joining a project — it's about stepping into a leadership role 
              with real influence and visibility within the company.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">PURPOSE</h4>
            <p>
              The Bridge Level (Tier 3) members act as the bridge between strategic planning and daily operations. 
              At the Startup Phase, they are responsible for sourcing and organizing hotel data, assigning contact 
              tasks to Tier 4, and ensuring quality and consistency in the outreach process.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">LEADERSHIP SCOPE</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Tier 3 members take on a leadership role with real influence — they are empowered to build and lead 
                their own Tier 4 teams, selecting up to three trusted individuals who share their vision, values, or 
                professional interests. This allows them to shape their own working environment and create a strong, 
                reliable unit.
              </li>
              <li>
                As visible representatives of Hotel Living, Tier 3 leaders play a key role in expanding the project's 
                reach and reputation. Their leadership is not only operational, but social — building networks, setting 
                standards, and inspiring others.
              </li>
              <li>
                Alongside team coordination, they remain professionally active within their area of expertise, contributing 
                to the platform's ongoing quality, innovation, and strategic direction.
              </li>
              <li>
                They participate in quality control, progress tracking, and high-level discussions that shape the evolution 
                of Hotel Living.
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">CORE RESPONSIBILITIES</h4>
            
            <div>
              <h5 className="text-base font-semibold text-[#FFF9B0]">1) STARTUP PHASE</h5>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Identify and compile lists of potential hotels from portals, directories, and networks</li>
                <li>Distribute leads and assignments to Tier 4</li>
                <li>Clean and structure data; track campaign outcomes</li>
                <li>Provide daily support and supervision to their team</li>
                <li>Collaborate with Tier 2 directors for strategy alignment</li>
                <li>Leverage personal and professional networks to bring in valuable contacts or trusted collaborators who can enhance the project's reach and impact</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-base font-semibold text-[#FFF9B0]">2) MID-TERM GROWTH</h5>
              <p className="mt-1">
                Expertise or experience in any professional field that can meaningfully contribute to the growth of Hotel Living — 
                including, but not limited to, legal, marketing, communications, business administration, finance, UX/UI design, 
                software development, and project management.
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">Language Requirements</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fluency in English is required. Good Spanish knowledge is a great plus</li>
              <li>Additional languages would be great for regional assignments</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "drive",
      name: "DRIVE LEVEL",
      tier: "TIER 2",
      shortName: "DRIVE",
      color: "#FC9F5B", 
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#FFF9B0]">EXPANSION DIRECTORS</h3>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">PROFILE</h4>
            <p>
              Senior-level professionals with experience in any area of expertise that can meaningfully 
              contribute to the growth of the business.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">PURPOSE</h4>
            <p>
              The Drive Level (Tier 2) members are empowered to build and lead their own Tier 3 team — 
              a group of two collaborators they trust and guide. Tier 2 members are responsible for leading 
              hotel acquisition efforts across regions or segments. They manage their own team, negotiate with 
              associations and others, helping to refine commercial strategies in alignment with Hotel Living's goals.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">CORE RESPONSIBILITIES</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Develop and execute acquisition strategies by country, region, or type of hotel</li>
              <li>Negotiate with hotel chains, associations and others</li>
              <li>Supervise Tier 3 coordinators and their operational teams</li>
              <li>Represent Hotel Living at key meetings or events</li>
              <li>Monitor results and improve tactics based on data</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">DUAL ROLE — STRATEGIC & OPERATIONAL</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Generate strategic contacts and leads</li>
              <li>Help design materials and scripts tailored to each region</li>
              <li>Ensure execution quality throughout the team structure</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">LANGUAGE REQUIREMENTS</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fluency in English is required. Good Spanish knowledge is a great plus</li>
              <li>Additional languages would be great for regional assignments</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "summit",
      name: "SUMMIT LEVEL",
      tier: "TIER 1",
      shortName: "SUMMIT",
      color: "#8CD867", // Changed from #E932A2 (magenta) to light green
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#FFF9B0]">STRATEGIC ALLIES & HIGH-IMPACT PARTNERS</h3>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">PURPOSE</h4>
            <p>
              The Summit Level (Tier 1) includes high-value individuals whose involvement creates access, 
              visibility, trust, or massive opportunity — through influence, network, or reputation.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">PROFILE</h4>
            <p>
              Not part of daily operations. Their participation adds prestige, legitimacy, and exponential 
              reach to Hotel Living.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">WHO WE'RE LOOKING FOR:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Executives or former directors of hotel/tourism associations</li>
              <li>Investors with access to large hotel portfolios</li>
              <li>Hotel chain owners or regional operators</li>
              <li>Influencers or content creators with massive audiences</li>
              <li>Public figures, academics, or cultural leaders with strong reputations</li>
              <li>Connectors capable of opening entire networks with one introduction</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">STRATEGIC ROLE</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Unlock mass onboarding through partnerships</li>
              <li>Build public confidence in the platform</li>
              <li>Offer strategic advice and presence when needed</li>
              <li>Shape perception through their voice, name, or support</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">LANGUAGE REQUIREMENTS</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Good English level is advisable. Spanish knowledge would be a great plus</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const handleSelectLevel = (levelId: string) => {
    setActiveLevel(levelId);
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Accordion 
      type="single" 
      collapsible 
      defaultValue={isOpen ? "team-levels" : undefined} 
      onValueChange={(value) => setIsOpen(!!value)}
    >
      <AccordionItem value="team-levels" className="border-none">
        <AccordionTrigger className="flex items-center py-2">
          <div className="flex items-center">
            <ChevronDown className="h-6 w-6 text-yellow-300 mr-2 transition-transform" />
            <h2 className="text-3xl font-bold text-yellow-300">Team Structure Levels</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-white leading-relaxed mb-8 text-center">
            Explore the different levels of our team structure:
          </p>
          
          {/* Horizontal Tabs */}
          <div className="flex flex-col lg:flex-row mb-8 space-y-4 lg:space-y-0 lg:space-x-3 justify-center">
            {/* Reverse the levels so Tier 4 appears first (left) */}
            {[...teamLevels].reverse().map((level) => (
              <div 
                key={level.id}
                onClick={() => handleSelectLevel(level.id)}
                className={`flex-1 relative cursor-pointer flex flex-col items-center group transition-all duration-300 ${
                  activeLevel === level.id ? "transform scale-105" : "opacity-80 hover:opacity-100"
                }`}
              >
                {/* Hexagon Shape with gradient background */}
                <div 
                  className={`w-20 h-20 flex items-center justify-center relative`} 
                  style={{ filter: activeLevel === level.id ? 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' : '' }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon 
                      points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" 
                      className={`transition-all duration-300`}
                      fill={activeLevel === level.id ? level.color : `${level.color}80`}
                      stroke={activeLevel === level.id ? "#FFFFFF" : "#FFFFFF50"}
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    {level.tier}
                  </div>
                </div>
                
                {/* Label */}
                <div className="mt-2 text-center">
                  <p className={`text-sm font-bold transition-colors duration-300 ${
                    activeLevel === level.id ? "text-[#FFF9B0]" : "text-white group-hover:text-[#FFF9B0]"
                  }`}>
                    {level.shortName}
                  </p>
                </div>
                
                {/* Active indicator arrow */}
                {activeLevel === level.id && (
                  <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#FFF9B0] mt-1"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Content Display */}
          <div className="bg-[#8017B0]/40 rounded-lg p-6 shadow-lg backdrop-blur-sm border border-[#FFF9B0]/30">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-center" style={{ color: teamLevels.find(l => l.id === activeLevel)?.color || "#FFF9B0" }}>
                {teamLevels.find(l => l.id === activeLevel)?.name} - {teamLevels.find(l => l.id === activeLevel)?.tier}
              </h2>
              <div className="w-20 h-1 mx-auto mt-2 rounded-full" style={{ backgroundColor: teamLevels.find(l => l.id === activeLevel)?.color || "#FFF9B0" }}></div>
            </div>
            
            <div className="text-white">
              {teamLevels.find(l => l.id === activeLevel)?.content}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
