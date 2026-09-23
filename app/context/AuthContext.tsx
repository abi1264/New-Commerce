'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Role } from '@/role/Role';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  name: string;
  email?: string;
  role: Role;
  whatsApp?: string;
  phoneNo?: string;
  address?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (whatsApp: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = 'http://localhost:3000';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check current login
  const checkAuth = async (): Promise<User | null> => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        setUser(null);
        return null;
      }
      const data = await response.json();
      setUser(data);
      return data;
    } catch (error) {
      console.log(error);

      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const login = async (
    whatsApp: string,
    password: string,
  ): Promise<User | null> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      credentials: 'include',
      body: JSON.stringify({
        whatsApp,
        password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.message || 'Login failed');
    }

    // Login was successful.
    // The backend has set the JWT cookie.

    const user = await checkAuth();
    return user;
  };

  // LOGOUT
  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
      router.push('/auth/login');
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
    }
  };

  // CHECK LOGIN WHEN APP STARTS

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK//

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
