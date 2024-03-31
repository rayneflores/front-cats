import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthResponse } from "../types/types";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData: AuthResponse) => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");

  function getAccessToken() {
    return accessToken;
  }

  function saveUser(userData: AuthResponse) {
    const token = userData.body.token;
    setAccessToken(token);
    localStorage.setItem("token", JSON.stringify(token));
    setIsAuthenticated(true);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  function checkAuth() {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAccessToken(JSON.parse(storedToken));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
