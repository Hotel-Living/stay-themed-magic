import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format, addMonths, startOfMonth, eachWeekOfInterval, startOfWeek, endOfWeek, isSameMonth } from "date-fns";

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  selectedDay?: string;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData,
  selectedDay = "monday"
}) => {
  const [isCreatingPackage, setIsCreatingPackage] = useState(false);
  const [packageRooms, setPackageRooms] = useState("");
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({});

  const weekdayMap: Record<string, number> = {
    "sunday": 0, "monday": 1, "tuesday": 2, "wednesday": 3,
    "thursday": 4, "friday": 5, "saturday": 6
  };

  const getWeekdayNumber = (day: string): number => {
    return weekdayMap[day.toLowerCase()] || 1;
  };

  const getAvailableDatesForMonth = (month: Date, weekdayNum: number): Date[] => {
    const dates: Date[] = [];
    const weeks = eachWeekOfInterval({
      start: startOfMonth(month),
      end: new Date(month.getFullYear(), month.getMonth() + 1, 0)
    }, { weekStartsOn: 1 });

    weeks.forEach(week => {
      const weekStart = startOfWeek(week, { weekStartsOn: 1 });
      const targetDate = new Date(weekStart);
      targetDate.setDate(targetDate.getDate() + (weekdayNum === 0 ? 6 : weekdayNum - 1));
      
      if (isSameMonth(targetDate, month)) {
        dates.push(targetDate);
      }
    });

    return dates;
  };

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths(prev => ({
      ...prev,
      [monthKey]: !prev[monthKey]
    }));
  };

  const toggleDateSelection = (dateStr: string) => {
    setSelectedDates(prev => 
      prev.includes(dateStr) 
        ? prev.filter(d => d !== dateStr)
        : [...prev, dateStr]
    );
  };

  const createPackage = () => {
    if (!packageRooms || selectedDates.length === 0) return;

    const newPackage = {
      id: Date.now().toString(),
      rooms: parseInt(packageRooms),
      dates: [...selectedDates],
      weekday: selectedDay,
      createdAt: new Date().toISOString()
    };

    const existingPackages = formData?.availabilityPackages || [];
    const updatedPackages = [...existingPackages, newPackage];

    if (updateFormData) {
      updateFormData('availabilityPackages', updatedPackages);
    }

    // Reset form
    setPackageRooms("");
    setSelectedDates([]);
    setIsCreatingPackage(false);
  };

  const existingPackages = formData?.availabilityPackages || [];
  const usedDates = existingPackages.flatMap((pkg: any) => pkg.dates || []);
  const currentDate = new Date();
  const weekdayNum = getWeekdayNumber(selectedDay);

  // Generate 12 months starting from current month
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = addMonths(startOfMonth(currentDate), i);
    const monthKey = format(month, 'yyyy-MM');
    const monthName = format(month, 'MMMM yyyy');
    const availableDates = getAvailableDatesForMonth(month, weekdayNum)
      .filter(date => !usedDates.includes(format(date, 'yyyy-MM-dd')));

    return {
      month,
      monthKey,
      monthName,
      availableDates
    };
  });

  // Split months into two columns
  const leftColumnMonths = months.slice(0, 6);
  const rightColumnMonths = months.slice(6, 12);

  return (
    <Accordion type="single" collapsible value={isOpen ? "availability" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="availability" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.5— PAQUETES DE DISPONIBILIDAD</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            {/* Existing packages list */}
            {existingPackages.length > 0 && (
              <div>
                <h4 className="font-medium text-white mb-3">Existing Packages ({existingPackages.length}/10)</h4>
                <div className="space-y-2">
                  {existingPackages.map((pkg: any) => (
                    <div key={pkg.id} className="bg-fuchsia-950/30 p-3 rounded-lg">
                      <p className="text-white">
                        {pkg.rooms} rooms • {pkg.dates?.length || 0} dates • {pkg.weekday}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Create new package button */}
            {!isCreatingPackage && existingPackages.length < 10 && (
              <Button 
                onClick={() => setIsCreatingPackage(true)}
                className="w-full"
              >
                Create New Package
              </Button>
            )}

            {/* Package creation form */}
            {isCreatingPackage && (
              <div className="space-y-4 border border-fuchsia-800/30 p-4 rounded-lg">
                <div>
                  <Label htmlFor="package-rooms" className="text-white">Number of available rooms</Label>
                  <Input
                    id="package-rooms"
                    type="number"
                    value={packageRooms}
                    onChange={(e) => setPackageRooms(e.target.value)}
                    className="bg-fuchsia-950/50 border-fuchsia-800/30 text-white mt-2"
                    min="1"
                  />
                  <p className="text-sm text-gray-400 mt-1">These rooms can be used as double or single rooms</p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-3">SELECCIÓN DE FECHAS</h4>
                  <p className="text-sm text-gray-300 mb-4">Seleccione las fechas de check-in y check-out de este paquete.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left column - First 6 months */}
                    <div className="space-y-2">
                      {leftColumnMonths.map(({ month, monthKey, monthName, availableDates }) => (
                        <div key={monthKey} className="border border-fuchsia-800/30 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleMonth(monthKey)}
                            className="w-full px-3 py-2 text-left bg-fuchsia-950/30 hover:bg-fuchsia-950/50 text-white font-medium"
                          >
                            {monthName} ({availableDates.length} available)
                          </button>
                          
                          {expandedMonths[monthKey] && (
                            <div className="p-3 space-y-2">
                              {availableDates.length > 0 ? (
                                availableDates.map(date => {
                                  const dateStr = format(date, 'yyyy-MM-dd');
                                  const dayName = format(date, 'EEEE');
                                  const dayNumber = format(date, 'd');
                                  
                                  return (
                                    <label
                                      key={dateStr}
                                      className="flex items-center space-x-2 cursor-pointer hover:bg-fuchsia-950/30 p-1 rounded"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedDates.includes(dateStr)}
                                        onChange={() => toggleDateSelection(dateStr)}
                                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50"
                                      />
                                      <span className="text-white text-sm">
                                        {dayName} {dayNumber}
                                      </span>
                                    </label>
                                  );
                                })
                              ) : (
                                <p className="text-gray-400 text-sm">No available dates</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Right column - Last 6 months */}
                    <div className="space-y-2">
                      {rightColumnMonths.map(({ month, monthKey, monthName, availableDates }) => (
                        <div key={monthKey} className="border border-fuchsia-800/30 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleMonth(monthKey)}
                            className="w-full px-3 py-2 text-left bg-fuchsia-950/30 hover:bg-fuchsia-950/50 text-white font-medium"
                          >
                            {monthName} ({availableDates.length} available)
                          </button>
                          
                          {expandedMonths[monthKey] && (
                            <div className="p-3 space-y-2">
                              {availableDates.length > 0 ? (
                                availableDates.map(date => {
                                  const dateStr = format(date, 'yyyy-MM-dd');
                                  const dayName = format(date, 'EEEE');
                                  const dayNumber = format(date, 'd');
                                  
                                  return (
                                    <label
                                      key={dateStr}
                                      className="flex items-center space-x-2 cursor-pointer hover:bg-fuchsia-950/30 p-1 rounded"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedDates.includes(dateStr)}
                                        onChange={() => toggleDateSelection(dateStr)}
                                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50"
                                      />
                                      <span className="text-white text-sm">
                                        {dayName} {dayNumber}
                                      </span>
                                    </label>
                                  );
                                })
                              ) : (
                                <p className="text-gray-400 text-sm">No available dates</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={createPackage}
                    disabled={!packageRooms || selectedDates.length === 0}
                    className="flex-1"
                  >
                    Create Package
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsCreatingPackage(false);
                      setPackageRooms("");
                      setSelectedDates([]);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AvailabilitySection;
