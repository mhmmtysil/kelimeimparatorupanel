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
  
  const [initialized, setInitialized] = useState(false);

  const [user, setUser] = useLocalStorage<User | null>("user", null);

  console.log(user);
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
