
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateHotelExcel, generateExcelAndImportToDatabase } from '@/utils/hotelDataGenerator';
import { Download, FileSpreadsheet, CheckCircle, AlertCircle, Database } from 'lucide-react';
import { toast } from 'sonner';

export const ExcelHotelGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [importComplete, setImportComplete] = useState(false);
  const [importedCount, setImportedCount] = useState(0);

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

  const handleGenerateAndImport = async () => {
    setIsImporting(true);
    setImportComplete(false);
    setImportedCount(0);
    
    try {
      const result = await generateExcelAndImportToDatabase();
      
      if (result.success) {
        setImportComplete(true);
        setImportedCount(result.hotelsImported);
        toast.success(`Excel generated and ${result.hotelsImported} hotels imported successfully!`, {
          description: "Excel file downloaded and hotels added to database as 'pending' properties"
        });
      } else {
        toast.error('Failed to generate Excel and import hotels', {
          description: result.error || 'Unknown error occurred'
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Error generating Excel and importing hotels', {
        description: 'Please try again or check the console for details'
      });
    } finally {
      setIsImporting(false);
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

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Database className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-blue-900">Database Import Option</div>
                  <div className="text-blue-700 text-sm">
                    Import hotels directly to your database as 'pending' properties. Complete their setup 
                    using the existing 5-step workflow in the admin panel.
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={handleGenerateExcel}
                disabled={isGenerating || isImporting}
                className="w-full"
                size="lg"
                variant="outline"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Generating Excel...
                  </>
                ) : generationComplete ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Excel Generated!
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Excel Only
                  </>
                )}
              </Button>

              <Button 
                onClick={handleGenerateAndImport}
                disabled={isGenerating || isImporting}
                className="w-full"
                size="lg"
              >
                {isImporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating & Importing...
                  </>
                ) : importComplete ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Excel + Database Complete!
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Generate Excel + Import to Database
                  </>
                )}
              </Button>
            </div>

            {generationComplete && !importComplete && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900">Excel File Ready!</div>
                    <div className="text-blue-700 text-sm">
                      Your Excel file "hotel_living_56_hotels.xlsx" has been downloaded. 
                      Check your Downloads folder for the complete file with all 56 hotels.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {importComplete && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-green-900">Excel Generated & Hotels Imported!</div>
                    <div className="text-green-700 text-sm">
                      Excel file downloaded AND {importedCount} hotels imported to database as 'pending' properties. 
                      You can now access them through the admin panel to complete their setup using the 5-step workflow.
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
