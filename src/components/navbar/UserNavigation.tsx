
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CurrencySelector } from '@/components/CurrencySelector';
import { useLanguage } from '@/context/LanguageContext';
import { AccessibilityMenu } from '@/components/AccessibilityMenu';

export const UserNavigation = () => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <LanguageSelector />
      <CurrencySelector />
      <ThemeToggle />
      <AccessibilityMenu />
      
      {isAuthenticated ? (
        <Button
          as={Link}
          to="/dashboard"
          variant="glass"
          className="text-white"
          aria-label="Go to user dashboard"
        >
          {t("nav.dashboard")}
        </Button>
      ) : (
        <Button
          as={Link}
          to="/login"
          variant="glass"
          className="text-white"
          aria-label="Login to your account"
        >
          {t("nav.login")}
        </Button>
      )}
    </div>
  );
};
