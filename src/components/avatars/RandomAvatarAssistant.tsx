import { useState, useEffect, useCallback } from "react";
import { EnhancedAvatarAssistant } from "./EnhancedAvatarAssistant";
import { useAvatarManager } from "@/contexts/AvatarManager";

const avatarPool = [
  {
    id: "maria",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/1_Soy_Antonio_Jubilado.gif.gif"
  },
  {
    id: "antonio", 
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/1_Soy_Antonio_Jubilado.gif.gif"
  },
  {
    id: "john",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/3_Y_yo_soy_John_trabajo_online.gif.gif"
  },
  {
    id: "ion",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/6_Y_yo_soy_Ion_vivia_de_alquiler.gif.gif"
  },
  {
    id: "auxi",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/4_Y_yo_soy_Auxi_amo_viajar.gif.gif"
  },
  {
    id: "juan",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/5_Y_yo_soy_Juan_ya_no_alquilo_apartamentos_turisticos.gif.gif"
  },
  {
    id: "maria-trabajadora",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/7_Y_yo_soy_Maria_vivia_afuera_de_la_ciudad.gif.gif"
  }
];

export function RandomAvatarAssistant() {
  const [currentRandomAvatar, setCurrentRandomAvatar] = useState<{ id: string; gif: string } | null>(null);
  const [showRandomAvatar, setShowRandomAvatar] = useState(false);
  const { activeAvatars } = useAvatarManager();

  const getMessage = () => {
    const lang = navigator.language;
    if (lang.startsWith("en")) return "Need help?";
    if (lang.startsWith("pt")) return "Precisa de ajuda?"; 
    if (lang.startsWith("ro")) return "Ai nevoie de ajutor?";
    return "¿Necesitas ayuda?";
  };

  const showRandomAvatarPopup = useCallback(() => {
    // Don't show if there are already active avatars
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
  }, [activeAvatars]);

  useEffect(() => {
    // Start the 30-second interval for random avatar popup
    const interval = setInterval(() => {
      showRandomAvatarPopup();
    }, 30000);

    return () => clearInterval(interval);
  }, [showRandomAvatarPopup]);

  const handleRandomAvatarClose = () => {
    setShowRandomAvatar(false);
    setCurrentRandomAvatar(null);
  };

  // Don't show random avatar if there are active avatars
  if (activeAvatars.length > 0 || !showRandomAvatar || !currentRandomAvatar) {
    return null;
  }

  return (
    <EnhancedAvatarAssistant
      avatarId={currentRandomAvatar.id}
      gif={currentRandomAvatar.gif}
      position="bottom-left"
      showMessage={true}
      message={getMessage()}
      onClose={handleRandomAvatarClose}
    />
  );
}