import React, { useState, useEffect, useContext, createContext } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_CONTEXT_TYPE, USER_PROFILE_TYPE } from "@/lib/types";

type Children = { children: React.ReactNode };

// Contexts & Provider
export const AuthContext = createContext<AUTH_CONTEXT_TYPE | null>(null);
export const useAuth = () => useContext(AuthContext)!;

const AuthContextProvider: React.FC<Children> = ({ children }: Children) => {
  const [user, setUser] = useState<USER_PROFILE_TYPE>({} as USER_PROFILE_TYPE);
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // hooks
  const navigate = useNavigate();

  // function
  const getCurrentUser = async (userId: string) => {
    try {
      const response = await axios.get("/api/v1/auth/user", {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const singup = async (
    username: string,
    email: string,
    password: string,
    avatar: File
  ) => {
    try {
      const response = await axios.post("/api/v1/auth/signup", {
        username,
        email,
        password,
        avatar,
      });

      Cookies.set("authId", response.data.token, { secure: true });
      setUid(response.data.token);
    } catch (error) {
      console.log(error);
      toast(`Failed to signup, try again`);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email: email,
        password: password,
      });

      Cookies.set("authId", response.data.token, { secure: true });
      setUid(response.data.token);
    } catch (error) {
      console.log(error);
      toast(`Failed to login, try again`);
    }
  };

  const forget = async (email: string) => {
    const response = await axios.post("/api/forget", {
      email: email,
    });
  };

  const logout = async () => {
    try {
      await axios.delete("/api/v1/auth/logout", {
        headers: {
          Authorization: `Bearer ${uid}`,
        },
      });
      Cookies.remove("authId");
      setUid("");
    } catch (error) {
      console.log(error);
      toast(`Failed to logout user, try again`);
    }
  };

  //effects
  useEffect(() => {
    const getUid = () => Cookies.get("authId") as string;
    const id = getUid();
    if (Boolean(id)) {
      getCurrentUser(id);
    }
    setUid(id);
  }, [uid]);

  const value: AUTH_CONTEXT_TYPE = {
    user,
    singup,
    login,
    forget,
    logout,
    isLoading,
    setIsLoading,
    getCurrentUser,
    uid,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
