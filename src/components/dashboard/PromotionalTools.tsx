
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, PercentIcon, TrendingUpIcon, TagIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

// Temporary dummy data - would be fetched from API in a real app
const dummyPromotions = [
  {
    id: '1',
    name: 'Summer Special',
    discountType: 'percentage',
    discountValue: 15,
    startDate: new Date(2025, 5, 1),
    endDate: new Date(2025, 7, 31),
    active: true,
    description: 'Summer discount for all properties',
    appliedTo: 'all',
  },
  {
    id: '2',
    name: 'Last Minute Deal',
    discountType: 'fixed',
    discountValue: 50,
    startDate: new Date(2025, 3, 15),
    endDate: new Date(2025, 4, 15),
    active: true,
    description: 'Last minute booking discount',
    appliedTo: 'specific',
  }
];

export function PromotionalTools() {
  const [promotions, setPromotions] = useState(dummyPromotions);
  const [promoName, setPromoName] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [appliedTo, setAppliedTo] = useState('all');
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const { toast } = useToast();

  const handleCreatePromotion = () => {
    if (!promoName || !discountValue || !startDate || !endDate) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const newPromotion = {
      id: Date.now().toString(),
      name: promoName,
      discountType,
      discountValue: Number(discountValue),
      startDate,
      endDate,
      active: true,
      description,
      appliedTo,
      selectedProperties: appliedTo === 'specific' ? selectedProperties : []
    };

    setPromotions([...promotions, newPromotion]);
    
    // Reset form
    setPromoName('');
    setDiscountValue('');
    setDescription('');
    setStartDate(undefined);
    setEndDate(undefined);
    
    toast({
      title: "Promotion created",
      description: `"${promoName}" has been created successfully.`,
    });
  };

  const handleTogglePromotion = (id: string, active: boolean) => {
    setPromotions(promotions.map(p => p.id === id ? {...p, active} : p));
    
    toast({
      title: active ? "Promotion activated" : "Promotion deactivated",
      description: `The promotion has been ${active ? 'activated' : 'deactivated'}.`,
    });
  };

  const handleDeletePromotion = (id: string) => {
    setPromotions(promotions.filter(p => p.id !== id));
    
    toast({
      title: "Promotion deleted",
      description: "The promotion has been deleted.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Promotional Tools</h2>
        <p className="text-foreground/70">
          Create special offers and discounts for your properties
        </p>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Promotions</TabsTrigger>
          <TabsTrigger value="create">Create Promotion</TabsTrigger>
          <TabsTrigger value="analytics">Promotion Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotions.map(promo => (
              <Card key={promo.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {promo.discountType === 'percentage' ? 
                        <PercentIcon className="h-5 w-5 text-fuchsia-500" /> : 
                        <TagIcon className="h-5 w-5 text-fuchsia-500" />}
                      {promo.name}
                    </CardTitle>
                    <CardDescription>
                      {format(promo.startDate, "MMM d, yyyy")} - {format(promo.endDate, "MMM d, yyyy")}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={promo.active} 
                      onCheckedChange={(checked) => handleTogglePromotion(promo.id, checked)}
                    />
                    <span className={promo.active ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>
                      {promo.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Discount:</span>
                      <span className="font-medium">
                        {promo.discountType === 'percentage' ? 
                          `${promo.discountValue}%` : 
                          `$${promo.discountValue}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Applied to:</span>
                      <span className="font-medium capitalize">{promo.appliedTo} properties</span>
                    </div>
                    {promo.description && (
                      <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                        {promo.description}
                      </div>
                    )}
                    <div className="mt-4 pt-2 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeletePromotion(promo.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {promotions.length === 0 && (
              <div className="col-span-2 text-center py-12 bg-muted/30 rounded-lg">
                <PercentIcon className="mx-auto h-10 w-10 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No active promotions</h3>
                <p className="text-muted-foreground mt-1">
                  Create a promotion to attract more bookings
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Promotion</CardTitle>
              <CardDescription>
                Set up a special offer or discount for your properties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="promo-name">Promotion Name</Label>
                    <Input 
                      id="promo-name" 
                      value={promoName} 
                      onChange={(e) => setPromoName(e.target.value)} 
                      placeholder="Summer Special" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="discount-type">Discount Type</Label>
                    <Select 
                      value={discountType} 
                      onValueChange={setDiscountType}
                    >
                      <SelectTrigger id="discount-type">
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage discount</SelectItem>
                        <SelectItem value="fixed">Fixed amount discount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="discount-value">
                      {discountType === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
                    </Label>
                    <div className="relative">
                      <Input
                        id="discount-value"
                        type="number"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        placeholder={discountType === 'percentage' ? '10' : '50'}
                        className={discountType === 'percentage' ? 'pr-8' : 'pl-8'}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        {discountType === 'percentage' && <span>%</span>}
                      </div>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {discountType === 'fixed' && <span>$</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="applied-to">Apply To</Label>
                    <Select 
                      value={appliedTo} 
                      onValueChange={setAppliedTo}
                    >
                      <SelectTrigger id="applied-to">
                        <SelectValue placeholder="Select properties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All properties</SelectItem>
                        <SelectItem value="specific">Specific properties</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            disabled={date => !startDate || date < startDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description (optional)</Label>
                    <Input 
                      id="description" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Enter promotion details"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleCreatePromotion}
                  className="bg-fuchsia-600 hover:bg-fuchsia-700"
                >
                  Create Promotion
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5 text-fuchsia-500" />
                Promotion Performance Analytics
              </CardTitle>
              <CardDescription>
                Track the effectiveness of your promotional campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Analytics cards would go here */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Total Bookings from Promotions</p>
                      <h3 className="text-3xl font-bold mt-2">124</h3>
                      <p className="text-xs text-green-500 mt-1">+12% from last month</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Revenue from Promotions</p>
                      <h3 className="text-3xl font-bold mt-2">$12,450</h3>
                      <p className="text-xs text-green-500 mt-1">+8% from last month</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                      <h3 className="text-3xl font-bold mt-2">24.5%</h3>
                      <p className="text-xs text-green-500 mt-1">+3.2% from last month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex items-center justify-center h-60 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">Detailed promotion analytics charts would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PromotionalTools;
