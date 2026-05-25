import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Logeado from "./Logeado";
import AdminUsuarios from "./pages/AdminUsuarios";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import DashboardActividad from "./pages/DashboardActividad";
import "./App.css";

function RutaAdmin({ children }) {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (rol !== "ADMINISTRADOR") {
    return <Navigate to="/logeado" replace />;
  }

  return children;
}

function RutaProtegida({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/logeado"
          element={
            <RutaProtegida>
              <Logeado />
            </RutaProtegida>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/actividad"
          element={
            <RutaProtegida>
              <DashboardActividad />
            </RutaProtegida>
          }
        />

        <Route
          path="/admin"
          element={
            <RutaAdmin>
              <AdminUsuarios />
            </RutaAdmin>
          }
        />

        <Route
          path="/admin/registrar"
          element={
            <RutaAdmin>
              <RegistrarUsuario />
            </RutaAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;