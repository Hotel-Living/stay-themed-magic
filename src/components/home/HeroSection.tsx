
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroSection() {
  const isMobile = useIsMobile();

  // Common slogans data to avoid duplication
  const slogans = ["Get rid of household chores!", "Select hotels based on favourite themes!", "Boost your social life!", "Meet and enjoy like-minded people!"];

  // Render a single slogan item consistently
  const renderSlogan = (slogan: string, index: number) => <div key={index} className={`flex items-center ${isMobile ? "gap-2 pl-1 mb-3" : "gap-2"} p-0.5 rounded-lg`} style={{
    backgroundColor: "transparent"
  }}>
      <div className="w-5 h-5 rounded-full bg-[#A2169A] flex-shrink-0 flex items-center justify-center">
        <Check className="w-3 h-3 text-white" />
      </div>
      <p className={`text-left font-bold ${isMobile ? "text-lg whitespace-normal" : "text-sm sm:text-base"} text-[#FFF9B0]`} style={{
      fontFamily: "'Franklin Gothic Medium Condensed', 'Arial Narrow', sans-serif"
    }}>
        {slogan}
      </p>
    </div>;

  return <section className="py-0 px-4 overflow-hidden pt-2 w-full">
      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <div className={`pt-2 ${isMobile ? "mb-3" : "mb-0.25"}`}>
          {/* New 1950s style neon sign slogan - with adjusted spacing: 50% bigger above, 50% smaller below */}
          <div className={`flex justify-center ${isMobile ? "mb-6 mt-14" : "mb-3 mt-5"}`}>
            <div className={`relative ${isMobile ? "w-[85%]" : "w-[26%]"} mx-auto`}>
              {/* Blue glow effect background - updated to #85BCFF */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#85BCFF] via-[#85BCFF] to-purple-600 rounded-lg blur-xl opacity-75"></div>
              {/* Deep purple background */}
              <div className="relative rounded-lg border-2 border-[#D946EF] bg-[#8017B0] backdrop-blur-sm shadow-[0_0_15px_rgba(133,188,255,0.7)] px-[11px] my-0 py-0">
                <p className={`${isMobile ? "text-base" : "text-2xs sm:text-xs md:text-sm"} font-bold max-w-full text-center whitespace-nowrap`} style={{
                color: "#FFF9B0"
              }}>The Revolution Has Come</p>
              </div>
            </div>
          </div>
          
          {/* LIVE IN HOTELS with blue glow effect only - updated to #85BCFF */}
          <h1 className={`${isMobile ? "text-[43.2px] leading-[1.1]" : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"} font-bold mb-2 bg-size-200 animate-text bg-gradient-to-r from-[#ffff00] via-[#D4AF37] to-[#ffff00] bg-clip-text text-transparent`} style={{
            filter: 'drop-shadow(0 0 10px rgba(133, 188, 255, 0.8)) drop-shadow(0 0 20px rgba(133, 188, 255, 0.6)) drop-shadow(0 0 30px rgba(133, 188, 255, 0.4))'
          }}>
            LIVE IN HOTELS
          </h1>

          {/* Boost Your Life! with blue glow effect only - updated to #85BCFF */}
          <h2 className={`${isMobile ? "text-3xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"} font-semibold mb-6 bg-size-200 animate-text bg-gradient-to-r from-[#ffff00] via-[#D4AF37] to-[#ffff00] bg-clip-text text-transparent`} style={{
            filter: 'drop-shadow(0 0 10px rgba(133, 188, 255, 0.8)) drop-shadow(0 0 20px rgba(133, 188, 255, 0.6)) drop-shadow(0 0 30px rgba(133, 188, 255, 0.4))'
          }}>
            Boost Your Life!
          </h2>
        </div>
        
        {/* Updated slogan container with purple background and blue glow effect - updated to #85BCFF */}
        {/* Doubled the spacing below on mobile (from mb-6 to mb-12) */}
        <div className={`max-w-2xl mx-auto rounded-lg backdrop-blur-sm p-1 ${isMobile ? "mb-12 mt-3 px-0 w-[90%]" : "mb-3 w-[80%]"} relative`}>
          {/* Blue glow effect background - updated to #85BCFF */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#85BCFF] via-[#85BCFF] to-purple-600 rounded-lg blur-xl opacity-75"></div>
          {/* Purple background */}
          <div className="relative bg-[#8017B0] rounded-lg">
            {/* For mobile: render all slogans in a single column */}
            {isMobile ? <div className="py-2.5 pl-0">
                {slogans.map(renderSlogan)}
              </div> :
          // For desktop: maintain the two-column grid layout
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.125">
                <div className="space-y-0.125 py-1.5">
                  {slogans.slice(0, 2).map(renderSlogan)}
                </div>
                <div className="space-y-0.125 py-1.5">
                  {slogans.slice(2, 4).map(renderSlogan)}
                </div>
              </div>}
          </div>
        </div>
      </div>
    </section>;
}
