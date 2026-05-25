/*panel administrador-registro*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrarUsuarios.css";

const API_URL = "http://localhost:8091";
//const API_URL = "https://backend-spring-security-788d.onrender.com"; --- IGNORE ---

export default function RegistrarUsuario() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("USUARIO");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  async function registrar(e) {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/administrador/registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          email,
          password,
          rol,
        }),
      });

      const data = await res.text();

      if (res.status === 401) {
        setError("Debes iniciar sesión");
        navigate("/login");
        return;
      }

      if (res.status === 403) {
        setError(data || "No tienes permisos para registrar usuarios");
        return;
      }

      if (!res.ok) {
        throw new Error(data || "No se pudo registrar el usuario");
      }

      setMensaje(data || "Usuario registrado correctamente");
      setEmail("");
      setPassword("");
      setRol("USUARIO");
    } catch (err) {
      setError(err.message || "Error desconocido");
    }
  }

  function volverAlPanel() {
    navigate("/admin");
  }

  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }

  return (
    <div className="registro-container">
      <div className="registro-topbar">
        <h2 className="registro-title">Registrar Usuario</h2>

        <div className="registro-actions">
          <button
            type="button"
            className="registro-btn"
            onClick={volverAlPanel}
          >
            Volver
          </button>
          <button
            type="button"
            className="registro-btn-danger"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {mensaje && <div className="registro-alert success">{mensaje}</div>}
      {error && <div className="registro-alert error">{error}</div>}

      <form onSubmit={registrar}>
        <div className="registro-form-group">
          <input
            className="registro-input"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="registro-form-group">
          <input
            className="registro-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <div className="registro-form-group">
          <select
            className="registro-select"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="USUARIO">USUARIO</option>
            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
          </select>
        </div>

        <button type="submit" className="registro-btn-submit">
          Registrar
        </button>
      </form>
    </div>
  );
}