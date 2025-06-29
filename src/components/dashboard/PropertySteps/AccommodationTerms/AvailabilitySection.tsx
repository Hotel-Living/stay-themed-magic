
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomCalendarSingleWeekday from "../rooms/roomTypes/CustomCalendarSingleWeekday";
import { weekdayMap } from "../rooms/roomTypes/availabilityDateUtils";
import { useAvailabilityDates } from "./hooks/useAvailabilityDates";
import { useTranslation } from "@/hooks/useTranslation";

interface AvailabilityPackage {
  id: string;
  rooms: number;
  dates: string[];
}

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = React.useState<Date>(new Date());
  const [selectedDates, setSelectedDates] = React.useState<string[]>(formData?.availability_dates || []);
  const [availabilityPackages, setAvailabilityPackages] = React.useState<AvailabilityPackage[]>(
    formData?.availability_packages || []
  );
  const [newPackageRooms, setNewPackageRooms] = React.useState<number>(1);
  const [newPackageDates, setNewPackageDates] = React.useState<string[]>([]);
  const [isCreatingPackage, setIsCreatingPackage] = React.useState<boolean>(false);
  
  const { availableMonths, toggleMonth } = useAvailabilityDates(formData, updateFormData);
  
  const preferredWeekday = formData?.preferredWeekday || "Monday";
  const preferredDayNum = weekdayMap[preferredWeekday] || 1;

  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  // Get all dates that are already used in packages
  const usedDates = React.useMemo(() => {
    return availabilityPackages.flatMap(pkg => pkg.dates);
  }, [availabilityPackages]);

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    
    if (isCreatingPackage) {
      // For package creation
      const newDates = newPackageDates.includes(dateString)
        ? newPackageDates.filter(d => d !== dateString)
        : [...newPackageDates, dateString];
      setNewPackageDates(newDates);
    } else {
      // For individual date selection
      const newDates = selectedDates.includes(dateString)
        ? selectedDates.filter(d => d !== dateString)
        : [...selectedDates, dateString];
      
      setSelectedDates(newDates);
      if (updateFormData) {
        updateFormData('availability_dates', newDates);
      }
    }
  };

  const handleMonthSelect = (monthValue: string) => {
    const isSelected = availableMonths.includes(monthValue);
    toggleMonth(monthValue);
    
    if (!isSelected) {
      const [monthName, year] = monthValue.split(' ');
      const monthIndex = months.indexOf(monthName.toLowerCase());
      if (monthIndex !== -1) {
        const monthDate = new Date(parseInt(year), monthIndex, 1);
        setSelectedMonth(monthDate);
      }
    }
  };

  const createAvailabilityPackage = () => {
    if (newPackageDates.length === 0 || newPackageRooms < 1) return;
    
    const newPackage: AvailabilityPackage = {
      id: Date.now().toString(),
      rooms: newPackageRooms,
      dates: [...newPackageDates]
    };
    
    const updatedPackages = [...availabilityPackages, newPackage];
    setAvailabilityPackages(updatedPackages);
    
    if (updateFormData) {
      updateFormData('availability_packages', updatedPackages);
    }
    
    // Reset creation state
    setNewPackageDates([]);
    setNewPackageRooms(1);
    setIsCreatingPackage(false);
  };

  const removeAvailabilityPackage = (packageId: string) => {
    const updatedPackages = availabilityPackages.filter(pkg => pkg.id !== packageId);
    setAvailabilityPackages(updatedPackages);
    
    if (updateFormData) {
      updateFormData('availability_packages', updatedPackages);
    }
  };

  const getAvailableDatesForCalendar = () => {
    if (isCreatingPackage) {
      return usedDates.concat(selectedDates);
    }
    return usedDates;
  };

  return (
    <Accordion type="single" collapsible value={isOpen ? "availability" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="availability" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.3— PAQUETES DE DISPONIBILIDAD</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            <p className="text-gray-300">
              Seleccione fechas específicas de check-in (solo los lunes) o meses completos:
            </p>

            {/* Month Selection Dropdown */}
            <div className="space-y-4">
              <Select onValueChange={handleMonthSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="junio 2025" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => {
                    const monthValueCurrent = `${month} ${currentYear}`;
                    const monthValueNext = `${month} ${nextYear}`;
                    return (
                      <React.Fragment key={month}>
                        <SelectItem 
                          value={monthValueCurrent}
                          disabled={availableMonths.includes(monthValueCurrent)}
                        >
                          {month.charAt(0).toUpperCase() + month.slice(1)} {currentYear}
                          {availableMonths.includes(monthValueCurrent) && " ✓"}
                        </SelectItem>
                        <SelectItem 
                          value={monthValueNext}
                          disabled={availableMonths.includes(monthValueNext)}
                        >
                          {month.charAt(0).toUpperCase() + month.slice(1)} {nextYear}
                          {availableMonths.includes(monthValueNext) && " ✓"}
                        </SelectItem>
                      </React.Fragment>
                    );
                  })}
                </SelectContent>
              </Select>
              
              {availableMonths.length === 0 && selectedDates.length === 0 && availabilityPackages.length === 0 && (
                <p className="text-sm text-gray-400">Aún no se han seleccionado fechas</p>
              )}
            </div>

            {/* Individual Date Selection Calendar */}
            {!isCreatingPackage && (
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-white">Fechas Individuales</h4>
                <CustomCalendarSingleWeekday
                  month={selectedMonth}
                  preferredDayNum={preferredDayNum}
                  selected={selectedDates}
                  preferredWeekday={preferredWeekday}
                  onSelectDate={handleDateSelect}
                  excludedDates={usedDates}
                />
              </div>
            )}

            {/* Availability Packages Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-semibold text-white">Paquetes de Disponibilidad</h4>
                <span className="text-sm text-gray-400">({availabilityPackages.length}/10)</span>
              </div>
              
              {availabilityPackages.length < 10 && !isCreatingPackage && (
                <Button 
                  onClick={() => setIsCreatingPackage(true)}
                  className="w-full"
                  variant="outline"
                >
                  Crear Nuevo Paquete
                </Button>
              )}

              {/* Package Creation Form */}
              {isCreatingPackage && (
                <div className="space-y-4 p-4 border border-purple-500/30 rounded-lg bg-purple-900/20">
                  <h5 className="text-sm font-semibold text-white">Crear Nuevo Paquete ({(availabilityPackages.length + 1)}/10):</h5>
                  
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Número de habitaciones disponibles:</label>
                    <Input
                      type="number"
                      min="1"
                      value={newPackageRooms}
                      onChange={(e) => setNewPackageRooms(parseInt(e.target.value) || 1)}
                      className="w-full bg-fuchsia-950/50 border border-white rounded-lg p-3 text-white"
                    />
                    <p className="text-xs text-gray-400 mt-1">Estas habitaciones pueden usarse como dobles o individuales</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Seleccionar fechas para este paquete:</label>
                    <CustomCalendarSingleWeekday
                      month={selectedMonth}
                      preferredDayNum={preferredDayNum}
                      selected={newPackageDates}
                      preferredWeekday={preferredWeekday}
                      onSelectDate={handleDateSelect}
                      excludedDates={getAvailableDatesForCalendar()}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={createAvailabilityPackage}
                      disabled={newPackageDates.length === 0 || newPackageRooms < 1}
                      className="flex-1"
                    >
                      Crear Paquete
                    </Button>
                    <Button 
                      onClick={() => {
                        setIsCreatingPackage(false);
                        setNewPackageDates([]);
                        setNewPackageRooms(1);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}

              {/* Display Created Packages */}
              {availabilityPackages.map((pkg, index) => (
                <div key={pkg.id} className="p-4 border border-green-500/30 rounded-lg bg-green-900/20">
                  <div className="flex items-center justify-between mb-2">
                    <h6 className="text-sm font-semibold text-white">Paquete {index + 1}</h6>
                    <Button 
                      onClick={() => removeAvailabilityPackage(pkg.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Eliminar
                    </Button>
                  </div>
                  <p className="text-sm text-gray-300">Habitaciones: {pkg.rooms}</p>
                  <p className="text-sm text-gray-300">
                    Fechas: {pkg.dates.length} fecha{pkg.dates.length !== 1 ? 's' : ''} seleccionada{pkg.dates.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Estas habitaciones pueden usarse como dobles o individuales</p>
                </div>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AvailabilitySection;
