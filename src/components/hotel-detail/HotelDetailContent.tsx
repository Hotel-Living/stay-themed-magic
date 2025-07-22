import React from "react";
import { useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { LinkButton } from "@/components/ui/link-button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { HotelDescriptionSection } from "./HotelDescription";
import { HotelDetailProps } from "@/types/hotel/detail";
import { HotelAmenitiesSection } from "./HotelAmenitiesSection";

interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading: boolean;
}

export function HotelDetailContent({ hotel, isLoading }: HotelDetailContentProps) {
  const { id } = useParams<{ id: string }>();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#B3B3FF] flex items-center justify-center">
        <div className="text-white text-xl">Loading hotel details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#B3B3FF] py-8">
      <div className="container mx-auto px-4">
        {/* Hotel Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white text-left">{hotel.name}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-gray-300">{hotel.city}, {hotel.country}</span>
            {hotel.average_rating && (
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">{hotel.average_rating}</span>
                <span className="text-gray-300">(Average Rating)</span>
              </div>
            )}
          </div>
        </div>

        {/* Image Carousel Section */}
        {hotel.hotel_images && hotel.hotel_images.length > 0 && (
          <div className="mb-8">
            <Carousel className="w-full max-w-5xl">
              <CarouselContent className="-ml-1 md:pl-1">
                {hotel.hotel_images.map((image) => (
                  <CarouselItem key={image.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={image.image_url}
                          alt={hotel.name}
                          className="rounded-md object-cover"
                        />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}

        {/* Hotel Description Section */}
        <HotelDescriptionSection
          description={hotel.description}
          idealGuests={hotel.ideal_guests || hotel.idealGuests}
          atmosphere={hotel.atmosphere}
          perfectLocation={hotel.perfect_location || hotel.perfectLocation}
        />

        {/* New Amenities & Services Section */}
        <HotelAmenitiesSection
          laundry_service={hotel.laundry_service}
          additional_amenities={hotel.additional_amenities}
          special_features={hotel.special_features}
          accessibility_features={hotel.accessibility_features}
          check_in_instructions={hotel.check_in_instructions}
          local_recommendations={hotel.local_recommendations}
          house_rules={hotel.house_rules}
          cancellation_policy={hotel.cancellation_policy}
        />

        {/* Features Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white text-left">FEATURES</h2>
          <div className="flex flex-wrap gap-2">
            {hotel.hotelFeatures && hotel.hotelFeatures.map((feature, index) => (
              <Badge key={index} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Room Features Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white text-left">ROOM FEATURES</h2>
          <div className="flex flex-wrap gap-2">
            {hotel.roomFeatures && hotel.roomFeatures.map((feature, index) => (
              <Badge key={index} variant="outline">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white text-left">BOOK YOUR STAY</h2>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-2">Availability</h3>
            <p className="text-white/80">Check-in Date:</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[300px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
                  <span>Pick a date</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Pick a date</DialogTitle>
                  <DialogDescription>
                    Choose a date to book your stay.
                  </DialogDescription>
                </DialogHeader>
                <Calendar
                  mode="single"
                  // selected={date}
                  // onSelect={setDate}
                  className="rounded-md border"
                />
              </DialogContent>
            </Dialog>
            <p className="text-white/80 mt-4">Price per month: ${hotel.price_per_month}</p>
            <LinkButton href={`/booking/${id}`} className="mt-4">Book Now</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

import { CalendarIcon } from "@radix-ui/react-icons"
