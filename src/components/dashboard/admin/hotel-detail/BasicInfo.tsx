import React from "react";
import { Star } from "lucide-react";
import { AdminHotelDetail } from "@/types/hotel";

interface BasicInfoProps {
  hotel: AdminHotelDetail;
}

export function BasicInfo({ hotel }: BasicInfoProps) {
  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Hotel Name</p>
          <p className="font-medium">{hotel.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Status</p>
          <p className="font-medium capitalize">
            <span className={`px-2 py-1 rounded-full text-xs ${
              hotel.status === 'approved' ? 'bg-green-100 text-green-800' : 
              hotel.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {hotel.status}
            </span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Property Type</p>
          <p className="font-medium">{hotel.property_type || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Style</p>
          <p className="font-medium">{hotel.style || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Price Per Month</p>
          <p className="font-medium">${hotel.price_per_month}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Featured</p>
          <p className="font-medium">{hotel.is_featured ? "Yes" : "No"}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Description</p>
          <p className="font-medium">{hotel.description || "No description provided."}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Stars / Category</p>
          <div className="flex items-center gap-1">
            {Array.from({length: hotel.category || 0}).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            ))}
            {hotel.category ? `${hotel.category}-star` : "No rating provided"}
          </div>
        </div>
      </div>
    </div>
  );
}
