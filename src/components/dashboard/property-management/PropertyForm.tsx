
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

// Mock properties for demonstration
const mockProperties = [
  {
    id: "1",
    name: "Parador de Granada",
    description: "Historic hotel in the heart of Granada",
    address: "Calle Real de la Alhambra, 1, 18009 Granada, Spain",
    city: "Granada",
    country: "Spain",
    propertyType: "Hotel",
    propertyStyle: "Historic",
    rooms: 31,
    pricePerMonth: 3200,
    featured: true,
  },
  {
    id: "2",
    name: "TechHub Barcelona",
    description: "Modern apartments for digital nomads",
    address: "Carrer de Pallars, 108, 08018 Barcelona, Spain",
    city: "Barcelona",
    country: "Spain",
    propertyType: "Apartment",
    propertyStyle: "Modern",
    rooms: 15,
    pricePerMonth: 1800,
    featured: false,
  }
];

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
  propertyType: z.string().min(1, { message: "Property type is required" }),
  propertyStyle: z.string().min(1, { message: "Property style is required" }),
  rooms: z.coerce.number().int().positive({ message: "Must be a positive number" }),
  pricePerMonth: z.coerce.number().int().positive({ message: "Must be a positive number" }),
  featured: z.boolean().default(false),
});

interface PropertyFormProps {
  propertyId: string | null;
}

export function PropertyForm({ propertyId }: PropertyFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      country: "",
      propertyType: "",
      propertyStyle: "",
      rooms: 1,
      pricePerMonth: 0,
      featured: false
    },
  });
  
  // Load property data if editing
  useEffect(() => {
    if (propertyId) {
      const property = mockProperties.find(p => p.id === propertyId);
      if (property) {
        form.reset({
          name: property.name,
          description: property.description,
          address: property.address,
          city: property.city,
          country: property.country,
          propertyType: property.propertyType,
          propertyStyle: property.propertyStyle,
          rooms: property.rooms,
          pricePerMonth: property.pricePerMonth,
          featured: property.featured,
        });
      }
    } else {
      form.reset({
        name: "",
        description: "",
        address: "",
        city: "",
        country: "",
        propertyType: "",
        propertyStyle: "",
        rooms: 1,
        pricePerMonth: 0,
        featured: false
      });
    }
  }, [propertyId, form]);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: propertyId ? "Property updated" : "Property created",
      description: propertyId 
        ? "The property has been successfully updated." 
        : "The property has been successfully created.",
    });
    
    setIsSubmitting(false);
    
    if (!propertyId) {
      form.reset({
        name: "",
        description: "",
        address: "",
        city: "",
        country: "",
        propertyType: "",
        propertyStyle: "",
        rooms: 1,
        pricePerMonth: 0,
        featured: false
      });
    }
  };
  
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">
        {propertyId ? "Edit Property" : "Add New Property"}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter property name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rooms</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        placeholder="Number of rooms" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pricePerMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per Month ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        placeholder="Enter price" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter property description" 
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Hotel">Hotel</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Resort">Resort</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="propertyStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Style</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Modern">Modern</SelectItem>
                      <SelectItem value="Classic">Classic</SelectItem>
                      <SelectItem value="Historic">Historic</SelectItem>
                      <SelectItem value="Rustic">Rustic</SelectItem>
                      <SelectItem value="Minimalist">Minimalist</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured Property</FormLabel>
                    <FormDescription>
                      This property will be highlighted on the homepage
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span>Saving...</span>
              ) : propertyId ? (
                "Update Property"
              ) : (
                "Create Property"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
