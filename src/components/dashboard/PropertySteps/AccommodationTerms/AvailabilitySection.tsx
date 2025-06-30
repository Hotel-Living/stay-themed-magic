import React, { useState } from "react";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

interface AvailabilityPackage {
  id: string;
  rooms: number;
  selectedDates: string[];
  checkinDates: string[];
  checkoutDates: string[];
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const [packages, setPackages] = useState<AvailabilityPackage[]>(
    formData?.availabilityPackages || []
  );
  const [showNewPackageForm, setShowNewPackageForm] = useState(false);
  const [newPackageRooms, setNewPackageRooms] = useState<number>(1);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [checkinDates, setCheckinDates] = useState<string[]>([]);
  const [checkoutDates, setCheckoutDates] = useState<string[]>([]);

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [expandedMonths, setExpandedMonths] = useState<{[key: string]: boolean}>({});

  const getMonthDates = (monthIndex: number, year: number) => {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const dates = [];
    
    for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 7)) {
      if (date.getDay() === 1) { // Monday
        dates.push(new Date(date));
      }
    }
    
    return dates;
  };

  const isDateUsed = (dateStr: string): boolean => {
    return packages.some(pkg => 
      pkg.selectedDates.includes(dateStr) || 
      pkg.checkinDates.includes(dateStr) || 
      pkg.checkoutDates.includes(dateStr)
    );
  };

  const handleDateSelect = (date: Date, type: 'checkin' | 'checkout') => {
    const dateStr = date.toISOString().split('T')[0];
    
    if (type === 'checkin') {
      const newCheckinDates = checkinDates.includes(dateStr)
        ? checkinDates.filter(d => d !== dateStr)
        : [...checkinDates, dateStr];
      setCheckinDates(newCheckinDates);
    } else {
      const newCheckoutDates = checkoutDates.includes(dateStr)
        ? checkoutDates.filter(d => d !== dateStr)
        : [...checkoutDates, dateStr];
      setCheckoutDates(newCheckoutDates);
    }
  };

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths(prev => ({
      ...prev,
      [monthKey]: !prev[monthKey]
    }));
  };

  const createPackage = () => {
    if (newPackageRooms > 0 && (checkinDates.length > 0 || checkoutDates.length > 0)) {
      const newPackage: AvailabilityPackage = {
        id: Date.now().toString(),
        rooms: newPackageRooms,
        selectedDates: [...selectedDates],
        checkinDates: [...checkinDates],
        checkoutDates: [...checkoutDates]
      };

      const updatedPackages = [...packages, newPackage];
      setPackages(updatedPackages);
      updateFormData('availabilityPackages', updatedPackages);

      // Reset form
      setNewPackageRooms(1);
      setSelectedDates([]);
      setCheckinDates([]);
      setCheckoutDates([]);
      setShowNewPackageForm(false);
    }
  };

  const deletePackage = (packageId: string) => {
    const updatedPackages = packages.filter(pkg => pkg.id !== packageId);
    setPackages(updatedPackages);
    updateFormData('availabilityPackages', updatedPackages);
  };

  const renderMonthCalendar = (monthIndex: number, year: number) => {
    const monthKey = `${year}-${monthIndex}`;
    const monthDates = getMonthDates(monthIndex, year);
    const isExpanded = expandedMonths[monthKey];

    return (
      <div key={monthKey} className="border rounded-lg bg-fuchsia-950/20">
        <button
          onClick={() => toggleMonth(monthKey)}
          className="w-full p-3 text-left flex items-center justify-between hover:bg-fuchsia-900/20"
        >
          <span className="font-medium">
            {months[monthIndex]} {year}
          </span>
          <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
        
        {isExpanded && (
          <div className="p-3 border-t border-fuchsia-800/20 space-y-2">
            <div className="text-sm text-fuchsia-300 mb-2">
              Check-in dates (Mondays):
            </div>
            {monthDates.map((date) => {
              const dateStr = date.toISOString().split('T')[0];
              const isUsed = isDateUsed(dateStr);
              const isCheckinSelected = checkinDates.includes(dateStr);
              const isCheckoutSelected = checkoutDates.includes(dateStr);

              return (
                <div key={dateStr} className="flex gap-2 items-center">
                  <div className="flex-1">
                    <span className={`text-sm ${isUsed ? 'text-gray-500 line-through' : 'text-white'}`}>
                      Lun {date.getDate()} {months[monthIndex]}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDateSelect(date, 'checkin')}
                      disabled={isUsed}
                      className={`px-2 py-1 text-xs rounded ${
                        isCheckinSelected
                          ? 'bg-green-600 text-white'
                          : isUsed
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-fuchsia-700 hover:bg-fuchsia-600 text-white'
                      }`}
                    >
                      Check-in
                    </button>
                    <button
                      onClick={() => handleDateSelect(date, 'checkout')}
                      disabled={isUsed}
                      className={`px-2 py-1 text-xs rounded ${
                        isCheckoutSelected
                          ? 'bg-red-600 text-white'
                          : isUsed
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-fuchsia-700 hover:bg-fuchsia-600 text-white'
                      }`}
                    >
                      Check-out
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderMonthsGrid = () => {
    const monthsToShow = [];
    
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const year = currentYear + Math.floor((currentMonth + i) / 12);
      monthsToShow.push({ monthIndex, year });
    }

    const leftColumn = monthsToShow.slice(0, 6);
    const rightColumn = monthsToShow.slice(6, 12);

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {leftColumn.map(({ monthIndex, year }) => 
            renderMonthCalendar(monthIndex, year)
          )}
        </div>
        <div className="space-y-2">
          {rightColumn.map(({ monthIndex, year }) => 
            renderMonthCalendar(monthIndex, year)
          )}
        </div>
      </div>
    );
  };

  return (
    <Collapsible 
      className="w-full mb-6 border rounded-lg overflow-hidden bg-fuchsia-900/10" 
      open={isOpen} 
      onOpenChange={onToggle}
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between py-3 px-4 text-left border-b border-fuchsia-800/20">
        <label className="block text-lg font-medium uppercase">
          Paquetes de Disponibilidad
        </label>
        <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="p-4">
        {/* Existing Packages */}
        {packages.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3">Paquetes Creados</h4>
            <div className="space-y-2">
              {packages.map((pkg) => (
                <div key={pkg.id} className="flex items-center justify-between p-3 bg-fuchsia-800/20 rounded-lg">
                  <div>
                    <span className="text-sm font-medium">
                      {pkg.rooms} habitaciones
                    </span>
                    <div className="text-xs text-fuchsia-300">
                      Check-ins: {pkg.checkinDates.length} | Check-outs: {pkg.checkoutDates.length}
                    </div>
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
          </div>
        )}

        {/* Create New Package Button */}
        {!showNewPackageForm && (
          <Button
            onClick={() => setShowNewPackageForm(true)}
            className="mb-4 bg-fuchsia-700 hover:bg-fuchsia-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear Nuevo Paquete
          </Button>
        )}

        {/* New Package Form */}
        {showNewPackageForm && (
          <div className="space-y-4 mb-6 p-4 bg-fuchsia-800/10 rounded-lg">
            <div>
              <Label htmlFor="rooms" className="text-sm font-medium">
                Número de habitaciones disponibles
              </Label>
              <Input
                id="rooms"
                type="number"
                min="1"
                value={newPackageRooms}
                onChange={(e) => setNewPackageRooms(parseInt(e.target.value) || 1)}
                className="mt-1 bg-fuchsia-950/50 border-fuchsia-800/50"
              />
              <p className="text-xs text-fuchsia-300 mt-1">
                Estas habitaciones pueden utilizarse como dobles o individuales
              </p>
            </div>

            <div>
              <h4 className="text-md font-medium mb-2">Selección de Fechas</h4>
              <p className="text-sm text-fuchsia-300 mb-4">
                Seleccione las fechas de check-in y check-out de este paquete.
              </p>
              
              <div className="mb-4">
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded"></div>
                    <span>Check-in seleccionado: {checkinDates.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded"></div>
                    <span>Check-out seleccionado: {checkoutDates.length}</span>
                  </div>
                </div>
              </div>

              {renderMonthsGrid()}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={createPackage}
                disabled={newPackageRooms <= 0 || (checkinDates.length === 0 && checkoutDates.length === 0)}
                className="bg-green-700 hover:bg-green-600"
              >
                Crear Paquete
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowNewPackageForm(false);
                  setNewPackageRooms(1);
                  setSelectedDates([]);
                  setCheckinDates([]);
                  setCheckoutDates([]);
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AvailabilitySection;
