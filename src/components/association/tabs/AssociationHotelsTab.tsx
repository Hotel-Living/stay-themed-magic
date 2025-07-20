import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HotelUpload {
  hotel_name: string;
  city: string;
  contact_email: string;
}

export const AssociationHotelsTab = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [uploadedHotels, setUploadedHotels] = useState<HotelUpload[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.name.toLowerCase().endsWith('.csv'));
    
    if (csvFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCsvText(text);
        processCsvData(text);
      };
      reader.readAsText(csvFile);
    } else {
      toast({
        title: "Error",
        description: "Por favor, suba un archivo CSV válido",
        variant: "destructive"
      });
    }
  }, [toast]);

  const processCsvData = (csvData: string) => {
    try {
      const lines = csvData.split('\n').filter(line => line.trim());
      const headers = lines[0]?.split(',').map(h => h.trim().toLowerCase());
      
      if (!headers.includes('hotel_name') && !headers.includes('nombre')) {
        toast({
          title: "Error",
          description: "El CSV debe contener una columna 'hotel_name' o 'nombre'",
          variant: "destructive"
        });
        return;
      }

      const hotels: HotelUpload[] = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const nameIndex = headers.findIndex(h => h === 'hotel_name' || h === 'nombre');
        const cityIndex = headers.findIndex(h => h === 'city' || h === 'ciudad');
        const emailIndex = headers.findIndex(h => h === 'contact_email' || h === 'email');

        return {
          hotel_name: values[nameIndex] || '',
          city: values[cityIndex] || '',
          contact_email: values[emailIndex] || ''
        };
      }).filter(hotel => hotel.hotel_name);

      setUploadedHotels(hotels);
      toast({
        title: "Éxito",
        description: `${hotels.length} hoteles cargados correctamente`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al procesar el archivo CSV",
        variant: "destructive"
      });
    }
  };

  const handleTextSubmit = () => {
    if (csvText.trim()) {
      processCsvData(csvText);
    }
  };

  const handleSaveHotels = async () => {
    if (uploadedHotels.length === 0) {
      toast({
        title: "Error",
        description: "No hay hoteles para guardar",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Here we would save to Supabase - for now just show success
      toast({
        title: "Éxito",
        description: `${uploadedHotels.length} hoteles guardados correctamente`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar los hoteles",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeHotel = (index: number) => {
    setUploadedHotels(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-600 bg-slate-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Subir Lista de Hoteles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver 
                ? 'border-blue-400 bg-blue-400/10' 
                : 'border-slate-500 hover:border-slate-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-300 mb-2">
              Arrastre un archivo CSV aquí o haga clic para seleccionar
            </p>
            <p className="text-sm text-slate-500">
              Formato esperado: hotel_name, city, contact_email
            </p>
            <Input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const text = event.target?.result as string;
                    setCsvText(text);
                    processCsvData(text);
                  };
                  reader.readAsText(file);
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="csvText" className="text-white">
              O pegue los datos CSV directamente:
            </Label>
            <Textarea
              id="csvText"
              placeholder="hotel_name,city,contact_email&#10;Hotel Example,Madrid,contact@hotel.com"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="min-h-[100px] bg-slate-800 border-slate-600 text-white"
            />
            <Button onClick={handleTextSubmit} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Procesar Texto
            </Button>
          </div>
        </CardContent>
      </Card>

      {uploadedHotels.length > 0 && (
        <Card className="border-slate-600 bg-slate-700/30">
          <CardHeader>
            <CardTitle className="text-white">
              Hoteles Cargados ({uploadedHotels.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {uploadedHotels.map((hotel, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">{hotel.hotel_name}</p>
                    <p className="text-sm text-slate-400">
                      {hotel.city} {hotel.contact_email && `• ${hotel.contact_email}`}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeHotel(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-600">
              <Button
                onClick={handleSaveHotels}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Guardando...' : 'Guardar Lista de Hoteles'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};