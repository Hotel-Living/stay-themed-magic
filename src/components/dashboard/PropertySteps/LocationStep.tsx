
import React, { useState } from "react";
import { MapPin } from "lucide-react";

export default function LocationStep() {
  const [address, setAddress] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [isAddingNewCountry, setIsAddingNewCountry] = useState(false);
  const [isAddingNewCity, setIsAddingNewCity] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCountry(value);
    
    if (value === "other") {
      setIsAddingNewCountry(true);
    } else {
      setIsAddingNewCountry(false);
      setCustomCountry("");
    }
    
    // Reset city selection when country changes
    setSelectedCity("");
    setIsAddingNewCity(false);
    setCustomCity("");
  };
  
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCity(value);
    
    if (value === "other") {
      setIsAddingNewCity(true);
    } else {
      setIsAddingNewCity(false);
      setCustomCity("");
    }
  };
  
  return <div className="space-y-5">
      <h3 className="text-xl font-bold uppercase mb-4 text-slate-50">LOCATION</h3>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          ADDRESS
        </label>
        <input 
          type="text" 
          placeholder="Street address" 
          required 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="text-white w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#b40fe3]" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
            COUNTRY
          </label>
          <select 
            required 
            value={selectedCountry} 
            onChange={handleCountryChange} 
            className="text-white w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#b40fe3]"
          >
            <option value="">Select country</option>
            <option value="es">Spain</option>
            <option value="fr">France</option>
            <option value="it">Italy</option>
            <option value="us">United States</option>
            <option value="other">Add another country</option>
          </select>
          
          {isAddingNewCountry && (
            <div className="mt-2">
              <input 
                type="text" 
                placeholder="Enter country name" 
                value={customCountry} 
                onChange={e => setCustomCountry(e.target.value)} 
                required 
                className="text-white w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#5c0869]" 
              />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
            CITY
          </label>
          <select 
            required 
            value={selectedCity} 
            onChange={handleCityChange} 
            className="text-white w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#ba12ea]"
          >
            <option value="">Select city</option>
            {selectedCountry === 'es' && (
              <>
                <option value="madrid">Madrid</option>
                <option value="barcelona">Barcelona</option>
                <option value="valencia">Valencia</option>
                <option value="seville">Seville</option>
                <option value="other">Add new city</option>
              </>
            )}
            {selectedCountry === 'fr' && (
              <>
                <option value="paris">Paris</option>
                <option value="nice">Nice</option>
                <option value="marseille">Marseille</option>
                <option value="lyon">Lyon</option>
                <option value="other">Add new city</option>
              </>
            )}
            {selectedCountry === 'it' && (
              <>
                <option value="rome">Rome</option>
                <option value="milan">Milan</option>
                <option value="venice">Venice</option>
                <option value="florence">Florence</option>
                <option value="other">Add new city</option>
              </>
            )}
            {selectedCountry === 'us' && (
              <>
                <option value="newyork">New York</option>
                <option value="losangeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="miami">Miami</option>
                <option value="other">Add new city</option>
              </>
            )}
            {selectedCountry === 'other' && <option value="other">Add new city</option>}
          </select>
          
          {isAddingNewCity && (
            <div className="mt-2">
              <input 
                type="text" 
                placeholder="Enter city name" 
                value={customCity} 
                onChange={e => setCustomCity(e.target.value)} 
                required 
                className="text-white w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#5c0869]" 
              />
            </div>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          POSTAL CODE
        </label>
        <input 
          type="text" 
          placeholder="Postal/ZIP code" 
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="text-white w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#b40fe3]" 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          LOCATION ON MAP
        </label>
        <div className="w-full h-64 rounded-lg border border-fuchsia-800/30 flex items-center justify-center bg-[#bc16eb]">
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-fuchsia-400/50" />
            <p className="text-sm text-foreground/60">Google Maps will be loaded here</p>
            <p className="text-xs text-foreground/40 mt-1">Latitude and longitude will be set automatically</p>
          </div>
        </div>
      </div>
    </div>;
}
