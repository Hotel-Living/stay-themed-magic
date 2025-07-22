import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface AvailabilityPackage {
  entryDate?: Date;
  exitDate?: Date;
  numberOfRooms?: number;
}

interface AvailabilityPackagesSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
  checkInDay: string;
}

export function AvailabilityPackagesSection({ form, checkInDay }: AvailabilityPackagesSectionProps) {
  const { t } = useTranslation('dashboard/hotel-registration');
  const packages = form.watch('availabilityPackages') || [{}];

  const addPackage = () => {
    const currentPackages = form.getValues('availabilityPackages') || [{}];
    if (currentPackages.length < 10) {
      form.setValue('availabilityPackages', [...currentPackages, {}]);
    }
  };

  const removePackage = (index: number) => {
    const currentPackages = form.getValues('availabilityPackages') || [];
    if (currentPackages.length > 1) {
      const newPackages = currentPackages.filter((_: any, i: number) => i !== index);
      form.setValue('availabilityPackages', newPackages);
    }
  };

  const validateDateForDay = (date: Date, requiredDay: string) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[date.getDay()] === requiredDay;
  };

  const isDateInNext12Months = (date: Date) => {
    const today = new Date();
    const twelveMonthsFromNow = new Date(today);
    twelveMonthsFromNow.setFullYear(today.getFullYear() + 1);
    return date >= today && date <= twelveMonthsFromNow;
  };

  return (
    <AccordionItem value="availability-packages" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">17</span>
          <span>{t('availabilityPackages.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-white/70 text-sm">
              {t('availabilityPackages.description')} ({checkInDay}).
            </p>
          </div>

          {packages.map((pkg: AvailabilityPackage, index: number) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">{t('availabilityPackages.packageNumber')} {index + 1}</h4>
                {packages.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePackage(index)}
                    className="text-red-400 hover:text-red-300 border-red-400/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name={`availabilityPackages.${index}.entryDate`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-white">{t('availabilityPackages.entryDate')}</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-white/10 border-white/30 text-white",
                                !field.value && "text-white/50"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>{t('availabilityPackages.pickEntryDate')}</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              if (date && isDateInNext12Months(date) && validateDateForDay(date, checkInDay)) {
                                field.onChange(date);
                              }
                            }}
                            disabled={(date) => 
                              !isDateInNext12Months(date) || !validateDateForDay(date, checkInDay)
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`availabilityPackages.${index}.exitDate`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-white">{t('availabilityPackages.exitDate')}</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-white/10 border-white/30 text-white",
                                !field.value && "text-white/50"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>{t('availabilityPackages.pickExitDate')}</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              if (date && isDateInNext12Months(date) && validateDateForDay(date, checkInDay)) {
                                field.onChange(date);
                              }
                            }}
                            disabled={(date) => 
                              !isDateInNext12Months(date) || !validateDateForDay(date, checkInDay)
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`availabilityPackages.${index}.numberOfRooms`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">{t('availabilityPackages.numberOfRooms')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder={t('availabilityPackages.enterNumberOfRooms')}
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          {packages.length < 10 && (
            <Button
              type="button"
              variant="outline"
              onClick={addPackage}
              className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('availabilityPackages.addPackage')}
            </Button>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}