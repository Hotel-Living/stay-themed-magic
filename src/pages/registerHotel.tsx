import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://pgdzrvdwgoomjnnegkcn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZHpydmR3Z29vbWpubmVna2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Mjk0NzIsImV4cCI6MjA1ODQwNTQ3Mn0.VWcjjovrdsV7czPVaYJ219GzycoeYisMUpPhyHkvRZ0");

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

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombreHotel,
          rol: "hotel"
        }
      }
    });

    if (error) setMessage("❌ Error: " + error.message);
    else setMessage("✅ Registro exitoso. Revisa tu correo.");
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
const titleStyle = { marginBottom: "1.5rem", color: "#333", textAlign: "center" };
const inputStyle = { display: "block", marginBottom: "1rem", width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #ccc" };
const buttonStyle = { backgroundColor: "#7E26A6", color: "#fff", padding: "0.8rem 1.5rem", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%" };
const messageStyle = { marginTop: "1rem", color: "#666", textAlign: "center" };
