"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FolderKanban, 
  PlusCircle, 
  Search, 
  Filter, 
  ArrowRight, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function CasesListPage() {
  const { cases } = useApp();
  const [filterArea, setFilterArea] = useState<string>("ALL");
  const [filterRisk, setFilterRisk] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const filtered = cases.filter((c) => {
    if (filterArea !== "ALL" && c.practiceArea !== filterArea) return false;
    if (filterRisk !== "ALL" && c.riskLevel !== filterRisk) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.client.toLowerCase().includes(q) ||
        c.court.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>ACTIVE CASES &amp; DOCKETS</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {cases.length} Total Matters
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise case management integrated with OrbitX risk tiers and automated team assignments.
          </p>
        </div>
        <Link
          href="/app/cases/new"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs shadow-sm flex items-center space-x-2 self-start transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>NEW CASE INTAKE</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-subtle flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by case title, client or court..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
          >
            <option value="ALL">All Practice Areas</option>
            <option value="Constitutional Law">Constitutional Law</option>
            <option value="Arbitration">Arbitration</option>
            <option value="Corporate & Insolvency">Corporate &amp; Insolvency</option>
            <option value="IP Litigation">IP Litigation</option>
            <option value="Environmental Law">Environmental Law</option>
          </select>

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="HIGH">High Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="LOW">Low Risk</option>
          </select>
        </div>
      </div>

      {/* Cases Grid / Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Matter / Forum</th>
                <th className="py-3 px-3">Client</th>
                <th className="py-3 px-3">Practice Area</th>
                <th className="py-3 px-3">OrbitX Risk</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Next Hearing</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <Link href={`/app/cases/${c.id}`} className="hover:text-blue-600 flex flex-col">
                      <span className="text-sm font-bold text-slate-900 line-clamp-1">{c.title}</span>
                      <span className="text-[11px] font-normal text-slate-400">{c.court}</span>
                    </Link>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-800">{c.client}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {c.practiceArea}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      c.riskLevel === "HIGH"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : c.riskLevel === "MEDIUM"
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    }`}>
                      {c.riskLevel} &bull; {c.riskConfidence}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-[11px] font-semibold text-slate-700">{c.status}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-medium">{c.nextHearing}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/app/cases/${c.id}`}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded text-xs inline-flex items-center space-x-1"
                    >
                      <span>Workspace</span>
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
