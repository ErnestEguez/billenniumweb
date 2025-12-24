// src/components/layout/LayoutAdmin.tsx
import { ReactNode } from 'react';
import SidebarAdmin from './SidebarAdmin';

export default function LayoutAdmin({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <div className="w-64">
        <SidebarAdmin />
      </div>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}