
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

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
      
      // Redirect based on user role
      switch (profile.role) {
        case 'hotel':
          navigate('/hotel-dashboard', { replace: true });
          break;
        case 'user':
          navigate('/user-dashboard', { replace: true });
          break;
        case 'admin':
          navigate('/admin', { replace: true });
          break;
        case 'promoter':
          navigate('/promoter', { replace: true });
          break;
        case 'association':
          navigate('/panel-asociacion', { replace: true });
          break;
        case 'agent':
          navigate('/panel-agente', { replace: true });
          break;
        default:
          // For unknown roles, stay on homepage
          console.log('DashboardAccess - Unknown role:', profile.role);
          break;
      }
    }
  }, [user, profile, location.pathname, navigate]);

  return null;
}
