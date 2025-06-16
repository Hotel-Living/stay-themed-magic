
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const CostItemsTab: React.FC = () => {
  const { language } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<string>("");

  const handleTabClick = (tab: string) => {
    setSelectedTab(prev => prev === tab ? "" : tab);
  };

  return (
    <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
      {/* Horizontal tabs */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button
          onClick={() => handleTabClick("utilities")}
          className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
            selectedTab === "utilities" 
              ? "bg-blue-600 text-white border-2 border-white/40" 
              : "bg-blue-800/60 text-blue-200 hover:bg-blue-700/80"
          }`}
        >
          {language === 'es' ? 'SUMINISTROS' : 'UTILITIES'}
        </button>
        
        <button
          onClick={() => handleTabClick("cleaning")}
          className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
            selectedTab === "cleaning" 
              ? "bg-blue-600 text-white border-2 border-white/40" 
              : "bg-blue-800/60 text-blue-200 hover:bg-blue-700/80"
          }`}
        >
          {language === 'es' ? 'LIMPIEZA' : 'CLEANING'}
        </button>
        
        <button
          onClick={() => handleTabClick("meals")}
          className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
            selectedTab === "meals" 
              ? "bg-blue-600 text-white border-2 border-white/40" 
              : "bg-blue-800/60 text-blue-200 hover:bg-blue-700/80"
          }`}
        >
          {language === 'es' ? 'COMIDAS' : 'MEALS'}
        </button>
        
        <button
          onClick={() => handleTabClick("total")}
          className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
            selectedTab === "total" 
              ? "bg-blue-600 text-white border-2 border-white/40" 
              : "bg-blue-800/60 text-blue-200 hover:bg-blue-700/80"
          }`}
        >
          {language === 'es' ? 'COSTE TOTAL' : 'TOTAL COST'}
        </button>
      </div>

      {/* Content based on selected tab */}
      {selectedTab === "utilities" && (
        <div className="mt-6">
          <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-400/20">
            <h3 className="font-bold text-lg mb-3 text-blue-200 text-center">
              {language === 'es' ? 'SUMINISTROS' : 'UTILITIES'}
            </h3>
            <div className="space-y-2 text-sm text-center">
              <p>€2-4</p>
              <p className="text-blue-300">per room/night</p>
            </div>
          </div>
        </div>
      )}

      {selectedTab === "cleaning" && (
        <div className="mt-6">
          <div className="bg-green-800/30 rounded-lg p-4 border border-green-400/20">
            <h3 className="font-bold text-lg mb-3 text-green-200 text-center">
              {language === 'es' ? 'LIMPIEZA' : 'CLEANING'}
            </h3>
            <div className="space-y-2 text-sm text-center">
              <p>€8-12</p>
              <p className="text-green-300">per room/night</p>
            </div>
          </div>
        </div>
      )}

      {selectedTab === "meals" && (
        <div className="mt-6">
          <div className="bg-orange-800/30 rounded-lg p-4 border border-orange-400/20">
            <h3 className="font-bold text-lg mb-3 text-orange-200 text-center">
              {language === 'es' ? 'COMIDAS' : 'MEALS'}
            </h3>
            <div className="space-y-2 text-sm text-center">
              <p>€15-25</p>
              <p className="text-orange-300">per person/day</p>
            </div>
          </div>
        </div>
      )}

      {selectedTab === "total" && (
        <div className="mt-6">
          <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-400/20">
            <h3 className="font-bold text-lg mb-3 text-purple-200 text-center">
              {language === 'es' ? 'COSTE TOTAL' : 'TOTAL COST'}
            </h3>
            <div className="space-y-2 text-sm text-center">
              <p>€25-41</p>
              <p className="text-purple-300">per room/night</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
