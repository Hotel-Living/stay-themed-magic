
import React from 'react';
import { Building, Edit, Trash2, AlertTriangle } from "lucide-react";
import EmptyState from "../../EmptyState";
import { HotelCard } from "@/components/HotelCard";
import { Hotel } from "@/integrations/supabase/types-custom";
import DeletePropertyDialog from "../../DeletePropertyDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

interface PropertyListViewProps {
  user: User | null;
  hotels?: Hotel[];
  isLoading: boolean;
  error: Error | null;
  onViewDetails: (hotel: Hotel) => void;
  onEdit: (hotelId: string) => void;
  onDelete: (hotel: Hotel) => void;
  deleteDialogOpen: boolean;
  hotelToDelete: Hotel | null;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  refetch: () => Promise<any>;
}

export const PropertyListView: React.FC<PropertyListViewProps> = ({
  user,
  hotels,
  isLoading,
  error,
  onViewDetails,
  onEdit,
  onDelete,
  deleteDialogOpen,
  hotelToDelete,
  onCloseDeleteDialog,
  onConfirmDelete,
  refetch
}) => {
  if (!user) {
    return (
      <EmptyState
        icon={<Building className="w-8 h-8" />}
        title="No Properties Found"
        description="You haven't added any properties yet. Add your first property to get started."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Properties</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <Skeleton className="h-48 w-full bg-fuchsia-900/30" />
              <div className="p-4 space-y-2 bg-fuchsia-950/30">
                <Skeleton className="h-6 w-3/4 bg-fuchsia-900/30" />
                <Skeleton className="h-4 w-1/2 bg-fuchsia-900/30" />
                <Skeleton className="h-4 w-2/3 bg-fuchsia-900/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-900/20 border border-red-700/50 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="h-6 w-6 text-red-400" />
          <h3 className="text-lg font-semibold text-red-300">Error Loading Properties</h3>
        </div>
        <p className="text-white/70 mb-4">There was a problem loading your properties. Please try again later.</p>
        <Button onClick={() => refetch()} variant="outline" className="bg-red-700/30 hover:bg-red-700/50">
          Try Again
        </Button>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <EmptyState
        icon={<Building className="w-8 h-8" />}
        title="No Properties Found"
        description="You haven't added any properties yet. Add your first property to get started."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="relative group">
            <div onClick={() => onViewDetails(hotel)} className="cursor-pointer">
              <HotelCard
                id={hotel.id}
                name={hotel.name}
                city={hotel.city}
                country={hotel.country}
                stars={hotel.category || 0}
                pricePerMonth={hotel.price_per_month || 0}
                themes={(hotel.hotel_themes || []).map((ht) => ht.themes || { id: "", name: "" })}
                image={
                  hotel.main_image_url
                    ? hotel.main_image_url
                    : hotel.hotel_images && hotel.hotel_images.length > 0
                    ? hotel.hotel_images[0].image_url
                    : "/placeholder.svg"
                }
                availableMonths={hotel.available_months || []}
              />
            </div>
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <button
                className="bg-fuchsia-600/90 text-white rounded-full p-2 shadow hover:bg-fuchsia-700 transition-opacity opacity-90 group-hover:opacity-100"
                title="Edit this property"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(hotel.id);
                }}
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="bg-red-500/90 text-white rounded-full p-2 shadow hover:bg-red-600 transition-opacity opacity-90 group-hover:opacity-100"
                title="Delete this property"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(hotel);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {hotelToDelete && (
        <DeletePropertyDialog
          open={deleteDialogOpen}
          onClose={onCloseDeleteDialog}
          onConfirm={onConfirmDelete}
          hotelName={hotelToDelete.name}
          hotelId={hotelToDelete.id}
        />
      )}
    </>
  );
};
