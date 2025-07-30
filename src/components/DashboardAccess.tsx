
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRedirectUrlForRole } from '@/utils/dashboardSecurity';

export function DashboardAccess() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Removed automatic homepage redirect to allow logo access to landing page
  // Users can still access dashboards through dedicated navigation links

  return null;
}
