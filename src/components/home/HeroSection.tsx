
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroSection() {
  const isMobile = useIsMobile();
  
  // Common slogans data to avoid duplication
  const slogans = [
    "Get rid of household chores!",
    "Select hotels based on favourite themes!",
    "Boost your social life!",
    "Meet and enjoy like-minded people!"
  ];
  
  // Render a single slogan item consistently
  const renderSlogan = (slogan: string, index: number) => (
    <div 
      key={index} 
      className={`flex items-center ${isMobile ? "gap-2 pl-1 mb-3" : "gap-2"} p-0.5 rounded-lg`} 
      style={{ backgroundColor: "#FFF9B8" }}
    >
      <div className="w-5 h-5 rounded-full bg-[#A2169A] flex-shrink-0 flex items-center justify-center">
        <Check className="w-3 h-3 text-white" />
      </div>
      <p 
        className={`text-left font-bold ${isMobile ? "text-lg whitespace-normal" : "text-sm sm:text-base"} text-[#A2169A]`}
        style={{ fontFamily: "'Franklin Gothic Medium Condensed', 'Arial Narrow', sans-serif" }}
      >
        {slogan}
      </p>
    </div>
  );
  
  return <section className="py-0 px-4 overflow-hidden pt-2 w-full">
      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <div className={`pt-2 ${isMobile ? "mb-3" : "mb-0.25"}`}>
          {/* New 1950s style neon sign slogan - with adjusted sizing for mobile (30% bigger) and 10% wider */}
          {/* Increased spacing above by 50% on mobile and increased container size by 20% */}
          <div className={`flex justify-center ${isMobile ? "mb-12 mt-9" : "mb-6 mt-3"}`}>
            <div className={`relative ${isMobile ? "w-[76.35%]" : "w-[16.72%]"} mx-auto`}>
              <div className="rounded-lg px-2 py-0.5 border-2 border-[#D946EF] bg-[#FFF9B8] backdrop-blur-sm shadow-[0_0_15px_rgba(217,70,239,0.7)]">
                <p className={`${isMobile ? "text-base" : "text-2xs sm:text-xs md:text-sm"} font-bold max-w-full text-center whitespace-nowrap`}
                   style={{
                     color: "#860493",
                   }}>
                  The Living Revolution
                </p>
              </div>
            </div>
          </div>
          
          {/* 20% smaller text for "LIVE IN HOTELS" on mobile with 40% reduced vertical space */}
          <h1 className={`${isMobile ? "text-[43.2px] leading-[1.1]" : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"} font-bold mb-0.25 bg-size-200 animate-text bg-gradient-to-r from-[#ffff00] via-[#D4AF37] to-[#ffff00] bg-clip-text text-transparent`}>
            LIVE IN HOTELS
          </h1>
          {/* 20% smaller text for "Boost Your Life!" on mobile */}
          <h2 className={`${isMobile ? "text-3xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"} font-semibold mb-6 bg-size-200 animate-text bg-gradient-to-r from-[#ffff00] via-[#D4AF37] to-[#ffff00] bg-clip-text text-transparent`}>
            Boost Your Life!
          </h2>
        </div>
        
        {/* Changed the container background color to #FFF9B8 */}
        {/* Doubled the spacing below on mobile (from mb-6 to mb-12) */}
        <div className={`max-w-2xl mx-auto bg-[#FFF9B8] rounded-lg backdrop-blur-sm p-1 ${isMobile ? "mb-12 mt-3 px-0 w-[90%]" : "mb-3 w-[80%]"}`}>
          {/* For mobile: render all slogans in a single column */}
          {isMobile ? (
            <div className="py-2.5 pl-0">
              {slogans.map(renderSlogan)}
            </div>
          ) : (
            // For desktop: maintain the two-column grid layout
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.125">
              <div className="space-y-0.125 py-1.5">
                {slogans.slice(0, 2).map(renderSlogan)}
              </div>
              <div className="space-y-0.125 py-1.5">
                {slogans.slice(2, 4).map(renderSlogan)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>;
}
