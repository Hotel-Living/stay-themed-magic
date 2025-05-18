
import React from "react";
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
  content: React.ReactNode;
}

export function TeamLevelsAccordion() {
  // Team levels with content
  const teamLevels: TeamLevel[] = [
    {
      id: "glow",
      name: "GLOW LEVEL - TIER 4",
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
      name: "BRIDGE LEVEL - TIER 3",
      content: "Content for Bridge Level - Tier 3 will be provided soon."
    },
    {
      id: "drive",
      name: "DRIVE LEVEL - TIER 2",
      content: "Content for Drive Level - Tier 2 will be provided soon."
    },
    {
      id: "summit",
      name: "SUMMIT LEVEL - TIER 1",
      content: "Content for Summit Level - Tier 1 will be provided soon."
    }
  ];

  return (
    <Section icon={ChevronDown} title="Team Structure Levels">
      <p className="text-white leading-relaxed mb-4">
        Explore the different levels of our team structure below:
      </p>
      <Accordion type="single" collapsible className="w-full">
        {teamLevels.map((level) => (
          <AccordionItem 
            key={level.id} 
            value={level.id}
            className="border-b border-[#3300B0]/30 py-2"
          >
            <AccordionTrigger 
              className="hover:no-underline group" 
              titleClassName="text-lg font-medium text-[#FFF9B0] group-hover:text-[#FEF7CD]"
            >
              {level.name}
            </AccordionTrigger>
            <AccordionContent className="text-white">
              <div className="px-4 py-6 bg-[#8017B0]/40 rounded-lg mt-2">
                {level.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
