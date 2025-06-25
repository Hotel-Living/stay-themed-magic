
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, CheckCircle, AlertCircle } from "lucide-react";

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

export const BatchHotelCreation = () => {
  const [count, setCount] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BatchResult | null>(null);

  const handleCreateHotels = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('batch-hotel-creation', {
        body: { count }
      });

      if (error) {
        console.error('Error calling batch-hotel-creation:', error);
        setResult({
          success: false,
          message: 'Failed to create hotels',
          stats: {
            totalCreated: 0,
            errors: [error.message],
            hotelDetails: []
          }
        });
        return;
      }

      console.log('Batch creation response:', data);
      setResult(data);
    } catch (error) {
      console.error('Exception during batch creation:', error);
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
            <Plus className="w-5 h-5" />
            Batch Hotel Creation
          </CardTitle>
          <CardDescription>
            Create multiple hotels with random data for testing purposes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="hotel-count" className="block text-sm font-medium mb-2">
                Number of hotels to create
              </label>
              <Input
                id="hotel-count"
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleCreateHotels}
              disabled={isLoading}
              className="mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Real Hotels with Full Configuration...
                </>
              ) : (
                `Create ${count} Hotels`
              )}
            </Button>
          </div>
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
};
