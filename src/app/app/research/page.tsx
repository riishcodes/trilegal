"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  BookOpen, 
  FileText, 
  Sparkles, 
  Check, 
  Bookmark, 
  ChevronRight, 
  Scale, 
  ShieldAlert,
  ArrowRight,
  Database
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function LegalResearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "constitutional challenge arbitrary regulatory order";
  const { researchResults, addToBrief, briefItems, selectedCaseId } = useApp();

  const [query, setQuery] = useState(initialQuery);
  const [selectedDb, setSelectedDb] = useState("ALL");
  const [selectedCourt, setSelectedCourt] = useState("ALL");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState("ALL");
  const [sortBy, setSortBy] = useState("relevance");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchParams.get("q")) {
      setQuery(searchParams.get("q") || "");
    }
  }, [searchParams]);

  const filteredResults = researchResults.filter((item) => {
    if (selectedDb !== "ALL" && !item.database.toLowerCase().includes(selectedDb.toLowerCase())) return false;
    if (selectedCourt !== "ALL" && !item.court.toLowerCase().includes(selectedCourt.toLowerCase())) return false;
    if (selectedPracticeArea !== "ALL" && item.practiceArea !== selectedPracticeArea) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      const tokens = q.split(/\s+/).filter(t => t.length > 2);
      return (
        item.title.toLowerCase().includes(q) ||
        item.citation.toLowerCase().includes(q) ||
        item.summaryNote.toLowerCase().includes(q) ||
        item.aiRelevanceExplanation.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q)) ||
        tokens.some(token => 
          item.title.toLowerCase().includes(token) ||
          item.summaryNote.toLowerCase().includes(token) ||
          item.aiRelevanceExplanation.toLowerCase().includes(token) ||
          item.tags.some(t => t.toLowerCase().includes(token))
        )
      );
    }
    return true;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 250);
  };

  const handleAddToBrief = (item: (typeof researchResults)[0]) => {
    addToBrief({
      caseId: selectedCaseId || "case-1",
      sourceType: "JUDGMENT",
      sourceId: item.id,
      title: item.title,
      citation: item.citation,
      court: item.court,
      keyNotes: item.aiRelevanceExplanation,
    });
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    toast.success(`Added ${item.title} to case brief!`);
  };

  return (
    <PageTransition className="space-y-6 pb-12">
      {/* Header */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                LEGAL RESEARCH ENGINE
              </span>
              <Badge variant="secondary" className="bg-blue-50 text-blue-800 font-bold border-blue-200">
                UNIFIED MULTI-DATABASE
              </Badge>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Search Precedents, Statutes &amp; Judgments
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulated aggregator for SCC Online, Manupatra, Westlaw, Indian Kanoon, and Firm Knowledge Vault.
            </p>
            {/* Demo Flow Breadcrumb Guide */}
            <div className="mt-2.5 inline-flex items-center space-x-2 bg-blue-50/80 border border-blue-200/80 px-3 py-1 rounded-lg text-xs text-blue-900">
              <span className="font-bold text-[10px] uppercase tracking-wider text-blue-700 bg-white px-1.5 py-0.5 rounded border border-blue-200">
                DEMO FLOW STEP 4
              </span>
              <span>Click <strong>&quot;ADD TO BRIEF&quot;</strong> on Maneka Gandhi, then open:</span>
              <Link href="/app/drafting" className="font-semibold text-blue-700 hover:underline flex items-center gap-1">
                AI Drafting Studio &rarr;
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium">Active Case Brief:</span>
            <Button asChild variant="outline" size="sm" className="bg-blue-50/50 border-blue-200 text-blue-800 hover:bg-blue-100 font-bold">
              <Link href="/app/drafting" className="flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>{briefItems.length} Sources Linked</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords, citations, bench names or legal principles (e.g., 'constitutional challenge arbitrary regulatory order')..."
            className="w-full pl-11 pr-32 py-3 bg-[#EFF4FC] border border-slate-200 rounded-xl text-xs lg:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Search
          </Button>
        </form>

        {/* Demo Notice */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>DEMO CONNECTOR NOTICE:</strong> External legal databases (SCC Online, Manupatra, Westlaw) are represented as simulated sandbox connectors. Real landmark authorities are labeled for legal accuracy.
            </span>
          </div>
          <Badge variant="mediumRisk" className="text-[10px]">
            Mock Integration
          </Badge>
        </div>
      </Card>

      {/* Main Layout: Filters Sidebar & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 3 Cols: Filters */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-4 space-y-4 text-xs">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>FILTERS</span>
              <button
                onClick={() => {
                  setSelectedDb("ALL");
                  setSelectedCourt("ALL");
                  setSelectedPracticeArea("ALL");
                  setQuery("");
                  toast.info("Research filters reset.");
                }}
                className="text-[10px] text-blue-600 font-semibold hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Database Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2">
                DATABASE SOURCE
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "ALL", label: "All Connectors" },
                  { id: "SCC", label: "SCC Online (Demo)" },
                  { id: "Manupatra", label: "Manupatra (Demo)" },
                  { id: "Westlaw", label: "Westlaw (Demo)" },
                  { id: "Indian Kanoon", label: "Indian Kanoon (Public)" },
                  { id: "Firm Repository", label: "Firm Repository" },
                ].map((db) => (
                  <label key={db.id} className="flex items-center space-x-2 cursor-pointer text-slate-700 hover:text-slate-900">
                    <input
                      type="radio"
                      name="database"
                      checked={selectedDb === db.id}
                      onChange={() => setSelectedDb(db.id)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{db.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Court Filter */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2">
                COURT / FORUM
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "ALL", label: "All Forums" },
                  { id: "Supreme Court", label: "Supreme Court of India" },
                  { id: "High Court", label: "High Courts" },
                  { id: "District", label: "District / Tribunals" },
                ].map((c) => (
                  <label key={c.id} className="flex items-center space-x-2 cursor-pointer text-slate-700 hover:text-slate-900">
                    <input
                      type="radio"
                      name="court"
                      checked={selectedCourt === c.id}
                      onChange={() => setSelectedCourt(c.id)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Practice Area Filter */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2">
                PRACTICE AREA
              </label>
              <div className="space-y-1.5">
                {[
                  "ALL",
                  "Constitutional Law",
                  "Commercial Litigation",
                  "Arbitration",
                  "Corporate",
                  "Environmental Law",
                  "IP Litigation"
                ].map((pa) => (
                  <label key={pa} className="flex items-center space-x-2 cursor-pointer text-slate-700 hover:text-slate-900">
                    <input
                      type="radio"
                      name="practice"
                      checked={selectedPracticeArea === pa}
                      onChange={() => setSelectedPracticeArea(pa)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{pa === "ALL" ? "All Disciplines" : pa}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right 9 Cols: Results List with Staggered Motion */}
        <div className="lg:col-span-9 space-y-4">
          {/* Results Summary Bar */}
          <Card className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-slate-600">
              Found <strong className="text-slate-900 font-bold">About 3,240 results</strong> across Indian legal repositories (showing top relevant)
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-700"
              >
                <option value="relevance">Relevance</option>
                <option value="latest">Latest</option>
                <option value="court">Court</option>
                <option value="citations">Citation Count</option>
              </select>
            </div>
          </Card>

          {/* Results Cards */}
          <div className="space-y-4">
            {isSearching ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <Card key={n} className="p-5 space-y-3">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-16 w-full" />
                  </Card>
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              filteredResults.map((item, index) => {
                const isAdded = addedIds[item.id] || briefItems.some(b => b.sourceId === item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: Math.min(index * 0.05, 0.3) }}
                  >
                    <Card className="p-5 hover:border-blue-300 hover:shadow-cardHover transition-all space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              href={`/app/research/judgment/${item.id}`}
                              className="text-base font-bold text-blue-900 hover:text-blue-600 tracking-tight"
                            >
                              {item.title}
                            </Link>
                            <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                              {item.citation}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-slate-800">{item.court}</span>
                            <span>&bull;</span>
                            <span>Year: {item.year}</span>
                            <span>&bull;</span>
                            <span className="text-blue-700 font-medium">{item.database}</span>
                          </div>
                        </div>

                        <Badge variant="aiPurple" className="self-start">
                          {item.practiceArea}
                        </Badge>
                      </div>

                      {/* AI Relevance Box */}
                      <div className="p-3 rounded-lg bg-purple-50/50 border border-purple-100 text-xs space-y-1">
                        <div className="flex items-center space-x-1.5 text-purple-900 font-bold text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span>TRILEGAL AI RELEVANCE ANALYSIS:</span>
                        </div>
                        <p className="text-purple-950 leading-relaxed font-medium">
                          {item.aiRelevanceExplanation}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions Bar */}
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center space-x-2">
                          <Button asChild variant="secondary" size="sm">
                            <Link href={`/app/research/judgment/${item.id}`}>
                              Read Full Text
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 font-semibold">
                            <Link href={`/app/research/summary/${item.id}`} className="flex items-center space-x-1">
                              <Sparkles className="w-3 h-3 mr-1" />
                              <span>AI Summary</span>
                            </Link>
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleAddToBrief(item)}
                            disabled={isAdded}
                            className={
                              isAdded
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                            }
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                                <span>IN BRIEF</span>
                              </>
                            ) : (
                              <>
                                <Bookmark className="w-3.5 h-3.5 mr-1.5" />
                                <span>ADD TO BRIEF</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <Card className="p-8 text-center text-slate-500">
                <Search className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="font-semibold text-slate-700">No judgments found matching this filter criteria.</p>
                <p className="text-xs text-slate-400 mt-1">Try broadening your search query or reset database filters.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
