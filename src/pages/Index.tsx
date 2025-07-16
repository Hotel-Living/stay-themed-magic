import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FilterState } from '@/components/filters';
import { FilterSectionWrapper } from '@/components/home/FilterSectionWrapper';
import { useThemes } from '@/hooks/useThemes';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';
import { IntroStarAnimation } from '@/components/intro/IntroStarAnimation';
import BubbleCounter from '@/components/common/BubbleCounter';
import { AvatarIntro } from '@/components/avatars/AvatarIntro';
import { RandomAvatarAssistant } from '@/components/avatars/RandomAvatarAssistant';

export default function Index() {
  const { data: themes } = useThemes();
  const [showIntro, setShowIntro] = useState(false); // Temporarily disabled
  const [showAvatarIntro, setShowAvatarIntro] = useState(false); // Disabled avatar animations per user request

  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: { min: 0, max: 1000 },
    searchTerm: null,
    minPrice: 0,
    maxPrice: 1000,
    stars: [],
    location: null,
    propertyType: null,
    propertyStyle: null,
    activities: [],
    roomTypes: [],
    hotelFeatures: [],
    roomFeatures: [],
    mealPlans: [],
    stayLengths: null,
    atmosphere: null
  });

  const handleFilterChange = (newFilters: FilterState) => {
    console.log("🔄 Index page filter change:", newFilters);
    setFilters(newFilters);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleAvatarIntroInteraction = () => {
    console.log("🎭 User interacted with avatars - hiding avatar intro");
    setShowAvatarIntro(false);
  };

  const themeNames = themes ? themes.map(theme => theme.name) : [];

  useEffect(() => {
    const existing = document.getElementById("d-id-container");
    if (existing) return;

    const language = navigator.language || navigator.userLanguage;
    const SPANISH_AGENT_ID = "v2_agt_JZ4Lnlqs";
    const ENGLISH_AGENT_ID = "v2_agt_20pNgPtt";
    const clientKey = "YXV0aDB8Njg3MDc0MTcxYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpzQUEzUWlpdTBxcA==";
    const agentId = language.startsWith("es") ? SPANISH_AGENT_ID : ENGLISH_AGENT_ID;

    const script = document.createElement('script');
    script.src = "https://agent.d-id.com/v2/index.js";
    script.async = true;
    script.onload = () => {
      window.DIDWidget?.init({
        clientKey,
        agentId,
        container: document.getElementById("d-id-avatar"),
        enableSpeech: true,
        enableMic: true,
        alignment: "right",
        position: "bottom",
        avatarSize: "medium"
      });
      console.log("✅ D-ID avatar initialized for:", language);
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <HotelStarfield />
        <Navbar />
        
        {showIntro && (
          <IntroStarAnimation onComplete={handleIntroComplete} />
        )}
        
        {showAvatarIntro && (
          <AvatarIntro onUserInteraction={handleAvatarIntroInteraction} />
        )}
        
        <HeroSection />
        
        <FilterSectionWrapper 
          onFilterChange={handleFilterChange}
          availableThemes={themeNames}
        />
        
        <BubbleCounter />
        <Footer />
      </div>

      {/* ✅ Contenedor para D-ID, fuera del layout principal */}
      <div id="d-id-avatar" style={{ zIndex: 999999 }}></div>
    </>
  );
}
