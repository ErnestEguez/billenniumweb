// src/components/layout/SidebarVendedor.tsx
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function SidebarVendedor() {
  const location = useLocation();
  const menu = [
    { name: 'Proformas', path: '/vendedor/proformas' },
    { name: 'Pedidos', path: '/vendedor/pedidos' },
    { name: 'Consulta General', path: '/vendedor/consulta' },
    { name: 'Cartera', path: '/vendedor/cartera' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/';
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Billennium</h1>
      </div>
      <nav className="mt-4">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 ${
              location.pathname === item.path
                ? 'bg-blue-600 border-r-4 border-white'
                : 'hover:bg-gray-700'
            }`}
          >
            {item.name}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 w-full text-left hover:bg-gray-700 mt-auto"
        >
          <LogOut className="mr-2" size={18} />
          Salir
        </button>
      </nav>
    </div>
  );
}