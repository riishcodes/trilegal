"use client";

export const runtime = "edge";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowLeft, 
  Bookmark, 
  Check, 
  FileEdit, 
  Scale, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle,
  Share2,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AiJudgmentSummaryPage() {
  const params = useParams();
  const router = useRouter();
  const judgmentId = (params?.id as string) || "judg-1";
  const { researchResults, addToBrief, briefItems, selectedCaseId, applyAiSuggestionToDraft } = useApp();

  const judgment = researchResults.find((j) => j.id === judgmentId) || researchResults[0];
  const isAlreadyInBrief = briefItems.some((b) => b.sourceId === judgment.id);
  const [inBrief, setInBrief] = useState(isAlreadyInBrief);
  const [usedInDraft, setUsedInDraft] = useState(false);

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
    toast.success("Judgment precedent added to active Case Brief!");
  };

  const handleUseInDraft = () => {
    applyAiSuggestionToDraft(
      `Citation: ${judgment.title} (${judgment.citation})`,
      `/* JUDICIAL PRECEDENT CITED */\n"As held by the Hon'ble Supreme Court in ${judgment.title} [${judgment.citation}], the principles of natural justice are an integral component of Article 14, and any administrative order passed in breach thereof is a nullity in the eye of law."`
    );
    setUsedInDraft(true);
    toast.success("Precedent ratio injected into active Draft!");
    setTimeout(() => {
      router.push("/app/drafting");
    }, 600);
  };

  return (
    <PageTransition className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="text-xs font-semibold text-slate-600 hover:text-blue-600">
          <Link href={`/app/research/judgment/${judgment.id}`} className="flex items-center space-x-1">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back to Judgment Text</span>
          </Link>
        </Button>
        <Badge variant="aiPurple" className="font-semibold text-xs">
          TRILEGAL AI SUMMARY
        </Badge>
      </div>

      {/* Main Summary Header Card */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 mb-1">
              <span>{judgment.court}</span>
              <span>&bull;</span>
              <span>{judgment.citation}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
              AI SUMMARY: {judgment.title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured ratio decidendi, key takeaways, and case application for active litigation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* ADD TO BRIEF BUTTON */}
            <Button
              onClick={handleAddToBrief}
              disabled={inBrief}
              className={
                inBrief
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              }
            >
              {inBrief ? (
                <>
                  <Check className="w-4 h-4 mr-1.5 text-emerald-600" />
                  <span>ADDED TO BRIEF</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 mr-1.5" />
                  <span>ADD TO BRIEF</span>
                </>
              )}
            </Button>

            {/* USE IN DRAFT BUTTON */}
            <Button
              onClick={handleUseInDraft}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-sm"
            >
              <FileEdit className="w-4 h-4 mr-1.5" />
              <span>{usedInDraft ? "INSERTED! OPENING..." : "USE IN DRAFT"}</span>
            </Button>
          </div>
        </div>

        {/* AI Label Notice */}
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-xs text-purple-950 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span>
              <strong>TRILEGAL AI GENERATED SUMMARY:</strong> Synthesized from authentic Indian landmark jurisprudence. Clearly labeled for attorney verification.
            </span>
          </div>
          <Badge variant="aiPurple" className="font-bold">
            Verified Landmark
          </Badge>
        </div>
      </Card>

      {/* Case Overview */}
      <Card className="p-6 space-y-3">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Case Overview
        </h2>
        <p className="text-xs lg:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-lg border border-slate-200">
          {judgment.summaryNote}
        </p>
      </Card>

      {/* Key Takeaways */}
      <Card className="p-6 space-y-3">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Key Takeaways
        </h2>
        <div className="space-y-2.5">
          {judgment.keyTakeaways.map((takeaway, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800"
            >
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed font-medium">{takeaway}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Relevant Sections & Precedents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 space-y-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Relevant Sections &amp; Statues
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {judgment.relevantSections.map((sec, idx) => (
              <Badge key={idx} variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-900 font-semibold border border-blue-200">
                {sec}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Important Precedents Cited
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {judgment.importantPrecedents.map((prec, idx) => (
              <Badge key={idx} variant="outline" className="px-3 py-1 bg-slate-50 font-semibold text-slate-800">
                {prec}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Potential Application to Current Case */}
      <Card className="p-6 space-y-3 border-blue-200 bg-blue-50">
        <div className="flex items-center space-x-2">
          <Scale className="w-5 h-5 text-blue-600" />
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Potential Application to Current Case (R.K. Developers)
          </h2>
        </div>
        <p className="text-xs lg:text-sm text-slate-800 leading-relaxed font-medium">
          {judgment.potentialApplication}
        </p>
        <div className="pt-3 border-t border-blue-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Ready to cite in Memorandum of Writ Petition</span>
          <Button
            onClick={handleUseInDraft}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            <span>Proceed to AI Drafting Studio</span>
            <ChevronRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </Card>
    </PageTransition>
  );
}
