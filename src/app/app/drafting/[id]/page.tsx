"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileEdit, 
  Save, 
  Download, 
  Copy, 
  Share2, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  BookOpen, 
  Scale, 
  CornerDownLeft,
  Plus
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AiDraftEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { currentDraft, updateDraft, applyAiSuggestionToDraft, briefItems } = useApp();

  const [editorContent, setEditorContent] = useState(currentDraft.content);
  const [activeTab, setActiveTab] = useState<"Arguments" | "Precedents" | "Structure">("Arguments");
  const [askAiInput, setAskAiInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [highlightInserted, setHighlightInserted] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    updateDraft(editorContent);
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      toast.success("Draft saved to Case Docket!");
      setTimeout(() => setSavedSuccess(false), 2500);
    }, 300);
  };

  const handleApplySuggestion = (title: string, snippet: string) => {
    const updated = `${editorContent}\n\n/* [AI Suggestion Applied: ${title}] */\n${snippet}`;
    setEditorContent(updated);
    applyAiSuggestionToDraft(title, snippet);
    setHighlightInserted(true);
    toast.success(`AI suggestion applied: ${title}`);
    setTimeout(() => setHighlightInserted(false), 2000);
  };

  const handleAskAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askAiInput.trim()) return;
    const prompt = askAiInput;
    setAskAiInput("");
    handleApplySuggestion(
      `Refined: ${prompt}`,
      `/* REFINED CLAUSE PER ATTORNEY INSTRUCTION: "${prompt}" */\n"AND FURTHERMORE, the Petitioner craves leave of this Hon'ble Court to rely upon supplementary records of expenditure to substantiate that the action of Respondent No. 2 directly breaches constitutional safeguards of property and economic liberty under Article 300A of the Constitution of India."`
    );
  };

  return (
    <PageTransition className="space-y-6 pb-12">
      {/* Top Header */}
      <Card className="p-4 lg:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Button asChild variant="outline" size="icon" className="h-8 w-8">
            <Link href="/app/drafting">
              <ArrowLeft className="w-4 h-4 text-slate-500" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                AI DRAFT EDITOR &bull; {currentDraft.templateType}
              </span>
              <Badge variant="secondary" className="bg-blue-50 text-blue-800 font-bold">
                {currentDraft.tone}
              </Badge>
            </div>
            <h1 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
              {currentDraft.templateType} &mdash; Draft
            </h1>
            {/* Demo Flow Breadcrumb Guide */}
            <div className="mt-1 inline-flex items-center space-x-2 bg-indigo-50/80 border border-indigo-200/80 px-2.5 py-0.5 rounded text-xs text-indigo-900">
              <span className="font-bold text-[10px] uppercase tracking-wider text-indigo-700 bg-white px-1.5 py-0.2 rounded border border-indigo-200">
                DEMO FLOW STEP 5
              </span>
              <span>Insert AI suggestions into draft, then view:</span>
              <Link href="/app/orbitx" className="font-semibold text-indigo-700 hover:underline flex items-center gap-1">
                OrbitX Analytics &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleSave}
            className={
              savedSuccess
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            }
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5" />
                <span>SAVED!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 mr-1.5" />
                <span>{isSaving ? "Saving..." : "Save Draft"}</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard?.writeText(editorContent);
              toast.info("Draft copied to clipboard!");
            }}
          >
            <Copy className="w-3.5 h-3.5 mr-1.5" />
            <span>Copy</span>
          </Button>

          <Button variant="outline" onClick={() => window.print()}>
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Export</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              handleApplySuggestion(
                "Refined Ground: Principle of Natural Justice",
                `"The impugned stop-work order is vitiated by the doctrine of bias and lack of hearing as held in Maneka Gandhi v. UOI (1978) 1 SCC 248."`
              );
            }}
            className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
            <span>Refine with AI</span>
          </Button>
        </div>
      </Card>

      {/* Main Grid: Editor & AI Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Legal Document Editor */}
        <div className="lg:col-span-8 space-y-2">
          <Card className={`p-6 flex flex-col min-h-[680px] transition-colors duration-500 ${
            highlightInserted ? "ring-2 ring-purple-400 bg-purple-50/20" : ""
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 text-xs text-slate-400">
              <span>Standard High Court Margin (2.0&quot; Left, 1.0&quot; Right)</span>
              <span>Last Modified: {currentDraft.lastModified}</span>
            </div>

            <textarea
              rows={26}
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="w-full flex-1 p-4 bg-slate-50/50 border border-slate-200 rounded-lg font-mono text-xs sm:text-sm text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 selection:bg-blue-100 resize-none font-medium"
            />

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Auto-saved to Case Docket</span>
              </div>
              <span>Words: {editorContent.split(/\s+/).filter(Boolean).length}</span>
            </div>
          </Card>
        </div>

        {/* Right 4 Cols: AI SUGGESTIONS SIDEBAR */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 space-y-4 sticky top-20">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  AI SUGGESTIONS
                </h3>
              </div>
              <Badge variant="aiPurple" className="text-[10px]">
                Interactive
              </Badge>
            </div>

            {/* Suggestion Tabs */}
            <div className="flex border-b border-slate-200 text-xs font-semibold">
              {(["Arguments", "Precedents", "Structure"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-2 text-center transition-all ${
                    activeTab === tab
                      ? "border-b-2 border-purple-600 text-purple-700 font-bold"
                      : "text-slate-400 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Suggestions List with Motion Stagger */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {activeTab === "Arguments" && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-purple-300 transition-all space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Argument Enhancement</span>
                      <Badge variant="aiPurple" className="text-[9px]">
                        High Value
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Assert that stopping ongoing work when 420 workers are on site causes irremediable social &amp; economic harm violating Article 19(1)(g).
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleApplySuggestion(
                          "Article 19(1)(g) Economic Liberty Ground",
                          `\nGROUND D: VIOLATION OF ARTICLE 19(1)(g):\n"Because the arbitrary work stoppage directly impinges upon the Petitioner's fundamental right to carry on lawful trade and business under Article 19(1)(g), rendering 420 construction workers destitute and causing irreversible financial prejudice."`
                        )
                      }
                      className="w-full text-purple-700 border-purple-200 hover:bg-purple-50 hover:text-purple-800 font-bold"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      <span>Apply to Draft</span>
                    </Button>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: 0.05 }}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-purple-300 transition-all space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Counter Argument Shield</span>
                      <Badge variant="mediumRisk" className="text-[9px]">
                        Defense
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Pre-empt municipal argument regarding alternative remedy under MRTP Act Section 47.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleApplySuggestion(
                          "Pre-empt Alternate Remedy (Whirlpool Precedent)",
                          `\nGROUND E: WRIT MAINTAINABLE DESPITE ALTERNATIVE REMEDY:\n"Because as settled in Whirlpool Corp v. Registrar of Trade Marks (1998) 8 SCC 1, alternative statutory remedy does not bar writ jurisdiction where the impugned order is passed in direct violation of principles of natural justice."`
                        )
                      }
                      className="w-full text-purple-700 border-purple-200 hover:bg-purple-50 hover:text-purple-800 font-bold"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      <span>Apply to Draft</span>
                    </Button>
                  </motion.div>
                </>
              )}

              {activeTab === "Precedents" && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-purple-300 transition-all space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Suggested Precedent</span>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-[9px]">
                        From Brief
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      <strong>Maneka Gandhi vs. UOI (1978):</strong> Procedural fairness and non-arbitrariness under Article 14.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleApplySuggestion(
                          "Maneka Gandhi Citation",
                          `\n"The Petitioner relies upon the landmark Constitution Bench ruling in Maneka Gandhi vs. Union of India (1978) 1 SCC 248, wherein the Hon'ble Supreme Court held that the principle of reasonableness and non-arbitrariness pervades Article 14 like a brooding omnipresence, vitiating any unreasoned executive freeze."`
                        )
                      }
                      className="w-full text-purple-700 border-purple-200 hover:bg-purple-50 hover:text-purple-800 font-bold"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      <span>Insert Precedent</span>
                    </Button>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: 0.05 }}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-purple-300 transition-all space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Missing Authority Found</span>
                      <Badge variant="growthGreen" className="text-[9px]">
                        Recommended
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      <strong>Shayara Bano vs. UOI (2017):</strong> Doctrine of Manifest Arbitrariness.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleApplySuggestion(
                          "Shayara Bano Manifest Arbitrariness Ratio",
                          `\n"The action of Respondent No. 2 suffers from manifest arbitrariness as expounded in Shayara Bano vs. Union of India (2017) 9 SCC 1, being something done capriciously, irrationally and without adequate determining principle."`
                        )
                      }
                      className="w-full text-purple-700 border-purple-200 hover:bg-purple-50 hover:text-purple-800 font-bold"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      <span>Insert Precedent</span>
                    </Button>
                  </motion.div>
                </>
              )}

              {activeTab === "Structure" && (
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-2 text-xs">
                  <span className="font-bold text-slate-900">Interim Relief Prayer Clause</span>
                  <p className="text-slate-600 text-[11px]">
                    Ensure Bombay HC registry compliant prayer formatting with specific stay clauses.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleApplySuggestion(
                        "Interim Prayer Clause (Registry Compliant)",
                        `\nPRAYER FOR INTERIM RELIEF:\n"Pending the hearing and final disposal of this Writ Petition, this Hon'ble Court be pleased to grant an ad-interim ex-parte stay on the operation, effect, and implementation of the impugned Stop-Work Notice bearing Ref No. MCGM/DP/2026/894 dated 10th February 2026, and permit the Petitioner to continue ongoing structural casting up to the 14th plinth."`
                      )
                    }
                    className="w-full text-purple-700 border-purple-200 hover:bg-purple-50 hover:text-purple-800 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Insert Prayer Clause</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Live Ask AI Input */}
            <form onSubmit={handleAskAi} className="pt-3 border-t border-slate-200 space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Interactive Co-Counsel Instruction:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={askAiInput}
                  onChange={(e) => setAskAiInput(e.target.value)}
                  placeholder="Ask AI to improve this section or add clause..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-500 pr-8"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-800 active:scale-90 transition-transform"
                >
                  <CornerDownLeft className="w-4 h-4" />
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
