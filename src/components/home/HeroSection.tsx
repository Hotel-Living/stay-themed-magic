
import { Check } from "lucide-react";

export function HeroSection() {
  return <section className="py-4 px-4 overflow-hidden">
      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <img 
          src="/lovable-uploads/914f59f1-db2c-4340-8d61-340368c895ca.png" 
          alt="Live in Hotels - Boost your Life" 
          className="mx-auto mb-10 max-w-full"
        />
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5 mb-1">
          <div className="space-y-0.25">
            {["Get rid of household chores", "Select hotels upon favourite themes"].map((slogan, index) => <div key={index} className="flex items-center gap-2 p-1 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-left font-medium text-sm">{slogan}</p>
              </div>)}
          </div>
          
          <div className="space-y-0.25">
            {["Boost your social life", "Find and enjoy your favorite people"].map((slogan, index) => <div key={index} className="flex items-center gap-2 p-1 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-left font-medium text-sm">{slogan}</p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}
