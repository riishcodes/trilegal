"use client";

export const runtime = "edge";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Download, 
  Printer, 
  ArrowLeft, 
  Scale, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck,
  Building,
  UserCheck
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function ProfessionalGrowthReportPage() {
  const params = useParams();
  const lawyerId = (params?.id as string) || "lawyer-1";
  const { lawyers, currentUser, learningPaths, cases } = useApp();

  const lawyer = lawyers.find((l) => l.id === lawyerId) || currentUser;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Action Bar (Hidden when printed) */}
      <div className="no-print flex items-center justify-between bg-white rounded-xl border border-slate-200 p-4 shadow-subtle">
        <Link
          href="/app/orbitx"
          className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to OrbitX Analytics</span>
        </Link>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center space-x-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / SAVE AS PDF</span>
          </button>
        </div>
      </div>

      {/* PRINT-READY REPORT CONTAINER */}
      <div className="print-page bg-white rounded-xl border border-slate-300 p-8 lg:p-12 shadow-md text-slate-900 font-sans space-y-8">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b-2 border-slate-900 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-[#10182B] text-white flex items-center justify-center font-bold text-sm">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900">TRILEGAL</span>
              <span className="text-xs text-slate-400 font-mono">| ADVOCATES &amp; SOLICITORS</span>
            </div>
            <div className="mt-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold border border-purple-200">
                ORBITX INTELLIGENCE ENGINE
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                PROFESSIONAL GROWTH &amp; COMPETENCY REPORT
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Comprehensive assessment of litigation performance, domain readiness, and partner pathway.
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs space-y-1">
            <div className="text-slate-400 font-medium">REPORT ID: <strong className="text-slate-800">TRL-ORBX-2026-089</strong></div>
            <div className="text-slate-400 font-medium">DATE: <strong className="text-slate-800">11 March 2026</strong></div>
            <div className="text-slate-400 font-medium">FIRM STATUS: <strong className="text-emerald-700">ACTIVE CO-COUNSEL</strong></div>
          </div>
        </div>

        {/* 1. Lawyer Profile Section */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-1.5">
            1. Counsel Profile &amp; Practice Standing
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Name</span>
              <span className="font-bold text-slate-900 text-sm">{lawyer.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Role</span>
              <span className="font-semibold text-slate-800">{lawyer.role}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Experience</span>
              <span className="font-semibold text-slate-800">{lawyer.experienceYears} Years Standing</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
              <span className="font-semibold text-slate-800">{lawyer.location}</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 italic px-1">
            &ldquo;{lawyer.bio}&rdquo;
          </p>
        </div>

        {/* 2. Key OrbitX Metrics */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-1.5">
            2. Strategic OrbitX Valuation Benchmarks
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 text-center">
              <span className="text-[10px] font-bold text-purple-800 uppercase">Domain Readiness</span>
              <div className="text-2xl font-extrabold text-purple-900 mt-1">{lawyer.domainReadiness}%</div>
              <span className="text-[10px] text-purple-700">Senior Associate Top Tier</span>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 text-center">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Projected Market Value</span>
              <div className="text-2xl font-extrabold text-emerald-800 mt-1">+18%</div>
              <span className="text-[10px] text-emerald-700">High Court Commercial Docket</span>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 text-center">
              <span className="text-[10px] font-bold text-blue-800 uppercase">Growth Composite</span>
              <div className="text-2xl font-extrabold text-blue-900 mt-1">{lawyer.growthScore} / 100</div>
              <span className="text-[10px] text-blue-700">Partner Track Eligible</span>
            </div>
          </div>
        </div>

        {/* 3. Skill Breakdown & Gap Analysis */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-1.5">
            3. Assessed Competencies vs Firm Benchmark
          </h2>
          <div className="space-y-2.5 text-xs">
            {lawyer.skills.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center font-semibold text-slate-800">
                  <span>{s.name}</span>
                  <span>{s.score}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      s.score >= 80 ? "bg-emerald-600" : s.score >= 65 ? "bg-blue-600" : "bg-purple-600"
                    }`}
                    style={{ width: `${s.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Learning Pathways Curated by OrbitX */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-1.5">
            4. Recommended Professional Development Curriculum
          </h2>
          <div className="space-y-2 text-xs">
            {learningPaths.slice(0, 3).map((lp, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-start">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900">{lp.title}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{lp.whyRecommended}</p>
                </div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded shrink-0 ml-3">
                  {lp.estimatedWeeks} Weeks
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Managing Partner Sign-off */}
        <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-2 gap-8 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
              ORBITX AI ENGINE CERTIFICATION
            </span>
            <div className="flex items-center space-x-2 text-slate-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified against Indian Bar Competency Framework</span>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-block border-t border-slate-400 pt-2 font-serif font-bold text-slate-900">
              Vikramjit Roy, Senior Partner
            </div>
            <div className="text-[10px] text-slate-400">Head of Dispute Resolution, Trilegal</div>
          </div>
        </div>
      </div>
    </div>
  );
}
