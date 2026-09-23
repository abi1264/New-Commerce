'use client';
import Link from 'next/link';
import { Button } from '@/app/customer/components/UI/Button';
import { useEffect, useState } from 'react';
import { Dialog } from '@/app/customer/components/UI/dialog';
// import { apiFetch } from "@/lib/fetch";

type Category = {
  id: number;
  name: string;
  description: string;
};

export function CategoryTable() {
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/category', {
          credentials: 'include',
        });
        if (response.ok) {
          const data: Category[] = await response.json();
          setCategory(data);
        }
      } catch {
        console.error('failed to fetch category');
      }
    };
    loadCategories();
  }, []);

  return (
    <>
      <table className="w-full border-3 border-black">
        <thead>
          <tr>
            <th className=" border-black p-2 border-3">ID</th>
            <th className=" border-black p-2 border-3">Name</th>
            <th className=" border-black p-2 border-3">Description</th>
          </tr>
        </thead>
        <tbody>
          {category.map((c) => (
            <tr key={c.id}>
              <td className="border-3 border-black p-2">{c.id}</td>
              <td className="border-3 border-black p-2">{c.name}</td>
              <td className="border-3 border-black p-2">{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
