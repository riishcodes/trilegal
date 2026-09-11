"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Bookmark, 
  Check, 
  FileText, 
  Scale, 
  HelpCircle, 
  Copy, 
  Share2, 
  BookOpen,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function JudgmentViewerPage() {
  const params = useParams();
  const router = useRouter();
  const judgmentId = (params?.id as string) || "judg-1";
  const { researchResults, addToBrief, briefItems, selectedCaseId } = useApp();

  const judgment = researchResults.find((j) => j.id === judgmentId) || researchResults[0];
  const isAlreadyInBrief = briefItems.some((b) => b.sourceId === judgment.id);
  const [inBrief, setInBrief] = useState(isAlreadyInBrief);

  const [activeTab, setActiveTab] = useState<"Judgment" | "Summary" | "Citations" | "Related Cases">("Judgment");
  const [aiAssistantQuery, setAiAssistantQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAddToBrief = () => {
    addToBrief({
      caseId: selectedCaseId || "case-1",
      sourceType: "JUDGMENT",
      sourceId: judgment.id,
      title: judgment.title,
      citation: judgment.citation,
      court: judgment.court,
      keyNotes: judgment.aiRelevanceExplanation,
    });
    setInBrief(true);
  };

  const handleAiAction = (action: string) => {
    setLoadingAi(true);
    setTimeout(() => {
      setLoadingAi(false);
      if (action === "summarize") {
        router.push(`/app/research/summary/${judgment.id}`);
      } else if (action === "explain") {
        setAiResponse(
          "Paragraph 4 Explanation: Justice Bhagwati clarifies that Article 14 is not merely an anti-discrimination provision, but a positive guarantee against executive arbitrariness. Any administrative decision that lacks reasons or fails natural justice is ultra vires Article 14."
        );
      } else if (action === "precedent") {
        setAiResponse(
          "Supporting Indian Precedents: E.P. Royappa v. State of T.N. (1974) (Equality vs. Arbitrariness), Ramana Dayaram Shetty (1979) (State must follow own rules), and Shayara Bano (2017) (Manifest Arbitrariness)."
        );
      } else if (action === "principle") {
        setAiResponse(
          "Core Legal Principle Extracted (Ratio Decidendi): 'The triad of Articles 14, 19, and 21 forms an integrated golden triangle. No fundamental right can be curtailed except through a procedure that is just, fair, reasonable, and non-arbitrary.'"
        );
      } else if (action === "argument") {
        setAiResponse(
          "Formulated Argument: 'The Municipal Corporation's sudden stop-work memo violates Article 14 by imposing retroactive burdens on the Petitioner without affording any hearing or communicating reasons, directly offending the ruling in Maneka Gandhi (1978) 1 SCC 248.'"
        );
      }
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/app/research"
          className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Legal Research Engine</span>
        </Link>

        <div className="flex items-center space-x-2">
          <Link
            href={`/app/research/summary/${judgment.id}`}
            className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-semibold border border-purple-200 flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>View Full AI Summary</span>
          </Link>
        </div>
      </div>

      {/* Judgment Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold mb-1">
              <span>{judgment.database}</span>
              <span>&bull;</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                {judgment.sourceLabel}
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-serif font-bold text-slate-900 tracking-tight">
              {judgment.title}
            </h1>
            <p className="text-xs font-mono font-semibold text-slate-600 mt-1">
              {judgment.citation} &bull; {judgment.court} ({judgment.year})
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleAddToBrief}
              disabled={inBrief}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                inBrief
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              }`}
            >
              {inBrief ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>ADDED TO BRIEF</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>ADD TO BRIEF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Viewer Tabs */}
        <div className="flex space-x-2 text-xs font-semibold border-b border-slate-200 pb-1">
          {(["Judgment", "Summary", "Citations", "Related Cases"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                if (tab === "Summary") {
                  router.push(`/app/research/summary/${judgment.id}`);
                } else {
                  setActiveTab(tab);
                }
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === tab
                  ? "bg-slate-900 text-white font-bold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Reader & Right AI Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Legal Document Reader */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-subtle min-h-[600px] text-slate-800 font-serif leading-relaxed text-sm">
            <div className="text-center pb-6 border-b border-slate-200 mb-6 font-sans">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">
                AUTHENTIC JUDICIAL RECORD (INDIAN JURISPRUDENCE)
              </span>
              <h2 className="text-lg font-bold text-slate-900 font-serif">{judgment.title}</h2>
              <div className="text-xs font-mono text-slate-500 mt-1">{judgment.citation}</div>
            </div>

            {/* Document Text */}
            <div className="whitespace-pre-line space-y-4 text-slate-900">
              {judgment.fullText}
            </div>

            {/* Relevant Sections & Statues */}
            <div className="mt-8 pt-6 border-t border-slate-200 font-sans">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Cited Statutory Provisions:
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {judgment.relevantSections.map((sec, idx) => (
                  <span key={idx} className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded font-medium">
                    {sec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Trilegal AI Document Assistant */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle space-y-4 sticky top-20">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  TRILEGAL AI ASSISTANT
                </h3>
                <p className="text-[10px] text-slate-400">Contextual Judgment Intelligence</p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Instant Actions
              </span>
              <button
                onClick={() => handleAiAction("summarize")}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all font-semibold text-slate-700 flex items-center justify-between"
              >
                <span>Summarize Full Judgment</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => handleAiAction("explain")}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all font-semibold text-slate-700 flex items-center justify-between"
              >
                <span>Explain Paragraph &amp; Holding</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => handleAiAction("principle")}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all font-semibold text-slate-700 flex items-center justify-between"
              >
                <span>Extract Legal Principle (Ratio)</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => handleAiAction("precedent")}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all font-semibold text-slate-700 flex items-center justify-between"
              >
                <span>Find Cited Precedents</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => handleAiAction("argument")}
                className="w-full text-left p-2.5 rounded-lg border border-purple-200 bg-purple-50/60 hover:bg-purple-100 transition-all font-bold text-purple-900 flex items-center justify-between"
              >
                <span>Generate Argument for R.K. Developers</span>
                <ChevronRight className="w-3.5 h-3.5 text-purple-600" />
              </button>
            </div>

            {/* AI Output Window */}
            {loadingAi ? (
              <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-500 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
                <span>Synthesizing judicial ratio...</span>
              </div>
            ) : aiResponse ? (
              <div className="p-3.5 bg-purple-50/80 rounded-lg border border-purple-200 text-xs space-y-2">
                <div className="font-bold text-purple-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>AI Synthesis:</span>
                </div>
                <p className="text-purple-950 leading-relaxed font-medium">
                  {aiResponse}
                </p>
                <div className="pt-2 border-t border-purple-200 flex justify-end">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(aiResponse);
                    }}
                    className="text-[10px] text-purple-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Snippet</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
