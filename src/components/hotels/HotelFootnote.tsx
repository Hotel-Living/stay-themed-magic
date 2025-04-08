
import { Smile } from "lucide-react";

export function HotelFootnote() {
  return (
    <div className="mt-12 py-6 px-8 border-t border-yellow-300/30 bg-[#6a0a95] rounded-lg animate-text w-full max-w-xl mx-auto shadow-lg">
      <div className="space-y-3">
        <p className="text-xl text-center text-yellow-300 font-medium">OUR MOTTO</p>
        <div className="text-white text-center italic space-y-2">
          <p className="leading-relaxed">"Give us your vacant rooms,</p>
          <p className="leading-relaxed">Your quiet suites waiting for life,</p>
          <p className="leading-relaxed">The idle beds longing for stories to tell.</p>
          <p className="leading-relaxed">Send us the spaces empty but full of potential—</p>
          <p className="leading-relaxed">We bring guests, light, and purpose to your golden doors."</p>
          <div className="flex justify-center mt-4">
            <Smile className="h-8 w-8 text-yellow-300 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
