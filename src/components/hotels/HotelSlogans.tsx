
import { TrendingUp } from "lucide-react";

export function HotelSlogans() {
  return (
    <>
      {/* Main slogans */}
      <div className="space-y-6 mb-12">
        <h1 className="text-2xl font-bold text-center text-white border-b border-yellow-300/30 pb-4 max-w-xl mx-auto">Stop losing money on empty rooms</h1>
        
        <div className="space-y-2 py-4">
          <p className="text-xl text-center text-white font-bold">Your hotel, always full. All year long</p>
          <p className="text-xl text-center text-white font-bold">100% occupancy. Every single day</p>
          <p className="text-xl text-center text-white font-bold">Turn your dead dates into gold</p>
          <p className="text-xl text-center text-white font-bold">Multiply your profits dramatically</p>
        </div>
      </div>
      
      {/* The single line section with the removed line */}
      <div className="py-6 mb-10 flex items-center justify-center space-x-2 bg-[#860493]/40 rounded-lg px-4">
        <TrendingUp className="h-6 w-6 text-yellow-300" />
        <p className="text-xl text-center text-white font-bold">We sell your slow days and keep you in peak season</p>
        <TrendingUp className="h-6 w-6 text-yellow-300" />
      </div>
    </>
  );
}
