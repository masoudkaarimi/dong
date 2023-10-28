import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Provider from "@/app/provider";

// components
import Header from "@/components/layout/header";

// utils
import { cn } from "@/lib/utils";

const font = Inter({
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
   style: ["normal"],
   subsets: ["latin"],
   display: "swap",
});

export const metadata: Metadata = {
   title: "Dong Application",
   description: "Dong Application",
   // manifest: "/manifest.json",
   // themeColor: "#fdfdfd",
   // icons: {
   //   apple: "/icons/icon-192x192.png",
   // },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <Provider>
         <html lang="en" suppressHydrationWarning>
            <body className={cn("bg-slate-50", font.className)}>
               <main className="container max-w-2xl mx-auto relative py-3 h-screen bg-slate-100">
                  <Header />
                  <div className="mt-20">{children}</div>
               </main>
            </body>
         </html>
      </Provider>
   );
}
