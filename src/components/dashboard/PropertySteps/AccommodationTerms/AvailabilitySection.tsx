
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, addMonths, startOfMonth, isSameDay, addDays } from "date-fns";
import { weekdayMap } from "../rooms/roomTypes/availabilityDateUtils";

interface AvailabilityPackage {
  id: string;
  roomCount: number;
  dates: string[];
  startDate?: Date;
  endDate?: Date;
}

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const [availabilityPackages, setAvailabilityPackages] = useState<AvailabilityPackage[]>(
    formData?.availabilityPackages || []
  );
  const [selectedDates, setSelectedDates] = useState<string[]>(
    formData?.selectedAvailabilityDates || []
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [creatingPackage, setCreatingPackage] = useState(false);
  const [packageRoomCount, setPackageRoomCount] = useState<number>(1);
  const [packageDates, setPackageDates] = useState<Date[]>([]);

  const preferredWeekday = formData?.checkinDay || "monday";
  const preferredDayNum = weekdayMap[preferredWeekday] || 1;

  // Get all dates that are already used in packages
  const getUsedDates = () => {
    const usedDates = new Set<string>();
    availabilityPackages.forEach(pkg => {
      pkg.dates.forEach(date => usedDates.add(date));
    });
    selectedDates.forEach(date => usedDates.add(date));
    return usedDates;
  };

  const isDateUsed = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return getUsedDates().has(dateStr);
  };

  const isDateSelectable = (date: Date) => {
    return date.getDay() === preferredDayNum && !isDateUsed(date);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || !isDateSelectable(date)) return;

    if (creatingPackage) {
      // Handle package creation date selection
      const newDates = [...packageDates];
      const existingIndex = newDates.findIndex(d => isSameDay(d, date));
      
      if (existingIndex >= 0) {
        newDates.splice(existingIndex, 1);
      } else if (newDates.length < 2) {
        newDates.push(date);
        newDates.sort((a, b) => a.getTime() - b.getTime());
      }
      
      setPackageDates(newDates);
    } else {
      // Handle individual date selection
      const dateStr = format(date, 'yyyy-MM-dd');
      const newSelectedDates = selectedDates.includes(dateStr)
        ? selectedDates.filter(d => d !== dateStr)
        : [...selectedDates, dateStr];
      
      setSelectedDates(newSelectedDates);
      updateFormData('selectedAvailabilityDates', newSelectedDates);
    }
  };

  const createPackage = () => {
    if (packageDates.length === 2 && packageRoomCount > 0) {
      const [startDate, endDate] = packageDates.sort((a, b) => a.getTime() - b.getTime());
      
      // Generate all dates in the range according to stay length
      const stayLength = formData?.stayLengths?.[0] || 8;
      const packageDateStrings: string[] = [];
      let currentDate = startDate;
      
      while (currentDate <= endDate) {
        if (currentDate.getDay() === preferredDayNum) {
          packageDateStrings.push(format(currentDate, 'yyyy-MM-dd'));
        }
        currentDate = addDays(currentDate, 7); // Move to next week
      }

      const newPackage: AvailabilityPackage = {
        id: Date.now().toString(),
        roomCount: packageRoomCount,
        dates: packageDateStrings,
        startDate,
        endDate
      };

      const updatedPackages = [...availabilityPackages, newPackage];
      setAvailabilityPackages(updatedPackages);
      updateFormData('availabilityPackages', updatedPackages);

      // Reset creation state
      setCreatingPackage(false);
      setPackageDates([]);
      setPackageRoomCount(1);
    }
  };

  const deletePackage = (packageId: string) => {
    const updatedPackages = availabilityPackages.filter(pkg => pkg.id !== packageId);
    setAvailabilityPackages(updatedPackages);
    updateFormData('availabilityPackages', updatedPackages);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => addMonths(prev, direction === 'next' ? 1 : -1));
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => onToggle(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-white">
          3.3 - Paquetes de Disponibilidad
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-white" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white" />
        )}
      </div>

      {isOpen && (
        <div className="mt-6 space-y-6">
          {/* Individual Date Selection */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Select Individual Dates</h4>
            
            {/* Month Navigation */}
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="text-white border-white/20 hover:bg-white/10"
              >
                Previous
              </Button>
              <span className="text-white font-medium">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="text-white border-white/20 hover:bg-white/10"
              >
                Next
              </Button>
            </div>

            {/* Calendar */}
            <div className="bg-white/5 p-4 rounded-lg">
              <Calendar
                mode="multiple"
                selected={selectedDates.map(d => new Date(d))}
                onSelect={(dates) => {
                  if (dates) {
                    const dateStrings = Array.isArray(dates) 
                      ? dates.map(d => format(d, 'yyyy-MM-dd'))
                      : [format(dates, 'yyyy-MM-dd')];
                    setSelectedDates(dateStrings);
                    updateFormData('selectedAvailabilityDates', dateStrings);
                  }
                }}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                disabled={(date) => !isDateSelectable(date)}
                className="text-white"
              />
            </div>
          </div>

          {/* Availability Packages */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-white">Availability Packages</h4>
              {availabilityPackages.length < 10 && !creatingPackage && (
                <Button
                  onClick={() => setCreatingPackage(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Package
                </Button>
              )}
            </div>

            {/* Create Package Form */}
            {creatingPackage && (
              <div className="bg-white/5 p-4 rounded-lg space-y-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Number of Rooms
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={packageRoomCount}
                      onChange={(e) => setPackageRoomCount(parseInt(e.target.value) || 1)}
                      className="w-24 bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Select Check-in and Check-out Dates (max 2)
                  </label>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <Calendar
                      mode="multiple"
                      selected={packageDates}
                      onSelect={(dates) => {
                        if (dates && Array.isArray(dates) && dates.length <= 2) {
                          setPackageDates(dates);
                        }
                      }}
                      month={currentMonth}
                      onMonthChange={setCurrentMonth}
                      disabled={(date) => !isDateSelectable(date) || packageDates.length >= 2}
                      className="text-white"
                    />
                  </div>
                  <p className="text-sm text-gray-300 mt-2">
                    These rooms can be used as double or single
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={createPackage}
                    disabled={packageDates.length !== 2 || packageRoomCount < 1}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    Create Package
                  </Button>
                  <Button
                    onClick={() => {
                      setCreatingPackage(false);
                      setPackageDates([]);
                      setPackageRoomCount(1);
                    }}
                    variant="outline"
                    className="text-white border-white/20 hover:bg-white/10"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Package List */}
            {availabilityPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white/5 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">
                      {pkg.roomCount} rooms - {pkg.dates.length} dates
                    </p>
                    {pkg.startDate && pkg.endDate && (
                      <p className="text-sm text-gray-300">
                        {format(pkg.startDate, 'MMM d, yyyy')} - {format(pkg.endDate, 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => deletePackage(pkg.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-400 border-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilitySection;
