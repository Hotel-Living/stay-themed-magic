
  // Validation logic – auto-checks every time packages are updated
  useEffect(() => {
    const isValid = existingPackages.length > 0 && 
      existingPackages.every((pkg: any) => 
        pkg.numberOfRooms > 0 &&
        pkg.startDate &&
        pkg.endDate
      );
    onValidationChange?.(isValid);
  }, [existingPackages, onValidationChange]);
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { format, addMonths, startOfMonth, eachDayOfInterval, endOfMonth, getDay } from "date-fns";

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  selectedDay?: string;
  onValidationChange?: (isValid: boolean) => void;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData,
  selectedDay = "monday",
  onValidationChange
}) => {
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [packageStep, setPackageStep] = useState(1);
  const [newPackage, setNewPackage] = useState({
    numberOfRooms: 1,
    startDate: null as Date | null,
    endDate: null as Date | null,
    selectedDates: [] as string[]
  });

  const existingPackages = formData?.availabilityPackages || [];

  // Validation logic
  useEffect(() => {
    if (onValidationChange) {
      const isValid = existingPackages.length > 0 && 
        existingPackages.every((pkg: any) => 
          pkg.numberOfRooms > 0 && 
          pkg.startDate && 
          pkg.endDate
        );
      onValidationChange(isValid);
    }
  }, [existingPackages, onValidationChange]);

  // Convert selectedDay to weekday number (0 = Sunday, 1 = Monday, etc.)
  const weekdayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  };

  const selectedWeekdayNumber = weekdayMap[selectedDay.toLowerCase()] || 1;

  // Generate 12 months starting from next month
  const months = useMemo(() => {
    const currentDate = new Date();
    const startMonth = addMonths(startOfMonth(currentDate), 1);
    
    return Array.from({ length: 12 }, (_, i) => {
      return addMonths(startMonth, i);
    });
  }, []);

  // Get valid check-in dates for a specific month
  const getValidDatesForMonth = (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const allDays = eachDayOfInterval({ start, end });
    
    return allDays.filter(day => getDay(day) === selectedWeekdayNumber);
  };

  const handleAddPackage = () => {
    setIsAddingPackage(true);
    setPackageStep(1);
    setNewPackage({
      numberOfRooms: 1,
      startDate: null,
      endDate: null,
      selectedDates: []
    });
  };

  const handleSavePackage = () => {
    const updatedPackages = [...existingPackages, {
      id: Date.now().toString(),
      numberOfRooms: newPackage.numberOfRooms,
      startDate: newPackage.startDate,
      endDate: newPackage.endDate,
      selectedDates: newPackage.selectedDates,
      createdAt: new Date()
    }];

    if (updateFormData) {
      updateFormData('availabilityPackages', updatedPackages);
    }

    setIsAddingPackage(false);
    setPackageStep(1);
  onValidationChange?.(true);
  };

  const handleDeletePackage = (packageId: string) => {
    const updatedPackages = existingPackages.filter((pkg: any) => pkg.id !== packageId);
    if (updateFormData) {
      updateFormData('availabilityPackages', updatedPackages);
    }
  };

  const handleDateSelect = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    
    if (!newPackage.startDate) {
      setNewPackage(prev => ({ ...prev, startDate: date, selectedDates: [dateString] }));
    } else if (!newPackage.endDate) {
      if (date >= newPackage.startDate) {
        setNewPackage(prev => ({ ...prev, endDate: date }));
        setPackageStep(4);
      }
    }
  };

  const renderExistingPackages = () => {
    if (existingPackages.length === 0) return null;

    return (
      <div className="space-y-4 mb-6">
        <h4 className="text-md font-medium">Existing Availability Packages</h4>
        {existingPackages.slice(0, 10).map((pkg: any) => (
          <Card key={pkg.id} className="bg-fuchsia-900/20 border-fuchsia-800/30">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm">
                  {pkg.numberOfRooms} Room{pkg.numberOfRooms !== 1 ? 's' : ''}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                {pkg.startDate && pkg.endDate
                  ? `${format(new Date(pkg.startDate), 'MMM d, yyyy')} - ${format(new Date(pkg.endDate), 'MMM d, yyyy')}`
                  : `${pkg.selectedDates?.length || 0} dates selected`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderAddPackageFlow = () => {
    if (!isAddingPackage) {
      return (
        <Button onClick={handleAddPackage} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add New Availability Package
        </Button>
      );
    }

    switch (packageStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h4 className="text-md font-medium">Step 1: Number of Rooms</h4>
            <div className="flex items-center space-x-4">
              <label className="text-sm">Available Rooms:</label>
              <Input
                type="number"
                min="1"
                value={newPackage.numberOfRooms}
                onChange={(e) => setNewPackage(prev => ({ ...prev, numberOfRooms: parseInt(e.target.value) || 1 }))}
                className="w-20"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setPackageStep(2)}>Next</Button>
              <Button variant="outline" onClick={() => setIsAddingPackage(false)}>Cancel</Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h4 className="text-md font-medium">Step 2: Select Dates Within Rolling 12-Month Window</h4>
            <p className="text-sm text-gray-300">
              Select your first check-in date (only valid check-in days are shown)
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left column - first 6 months */}
              <div className="space-y-4">
                {months.slice(0, 6).map((month, index) => {
                  const validDates = getValidDatesForMonth(month);
                  return (
                    <Card key={index} className="bg-fuchsia-900/10 border-fuchsia-800/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-center text-white bg-fuchsia-600 py-2 rounded">
                          {format(month, 'MMMM yyyy')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 gap-2">
                          {validDates.map((date) => (
                            <Button
                              key={date.toISOString()}
                              variant="outline"
                              size="sm"
                              onClick={() => handleDateSelect(date)}
                              className="h-12"
                            >
                              {format(date, 'd')}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Right column - last 6 months */}
              <div className="space-y-4">
                {months.slice(6, 12).map((month, index) => {
                  const validDates = getValidDatesForMonth(month);
                  return (
                    <Card key={index + 6} className="bg-fuchsia-900/10 border-fuchsia-800/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-center text-white bg-fuchsia-600 py-2 rounded">
                          {format(month, 'MMMM yyyy')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 gap-2">
                          {validDates.map((date) => (
                            <Button
                              key={date.toISOString()}
                              variant="outline"
                              size="sm"
                              onClick={() => handleDateSelect(date)}
                              className="h-12"
                            >
                              {format(date, 'd')}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {newPackage.startDate && (
              <div className="mt-4">
                <p className="text-sm">
                  First check-in date selected: {format(newPackage.startDate, 'MMMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  Now select your final check-in date to define the package range.
                </p>
              </div>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setPackageStep(1)}>Back</Button>
              <Button variant="outline" onClick={() => setIsAddingPackage(false)}>Cancel</Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h4 className="text-md font-medium">Step 4: Save Package</h4>
            <div className="bg-fuchsia-900/20 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Package Summary:</h5>
              <ul className="text-sm space-y-1">
                <li>Rooms: {newPackage.numberOfRooms}</li>
                <li>First check-in: {newPackage.startDate ? format(newPackage.startDate, 'MMMM d, yyyy') : 'Not selected'}</li>
                <li>Final check-in: {newPackage.endDate ? format(newPackage.endDate, 'MMMM d, yyyy') : 'Not selected'}</li>
              </ul>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSavePackage}>Add Availability Package</Button>
              <Button variant="outline" onClick={() => setPackageStep(2)}>Back</Button>
              <Button variant="outline" onClick={() => setIsAddingPackage(false)}>Cancel</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Accordion type="single" collapsible value={isOpen ? "availability" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="availability" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.5— AVAILABILITY PACKAGES</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
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
