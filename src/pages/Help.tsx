import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { Starfield } from '@/components/Starfield';
import { useEffect } from 'react';

export default function Help() {
  const { t, i18n } = useTranslation('home');

  useEffect(() => {
    const cleanUp = () => {
      const existingScripts = document.querySelectorAll('script[src*="agent.d-id.com"]');
      existingScripts.forEach(script => script.remove());

      const existingAvatars = document.querySelectorAll('[id^="avatar-"]');
      existingAvatars.forEach(avatar => avatar.remove());
    };

    const loadAvatar = () => {
      const targetContainer = document.getElementById('did-avatar-container');
      if (!targetContainer) {
        setTimeout(loadAvatar, 200); // Retry every 200ms until ready
        return;
      }

      cleanUp();
      targetContainer.innerHTML = '';

      const lang = i18n.language || navigator.language || 'en';
      const isSpanish = lang.startsWith('es');

      const avatarDiv = document.createElement('div');
      avatarDiv.id = isSpanish ? 'avatar-es' : 'avatar-en';

      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://agent.d-id.com/v2/index.js';
      script.setAttribute('data-mode', 'fabio');
      script.setAttribute('data-client-key', 'YXV0aDB8Njg3MDc0MTcxYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpzQUEzUWlpdTBxcA==');
      script.setAttribute('data-agent-id', isSpanish ? 'v2_agt_JZ4Lnlqs' : 'v2_agt_20pNgPtt');
      script.setAttribute('data-name', isSpanish ? 'did-agent-es' : 'did-agent-en');
      script.setAttribute('data-monitor', 'true');
      script.setAttribute('data-orientation', 'horizontal');
      script.setAttribute('data-position', 'right');

      avatarDiv.appendChild(script);
      targetContainer.appendChild(avatarDiv);
    };

    loadAvatar();

    return () => cleanUp();
  }, [i18n.language]);

  const avatarsData = [
    {
      id: "antonio",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/1_Soy_Antonio_Jubilado.gif.gif",
      name: t('helpAssistant.avatars.antonio.name'),
      description: t('helpAssistant.avatars.antonio.description')
    },
    {
      id: "luisa", 
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/2_Y_yo_soy_Luisa_jubilada.gif.gif",
      name: t('helpAssistant.avatars.luisa.name'),
      description: t('helpAssistant.avatars.luisa.description')
    },
    {
      id: "john",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/3_Y_yo_soy_John_trabajo_online.gif.gif", 
      name: t('helpAssistant.avatars.john.name'),
      description: t('helpAssistant.avatars.john.description')
    },
    {
      id: "auxi",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/4_Y_yo_soy_Auxi_amo_viajar.gif.gif",
      name: t('helpAssistant.avatars.auxi.name'), 
      description: t('helpAssistant.avatars.auxi.description')
    },
    {
      id: "juan",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/5_Y_yo_soy_Juan_ya_no_alquilo_apartamentos_turisticos.gif.gif",
      name: t('helpAssistant.avatars.juan.name'),
      description: t('helpAssistant.avatars.juan.description')
    },
    {
      id: "ion",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/6_Y_yo_soy_Ion_vivia_de_alquiler.gif.gif",
      name: t('helpAssistant.avatars.ion.name'),
      description: t('helpAssistant.avatars.ion.description')
    },
    {
      id: "maria",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/7_Y_yo_soy_Maria_vivia_afuera_de_la_ciudad.gif.gif",
      name: t('helpAssistant.avatars.maria.name'),
      description: t('helpAssistant.avatars.maria.description')
    },
    {
      id: "martin",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/8_Y_yo_soy_Martin_tengo_un_hotel.gif.gif",
      name: t('helpAssistant.avatars.martin.name'),
      description: t('helpAssistant.avatars.martin.description')
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        {/* Top Section - Main Avatar */}
        <div className="flex flex-col items-center mb-12">
          <div 
            id="did-avatar-container"
            className="w-96 h-64 mb-4 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
          >
            <div className="text-white/60 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full mx-auto mb-2"></div>
              <p className="text-sm">Loading avatar...</p>
            </div>
          </div>
        </div>

        {/* Main Section - Avatar Group */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {avatarsData.map((avatar) => (
              <div key={avatar.id} className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img 
                    src={avatar.gif} 
                    alt={avatar.name}
                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                    onError={(e) => {
                      // Fallback to a simple colored circle with initials
                      e.currentTarget.style.display = "none";
                      const fallback = document.createElement("div");
                      fallback.className = "w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg";
                      fallback.textContent = avatar.name.charAt(0);
                      e.currentTarget.parentNode?.appendChild(fallback);
                    }}
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="text-white font-semibold text-lg mb-1">{avatar.name}</h3>
                  <p className="text-white/80 text-sm mb-3">{avatar.description}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}