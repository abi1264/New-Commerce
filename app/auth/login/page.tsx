'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { Role } from '@/role/Role';

type LoginForm = {
  whatsApp: string;
  password: string;
};

type LoginErrors = {
  whatsApp?: string;
  password?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    whatsApp: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginErrors>({
    whatsApp: undefined,
    password: undefined,
  });

  useEffect(() => {
    validateForm(form);
  }, [form, formSubmitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    const isValid = Object.values(errors).every((val) => val === undefined);
    if (!isValid) return;

    const loginData = await login(form.whatsApp, form.password);

    setLoginError('');

    if (loginData?.role === Role.CUSTOMER) {
      router.push('/customer/dashboard');
    }
    if (loginData?.role === Role.SELLER) {
      router.push('/seller/dashboard');
    }
    if (loginData?.role === Role.ADMIN) {
      router.push('/admin/dashboard');
    }
  };

  //FORM VALIDATION
  const validateForm = ({ whatsApp, password }: LoginForm) => {
    if (!formSubmitted) return;
    // EMAIL
    if (!whatsApp.trim()) {
      setErrors((prev) => ({
        ...prev,
        whatsApp: 'WhatsApp is required',
      }));
    } else if (whatsApp.length < 10) {
      setErrors((prev) => ({
        ...prev,
        whatsApp: 'Please enter a valid WhatsApp Number',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        whatsApp: undefined,
      }));
    }

    //PASSWORD
    if (!password.trim()) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password cannot be empty',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: undefined,
      }));
    }
  };
  return (
    <>
      <div className="justify-center flex items-center h-screen bg-blue-200">
        <div className="bg-white w-80 p-6 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <h2 className="font-bold text-center mb-5 text-2xl">Login</h2>
            <input
              type="text"
              placeholder=" WhatsApp Number "
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

            <button className="bg-blue-600 text-white rounded-md px-4 py-2 w-full hover:bg-blue-900 transition duration-300">
              Login
            </button>
            <p className="text-center font-semibold mt-4">
              Create new account ? {'  '}
              <Link
                href="/auth/signup"
                className="text-blue-500 hover:text-blue-800"
              >
                Signup
              </Link>
            </p>
            {loginError && (
              <p className="text-center text-red-600">{loginError}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
