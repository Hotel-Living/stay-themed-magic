
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "@/hooks/useTranslation";

export function HotelSlogans() {
  const isMobile = useIsMobile();
  const { t } = useTranslation('hotels');

  const slogans = [
    t('slogans.alwaysFull'),
    t('slogans.fullOccupancy'), 
    t('slogans.multiplyProfits'),
    t('slogans.longerStays'),
    t('slogans.fixedDay'),
    t('slogans.recoverClients'),
    t('slogans.reducedCosts'),
    t('slogans.staffStability')
  ];

  return (
    <div className="text-center mb-8">
      <h1 className={`font-bold mb-8 text-[#FFF9B0] ${isMobile ? "text-2xl" : "text-4xl"}`}>
        {t('slogans.mainTitle')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {slogans.map((slogan, index) => (
          <div 
            key={index}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            {slogan}
          </div>
        ))}
      </div>
    </div>
  );
}
