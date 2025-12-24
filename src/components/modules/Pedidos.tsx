// src/components/modules/Proformas.tsx
import { useState } from 'react';
import { Package, Search, Plus, Send } from 'lucide-react';

export default function Proformas() {
 
  const [proforma, setProforma] = useState({
    cliente: '',
    formaPago: '',
    comentarios: '',
    items: [] as any[],
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nueva Proforma</h1>
      
      {/* Sección de cliente */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Cliente</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar por RUC o nombre"
            className="flex-1 p-2 border rounded"
          />
          <button className="bg-blue-600 text-white p-2 rounded">
            <Search size={18} />
          </button>
          <button className="bg-green-600 text-white p-2 rounded">
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Sección de productos */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Productos</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Código</th>
                <th className="p-2">Descripción</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Total</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="text-center py-4">
                  <Package className="mx-auto text-gray-400" size={32} />
                  <p className="mt-2">Agrega productos a la proforma</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Totales y acciones */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between mb-4">
          <div>
            <label className="block mb-1">Forma de pago</label>
            <input
              type="text"
              className="p-2 border rounded w-64"
              value={proforma.formaPago}
              onChange={(e) => setProforma({ ...proforma, formaPago: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1">Comentarios</label>
            <input
              type="text"
              className="p-2 border rounded w-64"
              value={proforma.comentarios}
              onChange={(e) => setProforma({ ...proforma, comentarios: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Guardar</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
            <Send size={18} className="mr-2" />
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}