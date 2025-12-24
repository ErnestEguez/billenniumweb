// src/components/layout/SidebarAdmin.tsx
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Building, Users, Package, FileText, CreditCard, Banknote } from 'lucide-react';

export default function SidebarAdmin() {
  const location = useLocation();
  const menu = [
    { name: 'Empresas', path: '/admin/empresas', icon: Building },
    { name: 'Vendedores', path: '/admin/vendedores', icon: Users },
    { name: 'Clientes', path: '/admin/clientes', icon: Users },
    { name: 'Artículos', path: '/admin/articulos', icon: Package },
    { name: 'Pedidos/Proformas', path: '/admin/documentos', icon: FileText },
    { name: 'Cartera', path: '/admin/cartera', icon: CreditCard },
    { name: 'Bancos', path: '/admin/bancos', icon: Banknote },
  ];

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/';
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Billennium Admin</h1>
      </div>
      <nav className="mt-4">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 ${
                location.pathname === item.path
                  ? 'bg-blue-600 border-r-4 border-white'
                  : 'hover:bg-gray-700'
              }`}
            >
              <Icon className="mr-3" size={18} />
              {item.name}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 w-full text-left hover:bg-gray-700 mt-auto"
        >
          <LogOut className="mr-3" size={18} />
          Salir
        </button>
      </nav>
    </div>
  );
}