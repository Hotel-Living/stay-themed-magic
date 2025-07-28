
import { useTranslation } from "@/hooks/useTranslation";

export function HotelSlogansEN() {
  const { t } = useTranslation('hotels');
  
  return <>
      {/* Main slogans */}
      <div className="space-y-3 animate-fade-in px-8">
        {/* Blue glow wrapper for main title */}
        <div className="relative group w-fit mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h1 className="relative text-3xl font-bold text-center text-white border-b border-yellow-300/40 pb-4 mx-auto shadow-sm whitespace-nowrap">
            <span className="bg-gradient-to-r from-[#FEF7CD] to-white bg-clip-text text-transparent px-[8px] text-center text-[#8017B0] animate-text-slow uppercase">{t('slogans.mainTitle')}</span>
          </h1>
        </div>
        
        {/* Blue glow wrapper for slogans block */}
        <div className="relative group mx-8">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative space-y-2 bg-[#460F54]/40 backdrop-blur-sm border border-fuchsia-400/20 rounded-xl px-6 py-[13px] my-[17px] transition-all duration-300 hover:bg-[#460F54]/60 hover:border-fuchsia-400/40">
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[11px] my-2 sm:my-[17px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>{t('slogans.slogan1')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[11px] my-2 sm:my-[17px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>{t('slogans.slogan2')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[16px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>{t('slogans.slogan3')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>{t('slogans.slogan4')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[18px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>{t('slogans.slogan5')}</p>
          <p className="text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[17px] text-base sm:text-lg md:text-xl px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.35s', animationFillMode: 'both' }}>{t('slogans.slogan6')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[18px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>{t('slogans.slogan7')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[17px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>{t('slogans.slogan8')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[18px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>{t('slogans.slogan9')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[17px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.55s', animationFillMode: 'both' }}>{t('slogans.slogan10')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[18px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>{t('slogans.slogan11')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[17px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.65s', animationFillMode: 'both' }}>{t('slogans.slogan12')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[18px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>{t('slogans.slogan13')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[17px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.75s', animationFillMode: 'both' }}>{t('slogans.slogan14')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[18px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>{t('slogans.slogan15')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[17px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.85s', animationFillMode: 'both' }}>{t('slogans.slogan16')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[18px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>{t('slogans.slogan17')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[17px] px-2 sm:px-4 whitespace-pre-line animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.95s', animationFillMode: 'both' }}>{t('slogans.slogan18')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[18px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '1s', animationFillMode: 'both' }}>{t('slogans.slogan19')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[17px] px-2 sm:px-4 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '1.05s', animationFillMode: 'both' }}>{t('slogans.slogan20')}</p>
          <p className="text-base sm:text-lg md:text-xl text-center text-[#8017B0] font-bold animate-text-slow py-2 sm:py-[12px] my-2 sm:my-[18px] px-2 sm:px-4 whitespace-pre-line animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '1.1s', animationFillMode: 'both' }}>{t('slogans.slogan21')}</p>
          </div>
        </div>
      </div>
    </>;
}
