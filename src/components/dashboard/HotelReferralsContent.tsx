import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, CheckCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

// Country list - matching the existing format from the app
const countries = [
  "Spain", "Portugal", "France", "Italy", "Germany", "United Kingdom", 
  "Netherlands", "Belgium", "Austria", "Switzerland", "Greece", "Croatia",
  "Poland", "Czech Republic", "Hungary", "Romania", "Bulgaria", "Denmark",
  "Sweden", "Norway", "Finland", "Ireland", "Luxembourg", "Slovenia", 
  "Slovakia", "Estonia", "Latvia", "Lithuania", "Malta", "Cyprus"
];

interface Hotel {
  id: string;
  country: string;
  city: string;
  name: string;
}

const hotelSchema = z.object({
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  name: z.string().min(1, "Hotel name is required"),
});

const referralSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  bankCountry: z.string().min(1, "Bank country is required"),
  ibanAccount: z.string().min(1, "IBAN/Account number is required"),
  swiftBic: z.string().optional(),
});

type HotelFormData = z.infer<typeof hotelSchema>;
type ReferralFormData = z.infer<typeof referralSchema>;

export function HotelReferralsContent() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hotelForm = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
  });

  const referralForm = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
  });

  const addHotel = (data: HotelFormData) => {
    const newHotel: Hotel = {
      id: Date.now().toString(),
      country: data.country,
      city: data.city,
      name: data.name,
    };
    setHotels([...hotels, newHotel]);
    hotelForm.reset();
  };

  const removeHotel = (id: string) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  const onSubmit = async (data: ReferralFormData) => {
    if (hotels.length === 0) {
      toast.error(t('dashboard.referrals.validation.hotelsRequired'));
      return;
    }

    if (!profile?.id) {
      toast.error("User not authenticated");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('hotel_referrals_submissions')
        .insert({
          user_id: profile.id,
          full_name: data.fullName,
          bank_name: data.bankName,
          bank_country: data.bankCountry,
          iban_account: data.ibanAccount,
          swift_bic: data.swiftBic || null,
          hotels: hotels.map(hotel => ({
            country: hotel.country,
            city: hotel.city,
            name: hotel.name
          }))
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Hotel referrals submitted successfully!");
    } catch (error) {
      console.error('Error submitting referrals:', error);
      toast.error("Failed to submit referrals. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              {t('dashboard.referrals.confirmationTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">
              {t('dashboard.referrals.confirmationMessage')}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            💸💼🏨 {t('dashboard.referrals.title')}
          </CardTitle>
          <CardDescription className="text-lg leading-relaxed">
            {t('dashboard.referrals.description')}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Hotel Submission Form */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.referrals.hotelSubmission')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={hotelForm.handleSubmit(addHotel)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="country">{t('dashboard.referrals.country')}</Label>
                <Select onValueChange={(value) => hotelForm.setValue('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('dashboard.referrals.country')} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {hotelForm.formState.errors.country && (
                  <p className="text-sm text-red-600 mt-1">
                    {t('dashboard.referrals.validation.countryRequired')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="city">{t('dashboard.referrals.city')}</Label>
                <Input
                  id="city"
                  {...hotelForm.register('city')}
                  placeholder={t('dashboard.referrals.city')}
                />
                {hotelForm.formState.errors.city && (
                  <p className="text-sm text-red-600 mt-1">
                    {t('dashboard.referrals.validation.cityRequired')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="name">{t('dashboard.referrals.hotelName')}</Label>
                <Input
                  id="name"
                  {...hotelForm.register('name')}
                  placeholder={t('dashboard.referrals.hotelName')}
                />
                {hotelForm.formState.errors.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {t('dashboard.referrals.validation.hotelNameRequired')}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              {t('dashboard.referrals.addAnother')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Submitted Hotels Table */}
      {hotels.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.referrals.submittedHotels')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('dashboard.referrals.country')}</TableHead>
                  <TableHead>{t('dashboard.referrals.city')}</TableHead>
                  <TableHead>{t('dashboard.referrals.hotelName')}</TableHead>
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>{hotel.country}</TableCell>
                    <TableCell>{hotel.city}</TableCell>
                    <TableCell>{hotel.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeHotel(hotel.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Payment Information Form */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.referrals.paymentInfo')}</CardTitle>
          <CardDescription>
            {t('dashboard.referrals.paymentInfoDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={referralForm.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">{t('dashboard.referrals.fullName')}</Label>
                <Input
                  id="fullName"
                  {...referralForm.register('fullName')}
                  placeholder={t('dashboard.referrals.fullName')}
                />
                {referralForm.formState.errors.fullName && (
                  <p className="text-sm text-red-600 mt-1">
                    {t('dashboard.referrals.validation.fullNameRequired')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="bankName">{t('dashboard.referrals.bankName')}</Label>
                <Input
                  id="bankName"
                  {...referralForm.register('bankName')}
                  placeholder={t('dashboard.referrals.bankName')}
                />
                {referralForm.formState.errors.bankName && (
                  <p className="text-sm text-red-600 mt-1">
                    {t('dashboard.referrals.validation.bankNameRequired')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="bankCountry">{t('dashboard.referrals.bankCountry')}</Label>
                <Select onValueChange={(value) => referralForm.setValue('bankCountry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('dashboard.referrals.bankCountry')} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {referralForm.formState.errors.bankCountry && (
                  <p className="text-sm text-red-600 mt-1">
                    {t('dashboard.referrals.validation.bankCountryRequired')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="ibanAccount">{t('dashboard.referrals.ibanAccount')}</Label>
                <Input
                  id="ibanAccount"
                  {...referralForm.register('ibanAccount')}
                  placeholder={t('dashboard.referrals.ibanAccount')}
                />
                {referralForm.formState.errors.ibanAccount && (
                  <p className="text-sm text-red-600 mt-1">
                    {t('dashboard.referrals.validation.ibanRequired')}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="swiftBic">{t('dashboard.referrals.swiftBic')}</Label>
                <Input
                  id="swiftBic"
                  {...referralForm.register('swiftBic')}
                  placeholder={t('dashboard.referrals.swiftBic')}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || hotels.length === 0}
            >
              {isSubmitting ? "Submitting..." : t('dashboard.referrals.submitReferral')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}