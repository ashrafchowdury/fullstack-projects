import React, { useState, useContext, createContext } from "react";
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
      const response = await axios.get("/api/auth/v1/user", {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const singup = async (email: string, username: string, password: string) => {
    try {
      if (!username || !password || !email) {
        toast.error(`Please fill up all the fildes`);
        return;
      }

      const response = await axios.post(
        "/api/auth/v1/register",
        {
          [username.includes("@") ? "email" : "username"]: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUid(response.data._id);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast(`Failed to signup, try again`);
    }
  };

  const uploadFile = async (file: File) => {
    try {
      const data = new FormData();
      data.set("file", file as File);

      const upload = await fetch("/api/auth/v1/upload-file", {
        method: "POST",
        body: data,
      });

      if (!upload.ok) {
        toast.error("Failed to update the profile photo");
      }

      const res = await upload.json();

      return res.secure_url;
    } catch (error) {
      toast.error("Failed to update the profile photo. Please try again!");
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/v1/login", {
        email: email,
        password: password,
      });

      setUid(response.data.token);
    } catch (error) {
      console.log(error);
      toast(`Failed to login, try again`);
    }
  };

  const forget = async (email: string) => {
    await axios.post("/api/forget", {
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

  const updateProfile = async (data: any, avatar: File) => {
    try {
      let imageURL;
      if (avatar.name) {
        imageURL = await uploadFile(avatar);
      }

      const response = await axios.post(
        "/api/auth/v1/register",
        {
          ...data,
          avatar: imageURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUid(response.data._id);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast(`Failed to signup, try again`);
    }
  };

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
    uploadFile,
    updateProfile,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
