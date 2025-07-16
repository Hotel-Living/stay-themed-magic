import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { Starfield } from '@/components/Starfield';
import { useEffect } from 'react';

export default function Ayuda() {
  const { t, i18n } = useTranslation('home');

  useEffect(() => {
    // Use setTimeout with 1000ms delay as specified to ensure DOM is fully ready
    const timer = setTimeout(() => {
      console.log('🔄 Injecting D-ID script after 1000ms delay...');
      
      const container = document.getElementById("did-avatar-container");
      if (!container) {
        console.error('❌ did-avatar-container not found');
        return;
      }

      console.log('✅ Container found, creating script...');
      
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://agent.d-id.com/v2/index.js";
      script.setAttribute("data-client-key", "YXV0aDB8Njg3MDc4MTcyYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpqQUEzUWlpdTBxcA==");
      script.setAttribute("data-agent-id", "v2_agt_JZ4Lnlqs");
      script.setAttribute("data-name", "did-agent-es");
      script.setAttribute("data-monitor", "true");
      script.setAttribute("data-orientation", "horizontal");
      script.setAttribute("data-position", "right");
      
      container.appendChild(script);
      console.log('✅ D-ID script injected to container');
      console.log('Script element in DOM:', document.querySelector('script[src*="agent.d-id.com"]'));
      
      // Verify script persistence after injection
      setTimeout(() => {
        const scriptExists = document.querySelector('script[src*="agent.d-id.com"]');
        const iframe = container.querySelector('iframe');
        console.log('🔍 Verification after 5 seconds:');
        console.log('- Script exists in DOM:', !!scriptExists);
        console.log('- Container children count:', container.children.length);
        console.log('- Iframe created:', !!iframe);
        
        if (!scriptExists) {
          console.error('❌ CRITICAL: Script was removed from DOM!');
        } else {
          console.log('✅ Script persisted in DOM');
        }
      }, 5000);
    }, 1000);

    
    return () => {
      clearTimeout(timer);
    };
  }, []); // Remove language dependency since we're forcing Spanish

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
              overflow: 'visible'
            }}
          >
            <div className="text-white/60 text-center p-4">
              <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full mx-auto mb-2"></div>
              <p className="text-sm">Cargando avatar...</p>
            </div>
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