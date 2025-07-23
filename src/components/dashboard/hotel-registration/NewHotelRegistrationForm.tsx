import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { usePropertyFormAutoSave } from "@/components/dashboard/property/hooks/usePropertyFormAutoSave";
import { PropertyFormData, usePropertyFormData } from "@/components/dashboard/property/hooks/usePropertyFormData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useImageUploadLimiter } from "@/hooks/useImageUploadLimiter";
import { useAuth } from "@/context/AuthContext";

export function NewHotelRegistrationForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id: editingHotelId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  const { formData, setFormData, currentStep, setCurrentStep } = usePropertyFormData();

  const {
    isSaving,
    lastSaved,
    loadDraft,
    clearDraft
  } = usePropertyFormAutoSave(formData, setFormData, editingHotelId);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageUploadLimits = {
    maxImages: 20,
    maxUploadsPerMinute: 5,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  };
  const { canUpload, validateFiles, recordUpload, getRemainingUploads, limits } = useImageUploadLimiter(imageUploadLimits);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!canUpload(formData.image_urls?.length || 0, acceptedFiles.length)) {
      return;
    }

    const { validFiles, errors } = validateFiles(acceptedFiles);

    if (errors.length > 0) {
      errors.forEach(error => toast({ title: error, variant: "destructive" }));
      return;
    }

    recordUpload(validFiles.length);

    const uploadPromises = validFiles.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `hotels/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        toast({ title: t('dashboard.imageUploadError'), description: uploadError.message, variant: "destructive" });
        return null;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      return data.publicUrl;
    });

    const uploadedUrls = (await Promise.all(uploadPromises)).filter(url => url !== null) as string[];

    setFormData(prev => ({
      ...prev,
      image_urls: [...(prev.image_urls || []), ...uploadedUrls],
    }));
  }, [formData.image_urls, setFormData, canUpload, validateFiles, recordUpload, t, toast]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', maxSize: limits.maxFileSize });

  const removeImage = (urlToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls?.filter(url => url !== urlToRemove),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (editingHotelId) {
        // Update existing hotel
        const { error } = await supabase
          .from('hotels')
          .update(formData)
          .eq('id', editingHotelId);

        if (error) throw error;
        toast({ title: t('dashboard.propertyUpdated') });
      } else {
        // Create new hotel
        if (!user?.id) {
          toast({ title: t('dashboard.userNotLoggedIn'), variant: "destructive" });
          return;
        }
        const { error } = await supabase
          .from('hotels')
          .insert([{ ...formData, user_id: user.id }]);

        if (error) throw error;
        toast({ title: t('dashboard.propertyAdded') });
      }

      // Invalidate cache and redirect
      queryClient.invalidateQueries(['hotels']);
      navigate('/dashboard/properties');
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({ title: t('dashboard.submissionError'), description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {editingHotelId ? t('dashboard.editProperty') : t('dashboard.addProperty')}
        </h1>
        <p className="text-gray-600">
          {t('dashboard.propertyFormDescription')}
        </p>
        
        {/* Progress indicator */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{t('dashboard.step')} {currentStep} {t('dashboard.of')} 16</span>
            <span>{Math.round(((currentStep - 1) / 15) * 100)}% {t('dashboard.complete')}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 15) * 100}%` }}
            />
          </div>
        </div>

        {/* Remove auto-save status completely - no more draft saving indicators */}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step1Title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyName')}</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyLocation')}</label>
                <input
                  type="text"
                  id="location"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyCity')}</label>
                <input
                  type="text"
                  id="city"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyCountry')}</label>
                <input
                  type="text"
                  id="country"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.country || ''}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step2Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyDescription')}</label>
                <textarea
                  id="description"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step3Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="ideal_guests" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyIdealGuests')}</label>
                <textarea
                  id="ideal_guests"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.ideal_guests || ''}
                  onChange={(e) => setFormData({ ...formData, ideal_guests: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step4Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="atmosphere" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyAtmosphere')}</label>
                <textarea
                  id="atmosphere"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.atmosphere || ''}
                  onChange={(e) => setFormData({ ...formData, atmosphere: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step5Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="perfect_location" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyPerfectLocation')}</label>
                <textarea
                  id="perfect_location"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.perfect_location || ''}
                  onChange={(e) => setFormData({ ...formData, perfect_location: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step6Title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price_per_month" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyPricePerMonth')}</label>
                <input
                  type="number"
                  id="price_per_month"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.price_per_month || ''}
                  onChange={(e) => setFormData({ ...formData, price_per_month: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div>
                <label htmlFor="available_months" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyAvailableMonths')}</label>
                <input
                  type="text"
                  id="available_months"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.available_months?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, available_months: e.target.value.split(',').map(s => s.trim()) })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step7Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="meal_plans" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyMealPlans')}</label>
                <input
                  type="text"
                  id="meal_plans"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.meal_plans?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, meal_plans: e.target.value.split(',').map(s => s.trim()) })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 8 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step8Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="hotel_themes" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyHotelThemes')}</label>
                <input
                  type="text"
                  id="hotel_themes"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.hotel_themes?.map(theme => theme.themes?.name).join(', ') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    hotel_themes: e.target.value.split(',').map(s => ({ themes: { name: s.trim() } }))
                  })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 9 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step9Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="hotel_activities" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyHotelActivities')}</label>
                <input
                  type="text"
                  id="hotel_activities"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.hotel_activities?.map(activity => activity.activities?.name).join(', ') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    hotel_activities: e.target.value.split(',').map(s => ({ activities: { name: s.trim() } }))
                  })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 10 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step10Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="room_features" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyRoomFeatures')}</label>
                <input
                  type="text"
                  id="room_features"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.room_features?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, room_features: e.target.value.split(',').map(s => s.trim()) })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 11 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step11Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="cancellation_policy" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyCancellationPolicy')}</label>
                <textarea
                  id="cancellation_policy"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.cancellation_policy || ''}
                  onChange={(e) => setFormData({ ...formData, cancellation_policy: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 12 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step12Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="check_in_time" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyCheckInTime')}</label>
                <input
                  type="time"
                  id="check_in_time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.check_in_time || ''}
                  onChange={(e) => setFormData({ ...formData, check_in_time: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="check_out_time" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyCheckOutTime')}</label>
                <input
                  type="time"
                  id="check_out_time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.check_out_time || ''}
                  onChange={(e) => setFormData({ ...formData, check_out_time: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 13 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step13Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="min_stay" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyMinStay')}</label>
                <input
                  type="number"
                  id="min_stay"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.min_stay || ''}
                  onChange={(e) => setFormData({ ...formData, min_stay: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label htmlFor="max_stay" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyMaxStay')}</label>
                <input
                  type="number"
                  id="max_stay"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.max_stay || ''}
                  onChange={(e) => setFormData({ ...formData, max_stay: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 14 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step14Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('dashboard.propertyImageUpload')}</label>
                <div {...getRootProps()} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer">
                  <input {...getInputProps()} />
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4V12a4 4 0 014-4h20M24 36l-4-4m0 0l-4 4m4-4v12m8.971-3.01c.166-.39.288-.819.407-1.255M13 5.032V12m18.032 0v-6.968M23.182 18.726a4.573 4.573 0 00-1.213-3.257M29.165 30.274a4.573 4.573 0 001.213 3.257m-5.778-11.548a4.573 4.573 0 00-3.257 1.213M20.835 17.726a4.573 4.573 0 003.257-1.213m-5.778 11.548a4.573 4.573 0 00-3.257-1.213M27.165 31.274a4.573 4.573 0 003.257 1.213" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2">
                        <span>{t('dashboard.uploadImages')}</span>
                      </label>
                      <p className="pl-1">{t('dashboard.orDragAndDrop')}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {t('dashboard.fileTypesAccepted')}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {t('dashboard.remainingUploads')}: {getRemainingUploads()} / {limits.maxUploadsPerMinute} {t('dashboard.perMinute')}<br />
                  {t('dashboard.maxImagesAllowed')}: {formData.image_urls?.length || 0} / {limits.maxImages}
                </p>
              </div>
              {formData.image_urls && formData.image_urls.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">{t('dashboard.uploadedImages')}</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    {formData.image_urls.map((url, index) => (
                      <div key={index} className="relative">
                        <img src={url} alt={`Uploaded ${index + 1}`} className="rounded-md shadow-sm" />
                        <button
                          type="button"
                          onClick={() => removeImage(url)}
                          className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 15 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step15Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="rates" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyRates')}</label>
                <input
                  type="text"
                  id="rates"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={JSON.stringify(formData.rates) || ''}
                  onChange={(e) => {
                    try {
                      const parsedRates = JSON.parse(e.target.value);
                      setFormData({ ...formData, rates: parsedRates });
                    } catch (error) {
                      console.error("Invalid JSON for rates", error);
                      toast({ title: t('dashboard.invalidJson'), variant: "destructive" });
                    }
                  }}
                />
                <p className="text-sm text-gray-500 mt-1">{t('dashboard.ratesFormat')}</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 16 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.step16Title')}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">{t('dashboard.propertyStatus')}</label>
                <select
                  id="status"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  value={formData.status || 'pending'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="pending">{t('dashboard.pending')}</option>
                  <option value="approved">{t('dashboard.approved')}</option>
                  <option value="rejected">{t('dashboard.rejected')}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={currentStep === 1}
          >
            {t('dashboard.previous')}
          </button>
          {currentStep < 16 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.min(16, prev + 1))}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {t('dashboard.next')}
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('dashboard.submitting') : (editingHotelId ? t('dashboard.updateProperty') : t('dashboard.addProperty'))}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
