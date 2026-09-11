"use client";

import React, { useState } from "react";
import { Search, Bell, ShieldCheck, ChevronDown, BookOpen, Command } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const { currentUser, briefItems } = useApp();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/app/research?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 lg:px-8 flex items-center justify-between shadow-[0_1px_2px_0_rgba(15,23,42,0.03)]">
      {/* Search Bar - Enterprise Command Style */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl pl-10 lg:pl-0">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases, judgments, documents, lawyers..."
            className="w-full h-11 pl-10 pr-24 bg-[#EFF4FC] border border-slate-200 rounded-[10px] text-xs lg:text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center space-x-1.5 pointer-events-none">
            <span className="text-[11px] font-medium bg-white border border-slate-200/80 text-slate-400 px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
              <Command className="w-3 h-3 text-slate-400" /> K
            </span>
          </div>
        </div>
      </form>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 lg:space-x-5 ml-4">
        {/* Active Brief indicator */}
        <Link 
          href="/app/drafting"
          className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-xs font-medium"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Brief: <strong className="text-slate-900">{briefItems.length} sources</strong></span>
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-modal border border-slate-200 py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-slate-800">Notifications</span>
                <span className="text-[10px] text-blue-600 hover:underline cursor-pointer">Mark all as read</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-slate-50">
                  <div className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0"></span>
                    <div>
                      <p className="font-medium text-slate-800">OrbitX Risk Analysis Complete</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">R.K. Developers classified as HIGH RISK (93% confidence).</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">10 mins ago</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-slate-50">
                  <div className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <div>
                      <p className="font-medium text-slate-800">New Precedent Added to Brief</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Maneka Gandhi v. Union of India linked to Draft #1.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2.5 p-1 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#10182B] text-white flex items-center justify-center font-semibold text-xs shadow-sm">
              {currentUser.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[13px] font-semibold text-slate-900 leading-tight">{currentUser.name}</div>
              <div className="text-[11px] text-slate-500 font-normal">{currentUser.role}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-modal border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <div className="font-semibold text-slate-800">{currentUser.name}</div>
                <div className="text-slate-500 text-[11px]">{currentUser.email}</div>
              </div>
              <Link href="/app/orbitx" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:bg-slate-50">
                <span>My OrbitX Growth Profile</span>
              </Link>
              <Link href="/app/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:bg-slate-50">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>Settings &amp; Connectors</span>
              </Link>
              <div className="border-t border-slate-100 mt-1"></div>
              <Link href="/login" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50">
                <span>Sign Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
