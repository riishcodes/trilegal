"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function OrbitXTeamIntelligencePage() {
  const { lawyers, cases } = useApp();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filtered = lawyers.filter((l) => {
    if (roleFilter !== "ALL" && l.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.practiceAreas.some((p) => p.toLowerCase().includes(q)) ||
        l.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                ORBITX TALENT ENGINE
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                Executive Partner &amp; HR View
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              FIRM TALENT INTELLIGENCE
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Firm-wide talent utilization, high-risk matter coverage, domain readiness, and skill gap mapping.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500">Managing Office:</span>
            <span className="font-bold text-slate-800">Mumbai &bull; Delhi &bull; Bengaluru</span>
          </div>
        </div>

        {/* 5 Firm Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Lawyers</span>
            <span className="text-xl font-bold text-slate-900 mt-0.5 block">{lawyers.length} Advocates</span>
            <span className="text-[10px] text-emerald-600 font-medium">100% Onboarded</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Cases Handled</span>
            <span className="text-xl font-bold text-slate-900 mt-0.5 block">{cases.length} Matters</span>
            <span className="text-[10px] text-blue-600 font-medium">Active Dockets</span>
          </div>

          <div className="p-3 bg-red-50/50 rounded-lg border border-red-200 text-xs">
            <span className="text-[10px] text-red-700 uppercase font-bold block">High-Risk Matters</span>
            <span className="text-xl font-bold text-red-700 mt-0.5 block">
              {cases.filter(c => c.riskLevel === "HIGH").length} Cases
            </span>
            <span className="text-[10px] text-red-600 font-medium">Sr. Partner Oversight</span>
          </div>

          <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-200 text-xs">
            <span className="text-[10px] text-purple-700 uppercase font-bold block">Avg Readiness</span>
            <span className="text-xl font-bold text-purple-900 mt-0.5 block">81.4%</span>
            <span className="text-[10px] text-purple-700 font-medium">Firm Benchmark</span>
          </div>

          <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-200 text-xs">
            <span className="text-[10px] text-emerald-700 uppercase font-bold block">Training Track</span>
            <span className="text-xl font-bold text-emerald-800 mt-0.5 block">94%</span>
            <span className="text-[10px] text-emerald-600 font-medium">OrbitX Enrolled</span>
          </div>
        </div>
      </div>

      {/* Lawyer Talent Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lawyer name, practice or office..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500">Filter Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-700"
            >
              <option value="ALL">All Roles</option>
              <option value="Senior Partner">Senior Partner</option>
              <option value="Partner">Partner</option>
              <option value="Senior Associate">Senior Associate</option>
              <option value="Associate">Associate</option>
              <option value="Junior Associate">Junior Associate</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Lawyer</th>
                <th className="py-3 px-3">Experience</th>
                <th className="py-3 px-3">Practice Areas</th>
                <th className="py-3 px-3">Domain Readiness</th>
                <th className="py-3 px-3">Workload</th>
                <th className="py-3 px-3">Growth Score</th>
                <th className="py-3 px-4 text-right">OrbitX Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0 ${l.avatarBg}`}>
                        {l.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{l.name}</div>
                        <div className="text-[10px] text-slate-400">{l.role} &bull; {l.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-800">{l.experienceYears} Years</td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {l.practiceAreas.map((pa, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded">
                          {pa}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-purple-900">{l.domainReadiness}%</span>
                      <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full rounded-full" style={{ width: `${l.domainReadiness}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      l.workload >= 80 ? "bg-red-50 text-red-700" : l.workload >= 60 ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800"
                    }`}>
                      {l.workload}%
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">{l.growthScore} / 100</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/app/orbitx/report/${l.id}`}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center space-x-1"
                    >
                      <span>View Report</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
