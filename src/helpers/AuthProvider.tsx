import React, { useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUser, AuthContextI } from "../types";
import { whoUser } from "../services/auth/userServices";
import { toast } from 'react-toastify'

interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthContext = React.createContext<AuthContextI>({});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser>();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      whoUser(token)
        .then((res) => {
          const { name, email } = res.data;
          toast.success(`Bienvenido de nuevo ${name}!`)
          setUser({ name, email, token });
        })
        .catch((err) => {
          console.error("Token no valido!");
        });
      return;
    }
  }, []);

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: AuthUser) => {
    const { token } = data;
    setUser(data);
    window.localStorage.setItem("Authorization", token ? token : "error");
    navigate("/app");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(undefined);
    window.localStorage.removeItem("Authorization");
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
