
import React, { useState } from 'react';
import ReviewsManagement from './ReviewsManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ReviewsContent() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  
  const handlePropertyChange = (value: string) => {
    setSelectedProperty(value === 'all' ? null : value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Reviews Management</h2>
        <p className="text-foreground/70">
          Manage and respond to guest reviews for your properties.
        </p>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={handlePropertyChange}>
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="all">All Properties</TabsTrigger>
          <TabsTrigger value="Parador de Granada">Parador de Granada</TabsTrigger>
          <TabsTrigger value="TechHub Barcelona">TechHub Barcelona</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ReviewsManagement propertyFilter={null} />
        </TabsContent>
        
        <TabsContent value="Parador de Granada">
          <ReviewsManagement propertyFilter="Parador de Granada" />
        </TabsContent>
        
        <TabsContent value="TechHub Barcelona">
          <ReviewsManagement propertyFilter="TechHub Barcelona" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ReviewsContent;
