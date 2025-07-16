import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';

export default function Ayuda() {
  const { t } = useTranslation('home');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {t('helpAssistant.message')}
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Bienvenido a nuestro centro de ayuda. Estamos aquí para asistirte con cualquier pregunta que puedas tener.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Primeros Pasos</h2>
                <p className="text-muted-foreground">
                  Aprende cómo usar nuestra plataforma y encuentra el hotel perfecto para tus necesidades.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Ayuda con Reservas</h2>
                <p className="text-muted-foreground">
                  ¿Necesitas asistencia con tu reserva? Estamos aquí para ayudarte en cada paso del camino.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Soporte de Cuenta</h2>
                <p className="text-muted-foreground">
                  Gestiona la configuración y preferencias de tu cuenta con nuestras guías completas.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Contáctanos</h2>
                <p className="text-muted-foreground">
                  ¿No encuentras lo que buscas? Ponte en contacto directamente con nuestro equipo de soporte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}