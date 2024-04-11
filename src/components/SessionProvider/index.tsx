"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

import SignIn from "../Login";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/models/User";
//@ts-ignore
function Session({ children }) {
  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useLocalStorage<User | null>("user", null);

  useEffect(() => {
    const handleStorageChange = () => {
      const newUser = localStorage.getItem("user");
      setUser(newUser ? JSON.parse(newUser) : null);
    };
    window.addEventListener("user", handleStorageChange);
    return () => {
      window.removeEventListener("user", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? <Loader /> : user ? <>{children}</> : <SignIn />}
    </div>
  );
}
export default Session;
