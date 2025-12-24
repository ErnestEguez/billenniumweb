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

    // ✅ CORRECCIÓN: empresas es un array → accede a [0]
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Billennium</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}