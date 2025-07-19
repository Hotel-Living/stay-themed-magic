import { useState, useEffect } from "react";
import { EnhancedAvatarAssistant } from "./EnhancedAvatarAssistant";
import { useTranslation } from "@/hooks/useTranslation";

const martinGif = "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/8_Y_yo_soy_Martin_tengo_un_hotel.gif.gif";

export function HotelPageAvatar() {
  const [showAvatar, setShowAvatar] = useState(false);
  const { t } = useTranslation('faq');

  useEffect(() => {
    // Show Martin immediately when component mounts
    setShowAvatar(true);
  }, []);

  const getMessage = () => {
    // Always return the translated full interactive message for Martín
    return t('avatars.martin.fullMessage', '¡Hola, soy Martín! Soy hotelero. ¿Te puedo ayudar?');
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