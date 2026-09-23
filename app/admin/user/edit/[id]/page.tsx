'use client';
import { Button } from '@/app/admin/components/UI/Button';

import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

type EditUserFormType = {
  role: Role;
  isVerified: boolean;
};

enum Role {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
}

export default function EditUser() {
  const router = useRouter();
  const [formSubmitted, setformSubmitted] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState<EditUserFormType>({
    isVerified: false,
    role: Role.CUSTOMER,
  });
  console.log(form.isVerified);
  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:3000/user/${userId}`, {
        credentials: 'include',
      });
      if (res.ok) {
        const currentUser = await res.json();
        setForm({
          ...form,
          isVerified: currentUser.isVerified,
          role: currentUser.role,
        });
      } else {
        console.log('failed to failed the selected user data');
      }
    };
    fetchUser();
  }, [userId]);

  //validation states
  const [errors, setErrors] = useState<{
    role?: Role;
    isVerified?: boolean;
  }>({
    role: undefined,
    isVerified: undefined,
  });

  //validation function
  const validateForm = ({ isVerified, role }: EditUserFormType) => {
    if (!formSubmitted) return;

    if (!role) {
      setErrors((prev) => ({
        ...prev,
        name: 'Role must be choosen',
      }));

      //do similarly for other
    }
  };

  useEffect(() => {
    validateForm(form);
  }, [form]);

  //function

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          isVerified: form.isVerified,
          role: form.role,
        }),
      });
      if (response.ok) {
        setMessage('User updated Successfully');
        alert('User updated Successfully');
        setformSubmitted(true);
        router.push('/admin/user');
      }
    } catch (error: unknown) {
      setMessage('Failed to update User');
      alert('Failed to update User');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-center font-extrabold">Update User By Admin</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block mb-2">Approval Status</label>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="approvalStatus"
                    checked={form.isVerified === true}
                    onChange={() => {
                      setForm((prev) => ({
                        ...prev,
                        isVerified: true,
                      }));
                    }}
                  />
                  Approved
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="approvalStatus"
                    checked={form.isVerified === false}
                    onChange={() => {
                      setForm((prev) => ({
                        ...prev,
                        isVerified: false,
                      }));
                    }}
                  />
                  Not Approved
                </label>
              </div>
            </div>

            <div>
              <div className="flex flex-col">
                <label className="text-start">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      role: e.target.value as Role,
                    }));
                  }}
                  className="w-full rounded-md border-2 border-black px-3 py-3"
                >
                  <option value={Role.CUSTOMER}>Customer</option>
                  <option value={Role.SELLER}>Seller</option>
                </select>
              </div>
            </div>
            <Button
              className="bg-blue-500 text-white font-bold"
              title="submit"
            />
          </div>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}
