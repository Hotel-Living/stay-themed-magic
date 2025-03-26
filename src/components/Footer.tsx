
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-transparent border-t border-foreground/10">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              {t("app.tagline")}
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-fuchsia-400">{t("nav.home")}</Link></li>
              <li><Link to="/search" className="text-sm text-muted-foreground hover:text-fuchsia-400">{t("nav.search")}</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-fuchsia-400">{t("footer.faq")}</Link></li>
              <li><Link to="/customer-service" className="text-sm text-muted-foreground hover:text-fuchsia-400">{t("footer.contact")}</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-fuchsia-400">{t("footer.terms")}</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-fuchsia-400">{t("footer.privacy")}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-foreground/10 mt-8 pt-8 text-sm text-muted-foreground">
          <p>{t("footer.copyright", { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
