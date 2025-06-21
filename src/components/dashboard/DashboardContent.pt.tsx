
import React from 'react';
import { ArrowUp, BarChart2, Building, Calendar, Star, Users, Clock, Sparkles, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from './StatCard';
import ActionCard from './ActionCard';
import { useReviewNotifications } from '@/hooks/useReviewNotifications';
import { Button } from '@/components/ui/button';

export const DashboardContentPT = () => {
  const navigate = useNavigate();
  const {
    notifications,
    newNotificationsCount,
    loading: notificationsLoading
  } = useReviewNotifications();
  
  const stats = [{
    title: 'Total de Reservas',
    value: '0',
    change: '0%',
    trend: 'neutral',
    icon: <Calendar className="w-4 h-4" />
  }, {
    title: 'Receita',
    value: '$0',
    change: '0%',
    trend: 'neutral',
    icon: <BarChart2 className="w-4 h-4" />
  }, {
    title: 'Classificação Média',
    value: '0.0',
    change: '0.0',
    trend: 'neutral',
    icon: <Star className="w-4 h-4" />
  }, {
    title: 'Hóspedes',
    value: '0',
    change: '0%',
    trend: 'neutral',
    icon: <Users className="w-4 h-4" />
  }];
  
  const actions = [{
    title: 'Adicionar Propriedade',
    description: 'Liste uma nova propriedade em nossa plataforma',
    icon: <Building className="w-5 h-5" />,
    onClick: () => navigate('/add-property')
  }, {
    title: 'Ver Reservas',
    description: 'Gerencie suas reservas atuais',
    icon: <Calendar className="w-5 h-5" />,
    onClick: () => navigate('/bookings')
  }, {
    title: 'Ver Análises',
    description: 'Acompanhe suas métricas de desempenho',
    icon: <BarChart2 className="w-5 h-5" />,
    onClick: () => navigate('/analytics')
  }, {
    title: 'Gerenciar Avaliações',
    description: 'Responda ao feedback dos hóspedes',
    icon: <MessageSquare className="w-5 h-5" />,
    onClick: () => document.querySelector('[data-tab="reviews"]')?.dispatchEvent(new MouseEvent('click', {
      bubbles: true
    }))
  }];
  
  return <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      {/* Welcome Message for New Hotel Owners */}
      <div className="glass-card rounded-2xl p-6 border border-fuchsia-500/20 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-2">Bem-vindo ao Hotel Living</h2>
        <p className="text-foreground/80 mb-4">
          Comece sua jornada como parceiro do Hotel Living. Adicione sua primeira propriedade para começar.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, i) => <ActionCard key={i} {...action} />)}
        </div>
      </div>

      {/* Two Column Layout for Reviews and Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reviews with Notifications */}
        <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Avaliações Recentes</h2>
          </div>
          
          <div className="text-center py-8 text-foreground/60 bg-[#9939f9]">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma avaliação ainda</p>
            <p className="text-sm mt-2">Avaliações dos hóspedes aparecerão aqui</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="glass-card rounded-2xl p-6 bg-[#5d0478]">
          <h2 className="text-xl font-semibold mb-4">Reservas Recentes</h2>
          
          <div className="text-center py-8 text-foreground/60 bg-[#a54afe]">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma reserva ainda</p>
            <p className="text-sm mt-2">Novas reservas aparecerão aqui</p>
          </div>
        </div>
      </div>
    </div>;
};

export default DashboardContentPT;
