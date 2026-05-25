/*logeado-token-usuario-admin*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Logeado() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const userEmail = localStorage.getItem("userEmail");
  const rol = localStorage.getItem("rol");

  const cerrarSesion = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      localStorage.removeItem("userEmail");

      setMensaje("Sesión cerrada correctamente");
      setModal("success");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (e) {
      setMensaje("Error al cerrar sesión");
      setModal("error");
    }
  };

  const cerrarModal = () => setModal(null);

  return (
    <div className="portal-bg">
      <header className="portal-header">
        <div className="portal-brand">
          <div className="portal-logo">❤</div>
          <div>
            <h2>FitPortal</h2>
            <p>Centro de actividad física</p>
          </div>
        </div>

        <button className="btn-logout" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </header>

      <main className="portal-main">
        <section className="portal-hero">
          <div className="portal-hero-text">
            <span className="portal-badge">Sesión iniciada correctamente</span>

            <h1>
              Bienvenido a tu portal de <br />
              actividad física
            </h1>

            <p>
              Visualiza tus pasos, calorías, frecuencia cardíaca, metas
              semanales y reportes de progreso desde un solo lugar.
            </p>

            <div className="portal-user-box">
              <p>
                Usuario: <b>{userEmail}</b>
              </p>
              <p>
                Rol: <b>{rol}</b>
              </p>
            </div>

            <div className="portal-actions">
              <button
                className="btn-primary"
                onClick={() => navigate("/actividad")}
              >
                Ir a FitPortal
              </button>

              {rol === "ADMINISTRADOR" && (
                <button
                  className="btn-secondary"
                  onClick={() => navigate("/admin")}
                >
                  Administrar usuarios
                </button>
              )}
            </div>
          </div>

          <div className="portal-dashboard-preview">
            <div className="preview-card large">
              <span>Pasos diarios</span>
              <h3>8,500</h3>
              <div className="progress-line">
                <div style={{ width: "80%" }}></div>
              </div>
            </div>

            <div className="preview-grid">
              <div className="preview-card">
                <span>Calorías</span>
                <h3>450</h3>
              </div>

              <div className="preview-card">
                <span>Frecuencia</span>
                <h3>78 bpm</h3>
              </div>
            </div>

            <div className="preview-card">
              <span>Meta semanal</span>
              <h3>76%</h3>
              <p>Vas avanzando bien</p>
            </div>
          </div>
        </section>

        <section className="portal-options">
          <div className="option-card" onClick={() => navigate("/actividad")}>
            <div className="option-icon">📊</div>
            <h3>Dashboard</h3>
            <p>Consulta gráficos de pasos, calorías y frecuencia cardíaca.</p>
          </div>

          <div className="option-card" onClick={() => navigate("/actividad#registrar")}>
            <div className="option-icon">📝</div>
            <h3>Registrar actividad</h3>
            <p>Agrega tus datos diarios de forma manual o simulada.</p>
          </div>

          <div className="option-card" onClick={() => navigate("/actividad#metas")}>
            <div className="option-icon">🎯</div>
            <h3>Metas semanales</h3>
            <p>Define objetivos de pasos, calorías y frecuencia cardíaca.</p>
          </div>

          <div className="option-card" onClick={() => navigate("/actividad#reporte")}>
            <div className="option-icon">📈</div>
            <h3>Reporte</h3>
            <p>Revisa tu progreso y cumplimiento semanal.</p>
          </div>
        </section>
      </main>

      {modal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {modal === "success" ? (
              <>
                <h3>✅ Sesión cerrada</h3>
                <p>{mensaje}</p>
                <p className="small">Volviendo al login...</p>
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