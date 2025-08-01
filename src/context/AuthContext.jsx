"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const checkAuth = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    setIsAuthenticated(!!token);
  };

  const fetchCurrentuser = async () => {
    try {
      const userId = localStorage.getItem("userID");
      if (userId) {
        const response = await fetch("/api/auth/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        const user = await response.json();

        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchCurrentuser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        refreshAuth: checkAuth,
        getUser: fetchCurrentuser,
        currentUser: currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
