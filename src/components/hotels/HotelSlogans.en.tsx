
import { useTranslation } from "@/hooks/useTranslation";

export function HotelSlogansEN() {
  const { t } = useTranslation();
  
  return <>
      {/* Main slogans */}
      <div className="space-y-3 animate-fade-in px-8">
        <h1 className="text-3xl font-bold text-center text-white border-b border-yellow-300/40 pb-4 max-w-xl mx-auto shadow-sm">
          <span className="bg-gradient-to-r from-[#FEF7CD] to-white bg-clip-text text-transparent px-[8px] text-center text-[#8017B0] animate-text-slow uppercase">{t('hotels.slogans.mainTitle')}</span>
        </h1>
        
        <div className="space-y-2 bg-[#460F54]/40 backdrop-blur-sm border border-fuchsia-400/20 rounded-xl mx-8 px-6 py-[13px] my-[17px]">
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[11px] my-[17px] px-4">{t('hotels.slogans.slogan2')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[16px] px-4">{t('hotels.slogans.slogan3')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] px-4">{t('hotels.slogans.slogan4')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px] px-4">{t('hotels.slogans.slogan5')}</p>
          <p className="text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[17px] text-xl px-4">{t('hotels.slogans.slogan6')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px] px-4">{t('hotels.slogans.slogan7')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[17px] px-4">{t('hotels.slogans.slogan8')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px] px-4">{t('hotels.slogans.slogan9')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[17px] px-4">{t('hotels.slogans.slogan10')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px] px-4">{t('hotels.slogans.slogan11')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[17px] px-4">{t('hotels.slogans.slogan12')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px] px-4">{t('hotels.slogans.slogan13')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[17px] px-4">{t('hotels.slogans.slogan14')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px] px-4">{t('hotels.slogans.slogan15')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[17px] px-4">{t('hotels.slogans.slogan16')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px] px-4">{t('hotels.slogans.slogan17')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[17px] px-4 whitespace-pre-line">{t('hotels.slogans.slogan18')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px] px-4">{t('hotels.slogans.slogan19')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[17px] px-4">{t('hotels.slogans.slogan20')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px] px-4 whitespace-pre-line">{t('hotels.slogans.slogan21')}</p>
        </div>
      </div>
    </>;
}
