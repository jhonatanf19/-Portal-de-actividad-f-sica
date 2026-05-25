import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "./assets/login-image.png";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!email.trim() || !password.trim()) {
      setMensaje("Por favor colocar las credenciales para iniciar sesión");
      setModal("error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8091/api/usuarios/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const texto = await response.text();
      let data = {};

      try {
        data = JSON.parse(texto);
      } catch {
        data = { mensaje: texto };
      }
console.log("STATUS:", response.status);
console.log("RESPUESTA LOGIN:", data);

if (response.ok) {
  console.log("TOKEN RECIBIDO:", data.token);

  if (data.token) {
    localStorage.setItem("token", data.token);
    console.log("TOKEN GUARDADO:", localStorage.getItem("token"));
  }

  if (data.rol) {
    localStorage.setItem("rol", data.rol.trim().toUpperCase());
  }

  if (data.email) {
    localStorage.setItem("userEmail", data.email);
  } else {
    localStorage.setItem("userEmail", email);
  }

  setMensaje("Inicio de sesión exitoso");
  setModal("success");

  setTimeout(() => {
    const rolUsuario = data.rol?.trim().toUpperCase();

    if (rolUsuario === "ADMINISTRADOR") {
      navigate("/admin");
    } else {
      navigate("/logeado");
    }
  }, 1200);
} else {
  setMensaje(data.mensaje || data.error || "Credenciales incorrectas");
  setModal("error");
}
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
      setModal("error");
    } finally {
      setLoading(false);
    }
  };

  const cerrarModal = () => setModal(null);

  return (
    <div className="login-bg">
      <div className="illustration">
        <img src={loginImage} alt="loginvisual" />
      </div>

      <div className="login-card">
        <h2>Bienvenido 👋</h2>
        <p className="sub">Inicia sesión para continuar</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <Link to="/forgot-password" className="forgot">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {modal === "success" ? (
              <>
                <h3>✅ Login exitoso</h3>
                <p>{mensaje}</p>
                <p className="small">Entrando...</p>
              </>
            ) : (
              <>
                <h3>❌ Error</h3>
                <p>{mensaje}</p>
                <button onClick={cerrarModal}>Cerrar</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;