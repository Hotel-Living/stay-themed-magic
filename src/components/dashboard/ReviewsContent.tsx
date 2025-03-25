
import React from 'react';
import ReviewsManagement from './ReviewsManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ReviewsContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Reviews Management</h2>
        <p className="text-foreground/70">
          Manage and respond to guest reviews for your properties.
        </p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="all">All Properties</TabsTrigger>
          <TabsTrigger value="parador">Parador de Granada</TabsTrigger>
          <TabsTrigger value="techhub">TechHub Barcelona</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ReviewsManagement />
        </TabsContent>
        
        <TabsContent value="parador">
          <ReviewsManagement />
        </TabsContent>
        
        <TabsContent value="techhub">
          <ReviewsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ReviewsContent;
