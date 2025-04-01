
import { Check } from "lucide-react";

export function HeroSection() {
  return <section className="py-0 px-4 overflow-hidden pt-4 w-full">
      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <div className="pt-4 mb-0.5">
          {/* New 1950s style neon sign slogan - 20% smaller with reduced padding */}
          <div className="flex justify-center mb-1">
            <div className="relative w-[30%] mx-auto">
              <div className="rounded-lg px-2 py-1 border-2 border-[#D946EF] bg-black/30 backdrop-blur-sm shadow-[0_0_15px_rgba(217,70,239,0.7)]">
                <p className="text-lg sm:text-xl md:text-2xl font-bold animate-pulse-glow truncate max-w-full text-center"
                   style={{
                     color: "#fff",
                     textShadow: "0 0 7px #D946EF, 0 0 10px #D946EF, 0 0 21px #D946EF",
                   }}>
                  The Future is Here!
                </p>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-0.25 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            <span className="bg-gradient-to-r from-[#FFF600] via-[#FFF600] to-[#FFF600] bg-[length:200%_auto] animate-text-slow bg-clip-text text-transparent">LIVE IN HOTELS</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            <span className="bg-gradient-to-r from-[#FFF600] via-[#FFF600] to-[#FFF600] bg-[length:200%_auto] animate-text-slow bg-clip-text text-transparent">Boost your Life!</span>
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.25 mb-0.5 bg-white/15 rounded-lg backdrop-blur-sm p-2">
          <div className="space-y-0.125">
            {["Get rid of household chores!", "Select hotels upon favourite themes!"].map((slogan, index) => <div key={index} className="flex items-center gap-2 p-0.5 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-left font-bold text-sm sm:text-lg text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                  {slogan}
                </p>
              </div>)}
          </div>
          
          <div className="space-y-0.125">
            {["Boost your social life!", "Find and enjoy your favorite people!"].map((slogan, index) => <div key={index} className="flex items-center gap-2 p-0.5 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-left font-bold text-sm sm:text-lg text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                  {slogan}
                </p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}
