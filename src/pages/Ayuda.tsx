import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { Starfield } from '@/components/Starfield';
import { useEffect } from 'react';

export default function Ayuda() {
  const { t, i18n } = useTranslation('home');

  useEffect(() => {
    // Clean up any existing scripts first
    const existingScripts = document.querySelectorAll('script[src*="agent.d-id.com"]');
    existingScripts.forEach(script => script.remove());

    // Wait for DOM to be ready, then load D-ID script
    const loadDIDScript = () => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://agent.d-id.com/v2/index.js';
      script.setAttribute('data-mode', 'fabio');
      script.setAttribute('data-client-key', 'YXV0aDB8Njg3MDc0MTcxYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpzQUEzUWlpdTBxcA==');
      
      // Use different agent IDs based on language
      const agentId = i18n.language === 'es' ? 'v2_agt_ID_ES' : 'v2_agt_20pNgPtt';
      const agentName = i18n.language === 'es' ? 'did-agent-es' : 'did-agent-en';
      
      script.setAttribute('data-agent-id', agentId);
      script.setAttribute('data-name', agentName);
      script.setAttribute('data-monitor', 'true');
      script.setAttribute('data-orientation', 'horizontal');
      script.setAttribute('data-position', 'right');
      
      // Add script to head
      document.head.appendChild(script);
      
      // Log for debugging
      console.log('D-ID script loaded with agent ID:', agentId);
    };

    // Load script after a small delay to ensure DOM is ready
    const timer = setTimeout(loadDIDScript, 100);
    
    return () => {
      clearTimeout(timer);
      // Clean up script on unmount or language change
      const existingScript = document.querySelector('script[src*="agent.d-id.com"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [i18n.language]); // Re-run when language changes

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
          <div className="w-96 h-64 mb-4 flex items-center justify-center">
            {/* D-ID Avatar will be automatically injected here by the script */}
          </div>
          <div style={{ backgroundColor: '#581972' }} className="rounded-lg px-6 py-3">
            <p className="text-center text-white text-lg font-semibold">
              {t('helpAssistant.mainMessage')}
            </p>
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
                  
                  {/* Input Label Box */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 min-h-[60px] flex items-center justify-center">
                    <p className="text-white/60 text-xs text-center">
                      {t('helpAssistant.inputLabel')}
                    </p>
                  </div>
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