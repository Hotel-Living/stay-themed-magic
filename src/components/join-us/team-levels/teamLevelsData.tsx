
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
        <h3 className="text-xl font-bold text-[#FFF9B0]">Level 4 – Core Team Members (30 people)</h3>
        
        <p>
          The Glow team represents the operational and visible foundation of our organization. They are the first point of contact with the public and the ones who clearly and directly convey the essential values of our project.
        </p>
        <p>
          They act as daily ambassadors of our brand, bringing presence, consistency, and dynamism to every action. Their role is key to ensuring a strong connection between the company and its surroundings.
        </p>
        <p>
          Each team of three is carefully selected by a Bridge Leader (Level 3) to form a fundamental unit within the organization.
        </p>
        
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
        <h3 className="text-xl font-bold text-[#FFF9B0]">Level 3 – Team Leaders (10 people)</h3>
        
        <p>
          Ten essential Team Leaders, each authorized to form and lead a team of three Glow members. These leaders are distributed across the departments of Hotel Relations, Marketing, Technology, Customer Support, and Legal/HR.
        </p>
        
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
        <h3 className="text-xl font-bold text-[#FFF9B0]">Level 2 – Key Expansion Partners (5 people)</h3>
        
        <p>
          Each Summit Ambassador selects a trusted individual to join this level. These allies also hold relevant influence in strategic environments, and their primary role is to drive the expansion of Hotel Living through their network and direct involvement in high-impact actions.
        </p>
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
        <h3 className="text-xl font-bold text-[#FFF9B0]">Level 1 – Strategic Ambassadors (5 people)</h3>
        
        <p>
          Individuals with significant influence in their respective fields: entrepreneurs, influencers, experts, or public figures who bring visibility, credibility, and key opportunities. They are role models who open doors and support our vision.
        </p>
      </div>
    )
  }
];
