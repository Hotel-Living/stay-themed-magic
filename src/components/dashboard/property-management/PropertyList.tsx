
import React, { useState } from 'react';
import { Building, Edit, Trash2, ImagePlus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropertyGallery } from './PropertyGallery';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mock properties for demonstration
const mockProperties = [
  {
    id: "1",
    name: "Parador de Granada",
    description: "Historic hotel in the heart of Granada",
    location: "Granada, Spain",
    type: "Hotel",
    rooms: 31,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    id: "2",
    name: "TechHub Barcelona",
    description: "Modern apartments for digital nomads",
    location: "Barcelona, Spain",
    type: "Apartment",
    rooms: 15,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

interface PropertyListProps {
  onSelectProperty: (id: string | null) => void;
  selectedPropertyId: string | null;
}

export function PropertyList({ onSelectProperty, selectedPropertyId }: PropertyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showGalleryForProperty, setShowGalleryForProperty] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  
  const filteredProperties = mockProperties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEditProperty = (id: string) => {
    onSelectProperty(id);
    // Switch to the edit tab
    const addTab = document.querySelector('button[data-state="inactive"][value="add"]') as HTMLElement;
    if (addTab) {
      addTab.click();
    }
  };
  
  const handleDeleteProperty = (id: string) => {
    setPropertyToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    // In a real application, this would call an API to delete the property
    toast({
      title: "Property deleted",
      description: "The property has been successfully deleted.",
    });
    
    // Reset state
    setIsDeleteDialogOpen(false);
    setPropertyToDelete(null);
  };
  
  const handleManageImages = (id: string) => {
    setShowGalleryForProperty(id);
  };
  
  const toggleFeatured = (id: string) => {
    // In a real application, this would call an API to update the property
    toast({
      title: "Property updated",
      description: "Featured status has been updated.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full md:max-w-sm">
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        
        <Button 
          onClick={() => {
            onSelectProperty(null);
            // Switch to the add tab
            const addTab = document.querySelector('button[data-state="inactive"][value="add"]') as HTMLElement;
            if (addTab) {
              addTab.click();
            }
          }}
        >
          Add New Property
        </Button>
      </div>
      
      {filteredProperties.length === 0 ? (
        <div className="text-center p-12 border border-dashed rounded-lg">
          <Building className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-semibold">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your search or add a new property.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card 
              key={property.id} 
              className={`overflow-hidden transition-all ${
                selectedPropertyId === property.id ? "ring-2 ring-fuchsia-500" : ""
              }`}
            >
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${property.imageUrl})` }}
              >
                {property.featured && (
                  <div className="p-2">
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-start">
                  <span>{property.name}</span>
                  <Badge variant="outline">{property.type}</Badge>
                </CardTitle>
                <CardDescription>{property.location}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className="text-sm">{property.description}</p>
                <p className="text-sm mt-2 font-medium">
                  {property.rooms} room{property.rooms !== 1 ? 's' : ''}
                </p>
              </CardContent>
              
              <CardFooter className="flex justify-between gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleManageImages(property.id)}
                >
                  <ImagePlus className="w-4 h-4 mr-1" />
                  Images
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => toggleFeatured(property.id)}
                    title={property.featured ? "Remove from featured" : "Add to featured"}
                  >
                    <Star className={`w-4 h-4 ${property.featured ? "fill-yellow-500 text-yellow-500" : ""}`} />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditProperty(property.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteProperty(property.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Gallery Dialog */}
      {showGalleryForProperty && (
        <Dialog open={!!showGalleryForProperty} onOpenChange={() => setShowGalleryForProperty(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                Property Gallery - {mockProperties.find(p => p.id === showGalleryForProperty)?.name}
              </DialogTitle>
              <DialogDescription>
                Manage images for this property
              </DialogDescription>
            </DialogHeader>
            
            <PropertyGallery propertyId={showGalleryForProperty} />
            
            <DialogFooter>
              <Button onClick={() => setShowGalleryForProperty(null)}>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
