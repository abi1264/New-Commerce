'use client';
import Link from 'next/link';
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
      <div className="w-full overflow-x-auto rounded-xl border border-gray-300 bg-white shadow-sm">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-pink-300 border-b">
            <tr>
              <th className=" px-6 py-4 text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className=" px-6 py-4 text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className=" px-6 py-4 text-sm font-semibold text-gray-600">
                Description
              </th>
              <th className=" px-6 py-4 text-sm font-semibold text-gray-600">
                Price
              </th>
              <th className=" px-6 py-4 text-sm font-semibold text-gray-600">
                Discount
              </th>
              <th className=" px-6 py-4 text-sm font-semibold text-gray-600">
                Quantity
              </th>
              <th className=" px-6 py-4 text-sm font-semibold text-gray-600">
                Availability
              </th>

              <th className=" px-6 py-4 text-sm font-semibold text-gray-600">
                Category
              </th>
              <th className=" px-6 py-4 text-sm font-semibold text-gray-600">
                Image
              </th>
              <th className=" px-6 py-4 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {item.map((i) => (
              <tr
                key={i.id}
                className="hover:bg-gray-50 transition font-semibold"
              >
                <td className="px-6 py-4 text-text-ash">{i.id}</td>
                <td className="px-6 py-4 text-text-ash">{i.name}</td>
                <td className="px-6 py-4">{i.description}</td>
                <td className="px-6 py-4">{i.price}</td>
                <td className="px-6 py-4">{i.discount}</td>
                <td className="px-6 py-4">{i.quantity}</td>

                <td className="px-6 py-4">{i.isActive ? 'Yes' : 'No'}</td>

                <td className="px-6 py-4">{i.categoryId}</td>

                <td className="px-6 py-4">
                  <img
                    src={i.imageUrl}
                    alt={i.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/item/edit/${i.id}`}>
                      <ButtonOther
                        title="Edit"
                        icon={<Pencil size={20} />}
                        className="bg-blue-500 text-white hover:text-edit"
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
      </div>
    </>
  );
}
