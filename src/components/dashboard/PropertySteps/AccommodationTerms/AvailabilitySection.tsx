import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { format, addMonths, startOfMonth } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomCalendarSingleWeekday from "../rooms/roomTypes/CustomCalendarSingleWeekday";
import { weekdayMap } from "../rooms/roomTypes/availabilityDateUtils";

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

interface AvailabilityPackage {
  id: string;
  rooms: number;
  checkinDate: string;
  checkoutDate: string;
  dates: string[];
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const [selectedIndividualDates, setSelectedIndividualDates] = useState<string[]>(
    formData?.selectedDates || []
  );
  const [availabilityPackages, setAvailabilityPackages] = useState<AvailabilityPackage[]>(
    formData?.availabilityPackages || []
  );
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [newPackageRooms, setNewPackageRooms] = useState<number>(1);
  const [packageDates, setPackageDates] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const preferredWeekday = formData?.checkinDay || "monday";
  const preferredDayNum = weekdayMap[preferredWeekday] || 1;

  // Get all dates that are already used (individual + packages)
  const getUsedDates = () => {
    const usedDates = [...selectedIndividualDates];
    availabilityPackages.forEach(pkg => {
      usedDates.push(...pkg.dates);
    });
    return usedDates;
  };

  const handleIndividualDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const newDates = selectedIndividualDates.includes(dateString)
      ? selectedIndividualDates.filter(d => d !== dateString)
      : [...selectedIndividualDates, dateString];
    
