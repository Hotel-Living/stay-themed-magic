import { useMyRoles } from "./useMyRoles";
import { useIsAdmin } from "./useIsAdmin";
import { useTranslation } from "./useTranslation";

export function useUserPanelLabel() {
  const { roles, loading } = useMyRoles();
  const isAdmin = useIsAdmin();
  const { t } = useTranslation('navigation');

  if (loading) {
    return { label: "", loading: true };
  }

  // Priority order: admin > hotel > association > promoter > user
  if (isAdmin || roles.includes('admin')) {
    return { label: t('panelLabels.admin'), loading: false };
  }
  
  if (roles.includes('hotel') || roles.includes('hotel_owner')) {
    return { label: t('panelLabels.hotel'), loading: false };
  }
  
  if (roles.includes('association')) {
    return { label: t('panelLabels.association'), loading: false };
  }
  
  if (roles.includes('promoter')) {
    return { label: t('panelLabels.promoter'), loading: false };
  }
  
  // Default to user panel
  return { label: t('panelLabels.user'), loading: false };
}