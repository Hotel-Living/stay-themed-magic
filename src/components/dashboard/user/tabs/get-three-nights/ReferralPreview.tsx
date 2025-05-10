
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

const ReferralPreview: React.FC = () => {
  const { user } = useAuth();
  
  // Extract first name and first letter of last name if available
  const getUserDisplayName = () => {
    if (!user || !user.user_metadata) return "You";
    
    const firstName = user.user_metadata.first_name || "";
    const lastName = user.user_metadata.last_name || "";
    
    if (firstName && lastName) {
      return `${firstName} ${lastName.charAt(0)}.`;
    } else if (firstName) {
      return firstName;
    } else {
      return "You";
    }
  };

  return (
    <Card className="border border-fuchsia-200 bg-fuchsia-50/30 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3 text-fuchsia-700">
          <Mail className="h-5 w-5" />
          <h3 className="text-sm font-medium">Preview of what the hotel will receive</h3>
        </div>
        
        <div className="text-sm text-gray-700 space-y-4">
          <p className="font-bold">🎉 Congratulations!</p>
          
          <p>
            One of your excellent clients, <strong>{getUserDisplayName()}</strong>, has recently 
            recommended your hotel to be featured on Hotel Living.
            Their appreciation for your service inspired us to reach out and personally invite 
            you to join our platform.
          </p>
          
          <p>
            We'd love for you to discover what Hotel Living offers — a curated space for 
            long-term thematic stays, ideal for outstanding hotels like yours.
          </p>
          
          <p className="font-medium">
            👉 Learn more and register your hotel here:<br />
            <a href="/hotels" className="text-fuchsia-600 hover:text-fuchsia-700 underline">
              Hotel Living – Discover Hotels
            </a>
          </p>
          
          <p>Congratulations again on earning your client's enthusiastic recommendation!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralPreview;
