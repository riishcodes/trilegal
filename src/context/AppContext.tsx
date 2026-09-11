"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Case, Lawyer, JudgmentResult, Task, KnowledgeDocument, LearningPathItem, BriefItem, LegalDraft } from "@/types/legal";
import { DEMO_USER, INITIAL_CASES, INITIAL_LAWYERS, INITIAL_RESEARCH_RESULTS, INITIAL_TASKS, INITIAL_KNOWLEDGE_DOCS, INITIAL_LEARNING_PATH, INITIAL_DRAFT } from "@/lib/data";

interface AppContextType {
  currentUser: Lawyer;
  cases: Case[];
  lawyers: Lawyer[];
  researchResults: JudgmentResult[];
  tasks: Task[];
  knowledgeDocs: KnowledgeDocument[];
  learningPaths: LearningPathItem[];
  briefItems: BriefItem[];
  currentDraft: LegalDraft;
  selectedCaseId: string;
  isDemoMode: boolean;
  
  // Actions
  setSelectedCaseId: (id: string) => void;
  addCase: (newCase: Partial<Case>) => Case;
  updateCase: (id: string, updates: Partial<Case>) => void;
  addToBrief: (item: Omit<BriefItem, "id" | "addedAt">) => void;
  removeFromBrief: (id: string) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateDraft: (content: string) => void;
  applyAiSuggestionToDraft: (suggestionTitle: string, snippetToAppend: string) => void;
  calculateRisk: (data: { financialValue: number; precedentComplexity: number; statutoryPenalty: number; practiceArea: string }) => {
    level: "HIGH" | "MEDIUM" | "LOW";
    confidence: number;
    explanation: string;
    scores: { financialValue: number; precedentComplexity: number; statutoryPenalty: number };
  };
  getRecommendedTeam: (riskLevel: "HIGH" | "MEDIUM" | "LOW", practiceArea: string) => {
    lawyer: Lawyer;
    roleInCase: "Lead Partner" | "Senior Counsel" | "Lead Associate" | "Research Associate";
    matchPercentage: number;
    matchReason: string;
  }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser] = useState<Lawyer>(DEMO_USER);
  const [cases, setCases] = useState<Case[]>(INITIAL_CASES);
  const [lawyers, setLawyers] = useState<Lawyer[]>(INITIAL_LAWYERS);
  const [researchResults, setResearchResults] = useState<JudgmentResult[]>(INITIAL_RESEARCH_RESULTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [knowledgeDocs] = useState<KnowledgeDocument[]>(INITIAL_KNOWLEDGE_DOCS);
  const [learningPaths] = useState<LearningPathItem[]>(INITIAL_LEARNING_PATH);
  
  const [briefItems, setBriefItems] = useState<BriefItem[]>([
    {
      id: "brief-init-1",
      caseId: "case-1",
      sourceType: "JUDGMENT",
      sourceId: "judg-1",
      title: "Maneka Gandhi vs. Union of India",
      citation: "(1978) 1 SCC 248 : AIR 1978 SC 597",
      court: "Supreme Court of India",
      addedAt: "15 Feb 2026",
      keyNotes: "Directly establishes that an executive stop-work notice without prior notice or reasons is void under Article 14."
    }
  ]);
  
  const [currentDraft, setCurrentDraft] = useState<LegalDraft>(INITIAL_DRAFT);
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-1");
  const isDemoMode = true;

  // Load from local storage if available
  useEffect(() => {
    try {
      const savedCases = localStorage.getItem("trilegal_cases");
      if (savedCases) setCases(JSON.parse(savedCases));
      const savedBrief = localStorage.getItem("trilegal_brief");
      if (savedBrief) setBriefItems(JSON.parse(savedBrief));
      const savedTasks = localStorage.getItem("trilegal_tasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));
      const savedDraft = localStorage.getItem("trilegal_draft");
      if (savedDraft) setCurrentDraft(JSON.parse(savedDraft));
    } catch (e) {
      console.warn("LocalStorage error", e);
    }
  }, []);

  const saveCasesToStorage = (updated: Case[]) => {
    setCases(updated);
    try {
      localStorage.setItem("trilegal_cases", JSON.stringify(updated));
    } catch (e) {}
  };

  const saveBriefToStorage = (updated: BriefItem[]) => {
    setBriefItems(updated);
    try {
      localStorage.setItem("trilegal_brief", JSON.stringify(updated));
    } catch (e) {}
  };

  const saveTasksToStorage = (updated: Task[]) => {
    setTasks(updated);
    try {
      localStorage.setItem("trilegal_tasks", JSON.stringify(updated));
    } catch (e) {}
  };

  const saveDraftToStorage = (draft: LegalDraft) => {
    setCurrentDraft(draft);
    try {
      localStorage.setItem("trilegal_draft", JSON.stringify(draft));
    } catch (e) {}
  };

  // Deterministic risk calculation
  const calculateRisk = (data: { financialValue: number; precedentComplexity: number; statutoryPenalty: number; practiceArea: string }) => {
    // If it matches the featured executive demo case:
    if (data.financialValue >= 80 || data.precedentComplexity >= 80 || data.practiceArea.toLowerCase().includes("constitutional")) {
      return {
        level: "HIGH" as const,
        confidence: 93, // Deterministic 93% for demo consistency
        scores: {
          financialValue: 92,
          precedentComplexity: 95,
          statutoryPenalty: 91,
        },
        explanation: "This matter involves constitutional interpretation and may establish precedent. Senior partner oversight is recommended."
      };
    }
    
    // Normal calculation
    const avg = (data.financialValue + data.precedentComplexity + data.statutoryPenalty) / 3;
    if (avg >= 70) {
      return {
        level: "HIGH" as const,
        confidence: 91,
        scores: { financialValue: data.financialValue, precedentComplexity: data.precedentComplexity, statutoryPenalty: data.statutoryPenalty },
        explanation: "High financial stakes coupled with statutory and regulatory complexity. Recommended Senior Partner leadership."
      };
    } else if (avg >= 45) {
      return {
        level: "MEDIUM" as const,
        confidence: 84,
        scores: { financialValue: data.financialValue, precedentComplexity: data.precedentComplexity, statutoryPenalty: data.statutoryPenalty },
        explanation: "Commercial and contractual dispute with settled legal precedents. Recommended Senior/Mid Associate lead."
      };
    } else {
      return {
        level: "LOW" as const,
        confidence: 88,
        scores: { financialValue: data.financialValue, precedentComplexity: data.precedentComplexity, statutoryPenalty: data.statutoryPenalty },
        explanation: "Routine compliance, document verification, or standard filing. Junior Associate execution appropriate."
      };
    }
  };

  // Risk -> Role Matrix Mapping Logic
  const getRecommendedTeam = (riskLevel: "HIGH" | "MEDIUM" | "LOW", practiceArea: string) => {
    if (riskLevel === "HIGH") {
      return [
        {
          lawyer: INITIAL_LAWYERS.find(l => l.id === "lawyer-1") || DEMO_USER, // Arjun Mehra
          roleInCase: "Lead Associate" as const,
          matchPercentage: 94,
          matchReason: "Selected because of constitutional litigation track record, Article 226 drafting expertise, and high familiarity with Maharashtra DCR jurisprudence."
        },
        {
          lawyer: INITIAL_LAWYERS.find(l => l.id === "lawyer-3") || INITIAL_LAWYERS[2], // Sneha Kapoor
          roleInCase: "Senior Counsel" as const,
          matchPercentage: 88,
          matchReason: "Selected for exceptional municipal dispute strategy and interim relief advocacy before Bombay High Court Division Bench."
        },
        {
          lawyer: INITIAL_LAWYERS.find(l => l.id === "lawyer-4") || INITIAL_LAWYERS[3], // Karan Sharma
          roleInCase: "Research Associate" as const,
          matchPercentage: 81,
          matchReason: "Selected to assist with statutory compilation of MRTP Act delegated powers and ratio tracking from Supreme Court planning precedents."
        }
      ];
    } else if (riskLevel === "MEDIUM") {
      return [
        {
          lawyer: INITIAL_LAWYERS.find(l => l.id === "lawyer-3") || INITIAL_LAWYERS[2],
          roleInCase: "Senior Counsel" as const,
          matchPercentage: 91,
          matchReason: "Specialist in commercial disputes and precedent mapping."
        },
        {
          lawyer: INITIAL_LAWYERS.find(l => l.id === "lawyer-4") || INITIAL_LAWYERS[3],
          roleInCase: "Lead Associate" as const,
          matchPercentage: 84,
          matchReason: "Experienced in commercial contracts and statutory research."
        }
      ];
    } else {
      return [
        {
          lawyer: INITIAL_LAWYERS.find(l => l.id === "lawyer-8") || INITIAL_LAWYERS[7],
          roleInCase: "Lead Associate" as const,
          matchPercentage: 85,
          matchReason: "Handles initial filings, due diligence verification, and standard agreements."
        },
        {
          lawyer: INITIAL_LAWYERS.find(l => l.id === "lawyer-12") || INITIAL_LAWYERS[11],
          roleInCase: "Research Associate" as const,
          matchPercentage: 82,
          matchReason: "Provides fast citation checking and registry compliance."
        }
      ];
    }
  };

  const addCase = (newCaseData: Partial<Case>): Case => {
    const id = `case-${Date.now()}`;
    const risk = calculateRisk({
      financialValue: newCaseData.riskScores?.financialValue || 92,
      precedentComplexity: newCaseData.riskScores?.precedentComplexity || 95,
      statutoryPenalty: newCaseData.riskScores?.statutoryPenalty || 91,
      practiceArea: newCaseData.practiceArea || "Constitutional Law"
    });

    const fullCase: Case = {
      id,
      title: newCaseData.title || "Untitled Matter",
      client: newCaseData.client || "Client Corp",
      practiceArea: newCaseData.practiceArea || "Constitutional Law",
      caseType: newCaseData.caseType || "Writ Petition",
      court: newCaseData.court || "High Court of Bombay",
      briefDescription: newCaseData.briefDescription || "Matter created in Trilegal AI workspace.",
      riskLevel: risk.level,
      riskConfidence: risk.confidence,
      riskFactors: newCaseData.riskFactors || [
        { factor: "Constitutional issue involved", impact: "HIGH", detail: "Article 14 and 19(1)(g) rights impacted by administrative action." },
        { factor: "High financial impact", impact: "HIGH", detail: "Significant project capital expenditure at risk." }
      ],
      riskScores: risk.scores,
      riskExplanation: risk.explanation,
      status: "IN PROGRESS",
      assignedTeam: [
        {
          lawyerId: "lawyer-1",
          roleInCase: "Lead Associate",
          matchPercentage: 94,
          matchReason: "Selected because of constitutional litigation track record and Article 226 drafting expertise."
        },
        {
          lawyerId: "lawyer-3",
          roleInCase: "Senior Counsel",
          matchPercentage: 88,
          matchReason: "Selected for dispute strategy and interim relief advocacy."
        },
        {
          lawyerId: "lawyer-4",
          roleInCase: "Research Associate",
          matchPercentage: 81,
          matchReason: "Assigned for statutory cross-referencing and precedent tracking."
        }
      ],
      filedDate: "Today",
      nextHearing: "Pending Listing",
      lastUpdated: "Just now",
      documentsCount: 2,
      briefItemsCount: 1
    };

    const updated = [fullCase, ...cases];
    saveCasesToStorage(updated);
    setSelectedCaseId(id);
    return fullCase;
  };

  const updateCase = (id: string, updates: Partial<Case>) => {
    const updated = cases.map(c => (c.id === id ? { ...c, ...updates } : c));
    saveCasesToStorage(updated);
  };

  const addToBrief = (item: Omit<BriefItem, "id" | "addedAt">) => {
    const newItem: BriefItem = {
      ...item,
      id: `brief-${Date.now()}`,
      addedAt: "Just now",
    };
    const updated = [newItem, ...briefItems];
    saveBriefToStorage(updated);
    
    // Update brief item counter on active case
    updateCase(item.caseId, {
      briefItemsCount: (cases.find(c => c.id === item.caseId)?.briefItemsCount || 0) + 1
    });
  };

  const removeFromBrief = (id: string) => {
    const updated = briefItems.filter(b => b.id !== id);
    saveBriefToStorage(updated);
  };

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    const updated = tasks.map(t => t.id === taskId ? { ...t, status } : t);
    saveTasksToStorage(updated);
  };

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`
    };
    const updated = [newTask, ...tasks];
    saveTasksToStorage(updated);
  };

  const updateDraft = (content: string) => {
    const updated = { ...currentDraft, content, lastModified: "Just now" };
    saveDraftToStorage(updated);
  };

  const applyAiSuggestionToDraft = (suggestionTitle: string, snippetToAppend: string) => {
    const updatedContent = `${currentDraft.content}\n\n/* [AI Suggestion Applied: ${suggestionTitle}] */\n${snippetToAppend}`;
    const updated = {
      ...currentDraft,
      content: updatedContent,
      lastModified: "Just now",
      appliedSuggestions: [...(currentDraft.appliedSuggestions || []), suggestionTitle]
    };
    saveDraftToStorage(updated);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        cases,
        lawyers,
        researchResults,
        tasks,
        knowledgeDocs,
        learningPaths,
        briefItems,
        currentDraft,
        selectedCaseId,
        isDemoMode,
        setSelectedCaseId,
        addCase,
        updateCase,
        addToBrief,
        removeFromBrief,
        updateTaskStatus,
        addTask,
        updateDraft,
        applyAiSuggestionToDraft,
        calculateRisk,
        getRecommendedTeam
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
