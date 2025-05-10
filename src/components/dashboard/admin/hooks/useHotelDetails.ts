
import { useState, useEffect } from "react";
import { AdminHotelDetail } from "@/types/hotel";
import { useHotelBasicDetails } from "./useHotelBasicDetails";
import { useHotelImages } from "./useHotelImages";
import { useHotelThemes } from "./useHotelThemes";
import { useHotelActivities } from "./useHotelActivities";
import { useHotelChanges } from "./useHotelChanges";

export function useHotelDetails(id: string | undefined) {
  const { hotel, loading: hotelLoading, refetch: refetchHotel } = useHotelBasicDetails(id);
  const { images, loading: imagesLoading } = useHotelImages(id);
  const { themes, loading: themesLoading } = useHotelThemes(id);
  const { activities, loading: activitiesLoading } = useHotelActivities(id);
  const { changes } = useHotelChanges(hotel);

  // Combined loading state
  const loading = hotelLoading || imagesLoading || themesLoading || activitiesLoading;

  // Refetch all data
  const refetch = async () => {
    await refetchHotel();
  };

  return { 
    hotel, 
    loading, 
    themes, 
    activities, 
    images, 
    changes,
    refetch 
  };
}
