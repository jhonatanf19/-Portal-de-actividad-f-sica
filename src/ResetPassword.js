import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    try {
      const res = await fetch("http://localhost:8091/api/recuperacion/restablecer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, nuevaPassword }),
    });

      const txt = await res.text();

      if (res.ok) {
        setMensaje("✅ Contraseña actualizada. Ahora inicia sesión.");
        setTimeout(() => navigate("/"), 1200);
      } else {
        setMensaje("❌ " + (txt || "No se pudo actualizar"));
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
        <h2>Restablecer contraseña</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingresa el código"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />

          <input
            type="password"
            placeholder="Nueva contraseña"
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
          />

          <button type="submit" disabled={cargando}>
            {cargando ? "Actualizando..." : "Cambiar contraseña"}
          </button>
        </form>

        {mensaje && <p>{mensaje}</p>}

        <Link to="/">Volver al login</Link>
      </div>
    </div>
  );
}

export default ResetPassword;