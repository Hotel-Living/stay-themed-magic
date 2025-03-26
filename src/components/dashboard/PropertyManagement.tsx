
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyList } from './property-management/PropertyList';
import { PropertyForm } from './property-management/PropertyForm';
import { PropertyGallery } from './property-management/PropertyGallery';
import { PropertyCalendar } from './property-management/PropertyCalendar';
import { PropertyPromotions } from './property-management/PropertyPromotions';
import { PropertyAvailability } from './property-management/PropertyAvailability';

export function PropertyManagement() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Property Management</h2>
        <p className="text-foreground/70">
          Manage your properties, rooms, availability, and promotions
        </p>
      </div>
      
      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="add">Add Property</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="properties">
          <PropertyList 
            onSelectProperty={setSelectedProperty} 
            selectedPropertyId={selectedProperty}
          />
        </TabsContent>
        
        <TabsContent value="add">
          <PropertyForm propertyId={selectedProperty} />
        </TabsContent>
        
        <TabsContent value="calendar">
          <PropertyCalendar propertyId={selectedProperty} />
        </TabsContent>
        
        <TabsContent value="availability">
          <PropertyAvailability propertyId={selectedProperty} />
        </TabsContent>
        
        <TabsContent value="promotions">
          <PropertyPromotions propertyId={selectedProperty} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PropertyManagement;
