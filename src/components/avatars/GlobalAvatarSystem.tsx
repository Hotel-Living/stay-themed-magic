import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EnhancedAvatarAssistant } from "./EnhancedAvatarAssistant";
import { useAvatarManager } from "@/contexts/AvatarManager";
import { useTranslation } from "@/hooks/useTranslation";

// Complete avatar pool with correct IDs (messages now come from translations)
const avatarPool = [
  {
    id: "antonio",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/1_Soy_Antonio_Jubilado.gif.gif"
  },
  {
    id: "luisa",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/2_Y_yo_soy_Luisa_jubilada.gif.gif"
  },
  {
    id: "john",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/3_Y_yo_soy_John_trabajo_online.gif.gif"
  },
  {
    id: "teresa",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/4_Y_yo_soy_Auxi_amo_viajar.gif.gif"
  },
  {
    id: "juan",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/5_Y_yo_soy_Juan_ya_no_alquilo_apartamentos_turisticos.gif.gif"
  },
  {
    id: "ion",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/6_Y_yo_soy_Ion_vivia_de_alquiler.gif.gif"
  },
  {
    id: "maria",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/7_Y_yo_soy_Maria_vivia_afuera_de_la_ciudad.gif.gif"
  },
  {
    id: "martin",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/8_Y_yo_soy_Martin_tengo_un_hotel.gif.gif"
  }
];

export function GlobalAvatarSystem() {
  const location = useLocation();
  const { activeAvatars } = useAvatarManager();
  const { t } = useTranslation('faq');
  const [currentRandomAvatar, setCurrentRandomAvatar] = useState<typeof avatarPool[0] | null>(null);
  const [showRandomAvatar, setShowRandomAvatar] = useState(false);

  // Page detection
  const isHomePage = location.pathname === '/';
  const isFAQPage = location.pathname === '/faq'; // FAQ page contains the "¿Por qué Hotel Living?" section
  const isHotelsPage = location.pathname === '/hotels';
  const isHelpPage = location.pathname === '/help';
  const isAyudaPage = location.pathname === '/ayuda';

  // Global auto-trigger system (60 seconds, all pages except homepage, FAQ, help, and ayuda)
  useEffect(() => {
    // Don't run on homepage, FAQ page, hotels page, help page, or ayuda page (they have their own avatars)
    if (isHomePage || isFAQPage || isHotelsPage || isHelpPage || isAyudaPage) {
      return;
    }

    const showRandomAvatarPopup = () => {
      // Don't show if there's already an active avatar
      if (activeAvatars.length > 0) return;
      
      const randomIndex = Math.floor(Math.random() * avatarPool.length);
      const randomAvatar = avatarPool[randomIndex];
      
      setCurrentRandomAvatar(randomAvatar);
      setShowRandomAvatar(true);
      
      // Auto-dismiss after 10 seconds
      setTimeout(() => {
        setShowRandomAvatar(false);
        setCurrentRandomAvatar(null);
      }, 10000);
    };

    // Start the 60-second interval for random avatar popup
    const interval = setInterval(showRandomAvatarPopup, 60000);
    
    // Also trigger immediately for testing (remove this in production)
    const initialTimeout = setTimeout(showRandomAvatarPopup, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [location.pathname, activeAvatars, isHomePage, isFAQPage, isHotelsPage, isHelpPage, isAyudaPage]);

  const handleRandomAvatarClose = () => {
    setShowRandomAvatar(false);
    setCurrentRandomAvatar(null);
  };

  const getAvatarMessage = (avatarId: string) => {
    return t(`avatars.${avatarId}.fullMessage`, `¿Te puedo ayudar?`);
  };

  // Don't show random avatar if there's an active avatar or on excluded pages
  if (isHomePage || isFAQPage || isHotelsPage || isHelpPage || isAyudaPage || activeAvatars.length > 0 || !showRandomAvatar || !currentRandomAvatar) {
    return null;
  }

  return (
    <EnhancedAvatarAssistant
      avatarId={currentRandomAvatar.id}
      gif={currentRandomAvatar.gif}
      position="bottom-right"
      showMessage={true}
      message={getAvatarMessage(currentRandomAvatar.id)}
      onClose={handleRandomAvatarClose}
    />
  );
}