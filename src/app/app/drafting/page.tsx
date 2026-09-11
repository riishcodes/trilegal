"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FileEdit, 
  Sparkles, 
  BookOpen, 
  Check, 
  ArrowRight, 
  Scale, 
  CheckCircle2,
  HelpCircle,
  FileText,
  Clock
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function DraftingHubPage() {
  const router = useRouter();
  const { cases, briefItems, selectedCaseId, currentDraft } = useApp();

  const [selectedCase, setSelectedCase] = useState(selectedCaseId || "case-1");
  const [template, setTemplate] = useState<
    "Writ Petition" | "Legal Notice" | "Legal Opinion" | "Arbitration Notice" | "Commercial Contract" | "Research Memo" | "Court Filing"
  >("Writ Petition");
  const [court, setCourt] = useState("High Court of Judicature at Bombay");
  const [caseTitle, setCaseTitle] = useState("R.K. Developers vs. State of Maharashtra");
  const [briefFacts, setBriefFacts] = useState(
    "The Petitioner, R.K. Developers, was granted Intimation of Disapproval (IOD) and Commencement Certificate for redevelopment of 4.2 acres in suburban Mumbai. After expenditure of INR 145 Crores and construction up to the 14th plinth, Respondent No. 2 issued an ex-parte stop-work notice citing draft changes to DCR 33(10) without hearing."
  );
  const [keyLegalIssues, setKeyLegalIssues] = useState(
    "Whether a sanctioned development permission can be arbitrarily revoked through retrospective executive circulars without notice in violation of Article 14 and principles of natural justice?"
  );
  const [relevantLaws, setRelevantLaws] = useState(
    "Constitution of India (Articles 14, 19(1)(g), 300A); Maharashtra Regional & Town Planning Act, 1966 (Sections 44, 45, 51)."
  );
  const [tone, setTone] = useState<"Formal" | "Concise" | "Partner-style" | "Detailed" | "Firm Standard">("Partner-style");

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      router.push("/app/drafting/draft-1");
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                AI LEGAL DRAFTING ENGINE
              </span>
              <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded">
                STUDIO GENERATOR
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              DRAFT A LEGAL DOCUMENT
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Draft petitions, notices, and memos powered by your active Case Brief precedents and Trilegal drafting standards.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Link
              href="/app/drafting/draft-1"
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs flex items-center space-x-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Open Existing Draft &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Connected Brief Banner */}
        <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2.5">
            <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="text-blue-950">
              <strong>Connected Case Brief:</strong> {briefItems.length} research citations available to inject automatically (including <em>Maneka Gandhi v. UOI</em>).
            </div>
          </div>
          <span className="text-[10px] font-bold text-blue-700 uppercase bg-white px-2 py-0.5 rounded border border-blue-200 shadow-sm">
            Brief Sync Active
          </span>
        </div>
      </div>

      {/* Draft Generator Form */}
      <form onSubmit={handleGenerateDraft} className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-6">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
          Document Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Template Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Document Template *
            </label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs lg:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Writ Petition">Writ Petition (Article 226/32)</option>
              <option value="Legal Notice">Legal Notice</option>
              <option value="Legal Opinion">Legal Opinion</option>
              <option value="Arbitration Notice">Arbitration Notice</option>
              <option value="Commercial Contract">Commercial Contract</option>
              <option value="Research Memo">Research Memo</option>
              <option value="Court Filing">Court Filing / Special Leave Petition</option>
            </select>
          </div>

          {/* Associated Case */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Associated Case Docket *
            </label>
            <select
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs lg:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.riskLevel} RISK)
                </option>
              ))}
            </select>
          </div>

          {/* Case Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Case Title / Cause Title
            </label>
            <input
              type="text"
              value={caseTitle}
              onChange={(e) => setCaseTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs lg:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
            />
          </div>

          {/* Judicial Forum */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Court / Tribunal
            </label>
            <input
              type="text"
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs lg:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preferred Tone */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
              Preferred Drafting Tone
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {(["Formal", "Concise", "Partner-style", "Detailed", "Firm Standard"] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTone(t)}
                  className={`p-2.5 rounded-lg border text-center font-medium transition-all ${
                    tone === t
                      ? "border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Brief Facts */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Brief Facts
            </label>
            <textarea
              rows={3}
              value={briefFacts}
              onChange={(e) => setBriefFacts(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>

          {/* Key Legal Issues */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Key Legal Issues
            </label>
            <textarea
              rows={2}
              value={keyLegalIssues}
              onChange={(e) => setKeyLegalIssues(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Relevant Laws */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Relevant Laws &amp; Statutory Provisions
            </label>
            <input
              type="text"
              value={relevantLaws}
              onChange={(e) => setRelevantLaws(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Generate Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            AI Draft Editor will open with live legal suggestion sidebar.
          </span>
          <button
            type="submit"
            disabled={isGenerating}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-md transition-all flex items-center space-x-2 disabled:opacity-75"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? "GENERATING DRAFT..." : "GENERATE DRAFT"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
