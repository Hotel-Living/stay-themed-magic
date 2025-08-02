import { useTranslation } from "@/hooks/useTranslation";
export function AffinityStaysSlogans() {
  const {
    t
  } = useTranslation('affinity');
  return <>
      {/* Main header and quote section */}
      <div className="space-y-4 mb-8">
        <div className="text-center mb-6">
          {/* Dynamic multilingual title using exact WHY HOTEL-LIVING styling */}
          <div className="flex justify-center mb-2 my-[19px] py-[23px]">
            <div className="relative group w-fit">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#eedbf7] glow tracking-tight leading-tight bg-[#8017B0] py-2 px-8 rounded-lg inline-block relative">
                {t('affinity.affinityStaysTitle').toUpperCase()}
              </h1>
            </div>
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
        <div className="space-y-5 mt-12 mb-8 max-w-3xl mx-auto flex flex-col items-center py-0 my-[34px]">
          <div className="bg-[#FFC700] text-center rounded-xl my-[2px] px-[7px] py-[4px]">
            <p className="text-[#8017B0] text-xl font-bold">{t('affinity.slogans.notJustStay')}</p>
          </div>
          <div className="bg-[#FFC700] text-center rounded-xl my-[2px] py-[4px] px-[23px]">
            <p className="text-[#8017B0] text-xl font-bold">{t('affinity.slogans.meetShareBelong')}</p>
          </div>
          <div className="bg-[#FFC700] py-2 text-center rounded-xl px-[3px] my-[10px]">
            <p className="text-[#8017B0] text-xl font-bold">{t('affinity.slogans.stayWithThoseWhoGetYou')}</p>
          </div>
          <div className="bg-[#FFC700] text-center rounded-xl px-[7px] my-[2px] py-[4px]">
            <p className="text-[#8017B0] text-xl font-bold">{t('affinity.slogans.tiredOfRandom')}</p>
          </div>
          <div className="bg-[#FFC700] text-center rounded-xl py-[4px] my-[2px] px-[41px]">
            <p className="text-[#8017B0] text-xl font-bold">{t('affinity.slogans.stayAndConnect')}</p>
          </div>
        </div>
      </div>
    </>;
}