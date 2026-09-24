'use client';

import Link from 'next/link';
import { Grid2x2, Heart, ShoppingBag, ShoppingCart } from 'lucide-react';
import SearchBar from '../UI/Searchbar';

export default function Header() {
  return (
    <header className="border bg-white shadow flex items-center justify-between p-6 sticky-top-0">
      <div className="flex gap-5">
        <div className="flex gap-3">
          <ShoppingBag size={30} className="text-blue-600 rounded-md " />
          <h1 className="text-black font-bold sm:text-md md:text-xl lg:text-3xl">
            Mero
            <span className="sm:text-md md:text-xl lg:text-3xl font-bold text-blue-600">
              {' '}
              Bazar
            </span>
          </h1>
        </div>
        <div className="flex gap-1 p-2 font-bold bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-transform duration-200 items-center">
          <Grid2x2 size={30} />
          <Link className="flex gap-1 items-center" href="/customer/category">
            Categories
          </Link>
        </div>
        <div className="">
          <SearchBar />
        </div>
      </div>

      <nav className="flex gap-5 border ">
        <Link
          className=" flex gap-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-transform duration-200 items-center max-h-20"
          href="/customer/cart"
        >
          <span className=""> Cart</span>
          <ShoppingCart />
        </Link>

        <Link
          href="/customer/profile"
          className="flex bg-blue-500 p-2 text-white rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-transform duration-200 items-center max-h-12"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}
