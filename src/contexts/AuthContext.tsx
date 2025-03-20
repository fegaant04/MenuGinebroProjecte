import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  curso: string;
}
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    curso: string;
  }) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simular verificación de sesión inicial
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    // Simular llamada a API
    setIsLoading(true);
    try {
      // En una implementación real, esto sería una llamada a tu API
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: '1',
        nombre: 'Marc',
        apellidos: 'García Fernández',
        email,
        curso: '2º ESO'
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (userData: {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    curso: string;
  }) => {
    setIsLoading(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: '1',
        ...userData
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  return <AuthContext.Provider value={{
    user,
    isLoading,
    login,
    register,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};