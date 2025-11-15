"use client";
import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";

type AuthProps = {
  username: string;
  password: string;
}

interface AuthContextType {
  formData: AuthProps | null;
  setFormData: (value: AuthProps) => void;
  clearFormData: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
