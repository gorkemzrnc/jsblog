import { createContext, ReactNode } from "react";
import { User } from "../types";

export interface AuthContextProps {
  user: User | undefined;
  isLoading: boolean;
  error: string | unknown;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface ContextProviderProps {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);