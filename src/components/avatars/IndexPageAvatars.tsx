import { useState, useEffect } from "react";
import { EnhancedAvatarAssistant } from "./EnhancedAvatarAssistant";

const avatarPool = [
  {
    id: "antonio",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/1_Soy_Antonio_Jubilado.gif.gif"
  },
  {
    id: "john",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/3_Y_yo_soy_John_trabajo_online.gif.gif"
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

export function IndexPageAvatars() {
  const [firstAvatar, setFirstAvatar] = useState<{ id: string; gif: string } | null>(null);
  const [secondAvatar, setSecondAvatar] = useState<{ id: string; gif: string } | null>(null);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  const getMessage = () => {
    const lang = navigator.language;
    if (lang.startsWith("en")) return "Need help?";
    if (lang.startsWith("pt")) return "Precisa de ajuda?"; 
    if (lang.startsWith("ro")) return "Ai nevoie de ajutor?";
    return "¿Necesitas ayuda?";
  };

  useEffect(() => {
    // Get two random different avatars
    const getRandomAvatars = () => {
      const shuffled = [...avatarPool].sort(() => 0.5 - Math.random());
      return [shuffled[0], shuffled[1]];
    };

    const [first, second] = getRandomAvatars();
    setFirstAvatar(first);
    setSecondAvatar(second);

    // Start the animation sequence
    const startSequence = () => {
      // Show first avatar immediately
      setShowFirst(true);
      
      // Show second avatar after 10 seconds
      const secondTimer = setTimeout(() => {
        setShowSecond(true);
      }, 10000);
      
      // Hide both avatars after 20 seconds total
      const hideTimer = setTimeout(() => {
        setShowFirst(false);
        setShowSecond(false);
      }, 20000);

      return () => {
        clearTimeout(secondTimer);
        clearTimeout(hideTimer);
      };
    };

    const cleanup = startSequence();
    return cleanup;
  }, []);

  return (
    <>
      {/* First Avatar - Bottom Right */}
      {showFirst && firstAvatar && (
        <div className="fixed bottom-8 right-8 z-40 pointer-events-none">
          <EnhancedAvatarAssistant
            avatarId={firstAvatar.id}
            gif={firstAvatar.gif}
            position="bottom-right"
            showMessage={true}
            message={getMessage()}
          />
        </div>
      )}

      {/* Second Avatar - Bottom Left */}
      {showSecond && secondAvatar && (
        <div className="fixed bottom-8 left-8 z-40 pointer-events-none">
          <EnhancedAvatarAssistant
            avatarId={secondAvatar.id}
            gif={secondAvatar.gif}
            position="bottom-left"
            showMessage={true}
            message={getMessage()}
          />
        </div>
      )}
    </>
  );
}