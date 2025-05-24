import { TrendingUp } from "lucide-react";
export function HotelSlogans() {
  return <>
      {/* Main slogans */}
      <div className="space-y-3 animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-white border-b border-yellow-300/40 pb-4 max-w-xl mx-auto shadow-sm">
          <span className="bg-gradient-to-r from-[#FEF7CD] to-white bg-clip-text text-transparent px-[8px] text-center text-[#8017B0] animate-text-slow uppercase">GIVE US YOUR EMPTY ROOMS,<br />WE'LL TURN THEM INTO GOLD</span>
        </h1>
        
        <div className="space-y-2 bg-[#460F54]/40 backdrop-blur-sm border border-fuchsia-400/20 rounded-xl mx-0 px-0 py-[13px] my-[17px]">
          <p className="text-center text-[#8017B0] font-bold animate-text-slow py-[12px] text-xl">Your hotel, always full. All year long</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[11px] my-[17px]">100% occupancy. Every single day</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[16px]">Multiply your profits dramatically</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px]">Longer, more profitable stays</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px]">Just one weekday for all check-ins/outs</p>
          <p className="text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[17px] text-lg">Rental apartments? Let's take our customers back!</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[18px]">Great expenses reduction</p>
          <p className="text-xl text-center text-[#8017B0] font-bold animate-text-slow py-[12px] my-[16px]">Year-round staff consistency</p>
        </div>
      </div>
    </>;
}