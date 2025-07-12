import { useState, useEffect } from "react";
import { EnhancedAvatarAssistant } from "./EnhancedAvatarAssistant";

const martinGif = "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/8_Y_yo_soy_Martin_tengo_un_hotel.gif.gif";

export function HotelPageAvatar() {
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    // Show Martin immediately when component mounts
    setShowAvatar(true);
  }, []);

  const getMessage = () => {
    const lang = navigator.language;
    if (lang.startsWith("en")) return "I'm here if you need me.";
    if (lang.startsWith("pt")) return "Estou aqui se precisar de mim."; 
    if (lang.startsWith("ro")) return "Sunt aici dacă ai nevoie de mine.";
    return "Estoy aquí si me necesitas.";
  };

  if (!showAvatar) return null;

  return (
    <EnhancedAvatarAssistant
      avatarId="martin"
      gif={martinGif}
      position="bottom-right"
      showMessage={true}
      message={getMessage()}
    />
  );
}