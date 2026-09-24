'use client';
import Link from 'next/link';
import { Button } from '@/app/customer/components/UI/Button';
import { useEffect, useState } from 'react';
import { Dialog } from '@/app/customer/components/UI/dialog';
import { ArrowRight } from 'lucide-react';
// import { apiFetch } from "@/lib/fetch";

type Category = {
  id: number;
  name: string;
  description: string;
};

export function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  function handleAddItems(categoryId: number) {
    console.log('yo category maa items add garna bakii ');
  }

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/category', {
          credentials: 'include',
        });
        if (response.ok) {
          const data: Category[] = await response.json();
          setCategories(data);
        }
      } catch {
        console.error('failed to fetch category');
      }
    };
    loadCategories();
  }, []);

  return (
    <>
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
              onClick={() => handleAddItems(category.id)}
            >
              <p className="text-white"> Add Items</p>
              <ArrowRight size={20} className="text-white" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
