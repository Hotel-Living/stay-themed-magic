
import { TrendingUp } from "lucide-react";

export function HotelSlogans() {
  return (
    <>
      {/* Main slogans */}
      <div className="space-y-6 mb-12 animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-white border-b border-yellow-300/40 pb-4 max-w-xl mx-auto shadow-sm">
          <span className="bg-gradient-to-r from-[#FEF7CD] to-white bg-clip-text text-transparent">
            Stop losing money on empty rooms
          </span>
        </h1>
        
        <div className="space-y-4 py-6 px-4 rounded-xl bg-[#460F54]/40 backdrop-blur-sm border border-fuchsia-400/20">
          <p className="text-xl text-center text-[#FEF7CD] font-bold animate-text-slow">Your hotel, always full. All year long</p>
          <p className="text-xl text-center text-[#FEF7CD] font-bold animate-text-slow">100% occupancy. Every single day</p>
          <p className="text-xl text-center text-[#FEF7CD] font-bold animate-text-slow">Turn your dead dates into gold</p>
          <p className="text-xl text-center text-[#FEF7CD] font-bold animate-text-slow">Multiply your profits dramatically</p>
        </div>
      </div>
    </>
  );
}
