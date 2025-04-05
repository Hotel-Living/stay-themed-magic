
import React, { useState } from 'react';
import { Settings, Save, Clock, CreditCard, Shield, Bell, Globe, HelpCircle, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import CheckInOutSection from './PropertySteps/rooms/CheckInOutSection';
import MealPlanSection from './PropertySteps/rooms/MealPlanSection';

export default function SettingsContent() {
  const { toast } = useToast();
  const [currency, setCurrency] = useState('USD');
  const [enableAutoPrice, setEnableAutoPrice] = useState(false);
  const [priceIncreasePercent, setPriceIncreasePercent] = useState('20');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingConfirmations, setBookingConfirmations] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(true);
  const [paymentNotifications, setPaymentNotifications] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully."
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Hotel Settings</h2>
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="checkin">Check-in/out</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Currency</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
                <CardDescription>Update your hotel's main information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hotel-name">Hotel Name</Label>
                  <Input id="hotel-name" placeholder="Hotel Name" className="bg-fuchsia-950/50" />
                </div>
                
                <div>
                  <Label htmlFor="hotel-description">Hotel Description</Label>
                  <Textarea id="hotel-description" placeholder="Describe your hotel" className="bg-fuchsia-950/50" />
                </div>
                
                <div>
                  <Label htmlFor="website">Hotel Website</Label>
                  <Input id="website" placeholder="https://www.yourhotel.com" className="bg-fuchsia-950/50" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How guests and Hotel-Living can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" placeholder="contact@yourhotel.com" className="bg-fuchsia-950/50" />
                </div>
                
                <div>
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" placeholder="+1 234 567 8901" className="bg-fuchsia-950/50" />
                </div>
                
                <div>
                  <Label htmlFor="contact-address">Address</Label>
                  <Input id="contact-address" placeholder="123 Hotel St, City" className="bg-fuchsia-950/50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="checkin">
          <Card>
            <CardHeader>
              <CardTitle>Check-in/out Policy</CardTitle>
              <CardDescription>Set your hotel's check-in and check-out times</CardDescription>
            </CardHeader>
            <CardContent>
              <CheckInOutSection />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Currency Settings</CardTitle>
                <CardDescription>Select your preferred currency for rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currency">Preferred Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-full bg-fuchsia-950/50">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {["USD", "EUR", "GBP", "JPY", "CNY", "AUD", "CAD"].map(currency => (
                          <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                    <Input id="tax-rate" type="number" placeholder="10" className="bg-fuchsia-950/50" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Automatic Price Increase</CardTitle>
                <CardDescription>Automatically increase prices as rooms get booked</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-price-increase">Enable Auto Price Increase</Label>
                  <Switch
                    id="auto-price-increase"
                    checked={enableAutoPrice}
                    onCheckedChange={setEnableAutoPrice}
                  />
                </div>
                
                {enableAutoPrice && (
                  <div>
                    <Label htmlFor="price-increase">Price Increase Percentage</Label>
                    <div className="flex items-center">
                      <Input
                        id="price-increase"
                        type="number"
                        value={priceIncreasePercent}
                        onChange={(e) => setPriceIncreasePercent(e.target.value)}
                        min="1"
                        max="100"
                        className="bg-fuchsia-950/50"
                      />
                      <span className="ml-2">%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      When 75% of rooms are booked, prices will increase by this percentage
                    </p>
                  </div>
                )}
                
                <div className="pt-4">
                  <Label htmlFor="min-stay">Minimum Stay Requirements</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <Label htmlFor="peak-min-stay" className="text-sm">Peak Season</Label>
                      <Input id="peak-min-stay" type="number" min="1" placeholder="3" className="bg-fuchsia-950/50" />
                    </div>
                    <div>
                      <Label htmlFor="off-min-stay" className="text-sm">Off Season</Label>
                      <Input id="off-min-stay" type="number" min="1" placeholder="1" className="bg-fuchsia-950/50" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Default Meal Plans</CardTitle>
              <CardDescription>Configure default meal plans for your property</CardDescription>
            </CardHeader>
            <CardContent>
              <MealPlanSection onValidationChange={() => {}} showHeader={false} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="space-y-4 pt-4 border-t border-fuchsia-800/20">
                <h4 className="font-medium">Notification Types</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">New Booking Confirmations</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications when a new booking is made
                    </p>
                  </div>
                  <Switch 
                    checked={bookingConfirmations} 
                    onCheckedChange={setBookingConfirmations}
                    disabled={!emailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Review Alerts</Label>
                    <p className="text-xs text-muted-foreground">
                      Get notified when a new review is posted
                    </p>
                  </div>
                  <Switch 
                    checked={reviewAlerts} 
                    onCheckedChange={setReviewAlerts}
                    disabled={!emailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Payment Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive alerts for payment processing
                    </p>
                  </div>
                  <Switch 
                    checked={paymentNotifications} 
                    onCheckedChange={setPaymentNotifications}
                    disabled={!emailNotifications}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="bg-fuchsia-950/50" />
              </div>
              
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="bg-fuchsia-950/50" />
              </div>
              
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="bg-fuchsia-950/50" />
              </div>
              
              <div>
                <Button className="w-full">Update Password</Button>
              </div>
              
              <div className="pt-4 border-t border-fuchsia-800/20">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle>Hotel Policies</CardTitle>
              <CardDescription>Configure your hotel's policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
                <Textarea 
                  id="cancellation-policy" 
                  className="bg-fuchsia-950/50 min-h-[100px]" 
                  placeholder="Enter your cancellation policy details..."
                  defaultValue="Guests may cancel free of charge up to 48 hours before arrival. Guests will be charged the full amount if they cancel within 48 hours of arrival."
                />
              </div>
              
              <div>
                <Label htmlFor="pet-policy">Pet Policy</Label>
                <Select defaultValue="not-allowed">
                  <SelectTrigger className="w-full bg-fuchsia-950/50">
                    <SelectValue placeholder="Pet policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allowed">Pets Allowed</SelectItem>
                    <SelectItem value="not-allowed">No Pets Allowed</SelectItem>
                    <SelectItem value="case-by-case">Case by Case Basis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="smoking-policy">Smoking Policy</Label>
                <Select defaultValue="non-smoking">
                  <SelectTrigger className="w-full bg-fuchsia-950/50">
                    <SelectValue placeholder="Smoking policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smoking">Smoking Allowed</SelectItem>
                    <SelectItem value="non-smoking">Non-Smoking</SelectItem>
                    <SelectItem value="designated-areas">Designated Areas Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="children-policy">Children Policy</Label>
                <Select defaultValue="allowed">
                  <SelectTrigger className="w-full bg-fuchsia-950/50">
                    <SelectValue placeholder="Children policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allowed">Children Welcome</SelectItem>
                    <SelectItem value="not-allowed">Adults Only</SelectItem>
                    <SelectItem value="with-restrictions">With Age Restrictions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
