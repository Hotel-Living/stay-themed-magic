
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "@/hooks/useTranslation";
import { AccordionContentRenderer } from "./accordion/AccordionContentRenderer";
import { TabAvatar } from "./TabAvatar";

export function WhyHotelLivingSectionEN() {
  const [activeAccordionTab, setActiveAccordionTab] = useState("");
  const [activeAvatar, setActiveAvatar] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  // Avatar mapping according to specifications
  const avatarMapping: Record<string, { id: string; gif: string }[]> = {
    "still-renting": [
      {
        id: "ion",
        gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/6_Y_yo_soy_Ion_vivia_de_alquiler.gif.gif"
      }
    ],
    "retired": [
      {
        id: "antonio",
        gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/1_Soy_Antonio_Jubilado.gif.gif"
      },
      {
        id: "luisa",
        gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/2_Y_yo_soy_Luisa_jubilada.gif.gif"
      }
    ],
    "airbnb": [
      {
        id: "juan",
        gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/5_Y_yo_soy_Juan_ya_no_alquilo_apartamentos_turisticos.gif.gif"
      }
    ],
    "online-worker": [
      {
        id: "john",
        gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/3_Y_yo_soy_John_trabajo_online.gif.gif"
      }
    ],
    "commuter": [
      {
        id: "maria",
        gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/7_Y_yo_soy_Maria_vivia_afuera_de_la_ciudad.gif.gif"
      }
    ],
    "free-soul": [
      {
        id: "auxi",
        gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/4_Y_yo_soy_Auxi_amo_viajar.gif.gif"
      }
    ],
    "hotel": [
      {
        id: "martin",
        gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/8_Y_yo_soy_Martin_tengo_un_hotel.gif.gif"
      }
    ]
    // "society" has no avatar as per specification
  };

  const accordionOptions = [
    { id: "still-renting", label: "STILL\nRENTING?" },
    { id: "retired", label: "RETIRED?" },
    { id: "airbnb", label: "¿AIRBNB?" },
    { id: "online-worker", label: "ONLINE\nWORKER?" },
    { id: "commuter", label: "COMMUTER?" },
    { id: "free-soul", label: "FREE\nSOUL?" },
    { id: "hotel", label: "HOTEL?" },
    { id: "society", label: "SOCIETY?" }
  ];

  const handleAccordionTabChange = (value: string) => {
    if (value === activeAccordionTab) {
      setActiveAccordionTab("");
      setActiveAvatar(null);
    } else {
      setActiveAccordionTab(value);
      // Check if this tab has avatars
      const avatars = avatarMapping[value];
      if (avatars && avatars.length > 0) {
        setActiveAvatar(value);
        setShowMessage(true);
        // Hide message after 7 seconds but keep avatar visible
        setTimeout(() => {
          setShowMessage(false);
        }, 7000);
      } else {
        setActiveAvatar(null);
      }
    }
  };

  const handleAvatarClose = () => {
    setActiveAvatar(null);
    setShowMessage(false);
  };

  return (
    <>
      {/* First title - WHY HOTEL-LIVING? */}
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <div className="relative group w-fit">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
            <h1 className={`
              ${isMobile ? "text-2xl" : "text-3xl md:text-4xl"} 
              font-bold mb-4 text-[#eedbf7] glow 
              tracking-tight leading-tight
              bg-[#8017B0] py-2 px-8 rounded-lg inline-block relative
            `}>
              WHY HOTEL-LIVING?
            </h1>
          </div>
        </div>
      </div>

      {/* Two spectacular highlighted boxes with slogans - Vertically Stacked and Centered */}
      <div className="flex flex-col items-center gap-8 mb-16 relative">
        {/* Top box - Enhanced design with blue glow and purple background */}
        <div className="relative group w-fit">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-[#5E1183] backdrop-blur-xl border-2 border-cyan-400/60 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="space-y-5">
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🏨</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">Hotels need people</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🧑‍🤝‍🧑</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">People need better living</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🌐</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">Society needs an update</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">💡</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">All need Hotel-Living</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom box - Enhanced design with blue glow and purple background */}
        <div className="relative group w-fit">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-[#5E1183] backdrop-blur-xl border-2 border-cyan-400/60 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="space-y-5">
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🛏️</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">
                  {isMobile ? '5B hotel nights to be filled' : '5.000 million hotel nights to be filled'}
                </span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">👨‍👩‍👧‍👦</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">
                  {isMobile ? '400M people needing better living' : '400 million people needing better living'}
                </span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🔁</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">Society repeats the past</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🚀</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">Hotel-Living changes that</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header above purple tabs */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#eedbf7] mb-2">
          {t('faq.identifyHeader')}
        </h2>
      </div>

      {/* First Horizontal Accordion Menu */}
      <div className="mb-24">
        <div className="w-full">
          <div className="flex justify-center mb-4">
            <div className={`flex flex-wrap justify-center gap-1 p-1 bg-[#8017B0] rounded-xl border border-fuchsia-500/30 backdrop-blur-md ${isMobile ? "grid grid-cols-2 gap-1 place-items-center" : "grid grid-cols-8 place-items-center"} relative`}>
              {accordionOptions.map((option) => {
                const avatars = avatarMapping[option.id];
                const showAvatars = activeAvatar === option.id && avatars;
                
                return (
                  <div key={option.id} className="relative">
                    <button 
                      onClick={() => handleAccordionTabChange(option.id)}
                      className={`px-2 uppercase whitespace-pre text-white shadow-md hover:shadow-fuchsia-500/20 hover:scale-105 transition-all duration-200 border border-fuchsia-600/20 text-center rounded-lg font-medium flex flex-col items-center justify-center ${isMobile ? "text-xs px-2 py-3" : "text-sm px-3 py-3"} ${activeAccordionTab === option.id ? "!bg-[#5F1183]" : "bg-[#8017B0]"}`}
                    >
                      <span className="mb-1 leading-tight">{option.label}</span>
                      <span className="text-xs">▼</span>
                    </button>
                    
                    {/* Show avatar(s) above the tab when active */}
                    {showAvatars && avatars.map((avatar, index) => (
                      <div key={avatar.id} className={`absolute ${index === 0 ? 'bottom-full mb-2' : 'bottom-full mb-20'} left-1/2 transform -translate-x-1/2 z-50`}>
                        <TabAvatar
                          avatarId={avatar.id}
                          gif={avatar.gif}
                          message={t('faq.avatarMessage')}
                          onClose={handleAvatarClose}
                        />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          
          {activeAccordionTab && (
            <div className="mt-4">
              <div className="bg-[#8017B0]/10 p-6 rounded-lg border border-[#8017B0]/30">
                <AccordionContentRenderer optionId={activeAccordionTab} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
