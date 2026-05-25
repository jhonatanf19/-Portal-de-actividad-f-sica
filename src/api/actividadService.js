const API_URL = "http://localhost:8091/api";

export const obtenerActividades = async (usuarioId) => {
  const res = await fetch(`${API_URL}/actividad/usuario/${usuarioId}`);

  if (!res.ok) {
    throw new Error("Error al obtener actividades");
  }

  return await res.json();
};

export const registrarActividad = async (actividad) => {
  const res = await fetch(`${API_URL}/actividad/registrar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(actividad),
  });

  if (!res.ok) {
    throw new Error("Error al registrar actividad");
  }

  return await res.json();
};

export const simularActividad = async (usuarioId) => {
  const res = await fetch(`${API_URL}/actividad/simular/${usuarioId}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Error al simular actividad");
  }

  return await res.json();
};

export const guardarMeta = async (meta) => {
  const res = await fetch(`${API_URL}/metas/guardar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meta),
  });

  if (!res.ok) {
    throw new Error("Error al guardar meta");
  }

  return await res.json();
};

export const obtenerReporte = async (usuarioId) => {
  const res = await fetch(`${API_URL}/reportes/usuario/${usuarioId}`);

  if (!res.ok) {
    throw new Error("Error al obtener reporte");
  }

  return await res.json();
};