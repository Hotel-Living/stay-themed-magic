
import React from "react";

const RecommendationProgramInfo = () => {
  return (
    <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
      <h3 className="text-xl font-semibold mb-4">Recommend a Hotel</h3>
      
      <div className="space-y-4">
        <p>
          Help us discover exceptional hotels for the Hotel Living community. If you know of a hotel that would be a perfect fit for our platform, share it with us below.
        </p>
        
        <div className="bg-[#8a1a96]/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">How it works:</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>Fill out the form below with information about the hotel you'd like to recommend</li>
            <li>We'll reach out to the hotel with your personalized recommendation</li>
            <li>The hotel will receive an invitation to join our platform</li>
          </ol>
        </div>
        
        <p className="text-sm">
          We appreciate your recommendations! There's no limit to how many hotels you can suggest.
        </p>
      </div>
    </div>
  );
};

export default RecommendationProgramInfo;
