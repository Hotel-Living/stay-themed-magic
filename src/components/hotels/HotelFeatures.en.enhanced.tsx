import { Calendar, DollarSign, Users } from "lucide-react";
import { useState, useEffect } from "react";

export function HotelFeaturesENEnhanced() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Staggered feature reveal
  useEffect(() => {
    [0, 1, 2].forEach((index) => {
      setTimeout(() => {
        setVisibleFeatures(prev => [...prev, index]);
      }, index * 150 + 1200); // Start after cards
    });
  }, []);

  const features = [
    {
      icon: Calendar,
      title: "Full Occupancy",
      description: "Keep your hotel fully booked year-round with our dedicated community of long-stay guests.",
      color: "from-emerald-400 to-cyan-400"
    },
    {
      icon: DollarSign,
      title: "Higher Revenue", 
      description: "Generate more income with longer stays and reduced operational costs through fewer turnovers.",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: Users,
      title: "Global Network",
      description: "Join a worldwide network of hotels catering to affinity travelers and digital nomads.",
      color: "from-purple-400 to-pink-400"
    }
  ];

  return (
    <div className="mt-16 text-center">
      <h2 className={`
        text-2xl font-bold mb-8 bg-gradient-to-r from-[#ebd4ee] to-[#f5ecf6] bg-clip-text text-transparent
        transition-all duration-700 ease-out hover:scale-105
        ${visibleFeatures.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}>
        Why Join Hotel Living?
      </h2>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`
              glass-card p-6 rounded-xl bg-gradient-to-b from-[#6a0a95] to-[#460F54] 
              border border-fuchsia-400/30 shadow-lg cursor-pointer group
              transform transition-all duration-500 ease-out
              ${visibleFeatures.includes(index) 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-8 opacity-0 scale-95'
              }
              ${hoveredFeature === index 
                ? 'scale-110 shadow-[0_0_25px_rgba(217,70,239,0.5)] -translate-y-2' 
                : 'hover:scale-105 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]'
              }
            `}
            onMouseEnter={() => setHoveredFeature(index)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            {/* Animated gradient overlay */}
            <div className={`
              absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 
              transition-opacity duration-500 rounded-xl ${feature.color}
            `} />
            
            <div className={`
              w-16 h-16 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-4 
              border border-fuchsia-400/30 relative overflow-hidden
              transition-all duration-300
              ${hoveredFeature === index ? 'scale-110 rotate-12 shadow-lg' : ''}
            `}>
              {/* Icon background shimmer */}
              <div className={`
                absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                transform transition-transform duration-1000
                ${hoveredFeature === index ? 'translate-x-full' : '-translate-x-full'}
              `} />
              
              <feature.icon className={`
                h-8 w-8 text-fuchsia-300 relative z-10 transition-all duration-300
                ${hoveredFeature === index ? 'scale-110' : ''}
              `} />
            </div>
            <h3 className={`
              text-lg font-semibold mb-3 text-[#f5ecf6] transition-all duration-300
              ${hoveredFeature === index ? 'tracking-wider scale-105' : ''}
            `}>
              {feature.title}
            </h3>
            <p className={`
              text-sm text-[#f0e3f2]/90 transition-all duration-300
              ${hoveredFeature === index ? 'text-[#f0e3f2] scale-105' : ''}
            `}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}