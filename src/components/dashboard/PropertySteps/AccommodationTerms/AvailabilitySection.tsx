
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { format, addMonths, startOfMonth, isSameDay, parseISO } from "date-fns";
import { weekdayMap } from "../rooms/roomTypes/availabilityDateUtils";

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

interface AvailabilityPackage {
  id: string;
  roomsAvailable: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [packageStep, setPackageStep] = useState(1);
  const [newPackage, setNewPackage] = useState({
    roomsAvailable: 1,
    startDate: "",
    endDate: ""
  });

  // Get existing packages
  const existingPackages: AvailabilityPackage[] = formData?.availabilityPackages || [];
  
  // Get preferred weekday from step 3.4
  const preferredWeekday = formData?.checkinDay || "monday";
  const preferredDayNum = weekdayMap[preferredWeekday] || 1;

  // Generate rolling 12-month window starting from next month
  const generateMonths = () => {
    const currentDate = new Date();
    const nextMonth = addMonths(currentDate, 1);
    const months = [];
    
    for (let i = 0; i < 12; i++) {
      const monthDate = addMonths(nextMonth, i);
      months.push({
        date: monthDate,
        name: format(monthDate, 'MMMM yyyy'),
        monthYear: format(monthDate, 'yyyy-MM')
      });
    }
    
    return months;
  };

  const months = generateMonths();
  const leftMonths = months.slice(0, 6);
  const rightMonths = months.slice(6, 12);

