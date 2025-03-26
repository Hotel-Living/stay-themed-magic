
import React, { useState } from 'react';
import { Percent, CalendarIcon, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Mock properties for selection
const mockProperties = [
  { id: "1", name: "Parador de Granada" },
  { id: "2", name: "TechHub Barcelona" },
];

// Mock promotions
const mockPromotions = [
  {
    id: "1",
    propertyId: "1",
    name: "Summer Special",
    description: "Enjoy a 15% discount on summer bookings!",
    type: "discount",
    value: 15,
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 8, 30),
    isActive: true,
  },
  {
    id: "2",
    propertyId: "1",
    name: "Early Bird Booking",
    description: "Book 3 months in advance and get 10% off!",
    type: "discount",
    value: 10,
    startDate: new Date(2023, 0, 1),
    endDate: new Date(2023, 11, 31),
    isActive: true,
  },
  {
    id: "3",
    propertyId: "2",
    name: "Digital Nomad Package",
    description: "Stay for a month and get a 20% discount plus free workspace access!",
    type: "discount",
    value: 20,
    startDate: new Date(2023, 8, 1),
    endDate: new Date(2023, 11, 31),
    isActive: true,
  },
];

interface PropertyPromotionsProps {
  propertyId: string | null;
}

export function PropertyPromotions({ propertyId: initialPropertyId }: PropertyPromotionsProps) {
  const { toast } = useToast();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(initialPropertyId);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<typeof mockPromotions[0] | null>(null);
  const [promotionForm, setPromotionForm] = useState({
    name: "",
    description: "",
    type: "discount",
    value: 10,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    isActive: true,
  });
  
  // Update the selected property when the prop changes
  React.useEffect(() => {
    if (initialPropertyId) {
      setSelectedPropertyId(initialPropertyId);
    }
  }, [initialPropertyId]);
  
  // Filter promotions based on selected property
  const filteredPromotions = selectedPropertyId 
    ? mockPromotions.filter(promo => promo.propertyId === selectedPropertyId)
    : [];
  
  const handleCreatePromotion = () => {
    if (!selectedPropertyId) {
      toast({
        title: "No property selected",
        description: "Please select a property first.",
        variant: "destructive",
      });
      return;
    }
    
    setPromotionForm({
      name: "",
      description: "",
      type: "discount",
      value: 10,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      isActive: true,
    });
    
    setIsCreateDialogOpen(true);
  };
  
  const handleEditPromotion = (promotion: typeof mockPromotions[0]) => {
    setSelectedPromotion(promotion);
    setPromotionForm({
      name: promotion.name,
      description: promotion.description,
      type: promotion.type,
      value: promotion.value,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      isActive: promotion.isActive,
    });
    
    setIsEditDialogOpen(true);
  };
  
  const handleDeletePromotion = (promotion: typeof mockPromotions[0]) => {
    setSelectedPromotion(promotion);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmCreatePromotion = () => {
    // In a real application, this would call an API to create the promotion
    toast({
      title: "Promotion created",
      description: "Your promotion has been created successfully.",
    });
    
    setIsCreateDialogOpen(false);
  };
  
  const confirmEditPromotion = () => {
    // In a real application, this would call an API to update the promotion
    toast({
      title: "Promotion updated",
      description: "Your promotion has been updated successfully.",
    });
    
    setIsEditDialogOpen(false);
    setSelectedPromotion(null);
  };
  
  const confirmDeletePromotion = () => {
    // In a real application, this would call an API to delete the promotion
    toast({
      title: "Promotion deleted",
      description: "Your promotion has been deleted successfully.",
    });
    
    setIsDeleteDialogOpen(false);
    setSelectedPromotion(null);
  };
  
  const togglePromotionStatus = (promotion: typeof mockPromotions[0]) => {
    // In a real application, this would call an API to toggle the promotion status
    toast({
      title: promotion.isActive ? "Promotion deactivated" : "Promotion activated",
      description: `Your promotion has been ${promotion.isActive ? 'deactivated' : 'activated'} successfully.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Promotional Tools</h3>
          <p className="text-sm text-muted-foreground">
            Create and manage special offers and discounts
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Select
            value={selectedPropertyId || ""}
            onValueChange={(value) => setSelectedPropertyId(value)}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select a property" />
            </SelectTrigger>
            <SelectContent>
              {mockProperties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button onClick={handleCreatePromotion}>
            <Plus className="mr-2 h-4 w-4" /> Create Promotion
          </Button>
        </div>
      </div>
      
      {!selectedPropertyId ? (
        <div className="flex items-center justify-center p-12 border border-dashed rounded-lg">
          <div className="text-center">
            <Percent className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-semibold">No property selected</h3>
            <p className="text-muted-foreground">
              Select a property to manage its promotions
            </p>
          </div>
        </div>
      ) : filteredPromotions.length === 0 ? (
        <div className="flex items-center justify-center p-12 border border-dashed rounded-lg">
          <div className="text-center">
            <Percent className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-semibold">No promotions yet</h3>
            <p className="text-muted-foreground">
              Create your first promotion to attract more bookings
            </p>
            <Button className="mt-4" onClick={handleCreatePromotion}>
              <Plus className="mr-2 h-4 w-4" /> Create Promotion
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map((promotion) => (
            <Card key={promotion.id} className={`overflow-hidden ${promotion.isActive ? '' : 'opacity-60'}`}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{promotion.name}</CardTitle>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditPromotion(promotion)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeletePromotion(promotion)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {promotion.type === 'discount' && (
                    <span className="text-lg font-bold text-fuchsia-600">{promotion.value}% OFF</span>
                  )}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-4">
                <p className="text-sm">{promotion.description}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3" />
                    <span>
                      {format(promotion.startDate, 'PPP')} - {format(promotion.endDate, 'PPP')}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button
                  variant={promotion.isActive ? "outline" : "default"}
                  size="sm"
                  className="w-full"
                  onClick={() => togglePromotionStatus(promotion)}
                >
                  {promotion.isActive ? "Deactivate" : "Activate"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Create Promotion Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Promotion</DialogTitle>
            <DialogDescription>
              Create a special offer or discount for your property
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Promotion Name</label>
              <Input
                placeholder="Enter promotion name"
                value={promotionForm.name}
                onChange={(e) => setPromotionForm({ ...promotionForm, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Enter promotion description"
                value={promotionForm.description}
                onChange={(e) => setPromotionForm({ ...promotionForm, description: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={promotionForm.type}
                  onValueChange={(value) => setPromotionForm({ ...promotionForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Discount</SelectItem>
                    <SelectItem value="special">Special Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Value (%)</label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={promotionForm.value}
                  onChange={(e) => setPromotionForm({ ...promotionForm, value: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {promotionForm.startDate ? format(promotionForm.startDate, 'PPP') : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={promotionForm.startDate}
                      onSelect={(date) => date && setPromotionForm({ ...promotionForm, startDate: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {promotionForm.endDate ? format(promotionForm.endDate, 'PPP') : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={promotionForm.endDate}
                      onSelect={(date) => date && setPromotionForm({ ...promotionForm, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCreatePromotion}>
              Create Promotion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Promotion Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Promotion</DialogTitle>
            <DialogDescription>
              Update your promotion details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Promotion Name</label>
              <Input
                placeholder="Enter promotion name"
                value={promotionForm.name}
                onChange={(e) => setPromotionForm({ ...promotionForm, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Enter promotion description"
                value={promotionForm.description}
                onChange={(e) => setPromotionForm({ ...promotionForm, description: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={promotionForm.type}
                  onValueChange={(value) => setPromotionForm({ ...promotionForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Discount</SelectItem>
                    <SelectItem value="special">Special Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Value (%)</label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={promotionForm.value}
                  onChange={(e) => setPromotionForm({ ...promotionForm, value: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {promotionForm.startDate ? format(promotionForm.startDate, 'PPP') : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={promotionForm.startDate}
                      onSelect={(date) => date && setPromotionForm({ ...promotionForm, startDate: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {promotionForm.endDate ? format(promotionForm.endDate, 'PPP') : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={promotionForm.endDate}
                      onSelect={(date) => date && setPromotionForm({ ...promotionForm, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEditPromotion}>
              Update Promotion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this promotion? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeletePromotion}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
