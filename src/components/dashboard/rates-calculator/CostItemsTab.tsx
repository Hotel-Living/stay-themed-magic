
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const CostItemsTab: React.FC = () => {
  const { language } = useTranslation();
  
  return (
    <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-400/20">
          <h3 className="font-bold text-lg mb-3 text-blue-200">
            {language === 'es' ? 'SUMINISTROS' : 'SUPPLIES'}
          </h3>
          <div className="space-y-2 text-sm">
            <p>€2-4</p>
            <p className="text-blue-300">per room/night</p>
          </div>
        </div>
        
        <div className="bg-green-800/30 rounded-lg p-4 border border-green-400/20">
          <h3 className="font-bold text-lg mb-3 text-green-200">
            {language === 'es' ? 'LIMPIEZA' : 'CLEANING'}
          </h3>
          <div className="space-y-2 text-sm">
            <p>€8-12</p>
            <p className="text-green-300">per room/night</p>
          </div>
        </div>
        
        <div className="bg-orange-800/30 rounded-lg p-4 border border-orange-400/20">
          <h3 className="font-bold text-lg mb-3 text-orange-200">
            {language === 'es' ? 'COMIDAS' : 'MEALS'}
          </h3>
          <div className="space-y-2 text-sm">
            <p>€15-25</p>
            <p className="text-orange-300">per person/day</p>
          </div>
        </div>
        
        <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-400/20">
          <h3 className="font-bold text-lg mb-3 text-purple-200">
            {language === 'es' ? 'COSTE TOTAL' : 'TOTAL COST'}
          </h3>
          <div className="space-y-2 text-sm">
            <p>€25-41</p>
            <p className="text-purple-300">per room/night</p>
          </div>
        </div>
      </div>
    </div>
  );
};
