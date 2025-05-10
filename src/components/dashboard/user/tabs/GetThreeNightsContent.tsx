
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Send } from 'lucide-react';
import ProgramDescription from './get-three-nights/ProgramDescription';
import ReferralForm from './get-three-nights/ReferralForm';
import RecommendHotelForm from './recommend-hotel/RecommendHotelForm';
import RecommendationProgramInfo from './recommend-hotel/RecommendationProgramInfo';

export default function GetThreeNightsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Referral Programs</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Earn rewards and help us grow the Hotel Living community
        </p>
      </div>
      
      <Tabs defaultValue="three-nights">
        <TabsList className="bg-[#5c0869]">
          <TabsTrigger value="three-nights">
            <Gift className="mr-2 h-4 w-4" />
            Get Three Free Nights
          </TabsTrigger>
          <TabsTrigger value="recommend">
            <Send className="mr-2 h-4 w-4" />
            Recommend a Hotel
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="three-nights" className="mt-6">
          <div className="space-y-6">
            <ProgramDescription />
            <ReferralForm />
          </div>
        </TabsContent>
        
        <TabsContent value="recommend" className="mt-6">
          <div className="space-y-6">
            <RecommendationProgramInfo />
            <RecommendHotelForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
