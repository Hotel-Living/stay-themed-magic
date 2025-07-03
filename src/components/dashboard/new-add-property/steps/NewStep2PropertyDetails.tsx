
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

interface NewStep2PropertyDetailsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function NewStep2PropertyDetails({
  formData,
  updateFormData,
  onValidationChange
}: NewStep2PropertyDetailsProps) {
  
  const [themes, setThemes] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loadingThemes, setLoadingThemes] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);

  // Load themes and activities
  useEffect(() => {
    const loadThemes = async () => {
      try {
        const { data, error } = await supabase
          .from('themes')
          .select('*')
          .eq('level', 1)
          .order('name');
        
        if (error) throw error;
        setThemes(data || []);
      } catch (error) {
        console.error('Error loading themes:', error);
      } finally {
        setLoadingThemes(false);
      }
    };

    const loadActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setActivities(data || []);
      } catch (error) {
        console.error('Error loading activities:', error);
      } finally {
        setLoadingActivities(false);
      }
    };

    loadThemes();
    loadActivities();
  }, []);

  // Validation - optional step, always valid
  useEffect(() => {
    onValidationChange(true);
  }, [onValidationChange]);

  const toggleTheme = (themeId: string) => {
    const currentThemes = formData.themes || [];
    const updatedThemes = currentThemes.includes(themeId)
      ? currentThemes.filter((id: string) => id !== themeId)
      : [...currentThemes, themeId];
    
    updateFormData('themes', updatedThemes);
  };

  const toggleActivity = (activityId: string) => {
    const currentActivities = formData.activities || [];
    const updatedActivities = currentActivities.includes(activityId)
      ? currentActivities.filter((id: string) => id !== activityId)
      : [...currentActivities, activityId];
    
    updateFormData('activities', updatedActivities);
  };

  const toggleHotelFeature = (feature: string) => {
    const currentFeatures = formData.featuresHotel || {};
    updateFormData('featuresHotel', {
      ...currentFeatures,
      [feature]: !currentFeatures[feature]
    });
  };

  const toggleRoomFeature = (feature: string) => {
    const currentFeatures = formData.featuresRoom || {};
    updateFormData('featuresRoom', {
      ...currentFeatures,
      [feature]: !currentFeatures[feature]
    });
  };

  const hotelFeatures = [
    'Swimming Pool', 'Gym/Fitness Center', 'Spa & Wellness', 'Restaurant', 
    'Bar/Lounge', 'Free WiFi', 'Parking', 'Pet Friendly', 'Business Center',
    'Concierge Service', 'Laundry Service', '24/7 Reception'
  ];

  const roomFeatures = [
    'Air Conditioning', 'Heating', 'Private Bathroom', 'Balcony/Terrace',
    'Sea View', 'Mountain View', 'City View', 'Kitchenette', 'Mini Bar',
    'Safe', 'Desk', 'Seating Area'
  ];

  return (
    <div className="space-y-6">
      
      {/* Themes Section */}
      <Card>
        <CardHeader>
          <CardTitle>Property Themes</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingThemes ? (
            <p>Loading themes...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    (formData.themes || []).includes(theme.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleTheme(theme.id)}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      checked={(formData.themes || []).includes(theme.id)}
                      onChange={() => {}} // Handled by div onClick
                    />
                    <span className="text-sm font-medium">{theme.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activities Section */}
      <Card>
        <CardHeader>
          <CardTitle>Available Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingActivities ? (
            <p>Loading activities...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    (formData.activities || []).includes(activity.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleActivity(activity.id)}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      checked={(formData.activities || []).includes(activity.id)}
                      onChange={() => {}} // Handled by div onClick
                    />
                    <span className="text-sm font-medium">{activity.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hotel Features */}
      <Card>
        <CardHeader>
          <CardTitle>Hotel Features & Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hotelFeatures.map((feature) => (
              <div
                key={feature}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  (formData.featuresHotel || {})[feature]
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleHotelFeature(feature)}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={(formData.featuresHotel || {})[feature] || false}
                    onChange={() => {}} // Handled by div onClick
                  />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Room Features */}
      <Card>
        <CardHeader>
          <CardTitle>Room Features & Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {roomFeatures.map((feature) => (
              <div
                key={feature}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  (formData.featuresRoom || {})[feature]
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleRoomFeature(feature)}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={(formData.featuresRoom || {})[feature] || false}
                    onChange={() => {}} // Handled by div onClick
                  />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
