import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { Starfield } from '@/components/Starfield';
import { EnhancedAvatarAssistant } from '@/components/avatars/EnhancedAvatarAssistant';


export default function Help() {
  const { t, i18n } = useTranslation('home');


  const avatarsData = [
    {
      id: "antonio",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/1_Soy_Antonio_Jubilado.gif.gif",
      name: t('helpAssistant.avatars.antonio.name'),
      greeting: t('helpAssistant.avatars.antonio.greeting')
    },
    {
      id: "luisa", 
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/2_Y_yo_soy_Luisa_jubilada.gif.gif",
      name: t('helpAssistant.avatars.luisa.name'),
      greeting: t('helpAssistant.avatars.luisa.greeting')
    },
    {
      id: "john",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/3_Y_yo_soy_John_trabajo_online.gif.gif", 
      name: t('helpAssistant.avatars.john.name'),
      greeting: t('helpAssistant.avatars.john.greeting')
    },
    {
      id: "teresa",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/4_Y_yo_soy_Auxi_amo_viajar.gif.gif",
      name: t('helpAssistant.avatars.teresa.name'),
      greeting: t('helpAssistant.avatars.teresa.greeting')
    },
    {
      id: "juan",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/5_Y_yo_soy_Juan_ya_no_alquilo_apartamentos_turisticos.gif.gif",
      name: t('helpAssistant.avatars.juan.name'),
      greeting: t('helpAssistant.avatars.juan.greeting')
    },
    {
      id: "ion",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/6_Y_yo_soy_Ion_vivia_de_alquiler.gif.gif",
      name: t('helpAssistant.avatars.ion.name'),
      greeting: t('helpAssistant.avatars.ion.greeting')
    },
    {
      id: "maria",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/7_Y_yo_soy_Maria_vivia_afuera_de_la_ciudad.gif.gif",
      name: t('helpAssistant.avatars.maria.name'),
      greeting: t('helpAssistant.avatars.maria.greeting')
    },
    {
      id: "martin",
      gif: "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatar-gifs/8_Y_yo_soy_Martin_tengo_un_hotel.gif.gif",
      name: t('helpAssistant.avatars.martin.name'),
      greeting: t('helpAssistant.avatars.martin.greeting')
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-4 relative z-10">

        {/* Main Section - Avatar Group */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="grid grid-cols-4 gap-8 mb-8">
            {avatarsData.map((avatar) => (
              <div key={avatar.id} className="flex flex-col items-center">
                {/* Speech bubble above avatar */}
                <div className="relative mb-4 rounded-lg px-4 py-3 shadow-lg text-sm font-medium text-gray-800 text-center max-w-[180px] leading-tight border border-gray-200" style={{ backgroundColor: '#FBF3B4' }}>
                  <div className="whitespace-pre-line">{avatar.greeting}</div>
                  {/* Bubble tail pointing down */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent" style={{ borderTopColor: '#FBF3B4' }}></div>
                </div>
                
                {/* Avatar using EnhancedAvatarAssistant for chat functionality */}
                <EnhancedAvatarAssistant 
                  avatarId={avatar.id}
                  gif={avatar.gif}
                  position="content"
                  showMessage={false}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}