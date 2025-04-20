import { useContext, useEffect, useState } from 'react';
import { getUser } from '../lib/api';
import { UNAUTHORIZED } from '../constants/http.mts';
import { TokenRefreshClient } from '../config/apiClient';
import { navigate } from '../lib/navigation';
import { AuthContext, ContextProviderProps } from '../context/AuthContext';
import { User } from '../types/User';

export const AuthProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await getUser();
        setUser(response.data);
      } catch (error: any) {
        console.log(error)
        if (error.response?.status === UNAUTHORIZED) {
          try {
            await TokenRefreshClient.get("/auth/refresh");
            const retryResponse = await getUser();
            setUser(retryResponse.data);
          } catch (retryError) {
            setError(retryError);
            navigate("/login");
          }
        } else {
          setError(error);
        }
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
