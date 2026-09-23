'use client';
import { Button } from '@/app/customer/components/UI/Button';

import React, { useState, useEffect } from 'react';

import { getImageFile } from '@/app/lib/cloudinary';

type Category = {
  id: number;
  name: string;
};

enum Availability {
  YES = 'Yes',
  NO = 'No',
}

type CreateItemFormType = {
  name: string;
  description: string;
  price: string;
  isActive: Availability | '';
  categoryId: string;
  quantity: string;
  discount: string;
};

export default function CreateCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Form Data Handling
  const [form, setForm] = useState<CreateItemFormType>({
    name: '',
    description: '',
    price: '',
    isActive: Availability.YES,
    categoryId: '',
    quantity: '',
    discount: '',
  });
  console.log(typeof form.isActive);

  // validation states
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    imageUrl?: string;
    price?: string;
    isActive?: string;
    categoryId?: string;
    quantity?: string;
    discount?: string;
  }>({
    name: undefined,
    description: undefined,
    imageUrl: undefined,
    price: undefined,
    isActive: undefined,
    categoryId: undefined,
    quantity: undefined,
    discount: undefined,
  });

  //fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetch('http://localhost:3000/category', {
        credentials: 'include',
      });
      const allCategories = await data.json();
      setCategories(allCategories);
    };
    getCategories();
  }, []);

  // validation function
  const validateForm = ({
    name,
    description,
    price,
    isActive,
    categoryId,
    quantity,
    discount,
  }: CreateItemFormType) => {
    if (!formSubmitted) return;

    if (name.length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: 'Name must be atleast 2 characters',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        name: undefined,
      }));
    }

    if (description.length < 5) {
      setErrors((prev) => ({
        ...prev,
        description: 'Description must be atleast 5 characters',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        description: undefined,
      }));
    }

    if (Number(price) < 0) {
      setErrors((prev) => ({
        ...prev,
        price: 'price cannot be negative',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        price: undefined,
      }));
    }
    if (Number(quantity) < 0) {
      setErrors((prev) => ({
        ...prev,
        quantity: 'Quantity cannot be negative',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        quantity: undefined,
      }));
    }

    if (discount.length > 20) {
      setErrors((prev) => ({
        ...prev,
        discount: 'Discount status must be at most 20 characters',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        discount: undefined,
      }));
    }

    if (isActive === '') {
      setErrors((prev) => ({
        ...prev,
        isActive: 'Please select availability',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        isActive: undefined,
      }));
    }

    if (!categoryId) {
      setErrors((prev) => ({
        ...prev,
        categoryId: 'Please Select one of the category',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        categoryId: undefined,
      }));
    }

    if (!image) {
      setErrors((prev) => ({
        ...prev,
        imageUrl: 'Please upload an image',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        imageUrl: undefined,
      }));
    }
  };

  useEffect(() => {
    validateForm(form);
  }, [form, formSubmitted]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    const isValid = Object.values(errors).every((val) => val === undefined);
    console.log(isValid);
    if (!isValid) return;
    const imageFile = image;
    try {
      const imageUrl = await getImageFile(imageFile);

      if (!imageUrl) {
        setErrors((prev) => ({ ...prev, imageUrl: 'Failed to upload image' }));
      }

      const response = await fetch('http://localhost:3000/item', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          imageUrl,
          isActive: form.isActive,
          categoryId: Number(form.categoryId),
          quantity: Number(form.quantity),
          discount: form.discount,
          userId: 2,
        }),
      });
      if (response.ok) {
        setMessage('Item Created Successfully');
        alert('Item Created Successfully');
      }
    } catch (error: unknown) {
      setMessage('Failed to create Item');
      alert('Failed to Create Item');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-center font-extrabold">Create Item</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                className="border-2 border-black rounded-md px-3 py-3 "
                value={form.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setForm((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
                className="border-2 border-black rounded-md px-3 py-3"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="border-2 border-black rounded-md px-3 py-3 "
                value={form.price}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-start">Availability Status</label>
              <select
                name="isAvailable"
                value={form.isActive}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    isActive: e.target.value as Availability,
                  }))
                }
                className="rounded-md border-2 border-black px-3 py-3"
              >
                <option value={Availability.YES}>Yes</option>
                <option value={Availability.NO}>No</option>
              </select>
              {errors.isActive && (
                <p className="text-red-500 text-sm">{errors.isActive}</p>
              )}
            </div>

            <div>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="border-2 border-black rounded-md px-3 py-3 "
                value={form.quantity}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="Discount"
                placeholder="Discount Availability"
                className="border-2 border-black rounded-md px-3 py-3 "
                value={form.discount}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    discount: e.target.value,
                  }))
                }
              />
              {errors.discount && (
                <p className="text-red-500 text-sm">{errors.discount}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-start font-bold">Select Category</label>
              <select
                name="caetgoryId"
                className="font-bold w-full h-13 rounded-md border-2 border-black px-3 py-3"
                value={form.categoryId}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                  }))
                }
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm">{errors.categoryId}</p>
              )}
            </div>
            <div>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="border-2 rounded-md h-13"
              />
            </div>
            {errors.imageUrl && (
              <p className="text-red-500 text-sm">{errors.imageUrl}</p>
            )}

            <Button
              onClick={(e) => handleSubmit}
              className="bg-blue-500 text-white font-bold"
              title="Submit"
            />
          </div>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}
