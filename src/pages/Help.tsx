import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';

export default function Help() {
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
              Welcome to our help center. We're here to assist you with any questions you may have.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
                <p className="text-muted-foreground">
                  Learn how to use our platform and find the perfect hotel for your needs.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Booking Help</h2>
                <p className="text-muted-foreground">
                  Need assistance with your booking? We're here to help every step of the way.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Account Support</h2>
                <p className="text-muted-foreground">
                  Manage your account settings and preferences with our comprehensive guides.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
                <p className="text-muted-foreground">
                  Can't find what you're looking for? Reach out to our support team directly.
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