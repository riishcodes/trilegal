import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "@/components/ui/sonner";
import GlobalCommandMenu from "@/components/GlobalCommandMenu";

export const metadata: Metadata = {
  title: "Trilegal AI — Your AI Co-Counsel with OrbitX Engine",
  description:
    "Next-generation AI Operating System for Law Firms. Unified legal research, AI drafting, risk scoring, and lawyer development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased font-sans text-slate-900 bg-[#EFF4FC]">
        <AppProvider>
          {children}
          <GlobalCommandMenu />
          <Toaster position="top-right" richColors closeButton />
        </AppProvider>
      </body>
    </html>
  );
}
