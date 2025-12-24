// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Componentes
import LoginForm from './components/auth/LoginForm';
import LayoutVendedor from './components/layout/LayoutVendedor';
import LayoutAdmin from './components/layout/LayoutAdmin';

// Módulos de Vendedor
const Proformas = () => <div className="p-6">Módulo: Nueva Proforma</div>;
const Pedidos = () => <div className="p-6">Módulo: Pedidos</div>;
const ConsultaGeneral = () => <div className="p-6">Módulo: Consulta General</div>;
const Cartera = () => <div className="p-6">Módulo: Cartera</div>;

// Módulos de Admin
const Empresas = () => <div className="p-6">Módulo: Empresas</div>;
const Vendedores = () => <div className="p-6">Módulo: Vendedores</div>;
const Clientes = () => <div className="p-6">Módulo: Clientes</div>;
const Articulos = () => <div className="p-6">Módulo: Artículos</div>;
const Documentos = () => <div className="p-6">Módulo: Pedidos/Proformas</div>;
const AdminCartera = () => <div className="p-6">Módulo: Cartera (Admin)</div>;
const Bancos = () => <div className="p-6">Módulo: Bancos</div>;

// Ruta protegida
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('usuario');
    if (stored) {
      try {
        setUsuario(JSON.parse(stored));
      } catch {
        localStorage.removeItem('usuario');
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }
  if (!usuario) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Ruta por rol
const RoleRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: number[] }) => {
  const usuarioStr = localStorage.getItem('usuario');
  if (!usuarioStr) return <Navigate to="/" replace />;
  
  const usuario = JSON.parse(usuarioStr);
  if (!allowedRoles.includes(usuario.usven_tipo_usuario)) {
    return <Navigate to={usuario.usven_tipo_usuario === 1 ? '/admin/empresas' : '/vendedor/proformas'} replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        {/* Rutas de VENDEDOR */}
        <Route
          path="/vendedor/*"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[2]}>
                <LayoutVendedor>
                  <Routes>
                    <Route index element={<Navigate to="proformas" replace />} />
                    <Route path="proformas" element={<Proformas />} />
                    <Route path="pedidos" element={<Pedidos />} />
                    <Route path="consulta" element={<ConsultaGeneral />} />
                    <Route path="cartera" element={<Cartera />} />
                  </Routes>
                </LayoutVendedor>
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Rutas de ADMIN */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[1]}>
                <LayoutAdmin>
                  <Routes>
                    <Route index element={<Navigate to="empresas" replace />} />
                    <Route path="empresas" element={<Empresas />} />
                    <Route path="vendedores" element={<Vendedores />} />
                    <Route path="clientes" element={<Clientes />} />
                    <Route path="articulos" element={<Articulos />} />
                    <Route path="documentos" element={<Documentos />} />
                    <Route path="cartera" element={<AdminCartera />} />
                    <Route path="bancos" element={<Bancos />} />
                  </Routes>
                </LayoutAdmin>
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}