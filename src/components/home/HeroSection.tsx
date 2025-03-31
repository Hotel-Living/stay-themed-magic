
import { Check } from "lucide-react";

export function HeroSection() {
  return <section className="py-0 px-4 overflow-hidden pt-6 w-full">
      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <div className="pt-6 mb-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-1 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            <span className="bg-gradient-to-r from-[#FFF701] via-[#FFDF00] to-[#FFF701] bg-[length:200%_auto] animate-text-slow bg-clip-text text-transparent">Live in Hotels</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            <span className="bg-gradient-to-r from-[#FFF701] via-[#FFDF00] to-[#FFF701] bg-[length:200%_auto] animate-text-slow bg-clip-text text-transparent">Boost your Life!</span>
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.25 mb-0.5 bg-white/15 rounded-lg backdrop-blur-sm p-2">
          <div className="space-y-0.125">
            {["Get rid of household chores", "Select hotels upon favourite themes"].map((slogan, index) => <div key={index} className="flex items-center gap-2 p-0.5 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-left font-bold text-sm sm:text-lg text-[#FFEF9F] drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                  {slogan}
                </p>
              </div>)}
          </div>
          
          <div className="space-y-0.125">
            {["Boost your social life", "Find and enjoy your favorite people"].map((slogan, index) => <div key={index} className="flex items-center gap-2 p-0.5 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-left font-bold text-sm sm:text-lg text-[#FFEF9F] drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                  {slogan}
                </p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}
