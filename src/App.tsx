// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import LayoutVendedor from './components/layout/LayoutVendedor';
import LayoutAdmin from './components/layout/LayoutAdmin';

// Tipos
import type { Usuario } from './types';

// Módulos de Vendedor
const Proformas = () => <div className="p-6">Módulo: Nueva Proforma</div>;
const Pedidos = () => <div className="p-6">Módulo: Pedidos</div>;
const ConsultaGeneral = () => <div className="p-6">Módulo: Consulta General de Documentos</div>;
const Cartera = () => <div className="p-6">Módulo: Cartera</div>;

// Módulos de Admin
const Empresas = () => <div className="p-6">Módulo: Empresas</div>;
const Vendedores = () => <div className="p-6">Módulo: Vendedores</div>;
const Clientes = () => <div className="p-6">Módulo: Clientes</div>;
const Articulos = () => <div className="p-6">Módulo: Artículos</div>;
const Documentos = () => <div className="p-6">Módulo: Pedidos/Proformas</div>;
const AdminCartera = () => <div className="p-6">Módulo: Cartera (Admin)</div>;
const Bancos = () => <div className="p-6">Módulo: Bancos</div>;

// Componente para proteger rutas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
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

  if (loading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  if (!usuario) return <Navigate to="/" replace />;
  
  return children;
};

// Componente para verificar rol
const RoleRoute = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles: number[] }) => {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}') as Usuario;
  if (!allowedRoles.includes(usuario.usven_tipo_usuario)) {
    return <Navigate to={usuario.usven_tipo_usuario === 1 ? '/admin/empresas' : '/vendedor/proformas'} replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<LoginForm />} />

        {/* Rutas de Vendedor (rol = 2) */}
        <Route
          path="/vendedor/*"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[2]}>
                <LayoutVendedor />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="proformas" replace />} />
          <Route path="proformas" element={<Proformas />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="consulta" element={<ConsultaGeneral />} />
          <Route path="cartera" element={<Cartera />} />
        </Route>

        {/* Rutas de Admin (rol = 1) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[1]}>
                <LayoutAdmin />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="empresas" replace />} />
          <Route path="empresas" element={<Empresas />} />
          <Route path="vendedores" element={<Vendedores />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="articulos" element={<Articulos />} />
          <Route path="documentos" element={<Documentos />} />
          <Route path="cartera" element={<AdminCartera />} />
          <Route path="bancos" element={<Bancos />} />
        </Route>

        {/* Redirección por defecto */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/vendedor/proformas" replace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}