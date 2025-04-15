
import React from "react";
import { AccordionMenuItem } from "../AccordionMenuItem";
import { CollapsibleMenuItem } from "../CollapsibleMenuItem";

interface SpecialMenuItemsProps {
  startingNumber: number;
  preventScroll?: boolean;
}

export function SpecialMenuItems({ startingNumber = 5, preventScroll = false }: SpecialMenuItemsProps) {
  return (
    <>
      {/* Specialized hotel sections */}
      <AccordionMenuItem 
        value="specialized-hotels" 
        title={`${startingNumber}-   What are affinities-hotels?`}
        className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
        titleClassName="text-xl font-medium"
        preventScroll={preventScroll}
      >
        <div className="space-y-2 py-6">
          <CollapsibleMenuItem 
            title="EXAMPLE 1: ART HOTELS" 
            titleClassName="font-medium"
            defaultOpen={false}
            preventScroll={preventScroll}
          >
            <div className="space-y-4 pl-4 py-2">
              <p className="text-sm">- Imagine a hotel where everyone is passionate about art.</p>
              <p className="text-sm">- Some guests are professional artists, others are just enthusiasts.</p>
              <p className="text-sm">- They sketch together in the lobby. Visit exhibitions together. Share techniques.</p>
              <p className="text-sm">- Some even collaborate on projects during their stay.</p>
              <p className="text-sm">- No awkward conversations—just instant connection through shared passion.</p>
            </div>
          </CollapsibleMenuItem>
          
          <CollapsibleMenuItem 
            title="EXAMPLE 2: FOODIE HOTELS" 
            titleClassName="font-medium"
            preventScroll={preventScroll}
          >
            <div className="space-y-4 pl-4 py-2">
              <p className="text-sm">- A hotel where guests bond over their love of cuisine.</p>
              <p className="text-sm">- They share recommendations for local restaurants. Some cook together in communal kitchens.</p>
              <p className="text-sm">- They take cooking classes or food tours as a group.</p>
              <p className="text-sm">- Food is more than sustenance—it's the centerpiece of meaningful connections.</p>
            </div>
          </CollapsibleMenuItem>
          
          <CollapsibleMenuItem 
            title="EXAMPLE 3: PHOTOGRAPHY HOTELS" 
            titleClassName="font-medium"
            preventScroll={preventScroll}
          >
            <div className="space-y-4 pl-4 py-2">
              <p className="text-sm">- Every guest shares a passion for photography.</p>
              <p className="text-sm">- They go on photo walks together. Exchange editing tips.</p>
              <p className="text-sm">- Give each other feedback on their work.</p>
              <p className="text-sm">- Instead of typical tourist photos, they leave with stunning images and new friends who truly understand their passion.</p>
            </div>
          </CollapsibleMenuItem>
        </div>
      </AccordionMenuItem>
      
      {/* The importance section */}
      <AccordionMenuItem 
        value="importance" 
        title={`${startingNumber + 1}-   Why is this so important?`} 
        className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
        titleClassName="text-xl font-medium"
        preventScroll={preventScroll}
      >
        <div className="space-y-6 text-left py-6">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> People are tired of empty interactions</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> They want genuine connections based on shared interests</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Your hotel becomes more than accommodation—it becomes a community hub</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Guests spread the word: "This is where I finally found my people"</p>
        </div>
      </AccordionMenuItem>
      
      {/* The fixed stays section */}
      <AccordionMenuItem 
        value="fixed-stays" 
        title={`${startingNumber + 2}-   Fixed stays, not nightly rates`} 
        className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
        titleClassName="text-xl font-medium"
        preventScroll={preventScroll}
      >
        <div className="space-y-6 text-left py-6">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Our model: 8, 16, 24, or 32 day packages</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Fixed arrivals and departures (no random check-ins)</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> No gaps between stays. No losses</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Guests form tight bonds; some return together</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Extended stays; deeper connections</p>
        </div>
      </AccordionMenuItem>
      
      {/* The medium/long term section */}
      <AccordionMenuItem 
        value="not-only-short-term" 
        title={`${startingNumber + 3}-   Not just short term stays`} 
        className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
        titleClassName="text-xl font-medium"
        preventScroll={preventScroll}
      >
        <div className="space-y-6 text-left py-6">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Extend your guests' average stay from 2.5 days to weeks</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Fill entire weeks and months with guaranteed bookings</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Switch from unpredictable daily bookings to stable, extended stays</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Watch your occupancy rate reach new highs</p>
        </div>
      </AccordionMenuItem>
      
      {/* The 4 pillars section */}
      <AccordionMenuItem 
        value="four-pillars" 
        title={`${startingNumber + 4}-   This works on 4 pillars`} 
        className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
        titleClassName="text-xl font-medium"
        preventScroll={preventScroll}
      >
        <div className="space-y-6 text-left py-6">
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> <strong>1. Extended Stays:  </strong> 8 to 32 days (medium/long term)</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> <strong>2. Synchronized Arrivals:  </strong> Everyone checks in on the same day</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> <strong>3. Affinity Grouping:  </strong> Guests share common interests</p>
          <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> <strong>4. Community Living:  </strong> Shared experiences create real connections</p>
        </div>
      </AccordionMenuItem>
    </>
  );
}
