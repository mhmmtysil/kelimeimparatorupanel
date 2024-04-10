import { useSession } from "next-auth/react";

const ERROR_MESSAGE = "Api request failed.";
const ApiRequestManager = () => {
  const { data: session } = useSession();

  const fetchDataWithSession = async (endpoint: string, body: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        throw new Error(ERROR_MESSAGE);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(ERROR_MESSAGE);
    }
  };

  return {
    fetchDataWithSession,
  };
};

export default ApiRequestManager;
