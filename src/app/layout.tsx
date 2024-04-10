"use client";
import Session from "@/components/SessionProvider";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <SessionProvider>
            <Session children={children} />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
