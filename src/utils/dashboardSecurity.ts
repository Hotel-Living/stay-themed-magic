import { supabase } from "@/integrations/supabase/client";

// Define compatible Profile type that matches the actual usage
export interface ProfileCompat {
  id: string;
  role?: string;
  is_hotel_owner?: boolean;
}

/**
 * Checks if current environment is development or user has admin privileges
 * This allows unrestricted access for administrators and during development
 */
export const isDevelopmentOrAdmin = async (): Promise<boolean> => {
  // Always allow access in development
  if (import.meta.env.DEV) {
    console.log('isDevelopmentOrAdmin: Development mode detected, granting access');
    return true;
  }
  
  try {
    console.log('isDevelopmentOrAdmin: Checking admin role via RPC...');
    // Check if current user has admin role
    const { data: hasAdminRole, error } = await supabase.rpc('has_role', { role_name: 'admin' });
    
    if (error) {
      console.error('isDevelopmentOrAdmin: Error checking admin role:', error);
      console.error('isDevelopmentOrAdmin: Error details:', { 
        message: error.message, 
        details: error.details,
        hint: error.hint,
        code: error.code 
      });
      return false;
    }
    
    console.log('isDevelopmentOrAdmin: Admin role check result:', hasAdminRole);
    return Boolean(hasAdminRole);
  } catch (error) {
    console.error('isDevelopmentOrAdmin: Unexpected error:', error);
    return false;
  }
};

/**
 * Dashboard type to role mapping for access control
 */
export type DashboardType = 'user' | 'hotel' | 'association' | 'promoter' | 'admin';

export const DASHBOARD_ROLE_MAP: Record<DashboardType, string[]> = {
  user: ['user', 'guest'],
  hotel: ['hotel', 'hotel_owner'],
  association: ['association'],
  promoter: ['promoter'],
  admin: ['admin']
};

/**
 * Validates if a user has access to a specific dashboard type
 */
export const validateDashboardAccess = async (
  profile: ProfileCompat | null,
  dashboardType: DashboardType
): Promise<boolean> => {
  const isDevOrAdmin = await isDevelopmentOrAdmin();
  if (isDevOrAdmin) {
    console.log('validateDashboardAccess: Dev/Admin access granted');
    return true;
  }
  
  if (!profile) {
    console.log('validateDashboardAccess: No profile, denying access');
    return false;
  }
  
  console.log('validateDashboardAccess: Checking access for', { 
    profileRole: profile.role, 
    isHotelOwner: profile.is_hotel_owner, 
    dashboardType 
  });
  
  const allowedRoles = DASHBOARD_ROLE_MAP[dashboardType];
  console.log('validateDashboardAccess: Allowed roles for', dashboardType, ':', allowedRoles);
  
  if (dashboardType === 'hotel') {
    const hasAccess = (
      allowedRoles.includes(profile.role || '') || 
      profile.is_hotel_owner === true
    );
    console.log('validateDashboardAccess: Hotel dashboard access result:', hasAccess);
    return hasAccess;
  }

  const hasAccess = allowedRoles.includes(profile.role || '');
  console.log('validateDashboardAccess: General dashboard access result:', hasAccess);
  return hasAccess;
};

/**
 * Gets the appropriate redirect URL based on user's actual role
 */
export const getRedirectUrlForRole = (profile: ProfileCompat | null): string => {
  if (!profile) return '/';
  
  switch (profile.role) {
    case 'admin':
      return '/admin';
    case 'hotel_owner':
    case 'hotel':
      return '/hotel-dashboard';
    case 'association':
      return '/panel-asociacion';
    case 'promoter':
      return '/promoter/dashboard';
    case 'user':
    case 'guest':
    default:
      return '/user-dashboard';
  }
};

/**
 * Universal security safeguard that redirects unauthorized users to homepage
 * Use this for production security when manual access attempts are made
 */
export const enforceProductionSecurity = async (
  profile: ProfileCompat | null,
  dashboardType: DashboardType
): Promise<void> => {
  const hasAccess = await validateDashboardAccess(profile, dashboardType);
  
  if (!hasAccess) {
    console.log(`Unauthorized access attempt to ${dashboardType} dashboard. Redirecting to homepage.`);
    window.location.href = '/';
  }
};
