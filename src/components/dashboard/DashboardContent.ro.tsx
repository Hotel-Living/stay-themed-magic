
import React from 'react';
import { ArrowUp, BarChart2, Building, Calendar, Star, Users, Clock, Sparkles, MessageSquare } from 'lucide-react';
import StatCard from './StatCard';
import ActionCard from './ActionCard';
import { useReviewNotifications } from '@/hooks/useReviewNotifications';
import { Button } from '@/components/ui/button';

interface DashboardContentROProps {
  setActiveTab?: (tab: string) => void;
}

export const DashboardContentRO = ({ setActiveTab }: DashboardContentROProps = {}) => {
  const {
    notifications,
    newNotificationsCount,
    loading: notificationsLoading
  } = useReviewNotifications();
  
  const stats = [{
    title: 'Total Rezervări',
    value: '0',
    change: '0%',
    trend: 'neutral',
    icon: <Calendar className="w-4 h-4" />
  }, {
    title: 'Venituri',
    value: '$0',
    change: '0%',
    trend: 'neutral',
    icon: <BarChart2 className="w-4 h-4" />
  }, {
    title: 'Rating Mediu',
    value: '0.0',
    change: '0.0',
    trend: 'neutral',
    icon: <Star className="w-4 h-4" />
  }, {
    title: 'Oaspeți',
    value: '0',
    change: '0%',
    trend: 'neutral',
    icon: <Users className="w-4 h-4" />
  }];
  
  const actions = [{
    title: 'Adaugă Proprietate',
    description: 'Listează o nouă proprietate pe platforma noastră',
    icon: <Building className="w-5 h-5" />,
    onClick: () => setActiveTab?.('properties')
  }, {
    title: 'Vezi Rezervări',
    description: 'Gestionează rezervările tale actuale',
    icon: <Calendar className="w-5 h-5" />,
    onClick: () => setActiveTab?.('bookings')
  }, {
    title: 'Vezi Analize',
    description: 'Urmărește-ți metricile de performanță',
    icon: <BarChart2 className="w-5 h-5" />,
    onClick: () => setActiveTab?.('analytics')
  }, {
    title: 'Gestionează Recenzii',
    description: 'Răspunde la feedback-ul oaspeților',
    icon: <MessageSquare className="w-5 h-5" />,
    onClick: () => setActiveTab?.('reviews')
  }];
  
  return <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      {/* Welcome Message for New Hotel Owners */}
      <div className="glass-card rounded-2xl p-6 border border-fuchsia-500/20 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-2">Bun venit la Hotel Living</h2>
        <p className="text-foreground/80 mb-4">
          Începe-ți călătoria ca partener Hotel Living. Adaugă prima ta proprietate pentru a începe.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-4">Acțiuni Rapide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, i) => <ActionCard key={i} {...action} />)}
        </div>
      </div>

      {/* Two Column Layout for Reviews and Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reviews with Notifications */}
        <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recenzii Recente</h2>
          </div>
          
          <div className="text-center py-8 text-foreground/60 bg-[#9939f9]">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Încă nu există recenzii</p>
            <p className="text-sm mt-2">Recenziile oaspeților vor apărea aici</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="glass-card rounded-2xl p-6 bg-[#5d0478]">
          <h2 className="text-xl font-semibold mb-4">Rezervări Recente</h2>
          
          <div className="text-center py-8 text-foreground/60 bg-[#a54afe]">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Încă nu există rezervări</p>
            <p className="text-sm mt-2">Rezervările noi vor apărea aici</p>
          </div>
        </div>
      </div>
    </div>;
};

export default DashboardContentRO;
