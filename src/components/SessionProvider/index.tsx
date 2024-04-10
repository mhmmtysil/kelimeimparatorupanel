"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

import SignIn from "../Login";
function Session({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? (
        <Loader />
      ) : status === "loading" ? (
        <div>Oturum açılıyor...</div>
      ) : session ? (
        <>{children}</>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
export default Session;
