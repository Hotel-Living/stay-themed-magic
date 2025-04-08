
import { CheckCircle } from "lucide-react";

export function ZeroRiskSection() {
  return (
    <div className="space-y-4 py-6 mb-12 bg-[#460F54]/40 rounded-lg px-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <CheckCircle className="h-6 w-6 text-green-400" />
        <h3 className="text-xl font-bold text-white">ZERO RISK. ZERO EFFORT.</h3>
        <CheckCircle className="h-6 w-6 text-green-400" />
      </div>
      
      <div className="space-y-3 max-w-md mx-auto">
        <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
          <p className="text-lg text-left text-white font-bold">Zero risk</p>
        </div>
        
        <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
          <p className="text-lg text-left text-white font-bold">Zero effort</p>
        </div>
        
        <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
          <p className="text-lg text-left text-white font-bold">Zero upfront cost</p>
        </div>
        
        <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
          <p className="text-lg text-left text-white font-bold">Zero monthly fees</p>
        </div>
        
        <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
          <p className="text-lg text-left text-white font-bold">You don't change a thing</p>
        </div>
        
        <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
          <p className="text-lg text-left text-white font-bold">You don't do a thing</p>
        </div>
        
        <div className="flex items-center gap-3 bg-[#6a0a95]/40 rounded-lg py-2 px-4">
          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
          <p className="text-lg text-left text-white font-bold">You just make HUGE PROFITS from your USUALLY EMPTY ROOMS</p>
        </div>
      </div>
    </div>
  );
}
