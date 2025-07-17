import { useState, useEffect } from "react";
import { X } from "lucide-react";

// Avatar pool with short messages for homepage (visual only, no interaction)
const avatarPool = [
  {
    id: "antonio",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/1_Soy_Antonio_Jubilado.gif.gif",
    message: "¡Hola, soy Antonio, jubilado!"
  },
  {
    id: "luisa",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/2_Y_yo_soy_Luisa_jubilada.gif.gif",
    message: "¡Hola, soy Luisa, jubilada!"
  },
  {
    id: "john",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/3_Y_yo_soy_John_trabajo_online.gif.gif",
    message: "¡Hola, soy John, trabajo online!"
  },
  {
    id: "teresa",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/4_Y_yo_soy_Auxi_amo_viajar.gif.gif",
    message: "¡Hola, soy Teresa, jubilada! Amo viajar."
  },
  {
    id: "juan",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/5_Y_yo_soy_Juan_ya_no_alquilo_apartamentos_turisticos.gif.gif",
    message: "¡Hola, soy Juan! Ya no alquilo apartamentos turísticos."
  },
  {
    id: "ion",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/6_Y_yo_soy_Ion_vivia_de_alquiler.gif.gif",
    message: "¡Hola, soy Ion! Antes vivía de alquiler."
  },
  {
    id: "maria",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/7_Y_yo_soy_Maria_vivia_afuera_de_la_ciudad.gif.gif",
    message: "¡Hola, soy María! Vivía afuera de la ciudad."
  },
  {
    id: "martin",
    gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/8_Y_yo_soy_Martin_tengo_un_hotel.gif.gif",
    message: "¡Hola, soy Martín! Soy hotelero."
  }
];

// Simple non-interactive avatar component for homepage
function SimpleAvatar({ avatar, position }: { avatar: { id: string; gif: string; message: string }, position: 'bottom-left' | 'bottom-right' }) {
  const positionClasses = position === 'bottom-right' 
    ? 'fixed bottom-8 right-8 z-40' 
    : 'fixed bottom-8 left-8 z-40';

  return (
    <div className={`${positionClasses} animate-fade-in pointer-events-none`}>
      <div className="relative">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-fuchsia-400/50">
          <img 
            src={avatar.gif} 
            alt={`Avatar ${avatar.id}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Speech bubble */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-md text-[8px] max-w-[80px] text-center z-10 border border-fuchsia-200">
          <span className="text-gray-800 leading-tight block">{avatar.message}</span>
          {/* Bubble tail */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      </div>
    </div>
  );
}

export function IndexPageAvatars() {
  const [firstAvatar, setFirstAvatar] = useState<typeof avatarPool[0] | null>(null);
  const [secondAvatar, setSecondAvatar] = useState<typeof avatarPool[0] | null>(null);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

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
      {/* First Avatar - Bottom Right - shows for 20 seconds */}
      {showFirst && firstAvatar && (
        <SimpleAvatar avatar={firstAvatar} position="bottom-right" />
      )}

      {/* Second Avatar - Bottom Left - shows after 10 seconds for 10 seconds */}
      {showSecond && secondAvatar && (
        <SimpleAvatar avatar={secondAvatar} position="bottom-left" />
      )}
    </>
  );
}