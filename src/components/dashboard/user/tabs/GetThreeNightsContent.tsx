
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Send } from 'lucide-react';
import ProgramDescription from './get-three-nights/ProgramDescription';
import ReferralForm from './get-three-nights/ReferralForm';

export default function GetThreeNightsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Get Three Free Nights</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Earn free nights by helping us grow the Hotel Living community
        </p>
      </div>
      
      <Tabs defaultValue="referral">
        <TabsList className="bg-[#5c0869]">
          <TabsTrigger value="program">
            <Gift className="mr-2 h-4 w-4" />
            Program Info
          </TabsTrigger>
          <TabsTrigger value="referral">
            <Send className="mr-2 h-4 w-4" />
            Recommend a Hotel
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="program" className="mt-6">
          <ProgramDescription />
        </TabsContent>
        
        <TabsContent value="referral" className="mt-6">
          <ReferralForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
