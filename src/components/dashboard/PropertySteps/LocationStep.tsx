import React, { useState } from "react";
import { MapPin } from "lucide-react";
export default function LocationStep() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    if (e.target.value !== "other") {
      setCustomCountry("");
    }
  };
  return <div className="space-y-5">
      <h3 className="text-xl font-bold uppercase mb-4">LOCATION</h3>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          ADDRESS
        </label>
        <input type="text" placeholder="Street address" required className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#5c0869]" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
            COUNTRY
          </label>
          <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30" required value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select country</option>
            <option value="es">Spain</option>
            <option value="fr">France</option>
            <option value="it">Italy</option>
            <option value="us">United States</option>
            <option value="other">Add another country</option>
          </select>
          
          {selectedCountry === "other" && <div className="mt-2">
              <input type="text" className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30" placeholder="Enter country name" value={customCountry} onChange={e => setCustomCountry(e.target.value)} required />
            </div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
            CITY
          </label>
          <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30" required>
            <option value="">Select city</option>
            <option value="madrid">Madrid</option>
            <option value="barcelona">Barcelona</option>
            <option value="valencia">Valencia</option>
            <option value="seville">Seville</option>
            <option value="other">Add new city...</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          LOCATION ON MAP
        </label>
        <div className="w-full h-64 bg-fuchsia-950/30 rounded-lg border border-fuchsia-800/30 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-fuchsia-400/50" />
            <p className="text-sm text-foreground/60">Google Maps will be loaded here</p>
            <p className="text-xs text-foreground/40 mt-1">Latitude and longitude will be set automatically</p>
          </div>
        </div>
      </div>
    </div>;
}