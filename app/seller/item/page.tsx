'use client';

import { Button } from '@/app/customer/components/UI/Button';
import { useRouter } from 'next/navigation';
import { ItemTable } from './itemTable';
import { SquarePlus } from 'lucide-react';

export default function ItemPage() {
  const router = useRouter();

  function handleAddItem() {
    console.log(' Add Item Button clicked');
    router.push('/admin/item/create');
  }
  return (
    <div className="flex flex-col m-8 gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold uppercase">Items</h1>
          <p className="text-sm">Items Management Page</p>
        </div>
        <Button
          title="Add Item"
          onClick={() => handleAddItem()}
          icon={<SquarePlus size={20} />}
          className="bg-blue-500 text-white rounded-md h-full"
        />
      </div>
      <ItemTable />
    </div>
  );
}
