
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'supplier' | 'production' | 'hr' | 'admin' | 'wholesaler' | 'retailer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, User> = {
  'supplier@aktina.com': {
    id: '1',
    name: 'John Smith',
    email: 'supplier@aktina.com',
    role: 'supplier',
    company: 'TechParts Inc.'
  },
  'production@aktina.com': {
    id: '2', 
    name: 'Sarah Johnson',
    email: 'production@aktina.com',
    role: 'production',
    company: 'Aktina Technologies'
  },
  'hr@aktina.com': {
    id: '3',
    name: 'Michael Brown',
    email: 'hr@aktina.com', 
    role: 'hr',
    company: 'Aktina Technologies'
  },
  'admin@aktina.com': {
    id: '4',
    name: 'Emily Davis',
    email: 'admin@aktina.com',
    role: 'admin',
    company: 'Aktina Technologies'
  },
  'wholesaler@aktina.com': {
    id: '5',
    name: 'David Wilson',
    email: 'wholesaler@aktina.com',
    role: 'wholesaler',
    company: 'Distribution Plus'
  },
  'retailer@aktina.com': {
    id: '6',
    name: 'Lisa Garcia',
    email: 'retailer@aktina.com',
    role: 'retailer',
    company: 'Electronics Store'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('aktina_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers[email];
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('aktina_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aktina_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
