
import { TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function HotelSlogans() {
  const { t } = useTranslation();
  
  return <>
      {/* Main slogans */}
      <div className="space-y-3 animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-white border-b border-yellow-300/40 pb-4 max-w-xl mx-auto shadow-sm">
          <span className="bg-gradient-to-r from-[#FEF7CD] to-white bg-clip-text text-transparent px-[8px] text-center text-[#8017B0] animate-text-slow uppercase">{t('hotels.slogans.mainTitle')}</span>
        </h1>
        
        <div className="space-y-2 bg-[#460F54]/40 backdrop-blur-sm border border-fuchsia-400/20 rounded-xl mx-0 px-0 py-[13px] my-[17px]">
          <p className="text-center text-[#8017B0] font-bold animate-text-slow py-[12px] text-xl">{t('hotels.slogans.alwaysFull')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[11px] my-[17px]">{t('hotels.slogans.fullOccupancy')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[16px]">{t('hotels.slogans.multiplyProfits')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px]">{t('hotels.slogans.longerStays')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px]">{t('hotels.slogans.fixedDay')}</p>
          <p className="text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[17px] text-lg">{t('hotels.slogans.recoverClients')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px]">{t('hotels.slogans.reducedCosts')}</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[16px]">{t('hotels.slogans.staffStability')}</p>
        </div>
      </div>
    </>;
}
