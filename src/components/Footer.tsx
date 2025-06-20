
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation('common');

  const footerLinks = [
    [
      { name: t('footer.links.faq'), href: "/faq" },
      { name: t('footer.links.affinityStays'), href: "/affinity-stays" },
      { name: t('footer.links.hotel'), href: "/hotels" },
      { name: t('footer.links.videos'), href: "/videos" }
    ],
    [
      { name: t('footer.links.featuredHotels'), href: "/featured-hotels" },
      { name: t('footer.links.hotel'), href: "/hotels" },
      { name: t('footer.links.ourServices'), href: "/our-services" },
      { name: t('footer.links.ourValues'), href: "/our-values" }
    ],
    [
      { name: t('footer.links.customerService'), href: "/customer-service" },
      { name: t('footer.links.contact'), href: "/contact" },
      { name: t('footer.links.terms'), href: "/terms" },
      { name: t('footer.links.privacy'), href: "/privacy" }
    ],
    [
      { name: t('footer.links.intellectualProperty'), href: "/intellectual-property" },
      { name: t('footer.links.ourTeam'), href: "/our-team" }
    ]
  ];

  return (
    <footer className="bg-gradient-to-r from-[#8B0000] via-[#4B0000] to-[#8B0000] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {footerLinks.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-white/80 hover:text-white transition-colors duration-200 mb-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            to="/signup"
            className="bg-[#8B0000] hover:bg-[#6B0000] text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            {t('footer.buttons.register')}
          </Link>
          <Link
            to="/login"
            className="bg-[#4B0000] hover:bg-[#3B0000] text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            {t('footer.buttons.signIn')}
          </Link>
          <Link
            to="/hotel-signup"
            className="bg-[#2B0000] hover:bg-[#1B0000] text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            {t('footer.buttons.hotel')}
          </Link>
        </div>
        
        <div className="text-center text-white/60 text-sm">
          <p className="mb-2">{t('footer.copyright')}</p>
          <p>{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
