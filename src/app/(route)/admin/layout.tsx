"use client";

import Sidebar from "./sidebar";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />

      {children}
    </div>
  );
}
