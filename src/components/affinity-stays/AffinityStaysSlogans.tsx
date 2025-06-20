
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "@/hooks/useTranslation";

export function AffinityStaysSlogans() {
  const isMobile = useIsMobile();
  const { t } = useTranslation('affinity');

  const slogans = [
    t('slogans.notJustStay'),
    t('slogans.meetShareBelong'),
    t('slogans.stayWithThoseWhoGetYou'),
    t('slogans.tiredOfRandom'),
    t('slogans.stayAndConnect')
  ];

  return (
    <div className="text-center mb-8">
      <h1 className={`font-bold mb-8 text-[#FFF9B0] ${isMobile ? "text-2xl" : "text-4xl"}`}>
        {t('affinityStaysTitle')}
      </h1>
      
      <div className="mb-8">
        <blockquote className="text-xl italic text-[#FFF9B0] mb-4">
          "{t('howardSchultzQuote')}"
        </blockquote>
        <cite className="text-[#D4AF37]">- {t('howardSchultzAuthor')}</cite>
      </div>
      
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
