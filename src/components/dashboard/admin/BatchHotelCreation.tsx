
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/subabase/client";
import { Loader2, Plus, CheckCircle, AlertCircle } from "lucide-react";

interface HotelCreationStats {
  totalCreated: number;
  errors: string[];
  hotelDetails: Array<{
    id: string;
    name: string;
    city: string;
    country: string;
  }>;
}

interface BatchCreationResponse {
  success: boolean;
  message: string;
  stats: HotelCreationStats;
}

export const BatchHotelCreation = () => {
  const [count, setCount] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BatchCreationResponse | null>(null);

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
          stats: { totalCreated: 0, errors: [error.message], hotelDetails: [] }
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
        stats: { totalCreated: 0, errors: ['Network error'], hotelDetails: [] }
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
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>

            {result.stats && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-green-600">
                        {result.stats.totalCreated}
                      </div>
                      <p className="text-sm text-muted-foreground">Hotels Created</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-red-600">
                        {result.stats.errors?.length || 0}
                      </div>
                      <p className="text-sm text-muted-foreground">Errors</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-blue-600">
                        {result.stats.hotelDetails?.length || 0}
                      </div>
                      <p className="text-sm text-muted-foreground">Details Available</p>
                    </CardContent>
                  </Card>
                </div>

                {result.stats.hotelDetails && result.stats.hotelDetails.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Created Hotels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {result.stats.hotelDetails.map((hotel) => (
                          <div key={hotel.id} className="flex justify-between items-center p-2 bg-muted rounded">
                            <span className="font-medium">{hotel.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {hotel.city}, {hotel.country}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {result.stats.errors && result.stats.errors.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600">Errors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {result.stats.errors.map((error, index) => (
                          <div key={index} className="text-sm text-red-600 p-2 bg-red-50 rounded">
                            {error}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
