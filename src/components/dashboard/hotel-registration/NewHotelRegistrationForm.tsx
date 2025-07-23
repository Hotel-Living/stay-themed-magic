import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion } from "@/components/ui/accordion";
import { useTranslation } from '@/hooks/useTranslation';
import { ClientAffinitiesSection } from './sections/ClientAffinitiesSection';
import { ActivitiesSection } from './sections/ActivitiesSection';
import { MealPlanSection } from './sections/MealPlanSection';
import { StayLengthsSection } from './sections/StayLengthsSection';
import { CheckInDaySection } from './sections/CheckInDaySection';
import { AvailabilityPackagesSection } from './sections/AvailabilityPackagesSection';
import { ImageUploadsSection } from './sections/ImageUploadsSection';

// Add interface for availability package
interface AvailabilityPackage {
  id: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  availableRooms: number;
}

// Update the schema to include availability packages and missing fields
const hotelRegistrationSchema = z.object({
  hotelName: z.string().min(2, {
    message: "Hotel name must be at least 2 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  propertyType: z.string().min(1, {
    message: "Please select a property type.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  website: z.string().url({
    message: "Please enter a valid website URL.",
  }).optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zip: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  classification: z.string().optional(),
  idealGuests: z.string().optional(),
  atmosphere: z.string().optional(),
  location: z.string().optional(),
  hotelDescription: z.string().optional(),
  hotelFeatures: z.array(z.string()).default([]),
  photos: z.object({
    hotel: z.array(z.string()).default([]),
    room: z.array(z.string()).default([])
  }).default({ hotel: [], room: [] }),
  mealPlan: z.string().optional(),
  weeklyLaundryIncluded: z.boolean().default(false),
  externalLaundryAvailable: z.boolean().default(false),
  pricingMatrix: z.record(z.string(), z.number()).default({}),
  propertyStyle: z.string().optional(),
  roomDescription: z.string().optional(),
  roomFeatures: z.array(z.string()).default([]),
  termsAccepted: z.boolean().default(false),
  clientAffinities: z.array(z.string()).default([]),
  activities: z.array(z.string()).default([]),
  mealPlans: z.array(z.string()).default([]),
  stayLengths: z.array(z.enum(['8', '15', '22', '29'])).default([]),
  checkInDay: z.string().optional(),
  numberOfRooms: z.string().min(1, "Number of rooms is required"),
  availabilityPackages: z.array(z.object({
    id: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    duration: z.number().optional(),
    availableRooms: z.number().optional()
  })).default([]),
  imageUrls: z.array(z.string()).default([]),
});

export type HotelRegistrationFormData = z.infer<typeof hotelRegistrationSchema>;

export const NewHotelRegistrationForm = () => {
  const { t } = useTranslation('dashboard/hotel-registration');

  const form = useForm<HotelRegistrationFormData>({
    resolver: zodResolver(hotelRegistrationSchema),
    defaultValues: {
      hotelName: "",
      category: "",
      propertyType: "",
      email: "",
      phone: "",
      website: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      postalCode: "",
      country: "",
      latitude: "",
      longitude: "",
      classification: "",
      idealGuests: "",
      atmosphere: "",
      location: "",
      hotelDescription: "",
      hotelFeatures: [],
      photos: { hotel: [], room: [] },
      mealPlan: "",
      weeklyLaundryIncluded: false,
      externalLaundryAvailable: false,
      pricingMatrix: {},
      propertyStyle: "",
      roomDescription: "",
      roomFeatures: [],
      termsAccepted: false,
      clientAffinities: [],
      activities: [],
      mealPlans: [],
      stayLengths: [],
      checkInDay: "",
      numberOfRooms: "1",
      availabilityPackages: [],
      imageUrls: [],
    },
  });

  const onSubmit = (data: HotelRegistrationFormData) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            <FormField
              control={form.control}
              name="hotelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{t('hotelName.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('hotelName.placeholder')}
                      className="bg-white/10 border-white/30 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{t('category.label')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white">
                        <SelectValue placeholder={t('category.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hotel">{t('category.hotel')}</SelectItem>
                      <SelectItem value="resort">{t('category.resort')}</SelectItem>
                      <SelectItem value="motel">{t('category.motel')}</SelectItem>
                      <SelectItem value="guestHouse">{t('category.guestHouse')}</SelectItem>
                      <SelectItem value="bedAndBreakfast">{t('category.bedAndBreakfast')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{t('propertyType.label')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white">
                        <SelectValue placeholder={t('propertyType.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="apartment">{t('propertyType.apartment')}</SelectItem>
                      <SelectItem value="house">{t('propertyType.house')}</SelectItem>
                      <SelectItem value="villa">{t('propertyType.villa')}</SelectItem>
                      <SelectItem value="cabin">{t('propertyType.cabin')}</SelectItem>
                      <SelectItem value="chalet">{t('propertyType.chalet')}</SelectItem>
                      <SelectItem value="bungalow">{t('propertyType.bungalow')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{t('email.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('email.placeholder')}
                      type="email"
                      className="bg-white/10 border-white/30 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{t('phone.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('phone.placeholder')}
                      type="tel"
                      className="bg-white/10 border-white/30 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{t('website.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('website.placeholder')}
                      type="url"
                      className="bg-white/10 border-white/30 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{t('description.label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('description.placeholder')}
                      className="bg-white/10 border-white/30 text-white resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{t('address.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('address.placeholder')}
                      className="bg-white/10 border-white/30 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">{t('city.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('city.placeholder')}
                        className="bg-white/10 border-white/30 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">{t('state.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('state.placeholder')}
                        className="bg-white/10 border-white/30 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">{t('zip.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('zip.placeholder')}
                        className="bg-white/10 border-white/30 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">{t('latitude.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('latitude.placeholder')}
                        className="bg-white/10 border-white/30 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{t('longitude.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('longitude.placeholder')}
                      className="bg-white/10 border-white/30 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <ClientAffinitiesSection form={form} />
            <ActivitiesSection form={form} />
            <MealPlanSection form={form} />
            <StayLengthsSection form={form} />
            <CheckInDaySection form={form} />
            <AvailabilityPackagesSection form={form} />
            <ImageUploadsSection form={form} />
            
            <Button type="submit" className="w-full bg-fuchsia-500 text-white hover:bg-fuchsia-700">
              {t('submitButton')}
            </Button>
          </Accordion>
        </form>
      </Form>
    </div>
  );
};
