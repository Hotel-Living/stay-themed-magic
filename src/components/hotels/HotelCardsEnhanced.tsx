import { useNavigate } from "react-router-dom";
import { Building, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function HotelCardsEnhanced() {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Staggered card reveal
  useEffect(() => {
    [0, 1].forEach((index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 200 + 800); // Start after slogans
    });
  }, []);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const cardData = [
    {
      title: "HOTEL ASOCIADO",
      buttonText: "LOGIN",
      path: "/login?tab=hotel",
      icon: Building
    },
    {
      title: "REGISTRO", 
      buttonText: "HOTEL",
      path: "/unirse",
      icon: Building
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
      {cardData.map((card, index) => (
        <Card 
          key={index}
          className={`
            glass-card-hover rounded-xl overflow-hidden bg-gradient-to-b from-[#6a0a95] to-[#460F54] 
            cursor-pointer border border-fuchsia-400/30 relative
            transform transition-all duration-500 ease-out
            ${visibleCards.includes(index) 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
            }
            ${hoveredCard === index 
              ? 'scale-110 shadow-[0_0_25px_rgba(217,70,239,0.5)] -translate-y-2' 
              : 'hover:scale-105 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]'
            }
          `}
          onClick={() => handleCardClick(card.path)}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400/0 via-purple-400/0 to-pink-400/0 hover:from-fuchsia-400/10 hover:via-purple-400/5 hover:to-pink-400/10 transition-all duration-500 rounded-xl" />
          
          <CardHeader className="pb-4 bg-gradient-to-b from-[#6d0591] to-[#5D0478] relative overflow-hidden">
            {/* Animated background shimmer */}
            <div className={`
              absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
              transform transition-transform duration-1000
              ${hoveredCard === index ? 'translate-x-full' : '-translate-x-full'}
            `} />
            
            <div className={`
              w-16 h-16 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-3 
              border border-fuchsia-400/30 shadow-inner relative
              transition-all duration-300
              ${hoveredCard === index ? 'scale-110 rotate-12 shadow-lg' : ''}
            `}>
              <card.icon className={`
                h-8 w-8 text-fuchsia-300 transition-all duration-300
                ${hoveredCard === index ? 'scale-110' : ''}
              `} />
            </div>
            <CardTitle className={`
              text-xl text-center text-[#f5ecf6] transition-all duration-300
              ${hoveredCard === index ? 'tracking-wider' : ''}
            `}>
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center pb-6 relative">
            <Button className={`
              text-white font-medium bg-[#860493] hover:bg-[#460F54] 
              border border-fuchsia-400/30 shadow-md transition-all duration-300
              ${hoveredCard === index 
                ? 'scale-105 shadow-xl bg-[#460F54] border-fuchsia-300' 
                : 'hover:shadow-xl'
              }
            `}>
              {card.buttonText}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}