'use client';

import Link from 'next/link';
import { Grid2x2, Heart, ShoppingBag, ShoppingCart } from 'lucide-react';
import SearchBar from '../UI/Searchbar';

export default function Header() {
  return (
    <header className="h-20 bg-white shadow flex items-center justify-between px-6 sticky-top-0">
      <div className="flex gap-5">
        <div className="flex gap-3">
          <ShoppingBag size={30} className="text-blue-600 rounded-md " />
          <h1 className="text-black font-bold text-3xl">
            Mero<span className="text-3xl font-bold text-blue-600"> Bazar</span>
          </h1>
        </div>
        <div className="flex gap-1 p-2 font-bold bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-transform duration-200 items-center">
          <Grid2x2 size={30} />
          <Link className="flex gap-1 items-center" href="/customer/category">
            Categories
          </Link>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>

      <nav className="flex gap-6">
        <div className="flex flex-col  items-center">
          <div className="flex gap-2  items-center hover:scale-110  transition-transform duration-400">
            <p className="p-1 text-blue-600 text-shadow-blue-600 -lg hover:text-blue-700 hover:scale-110  transition-transform duration-400">
              Want to place items for sell ?{' '}
            </p>
            <Heart size={30} fill="red" color="red" className="text-white" />
          </div>
          <Link
            href="/auth/signup"
            className="p-1  text-blue-500 text-shadow-blue-600 -lg hover:text-blue-800 hover:scale-110 hover:underline transition-transform duration-400"
          >
            - Click here to create a seller account
          </Link>
        </div>

        <Link
          className="flex gap-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-transform duration-200 items-center"
          href="/customer/cart"
        >
          Cart
          <ShoppingCart />
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
