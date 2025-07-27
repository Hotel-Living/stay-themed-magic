// mismo bloque de imports y supabase arriba...

export default function RegisterAssociation() {
  const [nombreAsociacion, setNombreAsociacion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!nombreAsociacion || !email || !password || !confirmPassword) {
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
          nombreAsociacion,
          rol: "asociacion"
        }
      }
    });

    if (error) setMessage("❌ Error: " + error.message);
    else setMessage("✅ Registro exitoso. Revisa tu correo.");
  };

  return (
    <div style={wrapperStyle}>
      <h2 style={titleStyle}>Registro de Asociación</h2>
      <input type="text" placeholder="Nombre de la asociación" value={nombreAsociacion} onChange={(e) => setNombreAsociacion(e.target.value)} style={inputStyle} />
      <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} />
      <button onClick={handleRegister} style={buttonStyle}>Registrarse</button>
      <p style={messageStyle}>{message}</p>
    </div>
  );
}

// Usa los mismos estilos que en el anterior
