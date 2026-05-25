/*panel administrador-usuarios*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminUsuarios.css";

const API_URL = "http://localhost:8091";
//const API_URL = "https://backend-spring-security-788d.onrender.com"; --- IGNORE ---

export default function AdminUsuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  async function cargarUsuarios() {
    try {
      setError("");
      setLoading(true);

      const res = await fetch(`${API_URL}/api/administrador/listarUsuarios`, {
        method: "GET",
        headers,
      });

      if (res.status === 401) {
        setError("Debes iniciar sesión");
        navigate("/login");
        return;
      }

      if (res.status === 403) {
        setError("No tienes permisos para ver esta sección");
        return;
      }

      if (!res.ok) {
        throw new Error("No se pudo cargar usuarios");
      }

      const data = await res.json();
      setUsuarios(data);
    } catch (e) {
      setError(e.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  async function desbloquear(idUsuario) {
    try {
      setError("");

      const res = await fetch(
        `${API_URL}/api/administrador/desbloquear/${idUsuario}`,
        {
          method: "PUT",
          headers,
        }
      );

      if (res.status === 401) {
        setError("Debes iniciar sesión");
        navigate("/login");
        return;
      }

      if (res.status === 403) {
        setError("No tienes permisos para desbloquear usuarios");
        return;
      }

      if (!res.ok) {
        throw new Error("No se pudo desbloquear el usuario");
      }

      await cargarUsuarios();
    } catch (e) {
      setError(e.message || "Error desconocido");
    }
  }

  function irARegistrar() {
    navigate("/admin/registrar");
  }

  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    cargarUsuarios();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-topbar">
        <h2 className="admin-title">Administración de Usuarios</h2>

        <div className="admin-actions">
          <button className="admin-btn-secondary" onClick={irARegistrar}>
            Agregar Usuario
          </button>
          <button className="admin-btn-danger" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {error && <div className="admin-alert error">{error}</div>}

      <button className="admin-btn" onClick={cargarUsuarios} disabled={loading}>
        {loading ? "Cargando..." : "Actualizar"}
      </button>

      <div className="admin-table-wrapper">
        {loading ? (
          <p className="admin-empty">Cargando...</p>
        ) : usuarios.length === 0 ? (
          <p className="admin-empty">No hay usuarios.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Intentos</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.idUsuario}>
                  <td>{u.idUsuario}</td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                  <td>{u.intentosFallidos}</td>
                  <td>
                    <span
                      className={
                        u.cuentaBloqueada
                          ? "admin-status-blocked"
                          : "admin-status-active"
                      }
                    >
                      {u.cuentaBloqueada ? "Bloqueado" : "Activo"}
                    </span>
                  </td>
                  <td>
                    {u.cuentaBloqueada && (
                      <button
                        className="admin-btn"
                        onClick={() => desbloquear(u.idUsuario)}
                      >
                        Desbloquear
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}