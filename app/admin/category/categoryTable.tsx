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
  const [showDialog, setShowDialog] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  console.log(selectedCategoryId);
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

  //open dialog
  function handleDeleteClick(id: number) {
    setSelectedCategoryId(id);
    setShowDialog(true);
  }

  //Actually delete the Category
  async function handleDelete() {
    if (selectedCategoryId === null) return;

    try {
      const response = await fetch(
        `http://localhost:3000/category/${selectedCategoryId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );

      if (!response.ok) {
        console.error('Failed to delete category');
        return;
      }

      setCategory((prevCategory) =>
        prevCategory.filter((category) => category.id !== selectedCategoryId),
      );

      setShowDialog(false);
      alert('Category Deleted Successfully!');
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  }

  return (
    <>
      <table className="w-full border-3 border-black">
        <thead>
          <tr>
            <th className=" border-black p-2 border-3">ID</th>
            <th className=" border-black p-2 border-3">Name</th>
            <th className=" border-black p-2 border-3">Description</th>
            <th className=" border-black p-2 border-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.map((c) => (
            <tr key={c.id}>
              <td className="border-3 border-black p-2">{c.id}</td>
              <td className="border-3 border-black p-2">{c.name}</td>
              <td className="border-3 border-black p-2">{c.description}</td>
              <td className="border-3 border-black p-2">
                <div className="flex gap-6">
                  <Link href={`/admin/category/edit/${c.id}`}>
                    <Button title="Edit" className="bg-blue-500 text-white" />
                  </Link>
                  <Button
                    title="Delete"
                    className="bg-red-500 text-white"
                    onClick={() => handleDeleteClick(c.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Dialog
          title="Delete Category"
          description="Are you sure want to delete this category?"
          onConfirm={handleDelete}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      </div>
    </>
  );
}