  // Get valid check-in dates for a specific month
  const getValidDatesForMonth = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const validDates = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() === preferredDayNum) {
        validDates.push(date);
      }
    }

    return validDates;
  };

  const handleStartAddingPackage = () => {
    setIsAddingPackage(true);
    setPackageStep(1);
    setNewPackage({
      roomsAvailable: 1,
      startDate: "",
      endDate: ""
    });
  };

  const handleRoomsChange = (rooms: number) => {
    setNewPackage(prev => ({ ...prev, roomsAvailable: rooms }));
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    
    if (!newPackage.startDate) {
      setNewPackage(prev => ({ ...prev, startDate: dateStr }));
    } else if (!newPackage.endDate) {
      // Ensure end date is after start date
      const startDate = parseISO(newPackage.startDate);
      if (date >= startDate) {
        setNewPackage(prev => ({ ...prev, endDate: dateStr }));
        setPackageStep(4);
      }
    }
  };

  const handleSavePackage = () => {
    const packageToAdd: AvailabilityPackage = {
      id: crypto.randomUUID(),
      roomsAvailable: newPackage.roomsAvailable,
      startDate: newPackage.startDate,
      endDate: newPackage.endDate,
      createdAt: new Date().toISOString()
    };

    const updatedPackages = [...existingPackages, packageToAdd];
    
    if (updateFormData) {
      updateFormData('availabilityPackages', updatedPackages);
    }

    // Reset state
    setIsAddingPackage(false);
    setPackageStep(1);
    setNewPackage({
      roomsAvailable: 1,
      startDate: "",
      endDate: ""
    });
  };

  const handleDeletePackage = (packageId: string) => {
    const updatedPackages = existingPackages.filter(pkg => pkg.id !== packageId);
    if (updateFormData) {
      updateFormData('availabilityPackages', updatedPackages);
    }
  };

  const renderExistingPackages = () => {
    if (existingPackages.length === 0) return null;

    return (
      <div className="space-y-4 mb-6">
        <h4 className="text-md font-medium">Existing Availability Packages</h4>
        {existingPackages.slice(0, 10).map((pkg) => (
          <div key={pkg.id} className="border rounded-lg p-4 bg-fuchsia-900/5">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{pkg.roomsAvailable} room(s) available</p>
                <p className="text-sm text-gray-300">
                  From {format(parseISO(pkg.startDate), 'PPP')} to {format(parseISO(pkg.endDate), 'PPP')}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeletePackage(pkg.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAddPackageFlow = () => {
    if (!isAddingPackage) {
      return (
        <Button onClick={handleStartAddingPackage} className="w-full">
          Add New Availability Package
        </Button>
      );
    }

    if (packageStep === 1) {
      return (
        <div className="space-y-4">
          <h4 className="text-md font-medium">Step 1: Number of Rooms</h4>
          <div className="flex items-center space-x-4">
            <label className="text-sm">Rooms available:</label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRoomsChange(Math.max(1, newPackage.roomsAvailable - 1))}
              >
                -
              </Button>
              <span className="w-8 text-center">{newPackage.roomsAvailable}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRoomsChange(newPackage.roomsAvailable + 1)}
              >
                +
              </Button>
            </div>
          </div>
          <Button onClick={() => setPackageStep(2)}>Continue to Date Selection</Button>
        </div>
      );
    }

    if (packageStep === 2) {
      return (
        <div className="space-y-4">
          <h4 className="text-md font-medium">Step 2: Select Dates Within Rolling 12-Month Window</h4>
          <p className="text-sm text-gray-300">
            {!newPackage.startDate 
              ? "Select your first check-in date (only valid check-in days are shown)"
              : "Select your final check-in date to complete the package range"
            }
          </p>
          
          {newPackage.startDate && (
            <div className="p-3 bg-fuchsia-900/20 rounded">
              <p className="text-sm">Start date selected: {format(parseISO(newPackage.startDate), 'PPP')}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            {/* Left column - first 6 months */}
            <div className="space-y-4">
              {leftMonths.map((month) => {
                const validDates = getValidDatesForMonth(month.date);
                return (
                  <div key={month.monthYear} className="border rounded-lg p-4">
                    <h5 className="font-medium mb-3 text-center bg-fuchsia-600 text-white py-2 rounded">
                      {month.name}
                    </h5>
                    <div className="grid grid-cols-4 gap-2">
                      {validDates.map((date) => {
                        const dateStr = format(date, 'yyyy-MM-dd');
                        const isSelected = dateStr === newPackage.startDate || dateStr === newPackage.endDate;
                        const isDisabled = newPackage.startDate && !newPackage.endDate && date < parseISO(newPackage.startDate);
                        
                        return (
                          <Button
                            key={dateStr}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleDateSelect(date)}
                            disabled={isDisabled}
                            className="text-xs"
                          >
                            {format(date, 'd')}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right column - last 6 months */}
            <div className="space-y-4">
              {rightMonths.map((month) => {
                const validDates = getValidDatesForMonth(month.date);
                return (
                  <div key={month.monthYear} className="border rounded-lg p-4">
                    <h5 className="font-medium mb-3 text-center bg-fuchsia-600 text-white py-2 rounded">
                      {month.name}
                    </h5>
                    <div className="grid grid-cols-4 gap-2">
                      {validDates.map((date) => {
                        const dateStr = format(date, 'yyyy-MM-dd');
                        const isSelected = dateStr === newPackage.startDate || dateStr === newPackage.endDate;
                        const isDisabled = newPackage.startDate && !newPackage.endDate && date < parseISO(newPackage.startDate);
                        
                        return (
                          <Button
                            key={dateStr}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleDateSelect(date)}
                            disabled={isDisabled}
                            className="text-xs"
                          >
                            {format(date, 'd')}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setPackageStep(1)}>Back</Button>
            <Button variant="outline" onClick={() => setIsAddingPackage(false)}>Cancel</Button>
          </div>
        </div>
      );
    }

    if (packageStep === 4) {
      return (
        <div className="space-y-4">
          <h4 className="text-md font-medium">Step 4: Save Package</h4>
          <div className="p-4 border rounded-lg bg-fuchsia-900/10">
            <h5 className="font-medium mb-2">Package Summary:</h5>
            <p>Rooms available: {newPackage.roomsAvailable}</p>
            <p>Start date: {format(parseISO(newPackage.startDate), 'PPP')}</p>
            <p>End date: {format(parseISO(newPackage.endDate), 'PPP')}</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSavePackage}>Add Availability Package</Button>
            <Button variant="outline" onClick={() => setPackageStep(2)}>Back to Dates</Button>
            <Button variant="outline" onClick={() => setIsAddingPackage(false)}>Cancel</Button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Accordion type="single" collapsible value={isOpen ? "availability" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="availability" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.5— AVAILABILITY PACKAGES</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            <p className="text-gray-300">
              Select the months when your property will be available and configure availability packages.
            </p>

            {renderExistingPackages()}
            {renderAddPackageFlow()}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AvailabilitySection;
