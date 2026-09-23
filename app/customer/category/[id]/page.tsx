'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '../../components/UI/Button';

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isActive: boolean;
  discount: string;
  quantity: number;
  categoryId: number;
  userId: number;
  user: User;
};

type User = {
  id: number;
  name: string;
  whatsApp: string;
};

export default function CategoryItemsPage() {
  function handleClick(whatsApp: string) {
    window.open(`https://wa.me/${whatsApp}`, '_blank');
  }

  const [loadingItems, setLoadingItems] = useState(true);
  const params = useParams();

  const categoryId = params.id;

  const [items, setItems] = useState<Item[]>([]);
  console.log(items);

  const itemWithUser = items.map((item) => ({
    itemName: item.name,
    userName: item.user?.name,
    whatsApp: item.user?.whatsApp,
  }));

  // Fetch Items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/item/category/${categoryId}`,
          {
            credentials: 'include',
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <section>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Our Marketplace Items
          </h1>

          <p className="text-gray-500 mt-1">Choose your favorite food</p>
        </div>

        {loadingItems ? (
          <p>Loading items...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">No items available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items
              // .filter((item) => item.isActive)
              .map((item) => (
                <div
                  className="border  border-gray-300 rounded-lg p-6 flex flex-col gap-2 transition-transform duration-300 ease-in-out hover:scale-105"
                  key={item.id}
                >
                  {/* Item Image */}

                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />

                  {/* Item Details */}

                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg font-bold ">{item.price}</p>
                    <p className="text-md ">Discount: {item.discount} </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Owner:{item?.user?.name}</p>
                    <p>Available Quantity: {item.quantity}</p>
                    <Button
                      title="Contact Seller"
                      onClick={() => handleClick(item?.user?.whatsApp)}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </main>
  );
}
