import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    try {
      const res = await fetch("http://localhost:8091/api/recuperacion/solicitar", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});

      if (res.ok) {
        setMensaje("✅ Si el correo existe, te llegará un código a tu email (Mailtrap).");
      } else {
        const txt = await res.text();
        setMensaje("❌ No se pudo enviar. " + (txt || ""));
      }
    } catch (err) {
      setMensaje("⚠️ Error al conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };
  

  return (
  <div className="login-bg">
    <div className="login-card">
      <h2 style={{ whiteSpace: "nowrap" }}>
        Recuperar contraseña </h2>
        
      <p className="sub" 
      style={{ marginTop: "10px", marginBottom: "10px" }}
      > Ingresa tu correo y te enviaremos un código de recuperación 
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={cargando}>
          {cargando ? <span className="spinner"></span> : "Enviar código"}
        </button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <Link to="/reset-password" className="forgot">
        Ya tengo el código
      </Link>

      <Link to="/" className="forgot">
        Volver al login
      </Link>
    </div>
  </div>
);
}

export default ForgotPassword;