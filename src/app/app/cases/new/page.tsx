"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  UploadCloud, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  Scale, 
  X,
  Info
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Lawyer } from "@/types/legal";
import PageTransition from "@/components/ui/PageTransition";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function NewCaseWizard() {
  const router = useRouter();
  const { addCase, getRecommendedTeam } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State initialized with featured demo case
  const [caseName, setCaseName] = useState("R.K. Developers vs. State of Maharashtra");
  const [client, setClient] = useState("R.K. Infrastructure & Housing Ltd.");
  const [practiceArea, setPracticeArea] = useState("Constitutional Law");
  const [caseType, setCaseType] = useState("Writ Petition (Article 226)");
  const [court, setCourt] = useState("High Court of Judicature at Bombay");
  const [briefDescription, setBriefDescription] = useState(
    "Constitutional challenge to sudden municipal stop-work notification and unilateral modification of Development Control Regulations (DCR 33(10)) without statutory hearing, inflicting INR 145 Crore development loss."
  );
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    "MCGM_Stop_Work_Order_10Feb2026.pdf",
    "IOD_and_Commencement_Certificate_Approved.pdf",
    "Architect_Expenditure_Certification_INR145Cr.pdf"
  ]);

  // Risk Score deterministic values (93% confidence for demo)
  const [riskFinancial] = useState(92);
  const [riskPrecedent] = useState(95);
  const [riskStatutory] = useState(91);

  // Team Selection
  const recommended = getRecommendedTeam("HIGH", practiceArea);
  const [team, setTeam] = useState(recommended);
  const [selectedWhyLawyer, setSelectedWhyLawyer] = useState<{ lawyer: Lawyer; reason: string; role: string } | null>(null);

  const handleNext = () => {
    if (step < 4) setStep((prev) => (prev + 1) as any);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => (prev - 1) as any);
  };

  const handleFinalConfirm = () => {
    const created = addCase({
      title: caseName,
      client,
      practiceArea,
      caseType,
      court,
      briefDescription,
      riskLevel: "HIGH",
      riskConfidence: 93,
      riskScores: {
        financialValue: riskFinancial,
        precedentComplexity: riskPrecedent,
        statutoryPenalty: riskStatutory,
      },
      assignedTeam: team.map((t) => ({
        lawyerId: t.lawyer.id,
        roleInCase: t.roleInCase,
        matchPercentage: t.matchPercentage,
        matchReason: t.matchReason,
      })),
    });

    toast.success("Team assignment confirmed! Launching case workspace...");
    router.push(`/app/cases/${created.id}`);
  };

  return (
    <PageTransition className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Wizard Header Progress */}
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>CREATE NEW MATTER</span>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-semibold border-blue-200">
                Demo Flow Step 1 &rarr; 4
              </Badge>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Intake Flow: Case Details &rarr; OrbitX Risk Assessment (93% High Risk) &rarr; Team Assignment &rarr; Case Workspace
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold">
            <span className="text-slate-400">Step {step} of 4</span>
            <span className="text-blue-600 font-bold">
              {step === 1 && "Case Details"}
              {step === 2 && "Risk Assessment"}
              {step === 3 && "Assign Team"}
              {step === 4 && "Confirm & Launch"}
            </span>
          </div>
        </div>

        {/* Stepper Tabs */}
        <div className="grid grid-cols-4 gap-2 pt-4">
          {[
            { s: 1, label: "1. Case Details" },
            { s: 2, label: "2. Risk Assessment" },
            { s: 3, label: "3. Assign Team" },
            { s: 4, label: "4. Confirmation" },
          ].map((item) => (
            <div
              key={item.s}
              className={`p-2 rounded-lg text-center text-xs font-semibold transition-all ${
                step === item.s
                  ? "bg-blue-600 text-white shadow-sm"
                  : step > item.s
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-slate-50 text-slate-400"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </Card>

      {/* STEP 1: CASE DETAILS */}
      {step === 1 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 1: Case Particulars</h2>
              <p className="text-xs text-slate-500">Enter client, jurisdiction, and matter description.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCaseName("R.K. Developers vs. State of Maharashtra");
                setPracticeArea("Constitutional Law");
                setClient("R.K. Infrastructure & Housing Ltd.");
                setCourt("High Court of Judicature at Bombay");
                toast.info("Form populated with R.K. Developers benchmark data.");
              }}
              className="text-xs text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-100"
            >
              Reset to Demo Default
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Case Name / Title *
              </label>
              <input
                type="text"
                value={caseName}
                onChange={(e) => setCaseName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs lg:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Client / Instructing Party *
              </label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs lg:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Practice Area *
              </label>
              <select
                value={practiceArea}
                onChange={(e) => setPracticeArea(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs lg:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="Constitutional Law">Constitutional Law</option>
                <option value="Arbitration">Arbitration</option>
                <option value="Commercial Litigation">Commercial Litigation</option>
                <option value="Corporate & Insolvency">Corporate &amp; Insolvency (IBC)</option>
                <option value="IP Litigation">IP Litigation</option>
                <option value="Environmental Law">Environmental Law</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Case Type / Proceeding
              </label>
              <input
                type="text"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs lg:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Court / Judicial Forum *
              </label>
              <input
                type="text"
                value={court}
                onChange={(e) => setCourt(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs lg:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Brief Description of Dispute / Facts
              </label>
              <textarea
                rows={3}
                value={briefDescription}
                onChange={(e) => setBriefDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Drag and drop upload UI */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
              Supporting Pleadings &amp; Orders (Drag &amp; Drop)
            </label>
            <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/60 rounded-xl p-6 text-center cursor-pointer transition-colors">
              <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">
                Drop impugned notices, IOD plans, or client brief files here
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF, DOCX, scanned court orders up to 50MB</p>
            </div>

            <div className="mt-3 space-y-1.5">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-medium text-slate-800">{file}</span>
                  </div>
                  <Badge variant="growthGreen" className="text-[10px]">
                    Parsed
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1 Actions */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              <span>Continue to OrbitX Risk Assessment</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: ORBITX RISK ASSESSMENT (KEY ANIMATED MOMENT) */}
      {step === 2 && (
        <Card className="p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  ORBITX RISK ANALYSIS &mdash; HIGH RISK
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Deterministic algorithmic risk calculation based on financial exposure, constitutional precedent, and statutory penalty.
              </p>
            </div>
            <Badge variant="highRisk" className="text-xs font-bold px-3 py-1">
              93% CONFIDENCE
            </Badge>
          </div>

          {/* Animated Risk Header Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-xl bg-red-50/80 border border-red-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-red-900 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                <span>CLASSIFIED AS HIGH STAKES LITIGATION</span>
              </div>
              <p className="text-xs text-red-800 leading-relaxed">
                &ldquo;This matter involves constitutional interpretation under Articles 14 and 19(1)(g) and may establish precedent on municipal retrospective notifications. Senior partner oversight is recommended.&rdquo;
              </p>
            </div>
            <div className="text-right shrink-0 bg-white p-3.5 rounded-xl border border-red-200 shadow-sm min-w-[140px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Composite Score</span>
              <div className="text-3xl font-black text-red-600 my-0.5">
                <AnimatedCounter from={0} to={93} duration={1.2} suffix=" / 100" />
              </div>
              <span className="text-[10px] text-red-600 font-semibold">Senior Partner Tier</span>
            </div>
          </motion.div>

          {/* Transparent Scoring Breakdown - Animated Stagger */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              TRANSPARENT SCORING BREAKDOWN
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200"
              >
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Financial Exposure</span>
                  <span className="text-red-700 font-bold">{riskFinancial}/100</span>
                </div>
                <Progress value={riskFinancial} indicatorColor="bg-red-600" />
                <p className="text-[11px] text-slate-500 mt-2">
                  Claim exceeds INR 145 Cr in capital outlay and daily contractor demurrage.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.2 }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200"
              >
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Precedent Complexity</span>
                  <span className="text-red-700 font-bold">{riskPrecedent}/100</span>
                </div>
                <Progress value={riskPrecedent} indicatorColor="bg-red-600" />
                <p className="text-[11px] text-slate-500 mt-2">
                  Involves 7-Judge bench ratios (Maneka Gandhi) and subordinate legislation limits.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.3 }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200"
              >
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Statutory Penalty</span>
                  <span className="text-red-700 font-bold">{riskStatutory}/100</span>
                </div>
                <Progress value={riskStatutory} indicatorColor="bg-red-600" />
                <p className="text-[11px] text-slate-500 mt-2">
                  Risk of permanent revocation under MRTP Act Section 51 without compensation.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Qualitative Risk Factors */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              EVALUATED RISK FACTORS
            </h3>
            <div className="space-y-2">
              {[
                { f: "Constitutional issue involved", imp: "HIGH", desc: "Arbitrary executive action under Article 14 and property rights under Article 300A." },
                { f: "High financial impact", imp: "HIGH", desc: "Disputed development value exceeds INR 145 Crores with continuous commercial exposure." },
                { f: "High precedent complexity", imp: "HIGH", desc: "Interprets scope of municipal delegated circulars vs doctrine of legitimate expectation." },
                { f: "Statutory implications", imp: "HIGH", desc: "Challenges retroactive enforcement under MRTP Act Section 44/51." },
                { f: "Reputational implications", imp: "MEDIUM", desc: "Flagship township project with 850 residential allottees awaiting possession." },
              ].map((rf, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: 0.35 + i * 0.05 }}
                  className="flex items-start justify-between p-2.5 rounded-lg border border-slate-200 bg-white text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900">{rf.f}:</span>{" "}
                    <span className="text-slate-600">{rf.desc}</span>
                  </div>
                  <Badge variant={rf.imp === "HIGH" ? "highRisk" : "mediumRisk"} className="shrink-0 ml-3">
                    {rf.imp}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Step 2 Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Button variant="outline" onClick={handleBack} className="text-xs font-semibold">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Back</span>
            </Button>
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              <span>CONTINUE TO TEAM ASSIGNMENT</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: ORBITX TEAM ASSIGNMENT (SEQUENTIAL REVEAL ANIMATIONS) */}
      {step === 3 && (
        <Card className="p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                RECOMMENDED LEGAL TEAM (HIGH RISK / HIGH STAKES)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                OrbitX matched firm advocates based on constitutional litigation hours, Bombay HC appearances, and availability.
              </p>
            </div>
            <Badge variant="aiPurple" className="text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Risk &rarr; Role Matrix Active
            </Badge>
          </div>

          {/* Risk -> Role Matrix Banner */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Firm Policy: High Risk / High Stakes Matters</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Requires Senior Partner / Lead Advocate (10+ years experience, Advanced Advocacy, Risk Mitigation), 
              assisted by Senior Associate (4-8 years) and Research Associate (0-3 years).
            </p>
          </div>

          {/* Recommended Team Cards with Sequential Stagger */}
          <div className="space-y-3">
            {team.map((member, index) => (
              <motion.div
                key={member.lawyer.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0 ${member.lawyer.avatarBg}`}>
                    {member.lawyer.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{member.lawyer.name}</span>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                        {member.roleInCase}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {member.lawyer.role} &bull; {member.lawyer.experienceYears} years &bull; {member.lawyer.location}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {member.lawyer.skills.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {s.name} ({s.score}%)
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-semibold block">ORBITX MATCH</span>
                    <span className="text-base font-extrabold text-emerald-600">
                      <AnimatedCounter from={50} to={member.matchPercentage} duration={0.8} suffix="%" />
                    </span>
                    <span className="text-[10px] text-slate-400 block">{member.lawyer.workload}% Workload</span>
                  </div>

                  {/* WHY BUTTON - Opens shadcn Dialog */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedWhyLawyer({ lawyer: member.lawyer, reason: member.matchReason, role: member.roleInCase })}
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 font-bold"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-purple-600" />
                    <span>WHY?</span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Step 3 Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Button variant="outline" onClick={handleBack} className="text-xs font-semibold">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Back</span>
            </Button>
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              <span>CONFIRM ASSIGNMENT &rarr;</span>
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: CONFIRMATION */}
      {step === 4 && (
        <Card className="p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Step 4: Review &amp; Launch Case Workspace</h2>
            <p className="text-xs text-slate-500">Confirm setup to initialize docket files, AI brief index, and task assignments.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Matter Name:</span>
                <span className="font-bold text-slate-900">{caseName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Client:</span>
                <span className="font-semibold text-slate-900">{client}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Practice Area:</span>
                <span className="font-semibold text-slate-900">{practiceArea}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Court / Forum:</span>
                <span className="font-semibold text-slate-900">{court}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">OrbitX Risk Level:</span>
                <Badge variant="highRisk">
                  HIGH RISK (93% Confidence)
                </Badge>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <span className="font-bold text-blue-950 block mb-2">Assigned Legal Counsel:</span>
              <ul className="space-y-1 text-blue-900">
                {team.map((m, i) => (
                  <li key={i} className="flex justify-between">
                    <span>&bull; {m.lawyer.name} ({m.roleInCase})</span>
                    <span className="font-semibold">{m.matchPercentage}% Match</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Button variant="outline" onClick={handleBack} className="text-xs font-semibold">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Back</span>
            </Button>
            <Button onClick={handleFinalConfirm} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              <span>CONFIRM &amp; OPEN CASE WORKSPACE</span>
            </Button>
          </div>
        </Card>
      )}

      {/* SHADCN WHY DIALOG */}
      <Dialog open={!!selectedWhyLawyer} onOpenChange={(open) => !open && setSelectedWhyLawyer(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center space-x-2 text-purple-700 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="font-bold text-xs uppercase tracking-wider">OrbitX Matching Rationale</span>
            </div>
            <DialogTitle>{selectedWhyLawyer?.lawyer.name}</DialogTitle>
            <DialogDescription>
              {selectedWhyLawyer?.lawyer.role} &bull; {selectedWhyLawyer?.lawyer.experienceYears} years standing
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-xs pt-1">
            <div className="p-3.5 bg-purple-50 rounded-lg border border-purple-200 text-purple-900 font-medium leading-relaxed">
              &ldquo;{selectedWhyLawyer?.reason}&rdquo;
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Assessed Competencies for this Matter:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {selectedWhyLawyer?.lawyer.skills.map((s, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-600">{s.name}</span>
                    <span className="font-bold text-slate-900">{s.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <Button onClick={() => setSelectedWhyLawyer(null)} className="bg-blue-600 hover:bg-blue-700 text-white">
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
