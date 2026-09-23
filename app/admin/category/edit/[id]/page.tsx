'use client';
import { useParams } from 'next/navigation';
import { Button } from '@/app/customer/components/UI/Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type EditCategoryFormType = {
  name: string;
  description: string;
};

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  console.log(params.id);
  const id = params.id; //getting id from parameter url
  const [form, setForm] = useState<EditCategoryFormType>({
    name: '',
    description: '',
  });

  const [formSubmitted, setFormSubmitted] = useState('');

  const [message, setMessage] = useState('');

  //fetching the data of the category which exists already
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(`http://localhost:3000/category/${id}`, {
        credentials: 'include',
      });
      if (res.ok) {
        const currentCategory = await res.json();
        setForm({
          ...form,
          name: currentCategory.name,
          description: currentCategory.description,
        });
      } else {
        console.log('failed to failed the selected user data');
      }
    };
    fetchCategory();
  }, [id]);

  //validation states
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({
    name: undefined,
    description: undefined,
  });

  //validation function
  const validateForm = ({ name, description }: EditCategoryFormType) => {
    if (!formSubmitted) return;

    if (name.length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: 'Name must be at least 2 characters',
      }));

      //do similarly for description
    }
  };

  useEffect(() => {
    validateForm(form);
  }, [form]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    //UPdating the data
    const response = await fetch(`http://localhost:3000/category/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: form.name,
        description: form.description,
      }),
    });
    try {
      if (response.ok) {
        setMessage('Category Updated Successfully');
        alert('Category Updated Successfully');
        router.push('/admin/category');
      }
    } catch (error: unknown) {
      setMessage('Failed to Update Category');
      alert('Failed to Update Category');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-center font-extrabold">
          Update Category Information
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div>
              <input
                value={form.name}
                type="text"
                name="name"
                placeholder="Category Name"
                className="border-2 border-black rounded-md px-3 py-3 "
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
            </div>

            <div>
              <input
                value={form.description}
                type="text"
                name="description"
                placeholder="Description"
                className="border-2 border-black rounded-md px-3 py-3"
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            </div>

            <Button
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
