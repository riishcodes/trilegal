"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Search, 
  FileEdit, 
  PlusCircle, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  FolderKanban, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  BookOpen,
  Filter,
  Users
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function DashboardPage() {
  const { cases, currentUser, briefItems, tasks } = useApp();
  const [activeTab, setActiveTab] = useState<"Active" | "Drafts" | "Archived">("Active");
  const [assistantTab, setAssistantTab] = useState<"Chat" | "Summarize" | "Draft" | "Strategy">("Chat");
  const [chatInput, setChatInput] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "Good afternoon Arjun. I am reviewing your active docket. R.K. Developers vs. State of Maharashtra has an upcoming hearing. Would you like me to extract grounds from Maneka Gandhi or review the draft petition?"
    }
  ]);

  const filteredCases = cases.filter(c => {
    if (activeTab === "Active") return c.status !== "COMPLETED";
    if (activeTab === "Drafts") return c.status === "DRAFTING" || c.status === "RESEARCH";
    return c.status === "COMPLETED";
  });

  const handleQuickChat = (prompt: string) => {
    setChatMessages(prev => [...prev, { role: "user", text: prompt }]);
    setIsAiResponding(true);

    setTimeout(() => {
      setIsAiResponding(false);
      setChatMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          text: prompt.includes("judgment") 
            ? "Summarizing Maneka Gandhi: Held that procedure depriving rights under Article 21/14 must be just, fair and reasonable. Natural justice (audi alteram partem) is mandatory unless expressly excluded."
            : prompt.includes("precedents")
            ? "Top precedent matches for arbitrary regulatory stop-work: (1) Maneka Gandhi (1978), (2) Shayara Bano (2017) [Manifest Arbitrariness], (3) FCI v. Kamdhenu (1993) [Legitimate Expectation]."
            : "Analyzing legal posture... Recommended to assert non-application of mind and absence of prior show-cause notice."
        }
      ]);
    }, 450);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userText }]);
    setIsAiResponding(true);

    setTimeout(() => {
      setIsAiResponding(false);
      setChatMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          text: `Analysis for "${userText}": Grounded in Indian administrative jurisprudence. The state action under Article 226 may be challenged for procedural irregularity, lack of reasons, and violation of promissory estoppel.`
        }
      ]);
    }, 500);
  };

  return (
    <PageTransition className="space-y-6 pb-12">
      {/* Dashboard Hero Header (Section 6) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 lg:p-6 rounded-[12px] border border-slate-200/80 shadow-subtle">
        <div>
          <h1 className="text-[26px] lg:text-[28px] font-semibold text-slate-900 tracking-tight">
            Good afternoon, {currentUser.name.split(" ")[0]}.
          </h1>
          <p className="text-[13px] text-slate-500 mt-1 font-normal">
            Research. Draft. Strategize. Grow.
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right hidden sm:block pl-4 border-l border-slate-200/80">
            <div className="text-[11px] text-slate-400 font-medium tracking-wide flex items-center justify-end gap-1.5">
              <span>Domain Readiness</span>
              <span className="text-[9px] font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200/60">
                ORBITX
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              <AnimatedCounter to={78} suffix="%" />
            </div>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-[#1E4EBE] text-white shadow-sm font-medium px-4 h-10 rounded-[10px]">
            <Link href="/app/cases/new">
              <PlusCircle className="w-4 h-4 mr-2" />
              <span>New Case</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* 4 Quick Action Cards (Section 7) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Legal Research",
            desc: "Search across legal databases and firm archives",
            sub: "SCC Online • Manupatra • Westlaw",
            icon: Search,
            href: "/app/research",
            iconColor: "text-blue-600 bg-blue-50/80 border-blue-100",
          },
          {
            title: "Draft with AI",
            desc: "Templates, suggestions and precedent support",
            sub: `${briefItems.length} citations ready in brief`,
            icon: FileEdit,
            href: "/app/drafting",
            iconColor: "text-blue-600 bg-blue-50/80 border-blue-100",
          },
          {
            title: "New Case",
            desc: "Add and analyse a case with OrbitX risk engine",
            sub: "4-Step Assessment Workflow",
            icon: PlusCircle,
            href: "/app/cases/new",
            iconColor: "text-blue-600 bg-blue-50/80 border-blue-100",
          },
          {
            title: "OrbitX Analytics",
            desc: "Track competency growth and skill insights",
            sub: "+18% Projected Market Value",
            icon: TrendingUp,
            href: "/app/orbitx",
            iconColor: "text-purple-600 bg-purple-50/80 border-purple-100",
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="h-full"
            >
              <Link
                href={card.href}
                className="p-5 bg-white rounded-[12px] border border-slate-200/80 hover:border-slate-300 hover:shadow-cardHover transition-all group flex flex-col justify-between h-full"
              >
                <div>
                  <div className={`w-9 h-9 rounded-lg ${card.iconColor} border flex items-center justify-center mb-3.5`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="font-semibold text-slate-900 text-[15px] tracking-tight flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
                  </h2>
                  <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                  {card.sub}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid: Cases & Side Co-Counsel Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 columns: YOUR CASES (Section 8) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="overflow-hidden border border-slate-200/80 rounded-[12px]">
            {/* Table Header */}
            <div className="p-4 lg:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-[17px] font-semibold text-slate-900 tracking-tight flex items-center space-x-2">
                  <span>Your Cases</span>
                  <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {cases.length}
                  </span>
                </h2>
                <p className="text-[13px] text-slate-500 mt-0.5 font-normal">
                  Managed under Trilegal practice groups with OrbitX risk tiers.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center space-x-1 bg-slate-100/80 p-0.5 rounded-lg self-start">
                {(["Active", "Drafts", "Archived"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      activeTab === tab
                        ? "bg-white text-slate-900 shadow-sm font-semibold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Cases Table (Section 8) */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] text-slate-600">
                <thead className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Case</th>
                    <th className="py-3 px-3">Practice Area</th>
                    <th className="py-3 px-3">Risk</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Assigned To</th>
                    <th className="py-3 px-3">Last Updated</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCases.map((c) => {
                    const isHigh = c.riskLevel === "HIGH";
                    const isMedium = c.riskLevel === "MEDIUM";
                    return (
                      <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-slate-900">
                          <Link href={`/app/cases/${c.id}`} className="hover:text-blue-600 block group">
                            <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{c.title}</span>
                            <span className="text-[11px] font-normal text-slate-400 block mt-0.5">{c.court}</span>
                          </Link>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="text-xs font-normal text-slate-600">
                            {c.practiceArea}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span 
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isHigh 
                                ? "bg-red-50 text-red-700 border border-red-200/80" 
                                : isMedium 
                                ? "bg-amber-50 text-amber-800 border border-amber-200/80" 
                                : "bg-emerald-50 text-emerald-800 border border-emerald-200/80"
                            }`}
                          >
                            {c.riskLevel} &bull; {c.riskConfidence}%
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-slate-500">
                          <div className="flex items-center -space-x-1.5">
                            {c.assignedTeam.slice(0, 3).map((m, idx) => (
                              <div
                                key={idx}
                                title={m.roleInCase}
                                className="w-6 h-6 rounded-full bg-[#10182B] text-white flex items-center justify-center font-medium text-[9px] ring-2 ring-white"
                              >
                                {idx === 0 ? "AM" : idx === 1 ? "SK" : "KS"}
                              </div>
                            ))}
                            {c.assignedTeam.length > 3 && (
                              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-medium text-[9px] ring-2 ring-white">
                                +{c.assignedTeam.length - 3}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-slate-500 text-xs">
                          {c.filedDate}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Button asChild variant="ghost" size="sm" className="h-7 text-xs text-slate-600 hover:text-blue-600 font-medium px-2">
                            <Link href={`/app/cases/${c.id}`} className="inline-flex items-center space-x-1">
                              <span>Open</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-slate-50/40 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredCases.length} matters</span>
              <Link href="/app/cases" className="text-blue-600 font-medium hover:underline">
                View all cases &rarr;
              </Link>
            </div>
          </Card>

          {/* QUICK ACCESS & TODAY'S TASKS (Sections 11 & 12) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quick Access Connectors (Section 11) */}
            <Card className="p-5 border border-slate-200/80 rounded-[12px]">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-[13px] font-semibold text-slate-900 tracking-tight">
                  Legal Database Connectors
                </h3>
                <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { name: "SCC Online", type: "Supreme Court & HC" },
                  { name: "Manupatra", type: "Statutes & Case Law" },
                  { name: "Westlaw India", type: "Precedents & Treaties" },
                  { name: "LexisNexis", type: "Commentaries & Acts" },
                  { name: "Indian Kanoon", type: "Public Judgments" },
                  { name: "Firm Repository", type: "Past Briefs & Memos" },
                ].map((db) => (
                  <Link
                    key={db.name}
                    href={`/app/research?db=${encodeURIComponent(db.name)}`}
                    className="p-2.5 rounded-lg border border-slate-200/70 hover:border-slate-300 hover:bg-slate-50 transition-all flex flex-col group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 text-xs group-hover:text-blue-600 transition-colors">{db.name}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-0.5">{db.type}</span>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Today's Tasks (Section 12) */}
            <Card className="p-5 border border-slate-200/80 rounded-[12px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-[13px] font-semibold text-slate-900 tracking-tight">
                    Today&apos;s Tasks
                  </h3>
                  <Link href="/app/tasks" className="text-[11px] text-blue-600 font-medium hover:underline">
                    All Tasks &rarr;
                  </Link>
                </div>
                <div className="space-y-2">
                  {tasks.slice(0, 3).map((t) => (
                    <div key={t.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-medium text-slate-900 text-xs truncate">{t.title}</div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">{t.caseTitle}</div>
                      </div>
                      <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                        t.priority === "URGENT" 
                          ? "bg-red-50 text-red-700 border border-red-200/70" 
                          : "bg-slate-200/70 text-slate-700"
                      }`}>
                        {t.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between mt-3">
                <span>3 pending matters today</span>
                <span className="font-medium text-emerald-600">On Track</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Right 4 columns: AI ASSISTANT & ORBITX GROWTH PARTNER (Sections 9 & 10) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Integrated Professional Co-Counsel Panel (Section 9) */}
          <Card className="overflow-hidden flex flex-col h-[490px] border border-slate-200/80 rounded-[12px]">
            {/* Header */}
            <div className="p-3.5 border-b border-slate-200/80 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                <div>
                  <span className="text-xs font-bold text-slate-900 tracking-tight">TRILEGAL AI</span>
                  <span className="text-[11px] text-slate-400 font-normal ml-1.5">Co-Counsel</span>
                </div>
              </div>
              <span className="text-[10px] font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60">
                Active Docket
              </span>
            </div>

            {/* Assistant Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50/70 text-[11px] font-medium text-slate-500">
              {(["Chat", "Summarize", "Draft", "Strategy"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAssistantTab(tab)}
                  className={`flex-1 py-2 text-center transition-all ${
                    assistantTab === tab
                      ? "bg-white text-slate-900 border-b-2 border-purple-600 font-semibold shadow-sm"
                      : "hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Quick Action Chips */}
            <div className="p-2.5 bg-slate-50/50 border-b border-slate-100 flex flex-wrap gap-1.5">
              {[
                "Summarize judgment",
                "Find precedents",
                "Suggest arguments",
                "Draft legal notice"
              ].map((action) => (
                <button
                  key={action}
                  onClick={() => handleQuickChat(action)}
                  className="text-[11px] bg-white hover:bg-slate-50 text-slate-700 font-normal px-2.5 py-1 rounded-md border border-slate-200/80 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-lg text-[12px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-50 text-slate-800 border border-slate-200/70"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Subtle Loading Dots when responding */}
              {isAiResponding && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5 w-3/4">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse delay-150" />
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse delay-300" />
                      <span className="text-[11px] text-slate-500 ml-1">Analyzing precedent graph...</span>
                    </div>
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-2 w-4/5" />
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-2.5 border-t border-slate-200/80 bg-white flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask AI co-counsel about active cases..."
                className="flex-1 px-3 py-1.5 bg-[#EFF4FC] border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400"
              />
              <Button type="submit" size="sm" className="bg-blue-600 hover:bg-[#1E4EBE] h-8 px-3 text-xs font-medium">
                Send
              </Button>
            </form>
          </Card>

          {/* ORBITX ANALYTICS PANEL (Section 10) */}
          <Card className="p-5 border border-slate-200/80 rounded-[12px] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                    ORBITX ANALYTICS
                  </h3>
                  <p className="text-[10px] text-slate-400">People &amp; Talent Intelligence</p>
                </div>
              </div>
              <Link href="/app/orbitx" className="text-xs text-purple-700 font-medium hover:underline">
                View &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Domain Readiness</span>
                <div className="text-xl font-bold text-slate-900 mt-0.5">
                  <AnimatedCounter to={78} suffix="%" />
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-purple-600 h-full rounded-full"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Projected Market Value</span>
                <div className="text-xl font-bold text-slate-900 mt-0.5">
                  <AnimatedCounter to={18} prefix="+" suffix="%" />
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "88%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-emerald-600 h-full rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Focus Skill Progression:</span>
                <span className="text-slate-900 font-semibold">Constitutional Law (85%)</span>
              </div>
              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                Recommended assignment: Lead Senior Associate on Article 226 writ petitions.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
