import React from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/redux/providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import SessionAuthProvider from "@/context/SessionAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Web PROCED",
  description: "Hecho con Next.js",
  icons: {
    icon: "../../public/logos/favicon.ico.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AntdRegistry>
            <SessionAuthProvider> {children}</SessionAuthProvider>
          </AntdRegistry>
        </Providers>
        <main className="container"></main>
      </body>
    </html>
  );
}
