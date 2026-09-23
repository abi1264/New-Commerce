'use client';
import { Button } from '../../components/UI/Button';

import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

type CreateUserFormType = {
  name: string;
  email: string;
  address: string;
  whatsApp: string;
  password: string;
  phoneNo: string;
  role: Role;
};

enum Role {
  CUSTOMER = 'Customer',
  SELLER = 'Seller',
}

export default function CreateUser() {
  const router = useRouter();
  const [formSubmitted, setformSubmitted] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState<CreateUserFormType>({
    name: '',
    email: '',
    address: '',
    whatsApp: '',
    password: '',
    phoneNo: '',
    role: Role.CUSTOMER,
  });

  const [showPassword, setShowPassword] = useState(false);

  //validation states
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    address?: string;
    role?: Role;
    whatsApp?: string;
    password?: string;
    phoneNo?: string;
  }>({
    name: undefined,
    email: undefined,
    address: undefined,
    role: undefined,
    whatsApp: undefined,
    password: undefined,
    phoneNo: undefined,
  });

  //validation function
  const validateForm = ({
    name,
    email,
    address,
    role,
    whatsApp,
    password,
    phoneNo,
  }: CreateUserFormType) => {
    if (!formSubmitted) return;

    if (name.length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: 'Name must be at least 2 characters',
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
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          address: form.address,
          role: form.role,
          whatsApp: form.whatsApp,
          phoneNo: form.phoneNo,
        }),
      });
      if (response.ok) {
        setMessage('User Created Successfully');
        alert('User Created Successfully');
        setformSubmitted(true);
        router.push('/admin/user');
      }
    } catch (error: unknown) {
      setMessage('Failed to create User');
      alert('Failed to Create User');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-center font-extrabold">Create User</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Username"
                className="border-2 border-black rounded-md px-3 py-3 "
                value={form.name}
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
                type="email"
                name="email"
                placeholder="Email eg:abc@gmail.com "
                className="border-2 border-black rounded-md px-3 py-3 "
                value={form.email}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="border-2 border-black rounded-md px-3 py-3"
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
              <button
                className="absolute right-2 top-4"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="border-2 border-black rounded-md px-3 py-3 "
                value={form.phoneNo}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    phoneNo: e.target.value,
                  }));
                }}
              />
            </div>

            <div>
              <input
                type="text"
                name="whatsApp"
                placeholder="WhatsApp Number"
                className="border-2 border-black rounded-md px-3 py-3 "
                value={form.whatsApp}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    whatsApp: e.target.value,
                  }));
                }}
              />
            </div>

            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="border-2 border-black rounded-md px-3 py-3 "
                value={form.address}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }));
                }}
              />
            </div>

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
