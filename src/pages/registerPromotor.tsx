import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPromotor() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!nombre || !apellidos || !email || !password || !confirmPassword) {
      setMessage("❌ Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Las contraseñas no coinciden.");
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/auth/callback?role=promoter`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            nombre,
            apellidos,
            role: "promoter"
          }
        }
      });

      if (error) {
        setMessage("❌ Error: " + error.message);
      } else {
        setMessage("✅ Registro exitoso. Revisa tu correo para confirmar tu cuenta.");
      }
    } catch (error: any) {
      setMessage("❌ Error inesperado: " + error.message);
    }
  };

  return (
    <AuthLayout 
      title="Registro de Promotor" 
      subtitle="Conviértete en promotor de Hotel-Living y gana comisiones"
    >
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nombre" className="text-[#7E26A6] font-semibold">Nombre</Label>
            <Input
              id="nombre"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="bg-white text-[#7E26A6] border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6] placeholder:text-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="apellidos" className="text-[#7E26A6] font-semibold">Apellidos</Label>
            <Input
              id="apellidos"
              type="text"
              placeholder="Apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="bg-white text-[#7E26A6] border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6] placeholder:text-gray-400"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email" className="text-[#7E26A6] font-semibold">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-[#7E26A6] border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6] placeholder:text-gray-400"
          />
        </div>
        
        <div>
          <Label htmlFor="password" className="text-[#7E26A6] font-semibold">Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-[#7E26A6] border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6] placeholder:text-gray-400"
          />
        </div>
        
        <div>
          <Label htmlFor="confirmPassword" className="text-[#7E26A6] font-semibold">Confirmar contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white text-[#7E26A6] border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6] placeholder:text-gray-400"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-[#7E26A6] hover:bg-[#5D0080] text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(126,38,166,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(126,38,166,0.5)]"
        >
          Registrarse
        </Button>
        
        {message && (
          <p className="text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </AuthLayout>
  );
}

