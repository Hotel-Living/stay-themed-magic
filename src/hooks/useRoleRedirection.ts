export function redirectByRole(role: string | null): string {
  switch (role) {
    case 'guest':
      return '/user-dashboard';
    case 'hotel_owner':
      return '/hotel-dashboard';
    case 'association':
      return '/panel-asociacion';
    case 'promoter':
      return '/promoter/dashboard';
    case 'admin':
      return '/admin-dashboard';
    default:
      return '/entrance';
  }
}