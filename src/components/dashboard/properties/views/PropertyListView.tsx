
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { Hotel } from "@/integrations/supabase/types-custom";
import { User } from "@supabase/supabase-js";
import { DeletePropertyDialog } from "../DeletePropertyDialog";

interface PropertyListViewProps {
  user: User | null;
  hotels: Hotel[] | undefined;
  isLoading: boolean;
  error: any;
  onViewDetails: (hotel: Hotel) => void;
  onEdit: (hotelId: string) => void;
  onDelete: (hotel: Hotel) => void;
  onAddNewProperty: () => void;
  deleteDialogOpen: boolean;
  hotelToDelete: Hotel | null;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  refetch: () => void;
}

export const PropertyListView: React.FC<PropertyListViewProps> = ({
  user,
  hotels,
  isLoading,
  error,
  onViewDetails,
  onEdit,
  onDelete,
  onAddNewProperty,
  deleteDialogOpen,
  hotelToDelete,
  onCloseDeleteDialog,
  onConfirmDelete,
  refetch
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        Error loading properties: {error.message}
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-semibold mb-4">No properties found</h3>
        <Button onClick={onAddNewProperty} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Your First Property
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Properties</h2>
        <Button onClick={onAddNewProperty} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Property
        </Button>
      </div>

      <div className="grid gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="border-purple-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                  <p className="text-sm text-gray-600">{hotel.city}, {hotel.country}</p>
                  <p className="text-sm font-medium mt-1">
                    Status: <span className={`px-2 py-1 rounded text-xs ${
                      hotel.status === 'approved' ? 'bg-green-100 text-green-800' :
                      hotel.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {hotel.status || 'pending'}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(hotel)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(hotel.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(hotel)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {hotel.main_image_url && (
                  <img 
                    src={hotel.main_image_url} 
                    alt={hotel.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {hotel.description || 'No description available'}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    €{hotel.price_per_month}/month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeletePropertyDialog
        isOpen={deleteDialogOpen}
        onClose={onCloseDeleteDialog}
        onConfirm={onConfirmDelete}
        hotelName={hotelToDelete?.name || ''}
        refetch={refetch}
      />
    </div>
  );
};
