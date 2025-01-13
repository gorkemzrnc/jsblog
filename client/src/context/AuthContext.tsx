import { createContext, ReactNode, useEffect, useState } from 'react';
import { getUser } from '../lib/api';

export interface UserProps {
  _id: string;
  username: string;
  email: string;
  role: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextProps {
  user: UserProps | null;
  isLoading: boolean;
  error: string | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ContextProviderProps {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider bileşeni
export const AuthProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, setUser, setIsLoading, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
