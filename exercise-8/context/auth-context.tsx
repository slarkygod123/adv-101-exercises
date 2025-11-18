"use client"
import { ReactNode, createContext, useContext, useState } from "react";

type AuthProps = {
    user_id: number;
    username: string;
};

interface AuthContextProps {
    formData: AuthProps | null;
    setFormData: (data: AuthProps) => void;
    clearFormData: () => void;  
} 

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [ formData, setFormData ] = useState<AuthProps | null>( null);
  const clearFormData = () => setFormData(null);

  return (
    <AuthContext.Provider value={{ formData, setFormData, clearFormData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context) throw new Error("useAuth must be used within the AuthProvider");

  return context;
}