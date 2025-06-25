
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar, CheckCircle, AlertCircle, Hotel, MapPin, Building } from "lucide-react";

interface BatchResult {
  success: boolean;
  message: string;
  stats: {
    totalCreated: number;
    totalAttempted: number;
    countriesProcessed: number;
    expectedCountries: number;
    countryDistribution: Record<string, number>;
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
            totalAttempted: 66,
            countriesProcessed: 0,
            expectedCountries: 22,
            countryDistribution: {},
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
          totalAttempted: 66,
          countriesProcessed: 0,
          expectedCountries: 22,
          countryDistribution: {},
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
            Create exactly 66 hotels optimized for 32-day stays (3 hotels per country across 22 authorized countries)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Batch Specifications:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-center gap-2">
                  <Hotel className="w-4 h-4" />
                  <span>66 hotels total (3 per country)</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>22 authorized countries only</span>
                </li>
                <li className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>Complete address data & coordinates</span>
                </li>
              </ul>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Property types: Hotel, Resort, Boutique Hotel</li>
                <li>• All months availability</li>
                <li>• Half Board meal plan</li>
                <li>• Pricing optimized for 32-day stays</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-medium text-amber-900 mb-2">Authorized Countries (22):</h4>
            <div className="text-sm text-amber-800 grid grid-cols-2 md:grid-cols-3 gap-1">
              {[
                'Poland', 'Hungary', 'Romania', 'Canada', 'Ireland', 'Germany', 'Portugal', 
                'Belgium', 'Netherlands', 'Luxembourg', 'Switzerland', 'Austria', 'Denmark', 
                'Norway', 'Sweden', 'Greece', 'Finland', 'Iceland', 'France', 'United Kingdom', 
                'Turkey', 'Thailand'
              ].map(country => (
                <span key={country} className="text-xs bg-amber-100 px-2 py-1 rounded">
                  {country}
                </span>
              ))}
            </div>
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
                Creating 66 Hotels (3 per country)...
              </>
            ) : (
              <>
                <Hotel className="w-4 h-4 mr-2" />
                Create 66 Hotels for 32-Day Stays
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Hotels Created</p>
                    <p className="text-2xl font-bold text-green-800">
                      {result.stats.totalCreated}/{result.stats.totalAttempted || 66}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Countries</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {result.stats.countriesProcessed}/{result.stats.expectedCountries || 22}
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <p className="text-sm text-amber-600 font-medium">Success Rate</p>
                    <p className="text-2xl font-bold text-amber-800">
                      {result.stats.totalAttempted ? Math.round((result.stats.totalCreated / result.stats.totalAttempted) * 100) : 0}%
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Errors</p>
                    <p className="text-2xl font-bold text-red-800">{result.stats.errors.length}</p>
                  </div>
                </div>

                {result.stats.countryDistribution && Object.keys(result.stats.countryDistribution).length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Country Distribution:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                      {Object.entries(result.stats.countryDistribution).map(([country, count]) => (
                        <div key={country} className={`p-2 rounded ${count === 3 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                          <span className="font-medium">{country}:</span> {count}/3
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.stats.hotelDetails.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Created Hotels ({result.stats.hotelDetails.length}):</h4>
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
                    <h4 className="font-medium mb-2 text-red-600">Errors ({result.stats.errors.length}):</h4>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
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
