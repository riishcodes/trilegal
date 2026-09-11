"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Filter, 
  FileText, 
  Lock, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  Copy,
  Plus
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function KnowledgeVaultPage() {
  const { knowledgeDocs } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const filtered = knowledgeDocs.filter((d) => {
    if (category !== "ALL" && d.category !== category) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.matter.toLowerCase().includes(q) ||
        d.author.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                INSTITUTIONAL REPOSITORY
              </span>
              <span className="text-[10px] bg-slate-900 text-white font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>CONFIDENTIAL</span>
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              FIRM KNOWLEDGE VAULT
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure internal archive of Trilegal briefs, settled legal opinions, research memoranda, and court templates.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500">Classification:</span>
            <span className="font-semibold text-slate-900">Law Firm Internal Only</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search briefs, opinions, research memos and filings across Trilegal practice groups..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs lg:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Categories & Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        {/* Category Pills */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-2 text-xs font-semibold">
          {[
            "ALL",
            "Internal Precedents",
            "Legal Opinions",
            "Templates",
            "Research Memos",
            "Court Filings"
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                category === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat === "ALL" ? "All Vault Items" : cat}
            </button>
          ))}
        </div>

        {/* Document List */}
        <div className="divide-y divide-slate-100 text-xs">
          {filtered.map((doc) => (
            <div key={doc.id} className="p-5 hover:bg-slate-50/80 transition-colors space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{doc.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      doc.access === "CONFIDENTIAL" ? "bg-red-50 text-red-700 border border-red-200" : "bg-blue-50 text-blue-700"
                    }`}>
                      {doc.access}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Category: <strong className="text-slate-700">{doc.category}</strong> &bull; Author: <strong className="text-slate-700">{doc.author}</strong> &bull; Date: {doc.date}
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-start shrink-0">
                  <button
                    onClick={() => alert(`Opening ${doc.title}`)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 font-semibold rounded text-slate-700 text-xs"
                  >
                    Open Document
                  </button>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-2.5 rounded border border-slate-200/80">
                {doc.contentExcerpt}
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {doc.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
