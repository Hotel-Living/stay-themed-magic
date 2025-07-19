
import { useTranslation } from "@/hooks/useTranslation";

export function AffinityStaysSlogans() {
  const { t } = useTranslation('affinity');
  
  return <>
      {/* Main header and quote section */}
      <div className="space-y-4 mb-8">
        <div className="text-center mb-6">
          {/* Dynamic multilingual title replacing the image */}
          <div className="flex justify-center mb-2 my-[19px] py-[23px]">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center leading-tight tracking-tight">
              {t('affinity.affinityStaysTitle')}
            </h1>
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
