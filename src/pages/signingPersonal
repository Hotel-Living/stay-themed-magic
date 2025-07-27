import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pgdzrvdwgoomjnnegkcn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZHpydmR3Z29vbWpubmVna2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Mjk0NzIsImV4cCI6MjA1ODQwNTQ3Mn0.VWcjjovrdsV7czPVaYJ219GzycoeYisMUpPhyHkvRZ0"
);

export default function SigningPersonal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMessage("❌ Error: " + error.message);
    else setMessage("✅ Verifica tu correo para continuar.");
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage("❌ Error: " + error.message);
    else {
      const { data } = await supabase.auth.getUser();
      const userEmail = data?.user?.email || "";
      // Redirección personalizada según rol
      if (userEmail.includes("hotel")) window.location.href = "/panel/hotel";
      else if (userEmail.includes("asociacion")) window.location.href = "/panel/asociacion";
      else if (userEmail.includes("promotor")) window.location.href = "/panel/promotor";
      else window.location.href = "/panel/usuario";
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Iniciar sesión o registrarse</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "1rem 0", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <button onClick={handleLogin} style={{ marginRight: "1rem" }}>Entrar</button>
      <button onClick={handleSignup}>Registrarse</button>
      <p style={{ marginTop: "1rem" }}>{message}</p>
    </div>
  );
}
