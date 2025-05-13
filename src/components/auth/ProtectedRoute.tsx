
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireHotelOwner?: boolean;
}

export const ProtectedRoute = ({ children, requireHotelOwner }: ProtectedRouteProps) => {
  const { user, session, profile } = useAuth();

  if (!user || !session) {
    return <Navigate to="/login" />;
  }

  if (requireHotelOwner && profile?.is_hotel_owner === false) {
    return <Navigate to="/user-dashboard" />;
  }

  return <>{children}</>;
};
