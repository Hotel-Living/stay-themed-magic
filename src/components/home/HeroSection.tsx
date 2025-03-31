
import { Check } from "lucide-react";
export function HeroSection() {
  return <section className="py-0 px-4 overflow-hidden pt-8">
      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <div className="pt-8 mb-2">
          <h1 className="text-6xl md:text-7xl font-bold mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            <span className="text-[#FFF701] animate-text-slow">Live in Hotels</span>
          </h1>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            <span className="text-[#FFF701] animate-text-slow">Boost your Life!</span>
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5 mb-1 bg-white/15 rounded-lg backdrop-blur-sm p-4">
          <div className="space-y-0.25">
            {["Get rid of household chores", "Select hotels upon favourite themes"].map((slogan, index) => <div key={index} className="flex items-center gap-2 p-1 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-left font-medium text-sm text-white">{slogan}</p>
              </div>)}
          </div>
          
          <div className="space-y-0.25">
            {["Boost your social life", "Find and enjoy your favorite people"].map((slogan, index) => <div key={index} className="flex items-center gap-2 p-1 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-left font-medium text-sm text-white">{slogan}</p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}
