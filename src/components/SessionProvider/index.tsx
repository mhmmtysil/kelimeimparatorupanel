"use client";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import Loader from "../common/Loader";

import SignIn from "../Login";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/models/User";
import React from "react";
//@ts-ignore
function Session({ children }) {
  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useLocalStorage<User | null>("User", null);

  useEffect(() => {
    const handleStorageChange = () => {
      const newUser = localStorage.getItem("User");
      setUser(newUser ? JSON.parse(newUser) : null);
    };
    window.addEventListener("User", handleStorageChange);
    return () => {
      window.removeEventListener("User", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* {loading ? <Loader /> : <>{children}</>} */}
      {loading ? <Loader /> : user ? <>{children}</> : <SignIn />}
    </div>
  );
}
export default Session;
