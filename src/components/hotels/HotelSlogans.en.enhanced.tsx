import { useTranslation } from "@/hooks/useTranslation";
import { useState, useEffect } from "react";

export function HotelSlogansENEnhanced() {
  const { t } = useTranslation('hotels');
  const [visibleSlogans, setVisibleSlogans] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Staggered animation for slogans
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Reveal slogans in batches for smoother performance
      const batches = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11], [12, 13, 14], [15, 16, 17], [18, 19, 20]
      ];
      
      batches.forEach((batch, batchIndex) => {
        setTimeout(() => {
          setVisibleSlogans(prev => [...prev, ...batch]);
        }, batchIndex * 150);
      });
    }
  }, [isVisible]);

  const slogans = [
    t('slogans.slogan1'), t('slogans.slogan2'), t('slogans.slogan3'), t('slogans.slogan4'),
    t('slogans.slogan5'), t('slogans.slogan6'), t('slogans.slogan7'), t('slogans.slogan8'),
    t('slogans.slogan9'), t('slogans.slogan10'), t('slogans.slogan11'), t('slogans.slogan12'),
    t('slogans.slogan13'), t('slogans.slogan14'), t('slogans.slogan15'), t('slogans.slogan16'),
    t('slogans.slogan17'), t('slogans.slogan18'), t('slogans.slogan19'), t('slogans.slogan20'),
    t('slogans.slogan21')
  ];

  return (
    <>
      {/* Main slogans */}
      <div className="space-y-3 px-8">
        {/* Enhanced main title with breathing effect */}
        <div 
          className={`
            relative group w-fit mx-auto transition-all duration-1000 ease-out
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <h1 className="relative text-3xl font-bold text-center text-white border-b border-yellow-300/40 pb-4 mx-auto shadow-sm whitespace-nowrap hover:scale-[1.02] transition-transform duration-300">
            <span className="bg-gradient-to-r from-[#FEF7CD] to-white bg-clip-text text-transparent px-[8px] text-center text-[#8017B0] animate-text-slow uppercase">
              {t('slogans.mainTitle')}
            </span>
          </h1>
        </div>
        
        {/* Enhanced slogans block with staggered animations */}
        <div 
          className={`
            relative group mx-8 transition-all duration-1000 ease-out
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
          `}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <div className="relative space-y-2 bg-[#460F54]/40 backdrop-blur-sm border border-fuchsia-400/20 rounded-xl px-6 py-[13px] my-[17px] hover:bg-[#460F54]/60 transition-colors duration-300 group">
            {slogans.map((slogan, index) => (
              <p 
                key={index}
                className={`
                  text-xl text-center text-[#8017B0] font-bold py-[11px] my-[17px] px-4
                  transition-all duration-500 ease-out hover:scale-[1.02] hover:text-[#9a1bb8]
                  ${index === 17 || index === 20 ? 'whitespace-pre-line' : ''}
                  ${visibleSlogans.includes(index) 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-4 opacity-0'
                  }
                `}
                style={{
                  transitionDelay: `${Math.floor(index / 3) * 150 + 600}ms`
                }}
              >
                {slogan}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}