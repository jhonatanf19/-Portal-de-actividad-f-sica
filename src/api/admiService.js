const API_URL = "https://backend-spring-security-788d.onrender.com";

// Registrar usuario o administrador
export async function registrarUsuario(email, password, rol) {
  const response = await fetch(`${API_URL}/api/usuarios/registrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, rol }),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text;
}

// Listar todos los usuarios
export async function listarUsuarios() {
  const response = await fetch(`${API_URL}/listarUsuarios`);

  if (!response.ok) {
    throw new Error("Error al obtener la lista de usuarios");
  }

  return response.json();
}

// Desbloquear usuario por ID
export async function desbloquearUsuario(id) {
  const response = await fetch(`${API_URL}/desbloquear/${id}`, {
    method: "PUT"
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text;
}