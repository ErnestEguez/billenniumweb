// src/components/auth/LoginForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data, error: authError } = await supabase
      .from('vendedores')
      .select('usven_id, usven_id_empresa, usven_nombre, usven_tipo_usuario, usven_status, empresas(emp_nombre)')
      .eq('usven_correo', email)
      .eq('usven_contrasena', password)
      .eq('usven_status', true)
      .single();

    if (authError || !data) {
      setError('Usuario o contraseña incorrectos');
      return;
    }

    const emp_nombre = data.empresas?.[0]?.emp_nombre || 'Empresa';

    const usuario = {
      usven_id: data.usven_id,
      usven_id_empresa: data.usven_id_empresa,
      usven_nombre: data.usven_nombre,
      usven_tipo_usuario: data.usven_tipo_usuario,
      emp_nombre,
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    navigate(usuario.usven_tipo_usuario === 1 ? '/admin/empresas' : '/vendedor/proformas');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Billennium Logo"
            className="w-24 h-24 rounded-full border-4 border-green-500"
          />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Sistema auxiliar de administración de Billennium ERP en la nube
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">Inicia sesión para continuar</p>

        {/* Error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}