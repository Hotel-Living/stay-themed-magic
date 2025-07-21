
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { InputField } from "@/components/auth/InputField";
import { PasswordField } from "@/components/auth/PasswordField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { User, Mail, MapPin, Lock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Country } from "country-state-city";
import { validatePassword } from "@/utils/passwordValidation";

export function AssociationRegistration() {
  const [formData, setFormData] = useState({
    associationName: "",
    responsibleName: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const countries = Country.getAllCountries();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.associationName.trim()) {
      toast({
        title: "Error",
        description: "Association name is required",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.responsibleName.trim()) {
      toast({
        title: "Error",
        description: "Responsible person name is required",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Error",
        description: "Email is required",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.country) {
      toast({
        title: "Error",
        description: "Country is required",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.password) {
      toast({
        title: "Error",
        description: "Password is required",
        variant: "destructive",
      });
      return false;
    }

    const { isValid } = validatePassword(formData.password);
    if (!isValid) {
      toast({
        title: "Error",
        description: "Password does not meet requirements",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("Starting association registration...");

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.responsibleName,
            user_type: 'association'
          }
        }
      });

      if (authError) {
        console.error("Auth error:", authError);
        toast({
          title: "Registration Error",
          description: authError.message,
          variant: "destructive",
        });
        return;
      }

      if (!authData.user) {
        toast({
          title: "Registration Error",
          description: "Failed to create user account",
          variant: "destructive",
        });
        return;
      }

      console.log("User created successfully:", authData.user.id);

      // Insert into hotel_associations table
      const { error: associationError } = await supabase
        .from('hotel_associations')
        .insert({
          association_name: formData.associationName,
          responsible_name: formData.responsibleName,
          email: formData.email,
          country: formData.country
        });

      if (associationError) {
        console.error("Association insertion error:", associationError);
        toast({
          title: "Registration Error",
          description: "Failed to register association: " + associationError.message,
          variant: "destructive",
        });
        return;
      }

      console.log("Association registered successfully");
      
      toast({
        title: "Registration Successful",
        description: "Your association has been registered successfully. Please check your email to verify your account.",
        variant: "default",
      });

      // Reset form
      setFormData({
        associationName: "",
        responsibleName: "",
        email: "",
        country: "",
        password: "",
        confirmPassword: ""
      });

    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        id="associationName"
        label="Association Name"
        type="text"
        value={formData.associationName}
        onChange={(e) => handleInputChange("associationName", e.target.value)}
        placeholder="Ej: Asociación Marítima"
        Icon={User}
      />

      <InputField
        id="responsibleName"
        label="Full Name of Responsible Person"
        type="text"
        value={formData.responsibleName}
        onChange={(e) => handleInputChange("responsibleName", e.target.value)}
        placeholder="Enter full name"
        Icon={User}
      />

      <InputField
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        placeholder="email@asociacion.com"
        Icon={Mail}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Country <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white">
            <MapPin className="h-5 w-5" />
          </div>
          <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
            <SelectTrigger className="w-full rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-white/30 focus:ring-0 transition-colors [&>span]:text-white [&_svg]:text-white">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent className="bg-[#7E26A6] border-white/20 max-h-60">
              {countries.map((country) => (
                <SelectItem
                  key={country.isoCode}
                  value={country.isoCode}
                  className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                >
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <PasswordField
        id="password"
        label="Password"
        value={formData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        placeholder="Create a password"
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword(!showPassword)}
        showValidation={true}
      />

      <PasswordField
        id="confirmPassword"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
        placeholder="Confirm your password"
        showPassword={showConfirmPassword}
        toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
      />

      <SubmitButton
        isLoading={isLoading}
        loadingText="Registering Association..."
        text="Register Association"
      />
    </form>
  );
}
