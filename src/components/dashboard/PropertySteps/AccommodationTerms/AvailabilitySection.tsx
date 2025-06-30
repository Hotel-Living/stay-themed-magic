import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format, addMonths, startOfMonth, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { weekdayMap, getAvailableDatesForMonth } from "../rooms/roomTypes/availabilityDateUtils";

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

interface AvailabilityPackage {
  id: string;
  rooms: number;
  checkIn: string;
  checkOut: string;
  selectedDates: string[];
}

interface MonthData {
  name: string;
  month: Date;
  isOpen: boolean;
  availableDates: Date[];
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const [showCreatePackage, setShowCreatePackage] = useState(false);
  const [newPackageRooms, setNewPackageRooms] = useState("");
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [monthsState, setMonthsState] = useState<MonthData[]>(() => {
    const months: MonthData[] = [];
    const today = new Date();
    
    for (let i = 0; i < 12; i++) {
      const monthDate = addMonths(startOfMonth(today), i);
      const preferredDayNum = formData?.checkinDay ? weekdayMap[formData.checkinDay] || 1 : 1;
      const availableDates = getAvailableDatesForMonth(monthDate, preferredDayNum);
      
      months.push({
        name: format(monthDate, "MMMM yyyy", { locale: es }),
        month: monthDate,
        isOpen: false,
        availableDates
      });
    }
    
    return months;
  });

  const existingPackages: AvailabilityPackage[] = formData?.availabilityPackages || [];

  const toggleMonth = (index: number) => {
    setMonthsState(prev => prev.map((month, i) => 
      i === index ? { ...month, isOpen: !month.isOpen } : month
    ));
  };

  const toggleDateSelection = (dateStr: string) => {
    setSelectedDates(prev => {
      if (prev.includes(dateStr)) {
        return prev.filter(d => d !== dateStr);
      } else {
        return [...prev, dateStr];
      }
    });
  };

  const createPackage = () => {
    if (!newPackageRooms || selectedDates.length < 2) return;

    const sortedDates = [...selectedDates].sort();
    const newPackage: AvailabilityPackage = {
      id: Date.now().toString(),
      rooms: parseInt(newPackageRooms),
      checkIn: sortedDates[0],
      checkOut: sortedDates[sortedDates.length - 1],
      selectedDates: sortedDates
    };

    const updatedPackages = [...existingPackages, newPackage];
    updateFormData('availabilityPackages', updatedPackages);
    
    // Reset form
    setNewPackageRooms("");
    setSelectedDates([]);
    setShowCreatePackage(false);
  };

  const deletePackage = (packageId: string) => {
    const updatedPackages = existingPackages.filter(pkg => pkg.id !== packageId);
    updateFormData('availabilityPackages', updatedPackages);
  };

  const isDateUsed = (dateStr: string) => {
    return existingPackages.some(pkg => pkg.selectedDates.includes(dateStr));
  };

  const leftColumnMonths = monthsState.slice(0, 6);
  const rightColumnMonths = monthsState.slice(6, 12);

  return (
    <div className="border border-white/20 rounded-lg p-4 bg-white/5">
      <button
        onClick={() => onToggle(!isOpen)}
        className="w-full flex items-center justify-between text-white font-semibold text-lg"
      >
        <span>PAQUETES DE DISPONIBILIDAD</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Existing Packages */}
          {existingPackages.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white font-medium">Paquetes Creados:</h4>
              {existingPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white/10 p-3 rounded flex items-center justify-between">
                  <div className="text-white text-sm">
                    <div>{pkg.rooms} habitaciones</div>
                    <div>Del {format(new Date(pkg.checkIn), "d MMM", { locale: es })} al {format(new Date(pkg.checkOut), "d MMM", { locale: es })}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deletePackage(pkg.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Create New Package Button */}
          {!showCreatePackage && (
            <Button
              onClick={() => setShowCreatePackage(true)}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Nuevo Paquete
            </Button>
          )}

          {/* Create Package Form */}
          {showCreatePackage && (
            <div className="space-y-4 bg-white/5 p-4 rounded-lg">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Número de habitaciones disponibles
                </label>
                <Input
                  type="number"
                  value={newPackageRooms}
                  onChange={(e) => setNewPackageRooms(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Ej: 5"
                />
                <p className="text-white/70 text-xs mt-1">
                  Estas habitaciones pueden utilizarse como dobles o individuales
                </p>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2">SELECCIÓN DE FECHAS</h4>
                <p className="text-white/70 text-sm mb-4">
                  Seleccione las fechas de check-in y check-out de este paquete
                </p>

                {/* Two Column Calendar */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-2">
                    {leftColumnMonths.map((monthData, index) => (
                      <div key={index} className="bg-white/5 rounded-lg">
                        <button
                          onClick={() => toggleMonth(index)}
                          className="w-full p-3 text-left text-white font-medium flex items-center justify-between hover:bg-white/10 rounded-lg"
                        >
                          {monthData.name}
                          {monthData.isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        
                        {monthData.isOpen && (
                          <div className="p-3 space-y-2">
                            {monthData.availableDates.map((date) => {
                              const dateStr = format(date, "yyyy-MM-dd");
                              const isUsed = isDateUsed(dateStr);
                              const isSelected = selectedDates.includes(dateStr);
                              
                              return (
                                <button
                                  key={dateStr}
                                  onClick={() => !isUsed && toggleDateSelection(dateStr)}
                                  disabled={isUsed}
                                  className={`w-full p-2 text-left rounded text-sm ${
                                    isUsed 
                                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                                      : isSelected
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                  }`}
                                >
                                  {format(date, "EEE d", { locale: es })}
                                  {isUsed && " (Ocupado)"}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-2">
                    {rightColumnMonths.map((monthData, index) => (
                      <div key={index + 6} className="bg-white/5 rounded-lg">
                        <button
                          onClick={() => toggleMonth(index + 6)}
                          className="w-full p-3 text-left text-white font-medium flex items-center justify-between hover:bg-white/10 rounded-lg"
                        >
                          {monthData.name}
                          {monthData.isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        
                        {monthData.isOpen && (
                          <div className="p-3 space-y-2">
                            {monthData.availableDates.map((date) => {
                              const dateStr = format(date, "yyyy-MM-dd");
                              const isUsed = isDateUsed(dateStr);
                              const isSelected = selectedDates.includes(dateStr);
                              
                              return (
                                <button
                                  key={dateStr}
                                  onClick={() => !isUsed && toggleDateSelection(dateStr)}
                                  disabled={isUsed}
                                  className={`w-full p-2 text-left rounded text-sm ${
                                    isUsed 
                                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                                      : isSelected
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                  }`}
                                >
                                  {format(date, "EEE d", { locale: es })}
                                  {isUsed && " (Ocupado)"}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected Dates Summary */}
              {selectedDates.length > 0 && (
                <div className="bg-white/10 p-3 rounded">
                  <h5 className="text-white font-medium mb-2">Fechas Seleccionadas:</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedDates.sort().map(dateStr => (
                      <span key={dateStr} className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                        {format(new Date(dateStr), "d MMM", { locale: es })}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={createPackage}
                  disabled={!newPackageRooms || selectedDates.length < 2}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Crear Paquete
                </Button>
                <Button
                  onClick={() => {
                    setShowCreatePackage(false);
                    setNewPackageRooms("");
                    setSelectedDates([]);
                  }}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailabilitySection;
