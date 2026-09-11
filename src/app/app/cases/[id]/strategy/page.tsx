"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  FileEdit, 
  Copy, 
  BookOpen, 
  Scale, 
  ArrowRight,
  HelpCircle,
  Clock
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AiCaseStrategyPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "case-1";
  const { cases, applyAiSuggestionToDraft } = useApp();
  const currentCase = cases.find((c) => c.id === caseId) || cases[0];

  const [copied, setCopied] = useState(false);
  const [appliedToDraft, setAppliedToDraft] = useState(false);

  const handleUseInDraft = () => {
    applyAiSuggestionToDraft(
      "AI Strategy Primary Grounds",
      `/* GROUND: MANIFEST ARBITRARINESS & PROMISSORY ESTOPPEL */\n"The Petitioner submits that the impugned stop-work order is manifestly arbitrary and violates Article 14 as settled in Maneka Gandhi v. UOI and Shayara Bano v. UOI. The Respondent authority is estopped under law from retrospectively cancelling building approvals without hearing."`
    );
    setAppliedToDraft(true);
    setTimeout(() => setAppliedToDraft(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Link
                href={`/app/cases/${currentCase.id}`}
                className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Case Workspace</span>
              </Link>
              <span className="text-slate-300">&bull;</span>
              <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                AI CASE STRATEGY ENGINE
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
              <span>Litigation Strategy: {currentCase.title}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Formulated via Trilegal AI Precedent Graph and Indian Constitutional Jurisprudence.
            </p>
            {/* Demo Flow Breadcrumb Guide */}
            <div className="mt-2.5 inline-flex items-center space-x-2 bg-purple-50/80 border border-purple-200/80 px-3 py-1 rounded-lg text-xs text-purple-900">
              <span className="font-bold text-[10px] uppercase tracking-wider text-purple-700 bg-white px-1.5 py-0.5 rounded border border-purple-200">
                DEMO FLOW STEP 3
              </span>
              <span>Click <strong>USE IN DRAFT</strong> or proceed to:</span>
              <Link href="/app/research" className="font-semibold text-purple-700 hover:underline flex items-center gap-1">
                Unified Legal Research &rarr;
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleUseInDraft}
              className={`px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center space-x-1.5 ${
                appliedToDraft
                  ? "bg-emerald-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <FileEdit className="w-4 h-4" />
              <span>{appliedToDraft ? "APPLIED TO DRAFT!" : "USE IN DRAFT"}</span>
            </button>
            <Link
              href="/app/research"
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>RESEARCH PRECEDENTS</span>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>CONFIDENTIAL &bull; AI-GENERATED STRATEGY:</strong> Must be vetted and settled by Lead Advocate or Senior Partner prior to judicial filing.
            </span>
          </div>
          <span className="text-[10px] text-amber-700 font-bold uppercase">Trilegal Protocol</span>
        </div>
      </div>

      {/* Grid: Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle space-y-3">
          <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Case Strengths (Petitioner&apos;s Posture)</span>
          </h2>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 leading-relaxed">
              <strong>1. Vested Accrued Rights:</strong> Valid Commencement Certificate issued up to 14th plinth; substantial progress and INR 145 Cr expended in reliance.
            </li>
            <li className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 leading-relaxed">
              <strong>2. Glaring Natural Justice Breach:</strong> Complete failure of <em>Audi Alteram Partem</em>; impugned notice was served without prior show-cause notice.
            </li>
            <li className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 leading-relaxed">
              <strong>3. High Court Balance of Convenience:</strong> Demurrage charges running at INR 8.5 Lakhs/day and 850 allottees facing possession delay creates overwhelming balance in favor of interim stay.
            </li>
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle space-y-3">
          <h2 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Case Weaknesses &amp; Vulnerabilities</span>
          </h2>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-100 leading-relaxed">
              <strong>1. Municipal Police Power Defense:</strong> Respondent Corporation will argue that DCR regulations are delegated public health &amp; safety rules immune from private estoppel.
            </li>
            <li className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-100 leading-relaxed">
              <strong>2. Alternate Statutory Remedy:</strong> Respondents may argue petitioner should exhaust statutory appeal under Section 47 of the MRTP Act before invoking Article 226 writ jurisdiction.
            </li>
            <li className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-100 leading-relaxed">
              <strong>3. Draft vs Final Circular Status:</strong> If the proposed amendment is held to be in public interest, courts occasionally grant temporary stay conditioned on heavy indemnity bonds.
            </li>
          </ul>
        </div>
      </div>

      {/* Primary Arguments & Counter-Arguments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Arguments */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle space-y-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Primary Arguments for Bench
          </h2>
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-blue-900 block mb-1">Argument 1: Article 14 Arbitrariness</span>
              <p className="leading-relaxed">
                The impugned notice singles out petitioner&apos;s ongoing project without any intelligible differentia or determining principle. Under <em>Shayara Bano (2017)</em>, manifest arbitrariness invalidates subordinate state notifications.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-blue-900 block mb-1">Argument 2: Doctrine of Legitimate Expectation</span>
              <p className="leading-relaxed">
                Having accepted INR 34.5 Cr in statutory premiums, the State induced petitioner to execute contracts. Under <em>FCI v. Kamdhenu (1993)</em>, the public authority cannot frustrate legitimate expectations without overriding public justification.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-blue-900 block mb-1">Argument 3: Retrospective Invalidity</span>
              <p className="leading-relaxed">
                Administrative circulars operate prospectively unless clear legislative power authorizes retrospectivity. Section 51 of the MRTP Act explicitly requires compensation before revoking building permission.
              </p>
            </div>
          </div>
        </div>

        {/* Counter-Arguments & Rebuttals */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle space-y-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Anticipated State Arguments &amp; Rebuttals
          </h2>
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-red-900 block mb-1">State: &ldquo;No Estoppel Against Statute&rdquo;</span>
              <p className="leading-relaxed text-slate-600">
                <strong>Rebuttal:</strong> The impugned stop-work is an executive letter, not a plenary statute. Estoppel and fairness apply squarely against executive action per <em>Ramana Dayaram Shetty (1979)</em>.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-red-900 block mb-1">State: &ldquo;Exhaust Alternate Statutory Remedies&rdquo;</span>
              <p className="leading-relaxed text-slate-600">
                <strong>Rebuttal:</strong> As held in <em>Whirlpool Corporation v. Registrar of Trade Marks (1998)</em>, alternative remedy is not an absolute bar when fundamental rights (Art. 14, 19) are violated or natural justice is breached.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-red-900 block mb-1">State: &ldquo;Public Safety in Urban Density&rdquo;</span>
              <p className="leading-relaxed text-slate-600">
                <strong>Rebuttal:</strong> Proportionality requires the least intrusive measure under <em>Puttaswamy (2017)</em>. Total stoppage when structural compliance is verifiable is grossly disproportionate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Strategy & Action Plan */}
      <div className="bg-white rounded-xl border border-purple-200 p-6 shadow-subtle space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Recommended Action Plan &amp; Prayers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-100">
            <span className="font-bold text-purple-950 block mb-1">1. Urgent Ad-Interim Stay</span>
            <p className="text-purple-900 leading-relaxed">
              Move Bombay High Court Division Bench for an ad-interim stay on MCGM&apos;s stop-work order, with an undertaking to not create third-party rights on top floors pending hearing.
            </p>
          </div>

          <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-100">
            <span className="font-bold text-purple-950 block mb-1">2. Statutory Compensation Prayer</span>
            <p className="text-purple-900 leading-relaxed">
              Include an alternative prayer under Section 51 of MRTP Act claiming compensation of INR 145 Crores if the planning sanction is modified for public road widening.
            </p>
          </div>

          <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-100">
            <span className="font-bold text-purple-950 block mb-1">3. Senior Partner Mention</span>
            <p className="text-purple-900 leading-relaxed">
              Brief Senior Partner Vikramjit Roy for initial mentioning before Court Room 1 (Chief Justice Court) citing daily contractor demurrage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
