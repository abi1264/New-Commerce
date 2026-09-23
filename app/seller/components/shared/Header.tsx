'use client';

import Link from 'next/link';
import { UserRound } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 bg-white shadow flex items-center justify-between px-6 sticky-top-0">
      <h1 className="text-xl font-bold text-blue-600">Mero Bazar</h1>

      <nav className="flex gap-6">
        <Link
          href="/seller/profile"
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-transform duration-200"
        >
          <div className="flex gap-3 justify-center items-center">
            <p className="font-bold"> Profile </p>
            <UserRound size={20} />
          </div>
        </Link>
      </nav>
    </header>
  );
}
