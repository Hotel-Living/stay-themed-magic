// mismo bloque de imports y supabase arriba...

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

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre,
          apellidos,
          rol: "promotor"
        }
      }
    });

    if (error) setMessage("❌ Error: " + error.message);
    else setMessage("✅ Registro exitoso. Revisa tu correo.");
  };

  return (
    <div style={wrapperStyle}>
      <h2 style={titleStyle}>Registro de Promotor</h2>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={inputStyle} />
      <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} style={inputStyle} />
      <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} />
      <button onClick={handleRegister} style={buttonStyle}>Registrarse</button>
      <p style={messageStyle}>{message}</p>
    </div>
  );
}

// Usa los mismos estilos que en los anteriores
