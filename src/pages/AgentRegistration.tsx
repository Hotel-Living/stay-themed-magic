import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import BubbleCounter from "@/components/common/BubbleCounter";

const AgentRegistration = () => {
  const { t } = useTranslation('agents');
  const navigate = useNavigate();
  const { signUp, signIn, user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!formData.fullName || !formData.email || !formData.password) {
        toast({
          title: "Error",
          description: t('registration.errors.required_fields'),
          variant: "destructive"
        });
        return;
      }

      if (!formData.acceptTerms) {
        toast({
          title: "Error",
          description: t('registration.errors.terms_required'),
          variant: "destructive"
        });
        return;
      }

      if (formData.password.length < 6) {
        toast({
          title: "Error",
          description: t('registration.errors.weak_password'),
          variant: "destructive"
        });
        return;
      }

      // Split full name
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';

      // Sign up user
      const authResult = await signUp(
        formData.email,
        formData.password,
        {
          first_name: firstName,
          last_name: lastName,
          is_hotel_owner: false
        }
      );

      if (!authResult.success) {
        if (authResult.error?.includes('already registered')) {
          toast({
            title: "Error",
            description: t('registration.errors.email_exists'),
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error",
            description: authResult.error || "Error en el registro",
            variant: "destructive"
          });
        }
        return;
      }

      // Wait for user to be available in auth context
      if (!user) {
        // Sign in the user to get the user object
        const signInResult = await signIn(formData.email, formData.password);
        if (!signInResult.success) {
          throw new Error('Auto sign-in failed');
        }
      }

      // Generate agent code
      const { data: agentCodeData, error: codeError } = await supabase
        .rpc('generate_agent_code', {
          first_name: firstName,
          last_name: lastName
        });

      if (codeError) {
        console.error('Error generating agent code:', codeError);
        throw codeError;
      }

      // Create agent record - use current user from context
      const currentUser = user; // Get current user from auth context
      if (!currentUser) {
        throw new Error('User not available after registration');
      }

      const { error: agentError } = await supabase
        .from('agents')
        .insert({
          user_id: currentUser.id,
          agent_code: agentCodeData,
          full_name: formData.fullName,
          email: formData.email,
          bank_account: '' // Empty initially, to be filled in dashboard
        });

      if (agentError) {
        console.error('Error creating agent:', agentError);
        throw agentError;
      }

      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta de agente ha sido creada. Ahora puedes acceder a tu panel.",
      });

      // Navigate to dashboard
      navigate('/panel-agente');

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al crear tu cuenta. Por favor intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Starfield />
      <div className="relative z-10">
        <Navbar />
        <BubbleCounter />
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-8 max-w-md">
            <div className="bg-[#7E00B3]/90 backdrop-blur-sm rounded-lg p-8 text-white shadow-[0_0_60px_rgba(0,200,255,0.8),0_0_120px_rgba(0,200,255,0.4),0_0_180px_rgba(0,200,255,0.2)]">
              
              <h1 className="text-2xl font-bold mb-6 text-center glow">
                {t('registration.title')}
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-white">
                    {t('registration.full_name')}
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    {t('registration.email')}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-white">
                    {t('registration.password')}
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    minLength={6}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                    }
                  />
                  <Label htmlFor="acceptTerms" className="text-white text-sm">
                    {t('registration.accept_terms')}
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#70009E] hover:bg-[#70009E]/80 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300"
                >
                  {loading ? "Registrando..." : t('registration.submit')}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {t('registration.login_link')}
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AgentRegistration;