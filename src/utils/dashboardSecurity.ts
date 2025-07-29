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
    console.log('validateDashboardAccess: Dev/Admin access granted');
    return true;
  }
  
  // If no profile, deny access
  if (!profile) {
    console.log('validateDashboardAccess: No profile, denying access');
    return false;
  }
  
  console.log('validateDashboardAccess: Checking access for', { 
    profileRole: profile.role, 
    isHotelOwner: profile.is_hotel_owner, 
    dashboardType 
  });
  
  // Check role-based access
  const allowedRoles = DASHBOARD_ROLE_MAP[dashboardType];
  console.log('validateDashboardAccess: Allowed roles for', dashboardType, ':', allowedRoles);
  
  // For hotel dashboard, grant access based solely on allowed roles
  if (dashboardType === 'hotel') {
    const hasAccess = allowedRoles.includes(profile.role || '');
    console.log('validateDashboardAccess: Hotel dashboard access result:', hasAccess);
    return hasAccess;
  }
  
  const hasAccess = allowedRoles.includes(profile.role || '');
  console.log('validateDashboardAccess: General dashboard access result:', hasAccess);
  return hasAccess;
};
