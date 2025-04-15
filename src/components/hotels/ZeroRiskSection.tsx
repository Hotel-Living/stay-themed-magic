
import React from 'react';
import { ShieldCheck, ThumbsUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ZeroRiskSection() {
  const benefits = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-fuchsia-400" />,
      title: "Zero Risk",
      description: "Try hotel living with our 100% satisfaction guarantee. If you don't love it, we'll help you find another hotel.",
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-fuchsia-400" />,
      title: "Verified Hotels",
      description: "All our hotels are personally verified to ensure they meet our high quality standards.",
    },
    {
      icon: <Star className="w-8 h-8 text-fuchsia-400" />,
      title: "Premium Experience",
      description: "Enjoy the benefits of hotel living with amenities designed for long-term satisfaction.",
    },
  ];

  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#460F54]/40 to-[#300A38]/60 backdrop-blur-md border border-fuchsia-400/20 shadow-[0_8px_20px_rgba(93,4,120,0.2)]">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gradient">Zero Risk Hotel Living</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-fuchsia-400/10 hover:border-fuchsia-400/30 transition-all duration-300">
              <div className="mb-4 p-3 rounded-full bg-fuchsia-900/30">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{benefit.title}</h3>
              <p className="text-white/80">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium px-8 py-6 h-auto rounded-full shadow-[0_4px_12px_rgba(217,70,239,0.4)] hover:shadow-[0_6px_16px_rgba(217,70,239,0.6)] transition-all duration-300">
            Start Your Risk-Free Journey
          </Button>
          <p className="mt-4 text-sm text-white/70">Experience hotel living with confidence</p>
        </div>
      </div>
    </div>
  );
}
