import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroSection() {
  const isMobile = useIsMobile();
  
  return <section className="py-0 px-4 overflow-hidden pt-4 w-full">
      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <div className={`pt-4 ${isMobile ? "mb-6" : "mb-0.5"}`}>
          {/* New 1950s style neon sign slogan - with adjusted sizing for mobile and 10% wider */}
          <div className={`flex justify-center ${isMobile ? "mb-8" : "mb-1"}`}>
            <div className={`relative ${isMobile ? "w-[51.04%]" : "w-[16.72%]"} mx-auto`}>
              <div className="rounded-lg px-2 py-1 border-2 border-[#D946EF] bg-white backdrop-blur-sm shadow-[0_0_15px_rgba(217,70,239,0.7)]">
                <p className={`${isMobile ? "text-xs" : "text-2xs sm:text-xs md:text-sm"} font-bold max-w-full text-center whitespace-nowrap`}
                   style={{
                     color: "#860493",
                   }}>
                  The Future is Here!
                </p>
              </div>
            </div>
          </div>
          
          {/* Keeping existing color for "LIVE IN HOTELS" */}
          <h1 className={`${isMobile ? "text-[54px]" : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"} font-bold mb-0.25 text-[#FFEF00] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
            LIVE IN HOTELS
          </h1>
          {/* Keeping existing color for "Boost Your Life!" */}
          <h2 className={`${isMobile ? "text-4xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"} font-semibold mb-2 text-[#FFEF00] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
            Boost Your Life!
          </h2>
        </div>
        
        <div className={`max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.25 ${isMobile ? "mb-6 mt-6 px-0 w-[95%]" : "mb-0.5"} bg-white/70 rounded-lg backdrop-blur-sm p-2`}>
          {/* Keeping existing vertical space above and below slogans */}
          <div className={`${isMobile ? "space-y-3 pl-0 py-6" : "space-y-0.125 py-3"}`}>
            {/* Keeping existing text color */}
            {["Get rid of household chores!", "Select hotels based on favourite themes!"].map((slogan, index) => <div key={index} className={`flex items-center ${isMobile ? "gap-2 pl-1" : "gap-2"} p-0.5 rounded-lg`}>
                <div className="w-5 h-5 rounded-full bg-[#A2169A] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className={`text-left font-bold ${isMobile ? "text-base" : "text-sm sm:text-base"} text-[#A2169A] whitespace-nowrap`}>
                  {slogan}
                </p>
              </div>)}
          </div>
          
          <div className={`${isMobile ? "space-y-3 pl-0 py-6" : "space-y-0.125 py-3"}`}>
            {["Boost your social life!", "Meet and enjoy like-minded people!"].map((slogan, index) => <div key={index} className={`flex items-center ${isMobile ? "gap-2 pl-1" : "gap-2"} p-0.5 rounded-lg`}>
                <div className="w-5 h-5 rounded-full bg-[#A2169A] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className={`text-left font-bold ${isMobile ? "text-base" : "text-sm sm:text-base"} text-[#A2169A] whitespace-nowrap`}>
                  {slogan}
                </p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}
