
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Starfield from '@/components/Starfield';

const Calculator = () => {
  // Input values (green cells)
  const [principal, setPrincipal] = useState<number>(1000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [years, setYears] = useState<number>(10);
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(100);
  
  // Calculated values
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalDeposits, setTotalDeposits] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Calculate results whenever inputs change
  useEffect(() => {
    // Convert annual interest rate to monthly
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;
    
    // Calculate future value of initial principal
    let principalFV = principal * Math.pow(1 + monthlyRate, totalMonths);
    
    // Calculate future value of monthly deposits
    // Using compound interest formula for recurring deposits
    let depositsFV = 0;
    if (monthlyRate > 0) {
      depositsFV = monthlyDeposit * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    } else {
      depositsFV = monthlyDeposit * totalMonths;
    }
    
    // Calculate total deposits
    const deposits = principal + (monthlyDeposit * totalMonths);
    
    // Calculate total future value
    const fv = principalFV + depositsFV;
    
    // Calculate total interest earned
    const interest = fv - deposits;
    
    setFutureValue(fv);
    setTotalDeposits(deposits);
    setTotalInterest(interest);
  }, [principal, interestRate, years, monthlyDeposit]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gradient mb-8">Investment Calculator</h1>
        
        <Card className="fuchsia-card max-w-4xl mx-auto shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold border-b border-fuchsia-500/30 pb-2 mb-4">Inputs</h2>
                
                <div className="space-y-3">
                  <Label htmlFor="principal" className="text-fuchsia-200">Initial Investment ($)</Label>
                  <Input 
                    id="principal"
                    type="number" 
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="bg-green-900/20 border-green-500/40 text-white"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="interestRate" className="text-fuchsia-200">Annual Interest Rate (%)</Label>
                  <Input 
                    id="interestRate"
                    type="number" 
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="bg-green-900/20 border-green-500/40 text-white"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="years" className="text-fuchsia-200">Investment Period (Years)</Label>
                  <Input 
                    id="years"
                    type="number" 
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="bg-green-900/20 border-green-500/40 text-white"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="monthlyDeposit" className="text-fuchsia-200">Monthly Deposit ($)</Label>
                  <Input 
                    id="monthlyDeposit"
                    type="number" 
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                    className="bg-green-900/20 border-green-500/40 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold border-b border-fuchsia-500/30 pb-2 mb-4">Results</h2>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-md bg-fuchsia-900/20 border border-fuchsia-500/30">
                    <Label className="text-fuchsia-300 block mb-1">Future Value</Label>
                    <div className="text-2xl font-semibold text-white">${futureValue.toFixed(2)}</div>
                  </div>
                  
                  <div className="p-4 rounded-md bg-fuchsia-900/20 border border-fuchsia-500/30">
                    <Label className="text-fuchsia-300 block mb-1">Total Deposits</Label>
                    <div className="text-2xl font-semibold text-white">${totalDeposits.toFixed(2)}</div>
                  </div>
                  
                  <div className="p-4 rounded-md bg-fuchsia-900/20 border border-fuchsia-500/30">
                    <Label className="text-fuchsia-300 block mb-1">Total Interest Earned</Label>
                    <div className="text-2xl font-semibold text-white">${totalInterest.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="h-60 w-full bg-gradient-to-br from-fuchsia-900/30 to-fuchsia-800/10 rounded-lg border border-fuchsia-500/30 flex items-center justify-center p-4">
                    <p className="text-fuchsia-300 text-center">
                      Interactive chart visualization coming soon!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;
