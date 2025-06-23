
import React from 'react';
import { ArrowUp, BarChart2, Building, Calendar, Star, Users, Clock, Sparkles, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../StatCard';
import ActionCard from '../../ActionCard';
import { useReviewNotifications } from '@/hooks/useReviewNotifications';
import { Button } from '@/components/ui/button';
import { RecommendedHotels } from '@/components/dashboard/user/RecommendedHotels';
import { FirstTimeUserBanner } from '@/components/dashboard/user/FirstTimeUserBanner';
import { useFirstBookingMode } from '@/hooks/useFirstBookingMode';
import { useSavedHotelsCount } from '@/components/dashboard/hooks/useSavedHotelsCount';
import { ExpertBadge } from '@/components/dashboard/user/ExpertBadge';
import { ExpertStats } from '@/components/dashboard/user/ExpertStats';
import { AffinityBadges } from '@/components/dashboard/user/AffinityBadges';
import { useExpertMode } from '@/hooks/useExpertMode';
import { useTranslation } from '@/hooks/useTranslation';

export const DashboardContent = () => {
  const navigate = useNavigate();
  const { isFirstTimeUser, loading: firstTimeLoading } = useFirstBookingMode();
  const { savedHotelsCount, isLoading: savedHotelsLoading } = useSavedHotelsCount();
  const { isExpert } = useExpertMode();
  const { language } = useTranslation();
  const {
    notifications,
    newNotificationsCount,
    loading: notificationsLoading
  } = useReviewNotifications();
  
  // Get translations based on language
  const getTranslations = () => {
    if (language === 'es') {
      return {
        stats: {
          totalBookings: 'Reservas Totales',
          savedHotels: 'Hoteles Guardados',
          reviewsWritten: 'Reseñas Escritas',
          freeNights: 'Noches Gratis'
        },
        welcome: {
          title: '¡Bienvenido a Hotel-Living!',
          subtitle: 'Descubre hoteles increíbles adaptados a tus preferencias. Actualiza tus afinidades en tu perfil para obtener recomendaciones personalizadas.',
          expertWelcome: '¡Bienvenido de vuelta, Experto de Hotel Living! Descubre nuevos destinos y disfruta de características exclusivas.'
        },
        quickActions: {
          title: 'Acciones Rápidas',
          browseHotels: 'Explorar Hoteles',
          browseHotelsDesc: 'Descubre lugares increíbles para hospedarte.',
          myBookings: 'Mis Reservas',
          myBookingsDesc: 'Ve y gestiona tus reservaciones.',
          savedHotels: 'Hoteles Guardados',
          savedHotelsDesc: 'Ve tus propiedades favoritas.',
          writeReview: 'Escribir Reseña',
          writeReviewDesc: 'Comparte tu experiencia con otros.'
        },
        recentActivity: {
          recentBookings: 'Reservas Recientes',
          noBookings: 'Aún no hay reservas',
          noBookingsDesc: 'Comienza explorando hoteles para hacer tu primera reserva',
          savedHotelsSection: 'Hoteles Guardados',
          noSavedHotels: 'Aún no hay hoteles guardados',
          noSavedHotelsDesc: 'Guarda hoteles que te gusten para encontrarlos fácilmente más tarde',
          savedHotelsCount: `${savedHotelsCount} hoteles guardados`
        }
      };
    }
    
    // Default English translations
    return {
      stats: {
        totalBookings: 'Total Bookings',
        savedHotels: 'Saved Hotels',
        reviewsWritten: 'Reviews Written',
        freeNights: 'Free Nights'
      },
      welcome: {
        title: 'Welcome to Hotel-Living!',
        subtitle: 'Discover amazing hotels tailored to your preferences. Update your affinities in your profile to get personalized recommendations.',
        expertWelcome: 'Welcome back, Hotel Living Expert! Discover new destinations and enjoy exclusive features.'
      },
      quickActions: {
        title: 'Quick Actions',
        browseHotels: 'Browse Hotels',
        browseHotelsDesc: 'Discover amazing places to stay.',
        myBookings: 'My Bookings',
        myBookingsDesc: 'View and manage your reservations.',
        savedHotels: 'Saved Hotels',
        savedHotelsDesc: 'See your favorite properties.',
        writeReview: 'Write Review',
        writeReviewDesc: 'Share your experience with others.'
      },
      recentActivity: {
        recentBookings: 'Recent Bookings',
        noBookings: 'No bookings yet',
        noBookingsDesc: 'Start exploring hotels to make your first booking',
        savedHotelsSection: 'Saved Hotels',
        noSavedHotels: 'No saved hotels yet',
        noSavedHotelsDesc: 'Save hotels you like to easily find them later',
        savedHotelsCount: `${savedHotelsCount} saved hotels`
      }
    };
  };
  
  const t = getTranslations();
  
  const stats = [{
    title: t.stats.totalBookings,
    value: '0',
    change: '0%',
    trend: 'neutral',
    icon: <Calendar className="w-4 h-4" />
  }, {
    title: t.stats.savedHotels,
    value: savedHotelsLoading ? '...' : savedHotelsCount.toString(),
    change: '0%',
    trend: 'neutral',
    icon: <Star className="w-4 h-4" />
  }, {
    title: t.stats.reviewsWritten,
    value: '0',
    change: '0%',
    trend: 'neutral',
    icon: <MessageSquare className="w-4 h-4" />
  }, {
    title: t.stats.freeNights,
    value: '0',
    change: '0',
    trend: 'neutral',
    icon: <Sparkles className="w-4 h-4" />
  }];
  
  const actions = [{
    title: t.quickActions.browseHotels,
    description: t.quickActions.browseHotelsDesc,
    icon: <Building className="w-5 h-5" />,
    onClick: () => navigate('/hotels')
  }, {
    title: t.quickActions.myBookings,
    description: t.quickActions.myBookingsDesc,
    icon: <Calendar className="w-5 h-5" />,
    onClick: () => {} // This will be handled by tab switching
  }, {
    title: t.quickActions.savedHotels,
    description: t.quickActions.savedHotelsDesc,
    icon: <Star className="w-5 h-5" />,
    onClick: () => {} // This will be handled by tab switching
  }, {
    title: t.quickActions.writeReview,
    description: t.quickActions.writeReviewDesc,
    icon: <MessageSquare className="w-5 h-5" />,
    onClick: () => {} // This will be handled by tab switching
  }];
  
  return (
    <div className="space-y-8">
      {/* Expert Badge */}
      <ExpertBadge />

      {/* First Time User Banner */}
      {!firstTimeLoading && isFirstTimeUser && (
        <FirstTimeUserBanner />
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      {/* Expert Stats - Only show for expert users */}
      {isExpert && (
        <ExpertStats />
      )}

      {/* Affinity Badges Section */}
      <AffinityBadges />

      {/* Welcome Message */}
      <div className="glass-card rounded-2xl p-6 border border-fuchsia-500/20 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-2">{t.welcome.title}</h2>
        <p className="text-foreground/80 mb-4">
          {isExpert ? t.welcome.expertWelcome : t.welcome.subtitle}
        </p>
      </div>

      {/* Recommended Hotels Section */}
      <RecommendedHotels />

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-4">{t.quickActions.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, i) => <ActionCard key={i} {...action} />)}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="glass-card rounded-2xl p-6 bg-[#5d0478]">
          <h2 className="text-xl font-semibold mb-4">{t.recentActivity.recentBookings}</h2>
          
          <div className="text-center py-8 text-foreground/60 bg-[#a54afe]">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t.recentActivity.noBookings}</p>
            <p className="text-sm mt-2">{t.recentActivity.noBookingsDesc}</p>
          </div>
        </div>

        {/* Saved Hotels */}
        <div className="glass-card rounded-2xl p-6 bg-[#5d0478]">
          <h2 className="text-xl font-semibold mb-4">{t.recentActivity.savedHotelsSection}</h2>
          
          <div className="text-center py-8 text-foreground/60 bg-[#a54afe]">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{savedHotelsCount > 0 ? t.recentActivity.savedHotelsCount : t.recentActivity.noSavedHotels}</p>
            <p className="text-sm mt-2">{t.recentActivity.noSavedHotelsDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
