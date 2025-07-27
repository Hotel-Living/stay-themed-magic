import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function RegisterHotel() {
  const [nombreHotel, setNombreHotel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!nombreHotel || !email || !password || !confirmPassword) {
      setMessage("❌ Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Las contraseñas no coinciden.");
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/auth/callback?role=hotel`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            nombreHotel,
            role: "hotel"
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
    <div style={wrapperStyle}>
      <h2 style={titleStyle}>Registro de Hotel</h2>
      <input type="text" placeholder="Nombre del hotel" value={nombreHotel} onChange={(e) => setNombreHotel(e.target.value)} style={inputStyle} />
      <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} />
      <button onClick={handleRegister} style={buttonStyle}>Registrarse</button>
      <p style={messageStyle}>{message}</p>
    </div>
  );
}

const wrapperStyle = { backgroundColor: "#fff", padding: "2rem", fontFamily: "sans-serif", maxWidth: "500px", margin: "5rem auto", borderRadius: "12px", boxShadow: "0 0 20px rgba(0,0,0,0.08)" };
const titleStyle = { marginBottom: "1.5rem", color: "#333", textAlign: "center" as const };
const inputStyle = { display: "block", marginBottom: "1rem", width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #ccc", color: "#000" };
const buttonStyle = { backgroundColor: "#7E26A6", color: "#fff", padding: "0.8rem 1.5rem", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%" };
const messageStyle = { marginTop: "1rem", color: "#666", textAlign: "center" as const };
