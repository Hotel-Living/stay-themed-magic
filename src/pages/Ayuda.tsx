import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { Starfield } from '@/components/Starfield';
import { useEffect } from 'react';

export default function Ayuda() {
  const { t, i18n } = useTranslation('home');

  useEffect(() => {
    // Clean up any existing avatars first
    const existingScripts = document.querySelectorAll('script[src*="agent.d-id.com"]');
    existingScripts.forEach(script => script.remove());
    
    const existingAvatars = document.querySelectorAll('[id^="avatar-"]');
    existingAvatars.forEach(avatar => avatar.remove());

    // Load Spanish avatar directly via DOM injection (force Spanish since this is /ayuda page)
    const loadSpanishAvatar = () => {
      const targetContainer = document.getElementById('did-avatar-container');
      if (!targetContainer) {
        console.error('did-avatar-container not found');
        return;
      }

      console.log('Loading Spanish avatar on /ayuda page');
      console.log('Current language:', i18n.language);

      // Clear the container
      targetContainer.innerHTML = '';
      
      // Force Spanish since this is the /ayuda page
      const agentId = 'v2_agt_JZ4Lnlqs'; // Spanish agent ID
      
      console.log('Using Spanish agent ID:', agentId);
      
      // Create avatar container
      const avatarDiv = document.createElement('div');
      avatarDiv.id = 'avatar-es';
      
      // Create D-ID script directly in DOM to avoid CORS/proxy issues
      const scriptHTML = `
        <script type="module"
          src="https://agent.d-id.com/v2/index.js"
          data-mode="fabio"
          data-client-key="YXV0aDB8Njg3MDc0MTcxYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpzQUEzUWlpdTBxcA=="
          data-agent-id="${agentId}"
          data-name="did-agent-es"
          data-monitor="true"
          data-orientation="horizontal"
          data-position="right">
        </script>
      `;
      
      // Create caption
      const captionHTML = `
        <p style="text-align: center; font-size: 1.2rem; margin-top: 10px; color: white;">
          Háblame o escríbeme tu pregunta.
        </p>
      `;
      
      // Insert HTML directly to avoid proxy issues
      avatarDiv.innerHTML = scriptHTML + captionHTML;
      
      // Add avatar to container
      targetContainer.appendChild(avatarDiv);
      
      console.log('✅ Spanish D-ID script injected directly into DOM');
      console.log('Script element created with agent ID:', agentId);
      
      // Additional debugging - check if script is properly inserted after a delay
      setTimeout(() => {
        const insertedScript = targetContainer.querySelector('script[src*="agent.d-id.com"]');
        console.log('Script verification after 2 seconds:', insertedScript);
        console.log('Container contents:', targetContainer.innerHTML);
        
        if (!insertedScript) {
          console.error('❌ Script not found in DOM after injection');
          // Show fallback message
          targetContainer.innerHTML = `
            <div class="flex items-center justify-center h-full text-white">
              <div class="text-center">
                <div class="text-red-400 mb-2">⚠️ Error al cargar el avatar</div>
                <div class="text-sm">Problema de CORS detectado. Por favor, actualiza la página.</div>
              </div>
            </div>
          `;
        } else {
          console.log('✅ Script successfully found in DOM');
        }
      }, 2000);
    };

    // Load avatar after ensuring DOM is ready
    const timer = setTimeout(loadSpanishAvatar, 300);
    
    return () => {
      clearTimeout(timer);
      // Clean up on unmount
      const existingScript = document.querySelector('script[src*="agent.d-id.com"]');
      if (existingScript) {
        existingScript.remove();
      }
      const avatars = document.querySelectorAll('[id^="avatar-"]');
      avatars.forEach(avatar => avatar.remove());
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
            className="w-96 h-64 mb-4 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
          >
            <div className="text-white/60 text-center">
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