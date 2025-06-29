import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { format, addMonths, startOfMonth } from "date-fns";
import { weekdayMap, getAvailableDatesForMonth } from "../rooms/roomTypes/availabilityDateUtils";

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

interface AvailabilityPackage {
  id: string;
  rooms: number;
  dates: string[];
  name: string;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const [selectedDates, setSelectedDates] = useState<string[]>(formData?.availabilityDates || []);
  const [availabilityPackages, setAvailabilityPackages] = useState<AvailabilityPackage[]>(
    formData?.availabilityPackages || []
  );
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({});
  const [creatingPackage, setCreatingPackage] = useState(false);
  const [newPackageRooms, setNewPackageRooms] = useState<number>(1);
  const [newPackageDates, setNewPackageDates] = useState<string[]>([]);
  
  const preferredWeekday = formData?.checkinDay || "monday";
  const preferredDayNum = weekdayMap[preferredWeekday] || 1;

  // Generate next 12 months
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = addMonths(startOfMonth(new Date()), i);
    return {
      date,
      key: format(date, 'yyyy-MM'),
      label: format(date, 'MMMM yyyy')
    };
  });

  // Get all dates that are already used in packages
  const usedDates = availabilityPackages.flatMap(pkg => pkg.dates);
  
  // Get available dates for each month (excluding used dates)
  const getAvailableDatesForMonthFiltered = (month: Date) => {
    const allDates = getAvailableDatesForMonth(month, preferredDayNum);
    return allDates.filter(date => {
      const dateStr = date.toISOString().split('T')[0];
      return !usedDates.includes(dateStr);
    });
  };

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths(prev => ({
      ...prev,
      [monthKey]: !prev[monthKey]
    }));
  };

  const handleDateToggle = (dateStr: string, isForPackage = false) => {
    if (isForPackage) {
      setNewPackageDates(prev => {
        if (prev.includes(dateStr)) {
          return prev.filter(d => d !== dateStr);
        } else {
          return [...prev, dateStr].sort();
        }
      });
    } else {
      const newSelectedDates = selectedDates.includes(dateStr)
        ? selectedDates.filter(d => d !== dateStr)
        : [...selectedDates, dateStr].sort();
      
      setSelectedDates(newSelectedDates);
      updateFormData('availabilityDates', newSelectedDates);
    }
  };

  const createPackage = () => {
    if (newPackageDates.length === 0 || newPackageRooms < 1) return;

    const newPackage: AvailabilityPackage = {
      id: Date.now().toString(),
      rooms: newPackageRooms,
      dates: [...newPackageDates],
      name: `Package ${availabilityPackages.length + 1}`
    };

    const updatedPackages = [...availabilityPackages, newPackage];
    setAvailabilityPackages(updatedPackages);
    updateFormData('availabilityPackages', updatedPackages);
    
    // Reset form
    setNewPackageDates([]);
    setNewPackageRooms(1);
    setCreatingPackage(false);
  };

  const deletePackage = (packageId: string) => {
    const updatedPackages = availabilityPackages.filter(pkg => pkg.id !== packageId);
    setAvailabilityPackages(updatedPackages);
    updateFormData('availabilityPackages', updatedPackages);
  };

  return (
    <Collapsible className="w-full mb-6 border rounded-lg overflow-hidden bg-fuchsia-900/10" open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger className="w-full flex items-center justify-between py-3 px-4 text-left border-b border-fuchsia-800/20">
        <label className="block text-lg font-medium uppercase">
          Paquetes de Disponibilidad
        </label>
        <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Calendar */}
          <div className="space-y-4">
            <h4 className="font-medium">Seleccione fechas específicas de check-in (solo los {preferredWeekday}s) o meses completos:</h4>
            
            {/* Month Dropdowns */}
            <div className="space-y-2">
              {months.map(month => {
                const availableDates = getAvailableDatesForMonthFiltered(month.date);
                if (availableDates.length === 0) return null;

                return (
                  <div key={month.key} className="border border-fuchsia-800/30 rounded-md bg-fuchsia-950/50">
                    <button
                      onClick={() => toggleMonth(month.key)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-fuchsia-800/20"
                    >
                      <span className="text-white">{month.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedMonths[month.key] ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {expandedMonths[month.key] && (
                      <div className="p-3 border-t border-fuchsia-800/30 space-y-2">
                        {availableDates.map(date => {
                          const dateStr = date.toISOString().split('T')[0];
                          const isSelected = selectedDates.includes(dateStr);
                          const isInNewPackage = newPackageDates.includes(dateStr);
                          
                          return (
                            <div key={dateStr} className="flex items-center space-x-2">
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleDateToggle(dateStr)}
                                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50"
                                />
                                <span className="text-sm text-white">
                                  {format(date, 'EEE, MMM d, yyyy')}
                                </span>
                              </label>
                              
                              {creatingPackage && (
                                <label className="flex items-center space-x-2 cursor-pointer ml-4">
                                  <input
                                    type="checkbox"
                                    checked={isInNewPackage}
                                    onChange={() => handleDateToggle(dateStr, true)}
                                    className="rounded border-green-500/50 text-green-600 focus:ring-green-500/50"
                                  />
                                  <span className="text-xs text-green-400">Para paquete</span>
                                </label>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Selected Dates and Packages */}
          <div className="space-y-4">
            <div className="bg-fuchsia-800/20 p-3 rounded">
              <h4 className="font-medium mb-2">Fechas individuales seleccionadas:</h4>
              {selectedDates.length === 0 ? (
                <p className="text-sm text-gray-400">Aún no se han seleccionado fechas</p>
              ) : (
                <div className="space-y-1">
                  {selectedDates.map(dateStr => (
                    <div key={dateStr} className="text-sm text-white">
                      {format(new Date(dateStr), 'EEE, MMM d, yyyy')}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Availability Packages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Paquetes de Disponibilidad ({availabilityPackages.length}/10)</h4>
                {availabilityPackages.length < 10 && !creatingPackage && (
                  <Button
                    onClick={() => setCreatingPackage(true)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Crear Paquete
                  </Button>
                )}
              </div>

              {/* Create Package Form */}
              {creatingPackage && (
                <div className="bg-green-800/20 p-4 rounded border border-green-500/30">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Número de habitaciones:</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={newPackageRooms}
                        onChange={(e) => setNewPackageRooms(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-1 bg-fuchsia-950/50 border border-fuchsia-800/50 rounded text-white"
                      />
                      <p className="text-xs text-gray-400 mt-1">Estas habitaciones se pueden usar como dobles o individuales</p>
                    </div>
                    
                    <div>
                      <p className="text-sm">Fechas seleccionadas para el paquete: {newPackageDates.length}</p>
                      {newPackageDates.length > 0 && (
                        <div className="text-xs text-green-400 space-y-1 mt-2">
                          {newPackageDates.map(dateStr => (
                            <div key={dateStr}>
                              {format(new Date(dateStr), 'EEE, MMM d, yyyy')}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={createPackage}
                        disabled={newPackageDates.length === 0 || newPackageRooms < 1}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Crear
                      </Button>
                      <Button
                        onClick={() => {
                          setCreatingPackage(false);
                          setNewPackageDates([]);
                          setNewPackageRooms(1);
                        }}
                        size="sm"
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Existing Packages */}
              {availabilityPackages.map(pkg => (
                <div key={pkg.id} className="bg-blue-800/20 p-3 rounded border border-blue-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{pkg.name}</h5>
                    <Button
                      onClick={() => deletePackage(pkg.id)}
                      size="sm"
                      variant="destructive"
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-sm">Habitaciones: {pkg.rooms}</p>
                  <p className="text-sm">Fechas: {pkg.dates.length}</p>
                  <div className="text-xs text-blue-400 space-y-1 mt-2">
                    {pkg.dates.map(dateStr => (
                      <div key={dateStr}>
                        {format(new Date(dateStr), 'EEE, MMM d, yyyy')}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AvailabilitySection;
