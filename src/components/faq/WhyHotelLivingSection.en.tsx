
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function WhyHotelLivingSectionEN() {
  const accordionOptions = [
    {
      value: "retired",
      label: "Retired?",
      content: (
        <div className="space-y-4">
          <p>Are you tired of paying rent or mortgage for a home you barely use? Hotel living offers the perfect solution for retirees who want to maximize their golden years.</p>
          <p><strong>Benefits for retirees:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No maintenance responsibilities - focus on enjoying life</li>
            <li>Built-in social opportunities and activities</li>
            <li>Professional housekeeping and meal services</li>
            <li>Prime locations near cultural attractions and healthcare</li>
            <li>Flexible arrangements - travel when you want</li>
          </ul>
        </div>
      )
    },
    {
      value: "online-worker",
      label: "Online Worker?",
      content: (
        <div className="space-y-4">
          <p>Transform your work-from-home routine into a work-from-anywhere adventure. Hotel living provides the perfect infrastructure for digital professionals.</p>
          <p><strong>Perfect for remote workers:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reliable high-speed internet and dedicated workspaces</li>
            <li>Professional environment away from home distractions</li>
            <li>Networking opportunities with other professionals</li>
            <li>All utilities and services included in one price</li>
            <li>Tax advantages for business accommodation</li>
          </ul>
        </div>
      )
    },
    {
      value: "commuter",
      label: "Commuter?",
      content: (
        <div className="space-y-4">
          <p>Skip the daily commute stress and live where you work. Hotel living near your workplace can revolutionize your work-life balance.</p>
          <p><strong>Commuter advantages:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Eliminate daily travel time and costs</li>
            <li>Reduce stress and improve work performance</li>
            <li>More time for personal activities and relationships</li>
            <li>Professional services like laundry and meals handled</li>
            <li>Flexible arrangements for different work schedules</li>
          </ul>
        </div>
      )
    },
    {
      value: "free-soul",
      label: "Free Soul?",
      content: (
        <div className="space-y-4">
          <p>Break free from the constraints of traditional housing. Hotel living offers the ultimate freedom for those who refuse to be tied down.</p>
          <p><strong>Freedom benefits:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No long-term commitments or binding contracts</li>
            <li>Explore different neighborhoods and cities easily</li>
            <li>Minimal possessions, maximum experiences</li>
            <li>Meet diverse people from around the world</li>
            <li>Live spontaneously without property responsibilities</li>
          </ul>
        </div>
      )
    },
    {
      value: "hotel",
      label: "Hotel?",
      content: (
        <div className="space-y-4">
          <p>Looking to revolutionize your hotel business model? Partner with us to transform empty rooms into consistent revenue streams.</p>
          <p><strong>Hotel benefits:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Guaranteed occupancy and steady income</li>
            <li>Reduced marketing and booking costs</li>
            <li>Professional guest screening and management</li>
            <li>Maintain hotel operations while maximizing revenue</li>
            <li>Join a growing network of innovative properties</li>
          </ul>
        </div>
      )
    },
    {
      value: "society",
      label: "Society?",
      content: (
        <div className="space-y-4">
          <p>Hotel living represents a sustainable solution to housing challenges, promoting efficient resource use and community building.</p>
          <p><strong>Societal benefits:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reduced urban sprawl and environmental impact</li>
            <li>Efficient use of existing infrastructure</li>
            <li>Enhanced community connections and social interaction</li>
            <li>Economic benefits for local businesses and tourism</li>
            <li>Innovative solution to housing affordability crisis</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#5A1876] via-[#6B1E88] to-[#7C2A9A] py-12 mb-8 rounded-2xl">
      <div className="container max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#FEF7CD]">
          Why Hotel Living?
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {accordionOptions.map((option) => (
            <AccordionItem 
              key={option.value} 
              value={option.value}
              className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 group"
            >
              <AccordionTrigger 
                className="px-6 py-4 text-[#FEF7CD] hover:text-white group-hover:bg-white/5 rounded-lg transition-all duration-200"
                titleClassName="text-lg font-semibold"
              >
                {option.label}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-[#E5D5F0]">
                {option.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
