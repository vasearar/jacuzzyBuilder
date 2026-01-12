import React, { createContext, useContext, useState } from "react";
import { isLoggedIn as checkLoggedIn } from "./simpleAuth";

type AuthContextType = {
  loggedIn: boolean;
  refreshAuth: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState(checkLoggedIn());

  const refreshAuth = () => {
    setLoggedIn(checkLoggedIn());
  };

  return (
    <AuthContext.Provider value={{ loggedIn, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
