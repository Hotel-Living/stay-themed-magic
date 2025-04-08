
import { Calendar, DollarSign, Users } from "lucide-react";

export function HotelFeatures() {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl font-bold mb-6 text-gradient text-[#ebd4ee]">Why Join Hotels Life?</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="glass-card p-6 rounded-xl bg-[#6a0a95] transform hover:scale-105 transition-transform duration-300">
          <Calendar className="h-8 w-8 text-fuchsia-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">100% Occupancy</h3>
          <p className="text-sm text-foreground/80">Fill your vacant rooms with long-term guests year-round</p>
        </div>
        <div className="glass-card p-6 rounded-xl bg-[#6a0a95] transform hover:scale-105 transition-transform duration-300">
          <DollarSign className="h-8 w-8 text-fuchsia-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">Increased Revenue</h3>
          <p className="text-sm text-foreground/80">Higher average daily rates with reduced operational costs</p>
        </div>
        <div className="glass-card p-6 rounded-xl bg-[#6a0a95] transform hover:scale-105 transition-transform duration-300">
          <Users className="h-8 w-8 text-fuchsia-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">Global Network</h3>
          <p className="text-sm text-foreground/80">Access to international guests seeking themed experiences</p>
        </div>
      </div>
    </div>
  );
}
