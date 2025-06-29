import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

interface AvailabilityPackage {
  id: string;
  roomCount: number;
  selectedDates: Date[];
}

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const [packages, setPackages] = useState<AvailabilityPackage[]>(
    formData?.availabilityPackages || []
  );
  const [currentPackage, setCurrentPackage] = useState<{
    roomCount: number;
    selectedDates: Date[];
  }>({
    roomCount: 1,
    selectedDates: []
  });

  // Get all dates that are already used in existing packages
  const getUsedDates = (): Date[] => {
    return packages.flatMap(pkg => pkg.selectedDates);
  };

  // Check if a date is already used
  const isDateUsed = (date: Date): boolean => {
    const usedDates = getUsedDates();
    return usedDates.some(usedDate => 
      format(usedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  // Handle date selection for current package
  const handleDateSelect = (date: Date | undefined) => {
    if (!date || isDateUsed(date)) return;

    setCurrentPackage(prev => {
      const isAlreadySelected = prev.selectedDates.some(selectedDate =>
        format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );

      if (isAlreadySelected) {
        // Remove date if already selected
        return {
          ...prev,
          selectedDates: prev.selectedDates.filter(selectedDate =>
            format(selectedDate, 'yyyy-MM-dd') !== format(date, 'yyyy-MM-dd')
          )
        };
      } else {
        // Add date if not selected
        return {
          ...prev,
          selectedDates: [...prev.selectedDates, date]
        };
      }
    });
  };

  // Create a new availability package
  const createPackage = () => {
    if (currentPackage.selectedDates.length === 0 || currentPackage.roomCount < 1) {
      return;
    }

    if (packages.length >= 10) {
      return;
    }

    const newPackage: AvailabilityPackage = {
      id: `package-${Date.now()}`,
      roomCount: currentPackage.roomCount,
      selectedDates: [...currentPackage.selectedDates]
    };

    const updatedPackages = [...packages, newPackage];
    setPackages(updatedPackages);

    // Reset current package
    setCurrentPackage({
      roomCount: 1,
      selectedDates: []
    });

    // Update form data
    if (updateFormData) {
      updateFormData('availabilityPackages', updatedPackages);
    }

    // Validate - at least one package should exist
    if (onValidationChange) {
      onValidationChange(updatedPackages.length > 0);
    }
  };

  // Delete a package
  const deletePackage = (packageId: string) => {
    const updatedPackages = packages.filter(pkg => pkg.id !== packageId);
    setPackages(updatedPackages);

    if (updateFormData) {
      updateFormData('availabilityPackages', updatedPackages);
    }

    if (onValidationChange) {
      onValidationChange(updatedPackages.length > 0);
    }
  };

  // Check if current package can be created
  const canCreatePackage = currentPackage.selectedDates.length > 0 && 
                          currentPackage.roomCount >= 1 && 
                          packages.length < 10;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">3.3 – Paquetes de Disponibilidad</h3>
      
      <p className="text-sm text-gray-300 mb-4">
        Cree hasta 10 paquetes de disponibilidad con cantidad de habitaciones y fechas específicas:
      </p>

      {/* Existing Packages */}
      {packages.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-white">Paquetes Creados:</h4>
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-fuchsia-950/30 p-4 rounded-lg border border-fuchsia-800/30">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-white font-medium">
                    Habitaciones: {pkg.roomCount}
                  </p>
                  <p className="text-gray-300 text-sm">
                    Fechas: {pkg.selectedDates.length} seleccionadas
                  </p>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => deletePackage(pkg.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-400">
                {pkg.selectedDates.map(date => format(date, 'dd/MM/yyyy')).join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create New Package */}
      {packages.length < 10 && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-white">
            Crear Nuevo Paquete ({packages.length}/10):
          </h4>
          
          {/* Room Count Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Número de habitaciones disponibles:
            </label>
            <Input
              type="number"
              min="1"
              max="100"
              value={currentPackage.roomCount}
              onChange={(e) => setCurrentPackage(prev => ({
                ...prev,
                roomCount: parseInt(e.target.value) || 1
              }))}
              className="w-32 bg-fuchsia-950/30 border-fuchsia-800/50 text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              Estas habitaciones pueden usarse como dobles o individuales
            </p>
          </div>

          {/* Calendar */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Seleccionar fechas para este paquete:
            </label>
            <div className="bg-fuchsia-950/30 rounded-lg p-4 border border-fuchsia-800/30">
              <Calendar
                mode="multiple"
                selected={currentPackage.selectedDates}
                onSelect={(dates) => {
                  if (Array.isArray(dates)) {
                    // Filter out any dates that are already used in other packages
                    const validDates = dates.filter(date => !isDateUsed(date));
                    setCurrentPackage(prev => ({
                      ...prev,
                      selectedDates: validDates
                    }));
                  }
                }}
                disabled={(date) => isDateUsed(date)}
                className="pointer-events-auto text-white"
                modifiersClassNames={{
                  selected: "bg-fuchsia-600 text-white hover:bg-fuchsia-700",
                  disabled: "text-gray-500 opacity-50"
                }}
              />
              
              {currentPackage.selectedDates.length > 0 && (
                <div className="mt-4 p-3 bg-fuchsia-900/30 rounded">
                  <p className="text-sm text-white mb-2">
                    Fechas seleccionadas ({currentPackage.selectedDates.length}):
                  </p>
                  <div className="text-xs text-gray-300">
                    {currentPackage.selectedDates
                      .sort((a, b) => a.getTime() - b.getTime())
                      .map(date => format(date, 'dd/MM/yyyy'))
                      .join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Create Package Button */}
          <Button
            type="button"
            onClick={createPackage}
            disabled={!canCreatePackage}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          >
            ➕ Crear Paquete de Disponibilidad
          </Button>

          {!canCreatePackage && (
            <p className="text-sm text-yellow-400">
              {currentPackage.selectedDates.length === 0 
                ? "Seleccione al menos una fecha para crear el paquete"
                : currentPackage.roomCount < 1 
                ? "Ingrese un número válido de habitaciones"
                : "Máximo 10 paquetes permitidos"}
            </p>
          )}
        </div>
      )}

      {packages.length === 10 && (
        <div className="bg-yellow-900/30 p-3 rounded-lg border border-yellow-500/30">
          <p className="text-yellow-300 text-sm">
            Se ha alcanzado el límite de 10 paquetes de disponibilidad.
          </p>
        </div>
      )}
    </div>
  );
};

export default AvailabilitySection;
