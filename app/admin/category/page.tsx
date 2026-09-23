'use client';

import { Button } from '@/app/customer/components/UI/Button';
import { useRouter } from 'next/navigation';
import { CategoryTable } from './categoryTable';

export default function CategoriesPage() {
  const router = useRouter();

  function handleAddCategory() {
    console.log(' Add Category Button clicked');
    router.push('/admin/category/create');
  }
  return (
    <div className="flex flex-col m-8 gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold uppercase">Categories</h1>
          <p className="text-sm">Categories Management Page</p>
        </div>
        <Button
          title="Add Category"
          onClick={() => handleAddCategory()}
          className="bg-blue-500 text-white rounded-md h-full"
        />
      </div>
      <CategoryTable />
    </div>
  );
}
