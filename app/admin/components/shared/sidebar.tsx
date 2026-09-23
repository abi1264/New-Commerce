'use client';

import Link from 'next/link';

export default function SideBar() {
  return (
    <aside className="w-60 min-h-screen bg-blue-500 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Mero Bazar</h2>
      </div>

      <nav className="flex flex-col gap-2 px-4">
        <Link href="/admin/dashboard" className="p-3 rounded hover:bg-blue-600">
          Dashboard
        </Link>

        <Link href="/admin/category" className="p-3 rounded hover:bg-blue-600">
          Categories
        </Link>

        <Link href="/admin/item" className="p-3 rounded hover:bg-blue-600">
          Items
        </Link>

        <Link href="/admin/user" className="p-3 rounded hover:bg-blue-600">
          Users
        </Link>
      </nav>
    </aside>
  );
}
