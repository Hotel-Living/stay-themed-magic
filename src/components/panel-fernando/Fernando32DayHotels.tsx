
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar, CheckCircle, AlertCircle, Hotel } from "lucide-react";

interface BatchResult {
  success: boolean;
  message: string;
  stats: {
    totalCreated: number;
    errors: string[];
    hotelDetails: Array<{
      id: string;
      name: string;
      city: string;
      country: string;
    }>;
  };
}

export default function Fernando32DayHotels() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BatchResult | null>(null);

  const handleCreate32DayHotels = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('creacion-hoteles-32-dias');

      if (error) {
        console.error('Error calling creacion-hoteles-32-dias:', error);
        setResult({
          success: false,
          message: 'Failed to create 32-day hotels',
          stats: {
            totalCreated: 0,
            errors: [error.message],
            hotelDetails: []
          }
        });
        return;
      }

      console.log('32-day hotels creation response:', data);
      setResult(data);
    } catch (error) {
      console.error('Exception during 32-day hotels creation:', error);
      setResult({
        success: false,
        message: 'An unexpected error occurred',
        stats: {
          totalCreated: 0,
          errors: ['Network error'],
          hotelDetails: []
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            32-Day Hotels Creation
          </CardTitle>
          <CardDescription>
            Create 69 hotels optimized for 32-day stays with complete data including themes, activities, and translations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What this batch creates:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 69 hotels across 46 countries (including Morocco)</li>
              <li>• Complete hotel data (Steps 1-5 of property creation)</li>
              <li>• Themes, activities, and features</li>
              <li>• Pricing optimized for 32-day stays</li>
              <li>• Ready for translation to ES, PT, RO</li>
            </ul>
          </div>
          
          <Button
            onClick={handleCreate32DayHotels}
            disabled={isLoading}
            size="lg"
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating 32-Day Hotels...
              </>
            ) : (
              <>
                <Hotel className="w-4 h-4 mr-2" />
                Create 69 Hotels for 32-Day Stays
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              Creation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant={result.success ? "default" : "destructive"}>
              <AlertDescription>
                {result.message}
              </AlertDescription>
            </Alert>

            {result.stats && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Hotels Created</p>
                    <p className="text-2xl font-bold text-green-800">{result.stats.totalCreated}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Errors</p>
                    <p className="text-2xl font-bold text-red-800">{result.stats.errors.length}</p>
                  </div>
                </div>

                {result.stats.hotelDetails.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Created Hotels:</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {result.stats.hotelDetails.map((hotel) => (
                        <div key={hotel.id} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium">{hotel.name}</p>
                          <p className="text-sm text-gray-600">{hotel.city}, {hotel.country}</p>
                          <p className="text-xs text-gray-500">ID: {hotel.id}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.stats.errors.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">Errors:</h4>
                    <div className="space-y-1">
                      {result.stats.errors.map((error, index) => (
                        <p key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                          {error}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
