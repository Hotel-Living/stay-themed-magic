
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export function ForgotPasswordLink() {
  const { t } = useTranslation();
  
  return (
    <Link 
      to="/forgot-password" 
      className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition"
    >
      {t('forgotPassword')}
    </Link>
  );
}
