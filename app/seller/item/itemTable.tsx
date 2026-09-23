'use client';
import Link from 'next/link';
import { Button } from '@/app/customer/components/UI/Button';
import { useEffect, useState } from 'react';
import { Dialog } from '@/app/customer/components/UI/dialog';
import { Pencil, Trash } from 'lucide-react';
import { ButtonOther } from '@/app/components/shared/UI/ButtonOther';
import Image from 'next/image';

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  imageUrl: string;
  categoryId: number;
  quantity: number;
  discount: string;
};
export function ItemTable() {
  const [showDialog, setShowDialog] = useState(false);
  const [item, setItem] = useState<Item[]>([]);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const userId = 2;
  //shoud get userId from authentication
  useEffect(() => {
    fetch(`http://localhost:3000/item/user/${userId}`, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      });
  }, []);

  //open dialog
  function handleDeleteClick(id: number) {
    setSelectedItemId(id);
    setShowDialog(true);
  }

  //Actually delete the item
  async function handleDelete() {
    if (selectedItemId === null) return;
    const response = await fetch(
      `http://localhost:3000/item/${selectedItemId}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      console.error('Failed to delete item');
      return;
    }

    setItem((prevItem) =>
      prevItem.filter((item) => item.id !== selectedItemId),
    );
    setShowDialog(false);
    alert('Item Deleted Successfully !');
  }

  return (
    <>
      <table className="w-full border-3 border-black">
        <thead>
          <tr>
            <th className=" border-black p-2 border-3">ID</th>
            <th className=" border-black p-2 border-3">Name</th>
            <th className=" border-black p-2 border-3">Description</th>
            <th className=" border-black p-2 border-3">Price</th>
            <th className=" border-black p-2 border-3">Discount</th>
            <th className=" border-black p-2 border-3">Quantity</th>
            <th className=" border-black p-2 border-3">Availability</th>

            <th className=" border-black p-2 border-3">Category</th>
            <th className=" border-black p-2 border-3">Image</th>
            <th className=" border-black p-2 border-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {item.map((i) => (
            <tr key={i.id}>
              <td className="border-3 border-black p-2">{i.id}</td>
              <td className="border-3 border-black p-2">{i.name}</td>
              <td className="border-3 border-black p-2">{i.description}</td>
              <td className="border-3 border-black p-2">{i.price}</td>
              <td className="border-3 border-black p-2">{i.discount}</td>
              <td className="border-3 border-black p-2">{i.quantity}</td>

              <td className="border-3 border-black p-2">
                {i.isActive ? 'Yes' : 'No'}
              </td>

              <td className="border-3 border-black p-2">{i.categoryId}</td>

              <td className="border-3 border-black p-2">
                <Image
                  src={i.imageUrl}
                  alt={i.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </td>

              <td className="border-3 border-black p-2">
                <div className="flex gap-2">
                  <Link href={`/admin/item/edit/${i.id}`}>
                    <ButtonOther
                      title="Edit"
                      icon={<Pencil size={20} />}
                      className="bg-blue-500 text-white"
                    />
                  </Link>
                  <ButtonOther
                    title="Delete"
                    icon={<Trash size={20} />}
                    className="bg-red-500 text-white"
                    onClick={() => handleDeleteClick(i.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Dialog
          title="Delete Item"
          description="Are you sure want to delete this Item ?"
          onConfirm={handleDelete}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      </div>
    </>
  );
}
