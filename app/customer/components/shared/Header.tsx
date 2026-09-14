'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-blue-600">Mero Bazar</h1>

      <nav className="flex gap-6">
        <Link
          className="flex gap-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-transform duration-200 items-center"
          href="/customer/cart"
        >
          Cart
          <ShoppingCart />
        </Link>

        <Link
          href="/customer/orders"
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-transform duration-200"
        >
          My Orders
        </Link>

        <Link
          href="/customer/profile"
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-transform duration-200"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}
