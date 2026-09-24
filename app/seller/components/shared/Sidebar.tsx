'use client';

import { Folder } from 'lucide-react';
import Link from 'next/link';

export default function SideBar() {
  return (
    <aside className="w-60 min-h-screen bg-blue-500 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Mero Bazar</h2>
      </div>

      <nav className="flex flex-col gap-2 px-4">
        <Link
          href="/seller/dashboard"
          className="p-3 rounded hover:bg-blue-600"
        >
          Dashboard
        </Link>

        <Link href="/seller/category" className="p-3 rounded hover:bg-blue-600">
          Available Categories
        </Link>

        <div className="flex gap-2 items-center justify-center border">
          <Folder size={20} className="text-white" />
          <Link href="/seller/item" className="p-3 rounded hover:bg-blue-600">
            My Items
          </Link>
        </div>
      </nav>
    </aside>
  );
}
