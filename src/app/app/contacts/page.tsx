"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function ContactsDirectoryPage() {
  const { lawyers } = useApp();
  const [search, setSearch] = useState("");
  const [practiceFilter, setPracticeFilter] = useState("ALL");

  const filtered = lawyers.filter((l) => {
    if (practiceFilter !== "ALL" && !l.practiceAreas.includes(practiceFilter)) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.role.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>FIRM COUNSEL DIRECTORY</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {lawyers.length} Advocates
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Internal directory of Partners, Senior Associates, and litigation counsel across Indian offices.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role or office..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-slate-500">Practice Area:</span>
          <select
            value={practiceFilter}
            onChange={(e) => setPracticeFilter(e.target.value)}
            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-700"
          >
            <option value="ALL">All Practices</option>
            <option value="Constitutional Law">Constitutional Law</option>
            <option value="Dispute Resolution">Dispute Resolution</option>
            <option value="Arbitration">Arbitration</option>
            <option value="Intellectual Property">Intellectual Property</option>
            <option value="Corporate M&A">Corporate M&amp;A</option>
          </select>
        </div>
      </div>

      {/* Lawyer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((l) => (
          <div
            key={l.id}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-subtle hover:border-blue-300 transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start space-x-3">
                <div className={`w-11 h-11 rounded-xl text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${l.avatarBg}`}>
                  {l.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">{l.name}</h2>
                  <div className="text-xs text-blue-700 font-semibold">{l.role}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{l.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Domain Readiness:</span>
                  <span className="font-bold text-purple-900">{l.domainReadiness}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Workload:</span>
                  <span className="font-semibold text-slate-800">{l.workload}% Allocated</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {l.practiceAreas.map((pa, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {pa}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">{l.experienceYears} yrs standing</span>
              <Link
                href={`/app/orbitx/report/${l.id}`}
                className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                <span>OrbitX Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
