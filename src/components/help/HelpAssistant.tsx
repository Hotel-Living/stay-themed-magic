import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

export function HelpAssistant() {
  const navigate = useNavigate();
  const { t, language } = useTranslation('home');

  const handleClick = () => {
    const helpRoute = language.startsWith('es') ? '/ayuda' : '/help';
    navigate(helpRoute);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="relative group cursor-pointer transition-transform hover:scale-105 duration-300"
        aria-label={t('helpAssistant.message')}
      >
        {/* Image */}
        <img
          src="/lovable-uploads/44fa6e36-177c-4ca2-aa87-fa818f7d26b7.png"
          alt="Help Assistant"
          className="w-32 h-32 object-cover rounded-lg shadow-lg"
        />
        
        {/* Overlay Text at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 rounded-b-lg">
          <div className="text-center text-white p-2">
            <p className="text-sm font-semibold drop-shadow-lg">
              {t('helpAssistant.message')}
            </p>
          </div>
        </div>
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    </div>
  );
}