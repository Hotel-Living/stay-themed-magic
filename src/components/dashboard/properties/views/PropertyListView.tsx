
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, Edit, Trash2, Eye, Plus } from "lucide-react";
import { Hotel } from "@/integrations/supabase/types-custom";
import { DeletePropertyDialog } from "../DeletePropertyDialog";
import { useTranslation } from "@/hooks/useTranslation";

interface PropertyListViewProps {
  user: any;
  hotels: any[] | undefined;
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
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading your properties...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Error loading properties: {error.message}</div>
      </div>
    );
  }

  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-600 text-white';
      case 'pending':
        return 'bg-yellow-600 text-white';
      case 'rejected':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'approved':
        return t('dashboard.approved');
      case 'pending':
        return t('dashboard.pending');
      case 'rejected':
        return t('dashboard.rejected');
      default:
        return t('dashboard.pending');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add New Property Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{t('dashboard.myProperties')}</h1>
          <p className="text-white/60">
            {hotels?.length || 0} {hotels?.length === 1 ? 'property' : 'properties'} registered
          </p>
        </div>
        <Button
          onClick={onAddNewProperty}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {t('dashboard.addNewProperty')}
        </Button>
      </div>

      {/* Properties Grid */}
      {!hotels || hotels.length === 0 ? (
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="text-white/60 text-lg">No properties registered yet</div>
              <p className="text-white/40 max-w-md">
                Start by adding your first property to begin receiving bookings and managing your hotel business.
              </p>
              <Button
                onClick={onAddNewProperty}
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white flex items-center gap-2 mt-4"
              >
                <Plus className="h-4 w-4" />
                {t('dashboard.addNewProperty')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="bg-purple-900/20 border-purple-800/30 hover:border-purple-700/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg">{hotel.name}</CardTitle>
                    <CardDescription className="text-white/60 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {hotel.city}, {hotel.country}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusBadgeColor(hotel.status)}>
                    {getStatusText(hotel.status)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Hotel Image */}
                {hotel.main_image_url && (
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={hotel.main_image_url} 
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Hotel Details */}
                <div className="space-y-2 text-sm text-white/80">
                  {hotel.property_type && (
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>{hotel.property_type}</span>
                    </div>
                  )}
                  
                  {hotel.available_months && hotel.available_months.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{hotel.available_months.length} months available</span>
                    </div>
                  )}

                  {hotel.price_per_month && (
                    <div className="text-fuchsia-400 font-semibold">
                      ${hotel.price_per_month.toLocaleString()}/month
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(hotel)}
                    className="flex-1 text-white border-purple-600 hover:bg-purple-800/50"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(hotel.id)}
                    className="flex-1 text-white border-purple-600 hover:bg-purple-800/50"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(hotel)}
                    className="text-red-400 border-red-600 hover:bg-red-800/50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
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
