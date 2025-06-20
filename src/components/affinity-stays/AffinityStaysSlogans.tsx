
import { useTranslation } from "@/hooks/useTranslation";

export function AffinityStaysSlogans() {
  const { t } = useTranslation();
  
  return <>
      {/* Main header and quote section */}
      <div className="space-y-4 mb-8">
        <div className="text-center mb-6">
          {/* Updated Affinity Stays logo */}
          <div className="flex justify-center mb-2 my-[19px] py-[23px]">
            <img src="/lovable-uploads/0143058c-8fff-4da1-92a4-c00ad1b52595.png" alt="Affinity Stays Logo" style={{
            width: '250px',
            height: 'auto'
          }} />
          </div>
          
          {/* "Created by" text and Hotel-Living logo were already removed */}
        </div>
        
        {/* Quote section - text made 10% smaller */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <p className="text-white italic text-lg font-semibold py-0">
            "{t('affinity.howardSchultzQuote')}"
          </p>
          <p className="text-right text-white mt-2 mr-12 text-base font-bold">{t('affinity.howardSchultzAuthor')}</p>
        </div>
        
        {/* Slogans - updated to match FAQ page styling */}
        <div className="space-y-5 py-4 mt-12 mb-8 max-w-3xl mx-auto flex flex-col items-center">
          <div className="bg-[#FFC700] py-2 px-4 text-center my-[12px] rounded-xl">
            <p className="text-[#8017B0] text-xl font-bold">{t('affinity.slogans.notJustStay')}</p>
          </div>
          <div className="bg-[#FFC700] py-2 px-4 text-center my-[12px] rounded-xl">
            <p className="text-[#8017B0] text-xl font-bold">{t('affinity.slogans.meetShareBelong')}</p>
          </div>
          <div className="bg-[#FFC700] py-2 px-4 text-center my-[12px] rounded-xl">
            <p className="text-[#8017B0] text-xl font-bold">{t('affinity.slogans.stayWithThoseWhoGetYou')}</p>
          </div>
          <div className="bg-[#FFC700] py-2 px-4 text-center my-[12px] rounded-xl">
            <p className="text-[#8017B0] text-xl font-bold">{t('affinity.slogans.tiredOfRandom')}</p>
          </div>
          <div className="bg-[#FFC700] py-2 px-4 text-center my-[12px] rounded-xl">
            <p className="text-[#8017B0] text-xl font-bold">{t('affinity.slogans.stayAndConnect')}</p>
          </div>
        </div>
      </div>
    </>;
}
