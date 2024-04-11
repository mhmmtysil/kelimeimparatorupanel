"use client";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import Session from "@/components/SessionProvider";
import { SessionProvider } from "next-auth/react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/models/User";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <Session>{children}</Session>
        </div>
      </body>
    </html>
  );
}
