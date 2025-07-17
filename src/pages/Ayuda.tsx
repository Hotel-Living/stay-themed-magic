import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { Starfield } from '@/components/Starfield';
import { useEffect, useState } from 'react';

export default function Ayuda() {
  const { t, i18n } = useTranslation('home');
  const [avatarError, setAvatarError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for i18n to be initialized
    if (!i18n.isInitialized) return;

    const language = i18n.language || navigator.language || 'es';
    
    // Proper fallback logic - default to Spanish if no valid language detected
    let agentId = 'v2_agt_JZ4Lnlqs'; // Default Spanish María
    if (language.startsWith('en')) {
      agentId = 'v2_agt_20pNgPtt'; // English María
    } else if (language.startsWith('es')) {
      agentId = 'v2_agt_JZ4Lnlqs'; // Spanish María
    }
    // All other languages default to Spanish

    // Clean up any existing D-ID scripts and containers
    const existingScripts = document.querySelectorAll('script[src*="agent.d-id.com"]');
    existingScripts.forEach(script => script.remove());
    
    // Clear any existing D-ID content in container
    const container = document.getElementById('did-avatar-container');
    if (container) {
      // Only clear if it has D-ID content, preserve React content
      const didElements = container.querySelectorAll('[data-did], iframe[src*="d-id"], canvas');
      didElements.forEach(el => el.remove());
    }

    // Reset states
    setIsLoading(true);
    setAvatarError(false);

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://agent.d-id.com/v2/index.js';
    script.setAttribute('data-client-key', 'YXV0aDB8Njg3MDc0MTcxYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpzQUEzUWlpdTBxcA==');
    script.setAttribute('data-agent-id', agentId);
    script.setAttribute('data-mode', 'fabio');
    script.setAttribute('data-name', 'did-agent');
    script.setAttribute('data-monitor', 'true');
    script.setAttribute('data-orientation', 'horizontal');
    script.setAttribute('data-position', 'right');

    // Error handling for script loading
    script.onload = () => {
      console.log('D-ID script loaded successfully with agent:', agentId);
      setIsLoading(false);
    };
    
    script.onerror = () => {
      console.error('Failed to load D-ID script - possibly blocked by ad blocker');
      setAvatarError(true);
      setIsLoading(false);
    };

    // Timeout fallback - increased for better loading
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn('D-ID avatar loading timeout - showing fallback');
        setAvatarError(true);
        setIsLoading(false);
      }
    }, 15000);

    // Script must be appended to document.body after language detection
    document.body.appendChild(script);

    return () => {
      clearTimeout(timeout);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [i18n.language, i18n.isInitialized]); // React to language changes and initialization

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
            style={{ 
              minHeight: '400px', 
              width: '100%', 
              maxWidth: '400px',
              position: 'relative',
              overflow: 'visible',
              display: 'block',
              visibility: 'visible'
            }}
          >
            {avatarError ? (
              <div className="text-white/60 text-center p-4">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <p className="text-sm mb-2">Avatar unavailable</p>
                <p className="text-xs text-white/40">Please disable your ad blocker or refresh the page</p>
              </div>
            ) : isLoading ? (
              <div className="text-white/60 text-center p-4">
                <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Cargando avatar...</p>
              </div>
            ) : null}
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