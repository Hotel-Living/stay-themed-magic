
import React from "react";

const ProgramDescription = () => {
  return (
    <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
      <h3 className="text-xl font-semibold mb-4">Three Free Nights Program</h3>
      
      <div className="space-y-4">
        <p>
          Our Three Free Nights program rewards you for helping us grow the Hotel Living community.
          For each hotel you recommend that joins our platform, you'll earn credits toward free stays.
        </p>
        
        <div className="bg-[#8a1a96]/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">How it works:</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>Recommend hotels you love using our simple form</li>
            <li>We'll reach out to them with your personalized recommendation</li>
            <li>If they join Hotel Living, you earn credits toward free stays</li>
            <li>Accumulate enough credits to enjoy three free nights at any participating hotel</li>
          </ol>
        </div>
        
        <p className="text-sm">
          Our program is designed to reward our community members who help us discover exceptional hotels.
          There's no limit to how many hotels you can recommend or how many free nights you can earn!
        </p>
        
        <div className="bg-[#8a1a96]/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Benefits:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Earn credits for successful recommendations</li>
            <li>Help your favorite hotels gain exposure</li>
            <li>Expand the Hotel Living community</li>
            <li>Enjoy free stays at exceptional properties</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgramDescription;
