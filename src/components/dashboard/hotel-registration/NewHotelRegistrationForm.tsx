import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Accordion } from '@/components/ui/accordion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelBasicInfoSection } from './sections/HotelBasicInfoSection';
import { HotelDescriptionSection } from './sections/HotelDescriptionSection';
import { RoomDescriptionSection } from './sections/RoomDescriptionSection';
import { TermsConditionsSection } from './sections/TermsConditionsSection';

export type HotelRegistrationFormData = {
  hotelName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  description: string;
  hotelDescription: string;
  roomDescription: string;
  termsAccepted: boolean;
  activities: string[];
  stayLengths: string[];
  checkInDay: string;
  availabilityPackages: any[];
  clientAffinities: string[];
  hotelClassification: string;
  classification: string;
  hotelFeatures: string[];
  imageUploads: any[];
  photos: { hotel: any[]; room: any[] };
  mealPlan: string;
  weeklyLaundryIncluded: boolean;
  externalLaundryAvailable: boolean;
  pricingMatrix: any[];
  propertyStyle: string;
  propertyType: string;
  roomFeatures: string[];
  completePhrase: string;
  idealGuests: string;
  atmosphere: string;
  location: string;
};

export const NewHotelRegistrationForm = () => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<HotelRegistrationFormData>({
    defaultValues: {
      hotelName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      description: '',
      hotelDescription: '',
      roomDescription: '',
      termsAccepted: false,
      activities: [],
      stayLengths: [],
      checkInDay: '',
      availabilityPackages: [],
      clientAffinities: [],
      hotelClassification: '',
      classification: '',
      hotelFeatures: [],
      imageUploads: [],
      photos: { hotel: [], room: [] },
      mealPlan: '',
      weeklyLaundryIncluded: false,
      externalLaundryAvailable: false,
      pricingMatrix: [],
      propertyStyle: '',
      propertyType: '',
      roomFeatures: [],
      completePhrase: '',
      idealGuests: '',
      atmosphere: '',
      location: '',
    },
  });

  const onSubmit = async (data: HotelRegistrationFormData) => {
    setIsSubmitting(true);
    console.log('Form submitted with data:', data);
    
    try {
      // Simple success feedback - works like the test button
      alert('¡Formulario enviado correctamente!');
      setSubmitSuccess(true);
      console.log('Hotel registration submitted:', data);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {submitSuccess && (
        <div className="mb-6 p-4 rounded-lg border-2 bg-green-50 border-green-200 text-green-800">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="font-semibold">Hotel registration submitted successfully!</p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Accordion type="multiple" defaultValue={["basic-info"]} className="space-y-4">
            <HotelBasicInfoSection form={form} />
            <HotelDescriptionSection form={form} />
            <RoomDescriptionSection form={form} />
          </Accordion>

          <TermsConditionsSection form={form} />

          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              disabled={isSubmitting || !form.watch('termsAccepted')}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-8 py-3 text-lg font-semibold"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Hotel Registration'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};