    setSelectedIndividualDates(newDates);
    updateFormData('selectedDates', newDates);
  };

  const handlePackageDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    
    if (packageDates.length === 0) {
      // First date - check-in
      setPackageDates([dateString]);
    } else if (packageDates.length === 1) {
      // Second date - check-out
      const checkinDate = new Date(packageDates[0]);
      const checkoutDate = date;
      
      if (checkoutDate > checkinDate) {
        // Generate all dates between check-in and check-out
        const allDates = [];
        const currentDate = new Date(checkinDate);
        
        while (currentDate <= checkoutDate) {
          allDates.push(currentDate.toISOString().split('T')[0]);
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        setPackageDates(allDates);
      }
    } else {
      // Reset and start over
      setPackageDates([dateString]);
    }
  };

  const createAvailabilityPackage = () => {
    if (packageDates.length >= 2 && newPackageRooms > 0) {
      const newPackage: AvailabilityPackage = {
        id: `package-${Date.now()}`,
        rooms: newPackageRooms,
        checkinDate: packageDates[0],
        checkoutDate: packageDates[packageDates.length - 1],
        dates: packageDates
      };
      
      const updatedPackages = [...availabilityPackages, newPackage];
      setAvailabilityPackages(updatedPackages);
      updateFormData('availabilityPackages', updatedPackages);
      
      // Reset form
      setPackageDates([]);
      setNewPackageRooms(1);
      setShowPackageForm(false);
    }
  };

  const removePackage = (packageId: string) => {
    const updatedPackages = availabilityPackages.filter(pkg => pkg.id !== packageId);
    setAvailabilityPackages(updatedPackages);
    updateFormData('availabilityPackages', updatedPackages);
  };

  // Generate 12 months starting from current month
  const months = Array.from({ length: 12 }, (_, i) => 
    addMonths(startOfMonth(new Date()), i)
  );

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle} className="w-full mb-6 border rounded-lg overflow-hidden bg-fuchsia-900/10">
      <CollapsibleTrigger className="w-full flex items-center justify-between py-3 px-4 text-left border-b border-fuchsia-800/20">
        <label className="block text-lg font-medium uppercase">
          Paquetes de Disponibilidad
        </label>
        <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="p-4 space-y-6">
        {/* Individual Date Selection */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Fechas Individuales Disponibles</h3>
          <p className="text-sm text-gray-400">
            Selecciona fechas específicas donde los huéspedes pueden hacer check-in los {preferredWeekday}s.
          </p>
          
          <div className="space-y-4">
            {months.map((month) => (
              <div key={month.toISOString()} className="border rounded-lg p-4 bg-fuchsia-950/20">
                <CustomCalendarSingleWeekday
                  month={month}
                  preferredDayNum={preferredDayNum}
                  selected={selectedIndividualDates}
                  preferredWeekday={preferredWeekday}
                  onSelectDate={handleIndividualDateSelect}
                  excludedDates={getUsedDates().filter(date => !selectedIndividualDates.includes(date))}
                />
              </div>
            ))}
          </div>

          {selectedIndividualDates.length > 0 && (
            <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4">
              <h4 className="font-medium text-green-200 mb-2">Fechas Seleccionadas:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedIndividualDates.map(date => (
                  <span key={date} className="bg-green-800/40 text-green-200 px-2 py-1 rounded text-sm">
                    {format(new Date(date), 'MMM d, yyyy')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Availability Packages */}
        <div className="space-y-4 border-t border-fuchsia-800/20 pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-medium">Paquetes de Disponibilidad</h3>
              <p className="text-sm text-gray-400">
                Crea paquetes con un número específico de habitaciones para períodos determinados.
              </p>
            </div>
            {availabilityPackages.length < 10 && !showPackageForm && (
              <Button
                onClick={() => setShowPackageForm(true)}
                className="bg-fuchsia-600 hover:bg-fuchsia-700"
                size="sm"
              >
                Crear Paquete
              </Button>
            )}
          </div>

          {/* Existing Packages */}
          {availabilityPackages.length > 0 && (
            <div className="space-y-3">
              {availabilityPackages.map((pkg, index) => (
                <div key={pkg.id} className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-blue-200">Paquete {index + 1}</h4>
                      <p className="text-sm text-blue-300">
                        {pkg.rooms} habitaciones disponibles
                      </p>
                      <p className="text-sm text-blue-300">
                        Desde {format(new Date(pkg.checkinDate), 'MMM d, yyyy')} hasta {format(new Date(pkg.checkoutDate), 'MMM d, yyyy')}
                      </p>
                      <p className="text-xs text-blue-400 mt-1">
                        Estas habitaciones pueden usarse como dobles o individuales
                      </p>
                    </div>
                    <Button
                      onClick={() => removePackage(pkg.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Package Creation Form */}
          {showPackageForm && (
            <div className="bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-4 space-y-4">
              <h4 className="font-medium">Crear Nuevo Paquete</h4>
              
              <div>
                <Label htmlFor="package-rooms">Número de Habitaciones</Label>
                <Input
                  id="package-rooms"
                  type="number"
                  min="1"
                  value={newPackageRooms}
                  onChange={(e) => setNewPackageRooms(parseInt(e.target.value) || 1)}
                  className="bg-fuchsia-950/50"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Estas habitaciones pueden usarse como dobles o individuales
                </p>
              </div>

              <div>
                <Label>Seleccionar Período</Label>
                <p className="text-sm text-gray-400 mb-3">
                  Selecciona fecha de check-in y check-out para este paquete.
                </p>
                
                <div className="space-y-4">
                  {months.map((month) => (
                    <div key={month.toISOString()} className="border rounded-lg p-4 bg-fuchsia-950/20">
                      <CustomCalendarSingleWeekday
                        month={month}
                        preferredDayNum={preferredDayNum}
                        selected={packageDates}
                        preferredWeekday={preferredWeekday}
                        onSelectDate={handlePackageDateSelect}
                        excludedDates={getUsedDates()}
                      />
                    </div>
                  ))}
                </div>

                {packageDates.length > 0 && (
                  <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-3 mt-3">
                    <p className="text-sm">
                      {packageDates.length === 1 ? (
                        `Check-in: ${format(new Date(packageDates[0]), 'MMM d, yyyy')} - Selecciona fecha de check-out`
                      ) : (
                        `Período: ${format(new Date(packageDates[0]), 'MMM d, yyyy')} - ${format(new Date(packageDates[packageDates.length - 1]), 'MMM d, yyyy')}`
                      )}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={createAvailabilityPackage}
                  disabled={packageDates.length < 2 || newPackageRooms < 1}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Crear Paquete
                </Button>
                <Button
                  onClick={() => {
                    setShowPackageForm(false);
                    setPackageDates([]);
                    setNewPackageRooms(1);
                  }}
                  variant="outline"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {availabilityPackages.length >= 10 && (
            <p className="text-sm text-yellow-400">
              Máximo de 10 paquetes alcanzado.
            </p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AvailabilitySection;
