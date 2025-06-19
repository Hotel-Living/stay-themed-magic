
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

export const CostItemsTab: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Cost breakdown table */}
      <Card className="glass-card rounded-lg p-6 text-white border-fuchsia-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-400/30">
                <th className="text-left p-3 font-bold text-purple-200">COST CATEGORY</th>
                <th className="text-center p-3 font-bold text-purple-200">3-STAR HOTEL</th>
                <th className="text-center p-3 font-bold text-purple-200">4-STAR HOTEL</th>
                <th className="text-center p-3 font-bold text-purple-200">5-STAR HOTEL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-purple-400/20">
                <td className="p-3 font-medium">{t('ratesCalculator.utilities')}</td>
                <td className="text-center p-3">$8</td>
                <td className="text-center p-3">$12</td>
                <td className="text-center p-3">$18</td>
              </tr>
              <tr className="border-b border-purple-400/20">
                <td className="p-3 font-medium">{t('ratesCalculator.cleaning')}</td>
                <td className="text-center p-3">$15</td>
                <td className="text-center p-3">$25</td>
                <td className="text-center p-3">$35</td>
              </tr>
              <tr className="border-b border-purple-400/20">
                <td className="p-3 font-medium">{t('ratesCalculator.meals')}</td>
                <td className="text-center p-3">$12</td>
                <td className="text-center p-3">$20</td>
                <td className="text-center p-3">$30</td>
              </tr>
              <tr className="border-t-2 border-purple-400/50 bg-purple-900/30">
                <td className="p-3 font-bold text-lg">{t('ratesCalculator.totalCost')}</td>
                <td className="text-center p-3 font-bold text-lg">$35</td>
                <td className="text-center p-3 font-bold text-lg">$57</td>
                <td className="text-center p-3 font-bold text-lg">$83</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Explanatory text block */}
      <Card className="glass-card rounded-lg p-6 text-white border-fuchsia-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
        <div className="text-sm leading-relaxed whitespace-pre-line">
          {t('ratesCalculator.explanatoryText')}
        </div>
      </Card>
    </div>
  );
};
