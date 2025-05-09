
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroSection() {
  const isMobile = useIsMobile();
  
  return <section className="py-0 px-4 overflow-hidden pt-2 w-full">
      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <div className={`pt-2 ${isMobile ? "mb-3" : "mb-0.25"}`}>
          {/* New 1950s style neon sign slogan - with adjusted sizing for mobile (30% bigger) and 10% wider */}
          {/* Added triple vertical space above and below "The Future is Here!" */}
          <div className={`flex justify-center ${isMobile ? "mb-12 mt-6" : "mb-6 mt-3"}`}>
            <div className={`relative ${isMobile ? "w-[66.35%]" : "w-[16.72%]"} mx-auto`}>
              <div className="rounded-lg px-2 py-0.5 border-2 border-[#D946EF] bg-white backdrop-blur-sm shadow-[0_0_15px_rgba(217,70,239,0.7)]">
                <p className={`${isMobile ? "text-sm" : "text-2xs sm:text-xs md:text-sm"} font-bold max-w-full text-center whitespace-nowrap`}
                   style={{
                     color: "#860493",
                   }}>
                  The Future is Here!
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
        
        {/* Changed the container background color to #FFFBCC and made it narrower */}
        <div className={`max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.125 ${isMobile ? "mb-3 mt-3 px-0 w-[90%]" : "mb-3 w-[80%]"} bg-[#FFFBCC] rounded-lg backdrop-blur-sm p-1`}>
          {/* Adjusted to have equal spacing between slogans and reduced vertical padding by 50% */}
          <div className={`${isMobile ? "space-y-1.5 pl-0 py-2.5" : "space-y-0.125 py-1.5"}`}>
            {/* Changed background color to #FFF8A9 */}
            {["Get rid of household chores!", "Select hotels based on favourite themes!"].map((slogan, index) => <div key={index} className={`flex items-center ${isMobile ? "gap-2 pl-1" : "gap-2"} p-0.5 rounded-lg`} style={{ backgroundColor: "#FFF8A9" }}>
                <div className="w-5 h-5 rounded-full bg-[#A2169A] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className={`text-left font-bold ${isMobile ? "text-lg whitespace-normal" : "text-sm sm:text-base"} text-[#A2169A]`}
                   style={{ fontFamily: "'Franklin Gothic Medium Condensed', 'Arial Narrow', sans-serif" }}>
                  {slogan}
                </p>
              </div>)}
          </div>
          
          <div className={`${isMobile ? "space-y-1.5 pl-0 py-2.5" : "space-y-0.125 py-1.5"}`}>
            {/* Changed background color to #FFF8A9 */}
            {["Boost your social life!", "Meet and enjoy like-minded people!"].map((slogan, index) => <div key={index} className={`flex items-center ${isMobile ? "gap-2 pl-1" : "gap-2"} p-0.5 rounded-lg`} style={{ backgroundColor: "#FFF8A9" }}>
                <div className="w-5 h-5 rounded-full bg-[#A2169A] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className={`text-left font-bold ${isMobile ? "text-lg whitespace-normal" : "text-sm sm:text-base"} text-[#A2169A]`}
                   style={{ fontFamily: "'Franklin Gothic Medium Condensed', 'Arial Narrow', sans-serif" }}>
                  {slogan}
                </p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}
