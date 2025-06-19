
import React from 'react';
import { Calculator, DollarSign, TrendingUp, FileText } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const RatesCalculatorContent = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-fuchsia-500/20 bg-[#7a0486]">
        <h2 className="text-2xl font-semibold mb-2">{t('dashboard.ratesCalculator')}</h2>
        <p className="text-foreground/80">
          Calculate your hotel rates and profitability with our economic models.
        </p>
      </div>

      {/* Calculator Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Economic Model */}
        <div className="glass-card rounded-2xl p-6 bg-[#5d0478] hover:bg-[#6a0486] transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-fuchsia-300" />
            </div>
            <h3 className="text-xl font-semibold">{t('dashboard.standardEconomicModel')}</h3>
          </div>
          <p className="text-foreground/80 mb-4">
            Use our pre-built economic model to calculate standard rates and profitability.
          </p>
          <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors text-white bg-[#770477] hover:bg-[#8A058A]">
            Start Calculator
          </button>
        </div>

        {/* Costs and Profits */}
        <div className="glass-card rounded-2xl p-6 bg-[#5d0478] hover:bg-[#6a0486] transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-fuchsia-300" />
            </div>
            <h3 className="text-xl font-semibold">{t('dashboard.costsAndProfits')}</h3>
          </div>
          <p className="text-foreground/80 mb-4">
            Analyze your operational costs and profit margins in detail.
          </p>
          <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors text-white bg-[#770477] hover:bg-[#8A058A]">
            Analyze Now
          </button>
        </div>

        {/* Build Your Own Model */}
        <div className="glass-card rounded-2xl p-6 bg-[#5d0478] hover:bg-[#6a0486] transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-fuchsia-300" />
            </div>
            <h3 className="text-xl font-semibold">{t('dashboard.buildOwnModel')}</h3>
          </div>
          <p className="text-foreground/80 mb-4">
            Create a custom economic model tailored to your specific business needs.
          </p>
          <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors text-white bg-[#770477] hover:bg-[#8A058A]">
            Build Model
          </button>
        </div>

        {/* Costs Disclaimer */}
        <div className="glass-card rounded-2xl p-6 bg-[#5d0478] hover:bg-[#6a0486] transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-fuchsia-300" />
            </div>
            <h3 className="text-xl font-semibold">{t('dashboard.costsDisclaimer')}</h3>
          </div>
          <p className="text-foreground/80 mb-4">
            Read important information about cost calculations and limitations.
          </p>
          <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors text-white bg-[#770477] hover:bg-[#8A058A]">
            View Disclaimer
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
          <h3 className="text-lg font-semibold mb-4">{t('dashboard.costs')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-foreground/80">Fixed Costs</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/80">Variable Costs</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/80">Total Monthly Costs</span>
              <span className="font-semibold text-lg">$0.00</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
          <h3 className="text-lg font-semibold mb-4">{t('dashboard.profits')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-foreground/80">Gross Revenue</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/80">Net Profit</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/80">Profit Margin</span>
              <span className="font-semibold text-lg">0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
