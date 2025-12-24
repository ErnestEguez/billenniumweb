// src/types/index.ts
export type Usuario = {
  usven_id: number;
  usven_id_empresa: number;
  usven_nombre: string;
  usven_contrasena: string; // visible solo para admin
  usven_correo: string;
  usven_tipo_usuario: 1 | 2; // 1=admin, 2=vendedor
  emp_nombre: string;
};

export type Empresa = {
  emp_id: number;
  emp_nombre: string;
  emp_ruc_empresa: string;
  emp_sec_pedidos: number;
  emp_sec_proformas: number;
  emp_tasa_ut_minima: number;
  emp_cambiaprecio: boolean;
  emp_activadesct: boolean;
};