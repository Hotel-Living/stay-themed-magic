
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateHotelExcel } from '@/utils/hotelDataGenerator';
import { Download, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export const ExcelHotelGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);

  const handleGenerateExcel = async () => {
    setIsGenerating(true);
    setGenerationComplete(false);
    
    try {
      const result = await generateHotelExcel();
      
      if (result.success) {
        setGenerationComplete(true);
        toast.success(`Excel file generated successfully with ${result.count} hotels!`, {
          description: "Check your Downloads folder for 'hotel_living_56_hotels.xlsx'"
        });
      } else {
        toast.error('Failed to generate Excel file', {
          description: result.error || 'Unknown error occurred'
        });
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Error generating Excel file', {
        description: 'Please try again or check the console for details'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6" />
            Hotel Living - 56 Real Hotels Excel Generator
          </CardTitle>
          <CardDescription>
            Generate a complete Excel file with 56 verified secondary hotels across 8 major cities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="font-semibold text-blue-900">Budapest</div>
                <div className="text-blue-700">7 hotels</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="font-semibold text-green-900">Paris</div>
                <div className="text-green-700">7 hotels</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="font-semibold text-yellow-900">Hurghada</div>
                <div className="text-yellow-700">7 hotels</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="font-semibold text-purple-900">Berlin</div>
                <div className="text-purple-700">7 hotels</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="font-semibold text-red-900">New York</div>
                <div className="text-red-700">7 hotels</div>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <div className="font-semibold text-indigo-900">Bucharest</div>
                <div className="text-indigo-700">7 hotels</div>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <div className="font-semibold text-pink-900">London</div>
                <div className="text-pink-700">7 hotels</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="font-semibold text-orange-900">Istanbul</div>
                <div className="text-orange-700">7 hotels</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Included Data Fields:</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Hotel Name (verified real secondary hotels)</li>
                <li>City (exact distribution as requested)</li>
                <li>Full Address (street, postal code)</li>
                <li>Complete Description (meaningful, detailed)</li>
                <li>Affinities (from your existing list)</li>
                <li>Activities (from your existing list)</li>
                <li>Room Description (double room specifications)</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900">Quality Guarantee</div>
                  <div className="text-green-700 text-sm">
                    All hotels are real, secondary category properties (not chains or luxury brands). 
                    Data is verified and accurate with complete field information.
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleGenerateExcel}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Excel File...
                </>
              ) : generationComplete ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Excel Generated Successfully!
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate 56 Hotels Excel File
                </>
              )}
            </Button>

            {generationComplete && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900">File Ready!</div>
                    <div className="text-blue-700 text-sm">
                      Your Excel file "hotel_living_56_hotels.xlsx" has been downloaded. 
                      Check your Downloads folder for the complete file with all 56 hotels.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
