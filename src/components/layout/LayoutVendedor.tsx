// src/components/layout/LayoutVendedor.tsx
import { ReactNode } from 'react';
import SidebarVendedor from './SidebarVendedor';

export default function LayoutVendedor({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <div className="w-64">
        <SidebarVendedor />
      </div>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}