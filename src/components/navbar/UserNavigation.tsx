
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { LinkButton } from '@/components/ui/link-button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CurrencySelector } from '@/components/CurrencySelector';
import { AccessibilityMenu } from '@/components/AccessibilityMenu';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

export const UserNavigation = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <LanguageSelector />
      <CurrencySelector />
      <ThemeToggle />
      <AccessibilityMenu />
      
      {user ? (
        <LinkButton
          asChild
          variant="gradient"
          className="text-white"
          aria-label="Go to user dashboard"
        >
          <Link to="/dashboard">
            {t("nav.dashboard")}
          </Link>
        </LinkButton>
      ) : (
        <LinkButton
          asChild
          variant="gradient"
          className="text-white"
          aria-label="Login to your account"
        >
          <Link to="/login">
            {t("nav.login")}
          </Link>
        </LinkButton>
      )}
    </div>
  );
};
