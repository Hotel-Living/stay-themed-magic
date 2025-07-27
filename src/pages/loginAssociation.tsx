import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://pgdzrvdwgoomjnnegkcn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZHpydmR3Z29vbWpubmVna2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Mjk0NzIsImV4cCI6MjA1ODQwNTQ3Mn0.VWcjjovrdsV7czPVaYJ219GzycoeYisMUpPhyHkvRZ0");

export default function LoginUser() {
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
    else window.location.href = "/panel-asociacion";
  };

  return (
    <div style={wrapperStyle}>
      <h2 style={titleStyle}>Acceso para usuarios</h2>
      <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <button onClick={handleLogin} style={buttonStyle}>Entrar</button>
      <p style={messageStyle}>{message}</p>
    </div>
  );
}

const wrapperStyle = { backgroundColor: "#fff", padding: "2rem", fontFamily: "sans-serif", maxWidth: "500px", margin: "5rem auto", borderRadius: "12px", boxShadow: "0 0 20px rgba(0,0,0,0.08)" };
const titleStyle = { marginBottom: "1.5rem", color: "#333", textAlign: "center" };
const inputStyle = { display: "block", marginBottom: "1rem", width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #ccc" };
const buttonStyle = { backgroundColor: "#7E26A6", color: "#fff", padding: "0.8rem 1.5rem", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%" };
const messageStyle = { marginTop: "1rem", color: "#666", textAlign: "center" };
