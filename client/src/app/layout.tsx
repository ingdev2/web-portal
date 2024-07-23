import React from "react";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/redux/providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { ConfigProvider, theme } from "antd";
import themeConfig from "@/theme/themeConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Web PROCED",
  description: "Hecho con Next.js y NestJs",
  icons: {
    icon: "../../public/logos/favicon.ico.png",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" style={{ margin: 0, padding: 0 }}>
      <head className="container-head-app">
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>

      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <Providers>
          <main className="container-main-app">
            <AntdRegistry>
              <SessionAuthProvider>
                <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
              </SessionAuthProvider>
            </AntdRegistry>
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
