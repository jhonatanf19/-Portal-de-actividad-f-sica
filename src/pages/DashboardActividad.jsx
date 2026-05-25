import React, { useEffect, useState } from "react";
import {
  obtenerActividades,
  registrarActividad,
  simularActividad,
  guardarMeta,
  obtenerReporte,
} from "../api/actividadService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import "./DashboardActividad.css";

function DashboardActividad() {
  const usuarioId = 2;

  const [actividades, setActividades] = useState([]);
  const [reporte, setReporte] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const [actividad, setActividad] = useState({
    usuarioId: usuarioId,
    fecha: "",
    pasos: "",
    calorias: "",
    frecuenciaCardiaca: "",
    origen: "MANUAL",
  });

  const [meta, setMeta] = useState({
    usuarioId: usuarioId,
    fechaInicio: "",
    fechaFin: "",
    metaPasos: "",
    metaCalorias: "",
    metaFrecuenciaCardiaca: "",
  });

  const cargarDatos = async () => {
    try {
      const dataActividades = await obtenerActividades(usuarioId);
      setActividades(dataActividades);

      try {
        const dataReporte = await obtenerReporte(usuarioId);
        setReporte(dataReporte);
      } catch {
        setReporte(null);
      }
    } catch (error) {
      setMensaje("Error al cargar datos del backend");
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleActividadChange = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const handleMetaChange = (e) => {
    setMeta({
      ...meta,
      [e.target.name]: e.target.value,
    });
  };

  const enviarActividad = async (e) => {
    e.preventDefault();

    try {
      await registrarActividad({
        ...actividad,
        pasos: Number(actividad.pasos),
        calorias: Number(actividad.calorias),
        frecuenciaCardiaca: Number(actividad.frecuenciaCardiaca),
      });

      setMensaje("Actividad registrada correctamente");

      setActividad({
        usuarioId: usuarioId,
        fecha: "",
        pasos: "",
        calorias: "",
        frecuenciaCardiaca: "",
        origen: "MANUAL",
      });

      cargarDatos();
    } catch (error) {
      setMensaje("No se pudo registrar la actividad");
    }
  };

  const generarSimulacion = async () => {
    try {
      await simularActividad(usuarioId);
      setMensaje("Datos simulados generados correctamente");
      cargarDatos();
    } catch (error) {
      setMensaje("No se pudo generar la simulación");
    }
  };

  const enviarMeta = async (e) => {
    e.preventDefault();

    try {
      await guardarMeta({
        ...meta,
        metaPasos: Number(meta.metaPasos),
        metaCalorias: Number(meta.metaCalorias),
        metaFrecuenciaCardiaca: Number(meta.metaFrecuenciaCardiaca),
      });

      setMensaje("Meta semanal guardada correctamente");

      setMeta({
        usuarioId: usuarioId,
        fechaInicio: "",
        fechaFin: "",
        metaPasos: "",
        metaCalorias: "",
        metaFrecuenciaCardiaca: "",
      });

      cargarDatos();
    } catch (error) {
      setMensaje("No se pudo guardar la meta semanal");
    }
  };

  return (
    <div className="actividad-page">
      <aside className="actividad-sidebar">
        <h2>FitPortal</h2>
        <p>Gimnasio</p>

        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#registrar">Registrar Actividad</a>
          <a href="#metas">Metas Semanales</a>
          <a href="#reporte">Reporte</a>
        </nav>
      </aside>

      <main className="actividad-main">
        <header className="actividad-header">
          <div>
            <h1>Dashboard de Actividad Física</h1>
            <p>Visualiza tus pasos, calorías y frecuencia cardíaca.</p>
          </div>

          <button onClick={generarSimulacion}>
            Generar datos simulados
          </button>
        </header>

        {mensaje && <div className="mensaje">{mensaje}</div>}

        <section id="dashboard" className="cards">
          <div className="card">
            <h3>Pasos</h3>
            <strong>{reporte ? reporte.totalPasos : 0}</strong>
            <span>Meta: {reporte ? reporte.metaPasos : 0}</span>
          </div>

          <div className="card">
            <h3>Calorías</h3>
            <strong>{reporte ? reporte.totalCalorias : 0}</strong>
            <span>Meta: {reporte ? reporte.metaCalorias : 0}</span>
          </div>

          <div className="card">
            <h3>Frecuencia Cardíaca</h3>
            <strong>{reporte ? reporte.promedioFrecuenciaCardiaca : 0} bpm</strong>
            <span>Meta: {reporte ? reporte.metaFrecuenciaCardiaca : 0} bpm</span>
          </div>

          <div className="card">
            <h3>Estado</h3>
            <strong>{reporte ? reporte.estadoGeneral : "Sin reporte"}</strong>
            <span>Progreso semanal</span>
          </div>
        </section>

        <section className="grid-section">
          <div className="panel">
            <h2>Progreso de Actividades</h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={actividades}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pasos" strokeWidth={2} />
                <Line type="monotone" dataKey="calorias" strokeWidth={2} />
                <Line type="monotone" dataKey="frecuenciaCardiaca" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="panel">
            <h2>Cumplimiento de Metas</h2>

            {reporte ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { nombre: "Pasos", porcentaje: reporte.porcentajePasos },
                    { nombre: "Calorías", porcentaje: reporte.porcentajeCalorias },
                    { nombre: "Frecuencia", porcentaje: reporte.porcentajeFrecuenciaCardiaca },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nombre" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="porcentaje" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>Primero registra una meta semanal.</p>
            )}
          </div>
        </section>

        <section className="forms-section">
          <form id="registrar" className="form-card" onSubmit={enviarActividad}>
            <h2>Registrar Actividad</h2>

            <label>Fecha</label>
            <input
              type="date"
              name="fecha"
              value={actividad.fecha}
              onChange={handleActividadChange}
              required
            />

            <label>Pasos</label>
            <input
              type="number"
              name="pasos"
              value={actividad.pasos}
              onChange={handleActividadChange}
              required
            />

            <label>Calorías</label>
            <input
              type="number"
              name="calorias"
              value={actividad.calorias}
              onChange={handleActividadChange}
              required
            />

            <label>Frecuencia cardíaca</label>
            <input
              type="number"
              name="frecuenciaCardiaca"
              value={actividad.frecuenciaCardiaca}
              onChange={handleActividadChange}
              required
            />

            <button type="submit">Guardar Actividad</button>
          </form>

          <form id="metas" className="form-card" onSubmit={enviarMeta}>
            <h2>Metas Semanales</h2>

            <label>Fecha inicio</label>
            <input
              type="date"
              name="fechaInicio"
              value={meta.fechaInicio}
              onChange={handleMetaChange}
              required
            />

            <label>Fecha fin</label>
            <input
              type="date"
              name="fechaFin"
              value={meta.fechaFin}
              onChange={handleMetaChange}
              required
            />

            <label>Meta de pasos</label>
            <input
              type="number"
              name="metaPasos"
              value={meta.metaPasos}
              onChange={handleMetaChange}
              required
            />

            <label>Meta de calorías</label>
            <input
              type="number"
              name="metaCalorias"
              value={meta.metaCalorias}
              onChange={handleMetaChange}
              required
            />

            <label>Meta frecuencia cardíaca</label>
            <input
              type="number"
              name="metaFrecuenciaCardiaca"
              value={meta.metaFrecuenciaCardiaca}
              onChange={handleMetaChange}
              required
            />

            <button type="submit">Guardar Metas</button>
          </form>
        </section>

        <section id="reporte" className="panel reporte-panel">
          <h2>Reporte de Progreso</h2>

          {reporte ? (
            <table>
              <thead>
                <tr>
                  <th>Métrica</th>
                  <th>Total alcanzado</th>
                  <th>Meta semanal</th>
                  <th>Cumplimiento</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Pasos</td>
                  <td>{reporte.totalPasos}</td>
                  <td>{reporte.metaPasos}</td>
                  <td>{reporte.porcentajePasos}%</td>
                </tr>

                <tr>
                  <td>Calorías</td>
                  <td>{reporte.totalCalorias}</td>
                  <td>{reporte.metaCalorias}</td>
                  <td>{reporte.porcentajeCalorias}%</td>
                </tr>

                <tr>
                  <td>Frecuencia cardíaca</td>
                  <td>{reporte.promedioFrecuenciaCardiaca} bpm</td>
                  <td>{reporte.metaFrecuenciaCardiaca} bpm</td>
                  <td>{reporte.porcentajeFrecuenciaCardiaca}%</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No hay reporte disponible.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardActividad;