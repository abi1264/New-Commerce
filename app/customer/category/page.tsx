'use client';

import { useEffect, useState } from 'react';
import { Button } from '../components/UI/Button';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

type Category = {
  id: number;
  name: string;
  description: string;
};

export default function CustomerCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:3000/category', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error);
      });
  }, []);

  function handleViewItems(categoryId: number) {
    router.push(`/customer/category/${categoryId}`);
  }

  return (
    <section>
      <div className="flex flex-col gap-2 mt-7 mb-8">
        <span className="text-5xl text-black font-bold">
          Browse Everything on
          <span className="text-5xl text-blue-700 font-bold"> Mero Bazar </span>
        </span>
        <p className="line-clamp-2 text-text-ash text-md ">
          Choose a verified category to explore certified sellers, trending
          electornics, everyday groceries, fashion staples and home essentials
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border  border-gray-300 rounded-lg p-6 flex flex-col gap-3 transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div className="bg-pink-200 rounded-md h-30 flex flex-col  ">
              Abishek
            </div>
            <div className="flex gap-3 flex-col h-30 ">
              <p className="text-xl font-bold ">{category.name}</p>
              <p className="text-md text-text-ash">{category.description}</p>
            </div>

            <button
              className="flex gap-2 items-center justify-center font-bold bg-blue-600 rounded-md p-2 hover:cursor-pointer hover:bg-blue-800"
              onClick={() => handleViewItems(category.id)}
            >
              <p className="text-white"> Explore {category.name}</p>
              <ArrowRight size={20} className="text-white" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
