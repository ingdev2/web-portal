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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="container">
            <AntdRegistry>
              <SessionAuthProvider> {children}</SessionAuthProvider>
            </AntdRegistry>
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
