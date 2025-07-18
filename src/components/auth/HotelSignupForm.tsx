import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HotelSignupForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Hotel Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="text" placeholder="Hotel Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button className="w-full">Sign Up Hotel</Button>
      </CardContent>
    </Card>
  );
}