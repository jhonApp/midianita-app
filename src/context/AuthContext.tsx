import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("midianita_token");
    if (token) {
      // TODO: Connect to real Backend API endpoint to validate token & fetch user profile
      setUser({ email: "usuario@igreja.com", name: "Usuário" });
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // TODO: Connect to real Backend API endpoint
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));

    if (email && password.length >= 4) {
      const token = "mock_jwt_token_" + Date.now();
      localStorage.setItem("midianita_token", token);
      setUser({ email, name: email.split("@")[0] });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("midianita_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
