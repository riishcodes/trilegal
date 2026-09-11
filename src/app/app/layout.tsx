"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#EFF4FC]">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
        <footer className="py-4 px-8 border-t border-slate-200 bg-white text-center text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <span>
              <strong>TRILEGAL AI</strong> &bull; Powered by <strong>ORBITX Intelligence Engine</strong>
            </span>
            <span className="text-[11px] text-slate-500">
              Enterprise Legal Tech MVP &bull; Demo Mode with simulated legal database connectors &bull; Confidential
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
