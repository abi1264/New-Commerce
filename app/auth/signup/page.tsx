'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Router } from 'lucide-react';
import { Role } from '@/role/Role';
type SignupErrors = {
  name?: string;
  email?: string;
  phoneNo?: string;
  whatsApp?: string;
  address?: string;
  role?: string;
  password?: string;
  confirmPassword?: string;
};

type SignUpForm = {
  name: string;
  email: string;
  phoneNo: string;
  whatsApp: string;
  address: string;
  role: Role;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState<SignUpForm>({
    name: '',
    email: '',
    phoneNo: '',
    whatsApp: '',
    address: '',
    role: Role.CUSTOMER,
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<SignupErrors>({
    name: '',
    email: '',
    phoneNo: '',
    whatsApp: '',
    address: '',
    role: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();
  useEffect(() => {
    validateForm(form);
  }, [form, formSubmitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    const isValid = Object.values(errors).every((val) => val === undefined);
    console.log(isValid);
    if (!isValid) return;
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phoneNo: form.phoneNo,
          whatsApp: form.whatsApp,
          address: form.address,
          role: form.role,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });
      if (response.ok) {
        setMessage('You have successfully SignedUp');
        alert('SignUp Succcessful !');
        router.push('/auth/login');
      }
    } catch (error) {
      setMessage('Failed to SignUp');
      alert('Failed to Create User');
    }
  };

  //FORM VALIDATION
  const validateForm = ({
    name,
    email,
    phoneNo,
    whatsApp,
    address,
    role,
    password,
    confirmPassword,
  }: SignUpForm) => {
    if (!formSubmitted) return;
    //Name
    if (name.length < 5) {
      setErrors((prev) => ({
        ...prev,
        name: 'Name must be at least 5 characters',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        name: undefined,
      }));
    }

    // EMAIL
    if (!email.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: 'Email is required',
      }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: undefined,
      }));
    }

    //Phonenumber
    // PHONE
    if (!phoneNo.trim()) {
      setErrors((prev) => ({
        ...prev,
        phone: 'Phone number is required',
      }));
    } else if (!/^9[678]\d{8}$/.test(phoneNo)) {
      setErrors((prev) => ({
        ...prev,
        phone: 'Please enter a valid phone number',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        phone: undefined,
      }));
    }

    //Whatsapp
    if (!whatsApp.trim()) {
      setErrors((prev) => ({
        ...prev,
        whatsApp: 'WhatsApp number is required',
      }));
    } else if (!/^9[678]\d{8}$/.test(phoneNo)) {
      setErrors((prev) => ({
        ...prev,
        whatsApp: 'Please enter a valid phone number',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        whatsApp: undefined,
      }));
    }

    //Address
    if (!address.trim()) {
      setErrors((prev) => ({
        ...prev,
        address: 'Address cannot be empty',
      }));
    } else if (address.length < 5) {
      setErrors((prev) => ({
        ...prev,
        address: 'Address must be at least 5 characters',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        address: undefined,
      }));
    }

    //role
    if (!role) {
      setErrors((prev) => ({
        ...prev,
        role: 'Please select a role',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        role: undefined,
      }));
    }

    //Password
    if (!password.trim()) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password cannot be empty',
      }));
    } else if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password must be at least 8 characters',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: undefined,
      }));
    }

    //CONFIRM PASSWORD
    if (!confirmPassword.trim()) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Please confirm your password',
      }));
    } else if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: undefined,
      }));
    }
  };

  return (
    <div className="justify-center flex items-center h-screen bg-blue-200">
      <div className="bg-white p-6 w-100 rounded-xl shadow-lg h-150">
        <h2 className="font-bold text-center mb-5 text-2xl">Signup</h2>
        <form onSubmit={handleSubmit} className="mt-10">
          <input
            type="text"
            placeholder=" Username"
            className="w-full border-2 rounded mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="text"
            placeholder=" Email"
            className="w-full border-2 rounded mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <input
            type="text"
            placeholder=" Phone Number"
            className="w-full border-2 rounded mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                phoneNo: e.target.value,
              })
            }
          />
          {errors.phoneNo && (
            <p className="text-red-500 text-sm">{errors.phoneNo}</p>
          )}

          {/* WhatsApp */}
          <input
            type="text"
            placeholder="WhatsApp Number"
            className="w-full border-2 rounded mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                whatsApp: e.target.value,
              })
            }
          />

          {errors.whatsApp && (
            <p className="text-red-500 text-sm">{errors.whatsApp}</p>
          )}

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            className="w-full border-2 rounded mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
          />

          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}

          {/* Role */}
          <div className="mb-4">
            <p className="mb-2">Role</p>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value={Role.CUSTOMER}
                  checked={form.role === Role.CUSTOMER}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value as Role,
                    })
                  }
                />
                Customer
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value={Role.SELLER}
                  checked={form.role === Role.SELLER}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value as Role,
                    })
                  }
                />
                Seller
              </label>
            </div>

            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder=" Password "
              className="w-full border-2 rounded mb-4"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
            <button
              className="absolute right-2 top-1.5"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password "
              className="w-full border-2 rounded mb-4"
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button
              className="absolute right-2 top-1.5"
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          <button className="bg-blue-600 text-white rounded-md px-4 py-2 w-full hover:bg-blue-900 transition duration-300">
            Signup
          </button>
          <p className="text-center font-semibold mt-3 ">
            Already Account ?{' '}
            <Link
              href="/auth/login"
              className="text-blue-500 hover:text-blue-800"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
