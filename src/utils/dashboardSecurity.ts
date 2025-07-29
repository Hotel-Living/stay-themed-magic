import { supabase } from "@/integrations/supabase/client";

// Define compatible Profile type that matches the actual usage
interface ProfileCompat {
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
    return true;
  }
  
  try {
    // Check if current user has admin role
    const { data: hasAdminRole, error } = await supabase.rpc('has_role', { role_name: 'admin' });
    
    if (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
    
    return Boolean(hasAdminRole);
  } catch (error) {
    console.error('Error in isDevelopmentOrAdmin:', error);
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
  // Allow access for development or admin users
  const isDevOrAdmin = await isDevelopmentOrAdmin();
  if (isDevOrAdmin) {
    return true;
  }
  
  // If no profile, deny access
  if (!profile) {
    return false;
  }
  
  // Check role-based access
  const allowedRoles = DASHBOARD_ROLE_MAP[dashboardType];
  
  // For hotel dashboard, also check is_hotel_owner flag
  if (dashboardType === 'hotel') {
    return (
      allowedRoles.includes(profile.role || '') || 
      profile.is_hotel_owner === true
    );
  }
  
  return allowedRoles.includes(profile.role || '');
};

/**
 * Gets the appropriate redirect URL based on user's actual role
 */
export const getRedirectUrlForRole = (profile: ProfileCompat | null): string => {
  if (!profile) {
    return '/';
  }
  
  switch (profile.role) {
    case 'admin':
      return '/admin';
    case 'hotel_owner':
    case 'hotel':
      if (profile.is_hotel_owner) {
        return '/hotel-dashboard';
      }
      return '/user-dashboard';
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