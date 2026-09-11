"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scale, 
  Search, 
  FolderKanban, 
  FileEdit, 
  CheckSquare, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Briefcase,
  Shield,
  Sparkles
} from "lucide-react";
import { useApp } from "@/context/AppContext";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  highlight?: boolean;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

export default function Sidebar() {
  const pathname = usePathname();
  const { currentUser, isDemoMode, briefItems } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navSections: NavSection[] = [
    {
      title: "MAIN WORKSPACE",
      items: [
        { label: "Home", href: "/app", icon: Scale },
        { label: "Research", href: "/app/research", icon: Search },
        { label: "My Cases", href: "/app/cases", icon: FolderKanban },
        { label: "Drafting", href: "/app/drafting", icon: FileEdit, badge: briefItems.length > 0 ? `${briefItems.length}` : undefined },
        { label: "Task Assignments", href: "/app/tasks", icon: CheckSquare },
      ]
    },
    {
      title: "INTELLIGENCE",
      items: [
        { label: "OrbitX Analytics", href: "/app/orbitx", icon: TrendingUp, highlight: true },
        { label: "Firm Talent (HR)", href: "/app/orbitx/team", icon: Briefcase },
      ]
    },
    {
      title: "KNOWLEDGE",
      items: [
        { label: "Knowledge Vault", href: "/app/knowledge", icon: BookOpen },
        { label: "Contacts", href: "/app/contacts", icon: Users },
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { label: "Settings", href: "/app/settings", icon: Settings },
      ]
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#10182B] text-slate-300 border-r border-slate-800/80 selection:bg-blue-600 selection:text-white">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/70">
        <Link href="/app" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600/90 text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-blue-600 transition-colors">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-tight text-white text-[15px]">TRILEGAL AI</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">Your AI Co-Counsel</p>
          </div>
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              {section.title}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="relative block"
                >
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-all duration-150 ${
                      isActive
                        ? "bg-blue-950/60 text-white font-medium border border-blue-500/30"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 transition-colors ${
                        isActive 
                          ? "text-blue-400" 
                          : item.highlight 
                          ? "text-purple-400" 
                          : "text-slate-400"
                      }`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                        isActive ? "bg-blue-500/30 text-blue-200 border border-blue-400/30" : "bg-slate-800 text-slate-400"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Demo Mode Small Subtle Pill */}
      {isDemoMode && (
        <div className="px-4 pb-2">
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="font-semibold text-slate-300">DEMO MODE</span>
            </div>
            <span className="text-[10px] text-slate-500">Simulated Data</span>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="px-4 pb-3">
        <div className="flex items-center space-x-2 text-[11px] text-slate-500">
          <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Firm data is private and secure.</span>
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-800/70 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs">
              {currentUser.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                {currentUser.name}
              </div>
              <div className="text-[11px] text-slate-400 truncate">{currentUser.role}</div>
            </div>
          </div>
          <Link href="/login" title="Logout" className="text-slate-500 hover:text-slate-300 p-1.5 rounded hover:bg-slate-800/60 transition-colors">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg bg-[#10182B] text-white shadow-md border border-slate-700"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen fixed top-0 left-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-72 h-full z-10 shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
