
import React from "react";
import { Gift } from "lucide-react";

const ProgramDescription = () => {
  return (
    <>
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-6 h-6 text-fuchsia-300" />
          <h2 className="text-2xl font-bold">Get Three Free Hotel Nights</h2>
        </div>
      </div>

      {/* Slogans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          "One referral. Three nights on us.",
          "You connect. We reward."
        ].map((slogan, index) => (
          <div 
            key={index} 
            className="glass-card rounded-lg p-4 bg-[#5d0478] text-center flex items-center justify-center h-24"
          >
            <p className="font-semibold text-fuchsia-100">{slogan}</p>
          </div>
        ))}
      </div>

      {/* Main Text */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h3 className="text-xl font-semibold mb-4 text-fuchsia-100">How It Works</h3>
        
        <div className="space-y-4 text-fuchsia-100">
          <p>
            Simply introduce us to any hotel.
            If that hotel joins our platform within the next 15 days, you'll receive three complimentary nights at any of our featured promotional hotels.
            That's all it takes — a simple introduction.
          </p>
          
          <p>
            With just one small gesture, you make a difference:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>You earn yourself a well-deserved free getaway.</li>
            <li>You offer a hotel a new horizon and opportunity.</li>
            <li>And you help our community grow and thrive.</li>
          </ul>
          
          <p>
            It's a win for everyone — and a perfect way to experience what Hotel Living is all about: comfort, connection, and a new way of life.
          </p>
          
          <p>
            It's our way of saying thank you for helping us grow — and for bringing more people into a lifestyle of freedom and hospitality.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProgramDescription;
