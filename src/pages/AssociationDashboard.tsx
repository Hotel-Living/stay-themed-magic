import React, { useEffect, useState } from "react";
import { AssociationDashboard } from "@/components/association/AssociationDashboard";
import { AssociationLogin } from "@/components/association/AssociationLogin";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AssociationDashboardPage = () => {
  const { user, session } = useAuth();
  const [isAssociation, setIsAssociation] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAssociationStatus = async () => {
      if (!user) {
        setIsAssociation(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data: association, error } = await supabase
          .from('hotel_associations')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error || !association) {
          setIsAssociation(false);
        } else {
          setIsAssociation(true);
        }
      } catch (error) {
        console.error('Error checking association status:', error);
        setIsAssociation(false);
      }
      
      setIsLoading(false);
    };

    checkAssociationStatus();
  }, [user]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Sesión cerrada correctamente');
      setIsAssociation(false);
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  const handleLoginSuccess = () => {
    setIsLoading(true);
    // Trigger re-check of association status
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Cargando...</div>
      </div>
    );
  }

  if (!user || !session || !isAssociation) {
    return <AssociationLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-20">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          Cerrar Sesión
        </Button>
      </div>
      <AssociationDashboard />
    </div>
  );
};

export default AssociationDashboardPage;