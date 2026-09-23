'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 bg-white shadow flex items-center justify-between px-6 sticky-top-0">
      <h1 className="text-xl font-bold text-blue-600">Mero Bazar</h1>

      <nav className="flex gap-6">
        <Link
          href="/admin/profile"
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-transform duration-200"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}
