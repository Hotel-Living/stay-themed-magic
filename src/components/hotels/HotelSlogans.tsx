
import React from 'react';

export function HotelSlogans() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Main headline */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight">
        <span className="block bg-gradient-to-r from-fuchsia-300 via-white to-fuchsia-300 bg-clip-text text-transparent pb-2">
          Hotel Living Reimagined
        </span>
      </h1>
      
      {/* Subtitle with gradient */}
      <h2 className="text-xl md:text-2xl font-medium text-center text-white/90 max-w-3xl mx-auto leading-relaxed">
        Experience the freedom of hotel living with curated properties designed for
        <span className="bg-gradient-to-r from-[#FFF600] via-[#FFC500] to-[#FFF600] bg-clip-text text-transparent font-semibold"> long-term stays</span> and
        <span className="bg-gradient-to-r from-[#FFF600] via-[#FFC500] to-[#FFF600] bg-clip-text text-transparent font-semibold"> themed experiences</span>.
      </h2>
      
      {/* Feature badges */}
      <div className="flex flex-wrap justify-center gap-3 py-4">
        {['No Household Chores', 'Like-Minded People', 'Enhanced Social Life', 'Themed Experiences'].map((feature, i) => (
          <span 
            key={i} 
            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-fuchsia-400/20 text-white font-medium text-sm"
          >
            {feature}
          </span>
        ))}
      </div>
      
      {/* Call to action */}
      <div className="text-center pt-4">
        <a 
          href="#explore" 
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white font-medium transition-all hover:from-fuchsia-700 hover:to-fuchsia-800 hover:shadow-lg hover:shadow-fuchsia-500/20"
        >
          Explore Hotels
        </a>
      </div>
    </div>
  );
}
