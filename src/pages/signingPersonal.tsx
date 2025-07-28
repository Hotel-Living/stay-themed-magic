import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function SigningPersonal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: "usuario"
        }
      }
    });

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
    <div style={{
      backgroundColor: "#fff",
      padding: "2rem",
      fontFamily: "sans-serif",
      maxWidth: "400px",
      margin: "5rem auto",
      borderRadius: "12px",
      boxShadow: "0 0 20px rgba(0,0,0,0.08)"
    }}>
      <h2 style={{ marginBottom: "1.5rem", color: "#333", textAlign: "center" }}>
        Iniciar sesión o registrarse
      </h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          display: "block",
          marginBottom: "1rem",
          width: "100%",
          padding: "0.75rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          marginBottom: "1.5rem",
          width: "100%",
          padding: "0.75rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#7E26A6",
            color: "#fff",
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            flex: 1,
            marginRight: "0.5rem"
          }}
        >
          Entrar
        </button>

        <button
          onClick={handleSignup}
          style={{
            backgroundColor: "#7E26A6",
            color: "#fff",
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            flex: 1
          }}
        >
          Registrarse
        </button>
      </div>

      <p style={{ marginTop: "1rem", color: "#666", textAlign: "center" }}>{message}</p>
    </div>
  );
}
