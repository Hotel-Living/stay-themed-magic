import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Upload, X, CalendarIcon } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths } from "date-fns";

interface NewStep3AccommodationTermsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function NewStep3AccommodationTerms({
  formData,
  updateFormData,
  onValidationChange
}: NewStep3AccommodationTermsProps) {
  
  // Section states for accordion
  const [roomTypesOpen, setRoomTypesOpen] = useState(false);
  const [mealPlansOpen, setMealPlansOpen] = useState(false);
  const [stayDurationOpen, setStayDurationOpen] = useState(false);
  const [weekdayOpen, setWeekdayOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);

  // Availability package creation states
  const [showPackageCreator, setShowPackageCreator] = useState(false);
  const [packageRooms, setPackageRooms] = useState(1);
  const [packageStartDate, setPackageStartDate] = useState<Date>();
  const [packageEndDate, setPackageEndDate] = useState<Date>();

  // Validation logic - requires room types, meal plans, and stay durations
  useEffect(() => {
    const isValid = (formData.roomTypes || []).length > 0 &&
                   (formData.mealPlans || []).length > 0 &&
                   (formData.selectedStayDurations || []).length > 0;
    
    console.log('✅ Step 3 validation:', isValid);
    onValidationChange(isValid);
  }, [formData.roomTypes, formData.mealPlans, formData.selectedStayDurations, onValidationChange]);

  // Stay duration options - EXACT as original
  const stayDurationOptions = [
    { nights: 8, label: "8 days" },
    { nights: 15, label: "15 days" },
    { nights: 22, label: "22 days" },
    { nights: 29, label: "29 days" }
  ];

  // Meal plan options
  const mealPlanOptions = [
    "Breakfast Only",
    "Half Board",
    "Full Board", 
    "All Inclusive",
    "Self Catering"
  ];

  // Weekday options
  const weekdayOptions = [
    "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday", "Sunday"
  ];

  const handleStayDurationToggle = (nights: number) => {
    const current = formData.selectedStayDurations || [];
    const updated = current.includes(nights)
      ? current.filter((d: number) => d !== nights)
      : [...current, nights];
    
    updateFormData('selectedStayDurations', updated);
  };

  const handleMealPlanToggle = (plan: string) => {
    const current = formData.mealPlans || [];
    const updated = current.includes(plan)
      ? current.filter((p: string) => p !== plan)
      : [...current, plan];
    
    updateFormData('mealPlans', updated);
  };

  const handleRoomImageUpload = (files: FileList | null) => {
    if (!files || !formData.roomTypes?.[0]) return;
    
    const newImages = Array.from(files).map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    const updatedRoomType = {
      ...formData.roomTypes[0],
      images: [...(formData.roomTypes[0].images || []), ...newImages]
    };
    
    updateFormData('roomTypes', [updatedRoomType]);
  };

  const removeRoomImage = (index: number) => {
    if (!formData.roomTypes?.[0]) return;
    
    const updatedImages = formData.roomTypes[0].images?.filter((_: any, i: number) => i !== index) || [];
    const updatedRoomType = {
      ...formData.roomTypes[0],
      images: updatedImages
    };
    
    updateFormData('roomTypes', [updatedRoomType]);
  };

  const updateRoomDescription = (description: string) => {
    const roomType = formData.roomTypes?.[0] || { 
      id: '1', 
      name: 'Double Rooms Can Be Single',
      images: [],
      description: ''
    };
    
    const updatedRoomType = { ...roomType, description };
    updateFormData('roomTypes', [updatedRoomType]);
  };

  const createAvailabilityPackage = () => {
    if (!packageStartDate || !packageEndDate || packageRooms < 1) return;

    const selectedDates = eachDayOfInterval({
      start: packageStartDate,
      end: packageEndDate
    });

    const newPackage = {
      id: Date.now().toString(),
      numberOfRooms: packageRooms,
      startDate: format(packageStartDate, 'yyyy-MM-dd'),
      endDate: format(packageEndDate, 'yyyy-MM-dd'),
      selectedDates: selectedDates.map(date => format(date, 'yyyy-MM-dd'))
    };

    const currentPackages = formData.availabilityPackages || [];
    updateFormData('availabilityPackages', [...currentPackages, newPackage]);

    // Reset creator
    setPackageRooms(1);
    setPackageStartDate(undefined);
    setPackageEndDate(undefined);
    setShowPackageCreator(false);
  };

  const removeAvailabilityPackage = (packageId: string) => {
    const currentPackages = formData.availabilityPackages || [];
    const updatedPackages = currentPackages.filter((pkg: any) => pkg.id !== packageId);
    updateFormData('availabilityPackages', updatedPackages);
  };

  // Initialize room type if not exists
  useEffect(() => {
    if (!formData.roomTypes || formData.roomTypes.length === 0) {
      updateFormData('roomTypes', [{
        id: '1',
        name: 'Double Rooms Can Be Single',
        images: [],
        description: ''
      }]);
    }
    
    if (!formData.preferredWeekday) {
      updateFormData('preferredWeekday', 'Monday');
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Step 3: Accommodation Terms</CardTitle>
        </CardHeader>
        <CardContent>
          
          <Accordion type="single" collapsible className="space-y-4">
            
            {/* Room Types Section */}
            <AccordionItem value="room-types" className="border rounded-xl overflow-hidden bg-blue-900/10">
              <AccordionTrigger 
                className="px-4 py-3"
                onClick={() => setRoomTypesOpen(!roomTypesOpen)}
              >
                <h3 className="text-lg capitalize">3.1— ROOM TYPES</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  
                  <div className="p-4 border rounded-lg bg-white">
                    <h4 className="font-semibold mb-4">Double Rooms Can Be Single</h4>
                    
                    {/* Room Images */}
                    <div className="space-y-4">
                      <Label>Room Images</Label>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload room images</p>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleRoomImageUpload(e.target.files)}
                          className="hidden"
                          id="room-image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('room-image-upload')?.click()}
                        >
                          Choose Images
                        </Button>
                      </div>

                      {/* Room Image Preview */}
                      {formData.roomTypes?.[0]?.images && formData.roomTypes[0].images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {formData.roomTypes[0].images.map((image: any, index: number) => (
                            <div key={index} className="relative group">
                              <img
                                src={image.url}
                                alt={`Room ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                onClick={() => removeRoomImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Room Description */}
                    <div className="space-y-2">
                      <Label htmlFor="roomDescription">Room Description *</Label>
                      <Textarea
                        id="roomDescription"
                        value={formData.roomTypes?.[0]?.description || ''}
                        onChange={(e) => updateRoomDescription(e.target.value)}
                        placeholder="Describe the room amenities and features..."
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Meal Plans Section */}
            <AccordionItem value="meal-plans" className="border rounded-xl overflow-hidden bg-green-900/10">
              <AccordionTrigger 
                className="px-4 py-3"
                onClick={() => setMealPlansOpen(!mealPlansOpen)}
              >
                <h3 className="text-lg capitalize">3.2— MEAL PLANS</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <p className="text-gray-300">Select the meal plans available at your property:</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {mealPlanOptions.map((plan) => (
                      <Button
                        key={plan}
                        variant={(formData.mealPlans || []).includes(plan) ? "default" : "outline"}
                        onClick={() => handleMealPlanToggle(plan)}
                        className="h-12"
                      >
                        {plan}
                      </Button>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Stay Duration Section */}
            <AccordionItem value="stay-duration" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
              <AccordionTrigger 
                className="px-4 py-3"
                onClick={() => setStayDurationOpen(!stayDurationOpen)}
              >
                <h3 className="text-lg capitalize">3.3— STAY DURATION</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <p className="text-gray-300">Select one or more stay durations for your availability packages:</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {stayDurationOptions.map((option) => (
                      <Button
                        key={option.nights}
                        variant={(formData.selectedStayDurations || []).includes(option.nights) ? "default" : "outline"}
                        onClick={() => handleStayDurationToggle(option.nights)}
                        className="h-12"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Preferred Check-in Weekday */}
            <AccordionItem value="weekday" className="border rounded-xl overflow-hidden bg-purple-900/10">
              <AccordionTrigger 
                className="px-4 py-3"
                onClick={() => setWeekdayOpen(!weekdayOpen)}
              >
                <h3 className="text-lg capitalize">3.4— PREFERRED CHECK-IN WEEKDAY</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <p className="text-gray-300">Select the preferred weekday for check-ins:</p>
                  
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                    {weekdayOptions.map((day) => (
                      <Button
                        key={day}
                        variant={formData.preferredWeekday === day ? "default" : "outline"}
                        onClick={() => updateFormData('preferredWeekday', day)}
                        className="h-12"
                      >
                        {day.slice(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Availability Packages Section */}
            <AccordionItem value="availability" className="border rounded-xl overflow-hidden bg-orange-900/10">
              <AccordionTrigger 
                className="px-4 py-3"
                onClick={() => setAvailabilityOpen(!availabilityOpen)}
              >
                <h3 className="text-lg capitalize">3.5— AVAILABILITY PACKAGES</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <p className="text-gray-300">Create availability packages with room counts and date ranges:</p>
                  
                  {/* Existing Packages */}
                  {(formData.availabilityPackages || []).map((pkg: any) => (
                    <div key={pkg.id} className="p-4 border rounded-lg bg-white flex justify-between items-center">
                      <div>
                        <p className="font-medium">{pkg.numberOfRooms} room(s) available</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(pkg.startDate), 'MMM dd, yyyy')} - {format(new Date(pkg.endDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeAvailabilityPackage(pkg.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  {/* Package Creator */}
                  {showPackageCreator ? (
                    <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Number of Rooms</Label>
                          <Input
                            type="number"
                            min="1"
                            value={packageRooms}
                            onChange={(e) => setPackageRooms(parseInt(e.target.value) || 1)}
                          />
                        </div>
                        
                        <div>
                          <Label>Start Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {packageStartDate ? format(packageStartDate, 'MMM dd, yyyy') : 'Select date'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={packageStartDate}
                                onSelect={setPackageStartDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div>
                          <Label>End Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {packageEndDate ? format(packageEndDate, 'MMM dd, yyyy') : 'Select date'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar 
                                mode="single"
                                selected={packageEndDate}
                                onSelect={setPackageEndDate}
                                initialFocus
                                disabled={(date) => packageStartDate ? date < packageStartDate : false}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button onClick={createAvailabilityPackage}>Create Package</Button>
                        <Button variant="outline" onClick={() => setShowPackageCreator(false)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => setShowPackageCreator(true)}>
                      Add Availability Package
                    </Button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>

        </CardContent>
      </Card>
    </div>
  );
}
