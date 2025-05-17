import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/Dashboard"
import MedicamentosPage from "./pages/MedicamentosPage"
import UsuariosPage from "./pages/UsuariosPage"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import ModeradorRoute from "./components/ModeradorRoute"
import RevisarMedicamentosPage from "./pages/RevisarMedicamentosPage"

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/medicamentos"
              element={
                <ProtectedRoute>
                  <MedicamentosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <AdminRoute>
                  <UsuariosPage />
                </AdminRoute>
              }
            />
            <Route
              path="/revisar-medicamentos"
              element={
                <ModeradorRoute>
                  <RevisarMedicamentosPage />
                </ModeradorRoute>
              }
            />



            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
