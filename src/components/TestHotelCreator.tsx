
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createTestHotel } from "@/utils/createTestHotel";
import { useNavigate } from "react-router-dom";

export function TestHotelCreator() {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateTestHotel = async () => {
    setIsCreating(true);
    try {
      const hotel = await createTestHotel();
      toast({
        title: "Test Hotel Created!",
        description: `Hotel "${hotel.name}" has been created successfully.`,
      });
      
      // Navigate to the hotel detail page
      navigate(`/hotel/${hotel.id}`);
    } catch (error: any) {
      console.error("Error creating test hotel:", error);
      
      // Check if it's an authentication error
      if (error.message?.includes("logged in")) {
        toast({
          title: "Authentication Required",
          description: "Please log in first to create a test hotel.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create test hotel. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleCreateTestHotel}
        disabled={isCreating}
        className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
      >
        {isCreating ? "Creating..." : "Create Test Hotel"}
      </Button>
    </div>
  );
}
