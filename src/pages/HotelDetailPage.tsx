// RUTA: src/pages/HotelDetailPage.tsx

import React from "react";
import { useParams } from "react-router-dom";
import { useHotelDetails } from "@/hooks/useHotelDetails";
import { HotelHeader } from "@/components/hotel-detail/HotelHeader";
import { StayBookingSelector } from "@/components/hotel-detail/StayBookingSelector";
import { HotelGallery } from "@/components/hotel-detail/HotelGallery";
import { HotelFeaturesInfo } from "@/components/hotel-detail/HotelFeaturesInfo";
import { HotelRoomTypes } from "@/components/hotel-detail/HotelRoomTypes";
import { HotelLocation } from "@/components/hotel-detail/HotelLocation";
import { HotelFaqs } from "@/components/hotel-detail/HotelFaqs";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function HotelDetailPage() {
  const { id } = useParams();
  const { hotel, isLoading } = useHotelDetails(id);

  if (isLoading || !hotel) {
    return (
      <Container className="py-16">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-96 w-full" />
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Main Hotel Information */}
        <div className="md:col-span-2 space-y-6">
          <HotelHeader hotel={hotel} />
          <HotelGallery images={hotel.hotel_images} />
          <HotelFeaturesInfo hotel={hotel} />
          <HotelRoomTypes hotel={hotel} />
          <HotelFaqs faqs={hotel.faqs || []} />
        </div>

        {/* Right: Booking + Map */}
        <div className="space-y-6">
          <HotelLocation hotel={hotel} />
          <StayBookingSelector hotel={hotel} />
        </div>
      </div>
    </Container>
  );
}
