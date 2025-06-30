import React, { useState, useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { format, addMonths, startOfMonth, eachDayOfInterval, endOfMonth } from "date-fns";

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  selectedDay?: string;
}

interface AvailabilityPackage {
  id: string;
  rooms: number;
  dates: string[];
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData,
  selectedDay = "monday"
}) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newPackageRooms, setNewPackageRooms] = useState<number>(1);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  const packages: AvailabilityPackage[] = formData?.availabilityPackages || [];

  // Get day number from selected day
  const dayMap: { [key: string]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  };

  const selectedDayNumber = dayMap[selectedDay.toLowerCase()] || 1;

  // Generate 12 months starting from current month
  const months = useMemo(() => {
    const currentDate = new Date();
    return Array.from({ length: 12 }, (_, index) => {
      return startOfMonth(addMonths(currentDate, index));
    });
  }, []);

  // Get available dates for a specific month (only the selected weekday)
  const getAvailableDatesForMonth = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    return allDays.filter(day => day.getDay() === selectedDayNumber);
  };

  // Get used dates from all packages
  const usedDates = useMemo(() => {
    return packages.flatMap(pkg => pkg.dates);
  }, [packages]);

  const toggleMonth = (monthKey: string) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(monthKey)) {
      newExpanded.delete(monthKey);
    } else {
      newExpanded.add(monthKey);
    }
    setExpandedMonths(newExpanded);
  };

  const toggleDate = (dateString: string) => {
    if (usedDates.includes(dateString)) return; // Don't allow selecting used dates
    
    setSelectedDates(prev => 
      prev.includes(dateString) 
        ? prev.filter(d => d !== dateString)
        : [...prev, dateString]
    );
  };

  const createPackage = () => {
    if (selectedDates.length === 0 || newPackageRooms < 1) return;

    const newPackage: AvailabilityPackage = {
      id: Date.now().toString(),
      rooms: newPackageRooms,
      dates: [...selectedDates].sort()
    };

    const updatedPackages = [...packages, newPackage];
    
    if (updateFormData) {
      updateFormData('availabilityPackages', updatedPackages);
    }

    // Reset form
    setSelectedDates([]);
    setNewPackageRooms(1);
    setIsCreatingNew(false);
  };

  const deletePackage = (packageId: string) => {
    const updatedPackages = packages.filter(pkg => pkg.id !== packageId);
    if (updateFormData) {
      updateFormData('availabilityPackages', updatedPackages);
    }
  };

  const getDayName = (dayNum: number) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayNum];
  };

  // Split months into two columns
  const leftColumnMonths = months.slice(0, 6);
  const rightColumnMonths = months.slice(6, 12);

  return (
    <Accordion type="single" collapsible value={isOpen ? "availability" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="availability" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.3— PAQUETES DE DISPONIBILIDAD</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            {/* Existing packages */}
            {packages.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-white">Paquetes Creados:</h4>
                {packages.map(pkg => (
                  <div key={pkg.id} className="flex items-center justify-between p-3 bg-fuchsia-800/20 rounded-lg">
                    <div>
                      <span className="text-white font-medium">{pkg.rooms} habitaciones</span>
                      <span className="text-gray-300 ml-2">({pkg.dates.length} fechas)</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deletePackage(pkg.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Create new package section */}
            <div className="space-y-4">
              {!isCreatingNew ? (
                <Button
                  onClick={() => setIsCreatingNew(true)}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Nuevo Paquete
                </Button>
              ) : (
                <div className="space-y-4 p-4 border border-fuchsia-800/30 rounded-lg">
                  {/* Rooms input */}
                  <div className="space-y-2">
                    <Label htmlFor="rooms" className="text-white">
                      Número de habitaciones disponibles
                    </Label>
                    <Input
                      id="rooms"
                      type="number"
                      min="1"
                      value={newPackageRooms}
                      onChange={(e) => setNewPackageRooms(parseInt(e.target.value) || 1)}
                      className="bg-fuchsia-950/50 border-fuchsia-800/50 text-white"
                    />
                    <p className="text-sm text-gray-400">
                      Estas habitaciones pueden utilizarse como dobles o individuales.
                    </p>
                  </div>

                  {/* Date selection */}
                  <div className="space-y-3">
                    <h4 className="text-white font-medium">SELECCIÓN DE FECHAS</h4>
                    <p className="text-sm text-gray-400">
                      Seleccione las fechas de check-in y check-out de este paquete.
                    </p>
                    
                    {/* Two-column calendar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left column */}
                      <div className="space-y-2">
                        {leftColumnMonths.map(month => {
                          const monthKey = format(month, 'yyyy-MM');
                          const availableDates = getAvailableDatesForMonth(month);
                          const isExpanded = expandedMonths.has(monthKey);
                          
                          return (
                            <div key={monthKey} className="border border-fuchsia-800/30 rounded-lg overflow-hidden">
                              <button
                                onClick={() => toggleMonth(monthKey)}
                                className="w-full p-3 text-left bg-fuchsia-900/20 hover:bg-fuchsia-900/30 text-white transition-colors"
                              >
                                {format(month, 'MMMM yyyy')}
                              </button>
                              {isExpanded && (
                                <div className="p-3 space-y-2">
                                  {availableDates.map(date => {
                                    const dateString = format(date, 'yyyy-MM-dd');
                                    const isUsed = usedDates.includes(dateString);
                                    const isSelected = selectedDates.includes(dateString);
                                    
                                    return (
                                      <button
                                        key={dateString}
                                        onClick={() => !isUsed && toggleDate(dateString)}
                                        disabled={isUsed}
                                        className={`w-full p-2 text-left rounded transition-colors ${
                                          isUsed 
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : isSelected
                                            ? 'bg-green-600 text-white'
                                            : 'bg-fuchsia-950/50 text-white hover:bg-fuchsia-800/50'
                                        }`}
                                      >
                                        {getDayName(date.getDay())} {format(date, 'd')}
                                        {isUsed && ' (No disponible)'}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Right column */}
                      <div className="space-y-2">
                        {rightColumnMonths.map(month => {
                          const monthKey = format(month, 'yyyy-MM');
                          const availableDates = getAvailableDatesForMonth(month);
                          const isExpanded = expandedMonths.has(monthKey);
                          
                          return (
                            <div key={monthKey} className="border border-fuchsia-800/30 rounded-lg overflow-hidden">
                              <button
                                onClick={() => toggleMonth(monthKey)}
                                className="w-full p-3 text-left bg-fuchsia-900/20 hover:bg-fuchsia-900/30 text-white transition-colors"
                              >
                                {format(month, 'MMMM yyyy')}
                              </button>
                              {isExpanded && (
                                <div className="p-3 space-y-2">
                                  {availableDates.map(date => {
                                    const dateString = format(date, 'yyyy-MM-dd');
                                    const isUsed = usedDates.includes(dateString);
                                    const isSelected = selectedDates.includes(dateString);
                                    
                                    return (
                                      <button
                                        key={dateString}
                                        onClick={() => !isUsed && toggleDate(dateString)}
                                        disabled={isUsed}
                                        className={`w-full p-2 text-left rounded transition-colors ${
                                          isUsed 
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : isSelected
                                            ? 'bg-green-600 text-white'
                                            : 'bg-fuchsia-950/50 text-white hover:bg-fuchsia-800/50'
                                        }`}
                                      >
                                        {getDayName(date.getDay())} {format(date, 'd')}
                                        {isUsed && ' (No disponible)'}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={createPackage}
                      disabled={selectedDates.length === 0 || newPackageRooms < 1}
                      className="flex-1"
                    >
                      Crear Paquete
                    </Button>
                    <Button
                      onClick={() => {
                        setIsCreatingNew(false);
                        setSelectedDates([]);
                        setNewPackageRooms(1);
                      }}
                      variant="outline"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AvailabilitySection;
