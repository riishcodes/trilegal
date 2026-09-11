"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Download, 
  Sparkles, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck,
  BarChart3,
  Calendar,
  Briefcase
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import PageTransition from "@/components/ui/PageTransition";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function OrbitXAnalyticsPage() {
  const { currentUser, learningPaths, cases } = useApp();

  return (
    <PageTransition className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Top Header */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Badge variant="aiPurple" className="font-bold">
                ORBITX INTELLIGENCE ENGINE
              </Badge>
              <span className="text-[10px] text-slate-400 font-semibold">
                Senior Associate Cohort Benchmark
              </span>
            </div>
            <h1 className="text-xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              YOUR PROFESSIONAL GROWTH
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Empowering law firm talent with real-time competency analytics, domain readiness, and actionable learning pathways.
            </p>
            {/* Demo Flow Breadcrumb Guide */}
            <div className="mt-2.5 inline-flex items-center space-x-2 bg-purple-50/80 border border-purple-200/80 px-3 py-1 rounded-lg text-xs text-purple-900">
              <span className="font-bold text-[10px] uppercase tracking-wider text-purple-700 bg-white px-1.5 py-0.5 rounded border border-purple-200">
                DEMO FLOW STEP 6 (FINAL)
              </span>
              <span>Review Domain Readiness (78%) and Market Value (+18%), then click:</span>
              <Link href={`/app/orbitx/report/${currentUser.id}`} className="font-semibold text-purple-700 hover:underline flex items-center gap-1">
                Print Professional Report &rarr;
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md">
              <Link href={`/app/orbitx/report/${currentUser.id}`} className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>DOWNLOAD REPORT (PDF)</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* 4 Big Metrics with Animated Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* DOMAIN READINESS */}
          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200">
            <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
              DOMAIN READINESS
            </span>
            <div className="text-3xl font-extrabold text-purple-900 mt-1">
              <AnimatedCounter to={78} suffix="%" />
            </div>
            <div className="w-full bg-purple-200 h-2 rounded-full mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-purple-600 h-full rounded-full"
              />
            </div>
            <span className="text-[11px] text-purple-700 mt-2 block font-medium">
              +6% following High-Court filings
            </span>
          </div>

          {/* PROJECTED MARKET VALUE */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              PROJECTED MARKET VALUE
            </span>
            <div className="text-3xl font-extrabold text-emerald-800 mt-1">
              <AnimatedCounter to={18} prefix="+" suffix="%" />
            </div>
            <div className="w-full bg-emerald-200 h-2 rounded-full mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "88%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-emerald-600 h-full rounded-full"
              />
            </div>
            <span className="text-[11px] text-emerald-700 mt-2 block font-medium">
              Top 8th percentile in Commercial Bar
            </span>
          </div>

          {/* MATTERS HANDLED */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
              ACTIVE MATTERS
            </span>
            <div className="text-3xl font-extrabold text-blue-900 mt-1">
              <AnimatedCounter to={cases.length} />
            </div>
            <div className="w-full bg-blue-200 h-2 rounded-full mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-blue-600 h-full rounded-full"
              />
            </div>
            <span className="text-[11px] text-blue-700 mt-2 block font-medium">
              3 High-Risk constitutional petitions
            </span>
          </div>

          {/* PARTNER PATHWAY SCORE */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              PARTNER PROMOTION SCORE
            </span>
            <div className="text-3xl font-extrabold text-slate-800 mt-1">
              <AnimatedCounter to={84} suffix=" / 100" />
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "84%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-slate-700 h-full rounded-full"
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-2 block font-medium">
              Projected Partner panel review: Q4 2026
            </span>
          </div>
        </div>
      </Card>

      {/* SKILL GAP ANALYSIS & RADAR BARS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Skill Gaps */}
        <Card className="lg:col-span-6 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                SKILL GAP ANALYSIS
              </h2>
              <p className="text-xs text-slate-500">
                Benchmarked against Trilegal Senior Partner competency matrix.
              </p>
            </div>
            <Badge variant="aiPurple">Verified</Badge>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { skill: "Legal Research", current: 90, benchmark: 85, status: "Mastered", variant: "growthGreen" },
              { skill: "Contract & Writ Drafting", current: 75, benchmark: 85, status: "Proficient", variant: "secondary" },
              { skill: "Regulatory Law & Compliance", current: 70, benchmark: 80, status: "Proficient", variant: "secondary" },
              { skill: "Advanced Advocacy (Bench)", current: 60, benchmark: 85, status: "Development Gap", variant: "mediumRisk" },
              { skill: "Constitutional Interpretation", current: 60, benchmark: 80, status: "Development Gap", variant: "mediumRisk" },
              { skill: "Cross-Examination & Witness Strategy", current: 52, benchmark: 75, status: "High Priority Gap", variant: "highRisk" },
            ].map((s, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-slate-800">{s.skill}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500 text-[11px]">Current: {s.current}%</span>
                    <Badge variant={s.variant as any} className="text-[10px]">
                      {s.status}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.current}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                    className={`h-full rounded-full ${
                      s.current >= 80 ? "bg-emerald-600" : s.current >= 70 ? "bg-blue-600" : "bg-amber-600"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 leading-relaxed mt-4">
            <strong>OrbitX Recommendation:</strong> Arjun demonstrates exceptional research and drafting precision. Focusing on courtroom bench advocacy and witness cross-examination will unlock direct equity partner trajectory.
          </div>
        </Card>

        {/* Right 6 Cols: Growth Trajectory / Professional Snapshot */}
        <Card className="lg:col-span-6 p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Professional Snapshot &amp; Docket Experience
            </h2>
            <span className="text-xs text-slate-400">YTD 2026</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900">High Court Appearances</span>
                <span className="text-slate-400 block text-[11px]">Bombay &amp; Delhi High Courts</span>
              </div>
              <span className="font-bold text-slate-800 text-base">24 Matters</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900">Article 226 Petitions Drafted</span>
                <span className="text-slate-400 block text-[11px]">Regulatory &amp; Infrastructure Disputes</span>
              </div>
              <span className="font-bold text-slate-800 text-base">14 Drafts</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900">Disputed Value Managed</span>
                <span className="text-slate-400 block text-[11px]">Total client exposure handled</span>
              </div>
              <span className="font-bold text-emerald-700 text-base">INR 385 Crores</span>
            </div>

            <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-200 space-y-1">
              <span className="text-purple-950 font-bold block">Market Value Multiplier</span>
              <p className="text-purple-900 leading-relaxed text-[11px]">
                OrbitX projects an associate billing rate uplift of <strong>+18%</strong> based on successful interim reliefs secured before the Bombay High Court Division Bench.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* SUGGESTED LEARNING PATHWAY */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>SUGGESTED LEARNING PATHWAY (ORBITX RECOMMENDED)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Personalized curricula curated by OrbitX to bridge identified advocacy &amp; procedure gaps.
            </p>
          </div>
          <Badge variant="aiPurple">Curated for Arjun Mehra</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningPaths.map((lp) => (
            <motion.div
              key={lp.id}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-purple-300 transition-all space-y-3 text-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <span className="font-bold text-slate-900 text-sm">{lp.title}</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 shrink-0">
                    {lp.estimatedWeeks} Weeks
                  </Badge>
                </div>

                <p className="text-slate-600 leading-relaxed font-medium mt-2">
                  {lp.whyRecommended}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px]">
                <div className="text-slate-500">
                  Current: <strong className="text-slate-800">{lp.currentSkill}%</strong> &rarr; Target: <strong className="text-emerald-700">{lp.targetSkill}%</strong>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => toast.success(`Enrolled in ${lp.title} modules!`)}
                  className="text-xs text-purple-700 font-bold p-0 h-auto"
                >
                  Enroll in Modules &rarr;
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </PageTransition>
  );
}
