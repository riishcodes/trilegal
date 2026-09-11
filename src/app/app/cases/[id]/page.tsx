"use client";

export const runtime = "edge";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FolderKanban, 
  FileText, 
  Search, 
  FileEdit, 
  CheckSquare, 
  Users, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Calendar, 
  Scale, 
  Clock, 
  ArrowRight,
  Plus,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  BookOpen
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function CaseWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const caseId = (params?.id as string) || "case-1";
  const { cases, briefItems, tasks, lawyers } = useApp();

  const currentCase = cases.find((c) => c.id === caseId) || cases[0];
  const caseTasks = tasks.filter((t) => t.caseId === currentCase.id || t.caseTitle === currentCase.title);
  const caseBriefs = briefItems.filter((b) => b.caseId === currentCase.id);

  const [activeTab, setActiveTab] = useState<
    "Overview" | "Documents" | "Research" | "Drafts" | "Tasks" | "Team" | "AI Strategy" | "OrbitX Insights"
  >("Overview");

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                CASE WORKSPACE &bull; {currentCase.id.toUpperCase()}
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                {currentCase.practiceArea}
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              {currentCase.title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Client: <strong>{currentCase.client}</strong> &bull; Forum: <strong>{currentCase.court}</strong>
            </p>
            {/* Demo Flow Breadcrumb Guide */}
            <div className="mt-2.5 inline-flex items-center space-x-2 bg-blue-50/80 border border-blue-200/80 px-3 py-1 rounded-lg text-xs text-blue-900">
              <span className="font-bold text-[10px] uppercase tracking-wider text-blue-700 bg-white px-1.5 py-0.5 rounded border border-blue-200">
                DEMO FLOW
              </span>
              <span>Next recommended step:</span>
              <Link href={`/app/cases/${currentCase.id}/strategy`} className="font-semibold text-blue-700 hover:underline flex items-center gap-1">
                Generate AI Case Strategy &rarr;
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Risk Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>{currentCase.riskLevel} RISK ({currentCase.riskConfidence}% Confidence)</span>
            </div>

            {/* Status Badge */}
            <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
              {currentCase.status}
            </div>

            {/* AI Strategy Button */}
            <Link
              href={`/app/cases/${currentCase.id}/strategy`}
              className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI CASE STRATEGY</span>
            </Link>
          </div>
        </div>

        {/* 8 Tabs */}
        <div className="flex overflow-x-auto space-x-1 pt-1 text-xs font-semibold border-b border-slate-200">
          {(
            [
              "Overview",
              "Documents",
              "Research",
              "Drafts",
              "Tasks",
              "Team",
              "AI Strategy",
              "OrbitX Insights",
            ] as const
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                if (tab === "AI Strategy") {
                  router.push(`/app/cases/${currentCase.id}/strategy`);
                } else {
                  setActiveTab(tab);
                }
              }}
              className={`px-3.5 py-2 whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600 font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
              {tab === "Research" && caseBriefs.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded-full text-[10px]">
                  {caseBriefs.length} in Brief
                </span>
              )}
              {tab === "Tasks" && caseTasks.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full text-[10px]">
                  {caseTasks.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENTS */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 8 Cols: Overview Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Case Summary &amp; Legal Stature
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                {currentCase.briefDescription}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Filed Date</span>
                  <span className="font-semibold text-slate-800">{currentCase.filedDate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Next Listing</span>
                  <span className="font-semibold text-red-600">{currentCase.nextHearing}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Lead Lawyer</span>
                  <span className="font-semibold text-slate-800">Arjun Mehra (Sr. Associate)</span>
                </div>
              </div>
            </div>

            {/* Quick Strategic Preview */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>AI Precedent &amp; Strategy Synthesis</span>
                </h3>
                <Link
                  href={`/app/cases/${currentCase.id}/strategy`}
                  className="text-xs text-purple-700 font-semibold hover:underline"
                >
                  Full AI Strategy &rarr;
                </Link>
              </div>

              <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 text-xs text-purple-950 space-y-1.5">
                <div className="font-bold">Primary Argument Recognized by Trilegal AI:</div>
                <p className="leading-relaxed text-purple-900">
                  &ldquo;The Municipal Corporation is bound by promissory estoppel and cannot retrospectively nullify accrued building sanctions without giving prior show-cause notice (Audi Alteram Partem). Citing <em>Maneka Gandhi v. UOI (1978)</em> &amp; <em>Shayara Bano (2017)</em> manifest arbitrariness doctrine.&rdquo;
                </p>
              </div>
            </div>

            {/* Case Tasks Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Upcoming Deadlines &amp; Tasks
                </h3>
                <Link href="/app/tasks" className="text-xs text-blue-600 font-semibold hover:underline">
                  Manage all tasks &rarr;
                </Link>
              </div>

              <div className="space-y-2">
                {caseTasks.length > 0 ? (
                  caseTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`w-2 h-2 rounded-full ${
                          t.priority === "URGENT" ? "bg-red-600" : "bg-blue-600"
                        }`} />
                        <div>
                          <span className="font-semibold text-slate-900">{t.title}</span>
                          <span className="text-slate-400 block text-[11px]">Assigned to {t.assignedToName}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        Due: {t.dueDate}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">No active pending tasks for this case.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Team & OrbitX Metrics */}
          <div className="lg:col-span-4 space-y-6">
            {/* OrbitX Case Team Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Assigned Legal Team
                </h3>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  Risk-Matched
                </span>
              </div>

              <div className="space-y-3">
                {currentCase.assignedTeam.map((m, idx) => {
                  const lawyerObj = lawyers.find((l) => l.id === m.lawyerId);
                  return (
                    <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px]">
                          {lawyerObj ? lawyerObj.name.split(" ").map(n => n[0]).join("") : "AT"}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{lawyerObj?.name || "Advocate"}</div>
                          <div className="text-[10px] text-slate-500">{m.roleInCase} &bull; {m.matchPercentage}% match</div>
                        </div>
                      </div>
                      <Link href={`/app/contacts`} className="text-slate-400 hover:text-blue-600">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* OrbitX Risk Factors Breakdown */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center justify-between">
                <span>OrbitX Risk Breakdown</span>
                <span className="text-red-700 font-extrabold">{currentCase.riskConfidence}%</span>
              </h3>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {currentCase.riskExplanation}
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Financial Value:</span>
                  <span className="font-bold text-red-600">{currentCase.riskScores.financialValue}/100</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Precedent Complexity:</span>
                  <span className="font-bold text-red-600">{currentCase.riskScores.precedentComplexity}/100</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Statutory Penalty:</span>
                  <span className="font-bold text-red-600">{currentCase.riskScores.statutoryPenalty}/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: RESEARCH / BRIEF ITEMS */}
      {activeTab === "Research" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Case Research &amp; Brief Index</h2>
              <p className="text-xs text-slate-500">
                Precedents and statutory authorities saved into this case brief. Ready for insertion into legal drafts.
              </p>
            </div>
            <Link
              href="/app/research"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center space-x-2"
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEARCH LEGAL REPOSITORY</span>
            </Link>
          </div>

          <div className="space-y-3">
            {caseBriefs.length > 0 ? (
              caseBriefs.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 hover:bg-blue-50/70 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{b.title}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[10px]">
                        {b.citation}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1 text-xs leading-relaxed">{b.keyNotes}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Added: {b.addedAt}</span>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <Link
                      href={`/app/research/judgment/${b.sourceId}`}
                      className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50"
                    >
                      View Ratio
                    </Link>
                    <Link
                      href="/app/drafting"
                      className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    >
                      Use in Draft
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
                <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">No items added to this case brief yet.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Go to Legal Research, search authorities, and click &ldquo;Add to Brief&rdquo;.
                </p>
                <Link
                  href="/app/research"
                  className="mt-3 inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Launch Research</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: DOCUMENTS */}
      {activeTab === "Documents" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Pleadings, Exhibits &amp; Orders</h2>
            <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg flex items-center space-x-1">
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Document</span>
            </button>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { name: "Impugned Stop-Work Notice Ref MCGM/DP/2026/894.pdf", size: "2.4 MB", date: "10 Feb 2026", type: "Impugned Order" },
              { name: "Intimation of Disapproval (IOD) & Commencement Certificate.pdf", size: "8.1 MB", date: "14 Jan 2025", type: "Sanction" },
              { name: "Chartered Quantity Surveyor Capital Valuation Report.pdf", size: "4.5 MB", date: "02 Feb 2026", type: "Exhibit" },
              { name: "Historical DCR 33(10) Gazette Notifications.pdf", size: "12.0 MB", date: "Firm Library", type: "Precedent" }
            ].map((doc, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="font-semibold text-slate-900">{doc.name}</span>
                    <span className="text-slate-400 block text-[10px]">{doc.type} &bull; {doc.size} &bull; {doc.date}</span>
                  </div>
                </div>
                <button className="text-xs text-blue-600 font-semibold hover:underline">Download</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: DRAFTS */}
      {activeTab === "Drafts" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Legal Drafts &amp; Petitions</h2>
              <p className="text-xs text-slate-500">Working drafts created in the Trilegal AI Studio.</p>
            </div>
            <Link
              href="/app/drafting"
              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 shadow-sm"
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Open Drafting Studio</span>
            </Link>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 flex items-center justify-between text-xs">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-sm">Writ Petition Under Article 226 (Draft v1.4)</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                  Partner-Style
                </span>
              </div>
              <p className="text-slate-600 mt-1">
                Grounds include Article 14 arbitrariness, audi alteram partem, and legitimate expectation.
              </p>
            </div>
            <Link
              href="/app/drafting/draft-1"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Open Editor
            </Link>
          </div>
        </div>
      )}

      {/* TAB: TASKS */}
      {activeTab === "Tasks" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Task Allocation for this Matter</h2>
            <Link href="/app/tasks" className="text-xs text-blue-600 font-semibold hover:underline">
              Task Kanban &rarr;
            </Link>
          </div>
          <div className="space-y-2 text-xs">
            {caseTasks.map((t) => (
              <div key={t.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{t.title}</span>
                  <span className="text-slate-400 block text-[11px]">Assigned to: {t.assignedToName} &bull; Due: {t.dueDate}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-blue-50 text-blue-700">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: TEAM */}
      {activeTab === "Team" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <h2 className="text-base font-bold text-slate-900">Counsel Bench Allocation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentCase.assignedTeam.map((m, i) => {
              const law = lawyers.find(l => l.id === m.lawyerId);
              return (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                  <span className="text-[10px] font-bold text-blue-700 uppercase">{m.roleInCase}</span>
                  <div className="font-bold text-slate-900 text-sm">{law?.name}</div>
                  <div className="text-slate-500">{law?.role} &bull; {law?.experienceYears} yrs</div>
                  <p className="text-slate-600 text-[11px] pt-2 border-t border-slate-200 leading-relaxed">
                    &ldquo;{m.matchReason}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: ORBITX INSIGHTS */}
      {activeTab === "OrbitX Insights" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">OrbitX Case &amp; Lawyer Growth Insights</h2>
              <p className="text-xs text-slate-500">
                How working on this High-Risk matter elevates counsel competency benchmarks.
              </p>
            </div>
            <Link
              href="/app/orbitx"
              className="px-4 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700"
            >
              DOWNLOAD PROFESSIONAL REPORT
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2">
              <span className="font-bold text-purple-900 uppercase tracking-wider text-[10px]">Competency Gains</span>
              <p className="text-purple-950 leading-relaxed">
                By co-leading this High-Risk Article 226 proceeding, Arjun Mehra&apos;s <strong>Constitutional Law</strong> proficiency is projected to increase from <strong>60% to 75%</strong>, qualifying him for Senior Partner co-appearance panels.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10px]">Firm Value Added</span>
              <p className="text-emerald-950 leading-relaxed">
                Successful interim stay of MCGM stop-work notice safeguards INR 145 Cr in capital allocation, directly boosting firm realization rates and client retention.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
