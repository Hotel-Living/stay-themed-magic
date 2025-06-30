
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  // Generate rolling 12-month window starting from current month
  const generateMonthsFromCurrent = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 1; i <= 12; i++) {
      const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const monthName = targetDate.toLocaleDateString('en-US', { month: 'long' });
      const year = targetDate.getFullYear();
      months.push(`${monthName} ${year}`);
    }
    
    return months;
  };

  const availableMonths = generateMonthsFromCurrent();
  const [selectedMonths, setSelectedMonths] = React.useState<Record<string, boolean>>(
    formData?.selectedMonths || {}
  );
  const [expandedMonths, setExpandedMonths] = React.useState<Record<string, boolean>>({});
  const [packageData, setPackageData] = React.useState<Record<string, { dates: string[]; rooms: number }>>(
    formData?.availabilityPackages || {}
  );

  const toggleMonth = (month: string) => {
    const newSelectedMonths = {
      ...selectedMonths,
      [month]: !selectedMonths[month]
    };
    setSelectedMonths(newSelectedMonths);
    
    if (updateFormData) {
      updateFormData('selectedMonths', newSelectedMonths);
    }
  };

  const toggleMonthExpansion = (month: string) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  const updatePackageRooms = (month: string, rooms: number) => {
    const newPackageData = {
      ...packageData,
      [month]: {
        ...packageData[month],
        rooms: rooms
      }
    };
    setPackageData(newPackageData);
    
    if (updateFormData) {
      updateFormData('availabilityPackages', newPackageData);
    }
  };

  return (
    <Accordion type="single" collapsible value={isOpen ? "availability" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="availability" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.5— PAQUETES DE DISPONIBILIDAD</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <p className="text-gray-300">Select the months when your property will be available and configure availability packages.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Left column - first 6 months */}
              <div className="space-y-2">
                {availableMonths.slice(0, 6).map((month) => (
                  <div key={month} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant={selectedMonths[month] ? "default" : "outline"}
                        onClick={() => toggleMonth(month)}
                        className="flex-1 justify-start"
                      >
                        {month}
                      </Button>
                      {selectedMonths[month] && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleMonthExpansion(month)}
                          className="text-white"
                        >
                          {expandedMonths[month] ? '−' : '+'}
                        </Button>
                      )}
                    </div>
                    
                    {selectedMonths[month] && expandedMonths[month] && (
                      <div className="ml-4 p-3 bg-fuchsia-950/30 rounded-lg space-y-2">
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-white">Rooms available:</label>
                          <Input
                            type="number"
                            min="1"
                            value={packageData[month]?.rooms || 1}
                            onChange={(e) => updatePackageRooms(month, parseInt(e.target.value) || 1)}
                            className="w-20 bg-fuchsia-900/50 border-fuchsia-700 text-white"
                          />
                        </div>
                        <p className="text-xs text-gray-400">Configure available dates for this month</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Right column - last 6 months */}
              <div className="space-y-2">
                {availableMonths.slice(6, 12).map((month) => (
                  <div key={month} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant={selectedMonths[month] ? "default" : "outline"}
                        onClick={() => toggleMonth(month)}
                        className="flex-1 justify-start"
                      >
                        {month}
                      </Button>
                      {selectedMonths[month] && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleMonthExpansion(month)}
                          className="text-white"
                        >
                          {expandedMonths[month] ? '−' : '+'}
                        </Button>
                      )}
                    </div>
                    
                    {selectedMonths[month] && expandedMonths[month] && (
                      <div className="ml-4 p-3 bg-fuchsia-950/30 rounded-lg space-y-2">
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-white">Rooms available:</label>
                          <Input
                            type="number"
                            min="1"
                            value={packageData[month]?.rooms || 1}
                            onChange={(e) => updatePackageRooms(month, parseInt(e.target.value) || 1)}
                            className="w-20 bg-fuchsia-900/50 border-fuchsia-700 text-white"
                          />
                        </div>
                        <p className="text-xs text-gray-400">Configure available dates for this month</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AvailabilitySection;
