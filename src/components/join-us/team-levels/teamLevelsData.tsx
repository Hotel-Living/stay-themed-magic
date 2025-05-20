
import React from "react";
import { TeamLevel } from "./types";

// Team levels with content
export const teamLevelsData: TeamLevel[] = [
  {
    id: "glow",
    name: "GLOW LEVEL",
    tier: "TIER 4",
    shortName: "GLOW",
    color: "#FFC83D",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#FFF9B0]">LEVEL 4- CORE TEAM MEMBERS (30 PEOPLE)</h3>
        
        <p>
          The Glow team represents the operational and visible foundation of our organization. They are the first point of contact with the public and the ones who clearly and directly express the core values of our project.
        </p>
        <p>
          They act as daily ambassadors of our brand, bringing presence, consistency, and dynamism to every action. Their role is essential to ensure a strong and authentic connection between the company and its surroundings.
        </p>
        <p>
          Each team of three is carefully selected by a Bridge Leader (Level 3) to form a fundamental unit within the organization.
        </p>
        <p>
          Glow members are dynamic and adaptable individuals, ready to act on the frontlines of hotel acquisition while also contributing to the ongoing development of Hotel Living in a wide range of areas. Members may come from various professional or personal backgrounds, including technology, content creation, marketing, or hospitality.
        </p>
        <p>
          While formal qualifications are not strictly required, it is essential that every member of Glow Level embodies the values of Hotel Living and is capable of representing the platform with confidence, enthusiasm, and credibility.
        </p>
        <p>
          Glow Level members possess strong interpersonal skills and a natural ability for communication and engagement. They serve as the social front line of the project—interacting with contacts, promoting the vision, and helping to expand the network of potential hotels, partners, and clients.
        </p>
        <p>
          Their ability to build trust, maintain a positive and magnetic presence, and connect with diverse audiences makes them a key asset to every Bridge Leader's team.
        </p>
        <p>
          Although Glow Level members may evolve into more specialized roles over time, their primary value lies in their energy, social intelligence, and deep dedication to the collective success of the team and the platform. They will be involved in hotel outreach, while also offering the potential to contribute in technical, marketing, or creative areas as Hotel Living continues to grow.
        </p>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-[#FFF9B0]">CORE RESPONSIBILITIES</h4>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">A) HOTEL RELATIONS AND COMMERCIAL OPERATIONS DEPARTMENT (18 PEOPLE)</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Onboarding Specialists (12): Hotel relations for both presentation and acquisition.</li>
              <li>Integration Specialists (6): Contract integration and follow-up.</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">B) MARKETING AND EXPANSION DEPARTMENT (3 PEOPLE)</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>SEO/SEM Specialists (3): Search engine optimization and marketing campaigns.</li>
              <li>Content Creators (3): Blog writing, newsletters, and promotional materials.</li>
              <li>Social Media Managers (3): Managing social profiles and community engagement.</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">C) TECHNOLOGY AND DEVELOPMENT DEPARTMENT (3 PEOPLE)</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Frontend and Backend Developers (3): Implementation of functional and attractive user interfaces, server logic, and database management.</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">D) CUSTOMER SERVICE – HOTELS AND USERS (3 PEOPLE)</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Customer Support Representatives (3): Handling user inquiries and issue resolution.</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">E) LEGAL AND HUMAN RESOURCES DEPARTMENT (3 PEOPLE)</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Human Resources Manager (1): Legal support and regulatory compliance.</li>
              <li>Human Resources Specialists (2): Talent management and development of internal company culture.</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#FFF9B0]">LANGUAGE REQUIREMENTS</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>A working knowledge of English is more than advisable to ensure effective communication across international contexts.</li>
              <li>Additional languages would be great for regional assignments.</li>
            </ul>
          </div>
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
        <h3 className="text-xl font-bold text-[#FFF9B0]">LEVEL 3 – TEAM LEADERS (10 PEOPLE)</h3>
        
        <p>
          Ten essential Team Leaders, each authorized to form and lead a team of three Glow members.
        </p>
        
        <p>
          These leaders are distributed across the departments of Hotel Relations, Marketing, Technology, Customer Support, and Legal/HR.
        </p>
        
        <p>
          Ambitious, resourceful, and well-connected professionals ready to take the lead. Tier 3 members are empowered to build and lead their own Tier 4 team — a group of three collaborators they trust and guide.
        </p>
        
        <p>
          This is not just about joining a project — it's about stepping into a leadership role with real influence and visibility within the company.
        </p>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-[#FFF9B0]">PURPOSE</h4>
          <p>
            The Bridge Level (Tier 3) members act as the bridge between strategic planning and daily operations. At the Startup Phase, they are responsible for sourcing and organizing hotel data, assigning contact tasks to Tier 4, and ensuring quality and consistency in the outreach process.
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-[#FFF9B0]">LEADERSHIP SCOPE</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Bridge Level members take on a leadership role with real influence — they are empowered to build and lead their own Tier 4 teams, selecting up to three trusted individuals who share their vision, values, or professional interests. This allows them to shape their own working environment and create a strong, reliable unit.</li>
            <li>As visible representatives of Hotel Living, Bridge Level leaders play a key role in expanding the project's reach and reputation. Their leadership is not only operational, but social — building networks, setting standards, and inspiring others.</li>
            <li>Alongside team coordination, they remain professionally active within their area of expertise, contributing to the platform's ongoing quality, innovation, and strategic direction.</li>
            <li>They participate in quality control, progress tracking, and high-level discussions that shape the evolution of Hotel Living.</li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-[#FFF9B0]">CORE RESPONSIBILITIES</h4>
          <p>
            These leaders are distributed across the departments of Hotel Relations, Marketing, Technology, Customer Support, and Legal/HR.
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-[#FFF9B0]">DEPARTMENTS</h4>
          
          <div className="space-y-2">
            <h5 className="text-base font-semibold text-[#FFF9B0]">A) HOTEL RELATIONS AND COMMERCIAL OPERATIONS DEPARTMENT (6 TEAMS – 6 LEADERS)</h5>
            <p>Leaders of Hotel and User Base Development</p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-base font-semibold text-[#FFF9B0]">B) MARKETING AND EXPANSION DEPARTMENT (1 TEAM – 1 LEADER)</h5>
            <p>Digital Marketing Leader: SEO, SEM strategies, advertising campaigns, and social media.</p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-base font-semibold text-[#FFF9B0]">C) TECHNOLOGY AND DEVELOPMENT DEPARTMENT (1 TEAM – 1 LEADER)</h5>
            <p>Software Development Leader: Maintenance and Frontend/Backend development.</p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-base font-semibold text-[#FFF9B0]">D) CUSTOMER SERVICE DEPARTMENT– HOTELS AND USERS (1 TEAM – 1 LEADER)</h5>
            <p>Customer Support Leader: Customer service and user experience for both hotels and end users.</p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-base font-semibold text-[#FFF9B0]">E) LEGAL AND HUMAN RESOURCES DEPARTMENT (1 TEAM – 1 LEADER)</h5>
            <p>Legal and HR Leader: Legal matters, talent management, and internal company culture.</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-[#FFF9B0]">LANGUAGE REQUIREMENTS</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>A working knowledge of English is more than advisable to ensure effective communication across international contexts.</li>
            <li>Additional languages would be great for regional assignments.</li>
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
        <h3 className="text-xl font-bold text-[#FFF9B0]">LEVEL 2 – KEY EXPANSION PARTNERS (5 PEOPLE)</h3>
        
        <p>
          Senior-level professionals with experience in any area of expertise that can meaningfully contribute to the growth of the business.
        </p>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-[#FFF9B0]">PURPOSE</h4>
          <p>
            These allies also hold relevant influence in strategic environments, and their primary role is to drive the expansion of Hotel Living through their network and direct involvement in high-impact actions.
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-[#FFF9B0]">CORE RESPONSIBILITIES</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Develop and execute acquisition strategies by country, region, or type of hotel</li>
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
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-[#FFF9B0]">LANGUAGE REQUIREMENTS</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>A working knowledge of English is more than advisable to ensure effective communication across international contexts.</li>
            <li>Additional languages would be great for regional assignments.</li>
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
    color: "#8CD867",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#FFF9B0]">LEVEL 1 – STRATEGIC AMBASSADORS (5 PEOPLE)</h3>
        
        <p>
          The Summit Level (Tier 1) includes high-value individuals whose involvement creates access, visibility, trust, or massive opportunity — through influence, network, or reputation.
        </p>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-[#FFF9B0]">PURPOSE</h4>
          <p>
            Not part of daily operations. Their participation adds prestige, legitimacy, and exponential reach to Hotel Living.
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-[#FFF9B0]">WHO WE'RE LOOKING FOR:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Influencers or content creators with massive audiences</li>
            <li>Public figures, academics, or cultural leaders with strong reputations</li>
            <li>Connectors capable of opening entire networks with one introduction</li>
            <li>Executives or former directors of hotel/tourism associations</li>
            <li>Hotel chain owners or regional operators</li>
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
      </div>
    )
  }
];
