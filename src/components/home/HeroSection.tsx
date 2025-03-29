
import { Check } from "lucide-react";
export function HeroSection() {
  return <section className="py-4 px-4 overflow-hidden">
      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <p style={{
        background: 'linear-gradient(-45deg, #B1900F, #F7F700)',
        backgroundSize: '200% 200%',
        animation: 'text-shine 2s linear infinite',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }} className="md:text-3xl mb-10 max-w-5xl mx-auto tracking-tight font-bold text-4xl">
          Live in Hotels and Boost your Life
        </p>
        
        <h1 style={{
        background: 'linear-gradient(-45deg, #B1900F, #F7F700)',
        backgroundSize: '200% 200%',
        animation: 'text-shine 2s linear infinite',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }} className="md:text-7xl font-bold mb-2 tracking-tight text-4xl">
          Live the Future Life
        </h1>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5 mb-2">
          <div className="space-y-0.5">
            {["Get rid of household chores", "Select hotels upon favourite themes"].map((slogan, index) => <div key={index} className="flex items-center gap-2 p-2 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-left font-medium">{slogan}</p>
              </div>)}
          </div>
          
          <div className="space-y-0.5">
            {["Boost your social life", "Find and enjoy your favorite people"].map((slogan, index) => <div key={index} className="flex items-center gap-2 p-2 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-left font-medium">{slogan}</p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}
