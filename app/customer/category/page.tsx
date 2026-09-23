'use client';

import { useEffect, useState } from 'react';
import { Button } from '../components/UI/Button';
import { useRouter } from 'next/navigation';

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
    <div className="p-6">
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Food Categories</h1>

        <p className="text-gray-500 mt-2">
          Choose a category to explore our menu
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-md p-6 
                       hover:shadow-xl hover:-translate-y-1 
                       transition-all duration-300 cursor-pointer"
          >
            {/* Category Icon */}
            <div
              className="w-14 h-14 bg-blue-100 rounded-full 
                            flex items-center justify-center mb-4"
            >
              <div className="">Image</div>
            </div>

            {/* Category Name */}
            <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>

            {/* Description */}
            <p className="text-gray-500 mt-2 text-sm">{category.description}</p>

            {/* Button */}
            <Button
              title="View Items"
              className="mt-5 w-full bg-blue-500 text-white 
                         py-2 rounded-lg hover:bg-blue-600 
                         transition-colors"

              onClick={(e) => handleViewItems(category.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
