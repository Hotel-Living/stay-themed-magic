
import React, { useState, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ChevronDown, Trash2, Edit, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';
import { format, differenceInDays, isBefore, startOfDay, getDay } from 'date-fns';
import { dateRangesOverlap } from '@/utils/dateUtils';

interface AvailabilityPackagesSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

interface AvailabilityPackage {
  id: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  availableRooms: number;
}

const WEEKDAY_MAP: Record<string, number> = {
  'Sunday': 0,
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6
};

export const AvailabilityPackagesSection = ({ form }: AvailabilityPackagesSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');
  
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [editingPackage, setEditingPackage] = useState<string | null>(null);

  // Get form values
  const stayLengths = form.watch('stayLengths') || [];
  const checkInDay = form.watch('checkInDay') || '';
  const numberOfRooms = form.watch('numberOfRooms') || '';
  const availabilityPackages = form.watch('availabilityPackages') || [];

  // Validation functions
  const validateDateRange = (startDate: Date, endDate: Date): string | null => {
    // Check if stay lengths are configured
    if (stayLengths.length === 0) {
      return t('availabilityPackages.validation.noStayLengths');
    }

    // Check if check-in day is configured
    if (!checkInDay) {
      return t('availabilityPackages.validation.noCheckInDay');
    }

    // Check if start date is in the past
    if (isBefore(startDate, startOfDay(new Date()))) {
      return t('availabilityPackages.validation.pastDate');
    }

    // Check if start date matches preferred weekday
    const startWeekday = getDay(startDate);
    const preferredWeekday = WEEKDAY_MAP[checkInDay];
    if (startWeekday !== preferredWeekday) {
      return t('availabilityPackages.validation.wrongWeekday', { weekday: checkInDay });
    }

    // Check duration
    const actualDays = differenceInDays(endDate, startDate);
    const allowedDurations = stayLengths.map(length => parseInt(length));
    
    if (!allowedDurations.includes(actualDays)) {
      return t('availabilityPackages.validation.invalidDuration', {
        actualDays,
        allowedDurations: allowedDurations.join(', ')
      });
    }

    // Check for overlaps with existing packages (excluding the one being edited)
    const existingPackages = availabilityPackages.filter(pkg => pkg.id !== editingPackage);
    for (const pkg of existingPackages) {
      if (dateRangesOverlap(startDate, endDate, pkg.startDate, pkg.endDate)) {
        return t('availabilityPackages.validation.overlappingDates');
      }
    }

    return null;
  };

  // Calendar date matcher - only allow preferred weekday and future dates
  const isDateSelectable = (date: Date): boolean => {
    if (isBefore(date, startOfDay(new Date()))) return false;
    if (!checkInDay) return false;
    
    const dateWeekday = getDay(date);
    const preferredWeekday = WEEKDAY_MAP[checkInDay];
    
    return dateWeekday === preferredWeekday;
  };

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Starting new selection
      setSelectedStartDate(date);
      setSelectedEndDate(undefined);
      setValidationError('');
    } else if (selectedStartDate && !selectedEndDate) {
      // Selecting end date
      if (isBefore(date, selectedStartDate)) {
        // If end date is before start date, swap them
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
    }
  };

  // Create or update package
  const handleCreatePackage = () => {
    if (!selectedStartDate || !selectedEndDate) {
      setValidationError(
        !selectedStartDate 
          ? t('availabilityPackages.validation.missingStartDate')
          : t('availabilityPackages.validation.missingEndDate')
      );
      return;
    }

    const validation = validateDateRange(selectedStartDate, selectedEndDate);
    if (validation) {
      setValidationError(validation);
      return;
    }

    const duration = differenceInDays(selectedEndDate, selectedStartDate);
    const roomCount = parseInt(numberOfRooms) || 1;

    const newPackage: AvailabilityPackage = {
      id: editingPackage || `pkg_${Date.now()}`,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      duration,
      availableRooms: roomCount
    };

    let updatedPackages;
    if (editingPackage) {
      updatedPackages = availabilityPackages.map(pkg => 
        pkg.id === editingPackage ? newPackage : pkg
      );
    } else {
      updatedPackages = [...availabilityPackages, newPackage];
    }

    form.setValue('availabilityPackages', updatedPackages);
    
    // Reset selection
    setSelectedStartDate(undefined);
    setSelectedEndDate(undefined);
    setValidationError('');
    setEditingPackage(null);
    setCalendarOpen(false);
  };

  // Edit package
  const handleEditPackage = (packageId: string) => {
    const pkg = availabilityPackages.find(p => p.id === packageId);
    if (pkg) {
      setSelectedStartDate(pkg.startDate);
      setSelectedEndDate(pkg.endDate);
      setEditingPackage(packageId);
      setCalendarOpen(true);
      setValidationError('');
    }
  };

  // Delete package
  const handleDeletePackage = (packageId: string) => {
    const updatedPackages = availabilityPackages.filter(pkg => pkg.id !== packageId);
    form.setValue('availabilityPackages', updatedPackages);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setSelectedStartDate(undefined);
    setSelectedEndDate(undefined);
    setEditingPackage(null);
    setValidationError('');
    setCalendarOpen(false);
  };

  return (
    <AccordionItem value="availability-packages" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">15</span>
          <span>{t('availabilityPackages.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-6">
          <div className="text-white/80 text-sm">
            {t('availabilityPackages.description')}
          </div>
          
          <FormField
            control={form.control}
            name="numberOfRooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t('availabilityPackages.enterNumberOfRooms')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    className="bg-white/10 border-white/30 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Calendar Interface */}
          <div className="space-y-4">
            <Collapsible open={calendarOpen} onOpenChange={setCalendarOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{t('availabilityPackages.calendarTitle')}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/20">
                  <div className="space-y-4">
                    {/* Date Selection Status */}
                    <div className="flex flex-wrap gap-2">
                      {selectedStartDate && (
                        <Badge variant="secondary" className="bg-green-700/80 text-green-100">
                          {t('availabilityPackages.selectStartDate')}: {format(selectedStartDate, 'MMM d, yyyy')}
                        </Badge>
                      )}
                      {selectedEndDate && (
                        <Badge variant="secondary" className="bg-blue-700/80 text-blue-100">
                          {t('availabilityPackages.selectEndDate')}: {format(selectedEndDate, 'MMM d, yyyy')}
                        </Badge>
                      )}
                    </div>

                    {/* Calendar */}
                    <Calendar
                      mode="single"
                      selected={selectedStartDate || selectedEndDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => !isDateSelectable(date)}
                      className="bg-white/10 rounded-lg"
                      numberOfMonths={1}
                    />

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={handleCreatePackage}
                        disabled={!selectedStartDate || !selectedEndDate}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {editingPackage ? 'Update Package' : t('availabilityPackages.createPackage')}
                      </Button>
                      {editingPackage && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancelEdit}
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>

                    {/* Validation Error */}
                    {validationError && (
                      <Alert className="border-red-500/50 bg-red-900/30">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-red-200">
                          {validationError}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Created Packages List */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">{t('availabilityPackages.createdPackages')}</h4>
            
            {availabilityPackages.length === 0 ? (
              <div className="text-white/60 text-sm italic">
                {t('availabilityPackages.noPackagesYet')}
              </div>
            ) : (
              <div className="space-y-3">
                {availabilityPackages.map((pkg) => (
                  <Card key={pkg.id} className="bg-white/5 border-white/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-white flex items-center justify-between">
                        <div>
                          {format(pkg.startDate, 'MMM d')} - {format(pkg.endDate, 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditPackage(pkg.id)}
                            className="text-white/70 hover:text-white h-8 w-8 p-0"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">
                          {t('availabilityPackages.packageDuration', { duration: pkg.duration })}
                        </span>
                        <span className="text-white/70">
                          {t('availabilityPackages.availableRooms', { count: pkg.availableRooms })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
