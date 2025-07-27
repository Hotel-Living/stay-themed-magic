import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function LoginAssociation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("❌ Ingresa tu correo y contraseña.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage("❌ " + error.message);
    else window.location.href = "/association-dashboard"
  };

  return (
    <div style={wrapperStyle}>
      <h2 style={titleStyle}>Acceso para asociaciones</h2>
      <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <button onClick={handleLogin} style={buttonStyle}>Entrar</button>
      <p style={messageStyle}>{message}</p>
    </div>
  );
}

const wrapperStyle = { backgroundColor: "#fff", padding: "2rem", fontFamily: "sans-serif", maxWidth: "500px", margin: "5rem auto", borderRadius: "12px", boxShadow: "0 0 20px rgba(0,0,0,0.08)" };
const titleStyle = { marginBottom: "1.5rem", color: "#333", textAlign: "center" as const };
const inputStyle = { display: "block", marginBottom: "1rem", width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #ccc", color: "#000" };
const buttonStyle = { backgroundColor: "#7E26A6", color: "#fff", padding: "0.8rem 1.5rem", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%" };
const messageStyle = { marginTop: "1rem", color: "#666", textAlign: "center" as const };