import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/utils/countries";
import { CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
interface StepOneProps {
  onValidationChange?: (isValid: boolean) => void;
}
export default function StepOne({
  onValidationChange = () => {}
}: StepOneProps) {
  const [formData, setFormData] = useState({
    hotelName: "",
    description: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    contactName: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Basic validation
    if (!formData.hotelName.trim()) {
      newErrors.hotelName = "Hotel name is required";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!formData.country) {
      newErrors.country = "Country is required";
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }
    setErrors(newErrors);
    onValidationChange(isValid);
    return isValid;
  };
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Mark field as touched
    if (!touchedFields[field]) {
      setTouchedFields(prev => ({
        ...prev,
        [field]: true
      }));
    }

    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };
  const handleBlur = (field: keyof typeof formData) => {
    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate the specific field
    const newErrors = {
      ...errors
    };
    if (field === 'hotelName' && !formData.hotelName.trim()) {
      newErrors.hotelName = "Hotel name is required";
    }
    if (field === 'description' && !formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (field === 'country' && !formData.country) {
      newErrors.country = "Country is required";
    }
    if (field === 'address' && !formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (field === 'city' && !formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (field === 'contactName' && !formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }
    if (field === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
    }
    if (field === 'phone' && !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    setErrors(newErrors);
  };
  React.useEffect(() => {
    validate();
  }, [formData]);

  // Function to check if we should show error for a field
  const shouldShowError = (field: keyof typeof formData) => {
    return touchedFields[field] && errors[field];
  };
  return <div className="space-y-4">
      {/* Add bold title */}
      <h2 className="text-xl font-bold mb-2">MAIN HOTEL DATA</h2>
      
      <div className="grid gap-3">
        <Collapsible className="w-full p-0 rounded-md py-0 px-[12px] bg-[#7a0486]">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-0">
            <h3 className="font-bold uppercase text-[#7A0486] text-base">HOTEL INFORMATION</h3>
            <ChevronRight className="h-5 w-5 text-[#7A0486]" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="space-y-2">
              <div>
                <Label htmlFor="hotel-name" className="text-[#7A0486]">Hotel Name <span className="text-red-500">*</span></Label>
                <Input id="hotel-name" value={formData.hotelName} onChange={e => handleChange("hotelName", e.target.value)} onBlur={() => handleBlur("hotelName")} className={`text-[#7A0486] bg-white/90 border-[#7A0486]/30 ${shouldShowError("hotelName") ? "border-red-500" : ""}`} />
                {shouldShowError("hotelName") && <p className="text-red-500 text-sm mt-1">{errors.hotelName}</p>}
              </div>
              
              <div>
                <Label htmlFor="description" className="text-[#7A0486]">Description <span className="text-red-500">*</span></Label>
                <Textarea id="description" rows={3} value={formData.description} onChange={e => handleChange("description", e.target.value)} onBlur={() => handleBlur("description")} className={`text-[#7A0486] bg-white/90 border-[#7A0486]/30 ${shouldShowError("description") ? "border-red-500" : ""}`} />
                {shouldShowError("description") && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible className="w-full bg-white p-0 rounded-md py-0">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left px-[12px] text-[#7a0486]">
            <h3 className="font-bold uppercase text-[#7A0486] text-base">LOCATION</h3>
            <ChevronRight className="h-5 w-5 text-[#7A0486]" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 px-[12px]">
            <div className="space-y-2">
              <div>
                <Label htmlFor="country" className="text-[#7A0486]">Country <span className="text-red-500">*</span></Label>
                <Select value={formData.country} onValueChange={value => handleChange("country", value)} onOpenChange={() => !formData.country && handleBlur("country")}>
                  <SelectTrigger className={`text-[#7A0486] bg-white/90 border-[#7A0486]/30 ${shouldShowError("country") ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#7A0486]/30">
                    {countries.map(country => <SelectItem key={country.id} value={country.id} className="text-[#7A0486] hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10">
                        {country.name}
                      </SelectItem>)}
                    <SelectItem value="add-new" className="text-green-600 hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10">
                      + Add New Country
                    </SelectItem>
                  </SelectContent>
                </Select>
                {shouldShowError("country") && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
              
              <div>
                <Label htmlFor="address" className="text-[#7A0486]">Address <span className="text-red-500">*</span></Label>
                <Input id="address" value={formData.address} onChange={e => handleChange("address", e.target.value)} onBlur={() => handleBlur("address")} className={`text-[#7A0486] bg-white/90 border-[#7A0486]/30 ${shouldShowError("address") ? "border-red-500" : ""}`} />
                {shouldShowError("address") && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="city" className="text-[#7A0486]">City <span className="text-red-500">*</span></Label>
                  <Select value={formData.city} onValueChange={value => handleChange("city", value)} onOpenChange={() => !formData.city && handleBlur("city")}>
                    <SelectTrigger className={`text-[#7A0486] bg-white/90 border-[#7A0486]/30 ${shouldShowError("city") ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#7A0486]/30">
                      {["New York", "Los Angeles", "Chicago", "Miami", "Las Vegas", "San Francisco"].map(city => <SelectItem key={city} value={city} className="text-[#7A0486] hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10">
                          {city}
                        </SelectItem>)}
                      <SelectItem value="add-new" className="text-green-600 hover:bg-[#7A0486]/10 focus:bg-[#7A0486]/10">
                        + Add New City
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {shouldShowError("city") && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <Label htmlFor="postal-code" className="text-[#7A0486]">Postal Code</Label>
                  <Input id="postal-code" value={formData.postalCode} onChange={e => handleChange("postalCode", e.target.value)} className="text-[#7A0486] bg-white/90 border-[#7A0486]/30" />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible className="w-full bg-white p-0 rounded-md py-0">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left px-[12px]">
            <h3 className="font-bold uppercase text-[#7A0486] text-base">CONTACT INFORMATION</h3>
            <ChevronRight className="h-5 w-5 text-[#7A0486]" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 px-[12px]">
            <div className="space-y-2">
              <div>
                <Label htmlFor="contact-name" className="text-[#7A0486]">Contact Name <span className="text-red-500">*</span></Label>
                <Input id="contact-name" value={formData.contactName} onChange={e => handleChange("contactName", e.target.value)} onBlur={() => handleBlur("contactName")} className={`text-[#7A0486] bg-white/90 border-[#7A0486]/30 ${shouldShowError("contactName") ? "border-red-500" : ""}`} />
                {shouldShowError("contactName") && <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
              </div>
              
              <div>
                <Label htmlFor="email" className="text-[#7A0486]">Email <span className="text-red-500">*</span></Label>
                <Input id="email" type="email" value={formData.email} onChange={e => handleChange("email", e.target.value)} onBlur={() => handleBlur("email")} className={`text-[#7A0486] bg-white/90 border-[#7A0486]/30 ${shouldShowError("email") ? "border-red-500" : ""}`} />
                {shouldShowError("email") && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-[#7A0486]">Phone <span className="text-red-500">*</span></Label>
                <Input id="phone" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} onBlur={() => handleBlur("phone")} className={`text-[#7A0486] bg-white/90 border-[#7A0486]/30 ${shouldShowError("phone") ? "border-red-500" : ""}`} />
                {shouldShowError("phone") && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      {/* Validation status */}
      {Object.keys(errors).length > 0 ? <div className="p-2 rounded-md text-red-500 flex items-center gap-2 bg-[#041888]/[0.97]">
          <AlertCircle className="h-5 w-5" />
          <span className="text-[#f0f0f6] text-sm">Please complete all required fields</span>
        </div> : <div className="p-2 rounded-md bg-green-400/20 text-green-500 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>All required information has been provided</span>
        </div>}
    </div>;
}