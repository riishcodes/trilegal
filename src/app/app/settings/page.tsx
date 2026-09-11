"use client";

import React, { useState } from "react";
import { 
  Settings, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  Bell, 
  User, 
  Lock, 
  Check, 
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const { currentUser } = useApp();

  const [writingTone, setWritingTone] = useState("Partner-style");
  const [citationStyle, setCitationStyle] = useState("SCC / Bluebook (Indian Courts)");
  const [aiLevel, setAiLevel] = useState("Active Co-Counsel");

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>SETTINGS &amp; INTEGRATIONS</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure firm preferences, AI drafting parameters, and external legal database connectors.
          </p>
        </div>

        {saved && (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>Preferences Updated</span>
          </span>
        )}
      </div>

      {/* AI Preferences */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>AI Drafting &amp; Co-Counsel Preferences</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">
              Default Writing Tone
            </label>
            <select
              value={writingTone}
              onChange={(e) => setWritingTone(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="Partner-style">Partner-style (Authoritative, Prescriptive)</option>
              <option value="Formal">Formal (Traditional High Court Pleadings)</option>
              <option value="Concise">Concise (Executive Bench Summary)</option>
              <option value="Firm Standard">Trilegal Standard Institutional</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">
              Citation Standard
            </label>
            <select
              value={citationStyle}
              onChange={(e) => setCitationStyle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="SCC / Bluebook (Indian Courts)">SCC / Bluebook (Supreme Court &amp; High Courts)</option>
              <option value="AIR Format">AIR (All India Reporter Standard)</option>
              <option value="ILR Standard">Indian Law Reports (ILR)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">
              AI Assistance Level
            </label>
            <select
              value={aiLevel}
              onChange={(e) => setAiLevel(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="Active Co-Counsel">Active Co-Counsel (Pre-empt arguments &amp; cite ratios)</option>
              <option value="Passive Research">Passive Research (Search only on command)</option>
              <option value="Senior Editor">Senior Editor (Draft correction &amp; proofing)</option>
            </select>
          </div>
        </div>
      </div>

      {/* External Legal Database Connectors (DEMO STATUS) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
            <Database className="w-4 h-4 text-blue-600" />
            <span>Connected Legal Databases &amp; Archives</span>
          </h2>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            DEMO SIMULATOR
          </span>
        </div>

        <div className="space-y-3 text-xs">
          {[
            { name: "SCC Online Connector", status: "SIMULATED / ACTIVE", latency: "14ms", records: "1.8M Judgments" },
            { name: "Manupatra API Gateway", status: "SIMULATED / ACTIVE", latency: "22ms", records: "2.1M Judgments" },
            { name: "Westlaw India Federated Search", status: "SIMULATED / ACTIVE", latency: "38ms", records: "International / Commonwealth" },
            { name: "Indian Kanoon Public Parser", status: "OPEN PUBLIC SOURCE", latency: "18ms", records: "SC & HC Archive" },
            { name: "Trilegal Knowledge Vault (Azure Tenant)", status: "CONNECTED / CONFIDENTIAL", latency: "4ms", records: "3,400 Firm Files" },
          ].map((conn, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">{conn.name}</span>
                <span className="text-slate-400 block text-[10px]">{conn.records} &bull; Response Time: {conn.latency}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {conn.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Legal Compliance Note */}
      <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 text-xs">
        <div className="flex items-center space-x-2 font-bold text-slate-200">
          <ShieldAlert className="w-4 h-4 text-blue-400" />
          <span>LEGAL NOTICE &amp; DATA PRIVACY PROTOCOL</span>
        </div>
        <p className="text-slate-400 leading-relaxed text-[11px]">
          Trilegal AI processes case files in dedicated zero-retention tenant sandboxes. No confidential client data or proprietary litigation strategies are used to train foundational AI models. All AI-generated work product must be verified by qualified advocates before filing before Courts of Record.
        </p>
      </div>
    </div>
  );
}
