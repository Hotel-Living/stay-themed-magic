
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRedirectUrlForRole } from '@/utils/dashboardSecurity';

export function DashboardAccess() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect from homepage when user is authenticated
    if (user && profile && location.pathname === '/') {
      console.log('DashboardAccess - User authenticated, redirecting to dashboard', { 
        user: user.email, 
        role: profile.role 
      });
      
      const redirectUrl = getRedirectUrlForRole(profile);
      if (redirectUrl !== '/') {
        console.log('DashboardAccess - Redirecting to:', redirectUrl);
        navigate(redirectUrl, { replace: true });
      } else {
        console.log('DashboardAccess - No valid redirect URL, staying on homepage');
      }
    }
  }, [user, profile, location.pathname, navigate]);

  return null;
}
